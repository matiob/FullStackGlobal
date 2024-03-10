import { Task, TaskInput } from "../models/task";
import fetchData from "../utils/fetchData";

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetchData("/api/tasks", { method: "GET" });
  return response.json();
}

export async function fetchTasksByTitle(taskTitle: string): Promise<Task[]> {
  const response = await fetchData("/api/tasks/title?taskTitle=" + taskTitle, { method: "GET" });
  return response.json();
}

export async function createTask(task: TaskInput): Promise<Task> {
  const response = await fetchData("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return response.json();
}

export async function updateTask(
  taskId: string,
  task: TaskInput
): Promise<Task> {
  const response = await fetchData("/api/tasks/" + taskId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return response.json();
}

export async function deleteTask(taskId: string) {
  await fetchData("/api/tasks/" + taskId, { method: "DELETE" });
}
