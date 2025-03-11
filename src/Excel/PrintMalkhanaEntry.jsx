import React from "react";

const PrintMalkhanaEntry = (entry) => {
  const excludedKeys = ["createdAt", "updatedAt", "__v", "_id"];
  const avatarKey = "avatar";
  const printContent = `
    <div class="p-8">
      <h2 class="text-2xl font-bold text-center mb-4">Malkhana Entry Details</h2>
      ${
        entry[avatarKey]
          ? `<div class="text-center mb-4"><img src="${entry[avatarKey]}" alt="Avatar" class="mx-auto my-4 rounded-lg max-w-xs max-h-xs"></div>`
          : `<p class="text-lg text-center"><strong>${avatarKey}:</strong> No Image</p>`
      }
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          ${Object.keys(entry)
            .filter((key) => !excludedKeys.includes(key))
            .map(
              (key) => `
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap uppercase text-sm font-medium text-gray-900">${key}</td>
                  <td class="px-6 py-4 whitespace-nowrap uppercase text-sm text-gray-500">${entry[key]}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
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
            p, td, th {
              font-size: 14px;
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
