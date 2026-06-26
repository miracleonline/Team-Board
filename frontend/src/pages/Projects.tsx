import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../services/project";

import type { Project } from "../services/project";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [editingId, setEditingId] =
    useState("");

  const loadProjects = async () => {
    try {
      const data = await getProjects();

      setProjects(data);
    } catch {
      toast.error("Failed to load projects");
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const saveProject = async () => {
    if (!title.trim()) {
      return toast.error("Title required");
    }

    try {
      if (editingId) {
        await updateProject(editingId, {
          title,
          description,
        });

        toast.success("Project updated");
      } else {
        await createProject({
          title,
          description,
        });

        toast.success("Project created");
      }

      setTitle("");
      setDescription("");
      setEditingId("");

      loadProjects();
    } catch {
      toast.error("Operation failed");
    }
  };

  const editProject = (project: Project) => {
    setEditingId(project._id);

    setTitle(project.title);

    setDescription(project.description);
  };

  const removeProject = async (
    id: string
  ) => {
    if (!confirm("Delete project?"))
      return;

    await deleteProject(id);

    toast.success("Project deleted");

    loadProjects();
  };

  return (
    <div className="container">
      <h1>Projects</h1>

      <input
        placeholder="Project title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <button onClick={saveProject}>
        {editingId
          ? "Update Project"
          : "Add Project"}
      </button>

      <hr />

      {projects.map((project) => (
        <div
          key={project._id}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            marginTop: 15,
          }}
        >
          <h3>{project.title}</h3>

          <p>{project.description}</p>

          <button
            onClick={() =>
              editProject(project)
            }
          >
            Edit
          </button>

          <button
            onClick={() =>
              removeProject(project._id)
            }
          >
            Delete
          </button>
        </div>
      ))}

      <br />

      <Link to="/">Dashboard</Link>
    </div>
  );
};

export default Projects;