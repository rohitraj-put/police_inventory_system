import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  const reloadHendler=()=>{
    window.location.reload()
  }
  return (
    <div className="w-full   flex items-center justify-center ">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8 px-4">
        <div className="border-t border-gray-200 text-center pt-8">
          <h1 className="text-6xl font-bold text-rose-600">404</h1>
          <h1 className="text-2xl font-medium py-8">oops! Your <span className="text-4xl font-bold">Access Token is Expired Please Re-Login</span></h1>
          <p className="text-2xl pb-5 px-12 font-medium">
            The page you are looking for does not exist
          </p>
          <Link
            onClick={reloadHendler}
            className="bg-[#8c7a48]  text-white font-semibold px-6 py-3 rounded-md cursor-pointer"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
