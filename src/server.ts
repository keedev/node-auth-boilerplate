import express, { Request, Response, NextFunction } from "express";
import * as bodyParser from "body-parser";
import { createConnection } from "typeorm";
import { AppRoutes } from "./routes";
import { Logger } from "./common/logger";
import { AuthController } from "./auth/authController";

class Server {
    public app: express.Application;
    public authController: AuthController = new AuthController();

    constructor() {
        this.app = express();
        this.Config();
        this.Routes();
    }

    private Routes(): void {
        let nextF = (req: Request, res: Response, next: NextFunction) => { return next(); };
        AppRoutes.forEach(route => {
            this.app[route.method](
                route.path,
                route.authorize ? this.authController.authenticateJWT : nextF,
                (request, response, next) => {
                    route.action(request, response, next)
                        .then(() => next)
                        .catch((err: any) => next(err));
                });
        });
        this.app.get('/', (req, res) => { res.send('Server started!'); });
    }

    private Config(): void {

        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }

    public Start(): void {
        createConnection().then(async connection => {
            let port = process.env.PORT || 1337;
            this.app.listen(port, () => console.log(`Server started on port ${port}`));
        }).catch(error => {
            Logger.Log("TypeORM connection error: ", error);
        })
    }

}

const server = new Server();

server.Start();