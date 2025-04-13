import {createServer, IncomingMessage, ServerResponse} from "node:http";
import {PORT} from "./config/userConfig.js";
import {userRoutes} from "./routes/userRoutes.js";
import {UserController} from "./controllers/userController.js";
import {UserServiceEmbeddedImpl} from "./services/UserServiceEmbeddedImpl.js";

export const launchServer = () => {

    const userService = new UserServiceEmbeddedImpl()
    const userController = new UserController(userService)

    createServer(async (req, res) => {
        await userRoutes(req, res, userController)
    }).listen(PORT, () => {
        console.log(`Started at http://localhost:${PORT}`)
    })
}