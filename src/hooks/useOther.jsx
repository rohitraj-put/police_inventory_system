// hooks/useOther.js
import { useContext } from "react";
import { OtherContext } from "../context/OtherContext";

const useOther = () => {
  return useContext(OtherContext);
};

export default useOther;
