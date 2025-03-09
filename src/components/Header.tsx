import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Droplets, Bell, User, LogOut, Settings } from "lucide-react";
export function Header() {
  const [notifications] = useState(3);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationMenuRef = useRef<HTMLDivElement>(null);
  const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = userInfo.name || "User";
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (notificationMenuRef.current && !notificationMenuRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-green-600 p-1 rounded-md">
                <Droplets className="h-7 w-7 text-yellow-400" />
              </div>
              <span className="ml-2 text-xl font-semibold text-green-800">
                Ink Calculator
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <div className="relative" ref={notificationMenuRef}>
              <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none relative" onClick={() => setShowNotifications(!showNotifications)}>
                <Bell className="h-5 w-5 text-green-600" />
                {notifications > 0 && <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </div>}
              </button>
              {showNotifications && <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                  <div className="py-1">
                    <div className="px-3 py-2 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center">
                        <div className="mr-3 bg-green-100 p-2 rounded-full">
                          <User className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            New analysis completed
                          </div>
                          <div className="text-xs text-gray-500">
                            5 minutes ago
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-3 py-2 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center">
                        <div className="mr-3 bg-yellow-100 p-2 rounded-full">
                          <User className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            Cost calculation ready
                          </div>
                          <div className="text-xs text-gray-500">
                            2 hours ago
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}
            </div>
            <div className="relative" ref={userMenuRef}>
              <button className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 focus:outline-none" onClick={() => setShowUserMenu(!showUserMenu)}>
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-green-600" />
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {userName}
                </span>
              </button>
              {showUserMenu && <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                  <div className="py-1">
                    <Link to="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                    <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </header>;
}