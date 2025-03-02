import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

const ImportData = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

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
    if (data.length === 0) return alert("No data to upload");
    try {
      const response = await axios.post(
        "https://malkhanaserver.onrender.com/api/v1/malkhana",
        { data },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      alert("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">Import Data</h2>

      <div className="max-w-lg mx-auto mt-10 p-6  rounded shadow-sm">
        <h2 className="text-xl font-bold mb-4">Upload Excel File</h2>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="border p-2 w-full"
        />
        {file && <p className="mt-2">Selected file: {file.name}</p>}
        <button
          onClick={handleUpload}
          className="mt-4 bg-[#8c7a48] hover:bg-[#aa9458] text-white py-2 px-4 rounded cursor-pointer"
          disabled={!file}
        >
          Upload file
        </button>
      </div>
    </div>
  );
};

export default ImportData;
