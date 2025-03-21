// hooks/useIpc.js
import { useContext } from "react";
import { IpcVehicleContext } from "../context/IpcVehicleContext";

const useIpc = () => {
  return useContext(IpcVehicleContext);
};

export default useIpc;
