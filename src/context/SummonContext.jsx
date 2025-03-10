// context/SummonContext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const SummonContext = createContext();

export const SummonProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Get token from local storage or state
      try {
        const response = await axios.get(
          "https://malkhanaserver-production.up.railway.app/api/v1/summon",
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
  }, [data]);

  const deleteItem = async (id) => {
    const token = localStorage.getItem("token"); // Get token from local storage or state
    try {
      const response = await axios.delete(
        `https://malkhanaserver-production.up.railway.app/api/v1/summon/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );
      // Filter out the deleted item from the data state
      setData(data.filter((item) => item.id !== id));
      toast.success(response?.data?.message);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      toast.success(err.response?.data?.message || err.message);
    }
  };

  return (
    <SummonContext.Provider value={{ data, loading, error, deleteItem }}>
      {children}
    </SummonContext.Provider>
  );
};
