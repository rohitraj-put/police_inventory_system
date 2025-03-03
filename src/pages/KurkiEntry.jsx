import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import useKurki from "../hooks/useKurki";

export default function KurkiEntry() {
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
  const { data, loading } = useKurki();
  console.log(data);

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
        setError("All fields except Avatar are required");
        toast.error("All fields except Avatar are required");
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
        "https://malkhanaserver.onrender.com/api/v1/kurki",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Kurki entry submitted successfully", {
        id: submittingToastId,
      });
      console.log("Success:", response.data);

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
      toast.error("Submission failed. Please try again", {
        id: submittingToastId,
      });
      console.error("Error:", error.response ? error.response.data : error);
    }
  };

  return (
    <>
      <div className="w-full mx-auto rounded-lg text-sm p-4">
        <Toaster />
        <h2 className="text-lg font-semibold mb-3">Kurki Entry</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-2">
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
      {/* // ---------------kurki entry -------------------- */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3">All Kurki Entries</h2>
        {loading ? (
          <p className="text-gray-500">Loading entries...</p>
        ) : data && data.length > 0 ? (
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
