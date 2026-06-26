import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  Task,
} from "../services/task";

import { getProjects } from "../services/project";

interface Project {
  _id: string;
  title: string;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState("");
  const [status, setStatus] = useState("Todo");

  const [editingId, setEditingId] = useState("");

  const loadData = async () => {
    try {
      const [taskData, projectData] = await Promise.all([
        getTasks(),
        getProjects(),
      ]);

      setTasks(taskData);
      setProjects(projectData);
    } catch {
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const reset = () => {
    setTitle("");
    setDescription("");
    setProject("");
    setStatus("Todo");
    setEditingId("");
  };

  const saveTask = async () => {
    if (!title.trim() || !project) {
      return toast.error("Title and project required");
    }

    try {
      if (editingId) {
        await updateTask(editingId, {
          title,
          description,
          status,
        });

        toast.success("Task updated");
      } else {
        await createTask({
          title,
          description,
          project,
          status,
        });

        toast.success("Task created");
      }

      reset();
      loadData();
    } catch {
      toast.error("Operation failed");
    }
  };

  const editTask = (task: Task) => {
    setEditingId(task._id);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setProject(task.project?._id || "");
  };

  const removeTask = async (id: string) => {
    if (!confirm("Delete task?")) return;

    await deleteTask(id);
    toast.success("Task deleted");
    loadData();
  };

  return (
    <div className="container">
      <h1>Tasks</h1>

      <input
        placeholder="Task title"
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

      <select
        value={project}
        onChange={(e) =>
          setProject(e.target.value)
        }
      >
        <option value="">Select Project</option>
        {projects.map((p) => (
          <option
            key={p._id}
            value={p._id}
          >
            {p.title}
          </option>
        ))}
      </select>

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
      >
        <option value="Todo">Todo</option>
        <option value="In Progress">
          In Progress
        </option>
        <option value="Done">Done</option>
      </select>

      <button onClick={saveTask}>
        {editingId ? "Update Task" : "Add Task"}
      </button>

      <hr />

      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            marginTop: 15,
          }}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>
            Status: <b>{task.status}</b>
          </p>
          <p>
            Project: {task.project?.title}
          </p>

          <button onClick={() => editTask(task)}>
            Edit
          </button>

          <button onClick={() => removeTask(task._id)}>
            Delete
          </button>
        </div>
      ))}

      <br />
      <Link to="/">Dashboard</Link>
    </div>
  );
};

export default Tasks;