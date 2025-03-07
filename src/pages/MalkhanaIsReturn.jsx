import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAllData from "../hooks/useAllData";
import { FaPrint } from "react-icons/fa";
import PrintMalkhanaEntry from "../Excel/PrintMalkhanaEntry";

export default function MalkhanaIsReturn() {
  const [formData, setFormData] = useState({
    entryType: "Malkhana_Entry",
    firNo: "",
    mudNo: "",
    receivedBy: "",
    trackingBy: "",
    avatar: null,
    description: "",
  });

  const [preview, setPreview] = useState(null);
  const [mudNumbers, setMudNumbers] = useState([]);
  const { data, loading, returnData } = useAllData();
  console.log(returnData);

  useEffect(() => {
    if (formData.firNo) {
      const filteredMudNumbers = data
        .filter((item) => item.collection === formData.entryType)
        .flatMap((item) => item.data)
        .filter((entry) => entry.firNo === formData.firNo)
        .map((entry) => entry.mudNo);
      setMudNumbers(filteredMudNumbers);
    } else {
      setMudNumbers([]);
    }
  }, [formData.firNo, formData.entryType, data]);

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
      if (!formData[key]) {
        toast.error("All fields are required");
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
        "https://malkhanaserver.onrender.com/api/v1/return",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(response.data.message, { id: submittingToastId });
      setFormData({
        entryType: "Malkhana_Entry",
        firNo: "",
        mudNo: "",
        receivedBy: "",
        trackingBy: "",
        avatar: null,
        description: "",
      });
      setPreview(null);
    } catch (error) {
      toast.error(error.response.data.message, { id: submittingToastId });
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="w-full mx-auto p-4 rounded-lg text-sm">
        <h2 className="text-lg font-semibold mb-4">
          Move Movement Return Entry
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4">
          {Object.keys(formData).map((field) => (
            <div
              key={field}
              className={field === "description" ? "col-span-4" : "col-span-1"}
            >
              <label className="block text-gray-700 text-xs font-medium capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              {field === "entryType" ? (
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1 text-xs"
                >
                  {[
                    "Malkhana_Entry",
                    "FSL_Entry",
                    "Kurki_Entry",
                    "Other_Entry",
                    "Unclaimed_Entry",
                    "MVAct_Seizure",
                    "ARTO_Seizure",
                    "IPC_Vehicle",
                    "Excise_Vehicle",
                    "Unclaimed_Vehicle",
                    "Seizure_Vehicle",
                  ].map((option) => (
                    <option key={option} value={option}>
                      {option.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              ) : field === "firNo" ? (
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1 text-xs"
                />
              ) : field === "mudNo" ? (
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1 text-xs"
                >
                  <option value="">Select MUD Number</option>
                  {mudNumbers.map((mudNo) => (
                    <option key={mudNo} value={mudNo}>
                      {mudNo}
                    </option>
                  ))}
                </select>
              ) : field === "description" ? (
                <textarea
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1 h-16 text-xs"
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

      <h2 className="text-lg font-semibold mb-4">All Return Entry</h2>

      {loading ? (
        <p className="text-gray-500">Loading entries...</p>
      ) : returnData && returnData.length > 0 ? (
        <div>
          <div className="overflow-auto max-h-[500px] border border-gray-300 rounded-lg">
            <table className="w-full border-collapse text-xs">
              <thead className="sticky top-0 bg-[#8c7a48] text-white z-10">
                <tr>
                  {[
                    "fir No",
                    "mud No",
                    "entry Type",
                    "received  By",
                    "tracking By",
                    "description",
                    "avatar",
                    "Action",
                  ].map((header) => (
                    <th
                      key={header}
                      className="border border-gray-300 p-2 capitalize"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {returnData.map((entry, index) => (
                  <tr
                    key={index}
                    className="text-center border border-gray-300"
                  >
                    <td className="border border-gray-300 p-2 capitalize">
                      {entry.firNo}
                    </td>
                    <td className="border border-gray-300 p-2 capitalize">
                      {entry.mudNo}
                    </td>
                    <td className="border border-gray-300 p-2 capitalize">
                      {entry.entryType.replace(/_/g, " ")}
                    </td>
                    <td className="border border-gray-300 p-2 capitalize">
                      {entry.receivedBy}
                    </td>
                    <td className="border border-gray-300 p-2 capitalize">
                      {entry.trackingBy}
                    </td>
                    <td className="border border-gray-300 p-2 capitalize">
                      {entry.description}
                    </td>
                    <td className="border border-gray-300 p-2 capitalize">
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
                    <td className="border border-gray-300 p-2 capitalize">
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
    </>
  );
}
