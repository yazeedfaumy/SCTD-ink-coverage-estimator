import React from "react";
import { Link } from "react-router-dom";
export function Footer() {
  return <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Ink Calculator. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-green-600 hover:text-green-700 text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms-of-use" className="text-green-600 hover:text-green-700 text-sm">
              Terms of Use
            </Link>
            <Link to="/contact-us" className="text-green-600 hover:text-green-700 text-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>;
}