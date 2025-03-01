// hooks/useUnclaimedVehicle.js
import { useContext } from "react";
import { UnclaimedVehicleContext } from "../context/UnclaimedVehicleContext";

const useUnclaimedVehicle = () => {
  return useContext(UnclaimedVehicleContext);
};

export default useUnclaimedVehicle;
