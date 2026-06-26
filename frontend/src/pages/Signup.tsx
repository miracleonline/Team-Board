import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../context/AuthContext";

interface SignupForm {
  name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const { signup } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>();

  const onSubmit = async (data: SignupForm) => {
    try {
      await signup(
        data.name,
        data.email,
        data.password
      );

      toast.success("Account created");

      navigate("/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Signup failed"
      );
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Name"
          {...register("name", {
            required: "Name is required",
          })}
        />

        <p>{errors.name?.message}</p>

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
          Signup
        </button>
      </form>

      <p>
        Already have an account?
        <Link to="/login"> Login</Link>
      </p>
    </div>
  );
};

export default Signup;