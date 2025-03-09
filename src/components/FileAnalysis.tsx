import React, { useState } from "react";
import { Upload, File, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
export function FileAnalysis() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("color");
  const [activePage, setActivePage] = useState("all");
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };
  const handleFileSelect = (selectedFile: File) => {
    const validTypes = ["application/pdf", "application/postscript"];
    if (!validTypes.includes(selectedFile.type)) {
      alert("Please upload a PDF or PostScript file");
      return;
    }
    setFile(selectedFile);
  };
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };
  const startAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const mockResults = {
        fileName: file?.name,
        fileSize: `${(file?.size || 0 / (1024 * 1024)).toFixed(2)} MB`,
        pageCount: 5,
        contentTypes: ["Text", "Vector Graphics", "Images"],
        pages: {
          all: {
            color: {
              cyan: 15,
              magenta: 22,
              yellow: 18,
              key: 35,
              total: 90
            },
            greyscale: {
              key: 42,
              total: 42
            }
          },
          1: {
            color: {
              cyan: 12,
              magenta: 18,
              yellow: 14,
              key: 30,
              total: 74
            },
            greyscale: {
              key: 38,
              total: 38
            }
          },
          2: {
            color: {
              cyan: 18,
              magenta: 25,
              yellow: 20,
              key: 40,
              total: 103
            },
            greyscale: {
              key: 45,
              total: 45
            }
          },
          3: {
            color: {
              cyan: 14,
              magenta: 22,
              yellow: 16,
              key: 32,
              total: 84
            },
            greyscale: {
              key: 40,
              total: 40
            }
          },
          4: {
            color: {
              cyan: 16,
              magenta: 24,
              yellow: 19,
              key: 38,
              total: 97
            },
            greyscale: {
              key: 44,
              total: 44
            }
          },
          5: {
            color: {
              cyan: 15,
              magenta: 21,
              yellow: 17,
              key: 34,
              total: 87
            },
            greyscale: {
              key: 43,
              total: 43
            }
          }
        }
      };
      setAnalysisResults(mockResults);
      setAnalysisComplete(true);
      setIsAnalyzing(false);
    }, 3000);
  };
  const renderUploadSection = () => <div className={`border-2 border-dashed rounded-lg p-10 text-center ${isDragging ? "border-green-500 bg-green-50" : "border-gray-300"}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      <div className="flex flex-col items-center justify-center space-y-4">
        <Upload className="h-12 w-12 text-green-600" />
        <h2 className="text-xl font-medium text-gray-900">
          Upload a File for Analysis
        </h2>
        <p className="text-gray-500 max-w-md">
          Drag and drop your PDF or PostScript file here, or click to browse
          your files
        </p>
        <input type="file" id="fileInput" className="hidden" accept=".pdf,.ps" onChange={handleFileInputChange} />
        <label htmlFor="fileInput" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors cursor-pointer">
          Browse Files
        </label>
      </div>
    </div>;
  const renderFilePreview = () => <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-4">
        <File className="h-12 w-12 text-green-600" />
        <div>
          <h3 className="text-lg font-medium text-gray-900">{file?.name}</h3>
          <p className="text-sm text-gray-500">
            {file && `${(file.size / (1024 * 1024)).toFixed(2)} MB`}
          </p>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <button onClick={startAnalysis} disabled={isAnalyzing} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-green-300 flex items-center">
          {isAnalyzing ? <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </> : "Start Analysis"}
        </button>
      </div>
    </div>;
  const renderAnalysisResults = () => {
    const currentData = analysisResults.pages[activePage][activeTab];
    return <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Document Information
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">File Name</p>
              <p className="font-medium">{analysisResults.fileName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">File Size</p>
              <p className="font-medium">{analysisResults.fileSize}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Page Count</p>
              <p className="font-medium">{analysisResults.pageCount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Content Types</p>
              <p className="font-medium">
                {analysisResults.contentTypes.join(", ")}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button className={`px-4 py-2 text-sm font-medium ${activeTab === "color" ? "border-b-2 border-green-500 text-green-600" : "text-gray-500 hover:text-gray-700"}`} onClick={() => setActiveTab("color")}>
                Color (CMYK)
              </button>
              <button className={`px-4 py-2 text-sm font-medium ${activeTab === "greyscale" ? "border-b-2 border-green-500 text-green-600" : "text-gray-500 hover:text-gray-700"}`} onClick={() => setActiveTab("greyscale")}>
                Greyscale
              </button>
              <button className={`px-4 py-2 text-sm font-medium ${activeTab === "cyan" ? "border-b-2 border-green-500 text-green-600" : "text-gray-500 hover:text-gray-700"}`} onClick={() => setActiveTab("cyan")}>
                Cyan
              </button>
              <button className={`px-4 py-2 text-sm font-medium ${activeTab === "magenta" ? "border-b-2 border-green-500 text-green-600" : "text-gray-500 hover:text-gray-700"}`} onClick={() => setActiveTab("magenta")}>
                Magenta
              </button>
              <button className={`px-4 py-2 text-sm font-medium ${activeTab === "yellow" ? "border-b-2 border-green-500 text-green-600" : "text-gray-500 hover:text-gray-700"}`} onClick={() => setActiveTab("yellow")}>
                Yellow
              </button>
              <button className={`px-4 py-2 text-sm font-medium ${activeTab === "key" ? "border-b-2 border-green-500 text-green-600" : "text-gray-500 hover:text-gray-700"}`} onClick={() => setActiveTab("key")}>
                Key (Black)
              </button>
            </nav>
          </div>
          <div className="p-6 h-64 flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">
              Document preview in {activeTab} mode
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <button className={`px-3 py-1 rounded ${activePage === "all" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"}`} onClick={() => setActivePage("all")}>
              All Pages
            </button>
            {[...Array(analysisResults.pageCount)].map((_, i) => <button key={i + 1} className={`px-3 py-1 rounded ${activePage === String(i + 1) ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"}`} onClick={() => setActivePage(String(i + 1))}>
                Page {i + 1}
              </button>)}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Ink Coverage -{" "}
                {activeTab === "greyscale" ? "Greyscale" : "Color"} -{" "}
                {activePage === "all" ? "All Pages" : `Page ${activePage}`}
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Color Channel
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Coverage (%)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activeTab === "color" ? <>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Cyan
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {currentData.cyan}%
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Magenta
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {currentData.magenta}%
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Yellow
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {currentData.yellow}%
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Key (Black)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {currentData.key}%
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Total
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          {currentData.total}%
                        </td>
                      </tr>
                    </> : <>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Key (Black)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {currentData.key}%
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Total
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          {currentData.total}%
                        </td>
                      </tr>
                    </>}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Ink Coverage Chart
            </h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
              <p className="text-gray-500">
                Bar chart visualization of ink coverage
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                <Check className="w-5 h-5" />
              </div>
              <span className="ml-2 text-gray-700">File Upload</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-200"></div>
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                <Check className="w-5 h-5" />
              </div>
              <span className="ml-2 text-gray-700">File Analysis</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-200"></div>
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-400">
                <span className="text-sm font-medium">3</span>
              </div>
              <span className="ml-2 text-gray-700">Calculate Price</span>
            </div>
          </div>
          <div className="mt-6 flex justify-center space-x-4">
            <Link to="/calculator" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center">
              <span>Go to Cost Calculator</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link to="/reports" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              Skip to Reports
            </Link>
          </div>
        </div>
      </div>;
  };
  return <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-green-800">File Analysis</h1>
      {!file && renderUploadSection()}
      {file && !analysisComplete && renderFilePreview()}
      {file && analysisComplete && renderAnalysisResults()}
    </div>;
}