// hooks/useMalkhana.js
import { useContext } from "react";
import { KurkiContext } from "../context/KurkiContext";

const useKurki = () => {
  return useContext(KurkiContext);
};

export default useKurki;
