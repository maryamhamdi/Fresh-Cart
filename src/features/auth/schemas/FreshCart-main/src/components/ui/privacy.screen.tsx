import React from "react";
import Link from "next/link";
import PolicyCard from "./PolicyCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faRotate, faShieldHalved, faHeadset, faShield, faLock, faUndo, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const ARTICLES = [
  {
    article: "ARTICLE 1",
    title: "Information We Collect",
    bullets: [
      { text: "Personal Data: Name, email address, phone number, and shipping address." },
      { text: "Payment Data: Credit card information processed securely through our payment providers." },
      { text: "Technical Data: IP address, browser type, device information, and access times." },
      { text: "Usage Data: Pages viewed, products browsed, and actions taken within our platform." },
    ],
  },
  {
    article: "ARTICLE 2",
    title: "How We Use Your Information",
    bullets: [
      { text: "To process and fulfill your orders." },
      { text: "To send order confirmations and shipping updates." },
      { text: "To provide customer support and respond to inquiries." },
      { text: "To improve our products, services, and user experience." },
      { text: "To send promotional communications (with your consent)." },
    ],
  },
  {
    article: "ARTICLE 3",
    title: "Data Protection",
    bullets: [
      { text: "We implement industry-standard encryption (SSL/TLS) for all data transfers." },
      { text: "Payment information is processed by PCI-compliant payment providers." },
      { text: "We conduct regular security audits and vulnerability assessments." },
      { text: "Access to personal data is restricted to authorized personnel only." },
    ],
  },
  {
    article: "ARTICLE 4",
    title: "Information Sharing",
    bullets: [
      { text: "We do not sell, trade, or rent your personal information to third parties." },
      { text: "We may share data with trusted service providers who assist in our operations." },
      { text: "We may disclose information when required by law or to protect our rights." },
    ],
  },
  {
    article: "ARTICLE 5",
    title: "Your Rights",
    bullets: [
      { text: "Access: Request a copy of your personal data." },
      { text: "Rectification: Request correction of inaccurate data." },
      { text: "Erasure: Request deletion of your personal data." },
      { text: "Portability: Request your data in a portable format." },
      { text: "Opt-out: Unsubscribe from marketing communications at any time." },
    ],
  },
  {
    article: "ARTICLE 6",
    title: "Cookies",
    bullets: [
      { text: "We use cookies to enhance your browsing experience and remember preferences." },
      { text: "You can control cookie settings through your browser preferences." },
      { text: "Disabling cookies may affect the functionality of certain features." },
    ],
  },
  {
    article: "ARTICLE 7",
    title: "Data Retention",
    bullets: [
      { text: "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law." },
      { text: "Account data is deleted within 30 days of account closure upon request." },
    ],
  },
  {
    article: "ARTICLE 8",
    title: "Contact Us",
    bullets: [
      { text: "For questions about this Privacy Policy or to exercise your rights, contact our Data Protection Officer at privacy@freshcart.com" },
    ],
  },
];

export default function PrivacyScreen() {
  return (
    <>
      <div className="w-full bg-gradient-to-r from-emerald-500 to-emerald-400 text-white py-8 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 bg-white/20 rounded-full flex items-center justify-center text-white">
              <FontAwesomeIcon icon={faShield} />
            </div>
            <div>
              <nav className="text-sm text-white/90 mb-1">
                <Link href="/" className="opacity-90 hover:underline">Home</Link>
                <span className="mx-2">/</span>
                <span className="font-semibold">Privacy Policy</span>
              </nav>
              <h1 className="text-3xl font-extrabold">Privacy Policy</h1>
              <p className="text-sm mt-1 opacity-90">Last updated: February 2026</p>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-6xl mx-auto py-8 px-4">
        <div className="mb-6">
          <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <div>
              <div className="font-semibold text-gray-800">Your Privacy Matters</div>
              <div className="text-sm text-gray-600">This Privacy Policy describes how FreshCart collects, uses, and protects your personal information when you use our services. We are committed to ensuring that your privacy is protected.</div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          {ARTICLES.map((a) => (
            <PolicyCard key={a.article} article={a.article} title={a.title} bullets={a.bullets} icon={<FontAwesomeIcon icon={faShieldHalved} />} />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Link href="/" className="inline-block text-sm text-gray-600 hover:underline">← Back to Home</Link>
          <Link href="/terms" className="inline-block bg-emerald-600 text-white px-5 py-2 rounded-full hover:bg-emerald-700 transition">View Terms of Service →</Link>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          <div className="bg-white rounded-2xl border p-4 text-center hover:shadow-md transition transform hover:-translate-y-1">
            <div className="text-emerald-600 text-2xl"><FontAwesomeIcon icon={faTruck} /></div>
            <div className="font-semibold mt-2">Free Shipping</div>
            <div className="text-sm text-gray-600">On orders over 500 EGP</div>
          </div>
          <div className="bg-white rounded-2xl border p-4 text-center hover:shadow-md transition transform hover:-translate-y-1">
            <div className="text-emerald-600 text-2xl"><FontAwesomeIcon icon={faUndo || faRotate} /></div>
            <div className="font-semibold mt-2">Easy Returns</div>
            <div className="text-sm text-gray-600">14-day return policy</div>
          </div>
          <div className="bg-white rounded-2xl border p-4 text-center hover:shadow-md transition transform hover:-translate-y-1">
            <div className="text-emerald-600 text-2xl"><FontAwesomeIcon icon={faLock} /></div>
            <div className="font-semibold mt-2">Secure Payment</div>
            <div className="text-sm text-gray-600">100% secure checkout</div>
          </div>
          <div className="bg-white rounded-2xl border p-4 text-center hover:shadow-md transition transform hover:-translate-y-1">
            <div className="text-emerald-600 text-2xl"><FontAwesomeIcon icon={faHeadset} /></div>
            <div className="font-semibold mt-2">24/7 Support</div>
            <div className="text-sm text-gray-600">Contact us anytime</div>
          </div>
        </div>
      </section>
    </>
  );
}

