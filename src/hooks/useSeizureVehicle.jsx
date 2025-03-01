// hooks/useSeizureVehicle.js
import { useContext } from "react";
import { SeizureVehicleContext } from "../context/SeizureVehicleContext";

const useSeizureVehicle = () => {
  return useContext(SeizureVehicleContext);
};

export default useSeizureVehicle;
