import mongoose from "mongoose";
import request from "supertest";
import Server from "../../src/models/Server";

// Database connection
beforeEach(async () => {
  try {
    await mongoose.connect(process.env.CUSTOM_VAR!);
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

// GET
describe("GET /api/tasks", () => {
  it("Should return all tasks", async () => {
    const server = new Server();
    const app = server.app;
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

// POST
describe("POST /api/tasks", () => {
  it("Should create a task", async () => {
    const server = new Server();
    const app = server.app;
    const res = await request(app).post("/api/tasks").send({
      title: "Task 1",
      content: "To Do task",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Task 1");
  });
});

// PUT
describe("PUT /api/tasks/taskId", () => {
  it("Should update a task", async () => {
    const server = new Server();
    const app = server.app;
    const res = await request(app)
      .put("/api/tasks/65eb7eae13a9ab71e71bda03")
      .send({
        title: "Task 1",
        content: "To Do task",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.content).toBe("To Do task");
  });
});

// DELETE
describe("DELETE /api/tasks/taskId", () => {
  it("Should delete a task", async () => {
    const server = new Server();
    const app = server.app;
    const res = await request(app).delete(
      "/api/tasks/65eb7eae13a9ab71e71bda03"
    );
    expect(res.statusCode).toBe(204);
  });
});
