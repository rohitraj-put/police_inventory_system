// hooks/useArto.js
import { useContext } from "react";
import { ArtoContext } from "../context/ArtoContaxt";

const useArto = () => {
  return useContext(ArtoContext);
};

export default useArto;
