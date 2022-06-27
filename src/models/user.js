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
exports.UserStore = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
class UserStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "SELECT * FROM users";
                const { rows } = yield connection.query(sql);
                connection.release();
                return rows;
            }
            catch (err) {
                throw new Error(`failed to get users. ${err}`);
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstname, lastname, username, password } = user;
            try {
                const sql = "INSERT INTO users (firstname, lastname, username, password_digest) VALUES($1, $2, $3, $4) RETURNING *";
                const hash = bcrypt_1.default.hashSync(password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS, 10));
                const connection = yield database_1.default.connect();
                const { rows } = yield connection.query(sql, [firstname, lastname, username, hash]);
                connection.release();
                return rows[0];
            }
            catch (err) {
                throw new Error(`failed to add new user ${firstname} ${lastname}. ${err}`);
            }
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM users WHERE id=($1)";
                const connection = yield database_1.default.connect();
                const { rows } = yield connection.query(sql, [id]);
                connection.release();
                return rows[0];
            }
            catch (err) {
                throw new Error(`failed to find user ${id}. ${err}`);
            }
        });
    }
    update(id, newUserData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstname, lastname } = newUserData;
            try {
                const sql = "UPDATE users SET firstname = $1, lastname = $2 WHERE id = $3 RETURNING *";
                const connection = yield database_1.default.connect();
                const { rows } = yield connection.query(sql, [firstname, lastname, id]);
                connection.release();
                return rows[0];
            }
            catch (err) {
                throw new Error(`failed to update user ${firstname} ${lastname}. ${err}`);
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "DELETE FROM users WHERE id=($1)";
                const connection = yield database_1.default.connect();
                yield connection.query(sql, [id]);
                connection.release();
                return true;
            }
            catch (err) {
                throw new Error(`failed to delete user ${id}. ${err}`);
            }
        });
    }
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM users WHERE username=($1)";
                const connection = yield database_1.default.connect();
                const { rows } = yield connection.query(sql, [username]);
                if (rows.length > 0) {
                    const user = rows[0];
                    if (bcrypt_1.default.compareSync(password + BCRYPT_PASSWORD, user.password_digest)) {
                        return user;
                    }
                }
                connection.release();
                return null;
            }
            catch (err) {
                throw new Error(`failed to find user ${username}. ${err}`);
            }
        });
    }
}
exports.UserStore = UserStore;
