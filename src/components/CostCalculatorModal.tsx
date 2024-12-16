import React, { useState } from 'react';
import { Calculator, X } from 'lucide-react';

interface CartridgeCosts {
  cyan?: { price: string; yield: string };
  magenta?: { price: string; yield: string };
  yellow?: { price: string; yield: string };
  black: { price: string; yield: string };
}

interface CostResult {
  perPage?: number;
  total?: number;
  perColorPercent?: {
    cyan?: number;
    magenta?: number;
    yellow?: number;
    black: number;
  };
}

interface CostCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  inkUsage: number | { cyan?: number; magenta?: number; yellow?: number; black: number };
  isColor: boolean;
  isOverall?: boolean;
  pages?: Array<{ inkUsage: number }>;
}

export function CostCalculatorModal({
  isOpen,
  onClose,
  inkUsage,
  isColor,
  isOverall = false,
  pages = []
}: CostCalculatorModalProps) {
  const [cartridgeCosts, setCartridgeCosts] = useState<CartridgeCosts>({
    cyan: { price: '', yield: '' },
    magenta: { price: '', yield: '' },
    yellow: { price: '', yield: '' },
    black: { price: '', yield: '' }
  });
  const [costResult, setCostResult] = useState<CostResult | null>(null);

  const calculateCost = () => {
    if (isColor && typeof inkUsage === 'object') {
      // Calculate cost per 1% for each color
      const perColorPercent: Record<string, number> = {};
      
      Object.entries(cartridgeCosts).forEach(([color, data]) => {
        const price = parseFloat(data.price);
        const yield_ = parseFloat(data.yield);
        
        if (price && yield_ && inkUsage[color as keyof typeof inkUsage] !== undefined) {
          // Cost for 1% of ink = (cartridge price / page yield) / 100
          perColorPercent[color] = (price / yield_) / 100;
        }
      });

      if (isOverall && pages.length > 0) {
        const totalCost = pages.reduce((acc, page) => {
          return acc + Object.entries(perColorPercent).reduce((sum, [color, costPerPercent]) => {
            return sum + costPerPercent * (inkUsage[color as keyof typeof inkUsage] || 0);
          }, 0);
        }, 0);
        const avgPerPage = totalCost / pages.length;
        setCostResult({ perPage: avgPerPage, total: totalCost, perColorPercent });
      } else {
        const pageTotal = Object.entries(perColorPercent).reduce((sum, [color, costPerPercent]) => {
          return sum + costPerPercent * (inkUsage[color as keyof typeof inkUsage] || 0);
        }, 0);
        setCostResult({ perPage: pageTotal, perColorPercent });
      }
    } else {
      // Grayscale calculation
      const price = parseFloat(cartridgeCosts.black.price);
      const yield_ = parseFloat(cartridgeCosts.black.yield);
      
      if (price && yield_) {
        const costPerPercent = (price / yield_) / 100;
        if (isOverall && pages.length > 0) {
          const totalCost = pages.reduce((acc, page) => {
            return acc + costPerPercent * page.inkUsage;
          }, 0);
          const avgPerPage = totalCost / pages.length;
          setCostResult({ 
            perPage: avgPerPage, 
            total: totalCost,
            perColorPercent: { black: costPerPercent }
          });
        } else {
          const pageTotal = costPerPercent * (typeof inkUsage === 'number' ? inkUsage : inkUsage.black);
          setCostResult({ 
            perPage: pageTotal,
            perColorPercent: { black: costPerPercent }
          });
        }
      }
    }
  };

  const updateCartridgeCost = (
    color: keyof CartridgeCosts,
    field: 'price' | 'yield',
    value: string
  ) => {
    setCartridgeCosts(prev => ({
      ...prev,
      [color]: { ...prev[color], [field]: value }
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-xl w-full m-4 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <Calculator className="w-6 h-6 text-blue-500" />
          <h3 className="text-xl font-semibold">
            {isOverall ? 'Overall Cost Calculator' : 'Page Cost Calculator'}
          </h3>
        </div>

        <div className="space-y-6">
          {isColor ? (
            <>
              {['cyan', 'magenta', 'yellow', 'black'].map((color) => (
                <div key={color} className="space-y-4">
                  <h4 className="font-medium capitalize text-gray-700">{color} Cartridge</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          value={cartridgeCosts[color as keyof CartridgeCosts]?.price}
                          onChange={(e) => updateCartridgeCost(color as keyof CartridgeCosts, 'price', e.target.value)}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Page Yield</label>
                      <input
                        type="number"
                        value={cartridgeCosts[color as keyof CartridgeCosts]?.yield}
                        onChange={(e) => updateCartridgeCost(color as keyof CartridgeCosts, 'yield', e.target.value)}
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Pages per cartridge"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Black Cartridge</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      value={cartridgeCosts.black.price}
                      onChange={(e) => updateCartridgeCost('black', 'price', e.target.value)}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Page Yield</label>
                  <input
                    type="number"
                    value={cartridgeCosts.black.yield}
                    onChange={(e) => updateCartridgeCost('black', 'yield', e.target.value)}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Pages per cartridge"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            onClick={calculateCost}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Calculate Cost
          </button>

          {costResult && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md space-y-3">
              {costResult.perColorPercent && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Cost per 1% of ink:</h4>
                  {Object.entries(costResult.perColorPercent).map(([color, cost]) => (
                    <p key={color} className="text-sm text-gray-600">
                      {color.charAt(0).toUpperCase() + color.slice(1)}:
                      <span className="ml-2 font-semibold">
                        ${cost.toFixed(4)}
                      </span>
                    </p>
                  ))}
                </div>
              )}
              <div className="pt-2 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Cost per page:
                  <span className="ml-2 font-semibold">
                    ${costResult.perPage?.toFixed(4)}
                  </span>
                </p>
                {costResult.total && (
                  <p className="text-sm text-gray-600">
                    Total document cost:
                    <span className="ml-2 font-semibold">
                      ${costResult.total.toFixed(2)}
                    </span>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}