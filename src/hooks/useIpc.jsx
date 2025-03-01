// hooks/useIpc.js
import { useContext } from "react";
import { IPCVehicleContext } from "../context/IPCVehicleContext";

const useIpc = () => {
  return useContext(IPCVehicleContext);
};

export default useIpc;
