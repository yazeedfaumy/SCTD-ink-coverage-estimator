import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileUp, Calculator, FileText, Settings } from "lucide-react";
export function Sidebar() {
  const links = [{
    to: "/",
    icon: LayoutDashboard,
    label: "Dashboard"
  }, {
    to: "/analysis",
    icon: FileUp,
    label: "File Analysis"
  }, {
    to: "/calculator",
    icon: Calculator,
    label: "Cost Calculator"
  }, {
    to: "/reports",
    icon: FileText,
    label: "Reports"
  }, {
    to: "/settings",
    icon: Settings,
    label: "Settings"
  }];
  return <div className="w-64 bg-white border-r border-gray-200 p-4">
      <nav className="space-y-1 mt-8">
        {links.map(({
        to,
        icon: Icon,
        label
      }) => <NavLink key={to} to={to} className={({
        isActive
      }) => `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? "bg-yellow-100 text-green-700" : "text-gray-600 hover:bg-gray-50"}`}>
            <Icon className={`h-5 w-5 ${({
          isActive
        }) => isActive ? "text-green-600" : ""}`} />
            <span>{label}</span>
          </NavLink>)}
      </nav>
    </div>;
}