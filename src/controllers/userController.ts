import {IncomingMessage, ServerResponse} from "node:http";
import {UserService} from "../services/UserService.js";
import {parseBody} from "../untils/tools.js";
import {User} from "../model/userTypes.js";

export class UserController{

    constructor(private userService:UserService) {}

    async addUser(req:IncomingMessage, res: ServerResponse){

        const body = await parseBody(req);
        const isSuccess = this.userService.addUser(body as User);
        if (isSuccess) {

            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('User added');
        } else {
            res.writeHead(409, {'Content-Type': 'text/plain'});
            res.end('User is already exist');
        }
    }
    async getAllUsers(res: ServerResponse) {
        const isSuccess = this.userService.getAllUsers();
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(isSuccess))
    }
    async removeUser(req:IncomingMessage, res: ServerResponse){
        const user = await parseBody(req) as User;
        const isSuccess =  this.userService.removeUser(user.id)
        if(isSuccess){
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(isSuccess))
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'})
            res.end('User not found')
        }
    }
    async getUser(req:IncomingMessage, res:ServerResponse,parsedUrl:URL) {
        const userId = parsedUrl.searchParams.get('userId');

        if (!userId) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Missing userId parameter');
            return;
        }
        const id = Number(userId);
        if (isNaN(id)) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Invalid userId format');
            return;
        }
        try {
            const user = this.userService.getUser(id);
            if (user) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(user));
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('User not found');
            }
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal server error');
        }
    }
    async updateUser(req:IncomingMessage, res: ServerResponse){
        const user = await parseBody(req) as User;
        const isSuccess = this.userService.updateUser(user)
        if(isSuccess){
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end(`User id:${user.id} was updated`)
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'})
            res.end('User not found')
        }
    }

}