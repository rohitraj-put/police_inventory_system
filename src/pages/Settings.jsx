import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const Settings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://malkhanaserver-production.up.railway.app/api/v1/users/change-password",
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = response.data;
      if (response.status === 200) {
        toast.success(data.message);
        // Automatically log out the user
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred while changing the password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Change Password
      </h2>
      <form onSubmit={handleChangePassword}>
        <div className="mb-4">
          <label htmlFor="oldPassword" className="block text-gray-700">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showOldPassword ? "text" : "password"}
              id="oldPassword"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
              onClick={() => setShowOldPassword((prev) => !prev)}
            >
              {showOldPassword ? <FaRegEyeSlash /> : <MdOutlineRemoveRedEye />}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-700">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? <FaRegEyeSlash /> : <MdOutlineRemoveRedEye />}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <FaRegEyeSlash />
              ) : (
                <MdOutlineRemoveRedEye />
              )}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full p-2 cursor-pointer bg-[#8c7a48] text-white rounded mt-4 hover:bg-[#a28d53] disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Changing Password..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default Settings;
