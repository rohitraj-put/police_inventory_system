import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useMalkhana from "../hooks/useMalkhana";
import exportToExcel from "../Excel/exportToExcel";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaPrint } from "react-icons/fa";
import PrintMalkhanaEntry from "../Excel/PrintMalkhanaEntry";
import useUser from "../hooks/useUser";
import Compressor from "compressorjs";

const fieldLabels = {
  firNo: "FIR Number",
  mudNo: "Mud Number",
  gdNo: "GD Number",
  ioName: "Investigating Officer Name",
  banam: "Banaam",
  underSection: "Under Section",
  place: "Place of Occurrence",
  court: "Court",
  firYear: "FIR Year",
  gdDate: "GD Date",
  DakhilKarneWala: "Person Submitting",
  caseProperty: "Case Property",
  actType: "Act Type",
  status: "Status",
  avatar: "Image",
  description: "Description",
};

export default function MalkhanEntry() {
  const [formData, setFormData] = useState({
    firNo: "",
    mudNo: "",
    gdNo: "",
    ioName: "",
    banam: "",
    underSection: "",
    place: "",
    court: "",
    firYear: "",
    gdDate: new Date().toISOString().split("T")[0],
    DakhilKarneWala: "",
    caseProperty: "",
    actType: "",
    status: "",
    avatar: null,
    description: "",
  });

  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({
    firNo: "",
    mudNo: "",
  });
  const { data, loading, deleteItem, updateItem } = useMalkhana();
  const [editingId, setEditingId] = useState(null);
  const { user } = useUser();

  const singalData = data.filter((item) => item.policeStation === user?.policeStation);
  console.log(singalData);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        new Compressor(file, {
          quality: 0.6, // Adjust the quality as needed (0 to 1)
          success: (compressedResult) => {
            setFormData({ ...formData, avatar: compressedResult });

            // Show image preview
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(compressedResult);
          },
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate empty fields (except avatar)
    for (const key in formData) {
      if (!formData[key] && key !== "avatar") {
        setError("All fields are required.");
        toast.error("All fields are required.");
        return;
      }
    }

    setError("");

    const formDataToSend = new FormData();

    // Append only non-empty fields
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Show submitting toast
    const submittingToastId = toast.loading("Data is submitting...");

    try {
      const response = await axios.post(
        "https://malkhanaserver-production.up.railway.app/api/v1/malkhana",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(response.data.message, { id: submittingToastId });
      console.log(response);
      // Reset form after successful submission
      setFormData({
        firNo: "",
        mudNo: "",
        gdNo: "",
        ioName: "",
        banam: "",
        underSection: "",
        place: "",
        court: "",
        firYear: "",
        gdDate: new Date().toISOString().split("T")[0],
        DakhilKarneWala: "",
        caseProperty: "",
        actType: "",
        status: "",
        avatar: null,
        description: "",
      });
      setPreview(null);
    } catch (error) {
      toast.error(error.response.data.message, { id: submittingToastId });
      console.error("Error:", error.response);
      console.error("Error:", error.response?.data?.message || error.message);
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const filteredData = singalData?.filter(
    (entry) =>
      entry.firNo?.includes(searchCriteria.firNo) &&
      entry.mudNo?.includes(searchCriteria.mudNo)
  );

  const handleEditClick = (entry) => {
    setEditingId(entry._id);
    setFormData({
      firNo: entry.firNo,
      mudNo: entry.mudNo,
      gdNo: entry.gdNo,
      ioName: entry.ioName,
      banam: entry.banam,
      underSection: entry.underSection,
      place: entry.place,
      court: entry.court,
      firYear: entry.firYear,
      gdDate: entry.gdDate,
      DakhilKarneWala: entry.DakhilKarneWala,
      caseProperty: entry.caseProperty,
      actType: entry.actType,
      status: entry.status,
      avatar: entry.avatar,
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

      toast.dismiss(submittingToastId); // Dismiss loading toast
      toast.success(response.data.message);

      console.log("Update Success:", response.data);

      // Reset form after successful update
      setFormData({
        firNo: "",
        mudNo: "",
        gdNo: "",
        ioName: "",
        banam: "",
        underSection: "",
        place: "",
        court: "",
        firYear: "",
        gdDate: new Date().toISOString().split("T")[0],
        DakhilKarneWala: "",
        caseProperty: "",
        actType: "",
        status: "",
        avatar: null,
        description: "",
      });
      setEditingId(null);
      setPreview(null);
    } catch (error) {
      toast.dismiss(submittingToastId); // Dismiss loading toast
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="w-full mx-auto p-4 bg-white rounded-lg text-sm">
        <h2 className="text-lg font-semibold mb-3">Malkhana Entry</h2>
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
                {fieldLabels[field]}
              </label>

              {field === "description" ? (
                <textarea
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border-[1.5px] border-gray-800 rounded mt-1 h-16 text-xs"
                />
              ) : field === "gdDate" ? (
                <input
                  type="date"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border-[1.5px] border-gray-800 rounded mt-1 text-xs"
                />
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
                      className="mt-1 w-16 h-16 object-cover rounded cursor-pointer"
                      onClick={() => setIsModalOpen(true)}
                    />
                  )}
                </>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="bg-[#8c7a48] w-80 text-white cursor-pointer px-3 py-2 rounded hover:bg-[#af9859] col-span-4"
          >
            Submit
          </button>
        </form>

        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-[#22222252] bg-opacity-50"
            onClick={() => setIsModalOpen(false)}
          >
            <div className="bg-white p-4 rounded-lg">
              <img
                src={preview}
                alt="Large Preview"
                className="w-96 h-96 object-cover"
              />
            </div>
            <p className="mb-4 bg-black text-white ml-8">
              Click on the image to close
            </p>
          </div>
        )}
      </div>
      {/* ____________________All Malkhana EntryData=------------ */}

      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-3">All Malkhana Entries</h2>
          {singalData && singalData.length > 0 && (
            <button
              onClick={() => exportToExcel(singalData)}
              className="bg-[#8c7a48] text-white cursor-pointer px-3 py-2 rounded hover:bg-[#af9859] mb-2"
            >
              Download as Excel
            </button>
          )}
        </div>

        <div className="flex mb-4 gap-2">
          <div>
            Search by FIR No:{" "}
            <input
              type="text"
              name="firNo"
              placeholder="Enter FIR Number"
              value={searchCriteria.firNo}
              onChange={handleSearchChange}
              className="w-64 max-md:w-36 p-2 h-8 border-[1.5px] border-gray-800 rounded "
            />
          </div>
          <div>
            Search by Mud No:{" "}
            <input
              type="text"
              name="mudNo"
              placeholder="Enter Mud Number"
              value={searchCriteria.mudNo}
              onChange={handleSearchChange}
              className="w-64 max-md:w-36 p-2 h-8 border-[1.5px] border-gray-800 rounded"
            />
          </div>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading entries...</p>
        ) : filteredData && filteredData.length > 0 ? (
          <div>
            <div className="overflow-auto max-h-[500px] border border-gray-300 rounded-lg">
              <table className="w-full border-collapse text-xs">
                <thead className="sticky top-0 bg-[#8c7a48] text-white z-10">
                  <tr>
                    {[
                      "FIR Number",
                      "Mud Number",
                      "GD Number",
                      "IO Name",
                      "Banam",
                      "Under Section",
                      "Place",
                      "Description",
                      "Court",
                      "FIR Year",
                      "GD Date",
                      "Dakhil Karne Wala",
                      "Act Type",
                      "Case Property",
                      "Status",
                      "Avatar",
                      "Tracking By",
                      "Actions",
                    ].map((header) => (
                      <th key={header} className="border border-gray-300 p-2 ">
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
                      <td className="border border-gray-300 p-2">
                        {entry.gdNo}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {entry.ioName}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {entry.banam}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {entry.underSection}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {entry.place}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {entry.description}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {entry.court}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {entry.firYear}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {entry.gdDate}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {entry.DakhilKarneWala}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {entry.actType}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {entry.caseProperty}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {entry.status}
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
          </div>
        ) : (
          <p className="text-gray-500">No entries found.</p>
        )}
      </div>
    </>
  );
}