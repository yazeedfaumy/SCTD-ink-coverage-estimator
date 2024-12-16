import React from 'react';
import { FileText } from 'lucide-react';

interface InkUsageTableProps {
  pages: Array<{
    pageNumber: number;
    inkUsage: {
      cyan?: number;
      magenta?: number;
      yellow?: number;
      black: number;
    };
  }>;
  isColor: boolean;
  onPageSelect: (pageNumber: number) => void;
}

export function InkUsageTable({ pages, isColor, onPageSelect }: InkUsageTableProps) {
  return (
    <div className="w-full max-w-4xl overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Page
            </th>
            {isColor ? (
              <>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cyan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Magenta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Yellow
                </th>
              </>
            ) : null}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Black
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pages.map((page) => (
            <tr key={page.pageNumber}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {page.pageNumber}
              </td>
              {isColor ? (
                <>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {page.inkUsage.cyan?.toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {page.inkUsage.magenta?.toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {page.inkUsage.yellow?.toFixed(2)}%
                  </td>
                </>
              ) : null}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {page.inkUsage.black.toFixed(2)}%
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onPageSelect(page.pageNumber)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  Calculate Cost
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}