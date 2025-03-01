import React, { useEffect, useState } from "react";
import Register from "../Auth/Register";

function ManageUsers() {
  const [user, setUser] = useState(null);
  console.log(user);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          "https://malkhanaserver.onrender.com/api/v1/users/current-user",
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

    fetchUserDetails();
  }, []);

  return (
    <div className="flex justify-between flex-wrap">
      <div>
        <Register />
      </div>
      <div className="w-1/3 bg-gray-100 p-8 rounded-2xl mx-auto max-md:w-full">
        {user ? (
          <>
            <div className="flex items-center justify-center relative z-10 mb-2.5">
              <img
                src={
                  user.avatar ||
                  "https://pagedone.io/asset/uploads/1705471668.png"
                }
                alt="user-avatar"
                className="border-4 border-solid border-white rounded-full object-cover"
              />
            </div>
            <h3 className="text-center font-manrope font-bold text-3xl leading-10 text-gray-900 mb-3 capitalize">
              {user.fullName}
            </h3>
            <p className="font-normal text-base leading-7 text-gray-500 text-center mb-2 capitalize">
              designation : {user.designation}
            </p>
            <p className="font-normal text-base leading-7 text-gray-500 text-center mb-2 capitalize">
              police Station : {user.policeStation}
            </p>
            <p className="font-normal text-base leading-7 text-gray-500 text-center mb-2 capitalize">
              Role : {user.role}
            </p>
            <p className="font-normal text-base leading-7 text-gray-500 text-center mb-2 capitalize">
              Email : {user.email}
            </p>
            <p className="font-normal text-base leading-7 text-gray-500 text-center mb-2 capitalize">
              Mobile : {user.mobile}
            </p>
            <p className="font-normal text-sm leading-7 text-gray-400 text-center">
              Member since : {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </>
        ) : (
          <p className="text-center text-gray-500">Loading user details...</p>
        )}
      </div>
    </div>
  );
}

export default ManageUsers;
