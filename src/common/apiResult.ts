import { Logger } from "./logger";
import { Response } from "express";
import { CODE } from "./enum";

export class ApiResult {

    static ServerError(res: Response, e: any) {
        Logger.Log(e);
        res.status(CODE.SERVER_ERROR).json({ message: e.message });
    }

    static BadRequest(res: Response, message: string) {
        Logger.Log(message);
        res.status(CODE.BAD_REQUEST).json({ message: message });
    }

    static NotFound(res: Response, message: string) {
        Logger.Log(message);
        res.status(CODE.NOT_FOUND).json({ message: message });
    }

    static UnAuthorized(res: Response, message: string) {
        Logger.Log(message);
        res.status(CODE.UNAUTHORIZED).json({ message: message });
    }

    static OK(res: Response, result?: any) {
        if (result)
            res.status(CODE.SUCCESS).json(result);
        else
            res.status(CODE.SUCCESS_NO_CONTENT).json(null);
    }
}