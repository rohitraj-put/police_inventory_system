import React from "react";

function LogIn() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 dark:bg-neutral-900">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-6 dark:bg-neutral-900 dark:border-neutral-700">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Sign up
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
            Already have an account?{" "}
            <a
              className="text-blue-600 hover:underline dark:text-blue-500"
              href="../examples/html/login.html"
            >
              Log in here
            </a>
          </p>
        </div>
        <div className="mt-5">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
          >
            <svg className="w-5 h-5" viewBox="0 0 46 47" fill="none">
              <path
                d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                fill="#4285F4"
              />
              <path
                d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                fill="#34A853"
              />
              <path
                d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                fill="#FBBC05"
              />
              <path
                d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                fill="#EB4335"
              />
            </svg>
            Sign up with Google
          </button>
          <div className="relative my-6 flex items-center text-xs text-gray-400 uppercase dark:text-neutral-500">
            <div className="flex-1 border-t border-gray-200 dark:border-neutral-600"></div>
            <span className="mx-4">Or</span>
            <div className="flex-1 border-t border-gray-200 dark:border-neutral-600"></div>
          </div>
          <form>
            <div className="grid gap-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm mb-2 dark:text-white"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm mb-2 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm font-medium text-white bg-[#A38F58]  rounded-lg hover:bg-[#8c7a48]  focus:outline-none cursor-pointer"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
