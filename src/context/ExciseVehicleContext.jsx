// context/ExciseVehicleContext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ExciseVehicleContext = createContext();

export const ExciseVehicleProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Get token from local storage or state
      try {
        const response = await axios.get(
          "https://malkhanaserver.onrender.com/api/v1/exciseVehicle",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in headers
            },
          }
        );
        setData(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ExciseVehicleContext.Provider value={{ data, loading, error }}>
      {children}
    </ExciseVehicleContext.Provider>
  );
};
