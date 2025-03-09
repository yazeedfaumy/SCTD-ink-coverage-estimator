import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Dashboard } from "./Dashboard";
import { FileAnalysis } from "./FileAnalysis";
import { CostCalculator } from "./CostCalculator";
import { Reports } from "./Reports";
import { Settings } from "./Settings";
export function Layout() {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  return <div className="flex flex-col min-h-screen bg-gray-50">
      <Header onMenuClick={() => setShowMobileSidebar(!showMobileSidebar)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar collapsed={sidebarCollapsed} onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} showMobile={showMobileSidebar} onMobileClose={() => setShowMobileSidebar(false)} />
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analysis" element={<FileAnalysis />} />
              <Route path="/calculator" element={<CostCalculator />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>
      <Footer />
    </div>;
}