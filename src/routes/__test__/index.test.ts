import { response } from "express";
import testApp from "../../app";
const request = require("supertest");

describe("signup", () => {
  it("return 201 status code if user successfully registered", async () => {
    const response = await request(testApp).post("/signup").send({
      email: "some@email.com",
      name: "Some Name",
      password: "somePass",
    });

    expect(response.statusCode).toEqual(201);
  });
});

describe("signup", () => {
  it("return 400 if request doesn't content some credentials", async () => {
    const response = await request(testApp).post("/signup").send({
      email: "fsdas@email.com",
      name: "Some Name",
    });
    expect(response.statusCode).toEqual(400);
  });
});


