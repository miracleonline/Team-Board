import { Link } from "react-router-dom";

const Projects = () => {
  return (
    <div className="container">
      <h1>Projects</h1>

      <button>Add Project</button>

      <br />
      <br />

      <Link to="/">Back to Dashboard</Link>
    </div>
  );
};

export default Projects;