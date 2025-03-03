// hooks/useImportData.js
import { useContext } from "react";
import { ImportDataContext } from "../context/ImportDataContext";

const useImportData = () => {
  return useContext(ImportDataContext);
};

export default useImportData;
