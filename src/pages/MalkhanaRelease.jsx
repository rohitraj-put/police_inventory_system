import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

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
        "https://malkhanaserver.onrender.com/api/v1/MalkhanaRelease",
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
        <Toaster />
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
                    className="w-full p-2 border border-gray-300 rounded mt-1 text-xs"
                  >
                    <option value=""> Select Entry Type</option>
                    <option value="MV Act Seizure"> MV Act Seizure</option>
                    <option value="ARTO Seizure"> ARTO Seizure</option>
                    <option value="IPC Vehicle"> IPC Vehicle</option>
                    <option value="Excise Vehicle"> Excise Vehicle</option>
                    <option value="Unclaimed Vehicle">Unclaimed Vehicle</option>
                    <option value="Seizure Vehicle"> Seizure Vehicle</option>
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
    </>
  );
}
