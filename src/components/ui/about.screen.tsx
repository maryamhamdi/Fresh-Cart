import Link from "next/link";
import { FeatureCard } from "./FeatureCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faBolt, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
export default function AboutScreen() {
  return (
    <section className="max-w-6xl mx-auto py-16 px-4 bg-[#e6e6e6]">
      <div className="bg-[#e6e6e6] rounded-3xl p-8 md:p-12 shadow-[10px_10px_20px_#c5c5c5,-10px_-10px_20px_#ffffff]">
        <div className="md:flex md:items-center md:gap-10">
          <div className="md:flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 animate-fade-up">We make shopping delightful</h1>
            <p className="text-gray-600 text-lg mb-6">FreshCart delivers quality products across groceries, fashion, and electronics — fast and reliably.</p>
            <div className="flex gap-3">
              <Link href="/shop" className="inline-block px-5 py-3 bg-[#e6e6e6] text-emerald-700 font-medium rounded-xl transition-all
                shadow-[5px_5px_10px_#c5c5c5,-5px_-5px_10px_#ffffff]
                active:shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]">Shop Now</Link>
              <Link href="/contact" className="inline-block px-5 py-3 bg-[#e6e6e6] text-gray-800 rounded-xl transition-all
                shadow-[5px_5px_10px_#c5c5c5,-5px_-5px_10px_#ffffff]
                active:shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]">Contact Us</Link>
            </div>
          </div>
          <div className="mt-6 md:mt-0 md:w-96 flex items-center justify-center">
            <div className="h-56 w-56 bg-[#e6e6e6] rounded-2xl flex items-center justify-center animate-float
              shadow-[8px_8px_16px_#c5c5c5,-8px_-8px_16px_#ffffff]">
              <div className="text-6xl text-emerald-500">🛒</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3 mt-10">
        <FeatureCard title="Fresh Products" description="Sourced from trusted suppliers and delivered quickly.">
          <FontAwesomeIcon icon={faLeaf} />
        </FeatureCard>
        <FeatureCard title="Fast Delivery" description="Same-day delivery options available in many areas.">
          <FontAwesomeIcon icon={faBolt} />
        </FeatureCard>
        <FeatureCard title="Secure Payments" description="Multiple secure payment methods supported.">
          <FontAwesomeIcon icon={faShieldHalved} />
        </FeatureCard>
      </div>
      <div className="mt-12 text-sm text-gray-700">
        <Link href="/" className="text-emerald-600 hover:underline">← Back to Home</Link>
      </div>
    </section>
  );
}