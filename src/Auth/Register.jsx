import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const fields = [
    { name: "fullName", type: "text", placeholder: "Full Name" },
    { name: "policeStation", type: "text", placeholder: "Police Station" },
    { name: "mobile", type: "text", placeholder: "Mobile" },
    { name: "email", type: "email", placeholder: "Email" },
    { name: "designation", type: "text", placeholder: "Designation" },
    { name: "role", type: "text", placeholder: "Role" },
    { name: "password", type: "password", placeholder: "Password" },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
    },
  ];

  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post(
        "https://malkhanaserver.onrender.com/api/v1/users/ragister",
        formData
      );
      setSuccess("Registration successful! You can now log in.");
      setFormData(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
      );
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center gap-16 max-md:flex-col min-h-screen p-4 dark:bg-neutral-900">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-6 dark:bg-neutral-900 dark:border-neutral-700">
        <div className="w-40 h-36 mx-auto">
          <img
            className="h-full w-full"
            src="https://vectorseek.com/wp-content/uploads/2023/09/Delhi-Police-Logo-Vector.svg-.png"
            alt="logo"
          />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Registration Form
          </h1>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {fields.map(({ name, type, placeholder }, index) => (
              <input
                key={index}
                type={type}
                name={name}
                placeholder={placeholder}
                required
                value={formData[name]}
                onChange={handleChange}
                className="w-full py-3 px-4 border rounded-lg text-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 text-sm mt-4 font-medium text-white bg-[#A38F58] rounded-lg hover:bg-[#8c7a48] focus:outline-none cursor-pointer"
          >
            Register
          </button>
        </form>
        <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400 text-center">
          You have an account?{" "}
          <Link
            className="text-blue-600 hover:underline dark:text-blue-500"
            to={"/"}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
