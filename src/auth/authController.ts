import { NextFunction, Request, Response } from "express";
import passport from "passport";
import "../auth/passportHandler";
import { ApiResult } from "../common/apiResult";

export class AuthController {

    public authenticateJWT(req: Request, res: Response, next: NextFunction) {
        passport.authenticate("jwt", (err, user, info) => {
            if (err)
                return ApiResult.UnAuthorized(res, "Unauthorized!");
            if (!user)
                return ApiResult.UnAuthorized(res, "Unauthorized!");
            else
                return next();
        })(req, res, next);
    }

    public authorizeJWT(req: Request, res: Response, next: NextFunction) {
        passport.authenticate("jwt", function (err, user, jwtToken) {
            if (err)
                return ApiResult.UnAuthorized(res, "Unauthorized!");

            if (!user)
                return ApiResult.UnAuthorized(res, "Unauthorized!");
            else {
                const scope = req.baseUrl.split("/").slice(-1)[0];
                const authScope = jwtToken.scope;
                if (authScope && authScope.indexOf(scope) > -1)
                    return next();
                else
                    return ApiResult.UnAuthorized(res, "Unauthorized!");
            }
        })(req, res, next);
    }
}
