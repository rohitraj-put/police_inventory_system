// context/AllDataContext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";
// import toast from "react-hot-toast";

export const AllDataContext = createContext();

export const AllDataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [move, setMove] = useState([]);
  const [returnData, setReturnData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const token = localStorage.getItem("token"); // Get token from local storage or state
    try {
      const response = await axios.get(
        "https://malkhanaserver.onrender.com/api/v1/move/alldata",
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

  const fetchMoveData = async () => {
    const token = localStorage.getItem("token"); // Get token from local storage or state
    try {
      const response = await axios.get(
        "https://malkhanaserver.onrender.com/api/v1/move",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );
      setMove(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchReturnData = async () => {
    const token = localStorage.getItem("token"); // Get token from local storage or state
    try {
      const response = await axios.get(
        "https://malkhanaserver.onrender.com/api/v1/return",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );
      setReturnData(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchMoveData();
    fetchReturnData();
  }, [data, move]);

  return (
    <AllDataContext.Provider value={{ data, loading, error, move, returnData }}>
      {children}
    </AllDataContext.Provider>
  );
};
