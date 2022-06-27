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
const order_1 = require("../../models/order");
const user_1 = require("../../models/user");
const product_1 = require("../../models/product");
const OrderStoreInstance = new order_1.OrderStore();
describe("Order Model", () => {
    const UserStoreInstance = new user_1.UserStore();
    const ProductStoreInstance = new product_1.ProductStore();
    let order, user_id, product_id;
    function createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            return OrderStoreInstance.create(order);
        });
    }
    function deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return OrderStoreInstance.deleteOrder(id);
        });
    }
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield UserStoreInstance.create({
            username: "heshamsayed",
            firstname: "hesham",
            lastname: "sayed",
            password: "password123"
        });
        user_id = user.id;
        const product = yield ProductStoreInstance.create({
            name: "blablabla",
            price: 9911
        });
        product_id = product.id;
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
        yield UserStoreInstance.deleteUser(user_id);
        yield ProductStoreInstance.deleteProduct(product_id);
    }));
    it("index method", () => {
        expect(OrderStoreInstance.index).toBeDefined();
    });
    it("show method", () => {
        expect(OrderStoreInstance.read).toBeDefined();
    });
    it("add method", () => {
        expect(OrderStoreInstance.create).toBeDefined();
    });
    it("delete method", () => {
        expect(OrderStoreInstance.deleteOrder).toBeDefined();
    });
    it("add method should add a order", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdOrder = yield createOrder(order);
        expect(createdOrder).toEqual(Object.assign({ id: createdOrder.id }, order));
        yield deleteOrder(createdOrder.id);
    }));
    it("index method should return a list of orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdOrder = yield createOrder(order);
        const orderList = yield OrderStoreInstance.index();
        expect(orderList).toEqual([createdOrder]);
        yield deleteOrder(createdOrder.id);
    }));
    it("show method should return the correct orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdOrder = yield createOrder(order);
        const orderFromDb = yield OrderStoreInstance.read(createdOrder.id);
        expect(orderFromDb).toEqual(createdOrder);
        yield deleteOrder(createdOrder.id);
    }));
    it("update method should update the order", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdOrder = yield createOrder(order);
        const newOrderData = {
            products: [{
                    product_id,
                    quantity: 200
                }],
            user_id,
            status: false
        };
        const { products, status } = yield OrderStoreInstance.update(createdOrder.id, newOrderData);
        expect(products).toEqual(newOrderData.products);
        expect(status).toEqual(newOrderData.status);
        yield deleteOrder(createdOrder.id);
    }));
    it("delete method should remove the order", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdOrder = yield createOrder(order);
        yield deleteOrder(createdOrder.id);
        const orderList = yield OrderStoreInstance.index();
        expect(orderList).toEqual([]);
    }));
});
