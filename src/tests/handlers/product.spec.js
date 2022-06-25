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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const SECRET = process.env.TOKEN_SECRET;
describe("Product Handler", () => {
    const product = {
        name: "CodeMaster 3000",
        price: 999
    };
    let token, userId, productId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            username: "heshamsayed",
            firstname: "hesham",
            lastname: "sayed",
            password: "password123"
        };
        const { body } = yield request.post("/users/create").send(userData);
        token = body;
        // @ts-ignore
        const { user } = jsonwebtoken_1.default.verify(token, SECRET);
        userId = user.id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield request.delete(`/users/${userId}`).set("Authorization", "bearer " + token);
    }));
    it("gets the create endpoint", (done) => {
        request
            .post("/products/create")
            .send(product)
            .set("Authorization", "bearer " + token)
            .then((res) => {
            const { body, status } = res;
            expect(status).toBe(200);
            productId = body.id;
            done();
        });
    });
    it("gets the index endpoint", (done) => {
        request
            .get("/products")
            .then((res) => {
            expect(res.status).toBe(200);
            done();
        });
    });
    it("gets the read endpoint", (done) => {
        request
            .get(`/products/${productId}`)
            .then((res) => {
            expect(res.status).toBe(200);
            done();
        });
    });
    it("gets the update endpoint", (done) => {
        const newProductData = Object.assign(Object.assign({}, product), { name: "CodeMerge 156 A", price: 1299 });
        request
            .put(`/products/${productId}`)
            .send(newProductData)
            .set("Authorization", "bearer " + token)
            .then((res) => {
            expect(res.status).toBe(200);
            done();
        });
    });
    it("gets the delete endpoint", (done) => {
        request.delete(`/products/${productId}`).set("Authorization", "bearer " + token)
            .then((res) => {
            expect(res.status).toBe(200);
            done();
        });
    });
});
