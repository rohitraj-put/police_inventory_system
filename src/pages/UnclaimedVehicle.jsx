import { useState } from "react";

export default function UnclaimedVehicle() {
  const [formData, setFormData] = useState({
    mudNo: "",
    gdNo: "",
    underSection: "",
    vehicleType: "Car",
    regNo: "",
    chassisNo: "",
    engineNo: "",
    colour: "",
    gdDate: "",
    actType: "",
    avatar: null,
    vivechak: "",
    banam: "",
    result: "",
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
      if (!formData[key] && key !== "avatar") {
        setError("All fields except Avatar are required");
        return;
      }
    }
    setError("");

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch(
        "http://localhost:5000/api/unclaimedvehicle",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

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
    <div className="w-full mx-auto p-4  rounded-lg text-sm">
      <h2 className="text-lg font-semibold mb-4">Unclaimed Vehicle Entry</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4">
        {Object.keys(formData).map((field) => (
          <div
            key={field}
            className={field === "result" ? "col-span-4" : "col-span-1"}
          >
            <label className="block text-gray-700 text-xs font-medium capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            {field === "vehicleType" ? (
              <select
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-xs"
              >
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="Truck">Truck</option>
                <option value="Bus">Bus</option>
                <option value="Other">Other</option>
              </select>
            ) : field === "result" ? (
              <textarea
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 h-16 text-xs"
              />
            ) : field === "gdDate" ? (
              <input
                type="date"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-xs"
              />
            ) : field !== "avatar" ? (
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-xs"
              />
            ) : (
              <>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1 text-xs"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Avatar Preview"
                    className="mt-2 w-24 h-24 object-cover rounded"
                  />
                )}
              </>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-[#8c7a48] w-80 text-white px-4 py-2 rounded hover:bg-[#af9859] col-span-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
