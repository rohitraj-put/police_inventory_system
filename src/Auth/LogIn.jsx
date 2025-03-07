import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function LogIn() {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (email && localStorage.getItem("token")) {
      const autoLogin = async () => {
        const loadingToastId = toast.loading("Logging in automatically...");

        try {
          const res = await axios.post(
            "https://malkhanaserver.onrender.com/api/v1/users/login",
            { email, password }
          );
          localStorage.setItem("token", res.data.data.accessToken);
          localStorage.setItem("email", email);
          toast.dismiss(loadingToastId);
          toast.success("Logged in successfully!");
          navigate("/dashboard"); // Redirect after login
        } catch (err) {
          toast.dismiss(loadingToastId);
          setError("Invalid email or password");
          toast.error("Invalid email or password");
        }
      };

      autoLogin();
    }
  }, [email, password, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const loadingToastId = toast.loading("Logging in...");

    try {
      const res = await axios.post(
        "https://malkhanaserver.onrender.com/api/v1/users/login",
        { email, password }
      );
      localStorage.setItem("token", res.data.data.accessToken);
      localStorage.setItem("email", email);
      toast.dismiss(loadingToastId);
      toast.success("Logged in successfully!");
      navigate("/dashboard"); // Redirect after login
    } catch (err) {
      toast.dismiss(loadingToastId);
      setError("Invalid email or password");
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center p-2 dark:bg-neutral-900">
      <Toaster />
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-6 dark:bg-neutral-900 dark:border-neutral-700">
        <div className="w-40 h-36 mx-auto">
          <img
            className="h-full w-full"
            src="https://vectorseek.com/wp-content/uploads/2023/09/Delhi-Police-Logo-Vector.svg-.png"
            alt="logo"
          />
        </div>
        <div className="text-center mt-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Sign In
          </h1>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="mt-5">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-y-4">
              <div>
                <label className="block text-sm mb-2 dark:text-white">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm font-medium text-white bg-[#A38F58] rounded-lg hover:bg-[#8c7a48] focus:outline-none cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </form>
          <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400 text-center">
            You Don't have an account?{" "}
            <Link
              className="text-blue-600 hover:underline dark:text-blue-500"
              to={"/register"}
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
