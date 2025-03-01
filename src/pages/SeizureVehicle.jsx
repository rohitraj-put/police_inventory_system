import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useSeizureVehicle from "../hooks/useSeizureVehicle";

export default function SeizureVehicle() {
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
    firNo: "",
    banam: "",
    vehicleOwner: "",
    result: "",
  });

  const [preview, setPreview] = useState(null);
  const { data, loading } = useSeizureVehicle();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        setFormData({ ...formData, avatar: file });

        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
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
        toast.error("All fields except Avatar are required");
        return;
      }
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "https://malkhanaserver.onrender.com/api/v1/seizureVehicle",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Data submitted successfully");
        setFormData({
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
          firNo: "",
          banam: "",
          vehicleOwner: "",
          result: "",
        });
        setPreview(null);
      }
    } catch (error) {
      toast.error("Failed to submit data");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="w-full mx-auto p-4 rounded-lg text-sm">
        <Toaster />
        <h2 className="text-lg font-semibold mb-4">Seizure Vehicle Entry</h2>
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

      {/* ____________________All  Seizure EntryData=------------ */}

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3">
          All Seizure Vehicle Entries
        </h2>
        {loading ? (
          <p className="text-gray-500">Loading entries...</p>
        ) : data && data.length > 0 ? (
          <div className="overflow-auto max-h-[500px] border border-gray-300 rounded-lg">
            <table className="w-full border-collapse text-xs">
              <thead className="sticky top-0 bg-[#8c7a48] text-white z-10">
                <tr>
                  {[
                    "Mud No",
                    "GD No",
                    "Under Section",
                    "Vehicle Type",
                    "Reg No",
                    "chassis No",
                    "Vivechak",
                    "Engine No",
                    "Colour",
                    "GD Date",
                    "Act Type",
                    "Avatar",
                    "Banam",
                    "Result",
                  ].map((header) => (
                    <th key={header} className="border border-gray-300 p-2">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((entry, index) => (
                  <tr
                    key={index}
                    className="text-center border border-gray-300"
                  >
                    <td className="border border-gray-300 p-2">
                      {entry.mudNo}
                    </td>
                    <td className="border border-gray-300 p-2">{entry.gdNo}</td>

                    <td className="border border-gray-300 p-2">
                      {entry.underSection}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.vehicleType}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.regNo}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.chassisNo}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.vivechak}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.engineNo}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.colour}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.gdDate}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.actType}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.avatar ? (
                        <img
                          src={entry.avatar}
                          alt="Avatar"
                          className="w-10 h-10 object-cover rounded"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.banam}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.result}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No entries found.</p>
        )}
      </div>
    </>
  );
}
