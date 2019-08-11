import { Request, Response, NextFunction } from "express";
import { UserController } from "./controllers/userController";

interface IRoute {
    path: string;
    method: "get" | "post" | "put" | "delete";
    action: (request: Request, response: Response, next: NextFunction) => Promise<void>;
    authorize?: boolean;
}

export const AppRoutes: IRoute[] = [
    {
        path: "/api/register",
        method: "post",
        action: UserController.Register
    },

    {
        path: "/api/login",
        method: "post",
        action: UserController.AuthenticateUser
    }
];