import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const SeizedCashGoldContext = createContext();

export const SeizedCashGoldProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Get token from local storage or state
      try {
        const response = await axios.get(
          "https://malkhanaserver-production.up.railway.app/api/v1/seized",
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
  }, []); // Empty dependency array ensures this runs only once

  const deleteItem = async (id) => {
    const token = localStorage.getItem("token"); // Get token from local storage or state
    try {
      const response = await axios.delete(
        `https://malkhanaserver-production.up.railway.app/api/v1/seized/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );
      // Filter out the deleted item from the data state
      setData((prevData) => prevData.filter((item) => item.id !== id));
      toast.success(response?.data?.message);
      console.log(response?.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const updateItem = async (id, updatedItem) => {
    const token = localStorage.getItem("token"); // Get token from local storage or state
    try {
      const response = await axios.patch(
        `https://malkhanaserver-production.up.railway.app/api/v1/seized/${id}`,
        updatedItem,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );
      // Update the item in the data state
      setData(data.map((item) => (item.id === id ? response.data.data : item)));
      toast.success(response?.data?.message);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <SeizedCashGoldContext.Provider
      value={{ data, loading, error, deleteItem, updateItem }}
    >
      {children}
    </SeizedCashGoldContext.Provider>
  );
};
