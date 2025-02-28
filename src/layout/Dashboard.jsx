import React from "react";
import { FaUsers } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { RiMotorbikeFill } from "react-icons/ri";
import { GrDocumentVerified } from "react-icons/gr";
import { GrDocumentPerformance } from "react-icons/gr";
import { FaFileAlt } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { TbTruckReturn } from "react-icons/tb";
import { Link } from "react-router-dom";

const dashboardCards = [
  {
    id: 1,
    count: "40",
    title: "total users",
    icon: <FaUsers size={28} className="text-[#8c7a48]" />,
  },
  {
    id: 2,
    count: "30",
    title: "total entry / record",
    icon: <TfiWrite size={28} className="text-[#8c7a48]" />,
  },
  {
    id: 3,
    count: "10",
    title: "total malkhana entry",
    icon: <GrDocumentVerified size={28} className="text-[#8c7a48]" />,
  },
  {
    id: 4,
    count: "90",
    title: "Total vehicle entry",
    icon: <RiMotorbikeFill size={28} className="text-[#8c7a48]" />,
  },
  {
    id: 5,
    count: "40",
    title: "today movement entry",
    icon: <GrDocumentPerformance size={28} className="text-[#8c7a48]" />,
  },
  {
    id: 6,
    count: "30",
    title: "today return entry",
    icon: <TbTruckReturn size={28} className="text-[#8c7a48]" />,
  },
  {
    id: 7,
    count: "10",
    title: "today release entry",
    icon: <FaBoxOpen size={28} className="text-[#8c7a48]" />,
  },
  {
    id: 8,
    count: "90",
    title: "today summon entry",
    icon: <FaFileAlt size={28} className="text-[#8c7a48]" />,
  },
];

function Dashboard() {
  return (
    <>
      <div>
        <main>
          <div className="grid ">
            <div className="grid grid-cols-12 gap-6">
              <div className="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
                <div className="col-span-12">
                  <div className="flex items-center intro-y">
                    <h2 className=" text-lg font-medium truncate">Dashboard</h2>
                  </div>
                  <div className="grid grid-cols-12 gap-6 mt-5">
                    {dashboardCards.map((card) => (
                      <Link
                        key={card.id}
                        className="transform hover:scale-105 transition duration-300 shadow-sm rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-[#f1d790]"
                        href="#"
                      >
                        <div className="p-5">
                          <div className="flex justify-between">
                            {card.icon}
                          </div>
                          <div className="ml-2 w-full flex-1">
                            <div>
                              <div className="mt-3 text-3xl font-bold leading-8">
                                {card.count}
                              </div>
                              <div className="mt-1 text-base text-gray-600 capitalize">
                                {card.title}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="overflow-x-auto mt-12">
        <table className="min-w-full border border-[#f1d790]">
          <thead>
            <tr className="bg-[#f1d790]">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Age</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Country</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border">John Doe</td>
              <td className="px-4 py-2 border">30</td>
              <td className="px-4 py-2 border">john@example.com</td>
              <td className="px-4 py-2 border">123 Main St, NY</td>
              <td className="px-4 py-2 border">(123) 456-7890</td>
              <td className="px-4 py-2 border">USA</td>
            </tr>
            <tr>
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
