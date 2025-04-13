import {IncomingMessage, ServerResponse} from "node:http";
import {UserController} from "../controllers/userController.js";

export const userRoutes = async (req:IncomingMessage, res:ServerResponse, controller:UserController) => {

    const {method, url} =  req;
    const parsedUrl = new URL(url!, "http://localhost:3005")


    switch (url! + method){
        case "/api/users" + "POST":{
            await controller.addUser(req, res)
            break;
        }
        //TODO cases
        case "/api/users" + "GET":{
            await controller.getAllUsers(res)
            break
        }
        case "/api/users" + "DELETE":{
            await controller.removeUser(req,res)
            break
        }
        case "/api/user" + "GET":{
            await controller.getUser(req, res,parsedUrl)
            break
        }
        case "/api/users" + "PUT":{
            await controller.updateUser(req,res)
            break
        }
        default: {
            res.writeHead(500, {'Content-Type': 'text/plain'})
            res.end("Error!")
        }
    }
}