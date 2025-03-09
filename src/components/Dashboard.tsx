import React from "react";
import { FileUp, Calculator, FileText } from "lucide-react";
import { Link } from "react-router-dom";
export function Dashboard() {
  // Mock data - in a real app, this would come from the database
  const analysisStats = {
    filesAnalyzed: 12,
    pagesProcessed: 186,
    totalInkCoverage: "24.5%",
    averageCost: "$0.32 per page"
  };
  return <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-green-800">Dashboard</h1>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Files Analyzed</p>
          <p className="text-2xl font-bold text-green-700">
            {analysisStats.filesAnalyzed}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Pages Processed</p>
          <p className="text-2xl font-bold text-green-700">
            {analysisStats.pagesProcessed}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Avg. Ink Coverage</p>
          <p className="text-2xl font-bold text-green-700">
            {analysisStats.totalInkCoverage}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Avg. Cost per Page</p>
          <p className="text-2xl font-bold text-green-700">
            {analysisStats.averageCost}
          </p>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <FileUp className="h-12 w-12 text-green-600" />
            <h2 className="text-xl font-medium text-gray-900">Analyze File</h2>
            <p className="text-gray-500">
              Upload a PDF or PostScript file to analyze ink coverage
            </p>
            <Link to="/analysis" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors inline-block">
              Upload File
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Calculator className="h-12 w-12 text-green-600" />
            <h2 className="text-xl font-medium text-gray-900">
              Calculate Costs
            </h2>
            <p className="text-gray-500">
              Estimate printing costs based on ink coverage
            </p>
            <Link to="/calculator" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors inline-block">
              Calculate Costs
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <FileText className="h-12 w-12 text-green-600" />
            <h2 className="text-xl font-medium text-gray-900">View Reports</h2>
            <p className="text-gray-500">
              Access your previously generated reports
            </p>
            <Link to="/reports" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors inline-block">
              View Reports
            </Link>
          </div>
        </div>
      </div>
      {/* Recent Activity - Placeholder for future implementation */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="border-t border-gray-200 pt-4">
          <p className="text-gray-500 text-center py-4">
            No recent activity to display
          </p>
        </div>
      </div>
    </div>;
}