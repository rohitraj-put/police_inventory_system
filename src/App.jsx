import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import LogIn from "./Auth/LogIn";
import Register from "./Auth/Register";
import Dashboard from "./layout/Dashboard";
import Sidebar from "./Components/Sidebar";
import Footer from "./Components/Footer";
import { GoSidebarExpand } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import DPlogo from "../src/assets/Images/dp.png"

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
import MalkhanaHelp from "./pages/MalkhanaHelp";
import { Toaster } from "react-hot-toast";
import MalkhanaIsReturn from "./pages/MalkhanaIsReturn";
import OfflineNotification from "./OfflineNotification";
import useUser from "./hooks/useUser";
import TranslateComponent from "./layout/TranslateComponent";


// Function to check token expiration
const isTokenExpired = (token) => {
  // Decode the token to get its expiration time
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
  return Date.now() > expirationTime;
};

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      if (!hasRedirected && window.location.pathname === "/") {
        setHasRedirected(true);
        navigate("/dashboard", { replace: true });
      }
    }
  }, [navigate, hasRedirected]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the token from local storage or wherever you store it
    
    if (token && isTokenExpired(token)) {
      // If the token is expired, navigate to the home page
      localStorage.removeItem('token'); // Optionally remove the expired token
      navigate('/'); // Navigate to the home page
    }
  }, [navigate]);

  const LogoutHandler = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      navigate("/", { replace: true }); // Navigate to login without refreshing
    }
  };

  return (
    <div className="flex h-screen">
      <OfflineNotification />
     
      <Toaster />
      {/* Sidebar */}
      {isAuthenticated && (
        <Sidebar isOpen={isSidebarOpen}  className="fixed h-screen" />
      )}

      {/* Main Content */}
      <div className={`flex-1 transition-all overflow-y-auto h-screen`}>
        {/* Header */}
        {isAuthenticated && (
          <div className="flex justify-between items-center bg-[#8c7a48] py-1 px-2 sticky top-0 z-50 cursor-pointer">
            <div className="flex items-center">
              <button
                title="Toggle Sidebar"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="bg-[#8c7a48] text-white rounded transition cursor-pointer"
              >
                <GoSidebarExpand size={32}/>
              </button>
              <div className="flex justify-center  p-1 rounded-full">
                <img
                  src={DPlogo}
                  alt="logo"
                  className="h-12"
                />
              </div>
            </div>

            <h1 className="text-white font-bold text-xl max-md:hidden">
              Peace, Service, Justice
            </h1>
            <div className="flex gap-2 items-center">
            <div className=""><TranslateComponent/></div>
              <MdLogout
                className="text-white"
                size={28}
                title="Log Out"
                onClick={LogoutHandler}
              />
              
              <Link
                to={"/manage-users"}
                className="w-10 h-10 rounded-full overflow-hidden"
              >
                <img
                  title="Profile"
                  className="w-full h-full object-cover"
                  src={user?.avatar ||
                    "https://pagedone.io/asset/uploads/1705471668.png"}
                  alt="profile_image"
                />
              </Link>
              
            </div>
            
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
                <Route
                  path="/malkhana-movement-is-return"
                  element={<MalkhanaIsReturn />}
                />
                <Route path="/malkhana-release" element={<MalkhanaRelease />} />
                <Route path="/generate-barcode" element={<GenerateBarcode />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/import-data" element={<ImportData />} />
                <Route path="/manage-users" element={<ManageUsers />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/seized-cash-gold" element={<SeizedCashGold />} />
                <Route path="/help" element={<MalkhanaHelp />} />
                <Route path="*" element={<NotFound />} />
              </>
            )}
          </Routes>
        </div>
        {/* {isAuthenticated && <Footer />} */}
      </div>
    </div>
  );
}

export default App;