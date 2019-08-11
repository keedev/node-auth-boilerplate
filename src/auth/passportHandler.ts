import passport from "passport";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";
import bcrypt from "bcrypt";
import { UserRepository } from "../repository/userRepository";
import { JWT_SECRET } from "../common/secret";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" }, async (username, password, done) => {

    let user = await UserRepository.LookForEntity(username);
    if (!user)
        return done(undefined, false, { message: `Username ${username} not found.` });

    let isMatch: boolean = await bcrypt.compare(password, user.password);;

    if (isMatch)
        return done(undefined, user);
    else
        return done(undefined, false, { message: "Invalid username or password." });

}));

passport.use(new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET
    }, async (jwtToken, done) => {
        let email = jwtToken.email;
        let user = await UserRepository.LookForEntity(email);
        if (user)
            return done(undefined, email, jwtToken); //success return token
        else
            return done(undefined, false);
    }));
