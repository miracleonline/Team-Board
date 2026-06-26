import api from "./api";

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  project: any;
}

export const getTasks = async () => {
  const res = await api.get("/tasks");
  return res.data;
};

export const createTask = async (task: {
  title: string;
  description: string;
  project: string;
  status?: string;
}) => {
  const res = await api.post("/tasks", task);
  return res.data;
};

export const updateTask = async (
  id: string,
  task: {
    title: string;
    description: string;
    status: string;
  }
) => {
  const res = await api.patch(`/tasks/${id}`, task);
  return res.data;
};

export const deleteTask = async (id: string) => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
};