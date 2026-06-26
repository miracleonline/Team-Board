import { Link } from "react-router-dom";

const Tasks = () => {
  return (
    <div className="container">
      <h1>Tasks</h1>

      <button>Add Task</button>

      <br />
      <br />

      <Link to="/">Back to Dashboard</Link>
    </div>
  );
};

export default Tasks;