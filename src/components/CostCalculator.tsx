import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

interface CostCalculatorProps {
  inkUsage: number;
  isColor: boolean;
}

export function CostCalculator({ inkUsage, isColor }: CostCalculatorProps) {
  const [cartridgePrice, setCartridgePrice] = useState('');
  const [pageYield, setPageYield] = useState('');
  const [costPerPage, setCostPerPage] = useState<number | null>(null);

  const calculateCost = () => {
    const price = parseFloat(cartridgePrice);
    const yield_ = parseFloat(pageYield);
    
    if (price && yield_) {
      const cost = (price / yield_) * (inkUsage / 100);
      setCostPerPage(cost);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold">Cost Calculator</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cartridge Price
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              value={cartridgePrice}
              onChange={(e) => setCartridgePrice(e.target.value)}
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Page Yield
          </label>
          <input
            type="number"
            value={pageYield}
            onChange={(e) => setPageYield(e.target.value)}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Number of pages per cartridge"
          />
        </div>

        <button
          onClick={calculateCost}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Calculate Cost
        </button>

        {costPerPage !== null && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">Estimated cost per page:</p>
            <p className="text-lg font-semibold">${costPerPage.toFixed(4)}</p>
          </div>
        )}
      </div>
    </div>
  );
}