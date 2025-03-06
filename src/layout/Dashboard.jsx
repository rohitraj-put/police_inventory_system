import React, { useState } from "react";
import { FaUsers, FaFileAlt, FaBoxOpen } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { RiMotorbikeFill } from "react-icons/ri";
import { GrDocumentVerified, GrDocumentPerformance } from "react-icons/gr";
import { TbTruckReturn } from "react-icons/tb";
import { Link } from "react-router-dom";
import useMalkhana from "../hooks/useMalkhana";
import useMalkhanaRelease from "../hooks/useMalkhanaRelease";
import useSummon from "../hooks/useSummon";

function Dashboard() {
  const { data: malkhanaData = [] } = useMalkhana();
  const { data: MalkhanaReleaseData = [] } = useMalkhanaRelease();
  const { data: SummonData = [] } = useSummon();
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
    {
      id: 2,
      count: "30",
      title: "Total Entry / Record",
      icon: <TfiWrite size={28} />,
      bg: "bg-rose-400",
      text: "text-white",
    },
    {
      id: 3,
      count: malkhanaData.length,
      title: "Total Malkhana Entry",
      icon: <GrDocumentVerified size={28} />,
      bg: "bg-yellow-400",
      text: "text-black",
      onClick: () => {
        setShowTable(malkhanaData);
        setBgColor("bg-yellow-400");
        setColor("text-black");
        setTitle("Total Malkhana Entry");
      },
    },
    {
      id: 4,
      count: "90",
      title: "Total Vehicle Entry",
      icon: <RiMotorbikeFill size={28} />,
      bg: "bg-blue-400",
      text: "text-white",
    },
    {
      id: 5,
      count: "40",
      title: "Today Movement Entry",
      icon: <GrDocumentPerformance size={28} />,
      bg: "bg-[#f1d790]",
      text: "text-black",
    },
    {
      id: 6,
      count: "30",
      title: "Today Return Entry",
      icon: <TbTruckReturn size={28} />,
      bg: "bg-[#f1d790]",
      text: "text-black",
    },
    {
      id: 7,
      count: MalkhanaReleaseData.length,
      title: "Today Release Entry",
      icon: <FaBoxOpen size={28} />,
      bg: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
      text: "text-white",
      onClick: () => {
        setShowTable(MalkhanaReleaseData);
        setBgColor(
          "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        );
        setColor("text-white");
        setTitle("Today Release Entry");
      },
    },
    {
      id: 8,
      count: SummonData.length,
      title: "Today Summon Entry",
      icon: <FaFileAlt size={28} />,
      bg: "bg-blue-600",
      text: "text-white",
      onClick: () => {
        setShowTable(SummonData);
        setBgColor("bg-blue-600");
        setColor("text-white");
        setTitle("Today Summon Entry");
      },
    },
  ];

  // Extract the table header keys dynamically from the malkhanaData and exclude specific keys
  const excludedKeys = ["_id", "updatedAt", "createdAt", "__v"];
  const tableHeaders =
    showTable.length > 0
      ? Object.keys(showTable[0]).filter((key) => !excludedKeys.includes(key))
      : [];

  return (
    <>
      <div className="">
        <h2 className="text-lg font-medium uppercase">Dashboard</h2>
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
                    <>
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
                    </>
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
