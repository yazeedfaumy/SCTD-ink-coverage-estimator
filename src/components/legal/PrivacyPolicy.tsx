import React from "react";
export function PrivacyPolicy() {
  return <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">
              1. Information We Collect
            </h2>
            <p className="text-gray-600 mb-2">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Account information (name, email, password)</li>
              <li>File analysis data</li>
              <li>Usage statistics</li>
              <li>Cost calculations</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-3">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-600 mb-2">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Provide and improve our services</li>
              <li>Calculate ink coverage and costs</li>
              <li>Generate reports</li>
              <li>Send important notifications</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-3">3. Data Security</h2>
            <p className="text-gray-600">
              We implement appropriate security measures to protect your
              personal information. Your files are encrypted during transmission
              and storage. We regularly monitor our systems for possible
              vulnerabilities and attacks.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-3">4. Data Retention</h2>
            <p className="text-gray-600">
              We retain your information for as long as your account is active
              or as needed to provide you services. You can request deletion of
              your account and associated data at any time.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-3">5. Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please
              contact us at:
              <br />
              Email: privacy@inkcalculator.com
              <br />
              Phone: (555) 123-4567
            </p>
          </section>
          <div className="text-sm text-gray-500 mt-8">
            Last updated: January 2024
          </div>
        </div>
      </div>
    </div>;
}