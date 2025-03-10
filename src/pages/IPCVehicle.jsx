import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useIpc from "../hooks/useIpc";
import exportToExcel from "../Excel/exportToExcel";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaPrint } from "react-icons/fa";
import PrintMalkhanaEntry from "../Excel/PrintMalkhanaEntry";

export default function IPCVehicle() {
  const [formData, setFormData] = useState({
    mudNo: "",
    gdNo: "",
    underSection: "",
    vehicleType: "Car",
    regNo: "",
    chassisNo: "",
    vivechak: "",
    engineNo: "",
    colour: "",
    gdDate: new Date().toISOString().split("T")[0],
    actType: "",
    avatar: null,
    firNo: "",
    vehicleOwner: "",
    result: "",
  });

  const [preview, setPreview] = useState(null);
  const [searchParams, setSearchParams] = useState({ mudNo: "", gdNo: "" });
  const { data, loading, deleteItem, updateItem } = useIpc();
  const [editingId, setEditingId] = useState(null);

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
        toast.error("All fields are required");
        return;
      }
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    // Show submitting toast
    const submittingToastId = toast.loading("Data is submitting...");

    try {
      const token = localStorage.getItem("token"); // Replace with the actual token

      const response = await axios.post(
        "https://malkhanaserver-production.up.railway.app/api/v1/ipcVehicle",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message, { id: submittingToastId });
      console.log(response);
      // Clear form after submission
      setFormData({
        mudNo: "",
        gdNo: "",
        underSection: "",
        vehicleType: "Car",
        regNo: "",
        chassisNo: "",
        vivechak: "",
        engineNo: "",
        colour: "",
        gdDate: new Date().toISOString().split("T")[0],
        actType: "",
        avatar: null,
        firNo: "",
        vehicleOwner: "",
        result: "",
      });
      setPreview(null);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message, { id: submittingToastId });
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleEditClick = (entry) => {
    setEditingId(entry._id);
    setFormData({
      mudNo: entry.mudNo,
      gdNo: entry.gdNo,
      underSection: entry.underSection,
      vehicleType: entry.vehicleType,
      regNo: entry.regNo,
      chassisNo: entry.chassisNo,
      vivechak: entry.vivechak,
      engineNo: entry.engineNo,
      colour: entry.colour,
      gdDate: entry.gdDate,
      actType: entry.actType,
      avatar: entry.avatar,
      firNo: entry.firNo,
      vehicleOwner: entry.vehicleOwner,
      result: entry.result,
    });
    setPreview(entry.avatar);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    const submittingToastId = toast.loading("Updating data...");

    try {
      const response = await updateItem(editingId, formDataToSend);

      toast.success(response.data.message, { id: submittingToastId });
      console.log("Update Success:", response.data);

      // Reset form after successful update
      setFormData({
        mudNo: "",
        gdNo: "",
        underSection: "",
        vehicleType: "Car",
        regNo: "",
        chassisNo: "",
        vivechak: "",
        engineNo: "",
        colour: "",
        gdDate: new Date().toISOString().split("T")[0],
        actType: "",
        avatar: null,
        firNo: "",
        vehicleOwner: "",
        result: "",
      });
      setEditingId(null);
      setPreview(null);
    } catch (error) {
      toast.error(error.response.data.message, { id: submittingToastId });
      console.error("Error:", error);
    }
  };

  const filteredData = data?.filter((entry) => {
    return (
      (searchParams.mudNo === "" || entry.mudNo.includes(searchParams.mudNo)) &&
      (searchParams.gdNo === "" || entry.gdNo.includes(searchParams.gdNo))
    );
  });

  return (
    <>
      <div className="w-full mx-auto p-4 rounded-lg text-sm">
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? "Update IPC Vehicle Entry" : "IPC Vehicle Entry"}
        </h2>
        <form
          onSubmit={editingId ? handleUpdate : handleSubmit}
          className="grid grid-cols-4 gap-4"
        >
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
            className="bg-[#8c7a48] w-80 cursor-pointer text-white px-4 py-2 rounded hover:bg-[#af9859] col-span-4"
          >
            {editingId ? "Update Entry" : "Submit"}
          </button>
        </form>
      </div>

      {/* ____________________All IPC Vehicle EntryData=------------ */}

      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-3">
            All IPC Vehicle Entries
          </h2>
          {data && data.length > 0 && (
            <button
              onClick={() => exportToExcel(data)}
              className="bg-[#8c7a48] text-white cursor-pointer px-3 py-2 rounded hover:bg-[#af9859] mb-2"
            >
              Download as Excel
            </button>
          )}
        </div>

        <div className="flex mb-4">
          <input
            type="text"
            name="mudNo"
            value={searchParams.mudNo}
            onChange={handleSearchChange}
            placeholder="Search by Mud No"
            className="p-2 border border-gray-300 rounded mr-2 text-xs"
          />
          <input
            type="text"
            name="gdNo"
            value={searchParams.gdNo}
            onChange={handleSearchChange}
            placeholder="Search by GD No"
            className="p-2 border border-gray-300 rounded text-xs"
          />
        </div>

        {loading ? (
          <p className="text-gray-500">Loading entries...</p>
        ) : filteredData && filteredData.length > 0 ? (
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
                    "Chassis No",
                    "Vivechak",
                    "Engine No",
                    "Colour",
                    "GD Date",
                    "Act Type",
                    "Avatar",
                    "FIR No",
                    "Vehicle Owner",
                    "Result",
                    "Action",
                  ].map((header) => (
                    <th key={header} className="border border-gray-300 p-2">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((entry, index) => (
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
                      {entry.firNo}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.vehicleOwner}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.result}
                    </td>
                    <td className="border border-gray-300 p-2 flex items-center">
                      <button
                        onClick={() => deleteItem(entry._id)}
                        className=" text-rose-600 px-2 py-1 rounded  cursor-pointer"
                        title="Delete"
                      >
                        <MdDelete size={24} />
                      </button>
                      <button
                        onClick={() => handleEditClick(entry)}
                        className=" text-blue-600 px-2 py-1 rounded  cursor-pointer"
                        title="Update"
                      >
                        <FaEdit size={24} />
                      </button>
                    </td>
                    <button
                      onClick={() => PrintMalkhanaEntry(entry)}
                      className=" text-green-600 px-2 py-1 rounded  cursor-pointer"
                      title="Print"
                    >
                      <FaPrint size={24} />
                    </button>
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
