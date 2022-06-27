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
const product_1 = require("../models/product");
const helpers_1 = require("./helpers");
const ProductStoreInstance = new product_1.ProductStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield ProductStoreInstance.index();
        res.json(products);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const price = req.body.price;
        if (name === undefined || price === undefined) {
            res.status(400);
            res.send("request is invalid");
            return false;
        }
        const product = yield ProductStoreInstance.create({ name, price });
        res.json(product);
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
        const product = yield ProductStoreInstance.read(id);
        res.json(product);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const price = req.body.price;
        if (name === undefined || price === undefined || id === undefined) {
            res.status(400);
            res.send("request is invalid");
            return false;
        }
        const product = yield ProductStoreInstance.update(id, { name, price });
        res.json(product);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (id === undefined) {
            res.status(400);
            res.send("request is invalid");
            return false;
        }
        yield ProductStoreInstance.deleteProduct(id);
        res.send(`Product with id ${id} deleted successfully .`);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
function productRoutes(app) {
    app.get("/products", index);
    app.post("/products/create", helpers_1.checkAuthHeader, create);
    app.get("/products/:id", read);
    app.put("/products/:id", helpers_1.checkAuthHeader, update);
    app.delete("/products/:id", helpers_1.checkAuthHeader, deleteProduct);
}
exports.default = productRoutes;
