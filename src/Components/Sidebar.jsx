import { motion } from "framer-motion";
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
} from "react-icons/fa";
import { Link } from "react-router-dom";

const menuItems = [
  { path: "/dashboard", name: "Dashboard", icon: <FaHome /> },
  { path: "/malkhana-entry", name: "Malkhana Entry", icon: <FaFileAlt /> },
  {
    path: "/seized-vehicle-entry",
    name: "Seized Vehicle Entry",
    icon: <FaBox />,
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
  return (
    <motion.div
      animate={{ width: isOpen ? 250 : 80 }}
      className="bg-[#8c7a48] text-white   h-screen sticky left-0 top-0 overflow-y-auto"
    >
      {isOpen ? (
        <div className=" sticky top-0 bg-[#8c7a48] z-50">
          <img
            className="h-36 ml-8 pt-2 "
            src="https://vectorseek.com/wp-content/uploads/2023/09/Delhi-Police-Logo-Vector.svg-.png"
            alt="logo"
          />
        </div>
      ) : (
        <div className=" sticky top-0 bg-[#8c7a48] z-50">
          <img
            className="h-12 ml-2 pt-2  "
            src="https://vectorseek.com/wp-content/uploads/2023/09/Delhi-Police-Logo-Vector.svg-.png"
            alt="logo"
          />
        </div>
      )}
      <ul className="mt-8 space-y-4 p-4 ">
        {menuItems.map((item) => (
          <Link
            to={item.path}
            whileHover={{ scale: 1.1 }}
            key={item.name}
            className="flex items-center gap-3 px-2 py-1 rounded cursor-pointer hover:bg-[#b89f5b]"
            onClick={() => setActivePage(item.name)}
          >
            <span className="text-xl">{item.icon}</span>
            {isOpen && <span>{item.name}</span>}
          </Link>
        ))}
      </ul>
    </motion.div>
  );
};

export default Sidebar;
