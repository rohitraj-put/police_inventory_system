import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useUnclaimed from "../hooks/useUnclaimed";
import exportToExcel from "../Excel/exportToExcel";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function UnclaimedEntry() {
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

  const [preview, setPreview] = useState(null);
  const [searchParams, setSearchParams] = useState({ firNo: "", mudNo: "" });
  const { data, loading, deleteItem } = useUnclaimed();

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

    // Validate required fields
    const missingFields = Object.keys(formData).filter(
      (key) => key !== "avatar" && !formData[key].trim()
    );

    if (missingFields.length > 0) {
      toast.error("All fields are required except the avatar.");
      console.log("Missing Fields:", missingFields);
      return;
    }

    // Prepare FormData
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) =>
      formDataToSend.append(key, formData[key])
    );

    // Show submitting toast
    const submittingToastId = toast.loading("Data is submitting...");

    try {
      const response = await axios.post(
        "https://malkhanaserver.onrender.com/api/v1/unclaimed",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Data submitted successfully!", {
          id: submittingToastId,
        });
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
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      toast.error("Failed to submit data. Please try again.", {
        id: submittingToastId,
      });
      console.error("Submission Error:", error);
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const filteredData = data?.filter((entry) => {
    return (
      (searchParams.firNo === "" || entry.firNo.includes(searchParams.firNo)) &&
      (searchParams.mudNo === "" || entry.mudNo.includes(searchParams.mudNo))
    );
  });

  return (
    <>
      <div className="w-full mx-auto p-4 rounded-lg text-sm">
        <h2 className="text-lg font-semibold mb-4">Unclaimed Entry</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4">
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
            Submit
          </button>
        </form>
      </div>

      {/* ____________________All unclaimed EntryData=------------ */}

      <div className="mt-6">
        <div className="flex justify-between items-center">
          {" "}
          <h2 className="text-lg font-semibold mb-3">All Unclaimed Entries</h2>
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
            name="firNo"
            value={searchParams.firNo}
            onChange={handleSearchChange}
            placeholder="Search by FIR No"
            className="p-2 border border-gray-300 rounded mr-2 text-xs"
          />
          <input
            type="text"
            name="mudNo"
            value={searchParams.mudNo}
            onChange={handleSearchChange}
            placeholder="Search by Mud No"
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
                    "FIR No",
                    "Mud No",
                    "GD No",
                    "IO Name",
                    "Banam",
                    "Under Section",
                    "Description",
                    "Court",
                    "FIR Year",
                    "GD Date",
                    "Dakhil Karne Wala",
                    "Act Type",
                    "Case Property",
                    "Status",
                    "Avatar",
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
                      {entry.ioName}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.banam}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.underSection}
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
                    <td className="border border-gray-300 p-2 flex items-center">
                      <button
                        onClick={() => deleteItem(entry._id)}
                        className=" text-rose-600 px-2 py-1 rounded  cursor-pointer"
                        title="Delete"
                      >
                        <MdDelete size={24} />
                      </button>
                      <button
                        // onClick={() => deleteItem(entry._id)}
                        className=" text-blue-600 px-2 py-1 rounded  cursor-pointer"
                        title="Update"
                      >
                        <FaEdit size={24} />
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
