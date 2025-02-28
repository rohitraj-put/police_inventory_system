import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";

const SummonEntry = () => {
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
    date: "",
  });

  const entryTypes = [
    "MV Act Seizure",
    "ARTO Seizure",
    "IPC Vehicle",
    "Excise Vehicle",
    "Unclaimed Vehicle",
    "Seizure Vehicle",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/summon-entry",
        formData
      );
      alert("Summon Entry Saved Successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error saving summon entry:", error);
      alert("Failed to save summon entry.");
    }
  };

  const noticeRef = useRef();

  const handleDownloadPDF = async () => {
    const input = noticeRef.current;
    try {
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${formData.vehicleOwner}_Summon.pdf`);
    } catch (error) {
      console.error("Error generating PDF: ", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-full mx-auto bg-white p-6">
        <h2 className="text-xl font-bold mb-4">Summon Entry Form</h2>
        <div className="grid grid-cols-3 gap-4">
          <select
            name="entryType"
            onChange={handleChange}
            className="p-2 border rounded"
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
            .filter((key) => key !== "entryType")
            .map((key) => (
              <input
                key={key}
                type={key === "date" ? "date" : "text"}
                name={key}
                placeholder={key.replace(/([A-Z])/g, " $1").trim()}
                onChange={handleChange}
                className="p-2 border rounded"
                value={formData[key]}
              />
            ))}
        </div>
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleSubmit}
            className="bg-[#8c7a48] text-white p-2 rounded cursor-pointer"
          >
            Save Entry
          </button>
          <button
            onClick={handleDownloadPDF}
            className="text-[#8c7a48] bg-white p-2 rounded border-1 cursor-pointer"
          >
            Get PDF
          </button>
        </div>
      </div>

      {/* Notice Format for PDF */}
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
            <p key={key}>
              <strong>{key.replace(/([A-Z])/g, " $1").trim()}:</strong> {value}
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
  );
};

export default SummonEntry;
