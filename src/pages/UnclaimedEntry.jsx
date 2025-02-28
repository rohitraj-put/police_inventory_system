import { useState } from "react";

export default function UnclaimedEntry() {
  const [formData, setFormData] = useState({
    firNo: "",
    mudNo: "",
    gdNo: "",
    ioName: "",
    banam: "",
    underSection: "",
    description: "",
    place: "",
    court: "",
    firYear: "",
    gdDate: "",
    DakhilKarneWala: "",
    caseProperty: "",
    actType: "",
    status: "",
    avatar: null,
  });

  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        setFormData({ ...formData, avatar: file });

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in formData) {
      if (!formData[key]) {
        setError("All fields are required");
        return;
      }
    }
    setError("");

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://localhost:5000/api/unclaimedentry", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Unclaimed Entry</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
        {Object.keys(formData).map((field) => {
          if (field === "avatar") {
            return (
              <div key={field} className="col-span-3">
                <label className="block text-gray-700 capitalize">
                  Upload Avatar
                </label>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Avatar Preview"
                    className="mt-2 w-24 h-24 object-cover rounded"
                  />
                )}
              </div>
            );
          }
          if (field === "description") {
            return (
              <div key={field} className="col-span-3">
                <label className="block text-gray-700 capitalize">
                  Description
                </label>
                <textarea
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  rows="4"
                />
              </div>
            );
          }
          if (field === "gdDate") {
            return (
              <div key={field}>
                <label className="block text-gray-700 capitalize">
                  GD Date
                </label>
                <input
                  type="date"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>
            );
          }
          return (
            <div key={field}>
              <label className="block text-gray-700 capitalize">{field}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
          );
        })}
        <button
          type="submit"
          className="bg-[#8c7a48] w-full text-white px-4 py-2 rounded hover:bg-[#af9859]"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
