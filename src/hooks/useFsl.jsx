// hooks/useMalkhana.js
import { useContext } from "react";
import { FslContext } from "../context/FslContext";

const useFsl = () => {
  return useContext(FslContext);
};

export default useFsl;
