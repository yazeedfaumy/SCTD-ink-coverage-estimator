import React, { useState } from "react";
import { Search, Calendar, FileText, Download, BarChart2, Filter, SlidersHorizontal, X } from "lucide-react";
interface Report {
  id: number;
  fileName: string;
  date: string;
  pages: number;
  fileSize: string;
  inkCoverage: string;
  cost: string;
  status: "complete" | "processing";
}
export function Reports() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState({
    start: "",
    end: ""
  });
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [exportFormat, setExportFormat] = useState<"pdf" | "excel" | "png">("pdf");
  const [exportOptions, setExportOptions] = useState({
    includeAnalysis: true,
    includeCosts: true,
    includeCharts: true
  });
  const reports: Report[] = [{
    id: 1,
    fileName: "Annual_Report_2023.pdf",
    date: "2024-01-15",
    pages: 12,
    fileSize: "2.4 MB",
    inkCoverage: "8.2%",
    cost: "$14.50",
    status: "complete"
  }, {
    id: 2,
    fileName: "Marketing_Brochure.pdf",
    date: "2024-01-14",
    pages: 4,
    fileSize: "1.2 MB",
    inkCoverage: "15.7%",
    cost: "$23.80",
    status: "complete"
  }, {
    id: 3,
    fileName: "Newsletter_Q4.pdf",
    date: "2024-01-13",
    pages: 6,
    fileSize: "0.8 MB",
    inkCoverage: "11.3%",
    cost: "$18.20",
    status: "complete"
  }];
  const handleExport = () => {
    console.log("Exporting report:", {
      format: exportFormat,
      options: exportOptions
    });
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and download your analysis reports
          </p>
        </div>
        <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors">
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>
      {showFilters && <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="text" placeholder="Search reports..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Start Date
                </label>
                <input type="date" value={dateRange.start} onChange={e => setDateRange({
              ...dateRange,
              start: e.target.value
            })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  End Date
                </label>
                <input type="date" value={dateRange.end} onChange={e => setDateRange({
              ...dateRange,
              end: e.target.value
            })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
            <div className="flex items-end">
              <button onClick={() => {
            setSearchQuery("");
            setDateRange({
              start: "",
              end: ""
            });
          }} className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors">
                Clear Filters
              </button>
            </div>
          </div>
        </div>}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4">
              {reports.map(report => <div key={report.id} className={`mb-2 last:mb-0 p-4 rounded-lg transition-colors cursor-pointer ${selectedReport?.id === report.id ? "bg-blue-50 border border-blue-100" : "hover:bg-gray-50"}`} onClick={() => setSelectedReport(report)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-50 p-2 rounded">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {report.fileName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {report.pages} pages • {report.inkCoverage} coverage •{" "}
                          {report.cost}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{report.date}</span>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
        <div>
          {selectedReport ? <div className="space-y-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Report Details
                </h2>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">File Name</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {selectedReport.fileName}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Date Generated</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {selectedReport.date}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">File Size</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {selectedReport.fileSize}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Pages</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {selectedReport.pages}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Ink Coverage</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {selectedReport.inkCoverage}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Total Cost</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {selectedReport.cost}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Export Options
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Format
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button className={`p-2 text-sm rounded-md border ${exportFormat === "pdf" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-300 hover:border-gray-400"}`} onClick={() => setExportFormat("pdf")}>
                        PDF
                      </button>
                      <button className={`p-2 text-sm rounded-md border ${exportFormat === "excel" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-300 hover:border-gray-400"}`} onClick={() => setExportFormat("excel")}>
                        Excel
                      </button>
                      <button className={`p-2 text-sm rounded-md border ${exportFormat === "png" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-300 hover:border-gray-400"}`} onClick={() => setExportFormat("png")}>
                        PNG
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-700">
                      Include in Report
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" checked={exportOptions.includeAnalysis} onChange={e => setExportOptions({
                      ...exportOptions,
                      includeAnalysis: e.target.checked
                    })} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <span className="ml-2 text-sm text-gray-600">
                          Ink Analysis
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" checked={exportOptions.includeCosts} onChange={e => setExportOptions({
                      ...exportOptions,
                      includeCosts: e.target.checked
                    })} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <span className="ml-2 text-sm text-gray-600">
                          Cost Calculation
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" checked={exportOptions.includeCharts} onChange={e => setExportOptions({
                      ...exportOptions,
                      includeCharts: e.target.checked
                    })} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <span className="ml-2 text-sm text-gray-600">
                          Charts & Graphs
                        </span>
                      </label>
                    </div>
                  </div>
                  <button onClick={handleExport} className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    Export Report
                  </button>
                </div>
              </div>
            </div> : <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500 text-center">
                Select a report to view details
              </p>
            </div>}
        </div>
      </div>
    </div>;
}