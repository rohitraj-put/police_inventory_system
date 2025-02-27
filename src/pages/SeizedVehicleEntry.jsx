import React, { useState } from "react";
import axios from "axios";

const SeizedVehicleEntry = () => {
  const fields = [
    { label: "Mud No", name: "mudNo" },
    { label: "G D No", name: "gdNo" },
    { label: "Reg No.", name: "regNo" },
    { label: "Under Section", name: "underSection" },
    { label: "Vehicle Type", name: "vehicleType" },
    { label: "Chassis No.", name: "chasisNo" },
    { label: "G D Date", name: "gdDate", type: "date" },
    { label: "Act Type", name: "actType" },
    { label: "Colour", name: "colour" },
    { label: "Photo", name: "photo", type: "file" },
    { label: "Engine No.", name: "engineNo" },
    { label: "Result", name: "result" },
  ];

  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    fields.forEach(({ name }) => data.append(name, formData[name]));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/malkhana",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert(response.data.message);
      setFormData(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
      );
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Error submitting form");
    }
  };

  return (
    <div className="w-full mx-auto bg-white ">
      <h2 className="text-2xl font-bold mb-6">Malkhana Entry Form</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {fields.map(({ label, name, type = "text" }) => (
          <div key={name} className="flex flex-col">
            <label
              className="text-gray-700 font-medium capitalize"
              htmlFor={name}
            >
              {label}
            </label>
            <input
              type={type}
              id={name}
              name={name}
              value={type !== "file" ? formData[name] : undefined}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full col-span-2 md:col-span-2 bg-[#8c7a48] text-white p-2 rounded-md hover:bg-[#a48f53] transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SeizedVehicleEntry;
