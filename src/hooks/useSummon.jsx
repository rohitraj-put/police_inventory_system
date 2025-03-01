// hooks/useSummon.js
import { useContext } from "react";
import { SummonContext } from "../context/SummonContext";

const useSummon = () => {
  return useContext(SummonContext);
};

export default useSummon;
