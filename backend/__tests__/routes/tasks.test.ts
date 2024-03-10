import mongoose from "mongoose";
import request from "supertest";
import Server from "../../src/models/Server";

import { Request, Response } from 'express';

// Database connection
beforeEach(async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN_STR!);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
});

// TODO: mock express session

/* beforeEach(() => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  const stringId = '65ece082840b6892bbc16d1f';
  const objectId = mongoose.Types.ObjectId.createFromHexString(stringId);
  req = {
    session: {
      userId: objectId,
      id: 'wDCNZH-oA99wIWtFdzPLj2ePW8XI7eYr',
      cookie: {"originalMaxAge":3600000,"expires":"2024-03-10T22:49:20.918Z","httpOnly":true,"path":"/"},
      regenerate: jest.fn(),
      destroy: jest.fn(),
    } as any
  };
  res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  return { req, res };
}); */

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
