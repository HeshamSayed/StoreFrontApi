"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const helpers_1 = require("./helpers");
const UserStoreInstance = new user_1.UserStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserStoreInstance.index();
        res.json(users);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const username = req.body.username;
        const password = req.body.password;
        if (firstname === undefined || lastname === undefined || username === undefined || password === undefined) {
            res.status(400);
            res.send("request is invalid");
            return false;
        }
        const user = yield UserStoreInstance.create({ firstname, lastname, username, password });
        res.json((0, helpers_1.getTokenByUser)(user));
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const read = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (id === undefined) {
            res.status(400);
            res.send("request is invalid");
            return false;
        }
        const user = yield UserStoreInstance.read(id);
        res.json(user);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        if (firstname === undefined || lastname === undefined || id === undefined) {
            res.status(400);
            res.send("request is invalid");
            return false;
        }
        const user = yield UserStoreInstance.update(id, { firstname, lastname });
        res.json(user);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (id === undefined) {
            res.status(400);
            res.send("request is invalid");
            return false;
        }
        yield UserStoreInstance.deleteUser(id);
        res.send(`User with id ${id} deleted successfully .`);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const password = req.body.password;
        if (username === undefined || password === undefined) {
            res.status(400);
            res.send("request is invalid");
            return false;
        }
        const user = yield UserStoreInstance.authenticate(username, password);
        if (user === null) {
            res.status(401);
            res.send(`Wrong credentials for user ${username}.`);
            return false;
        }
        res.json((0, helpers_1.getTokenByUser)(user));
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
function userRoutes(app) {
    app.get("/users", helpers_1.checkAuthHeader, index);
    app.post("/users/create", create);
    app.get("/users/:id", helpers_1.checkAuthHeader, read);
    app.put("/users/:id", helpers_1.checkAuthHeader, update);
    app.delete("/users/:id", helpers_1.checkAuthHeader, deleteUser);
    app.post("/users/auth", authenticate);
}
exports.default = userRoutes;
