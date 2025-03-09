import React, { useEffect, useState } from "react";
import { Calculator, Save, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
type CartridgeMode = "separate" | "combined";
interface CartridgeCosts {
  separate: {
    cyan: {
      price: string;
      yield: string;
    };
    magenta: {
      price: string;
      yield: string;
    };
    yellow: {
      price: string;
      yield: string;
    };
    black: {
      price: string;
      yield: string;
    };
  };
  combined: {
    color: {
      price: string;
      yield: string;
    };
    black: {
      price: string;
      yield: string;
    };
  };
}
export function CostCalculator() {
  const [mode, setMode] = useState<CartridgeMode>("separate");
  const [costs, setCosts] = useState<CartridgeCosts>({
    separate: {
      cyan: {
        price: "",
        yield: ""
      },
      magenta: {
        price: "",
        yield: ""
      },
      yellow: {
        price: "",
        yield: ""
      },
      black: {
        price: "",
        yield: ""
      }
    },
    combined: {
      color: {
        price: "",
        yield: ""
      },
      black: {
        price: "",
        yield: ""
      }
    }
  });
  const [calculating, setCalculating] = useState(false);
  const [results, setResults] = useState<any>(null);
  const handleInputChange = (cartridgeMode: CartridgeMode, cartridge: string, field: string, value: string) => {
    setCosts(prev => ({
      ...prev,
      [cartridgeMode]: {
        ...prev[cartridgeMode],
        [cartridge]: {
          ...prev[cartridgeMode][cartridge],
          [field]: value
        }
      }
    }));
  };
  const calculateCosts = () => {
    setCalculating(true);
    setTimeout(() => {
      const mockResults = {
        perPage: {
          color: 0.42,
          grayscale: 0.12
        },
        total: {
          color: 126.0,
          grayscale: 36.0
        },
        pageBreakdown: [{
          page: 1,
          color: 0.45,
          grayscale: 0.13
        }, {
          page: 2,
          color: 0.52,
          grayscale: 0.15
        }, {
          page: 3,
          color: 0.38,
          grayscale: 0.11
        }, {
          page: 4,
          color: 0.44,
          grayscale: 0.12
        }, {
          page: 5,
          color: 0.41,
          grayscale: 0.11
        }],
        potentialSavings: 90.0
      };
      setResults(mockResults);
      setCalculating(false);
    }, 1500);
  };
  const renderCartridgeInputs = () => {
    if (mode === "separate") {
      return <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["cyan", "magenta", "yellow", "black"].map(color => <div key={color} className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 capitalize">
                {color} Cartridge
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input type="number" min="0" step="0.01" value={costs.separate[color].price} onChange={e => handleInputChange("separate", color, "price", e.target.value)} className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500" placeholder="0.00" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Yield (pages)
                  </label>
                  <input type="number" min="0" value={costs.separate[color].yield} onChange={e => handleInputChange("separate", color, "yield", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500" placeholder="0" />
                </div>
              </div>
            </div>)}
        </div>;
    }
    return <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900">
            Color Cartridge (CMY)
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input type="number" min="0" step="0.01" value={costs.combined.color.price} onChange={e => handleInputChange("combined", "color", "price", e.target.value)} className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500" placeholder="0.00" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Yield (pages)
              </label>
              <input type="number" min="0" value={costs.combined.color.yield} onChange={e => handleInputChange("combined", "color", "yield", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500" placeholder="0" />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900">Black Cartridge</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input type="number" min="0" step="0.01" value={costs.combined.black.price} onChange={e => handleInputChange("combined", "black", "price", e.target.value)} className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500" placeholder="0.00" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Yield (pages)
              </label>
              <input type="number" min="0" value={costs.combined.black.yield} onChange={e => handleInputChange("combined", "black", "yield", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500" placeholder="0" />
            </div>
          </div>
        </div>
      </div>;
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Cost Calculator
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Calculate printing costs based on cartridge prices and ink coverage
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          <Save className="h-4 w-4" />
          Save Calculation
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">
                Cartridge Details
              </h2>
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === "separate" ? "bg-white text-gray-900 shadow" : "text-gray-600 hover:text-gray-900"}`} onClick={() => setMode("separate")}>
                  Separate
                </button>
                <button className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === "combined" ? "bg-white text-gray-900 shadow" : "text-gray-600 hover:text-gray-900"}`} onClick={() => setMode("combined")}>
                  Combined
                </button>
              </div>
            </div>
            {renderCartridgeInputs()}
            <div className="mt-6 flex justify-center">
              <button onClick={calculateCosts} disabled={calculating} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center">
                {calculating ? <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Calculating...
                  </> : <>
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Costs
                  </>}
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {results ? <>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                  Cost Analysis
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">
                      Color Cost per Page
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      ${results.perPage.color.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">
                      Grayscale Cost per Page
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      ${results.perPage.grayscale.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">
                    Page-by-Page Breakdown
                  </h3>
                  <div className="space-y-2">
                    {results.pageBreakdown.map(page => <div key={page.page} className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Page {page.page}</span>
                        <div className="space-x-4">
                          <span className="text-blue-600">
                            ${page.color.toFixed(2)} (Color)
                          </span>
                          <span className="text-gray-600">
                            ${page.grayscale.toFixed(2)} (Grayscale)
                          </span>
                        </div>
                      </div>)}
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        Total Cost (Color)
                      </p>
                      <p className="text-xl font-semibold text-gray-900">
                        ${results.total.color.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        Total Cost (Grayscale)
                      </p>
                      <p className="text-xl font-semibold text-gray-900">
                        ${results.total.grayscale.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                      Potential savings of $
                      {results.potentialSavings.toFixed(2)} by optimizing print
                      settings and using grayscale when possible.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                      <Check className="w-5 h-5" />
                    </div>
                    <span className="ml-2 text-gray-700">
                      Cost Calculation Complete
                    </span>
                  </div>
                  <Link to="/reports" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    <span>View Full Report</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </> : <div className="bg-white rounded-lg shadow p-6">
              <p className="text-center text-gray-500">
                Enter cartridge details and click Calculate to see cost analysis
              </p>
            </div>}
        </div>
      </div>
    </div>;
}