import React from "react";
import Link from "next/link";
import PolicyCard from "./PolicyCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faFileLines,
  faExclamationTriangle,
  faCheck,
  faUndo,
  faLock,
  faHeadphones,
} from "@fortawesome/free-solid-svg-icons";

const ARTICLES = [
  {
    article: "ARTICLE 1",
    title: "Acceptance of Terms",
    bullets: [
      { text: "By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms." },
      { text: "If you do not agree to these Terms, you must not access or use the Service." },
      { text: "We reserve the right to modify these Terms at any time, and such modifications shall be effective immediately upon posting." },
    ],
  },
  {
    article: "ARTICLE 2",
    title: "User Eligibility",
    bullets: [
      { text: "The Service is intended for users who are at least eighteen (18) years of age." },
      { text: "By using the Service, you represent and warrant that you are of legal age to form a binding contract." },
      { text: "If you are accessing the Service on behalf of a legal entity, you represent that you have the authority to bind such entity." },
    ],
  },
  {
    article: "ARTICLE 3",
    title: "Account Registration",
    bullets: [
      { text: "You may be required to create an account to access certain features of the Service." },
      { text: "You agree to provide accurate, current, and complete information during registration." },
      { text: "You are solely responsible for maintaining the confidentiality of your account credentials." },
      { text: "You agree to notify us immediately of any unauthorized use of your account." },
    ],
  },
  {
    article: "ARTICLE 4",
    title: "Orders and Payments",
    bullets: [
      { text: "All orders placed through the Service are subject to acceptance and availability." },
      { text: "Prices are subject to change without notice prior to order confirmation." },
      { text: "Payment must be made in full at the time of purchase through approved payment methods." },
      { text: "We reserve the right to refuse or cancel any order at our sole discretion." },
    ],
  },
  {
    article: "ARTICLE 5",
    title: "Shipping and Delivery",
    bullets: [
      { text: "Shipping times are estimates only and are not guaranteed." },
      { text: "Risk of loss and title for items purchased pass to you upon delivery to the carrier." },
      { text: "We are not responsible for delays caused by carriers, customs, or other factors beyond our control." },
    ],
  },
  {
    article: "ARTICLE 6",
    title: "Returns and Refunds",
    bullets: [
      { text: "Our return policy allows returns within 14 days of delivery for most items." },
      { text: "Products must be unused and in original packaging." },
      { text: "Refunds will be processed within 5-7 business days after receiving the returned item." },
    ],
  },
  {
    article: "ARTICLE 7",
    title: "Limitation of Liability",
    bullets: [
      { text: "To the maximum extent permitted by applicable law, FreshCart shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues." },
    ],
  },
  {
    article: "ARTICLE 8",
    title: "Contact Us",
    bullets: [
      { text: "If you have any questions about these Terms, please contact us at support@freshcart.com" },
    ],
  },
];

export default function TermsScreen() {
  return <>
      <div className="w-full bg-[#e6e6e6] py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-[#e6e6e6] flex items-center justify-center text-emerald-600
              shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]">
              <FontAwesomeIcon icon={faFileLines} />
            </div>
            <div>
              <nav className="text-sm text-gray-500 mb-1">
                <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
                <span className="mx-2 text-gray-400">/</span>
                <span className="font-semibold text-gray-700">Terms of Service</span>
              </nav>
              <h1 className="text-3xl font-extrabold text-gray-800">Terms of Service</h1>
              <p className="text-sm mt-1 text-gray-500">Last updated: February 2026</p>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-6xl mx-auto py-8 px-4 bg-[#e6e6e6]">

      <div className="mb-6">
        <div className="bg-[#e6e6e6] rounded-xl sm:rounded-2xl p-4 flex items-start gap-4
          shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff]">
          <div className="h-10 w-10 rounded-lg bg-[#e6e6e6] flex items-center justify-center text-amber-600 shrink-0
            shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff]">
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </div>
          <div>
            <div className="font-semibold text-gray-800">Important Notice</div>
            <div className="text-sm text-gray-600">By accessing and using FreshCart, you accept and agree to be bound by the terms and provisions of this agreement. Please read these terms carefully before using our services.</div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
        {ARTICLES.map((a) => (
          <PolicyCard
            key={a.article}
            article={a.article}
            title={a.title}
            bullets={a.bullets}
            icon={<FontAwesomeIcon icon={faCheck} className="text-emerald-600" />}
          />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Link href="/" className="inline-block text-sm text-gray-600 hover:text-emerald-600 transition-colors">← Back to Home</Link>
        <Link href="/privacy-policy" className="inline-block bg-[#e6e6e6] text-emerald-700 font-semibold px-5 py-2 rounded-full transition-all
          shadow-[5px_5px_10px_#c5c5c5,-5px_-5px_10px_#ffffff]
          active:shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]">View Privacy Policy →</Link>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        <div className="col-span-1 sm:col-span-1 lg:col-span-1">
          <div className="bg-[#e6e6e6] rounded-2xl p-4 text-center shadow-[6px_6px_14px_#c5c5c5,-6px_-6px_14px_#ffffff]">
            <div className="text-emerald-600 text-2xl"><FontAwesomeIcon icon={faTruck} /></div>
            <div className="font-semibold mt-2 text-gray-800">Free Shipping</div>
            <div className="text-sm text-gray-600">On orders over 500 EGP</div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="bg-[#e6e6e6] rounded-2xl p-4 text-center shadow-[6px_6px_14px_#c5c5c5,-6px_-6px_14px_#ffffff]">
            <div className="text-emerald-600 text-2xl"><FontAwesomeIcon icon={faUndo} /></div>
            <div className="font-semibold mt-2 text-gray-800">Easy Returns</div>
            <div className="text-sm text-gray-600">14-day return policy</div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="bg-[#e6e6e6] rounded-2xl p-4 text-center shadow-[6px_6px_14px_#c5c5c5,-6px_-6px_14px_#ffffff]">
            <div className="text-emerald-600 text-2xl"><FontAwesomeIcon icon={faLock} /></div>
            <div className="font-semibold mt-2 text-gray-800">Secure Payment</div>
            <div className="text-sm text-gray-600">100% secure checkout</div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="bg-[#e6e6e6] rounded-2xl p-4 text-center shadow-[6px_6px_14px_#c5c5c5,-6px_-6px_14px_#ffffff]">
            <div className="text-emerald-600 text-2xl"><FontAwesomeIcon icon={faHeadphones} /></div>
            <div className="font-semibold mt-2 text-gray-800">24/7 Support</div>
            <div className="text-sm text-gray-600">Contact us anytime</div>
          </div>
        </div>
      </div>
      </section>
    </>
}