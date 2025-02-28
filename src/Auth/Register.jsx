import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    fullname: "",
    policeStation: "",
    mobile: "",
    email: "",
    designation: "",
    role: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <div className="flex items-center  justify-center gap-16 max-md:flex-col min-h-screen p-4 dark:bg-neutral-900">
      <div className="w-1/2 h-full rounded-2xl overflow-hidden shadow-lg dark:bg-neutral-900">
        <img
          className=" object-cover"
          src="https://delhipolice.gov.in/LatestUpdatesImage/35512_1.jpeg"
          alt="image"
        />
      </div>
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-6 dark:bg-neutral-900 dark:border-neutral-700">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Sign Up
          </h1>
        </div>
        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="grid gap-y-4">
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              required
              value={formData.fullname}
              onChange={handleChange}
              className="w-full py-3 px-4 border rounded-lg text-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
            />
            <input
              type="text"
              name="policeStation"
              placeholder="Police Station"
              required
              value={formData.policeStation}
              onChange={handleChange}
              className="w-full py-3 px-4 border rounded-lg text-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile"
              required
              value={formData.mobile}
              onChange={handleChange}
              className="w-full py-3 px-4 border rounded-lg text-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full py-3 px-4 border rounded-lg text-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
            />
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              required
              value={formData.designation}
              onChange={handleChange}
              className="w-full py-3 px-4 border rounded-lg text-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
            />
            <input
              type="text"
              name="role"
              placeholder="Role"
              required
              value={formData.role}
              onChange={handleChange}
              className="w-full py-3 px-4 border rounded-lg text-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full py-3 px-4 border rounded-lg text-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
            />
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm font-medium text-white bg-[#A38F58] rounded-lg hover:bg-[#8c7a48] focus:outline-none cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
