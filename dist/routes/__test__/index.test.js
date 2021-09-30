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
const app_1 = __importDefault(require("../../app"));
const request = require("supertest");
describe("signUp", () => {
    it("return 201 status code if user successfully registered", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app_1.default).post("/signUp").send({
            email: "some@email.com",
            name: "Some Name",
            password: "somePass",
        });
        expect(response.statusCode).toEqual(201);
    }));
});
describe("signUp", () => {
    it("return 400 if request doesn't content some credentials", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app_1.default).post("/signUp").send({
            email: "fsdas@email.com",
            name: "Some Name",
        });
        expect(response.statusCode).toEqual(400);
    }));
});
