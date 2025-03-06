import React, { useState, useRef } from "react";
import Barcode from "react-barcode";
import SMS from "../Components/SMS";

function GenerateBarcode() {
  const [barcodes, setBarcodes] = useState(["123456789"]);
  const printRef = useRef();

  const handleAddBarcode = () => {
    if (barcodes.length < 3) {
      setBarcodes([...barcodes, ""]);
    } else {
      alert("You can only generate up to 3 barcodes.");
    }
  };

  const handleChange = (index, value) => {
    const newBarcodes = [...barcodes];
    newBarcodes[index] = value;
    setBarcodes(newBarcodes);
  };

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const printWindow = window.open("", "", "width=600,height=600");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Barcodes</title>
        </head>
        <body>
          <div style="text-align: center;">${printContent}</div>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() { window.close(); };
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="p-5">
      {/* <SMS /> */}
      <h2>Barcode Generator</h2>
      <div className="flex flex-row max-md:flex-col items-center">
        {barcodes.map((value, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder="Enter barcode value"
              className="border p-2 m-2"
            />
          </div>
        ))}
        <button
          onClick={handleAddBarcode}
          className="bg-[#8c7a48] text-white rounded px-4 py-2 mb-4 cursor-pointer"
          disabled={barcodes.length >= 3}
        >
          Add Barcode
        </button>
      </div>
      <div ref={printRef} className="p-5 flex gap-8">
        {barcodes.map(
          (value, index) =>
            value.length >= 3 && (
              <div key={index} className="mb-4">
                <Barcode
                  value={value}
                  format="CODE128"
                  width={2}
                  height={100}
                  displayValue={true}
                  background="#fff"
                  lineColor="#000"
                />
              </div>
            )
        )}
      </div>
      <button
        onClick={handlePrint}
        className="bg-[#8c7a48] text-white rounded px-8 py-2"
      >
        Print Barcodes
      </button>
    </div>
  );
}

export default GenerateBarcode;
