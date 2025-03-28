import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import toast from "react-hot-toast";
import useImportData from "../hooks/useImportData";
import useUser from "../hooks/useUser";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const ImportData = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const { importData } = useImportData();
  const { user } = useUser();
  console.log(importData);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      readExcel(selectedFile);
    }
  };

  const readExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
    reader.readAsBinaryString(file);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("No file selected");
      return;
    }

    setIsUploading(true);
    const submittingToastId = toast.loading("Uploading file...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://malkhanaserver-production.up.railway.app/api/v1/fileEntry",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response.data.message, {
        id: submittingToastId,
      });
      console.log("API Response:", response.data); // Debug log
    } catch (error) {
      toast.error("Upload failed", { id: submittingToastId });
      console.error("Error uploading file:", error); // Debug log
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setData([]);
  };

  const excludedFields = ["_id", "updatedAt", "createdAt", "__v"];

  const filteredData = importData.map((row) =>
    Object.fromEntries(
      Object.entries(row).filter(([key]) => !excludedFields.includes(key))
    )
  );

  // Filtering logic
  const isAdmin = user?.role === "Admin";
  const userDistrict = user?.district;
  const userPoliceStation = user?.policeStation;

  const filteredKeys =
    isAdmin && userDistrict
      ? filteredData.filter((item) => item.district === userDistrict)
      : [];

  const finalFilteredData =
    isAdmin && userPoliceStation
      ? filteredKeys.filter((item) => item.policeStation === userPoliceStation)
      : [];

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(finalFilteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "data.xlsx");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [Object.keys(finalFilteredData[0])],
      body: finalFilteredData.map((row) => Object.values(row)),
    });
    doc.save("data.pdf");
  };

  return (
    <div className="p-4">
     <div className=" flex justify-between items-center">
     <h2 className="text-lg font-semibold ">Import Data</h2> 
      <div className="mt-4 flex gap-4">
            <button
              onClick={handleDownloadExcel}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Download Excel
            </button>
            <button
              onClick={handleDownloadPDF}
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              Download PDF
            </button>
          </div>
     </div>
      <div className="max-w-lg mx-auto mt-10 p-6 rounded shadow-sm">
        <h2 className="text-xl font-bold mb-4">Upload Excel File</h2>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="border-2 p-2 w-full"
        />
        {file && <p>Selected file: {file.name}</p>}
        <div className="flex items-center gap-4">
          <button
            onClick={handleUpload}
            className="mt-4 bg-[#8c7a48] hover:bg-[#aa9458] text-white py-2 px-4 rounded cursor-pointer"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload file"}
          </button>
          {file && (
            <div className="mt-2">
              <button
                onClick={handleClear}
                className="mt-2 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded cursor-pointer"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
      {/* ---------------------Preview Data-------------------- */}
      {data.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Preview Data</h3>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  {Object.keys(data[0]).map((key) => (
                    <th key={key} className="px-4 py-2 border uppercase">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    {Object.values(row).map((value, i) => (
                      <td key={i} className="px-4 py-2 border">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* ---------------------All Import Data-------------------- */}
      {importData.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">All Import Data</h3>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  {Object.keys(filteredData[0]).map((key) => (
                    <th key={key} className="px-4 py-2 border uppercase">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    {Object.values(row).map((value, i) => (
                      <td key={i} className="px-4 py-2 border">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>       
        </div>
      )}
    </div>
  );
};

export default ImportData;