import React, { useState, useRef, useEffect } from "react";
import { FaUsers, FaFileAlt, FaBoxOpen } from "react-icons/fa";
import { RiMotorbikeFill } from "react-icons/ri";
import { GrDocumentVerified, GrDocumentPerformance } from "react-icons/gr";
import { TbTruckReturn } from "react-icons/tb";
import { Link } from "react-router-dom";
import useAllData from "../hooks/useAllData";
import { isToday, isYesterday, subDays } from "date-fns";
import useUser from "../hooks/useUser";

function Dashboard() {
  const { data: AllData = [], loading } = useAllData();
  const [showTable, setShowTable] = useState([]);
  const [bgColor, setBgColor] = useState("");
  const [color, setColor] = useState("");
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedPoliceStation, setSelectedPoliceStation] = useState("all");
  const [firNoFilter, setFirNoFilter] = useState("");
  const [mudNoFilter, setmudNoFilter] = useState("");
  const tableRef = useRef(null);

  const { user, allUser } = useUser();
  const totalUser = allUser?.filter((userA) => userA.district === user?.district);

  // useEffect(() => {
  //   if (AllData.length > 0) {
  //     const malkhanaEntry = AllData.find((entry) => entry.collection === "Malkhana_Entry");
  //       setShowTable(malkhanaEntry);
  //       setBgColor(getBgColor("Malkhana_Entry"));
  //       setColor(getTextColor("Malkhana_Entry"));
  //       setTitle("Total Malkhana Entry");
  //     }
  //   }
  // , []);

  const dashboardCards = [
    ...(user?.role === "Admin"
      ? [
          {
            count: totalUser?.length,
            title: "Total Users",
            icon: <FaUsers size={28} />,
            bg: "bg-yellow-600",
            text: "text-white",
            onClick: () => {
              window.location.href = "/manage-users";
            },
          },
        ]
      : []),
    ...AllData.map((entry, index) => {
      const filteredData = entry.data.filter((data) => 
        data.district === user?.district && (user?.role === "Admin" || (user?.role === "User" && data.policeStation === user?.policeStation))
      );
      const policeStationFilteredData = selectedPoliceStation === "all"
        ? filteredData
        : filteredData.filter((data) => data.policeStation === selectedPoliceStation);
      return ({
        count: policeStationFilteredData.length,
        title: `Total ${entry.collection.replace(/_/g, " ")}`,
        icon: getIcon(entry.collection),
        bg: getBgColor(entry.collection),
        text: getTextColor(entry.collection),
        onClick: () => {
          setShowTable(filteredData);
          setBgColor(getBgColor(entry.collection));
          setColor(getTextColor(entry.collection));
          setTitle(`Total ${entry.collection.replace(/_/g, " ")}`);
          setFilter("all");
          scrollToTable();
        },
      });
    }),
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
        return "bg-green-500";
      case "FSL_Entry":
        return "bg-rose-500";
      case "Kurki_Entry":
        return "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500";
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
        return "text-white";
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

  function scrollToTable() {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  function filterData(data, filter, policeStation, firNoFilter, mudNoFilter) {
    const today = new Date();
    let filteredData = data;

    if (policeStation !== "all") {
      filteredData = filteredData.filter((item) => item.policeStation === policeStation);
    }

    if (firNoFilter) {
      filteredData = filteredData.filter((item) => item.firNo.includes(firNoFilter));
    }

    if (mudNoFilter) {
      filteredData = filteredData.filter((item) => item.mudNo.includes(mudNoFilter));
    }

    switch (filter) {
      case "today":
        return filteredData.filter((item) => isToday(new Date(item.createdAt)));
      case "yesterday":
        return filteredData.filter((item) => isYesterday(new Date(item.createdAt)));
      case "last_30_days":
        return filteredData.filter(
          (item) => new Date(item.createdAt) >= subDays(today, 30)
        );
      default:
        return filteredData;
    }
  }

  // Extract the table header keys dynamically from the showTable data and exclude specific keys
  const excludedKeys = ["_id", "updatedAt", "createdAt", "__v"];
  const tableHeaders =
    showTable.length > 0
      ? Object.keys(showTable[0]).filter((key) => !excludedKeys.includes(key))
      : [];

  const filteredTableData = filterData(showTable, filter, selectedPoliceStation, firNoFilter, mudNoFilter);

  return (
    <>
      <div className="">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium uppercase">{user?.role==="Admin" ? "Admin Dashboard" : "User Dashboard"}</h2>
          <h2 className="text-lg font-medium uppercase">PIS - {user?.pisNo||"FERPR5534C"}</h2>
        </div>
        {user?.role === "Admin" &&  (
          <div className="flex justify-end items-center mb-4 gap-2">
            Police Station:{" "}
            <select
              value={selectedPoliceStation}
              onChange={(e) => setSelectedPoliceStation(e.target.value)}
              className="p-2 border border-gray-300 rounded cursor-pointer"
            >
              <option value="all">All</option>
              {allUser?.map((policeS, index) => (
                <option className="cursor-pointer" key={index} value={policeS.policeStation}>
                  {policeS.policeStation}
                </option>
              ))}
            </select>
          </div>
        )}

        {loading ? (
          <div className="">Please Wait Data Loading.....</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
            {dashboardCards.map((card, index) => (
              <Link
                key={index}
                to="#"
                onClick={card.onClick}
                className={`transform hover:scale-105 transition duration-300 shadow-lg rounded-lg px-4 py-2 ${card.bg} `}
              >
                <div className="">
                  <div className={` font-bold ${card.text} capitalize `}>
                      {card.title}
                    </div>
                  <div className="flex justify-between items-center py-2">
                  <div className={`${card.text}`}>{card.icon}</div>
                    <div className={`text-4xl max-md:text-3xl font-bold ${card.text}`}>
                      {card.count}
                    </div>
                   
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {showTable.length > 0 && (
        <div ref={tableRef}>
          <h2 className={` text-lg font-bold my-8 uppercase`}>{title}</h2>

          <div className=" flex max-md:flex-col justify-between items-center "> 
          <div className="flex justify-end items-center mb-4 gap-2">
            Filter Data :{" "}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-1 border border-gray-300 rounded "
            >
              <option value="all">All</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last_30_days">Last 30 Days</option>
            </select>
          </div>

          <div className="flex justify-start items-center mb-4 gap-2 px-2">
            <div>
            FIR No:{" "}
            <input
              value={firNoFilter}
              onChange={(e) => setFirNoFilter(e.target.value)}
              className="p-1 border w-48 border-gray-300 rounded"
            />
            </div>
           <div>
           MUD No:{" "}
            <input
              value={mudNoFilter}
              onChange={(e) => setmudNoFilter(e.target.value)}
              className="p-1 border w-48 border-gray-300 rounded"
            />
           </div>
          </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-[#f1d790]">
              <thead>
              <tr className={`${bgColor} ${color} capitalize`}>
                 {tableHeaders.map((header) => (
                   <th key={header} className="px-4 py-2 text-sm border">
                     {header === 'mudNo' ? 'Mud Number' : header.replace(/([A-Z])/g, ' $1').toUpperCase()}
                   </th>
                 ))}
               </tr>
              </thead>
              <tbody>
                {filteredTableData.map((movement, index) => (
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
        </div>
      )}
    </>
  );
}

export default Dashboard;