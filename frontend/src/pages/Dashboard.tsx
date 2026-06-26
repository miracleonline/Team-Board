import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container">
      <h1>Dashboard</h1>

      <h3>Welcome {user?.name}</h3>

      <div>
        <Link to="/projects">
          <button>Projects</button>
        </Link>

        <Link to="/tasks">
          <button>Tasks</button>
        </Link>
      </div>

      <br />

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;