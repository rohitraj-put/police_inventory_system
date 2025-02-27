import React from "react";

function Header() {
  return (
    <header class=" w-full bg-white text-indigo-800 z-50 shadow-lg animate-slide-down">
      <div class="w-full mx-auto px-4 py-2 flex items-center justify-between h-16">
        <button class="mobile-menu-button p-2 lg:hidden">
          <span class="material-icons-outlined text-2xl">menu</span>
        </button>
        <div class="text-xl font-bold text-blue-900">
          Admin<span class="text-indigo-800">Panel</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="material-icons-outlined p-2 text-2xl cursor-pointer hover:text-indigo-800 transition-transform duration-300 hover:scale-110 hidden md:block">
            search
          </span>
          <span class="material-icons-outlined p-2 text-2xl cursor-pointer hover:text-indigo-800 transition-transform duration-300 hover:scale-110 hidden md:block">
            notifications
          </span>
          <img
            class="w-10 h-10 rounded-full transition-transform duration-300 hover:scale-110 object-cover"
            src="https://i.pinimg.com/564x/de/0f/3d/de0f3d06d2c6dbf29a888cf78e4c0323.jpg"
            alt="Profile"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
