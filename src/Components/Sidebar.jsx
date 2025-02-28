import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaHome,
  FaFileAlt,
  FaBox,
  FaDatabase,
  FaQrcode,
  FaFileImport,
  FaUsers,
  FaCog,
  FaMoneyBill,
  FaQuestionCircle,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/Images/mainlogo.png";
import Cutlogo from "../assets/Images/cutLogo.png";

const menuItems = [
  { path: "/dashboard", name: "Dashboard", icon: <FaHome /> },
  {
    name: "Malkhana Entry",
    icon: <FaFileAlt />,
    subItems: [
      { path: "/malkhana-entry", name: "Malkhana Entry" },
      { path: "/fsl_entry", name: "FSL Entry" },
      { path: "/kurki_entry", name: "Kurki Entry" },
      { path: "/others_entry", name: "Others Entry" },
      { path: "/unclaimed_entry", name: "Unclaimed Entry" },
    ],
  },
  {
    name: "Seized Vehicle Entry",
    icon: <FaBox />,
    subItems: [
      { path: "/m_v_act_Seizure", name: "M V Act Seizure" },
      { path: "/arto_seizure", name: "Arto Seizure" },
      { path: "/ipc_vehicle", name: "IPC Vehicle" },
      { path: "/excise_vehicle", name: "Excise Vehicle" },
      { path: "/unclaimed_vehicle", name: "Unclaimed Vehicle" },
      { path: "/seizure_vehicle", name: "Seizure Vehicle" },
    ],
  },
  { path: "/summon-entry", name: "Summon Entry", icon: <FaFileAlt /> },
  {
    path: "/malkhana-movement",
    name: "Malkhana Movement",
    icon: <FaDatabase />,
  },
  { path: "/malkhana-release", name: "Malkhana Release", icon: <FaBox /> },
  { path: "/generate-barcode", name: "Generate Bar Code", icon: <FaQrcode /> },
  { path: "/reports", name: "Reports", icon: <FaFileAlt /> },
  { path: "/import-data", name: "Import Data", icon: <FaFileImport /> },
  { path: "/manage-users", name: "Manage Users", icon: <FaUsers /> },
  { path: "/settings", name: "Settings", icon: <FaCog /> },
  {
    path: "/seized-cash-gold",
    name: "Seized Cash & Gold",
    icon: <FaMoneyBill />,
  },
  { path: "/help", name: "Help", icon: <FaQuestionCircle /> },
];

const Sidebar = ({ isOpen, setActivePage }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <motion.div
      animate={{ width: isOpen ? 230 : 60 }}
      className="bg-[#8c7a48] text-white h-screen sticky left-0 top-0 overflow-y-auto"
    >
      {isOpen ? (
        <div className="sticky top-0 bg-[#8c7a48] z-50">
          <div className="sticky top-0 bg-white z-50">
            <img className="h-18 pl-2 py-2" src={logo} alt="logo" />
          </div>
        </div>
      ) : (
        <div className="sticky top-0 bg-[#8c7a48] z-50">
          <img className="h-12 ml-2 pt-2" src={Cutlogo} alt="logo" />
        </div>
      )}
      <ul className="mt-8 space-y-4 p-1">
        {menuItems.map((item) => (
          <div key={item.name}>
            {item.subItems ? (
              <div>
                <div
                  className="flex items-center justify-between px-2 py-1 rounded cursor-pointer hover:bg-[#b89f5b]"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === item.name ? null : item.name
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    {isOpen && <span>{item.name}</span>}
                  </div>
                  {isOpen &&
                    (openDropdown === item.name ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    ))}
                </div>
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: openDropdown === item.name ? "auto" : 0,
                    opacity: openDropdown === item.name ? 1 : 0,
                  }}
                  className="overflow-hidden pl-6"
                >
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.path}
                      className="block px-2 py-1 rounded cursor-pointer hover:bg-[#d1b56a]"
                      onClick={() => setActivePage(subItem.name)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </motion.ul>
              </div>
            ) : (
              <Link
                to={item.path}
                className="flex items-center gap-3 px-2 py-1 rounded cursor-pointer hover:bg-[#b89f5b]"
                onClick={() => setActivePage(item.name)}
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
              </Link>
            )}
          </div>
        ))}
      </ul>
    </motion.div>
  );
};

export default Sidebar;
