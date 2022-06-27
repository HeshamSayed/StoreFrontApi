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
const order_1 = require("../models/order");
const helpers_1 = require("./helpers");
const OrderStoreInstance = new order_1.OrderStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield OrderStoreInstance.index();
        res.json(orders);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = req.body.products;
        const status = req.body.status;
        const user_id = req.body.user_id;
        if (products === undefined || status === undefined || user_id === undefined) {
            res.status(400);
            res.send("Some required parameters are missing! eg. :products, :status, :user_id");
            return false;
        }
        const order = yield OrderStoreInstance.create({ products, status, user_id });
        res.json(order);
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
        const order = yield OrderStoreInstance.read(id);
        res.json(order);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let products = req.body.products;
        const status = req.body.status;
        const user_id = req.body.user_id;
        if (products === undefined || status === undefined || user_id === undefined || id === undefined) {
            res.status(400);
            res.send("request is invalid");
            return false;
        }
        const order = yield OrderStoreInstance.update(id, { products, status, user_id });
        res.json(order);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (id === undefined) {
            res.status(400);
            res.send("request is invalid");
            return false;
        }
        yield OrderStoreInstance.deleteOrder(id);
        res.send(`Order with id ${id} deleted successfully .`);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
function orderRoutes(app) {
    app.get("/orders", helpers_1.checkAuthHeader, index);
    app.post("/orders/create", helpers_1.checkAuthHeader, create);
    app.get("/orders/:id", helpers_1.checkAuthHeader, read);
    app.put("/orders/:id", helpers_1.checkAuthHeader, update);
    app.delete("/orders/:id", helpers_1.checkAuthHeader, deleteOrder);
}
exports.default = orderRoutes;
