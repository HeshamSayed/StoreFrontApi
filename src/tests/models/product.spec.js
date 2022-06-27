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
const product_1 = require("../../models/product");
const ProductStoreInstance = new product_1.ProductStore();
describe("Product Model", () => {
    const product = {
        name: "battleF",
        price: 200
    };
    function createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return ProductStoreInstance.create(product);
        });
    }
    function deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return ProductStoreInstance.deleteProduct(id);
        });
    }
    it("index method", () => {
        expect(ProductStoreInstance.index).toBeDefined();
    });
    it("show method", () => {
        expect(ProductStoreInstance.read).toBeDefined();
    });
    it("add method", () => {
        expect(ProductStoreInstance.create).toBeDefined();
    });
    it("delete method", () => {
        expect(ProductStoreInstance.deleteProduct).toBeDefined();
    });
    it("add method should add a product", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdProduct = yield createProduct(product);
        expect(createdProduct).toEqual(Object.assign({ id: createdProduct.id }, product));
        yield deleteProduct(createdProduct.id);
    }));
    it("index method should return a list of products", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdProduct = yield createProduct(product);
        const productList = yield ProductStoreInstance.index();
        expect(productList).toEqual([createdProduct]);
        yield deleteProduct(createdProduct.id);
    }));
    it("show method should return the correct product", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdProduct = yield createProduct(product);
        const productFromDb = yield ProductStoreInstance.read(createdProduct.id);
        expect(productFromDb).toEqual(createdProduct);
        yield deleteProduct(createdProduct.id);
    }));
    it("update method should update the product", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdProduct = yield createProduct(product);
        const newProductData = {
            name: "callOfDut",
            price: 9999
        };
        const { name, price } = yield ProductStoreInstance.update(createdProduct.id, newProductData);
        expect(name).toEqual(newProductData.name);
        expect(price).toEqual(newProductData.price);
        yield deleteProduct(createdProduct.id);
    }));
    it("delete method should remove the product", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdProduct = yield createProduct(product);
        yield deleteProduct(createdProduct.id);
        const productList = yield ProductStoreInstance.index();
        expect(productList).toEqual([]);
    }));
});
