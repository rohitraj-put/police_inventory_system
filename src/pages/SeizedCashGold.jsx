import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useSeizedCashGold from "../hooks/useSeizedCashGold";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaPrint } from "react-icons/fa";
import PrintMalkhanaEntry from "../Excel/PrintMalkhanaEntry";

export default function SeizedCashGold() {
  const [formData, setFormData] = useState({
    firNo: "",
    mudNo: "",
    policeStation: "",
    seizedItem: "",
    avatar: null,
    itemName: "",
    itemQty: "",
    expectedAmt: "",
    descriptions: "",
  });

  console.log(formData);

  const [preview, setPreview] = useState(null);
  const { data, loading, deleteItem, updateItem } = useSeizedCashGold();
  const [editingId, setEditingId] = useState(null);
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
    const requiredFields = ["firNo", "mudNo", "policeStation", "seizedItem"];
    const antiqueFields = [
      "itemName",
      "itemQty",
      "expectedAmt",
      "descriptions",
    ];

    if (formData.seizedItem === "Antiques Items") {
      requiredFields.push(...antiqueFields);
    }

    for (const key of requiredFields) {
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
        "https://malkhanaserver-production.up.railway.app/api/v1/seized",
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
        firNo: "",
        mudNo: "",
        policeStation: "",
        itemName: "",
        itemQty: "",
        expectedAmt: "",
        descriptions: "",
        avatar: null,
        seizedItem: "",
      });
      setPreview(null);
    } catch (error) {
      toast.error(error.response.data.message, { id: submittingToastId });
      console.error("Error:", error);
    }
  };

  const handleEditClick = (entry) => {
    setEditingId(entry._id);
    setFormData({
      firNo: entry.firNo,
      mudNo: entry.mudNo,
      policeStation: entry.policeStation,
      seizedItem: entry.seizedItem,
      avatar: entry.avatar,
      itemName: entry.itemName,
      itemQty: entry.itemQty,
      expectedAmt: entry.expectedAmt,
      descriptions: entry.descriptions,
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
        firNo: "",
        mudNo: "",
        policeStation: "",
        seizedItem: "",
        avatar: null,
        itemName: "",
        itemQty: "",
        expectedAmt: "",
        descriptions: "",
      });
      setEditingId(null);
      setPreview(null);
    } catch (error) {
      toast.error(error.response.data.message, { id: submittingToastId });
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="w-full mx-auto p-4 rounded-lg text-sm">
        <h2 className="text-lg font-semibold mb-4">Seized Cash/Metal Entry</h2>
        <form
          onSubmit={editingId ? handleUpdate : handleSubmit}
          className="grid grid-cols-4 gap-4"
        >
          {Object.keys(formData).map((field) =>
            field !== "itemName" &&
            field !== "itemQty" &&
            field !== "expectedAmt" &&
            field !== "descriptions" ? (
              <div
                key={field}
                className={
                  field === "descriptions" ? "col-span-4" : "col-span-1"
                }
              >
                <label className="block text-gray-700 text-xs font-medium capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                {field === "seizedItem" ? (
                  <select
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1 text-xs"
                  >
                    <option value="">Select Item</option>
                    <option value="Cash">Cash</option>
                    <option value="Gold Metal">Gold Metal</option>
                    <option value="Antiques Items">Antiques Items</option>
                  </select>
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
            ) : (
              formData.seizedItem === "Antiques Items" && (
                <div
                  key={field}
                  className={
                    field === "descriptions" ? "col-span-4" : "col-span-1"
                  }
                >
                  <label className="block text-gray-700 text-xs font-medium capitalize">
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>
                  {field === "descriptions" ? (
                    <textarea
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded mt-1 h-16 text-xs"
                    />
                  ) : (
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded mt-1 text-xs"
                    />
                  )}
                </div>
              )
            )
          )}
          <button
            type="submit"
            className="bg-[#8c7a48] w-80 cursor-pointer text-white px-4 py-2 rounded hover:bg-[#af9859] col-span-4"
          >
            Submit
          </button>
        </form>
      </div>

      {/* ----------------------- Table--------------------- */}

      {loading ? (
        <p className="text-gray-500">Loading entries...</p>
      ) : data && data.length > 0 ? (
        <div className="overflow-auto max-h-[500px] border border-gray-300 rounded-lg">
          <table className="w-full border-collapse text-xs">
            <thead className="sticky top-0 bg-[#8c7a48] text-white z-10">
              <tr>
                {[
                  "FIR No",
                  "MUD No",
                  "Police Station",
                  "Seized Item",
                  "Item Name",
                  "Item Qty",
                  "Expected Amount",
                  "Descriptions",
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
              {data.map((entry, index) => (
                <tr key={index} className="text-center border border-gray-300">
                  <td className="border border-gray-300 p-2">{entry.firNo}</td>
                  <td className="border border-gray-300 p-2">{entry.mudNo}</td>
                  <td className="border border-gray-300 p-2">
                    {entry.policeStation}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {entry.seizedItem}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {entry.itemName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {entry.itemQty}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {entry.expectedAmt}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {entry.descriptions}
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
    </>
  );
}
