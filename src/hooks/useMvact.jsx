// hooks/useMvact.js
import { useContext } from "react";
import { MvactContext } from "../context/MvactContext";

const useMvact = () => {
  return useContext(MvactContext);
};

export default useMvact;
