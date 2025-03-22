import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import DPlogo from "../assets/Images/dp.png"

function Register() {
  const districts = [
    "Central Delhi",
    "East Delhi",
    "New Delhi",
    "North Delhi",
    "North East Delhi",
    "North West Delhi",
    "Shahdara",
    "South Delhi",
    "South East Delhi",
    "South West Delhi",
    "West Delhi",
  ];

  const fields = [
    { name: "fullName", type: "text", placeholder: "Full Name" },
    { name: "policeStation", type: "text", placeholder: "Police Station" },
    { name: "mobile", type: "text", placeholder: "Mobile" },
    { name: "email", type: "email", placeholder: "Email" },
    { name: "designation", type: "text", placeholder: "Designation" },
    { name: "password", type: "password", placeholder: "Password" },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
    },
  ];

  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {
      district: "",
      role: "",
      avatar: null,
    })
  );

  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        setFormData({ ...formData, [name]: file });
        const reader = new FileReader();
        reader.onloadend = () => setPreviewAvatar(reader.result);
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      await axios.post(
        "https://malkhanaserver-production.up.railway.app/api/v1/users/register",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          
          }
        }
      );
      setSuccess("Registration successful! You can now log in.");
      toast.success("Registration successful! You can now log in.");
      window.location.href="/"
      setFormData(
        fields.reduce(
          (acc, field) => ({ ...acc, [field.name]: "" }),
          { district: "", role: "", avatar: null }
        )
      );
      setPreviewAvatar(null);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center gap-16 max-md:flex-col min-h-screen p-4 ">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-6 ">
        <div className="w-40 h-36 mx-auto">
          <img
            className="h-full w-full"
            src={DPlogo}
            alt="logo"
          />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 ">
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
                className="w-full py-3 px-4 border rounded-lg text-sm "
              />
            ))}
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              className="w-full py-3 px-4 border rounded-lg text-sm"
            >
              <option value="" disabled>
                Select District
              </option>
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full py-3 px-4 border rounded-lg text-sm"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
            <div className="col-span-2">
              <label className="block text-gray-700 text-xs font-medium">
                Profile Photo
              </label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
                className="w-full py-3 px-4 border rounded-lg text-sm"
              />
              {previewAvatar && (
                <img
                  src={previewAvatar}
                  alt="Avatar Preview"
                  className="mt-2 w-24 h-24 object-cover rounded-lg"
                />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 text-sm mt-4 font-medium text-white bg-[#A38F58] rounded-lg hover:bg-[#8c7a48] focus:outline-none cursor-pointer"
          >
            Register
          </button>
        </form>
        <p className="mt-2 text-sm text-gray-600  text-center">
          You have an account?{" "}
          <Link className="text-blue-600 hover:underline " to={"/"}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;