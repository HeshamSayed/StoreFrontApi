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
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "SELECT * FROM orders";
                const { rows } = yield connection.query(sql);
                const orderProductsSql = "SELECT product_id, quantity FROM order_products WHERE order_id=($1)";
                const orders = [];
                for (const order of rows) {
                    const { rows: orderProductRows } = yield connection.query(orderProductsSql, [order.id]);
                    orders.push(Object.assign(Object.assign({}, order), { products: orderProductRows }));
                }
                connection.release();
                return orders;
            }
            catch (err) {
                throw new Error(`Could not get orders. ${err}`);
            }
        });
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const { products, status, user_id } = order;
            try {
                const sql = "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *";
                const connection = yield database_1.default.connect();
                const { rows } = yield connection.query(sql, [user_id, status]);
                const order = rows[0];
                const orderProductsSql = "INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity";
                const orderProducts = [];
                for (const product of products) {
                    const { product_id, quantity } = product;
                    const { rows } = yield connection.query(orderProductsSql, [order.id, product_id, quantity]);
                    orderProducts.push(rows[0]);
                }
                connection.release();
                return Object.assign(Object.assign({}, order), { products: orderProducts });
            }
            catch (err) {
                throw new Error(`Could not add new order for user ${user_id}. ${err}`);
            }
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM orders WHERE id=($1)";
                const connection = yield database_1.default.connect();
                const { rows } = yield connection.query(sql, [id]);
                const order = rows[0];
                const orderProductsSql = "SELECT product_id, quantity FROM order_products WHERE order_id=($1)";
                const { rows: orderProductRows } = yield connection.query(orderProductsSql, [id]);
                connection.release();
                return Object.assign(Object.assign({}, order), { products: orderProductRows });
            }
            catch (err) {
                throw new Error(`Could not find order ${id}. ${err}`);
            }
        });
    }
    update(id, newOrderData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { products, status, user_id } = newOrderData;
            try {
                const sql = "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *";
                const connection = yield database_1.default.connect();
                const { rows } = yield connection.query(sql, [status, id]);
                const order = rows[0];
                const orderProductsSql = "UPDATE order_products SET product_id = $1, quantity = $2 WHERE order_id = $3 RETURNING product_id, quantity";
                const orderProducts = [];
                for (const product of products) {
                    const { product_id, quantity } = product;
                    const { rows } = yield connection.query(orderProductsSql, [product_id, quantity, order.id]);
                    orderProducts.push(rows[0]);
                }
                connection.release();
                return Object.assign(Object.assign({}, order), { products: orderProducts });
            }
            catch (err) {
                throw new Error(`Could not update order for user ${user_id}. ${err}`);
            }
        });
    }
    deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const orderProductsSql = "DELETE FROM order_products WHERE order_id=($1)";
                yield connection.query(orderProductsSql, [id]);
                const sql = "DELETE FROM orders WHERE id=($1)";
                const { rows } = yield connection.query(sql, [id]);
                const order = rows[0];
                connection.release();
                return order;
            }
            catch (err) {
                throw new Error(`Could not delete order ${id}. ${err}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
