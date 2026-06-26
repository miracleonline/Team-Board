import api from "./api";

export interface Project {
  _id: string;
  title: string;
  description: string;
}

export const getProjects = async () => {
  const res = await api.get("/projects");
  return res.data;
};

export const createProject = async (
  project: Omit<Project, "_id">
) => {
  const res = await api.post("/projects", project);
  return res.data;
};

export const updateProject = async (
  id: string,
  project: Omit<Project, "_id">
) => {
  const res = await api.patch(`/projects/${id}`, project);
  return res.data;
};

export const deleteProject = async (
  id: string
) => {
  const res = await api.delete(`/projects/${id}`);
  return res.data;
};