import Link from "next/link";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="shop-hero-bg text-neutral-600 relative mt-24">
      {/* Floating Newsletter Black Card from SHOP.CO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-1/2">
        <div className="bg-black text-white rounded-[2rem] p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <h2 className="font-integral text-2xl sm:text-4xl max-w-lg leading-tight">
            STAY UP TO DATE ABOUT OUR LATEST OFFERS
          </h2>
          <div className="w-full sm:w-auto flex flex-col gap-3 max-w-sm">
            <div className="relative">
              <Mail className="w-5 h-5 text-neutral-400 absolute left-4 top-3.5" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-white text-black pl-12 pr-4 py-3 rounded-full text-sm outline-none placeholder:text-neutral-400"
              />
            </div>
            <button
              type="button"
              className="w-full bg-white text-black font-semibold py-3 rounded-full text-sm hover:bg-neutral-200 transition-colors"
            >
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 -mt-10 sm:-mt-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-neutral-300">
          
          {/* Brand info */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="font-integral text-2xl sm:text-3xl text-black">
              SHOP.CO
            </Link>
            <p className="text-sm text-neutral-600 max-w-xs leading-relaxed">
              We have clothes that suits your style and which you’re proud to wear. From women to men.
            </p>
            <div className="flex gap-3 text-black">
              <span className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-xs font-bold bg-white">t</span>
              <span className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-xs font-bold bg-white">f</span>
              <span className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-xs font-bold bg-white">in</span>
              <span className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-xs font-bold bg-white">gh</span>
            </div>
          </div>

          {/* Links 1 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-black uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-sm text-neutral-500">
              <li><Link href="/" className="hover:text-black">About</Link></li>
              <li><Link href="/" className="hover:text-black">Features</Link></li>
              <li><Link href="/" className="hover:text-black">Works</Link></li>
              <li><Link href="/" className="hover:text-black">Career</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-black uppercase tracking-wider">Help</h4>
            <ul className="space-y-2.5 text-sm text-neutral-500">
              <li><Link href="/" className="hover:text-black">Customer Support</Link></li>
              <li><Link href="/" className="hover:text-black">Delivery Details</Link></li>
              <li><Link href="/" className="hover:text-black">Terms & Conditions</Link></li>
              <li><Link href="/" className="hover:text-black">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-black uppercase tracking-wider">FAQ</h4>
            <ul className="space-y-2.5 text-sm text-neutral-500">
              <li><Link href="/" className="hover:text-black">Account</Link></li>
              <li><Link href="/" className="hover:text-black">Manage Deliveries</Link></li>
              <li><Link href="/" className="hover:text-black">Orders</Link></li>
              <li><Link href="/" className="hover:text-black">Payments</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>Shop.co © 2000-2026, All Rights Reserved</p>
          <div className="flex gap-2">
            <span className="px-2.5 py-1 bg-white border border-neutral-200 rounded font-semibold text-[10px]">VISA</span>
            <span className="px-2.5 py-1 bg-white border border-neutral-200 rounded font-semibold text-[10px]">Mastercard</span>
            <span className="px-2.5 py-1 bg-white border border-neutral-200 rounded font-semibold text-[10px]">PayPal</span>
            <span className="px-2.5 py-1 bg-white border border-neutral-200 rounded font-semibold text-[10px]">Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
