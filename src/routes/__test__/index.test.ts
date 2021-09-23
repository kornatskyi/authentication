const testApp = require("../../app");
const request = require("supertest");

describe("signup", () => {
  it("return 200 status code if user successfully registered", async () => {
    const response = await request(app).post("/signup").send({
      email: "some@email.com",
      name: "Some Name",
      password: "somePass",
    });

    expect(response.statusCode).toEqual(200);
  });
});
