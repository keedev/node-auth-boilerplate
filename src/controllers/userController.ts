import { Request, Response, NextFunction } from "express";
import { ApiResult } from "../common/apiResult";
import { UserRepository } from "../repository/userRepository";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../common/secret";
import bcrypt from "bcrypt";
import passport from "passport";

class Controller {

    /**
     * Register a new user
     * Register /api/register",
     * Query
     * @param email
     * @param password
     * @param password2
     */
    Register = async (req: Request, res: Response) => {
        try {
            let body: {
                email: string,
                password: string,
                password2: string
            } = req.body;

            // invalid retype pass
            if (body.password !== body.password2)
                return ApiResult.BadRequest(res, "Password and confirm password are different.")

            // check if email has register before
            let user = await UserRepository.LookForEntity(body.email);
            if (user)
                return ApiResult.BadRequest(res, "Email already registered.")

            // register to db
            let newUser = UserRepository.GetNew();
            newUser.email = body.email;
            newUser.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10));
            await UserRepository.Save(newUser);

            const token = jwt.sign({ email: body.email }, JWT_SECRET);
            ApiResult.OK(res, { token: token });

        } catch (e) {
            ApiResult.ServerError(res, e);
        }
    }

    AuthenticateUser = async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("local", (err, user: any, info) => {
            // no async/await because passport works only with callback ..
            if (err) return next(err);
            if (!user)
                ApiResult.UnAuthorized(res, info.message);
            else {
                const token = jwt.sign({ email: user.email }, JWT_SECRET);
                ApiResult.OK(res, { token: token });
            }
        })(req, res, next);
    }
}

const UserController = new Controller();

export { UserController }