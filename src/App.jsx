import React, { useState, useEffect } from "react";
import {
  Route,
  Routes,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import LogIn from "./Auth/LogIn";
import Register from "./Auth/Register";
import Dashboard from "./layout/Dashboard";
import Sidebar from "./Components/Sidebar";
import Footer from "./pages/Footer";
import { FaBars } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

// Import all pages
import MalkhanEntry from "./pages/MalkhanEntry";
import SummonEntry from "./pages/SummonEntry";
import MalkhanaMovement from "./pages/MalkhanaMovement";
import MalkhanaRelease from "./pages/MalkhanaRelease";
import GenerateBarcode from "./pages/GenerateBarcode";
import Reports from "./pages/Reports";
import ImportData from "./pages/ImportData";
import ManageUsers from "./pages/ManageUsers";
import Settings from "./pages/Settings";
import SeizedCashGold from "./pages/SeizedCashGold";
import FslEntry from "./pages/FslEntry";
import KurkiEntry from "./pages/KurkiEntry";
import OthersEntry from "./pages/OthersEntry";
import UnclaimedEntry from "./pages/UnclaimedEntry";
import MVActSeizure from "./pages/MVActSeizure";
import ArtoSeizure from "./pages/ArtoSeizure";
import IPCVehicle from "./pages/IPCVehicle";
import ExciseVehicle from "./pages/ExciseVehicle";
import UnclaimedVehicle from "./pages/UnclaimedVehicle";
import SeizureVehicle from "./pages/SeizureVehicle";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [location.pathname]); // Re-check authentication on route change

  useEffect(() => {
    console.log("Current Path:", location.pathname);
    console.log("Authenticated:", isAuthenticated);
  }, [location.pathname, isAuthenticated]);

  const LogoutHandler = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/", { replace: true }); // Navigate to login without refreshing
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {isAuthenticated && (
        <Sidebar isOpen={isSidebarOpen} className="fixed h-screen" />
      )}

      {/* Main Content */}
      <div className={`flex-1 transition-all overflow-y-auto h-screen`}>
        {/* Header */}
        {isAuthenticated && (
          <div className="flex justify-between items-center bg-[#8c7a48] py-1 px-2 sticky top-0 z-50 cursor-pointer">
            <button
              title="Toggle Sidebar"
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="bg-[#8c7a48] text-white rounded transition cursor-pointer"
            >
              <FaBars size={28} />
            </button>
            <h1 className="text-white font-bold text-xl">
              Peace, Service, Justice
            </h1>
            <div className="flex gap-2 items-center">
              <MdLogout
                className="text-white"
                size={28}
                title="Log Out"
                onClick={LogoutHandler}
              />
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
        )}

        {/* Logo */}
        {isAuthenticated && (
          <div className="flex justify-center bg-white p-1">
            <img
              src="https://vectorseek.com/wp-content/uploads/2023/09/Delhi-Police-Logo-Vector.svg-.png"
              alt="logo"
              className="h-28"
            />
          </div>
        )}

        {/* Page Content */}
        <div className="bg-white p-4">
          <Routes>
            {/* Public Routes */}
            {!isAuthenticated ? (
              <>
                <Route path="/" element={<LogIn />} />
                <Route path="/register" element={<Register />} />
              </>
            ) : (
              <>
                {/* Authenticated Routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/malkhana-entry" element={<MalkhanEntry />} />
                <Route path="/fsl_entry" element={<FslEntry />} />
                <Route path="/kurki_entry" element={<KurkiEntry />} />
                <Route path="/others_entry" element={<OthersEntry />} />
                <Route path="/unclaimed_entry" element={<UnclaimedEntry />} />
                <Route path="/m_v_act_seizure" element={<MVActSeizure />} />
                <Route path="/arto_seizure" element={<ArtoSeizure />} />
                <Route path="/ipc_vehicle" element={<IPCVehicle />} />
                <Route path="/excise_vehicle" element={<ExciseVehicle />} />
                <Route
                  path="/unclaimed_vehicle"
                  element={<UnclaimedVehicle />}
                />
                <Route path="/seizure_vehicle" element={<SeizureVehicle />} />
                <Route path="/summon-entry" element={<SummonEntry />} />
                <Route
                  path="/malkhana-movement"
                  element={<MalkhanaMovement />}
                />
                <Route path="/malkhana-release" element={<MalkhanaRelease />} />
                <Route path="/generate-barcode" element={<GenerateBarcode />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/import-data" element={<ImportData />} />
                <Route path="/manage-users" element={<ManageUsers />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/seized-cash-gold" element={<SeizedCashGold />} />
                <Route path="*" element={<NotFound />} />
              </>
            )}
          </Routes>
        </div>

        {/* Footer */}
        {isAuthenticated && <Footer />}
      </div>
    </div>
  );
}

export default App;
