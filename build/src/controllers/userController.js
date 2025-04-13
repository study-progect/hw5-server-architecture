var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { parseBody } from "../untils/tools.js";
export class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield parseBody(req);
            const isSuccess = this.userService.addUser(body);
            if (isSuccess) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('User added');
            }
            else {
                res.writeHead(409, { 'Content-Type': 'text/plain' });
                res.end('User is already exist');
            }
        });
    }
    getAllUsers(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const isSuccess = this.userService.getAllUsers();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(isSuccess));
        });
    }
    removeUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield parseBody(req);
            const isSuccess = this.userService.removeUser(user.id);
            if (isSuccess) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(isSuccess));
            }
            else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('User not found');
            }
        });
    }
    getUser(req, res, parsedUrl) {
        return __awaiter(this, void 0, void 0, function* () {
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
                }
                else {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('User not found');
                }
            }
            catch (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal server error');
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield parseBody(req);
            const isSuccess = this.userService.updateUser(user);
            if (isSuccess) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`User id:${user.id} was updated`);
            }
            else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('User not found');
            }
        });
    }
}
