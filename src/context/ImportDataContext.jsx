// context/ImportDataContext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const ImportDataContext = createContext();

export const ImportDataProvider = ({ children }) => {
  const [importData, setImportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Get token from local storage or state
      try {
        const response = await axios.get(
          "https://malkhanaserver-production.up.railway.app/api/v1/fileEntry",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in headers
            },
          }
        );
        setImportData(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ImportDataContext.Provider value={{ importData, loading, error }}>
      {children}
    </ImportDataContext.Provider>
  );
};
