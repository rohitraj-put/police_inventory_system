// hooks/useMalkhanaRelease.js
import { useContext } from "react";
import { MalkhanaReleaseContext } from "../context/MalkhanaReleaseContext";

const useMalkhanaRelease = () => {
  return useContext(MalkhanaReleaseContext);
};

export default useMalkhanaRelease;
