// hooks/useMalkhana.js
import { useContext } from "react";
import { MalkhanaContext } from "../context/MalkhanaContext";

const useMalkhana = () => {
  return useContext(MalkhanaContext);
};

export default useMalkhana;
