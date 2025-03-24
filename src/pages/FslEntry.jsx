import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useFsl from "../hooks/useFsl";
import exportToExcel from "../Excel/exportToExcel";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaPrint } from "react-icons/fa";
import PrintMalkhanaEntry from "../Excel/PrintMalkhanaEntry";
import useUser from "../hooks/useUser";

export default function FslEntry() {
  const [formData, setFormData] = useState({
    firNo: "",
    mudNo: "",
    gdNo: "",
    court: "",
    nameOfReciverPS: "",
    nameOfReciverFSL: "",
    gdDate: new Date().toISOString().split("T")[0],
    fslTime: new Date().toISOString().substring(11, 16),
    caseProperty: "",
    status: "",
    avatar: null,
    fslLocation: "INPS",
    description: "",
  });

  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);
  const [searchParams, setSearchParams] = useState({ firNo: "", mudNo: "" });
  const { data, loading, deleteItem, updateItem } = useFsl();
  const [editingId, setEditingId] = useState(null);

  const { user } = useUser();

  const singalData = data.filter((item) => item.policeStation === user?.policeStation);

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
        setError("All fields are required");
        toast.error("Please fill all required fields");
        return;
      }
    }
    setError("");

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    // Show submitting toast
    const submittingToastId = toast.loading("Data is submitting...");

    try {
      const token = localStorage.getItem("token"); // Replace with actual token
      const response = await axios.post(
        "https://malkhanaserver-production.up.railway.app/api/v1/fsl",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message, { id: submittingToastId });
      console.log("Success:", response.data);

      // Reset form after successful submission
      setFormData({
        firNo: "",
        mudNo: "",
        gdNo: "",
        court: "",
        nameOfReciverPS: "",
        nameOfReciverFSL: "",
        gdDate: new Date().toISOString().split("T")[0],
        fslTime: new Date().toISOString().substring(11, 16),
        caseProperty: "",
        status: "",
        avatar: null,
        fslLocation: "INPS",
        description: "",

      });
      setPreview(null);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to submit data");
      toast.error(error.response.data.message, { id: submittingToastId });
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const filteredData = singalData?.filter((entry) => {
    return (
      (searchParams.firNo === "" || entry.firNo?.includes(searchParams.firNo)) &&
      (searchParams.mudNo === "" || entry.mudNo?.includes(searchParams.mudNo))
    );
  });

  const handleEditClick = (entry) => {
    setEditingId(entry._id);
    setFormData({
      firNo: entry.firNo,
      mudNo: entry.mudNo,
      gdNo: entry.gdNo,
      court: entry.court,
      gdDate: entry.gdDate,
      fslTime: entry.fslTime,
      caseProperty: entry.caseProperty,
      nameOfReciverFSL: entry.nameOfReciverFSL,
      nameOfReciverPS: entry.nameOfReciverPS,
      status: entry.status,
      avatar: entry.avatar,
      fslLocation: entry.fslLocation || "INPS",
      description: entry.description,

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

      toast.dismiss(submittingToastId);
      toast.success(response.data.message);
      console.log("Update Success:", response.data);

      // Reset form after successful update
      setFormData({
        firNo: "",
        mudNo: "",
        gdNo: "",
        court: "",
        nameOfReciverPS: "",
        nameOfReciverFSL: "",
        gdDate: new Date().toISOString().split("T")[0],
        fslTime: new Date().toISOString().substring(11, 16),
        caseProperty: "",
        status: "",
        avatar: null,
        fslLocation: "INPS",
        description: "",

      });
      setEditingId(null);
      setPreview(null);
    } catch (error) {
      toast.dismiss(submittingToastId);
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="w-full mx-auto rounded-lg text-sm p-4">
        <h2 className="text-lg font-semibold mb-3">FSL Entry</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form
          onSubmit={editingId ? handleUpdate : handleSubmit}
          className="grid grid-cols-4 gap-2"
        >
          {Object.keys(formData).map((field) => (
            <div
              key={field}
              className={field === "description" ? "col-span-4" : "col-span-1"}
            >
              <label className="block text-gray-700 text-xs font-medium capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              {field === "description" ? (
                <textarea
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border-[1.5px] border-gray-800 rounded mt-1 h-16 text-xs"
                />
              ) : field === "gdDate" || field === "fslTime" ? (
                <input
                  type={field === "gdDate" ? "date" : "time"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border-[1.5px] border-gray-800 rounded mt-1 text-xs"
                />
              ) : field === "fslLocation" ? (
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`w-full p-2 border-[1.5px] border-gray-800 rounded mt-1 text-xs ${
                    formData.fslLocation === "INPS" ? "bg-red-500 text-white" : "bg-green-500 text-white"
                  }`}
                >
                  <option value="INPS">INPS</option>
                  <option value="OUTFSL">OUTFSL</option>
                </select>
              ) : field !== "avatar" ? (
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border-[1.5px] border-gray-800 rounded mt-1 text-xs"
                />
              ) : (
                <>
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full p-2 border-[1.5px] border-gray-800 rounded mt-1 text-xs"
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt="Avatar Preview"
                      className="mt-1 w-16 h-16 object-cover rounded"
                    />
                  )}
                </>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="bg-[#8c7a48] w-80 cursor-pointer text-white px-3 py-2 rounded hover:bg-[#af9859] col-span-4"
          >
            Submit
          </button>
        </form>
      </div>
      {/* // ----------------fsl entry--------------- */}
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-3">All FSL Entries</h2>
          {singalData && singalData.length > 0 && (
            <button
              onClick={() => exportToExcel(singalData)}
              className="bg-[#8c7a48] text-white cursor-pointer px-3 py-2 rounded hover:bg-[#af9859] mb-2"
            >
              Download as Excel
            </button>
          )}
        </div>

        <div className="flex mb-4">
          <input
            type="text"
            name="firNo"
            value={searchParams.firNo}
            onChange={handleSearchChange}
            placeholder="Search by FIR No"
            className="p-2 border-[1.5px] border-gray-800 rounded mr-2 text-xs"
          />
          <input
            type="text"
            name="mudNo"
            value={searchParams.mudNo}
            onChange={handleSearchChange}
            placeholder="Search by Mud No"
            className="p-2 border-[1.5px] border-gray-800 rounded text-xs"
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
                    "FIR No",
                    "Mud No",
                    "GD No",
                    "Description",
                    "Court",
                    "GD Date",
                    "FSL Time",
                    "Case Property",
                    "nameOfReciverFSL",
                    "nameOfReciverPS",
                    "Status",
                    "FSL Location",
                    "Avatar",
                    "Tracking By",
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
                      {entry.firNo}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.mudNo}
                    </td>
                    <td className="border border-gray-300 p-2">{entry.gdNo}</td>
                    <td className="border border-gray-300 p-2">
                      {entry.description}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.court}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.gdDate}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.fslTime}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.caseProperty}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.nameOfReciverFSL}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.nameOfReciverPS}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.status}
                    </td>
                    <td className={`border border-gray-300 p-2 ${entry.fslLocation === "INPS" ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
                      {entry.fslLocation}
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
                      {entry.trackingBy}
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
                      <button
                        onClick={() => PrintMalkhanaEntry(entry)}
                        className=" text-green-600 px-2 py-1 rounded  cursor-pointer"
                        title="Print"
                      >
                        <FaPrint size={24} />
                      </button>
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