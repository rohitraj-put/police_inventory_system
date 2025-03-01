// hooks/useExciseVehicle.js
import { useContext } from "react";
import { ExciseVehicleContext } from "../context/ExciseVehicleContext";

const useExciseVehicle = () => {
  return useContext(ExciseVehicleContext);
};

export default useExciseVehicle;
