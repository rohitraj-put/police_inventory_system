import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LogIn from "./Auth/LogIn";
import Register from "./Auth/Register";
import Dashboard from "./layout/Dashboard";
import MalkhanEntry from "../src/pages/MalkhanEntry";
import SummonEntry from "../src/pages/SummonEntry";
import MalkhanaMovement from "../src/pages/MalkhanaMovement";
import MalkhanaRelease from "../src/pages/MalkhanaRelease";
import GenerateBarcode from "../src/pages/GenerateBarcode";
import Reports from "../src/pages/Reports";
import ImportData from "../src/pages/ImportData";
import ManageUsers from "../src/pages/ManageUsers";
import Settings from "../src/pages/Settings";
import SeizedCashGold from "../src/pages/SeizedCashGold";
import { motion } from "framer-motion";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Components/Sidebar";
import { MdLogout } from "react-icons/md";
import "./App.css";
import FslEntry from "./pages/FslEntry";
import KurkiEntry from "./pages/KurkiEntry";
import OthersEntry from "./pages/OthersEntry";
import UnclaimedEntry from "./pages/UnclaimedEntry";
import Footer from "./pages/Footer";

import MVActSeizure from "./pages/MVActSeizure";
import ArtoSeizure from "./pages/ArtoSeizure";
import IPCVehicle from "./pages/IPCVehicle";
import ExciseVehicle from "./pages/ExciseVehicle";
import UnclaimedVehicle from "./pages/UnclaimedVehicle";
import SeizureVehicle from "./pages/SeizureVehicle";
import NotFound from "./pages/NotFound";
// import logo from "../src/assets/Images/mainlogo.png";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  // Extract page name from route path for display
  const pageTitles = {
    "/dashboard": "Dashboard",
    "/malkhana-entry": "Malkhana Entry",
    "/seized-vehicle-entry": "Seized Vehicle Entry",
    "/summon-entry": "Summon Entry",
    "/malkhana-movement": "Malkhana Movement",
    "/malkhana-release": "Malkhana Release",
    "/generate-barcode": "Generate Barcode",
    "/reports": "Reports",
    "/import-data": "Import Data",
    "/manage-users": "Manage Users",
    "/settings": "Settings",
    "/seized-cash-gold": "Seized Cash & Gold",
  };

  const activePage = pageTitles[location.pathname] || "Dashboard";

  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar - Fixed position */}
        <Sidebar isOpen={isSidebarOpen} className="fixed h-screen" />

        {/* Main Content - Scrollable */}

        <div
          className={`flex-1  transition-all ml-${
            isSidebarOpen ? "0" : "0"
          } overflow-y-auto h-screen`}
        >
          {/* <Header /> */}
          <div className="flex justify-between items-center bg-[#8c7a48] py-1 px-2 sticky top-0 z-50 cursor-pointer">
            {/* Toggle Sidebar Button */}
            <button
              title="Toggle Sidebar"
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className=" bg-[#8c7a48] text-white rounded  transition cursor-pointer"
            >
              <FaBars size={28} />
            </button>
            <h1 className="text-white font-bold text-xl">
              Peace, Service, Justice
            </h1>
            <div className="flex gap-2 items-center">
              <MdLogout className="text-white" size={28} title="Log Out" />
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  title="Profile"
                  className="w-full h-full object-cover"
                  src="https://www.pngitem.com/pimgs/m/78-786293_1240-x-1240-0-avatar-profile-icon-png.png"
                  alt="profile_image"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center bg-white p-1">
            <img
              src="https://vectorseek.com/wp-content/uploads/2023/09/Delhi-Police-Logo-Vector.svg-.png"
              alt="logo"
              className="h-28"
            />
          </div>

          {/* Animated Content Wrapper */}
          <div className="bg-white p-4 ">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/malkhana-entry" element={<MalkhanEntry />} />
              <Route path="/fsl_entry" element={<FslEntry />} />
              <Route path="/kurki_entry" element={<KurkiEntry />} />
              <Route path="/others_entry" element={<OthersEntry />} />
              <Route path="/unclaimed_entry" element={<UnclaimedEntry />} />

              {/* ------------------seized-vehicle-entr----------------- */}
              <Route path="/m_v_act_Seizure" element={<MVActSeizure />} />
              <Route path="/arto_seizure" element={<ArtoSeizure />} />
              <Route path="/ipc_vehicle" element={<IPCVehicle />} />
              <Route path="/excise_vehicle" element={<ExciseVehicle />} />
              <Route path="/unclaimed_vehicle" element={<UnclaimedVehicle />} />
              <Route path="/seizure_vehicle" element={<SeizureVehicle />} />

              <Route path="/summon-entry" element={<SummonEntry />} />
              <Route path="/malkhana-movement" element={<MalkhanaMovement />} />
              <Route path="/malkhana-release" element={<MalkhanaRelease />} />
              <Route path="/generate-barcode" element={<GenerateBarcode />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/import-data" element={<ImportData />} />
              <Route path="/manage-users" element={<ManageUsers />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/seized-cash-gold" element={<SeizedCashGold />} />
              {/* ---------------Page not found ---------------- */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
