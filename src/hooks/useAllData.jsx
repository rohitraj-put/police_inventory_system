// hooks/useAllData.js
import { useContext } from "react";
import { AllDataContext } from "../context/AllDataContext";

const useAllData = () => {
  return useContext(AllDataContext);
};

export default useAllData;
