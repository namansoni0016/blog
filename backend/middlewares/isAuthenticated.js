import passport from "passport";

const isAuthenticated = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (error, user, info) => {
        if(error || !user) {
            return res.status(401).json({
                message: info ? info?.message : 'Login required! No token found',
                error: error ? error?.message : undefined,
            });
        }
        //placing user in the req object
        req.user = user?._id;
        return next();
    })(req, res, next);
}

export default isAuthenticated;