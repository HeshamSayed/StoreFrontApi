"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const SECRET = process.env.TOKEN_SECRET;
describe("User Handler", () => {
    const userData = {
        username: "heshamsayed",
        firstname: "hesham",
        lastname: "sayed",
        password: "password123"
    };
    let token, userId = 1;
    it("should require authorization on every endpoint", (done) => {
        request
            .get("/users")
            .then((res) => {
            expect(res.status).toBe(401);
            done();
        });
        request
            .get(`/users/${userId}`)
            .then((res) => {
            expect(res.status).toBe(401);
            done();
        });
        request
            .put(`/users/${userId}`)
            .send({
            firstName: userData.firstname + "test",
            lastName: userData.lastname + "test"
        })
            .then((res) => {
            expect(res.status).toBe(401);
            done();
        });
        request
            .delete(`/users/${userId}`)
            .then((res) => {
            expect(res.status).toBe(401);
            done();
        });
    });
    it("gets the create endpoint", (done) => {
        request
            .post("/users/create")
            .send(userData)
            .then((res) => {
            const { body, status } = res;
            token = body;
            // @ts-ignore
            const { user } = jsonwebtoken_1.default.verify(token, SECRET);
            userId = user.id;
            expect(status).toBe(200);
            done();
        });
    });
    it("gets the index endpoint", (done) => {
        request
            .get("/users")
            .set("Authorization", "bearer " + token)
            .then((res) => {
            expect(res.status).toBe(200);
            done();
        });
    });
    it("gets the read endpoint", (done) => {
        request
            .get(`/users/${userId}`)
            .set("Authorization", "bearer " + token)
            .then((res) => {
            expect(res.status).toBe(200);
            done();
        });
    });
    it("gets the update endpoint", (done) => {
        const newUserData = Object.assign(Object.assign({}, userData), { firstname: "hesham", lastname: "sayed" });
        request
            .put(`/users/${userId}`)
            .send(newUserData)
            .set("Authorization", "bearer " + token)
            .then((res) => {
            expect(res.status).toBe(200);
            done();
        });
    });
    it("gets the auth endpoint", (done) => {
        request
            .post("/users/auth")
            .send({
            username: userData.username,
            password: userData.password
        })
            .set("Authorization", "bearer " + token)
            .then((res) => {
            expect(res.status).toBe(200);
            done();
        });
    });
    it("gets the auth endpoint with wrong password", (done) => {
        request
            .post("/users/auth")
            .send({
            username: userData.username,
            password: "password123"
        })
            .set("Authorization", "bearer " + token)
            .then((res) => {
            expect(res.status).toBe(401);
            done();
        });
    });
    it("gets the delete endpoint", (done) => {
        request
            .delete(`/users/${userId}`)
            .set("Authorization", "bearer " + token)
            .then((res) => {
            expect(res.status).toBe(200);
            done();
        });
    });
});
