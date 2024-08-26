import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

passport.use(
    new LocalStrategy({
        usernameField: 'username'
    }, async (username, password, done) => {
        try {
            const user = await User.findOne({username});
            if(!user) {
                return done(null, false, { message: "Invalid login credentials"});
            }
            const match = await bcrypt.compare(password, user.password);
            if(match) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Invalid login credentials'})
            }
        } catch (error) {
            return done(error);
        }
    })
);

export default passport;