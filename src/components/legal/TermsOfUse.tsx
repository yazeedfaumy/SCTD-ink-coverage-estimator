import React from "react";
export function TermsOfUse() {
  return <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Terms of Use</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600">
              By accessing and using Ink Calculator, you accept and agree to be
              bound by these Terms of Use. If you do not agree to these terms,
              please do not use our service.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-3">2. Use License</h2>
            <p className="text-gray-600 mb-2">
              We grant you a limited, non-exclusive, non-transferable license
              to:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Upload and analyze files</li>
              <li>Calculate printing costs</li>
              <li>Generate and download reports</li>
              <li>Access and use the service features</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-3">3. Restrictions</h2>
            <p className="text-gray-600 mb-2">You agree not to:</p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Share your account credentials</li>
              <li>Upload malicious files</li>
              <li>Attempt to bypass security measures</li>
              <li>Use the service for illegal purposes</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-3">
              4. Service Availability
            </h2>
            <p className="text-gray-600">
              We strive to maintain high availability of our service but do not
              guarantee uninterrupted access. We reserve the right to modify or
              discontinue the service at any time.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-3">
              5. Limitation of Liability
            </h2>
            <p className="text-gray-600">
              We are not liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from your use or
              inability to use the service.
            </p>
          </section>
          <div className="text-sm text-gray-500 mt-8">
            Last updated: January 2024
          </div>
        </div>
      </div>
    </div>;
}