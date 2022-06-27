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
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "SELECT * FROM products";
                const { rows } = yield connection.query(sql);
                connection.release();
                return rows;
            }
            catch (err) {
                throw new Error(`failed to get products. ${err}`);
            }
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price } = product;
            try {
                const sql = "INSERT INTO products (name, price) VALUES($1, $2) RETURNING *";
                const connection = yield database_1.default.connect();
                const { rows } = yield connection.query(sql, [name, price]);
                connection.release();
                return rows[0];
            }
            catch (err) {
                throw new Error(`failed to add new product ${name}. ${err}`);
            }
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM products WHERE id=($1)";
                const connection = yield database_1.default.connect();
                const { rows } = yield connection.query(sql, [id]);
                connection.release();
                return rows[0];
            }
            catch (err) {
                throw new Error(`failed to find product ${id}. ${err}`);
            }
        });
    }
    update(id, newProductData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name: newName, price } = newProductData;
            try {
                const sql = "UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *";
                const connection = yield database_1.default.connect();
                const { rows } = yield connection.query(sql, [newName, price, id]);
                connection.release();
                return rows[0];
            }
            catch (err) {
                throw new Error(`failed to update product ${name}. ${err}`);
            }
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "DELETE FROM products WHERE id=($1)";
                const connection = yield database_1.default.connect();
                const { rows } = yield connection.query(sql, [id]);
                connection.release();
                return rows[0];
            }
            catch (err) {
                throw new Error(`failed to delete product ${id}. ${err}`);
            }
        });
    }
}
exports.ProductStore = ProductStore;
