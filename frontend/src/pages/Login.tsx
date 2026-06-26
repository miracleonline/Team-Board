import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);

      toast.success("Login successful");

      navigate("/");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
          })}
        />

        <p>{errors.email?.message}</p>

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
          })}
        />

        <p>{errors.password?.message}</p>

        <button disabled={isSubmitting}>
          Login
        </button>
      </form>

      <p>
        Don't have an account?
        <Link to="/signup"> Signup</Link>
      </p>
    </div>
  );
};

export default Login;