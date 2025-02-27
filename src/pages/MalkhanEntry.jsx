import React, { useState } from "react";
import axios from "axios";

const MalkhanEntry = () => {
  const labelNames = [
    "FIR No",
    "Mud No",
    "G D No",
    "I O Name",
    "Banam",
    "Under Section",
    "Description",
    "Place",
    "Court",
    "FIR Year",
    "G D Date",
    "Dakhil Karne Wala",
    "Case Property",
    "Act Type",
    "Status",
    "Photo",
  ];

  const fieldNames = [
    "firNo",
    "mudNo",
    "gdNo",
    "ioName",
    "banam",
    "underSection",
    "description",
    "place",
    "court",
    "firYear",
    "gdDate",
    "DakhilKarneWala",
    "caseProperty",
    "actType",
    "status",
    "avtar",
  ];

  const [formData, setFormData] = useState(
    fieldNames.reduce((acc, field) => ({ ...acc, [field]: "" }), {})
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/malkhana",
        formData
      );
      alert(response.data.message);
      setFormData(
        fieldNames.reduce((acc, field) => ({ ...acc, [field]: "" }), {})
      );
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Error submitting form");
    }
  };

  return (
    <div className="w-full mx-auto bg-white  ">
      <h2 className="text-2xl font-bold mb-4">Malkhana Entry Form</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {fieldNames.map((field, index) => (
          <div key={field} className="flex flex-col">
            <label
              className="text-gray-700 font-medium capitalize"
              htmlFor={field}
            >
              {labelNames[index]}
            </label>
            <input
              type="text"
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="col-span-2 md:col-span-4 cursor-pointer bg-[#8c7a48] text-white p-2 rounded-md hover:bg-[#a48f53]"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MalkhanEntry;
