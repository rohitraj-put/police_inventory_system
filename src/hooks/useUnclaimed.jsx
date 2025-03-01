// hooks/useOther.js
import { useContext } from "react";
import { UnclaimedContext } from "../context/UnclaimedContext";

const UnclaimedOther = () => {
  return useContext(UnclaimedContext);
};

export default UnclaimedOther;
