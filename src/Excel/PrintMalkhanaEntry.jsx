import React from "react";

const PrintMalkhanaEntry = (entry) => {
  const excludedKeys = ["createdAt", "updatedAt", "__v", "_id"];
  const printContent = `
    <div class="p-8">
      <h2 class="text-2xl font-bold text-center mb-4">Malkhana Entry Details</h2>
      ${Object.keys(entry)
        .filter((key) => !excludedKeys.includes(key))
        .map((key) => {
          if (key === "avatar") {
            return entry[key]
              ? `<p class="text-lg"><strong>${key}:</strong> <img src="${entry[key]}" alt="Avatar" class="mx-auto my-4 rounded-lg max-w-xs max-h-xs"></p>`
              : `<p class="text-lg"><strong>${key}:</strong> No Image</p>`;
          }
          return `<p class="text-lg"><strong>${key}:</strong> ${entry[key]}</p>`;
        })
        .join("")}
    </div>
  `;

  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head>
        <title>Print Malkhana Entry</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">
        <style>
          @media print {
            body {
              font-family: Arial, sans-serif;
              margin: 20mm;
            }
            h2 {
              text-align: center;
            }
            p {
              font-size: 14px;
              margin: 4px 0;
            }
            img {
              display: block;
              margin: 10px auto;
            }
          }
        </style>
      </head>
      <body>${printContent}</body>
    </html>
  `);
  printWindow.document.close();

  // Ensure images are loaded before printing
  printWindow.onload = () => {
    printWindow.print();
  };
};

export default PrintMalkhanaEntry;
