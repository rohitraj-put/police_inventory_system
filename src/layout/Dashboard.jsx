import React from "react";
import { FaUsers, FaFileAlt, FaBoxOpen } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { RiMotorbikeFill } from "react-icons/ri";
import { GrDocumentVerified, GrDocumentPerformance } from "react-icons/gr";
import { TbTruckReturn } from "react-icons/tb";
import { Link } from "react-router-dom";

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
    count: "10",
    title: "Total Malkhana Entry",
    icon: <GrDocumentVerified size={28} />,
    bg: "bg-yellow-400",
    text: "text-black",
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
    count: "10",
    title: "Today Release Entry",
    icon: <FaBoxOpen size={28} />,
    bg: "bg-[#f1d790]",
    text: "text-black",
  },
  {
    id: 8,
    count: "90",
    title: "Today Summon Entry",
    icon: <FaFileAlt size={28} />,
    bg: "bg-[#f1d790]",
    text: "text-black",
  },
];

function Dashboard() {
  return (
    <>
      <div className="">
        <h2 className="text-lg font-medium">Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
          {dashboardCards.map((card) => (
            <Link
              key={card.id}
              to="#"
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

      <div className="overflow-x-auto mt-12">
        <table className="min-w-full border border-[#f1d790]">
          <thead>
            <tr className="bg-[#f1d790] text-black">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Age</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Country</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-black">
              <td className="px-4 py-2 border">John Doe</td>
              <td className="px-4 py-2 border">30</td>
              <td className="px-4 py-2 border">john@example.com</td>
              <td className="px-4 py-2 border">123 Main St, NY</td>
              <td className="px-4 py-2 border">(123) 456-7890</td>
              <td className="px-4 py-2 border">USA</td>
            </tr>
            <tr className="text-black">
              <td className="px-4 py-2 border">Jane Smith</td>
              <td className="px-4 py-2 border">25</td>
              <td className="px-4 py-2 border">jane@example.com</td>
              <td className="px-4 py-2 border">456 Park Ave, LA</td>
              <td className="px-4 py-2 border">(987) 654-3210</td>
              <td className="px-4 py-2 border">USA</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Dashboard;
