import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useMalkhanaRelease from "../hooks/useMalkhanaRelease";
import exportToExcel from "../Excel/exportToExcel";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function MalkhanaRelease() {
  const [formData, setFormData] = useState({
    entryType: "Type1",
    mudNo: "",
    mudDetails: "",
    receiverName: "",
    fatherName: "",
    address: "",
    mobile: "",
    releaseItems: "",
    avatar: null,
    documentImage: null,
  });
  console.log(formData);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [previewDocument, setPreviewDocument] = useState(null);
  const { data, loading, deleteItem } = useMalkhanaRelease();
  console.log(data);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        setFormData({ ...formData, [name]: file });
        const reader = new FileReader();
        reader.onloadend = () => {
          if (name === "avatar") setPreviewAvatar(reader.result);
          if (name === "documentImage") setPreviewDocument(reader.result);
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
      if (!formData[key] && key !== "avatar" && key !== "documentImage") {
        toast.error("All fields except Avatar and Document Image are required");
        return;
      }
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    const submittingToastId = toast.loading("Data is submitting...");

    try {
      const response = await axios.post(
        "https://malkhanaserver.onrender.com/api/v1/release",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Data submitted successfully!", { id: submittingToastId });
      console.log(response);
      setFormData({
        entryType: "Type1",
        mudNo: "",
        mudDetails: "",
        receiverName: "",
        fatherName: "",
        address: "",
        mobile: "",
        releaseItems: "",
        avatar: null,
        documentImage: null,
      });
      setPreviewAvatar(null);
      setPreviewDocument(null);
    } catch (error) {
      toast.error("Failed to submit data", { id: submittingToastId });
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="w-full mx-auto p-4 rounded-lg text-sm">
        <h2 className="text-lg font-semibold mb-4">Malkhana Release Entry</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4">
            {Object.keys(formData).map((field) => (
              <div key={field} className="col-span-1">
                <label className="block text-gray-700 text-xs font-medium capitalize">
                  {field.replace(/([A-Z])/g, " $1").replace("Type", " Type")}
                </label>
                {field === "entryType" ? (
                  <select
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1 text-xs cursor-pointer"
                  >
                    <option value=""> Select Entry Type</option>
                    <option value="MV Act Seizure"> MV Act Seizure</option>
                    <option value="ARTO Seizure"> ARTO Seizure</option>
                    <option value="IPC Vehicle"> IPC Vehicle</option>
                    <option value="Excise Vehicle"> Excise Vehicle</option>
                    <option value="Unclaimed Vehicle">Unclaimed Vehicle</option>
                    <option value="Seizure Vehicle"> Seizure Vehicle</option>
                    <option value="Malkhana Entry">Malkhana Entry</option>
                    <option value="FSL Entry">FSL Entry</option>
                    <option value="Kurki Entry">Kurki Entry</option>
                    <option value="Other Entry">Other Entry</option>
                    <option value="Unclaimed Entry">Unclaimed Entry</option>
                  </select>
                ) : field === "avatar" || field === "documentImage" ? (
                  <>
                    <input
                      type="file"
                      name={field}
                      accept="image/*"
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded mt-1 text-xs"
                    />
                    {(field === "avatar" && previewAvatar) ||
                    (field === "documentImage" && previewDocument) ? (
                      <img
                        src={
                          field === "avatar" ? previewAvatar : previewDocument
                        }
                        alt="Preview"
                        className="mt-2 w-24 h-24 object-cover rounded"
                      />
                    ) : null}
                  </>
                ) : (
                  <input
                    type={field === "mobile" ? "number" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1 text-xs"
                  />
                )}
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="bg-[#8c7a48] w-80 cursor-pointer mt-4 text-white px-4 py-2 rounded hover:bg-[#af9859]"
          >
            Submit
          </button>
        </form>
      </div>

      {/* ------------------------------All Malkhana Release Data------------------------------ */}

      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-3">
            All Malkhana Release Entries
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

        {loading ? (
          <p className="text-gray-500">Loading entries...</p>
        ) : data && data.length > 0 ? (
          <div>
            <div className="overflow-auto max-h-[500px] border border-gray-300 rounded-lg">
              <table className="w-full border-collapse text-xs">
                <thead className="sticky top-0 bg-[#8c7a48] text-white z-10">
                  <tr>
                    {[
                      "entryType",
                      "mudNo",
                      "mudDetails",
                      "receiverName",
                      "fatherName",
                      "address",
                      "mobile",
                      "releaseItems",
                      "avatar",
                      "documentImage",
                      "Action",
                    ].map((header) => (
                      <th key={header} className="border border-gray-300 p-2 ">
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
                        {entry.entryType}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {entry.mudNo}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {entry.mudDetails}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {entry.receiverName}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {entry.fatherName}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {entry.address}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {entry.mobile}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {entry.releaseItems}
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
                        {entry.avatar ? (
                          <img
                            src={entry.documentImage}
                            alt="documentImage"
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
          </div>
        ) : (
          <p className="text-gray-500">No entries found.</p>
        )}
      </div>
    </>
  );
}
