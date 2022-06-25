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
const user_1 = require("../../models/user");
const UserStoreInstance = new user_1.UserStore();
describe("User Model", () => {
    const user = {
        username: "heshamsayed",
        firstname: "hesham",
        lastname: "sayed",
        password: "password123"
    };
    function createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserStoreInstance.create(user);
        });
    }
    function deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserStoreInstance.deleteUser(id);
        });
    }
    it("should have an index method", () => {
        expect(UserStoreInstance.index).toBeDefined();
    });
    it("should have a show method", () => {
        expect(UserStoreInstance.read).toBeDefined();
    });
    it("should have a create method", () => {
        expect(UserStoreInstance.create).toBeDefined();
    });
    it("should have a remove method", () => {
        expect(UserStoreInstance.deleteUser).toBeDefined();
    });
    it("create method should create a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        if (createdUser) {
            const { username, firstname, lastname } = createdUser;
            expect(username).toBe(user.username);
            expect(firstname).toBe(user.firstname);
            expect(lastname).toBe(user.lastname);
        }
        yield deleteUser(createdUser.id);
    }));
    it("index method should return a list of users", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        const userList = yield UserStoreInstance.index();
        expect(userList).toEqual([createdUser]);
        yield deleteUser(createdUser.id);
    }));
    it("show method should return the correct users", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        const userFromDb = yield UserStoreInstance.read(createdUser.id);
        expect(userFromDb).toEqual(createdUser);
        yield deleteUser(createdUser.id);
    }));
    it("remove method should remove the user", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        yield deleteUser(createdUser.id);
        const userList = yield UserStoreInstance.index();
        expect(userList).toEqual([]);
    }));
    it("update method should update the user", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        const newUserData = {
            firstname: "hesham",
            lastname: "sayed",
        };
        const { firstname, lastname } = yield UserStoreInstance.update(createdUser.id, newUserData);
        expect(firstname).toEqual(newUserData.firstname);
        expect(lastname).toEqual(newUserData.lastname);
        yield deleteUser(createdUser.id);
    }));
    it("authenticates the user with a password", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        const userFromDb = yield UserStoreInstance.authenticate(user.username, user.password);
        if (userFromDb) {
            const { username, firstname, lastname } = userFromDb;
            expect(username).toBe(user.username);
            expect(firstname).toBe(user.firstname);
            expect(lastname).toBe(user.lastname);
        }
        yield deleteUser(createdUser.id);
    }));
});
