import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allUser, setAllUser] = useState(null);
  

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(
        "https://malkhanaserver-production.up.railway.app/api/v1/users/current-user",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const data = await response.json();
      setUser(data.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchAllUser = async () => {
    try {
      const response = await fetch(
        "https://malkhanaserver-production.up.railway.app/api/v1/users/allusers",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch all users");
      }
      const data = await response.json();
      setAllUser(data.data);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchAllUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, allUser }}>
      {children}
    </UserContext.Provider>
  );
};