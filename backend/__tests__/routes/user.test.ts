import Server from "../../src/models/Server";
import request from "supertest";
import mongoose from "mongoose";

jest.setTimeout(30000)

// Database connection
beforeEach(async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN_STR!);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
});

afterEach(async () => {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
  }
});

// TESTS
describe("POST /api/users/signup", () => {
  it("returns status code 201 if first name is passed", async () => {
    const server = new Server();
    const app = server.app;
    const res = await request(app).post("/api/users/signup").send({
      username: "matiob",
      email: "buraschi.mateo@gmail.com",
      password: "Mateo1986",
    });

    expect(res.statusCode).toEqual(201);
  });

  it("returns bad request if some data is missing", async () => {
    const server = new Server();
    const app = server.app;
    const res = await request(app).post("/api/users/signup").send();
    expect(res.statusCode).toEqual(400);
  });
});
