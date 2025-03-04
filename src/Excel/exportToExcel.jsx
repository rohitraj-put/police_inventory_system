import * as XLSX from "xlsx";

const exportToExcel = (data) => {
  if (!data || data.length === 0) {
    console.warn("No data to export");
    return;
  }

  // Fields to exclude from the Excel file
  const excludeFields = ["updatedAt", "createdAt", "__v", "_id"];

  // Define the headers based on the keys of the first object in the data array, excluding the fields to be excluded
  const headers = Object.keys(data[0]).filter(
    (header) => !excludeFields.includes(header)
  );

  // Map data to arrays of values, excluding the fields to be excluded
  const dataFormatted = data.map((item) =>
    headers.map((header) => item[header] || "")
  );

  // Create a worksheet with headers and data
  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...dataFormatted]);

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Malkhana Data");

  // Write the workbook to an Excel file
  XLSX.writeFile(workbook, `MalkhanaData.xlsx`);
};

export default exportToExcel;
