import dotenv from "dotenv";
import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import passportJwt from "passport-jwt";
import GoogleStrategy from "passport-google-oauth20";
dotenv.config();
const ExtractJWT = passportJwt.ExtractJwt;
const JWTStrategy = passportJwt.Strategy;

//Passport local
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

//Jwt options
const options = {
    jwtFromRequest: ExtractJWT.fromExtractors([(req) => {
        let token = null;
        if(req && req.cookies){
            token = req.cookies["token"];
            return token;
        }
    }]),
    secretOrKey: process.env.JWT_SECRET
};

//Configuring jwt 
passport.use(
    new JWTStrategy(options, async(userDecoded, done) =>{
        try {
            const user = await User.findById(userDecoded.id);
            if(user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    })
);

//Configuring Google OAuth
passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackurl: 'http://localhost:3000/api/v1/users/auth/google/callback'
    }, async(accessToken, refreshtoken, profile, done) => {
        try {
            //check if user found
            let user = await User.findOne({ 
                googleId: profile.id,
            });
            //Destructure properties from profile
            const {id, displayName: name, _json:{picture}} = profile 
            //check if email exists
            let email = '';
            if(Array.isArray(profile?.emails) && profile?.emails?.length > 0){
                email = profile.emails[0].value
            }
            //Check if user not found
            if(!user) {
                user = await User.create({
                    username: displayName,
                    googleId: id,
                    profilePicture: picture,
                    authMethods: "google",
                    email,
                });
            }
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    })
)

export default passport;