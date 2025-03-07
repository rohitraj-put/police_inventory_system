import React, { useState } from "react";
import { FaUsers, FaFileAlt, FaBoxOpen } from "react-icons/fa";
import { RiMotorbikeFill } from "react-icons/ri";
import { GrDocumentVerified, GrDocumentPerformance } from "react-icons/gr";
import { TbTruckReturn } from "react-icons/tb";
import { Link } from "react-router-dom";
import useAllData from "../hooks/useAllData";

function Dashboard() {
  const { data: AllData = [], loading } = useAllData();
  const [showTable, setShowTable] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [color, setColor] = useState("");
  const [title, setTitle] = useState("");

  const dashboardCards = [
    {
      id: 1,
      count: "40",
      title: "Total Users",
      icon: <FaUsers size={28} />,
      bg: "bg-green-400",
      text: "text-white",
    },
    ...AllData.map((entry, index) => ({
      id: index + 2,
      count: entry.data.length,
      title: `Total ${entry.collection.replace(/_/g, " ")}`,
      icon: getIcon(entry.collection),
      bg: getBgColor(entry.collection),
      text: getTextColor(entry.collection),
      onClick: () => {
        setShowTable(entry.data);
        setBgColor(getBgColor(entry.collection));
        setColor(getTextColor(entry.collection));
        setTitle(`Total ${entry.collection.replace(/_/g, " ")}`);
      },
    })),
  ];

  function getIcon(collection) {
    switch (collection) {
      case "Malkhana_Entry":
        return <GrDocumentVerified size={28} />;
      case "FSL_Entry":
        return <GrDocumentPerformance size={28} />;
      case "Kurki_Entry":
        return <TbTruckReturn size={28} />;
      case "Other_Entry":
        return <FaFileAlt size={28} />;
      case "Unclaimed_Entry":
      case "Unclaimed_Vehicle":
        return <FaBoxOpen size={28} />;
      case "MVAct_Seizure":
      case "ARTO_Seizure":
      case "IPC_Vehicle":
      case "Excise_Vehicle":
      case "Seizure_Vehicle":
        return <RiMotorbikeFill size={28} />;
      default:
        return <FaFileAlt size={28} />;
    }
  }

  function getBgColor(collection) {
    switch (collection) {
      case "Malkhana_Entry":
        return "bg-yellow-400";
      case "FSL_Entry":
        return "bg-[#f1d790]";
      case "Kurki_Entry":
        return "bg-[#f1d790]";
      case "Other_Entry":
        return "bg-blue-600";
      case "Unclaimed_Entry":
      case "Unclaimed_Vehicle":
        return "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500";
      case "MVAct_Seizure":
      case "ARTO_Seizure":
      case "IPC_Vehicle":
      case "Excise_Vehicle":
      case "Seizure_Vehicle":
        return "bg-blue-400";
      default:
        return "bg-gray-400";
    }
  }

  function getTextColor(collection) {
    switch (collection) {
      case "Malkhana_Entry":
      case "FSL_Entry":
      case "Kurki_Entry":
        return "text-black";
      case "Other_Entry":
      case "Unclaimed_Entry":
      case "Unclaimed_Vehicle":
        return "text-white";
      case "MVAct_Seizure":
      case "ARTO_Seizure":
      case "IPC_Vehicle":
      case "Excise_Vehicle":
      case "Seizure_Vehicle":
        return "text-white";
      default:
        return "text-black";
    }
  }

  // Extract the table header keys dynamically from the showTable data and exclude specific keys
  const excludedKeys = ["_id", "updatedAt", "createdAt", "__v"];
  const tableHeaders =
    showTable.length > 0
      ? Object.keys(showTable[0]).filter((key) => !excludedKeys.includes(key))
      : [];

  return (
    <>
      <div className="">
        <div className="flex justify-between items-center">
          {" "}
          <h2 className="text-lg font-medium uppercase">Dashboard</h2>
          <h2 className="text-lg font-medium uppercase">ID - FERPR5534C</h2>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
            {dashboardCards.map((card) => (
              <Link
                key={card.id}
                to="#"
                onClick={card.onClick}
                className={`transform hover:scale-105 transition duration-300 shadow-lg rounded-lg p-5 ${card.bg}`}
              >
                <div className="flex justify-between items-center">
                  <div className={`${card.text}`}>{card.icon}</div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${card.text}`}>
                      {card.count}
                    </div>
                    <div className={`text-base ${card.text} capitalize`}>
                      {card.title}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <h2 className={` text-lg font-bold my-8 uppercase`}>{title}</h2>

      {showTable && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-[#f1d790]">
            <thead>
              <tr className={`${bgColor} ${color} capitalize`}>
                {tableHeaders.map((header) => (
                  <th key={header} className="px-4 py-2 text-sm border">
                    {header.replace(/([A-Z])/g, " $1").toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {showTable.map((movement, index) => (
                <tr key={index} className="text-black">
                  {tableHeaders.map((key) => (
                    <td key={key} className="px-4 py-2 border">
                      {key === "avatar" ? (
                        <img
                          src={movement[key]}
                          alt="Avatar"
                          className="w-10 h-10"
                        />
                      ) : (
                        movement[key]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Dashboard;
