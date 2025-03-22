import React from "react";
import Register from "../Auth/Register";
import useUser from "../hooks/useUser";
import { MdDelete } from "react-icons/md";

function ManageUsers() {
  const { user, allUser, deleteUser } = useUser();

  const totalUser = allUser?.filter((userA) => userA.district === user?.district);

  return (
    <>
      <div className="flex justify-between flex-wrap">
        {user?.role === "Admin" ? <Register /> : ""}
        <div className={`${user?.role === "Admin" ? "w-1/3" : "w-1/2"} bg-gray-100 p-2 rounded-2xl mx-auto max-md:w-full`}>
          {user ? (
            <>
              <div className="flex items-center justify-center relative z-10 mb-2.5">
                <img
                  src={
                    user?.avatar ||
                    "https://pagedone.io/asset/uploads/1705471668.png"
                  }
                  alt="user-avatar"
                  className="border-4 w-48 h-48 border-solid border-white rounded-full object-cover"
                />
              </div>
              <h3 className="text-center font-manrope font-bold text-3xl leading-10 text-gray-900 mb-3 capitalize">
                {user?.fullName}
              </h3>
              <p className="font-normal text-base leading-7 text-gray-500 text-center mb-2 capitalize">
                designation : {user?.designation}
              </p>
              <p className="font-normal text-base leading-7 text-gray-500 text-center mb-2 capitalize">
                police Station : {user?.policeStation}
              </p>
              <p className="font-normal text-base leading-7 text-gray-500 text-center mb-2 capitalize">
                police district : {user?.district}
              </p>
              <p className="font-normal text-base leading-7 text-gray-500 text-center mb-2 capitalize">
                Role : {user?.role}
              </p>
              <p className="font-normal text-base leading-7 text-gray-500 text-center mb-2 capitalize">
                Email : {user?.email}
              </p>
              <p className="font-normal text-base leading-7 text-gray-500 text-center mb-2 capitalize">
                Mobile : {user?.mobile}
              </p>
              <p className="font-normal text-base leading-7 text-gray-500 text-center mb-2 capitalize">
                PIS No: {user?.pisNo||"N/A"}
              </p>
              <p className="font-normal text-base leading-7 text-gray-500 text-center mb-2 capitalize">
                Belt No : {user?.beltNo ||"N/A"}
              </p>
              <p className="font-normal text-sm leading-7 text-gray-400 text-center">
                Member since : {new Date(user?.createdAt).toLocaleDateString()}
              </p>
            </>
          ) : (
            <p className="text-center text-gray-500">Loading user details...</p>
          )}
        </div>
      </div>

      {user?.role === "Admin" && (
        <div className="mt-8">
          <h1 className="text-2xl font-bold mb-4">All User Data</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 text-start px-4 border-b-2 border-gray-200">Full Name</th>
                  <th className="py-2 text-start px-4 border-b-2 border-gray-200">Designation</th>
                  <th className="py-2 text-start px-4 border-b-2 border-gray-200">District</th>
                  <th className="py-2 text-start px-4 border-b-2 border-gray-200">Email</th>
                  <th className="py-2 text-start px-4 border-b-2 border-gray-200">Police Station</th>
                  <th className="py-2 text-start px-4 border-b-2 border-gray-200">Mobile</th>
                  <th className="py-2 text-start px-4 border-b-2 border-gray-200">PIS No</th>
                  <th className="py-2 text-start px-4 border-b-2 border-gray-200">Belt No</th>
                  <th className="py-2 text-start px-4 border-b-2 border-gray-200">Role</th>
                  <th className="py-2 text-start px-4 border-b-2 border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {totalUser?.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b border-gray-200">{user.fullName}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{user.designation}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{user.district}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{user.policeStation}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{user.mobile}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{user?.pisNo||"N/A"}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{user?.beltNo ||"N/A"}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{user.role}</td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      >
                        <MdDelete/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default ManageUsers;