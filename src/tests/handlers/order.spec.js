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
describe("Order Handler", () => {
    let token, order, user_id, product_id, order_id;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            username: "heshamsayed",
            firstname: "hesham",
            lastname: "sayed",
            password: "password123"
        };
        const productData = {
            name: "Node",
            price: 101
        };
        const { body: userBody } = yield request.post("/users/create").send(userData);
        token = userBody;
        // @ts-ignore
        const { user } = jsonwebtoken_1.default.verify(token, SECRET);
        user_id = user.id;
        const { body: productBody } = yield request.post("/products/create").set("Authorization", "bearer " + token).send(productData);
        product_id = productBody.id;
        order = {
            products: [{
                    product_id,
                    quantity: 5
                }],
            user_id,
            status: true
        };
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield request.delete(`/users/${user_id}`).set("Authorization", "bearer " + token);
        yield request.delete(`/products/${product_id}`).set("Authorization", "bearer " + token);
    }));
    it("create endpoint", (done) => {
        request
            .post("/orders/create")
            .send(order)
            .set("Authorization", "bearer " + token)
            .then((res) => {
            const { body, status } = res;
            expect(status).toBe(200);
            order_id = body.id;
            done();
        });
    });
    it("index endpoint", (done) => {
        request
            .get("/orders")
            .set("Authorization", "bearer " + token)
            .then((res) => {
            expect(res.status).toBe(200);
            done();
        });
    });
    it("read endpoint", (done) => {
        request
            .get(`/orders/${order_id}`)
            .set("Authorization", "bearer " + token)
            .then((res) => {
            expect(res.status).toBe(200);
            done();
        });
    });
    it("update endpoint", (done) => {
        const newOrder = Object.assign(Object.assign({}, order), { status: false });
        request
            .put(`/orders/${order_id}`)
            .send(newOrder)
            .set("Authorization", "bearer " + token)
            .then((res) => {
            expect(res.status).toBe(200);
            done();
        });
    });
    it("delete endpoint", (done) => {
        request.delete(`/orders/${order_id}`).set("Authorization", "bearer " + token)
            .then((res) => {
            expect(res.status).toBe(200);
            done();
        });
    });
});
