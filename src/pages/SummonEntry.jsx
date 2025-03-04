import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import toast from "react-hot-toast";
import useSummon from "../hooks/useSummon";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const SummonEntry = () => {
  const { data, loading, deleteItem } = useSummon();

  const [formData, setFormData] = useState({
    entryType: "",
    firOrGdNumber: "",
    policeStation: "",
    vehicleOwner: "",
    fatherName: "",
    address: "",
    vehicleRegistrationNumber: "",
    place: "",
    lastDays: "",
    releaseDays: "",
    actType: "",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toLocaleTimeString("en-US", { hour12: false }).slice(0, 5),
  });
  console.log(formData);

  const entryTypes = [
    "MV Act Seizure",
    "ARTO Seizure",
    "IPC Vehicle",
    "Excise Vehicle",
    "Unclaimed Vehicle",
    "Seizure Vehicle",
  ];

  console.log(formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Check for empty fields
    for (let key in formData) {
      if (formData[key].trim() === "") {
        toast.error(`Please fill out the ${key.replace(/([A-Z])/g, " $1")}`);
        return;
      }
    }

    // Show submitting toast
    const submittingToastId = toast.loading("Data is submitting...");

    try {
      const response = await axios.post(
        "https://malkhanaserver.onrender.com/api/v1/summon",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Summon Entry Saved Successfully!", {
        id: submittingToastId,
      });
      console.log(response);

      setFormData({
        entryType: "",
        firOrGdNumber: "",
        policeStation: "",
        vehicleOwner: "",
        fatherName: "",
        address: "",
        vehicleRegistrationNumber: "",
        place: "",
        lastDays: "",
        releaseDays: "",
        actType: "",
        date: new Date().toISOString().split("T")[0],
        time: new Date()
          .toLocaleTimeString("en-US", { hour12: false })
          .slice(0, 5),
      });
    } catch (error) {
      console.error("Error saving summon entry:", error);
      toast.error("Failed to save summon entry.", { id: submittingToastId });
    }
  };

  const noticeRef = useRef();

  const handleDownloadPDF = async () => {
    const input = noticeRef.current;
    try {
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      console.log("Canvas Data: ", imgData);
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${formData.vehicleOwner}_Summon.pdf`);
    } catch (error) {
      console.error("Error generating PDF: ", error);
    }
  };

  const handleRowClick = (entry) => {
    setFormData({
      entryType: entry.entryType,
      firOrGdNumber: entry.firOrGdNumber,
      policeStation: entry.policeStation,
      vehicleOwner: entry.vehicleOwner,
      fatherName: entry.fatherName,
      address: entry.address,
      vehicleRegistrationNumber: entry.vehicleRegistrationNumber,
      place: entry.place,
      lastDays: entry.lastDays,
      releaseDays: entry.releaseDays,
      actType: entry.actType,
      date: entry.date,
      time: entry.time,
    });
  };

  return (
    <>
      <div className="min-h-screen">
        <div className="w-full mx-auto bg-white p-6">
          <h2 className="text-xl font-bold mb-4">Summon Entry Form</h2>
          <div className="grid grid-cols-3 max-md:grid-cols-2 gap-4">
            <select
              name="entryType"
              onChange={handleChange}
              className="p-2 border rounded text-sm"
              value={formData.entryType}
            >
              <option value="">Select Entry Type</option>
              {entryTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {Object.keys(formData)
              .filter((key) => key !== "entryType" && key !== "time")
              .map((key) => (
                <input
                  key={key}
                  type={key === "date" ? "date" : "text"}
                  name={key}
                  placeholder={key.replace(/([A-Z])/g, " $1").trim()}
                  onChange={handleChange}
                  className="p-2 border rounded text-sm"
                  value={formData[key]}
                />
              ))}
            <input
              type="time"
              name="time"
              onChange={handleChange}
              className="p-2 border rounded text-sm"
              value={formData.time}
            />

            <button
              onClick={handleSubmit}
              className="bg-[#8c7a48] hover:bg-[#a38e53] text-white p-2 rounded cursor-pointer"
            >
              Save Data
            </button>
            <button
              onClick={handleDownloadPDF}
              className="text-[#8c7a48] hover:bg-[#8c7a48] hover:text-white duration-300 bg-white p-2 rounded border-1 cursor-pointer"
            >
              Get PDF
            </button>
          </div>
        </div>

        {/* ____________________All Summon EntryData=------------ */}

        <div className="my-8 bg-white">
          <h2 className="text-lg font-semibold mb-3">All Summon Entries</h2>
          {loading ? (
            <p className="text-gray-500">Loading entries...</p>
          ) : data && data.length > 0 ? (
            <div className="overflow-auto max-h-[500px] border border-gray-300 rounded-lg">
              <table className="w-full border-collapse text-xs">
                <thead className="sticky top-0 bg-[#8c7a48] text-white z-10 capitalize">
                  <tr>
                    {[
                      "date",
                      "time",
                      "entry Type",
                      "FIR/GD Number",
                      "police Station",
                      "vehicle Owner",
                      "father Name",
                      "address",
                      "Registration Number",
                      "place",
                      "last Days",
                      "release Days",
                      "act Type",
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
                    <tr
                      key={index}
                      className="text-center border border-gray-300 cursor-pointer"
                      onClick={() => handleRowClick(entry)}
                    >
                      <td className="border border-gray-300 p-2 capitalize">
                        {entry.date}
                      </td>
                      <td className="border border-gray-300 p-2 capitalize">
                        {entry.time}
                      </td>
                      <td className="border border-gray-300 p-2 capitalize">
                        {entry.entryType}
                      </td>
                      <td className="border border-gray-300 p-2 capitalize">
                        {entry.firOrGdNumber}
                      </td>
                      <td className="border border-gray-300 p-2 capitalize">
                        {entry.policeStation}
                      </td>
                      <td className="border border-gray-300 p-2 capitalize">
                        {entry.vehicleOwner}
                      </td>
                      <td className="border border-gray-300 p-2 capitalize">
                        {entry.fatherName}
                      </td>
                      <td className="border border-gray-300 p-2 capitalize">
                        {entry.address}
                      </td>
                      <td className="border border-gray-300 p-2 capitalize">
                        {entry.vehicleRegistrationNumber}
                      </td>
                      <td className="border border-gray-300 p-2 capitalize">
                        {entry.place}
                      </td>
                      <td className="border border-gray-300 p-2 capitalize">
                        {entry.lastDays}
                      </td>
                      <td className="border border-gray-300 p-2 capitalize">
                        {entry.releaseDays}
                      </td>
                      <td className="border border-gray-300 p-2 capitalize">
                        {entry.actType}
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

        {/* ------------------------Pdf preview----------------------- */}

        <div
          className="bg-white p-8 border-2 border-[#8c7a48] max-w-2xl w-full shadow-lg mt-8 mx-auto"
          ref={noticeRef}
        >
          <div className="w-36 h-36 rounded-full overflow-hidden mx-auto">
            <img
              title="Logo"
              className="w-full h-full object-cover"
              src="https://vectorseek.com/wp-content/uploads/2023/09/Delhi-Police-Logo-Vector.svg-.png"
              alt="logo"
            />
          </div>
          <div className="text-center text-2xl font-bold underline mb-6">
            NOTICE
          </div>
          <div className="text-lg space-y-4">
            {Object.entries(formData).map(([key, value]) => (
              <p key={key} className=" capitalize">
                <strong>{key.replace(/([A-Z])/g, " $1").trim()}:</strong>{" "}
                {value}
              </p>
            ))}
            <p>Under Section 207, your vehicle has been seized.</p>
            <p>
              You are directed to resolve the issue from the competent court
              within 14 days, or further legal action will be taken.
            </p>
          </div>
          <div className="text-right font-bold mt-8">
            <p>Authorized Officer</p>
            <p>_______________________</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SummonEntry;
