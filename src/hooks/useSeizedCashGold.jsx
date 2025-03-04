import { useContext } from "react";
import { SeizedCashGoldContext } from "../context/SeizedCashGoldContext";

function useSeizedCashGold() {
  return useContext(SeizedCashGoldContext);
}

export default useSeizedCashGold;
