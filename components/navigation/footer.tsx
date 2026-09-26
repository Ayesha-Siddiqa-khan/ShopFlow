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
              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center bg-white hover:bg-black hover:text-white hover:border-black transition-all shadow-xs"
                aria-label="Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center bg-white hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all shadow-xs"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center bg-white hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F] transition-all shadow-xs"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/Ayesha-Siddiqa-khan/ShopFlow"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center bg-white hover:bg-black hover:text-white hover:border-black transition-all shadow-xs"
                aria-label="GitHub"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
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
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Visa */}
            <div className="h-8 px-3 bg-white border border-neutral-200 rounded-md flex items-center justify-center shadow-xs" title="Visa">
              <svg className="h-3 w-auto" viewBox="0 0 36 12" fill="none">
                <path d="M14.6 0.2L9.6 11.8H6.3L3.8 2.6C3.7 2 3.5 1.7 3.1 1.5C2.4 1.1 1.1 0.7 0.1 0.4L0.2 0.2H5.5C6.2 0.2 6.8 0.7 6.9 1.5L8.2 8.8L11.5 0.2H14.6ZM27.4 8.1C27.4 5.2 23.6 5 23.7 3.6C23.7 3.2 24.1 2.7 25 2.6C25.4 2.5 26.6 2.5 27.9 3.1L28.5 0.4C27.7 0.1 26.7 -0.2 25.5 -0.2C22.4 -0.2 20.2 1.5 20.2 4C20.1 5.9 21.7 6.9 22.9 7.5C24.1 8.1 24.6 8.5 24.6 9.1C24.5 9.9 23.6 10.3 22.7 10.3C21.1 10.4 20.1 9.9 19.4 9.5L18.8 12.3C19.6 12.7 21 13 22.4 13C25.7 13 27.8 11.3 27.4 8.1ZM35.5 11.8H38.4L35.9 0.2H33.2C32.6 0.2 32.1 0.6 31.9 1.1L27.3 11.8H30.8L31.5 9.7H35.8L36.2 11.8H35.5ZM32.5 7L33.9 2.7L34.7 7H32.5ZM19.6 0.2L17 11.8H13.8L16.4 0.2H19.6Z" fill="#1434CB"/>
              </svg>
            </div>

            {/* Mastercard */}
            <div className="h-8 px-2.5 bg-white border border-neutral-200 rounded-md flex items-center justify-center shadow-xs" title="Mastercard">
              <svg className="h-5 w-auto" viewBox="0 0 32 20" fill="none">
                <circle cx="10" cy="10" r="9" fill="#EB001B"/>
                <circle cx="22" cy="10" r="9" fill="#F79E1B"/>
                <path d="M16 3.6A8.99 8.99 0 0013 10c0 2.58 1.1 4.9 2.85 6.4A8.99 8.99 0 0019 10c0-2.58-1.1-4.9-2.85-6.4z" fill="#FF5F00"/>
              </svg>
            </div>

            {/* PayPal */}
            <div className="h-8 px-3 bg-white border border-neutral-200 rounded-md flex items-center justify-center shadow-xs" title="PayPal">
              <svg className="h-4 w-auto" viewBox="0 0 28 20" fill="none">
                <path d="M9.8 18.5H6.2C5.9 18.5 5.7 18.3 5.6 18L3 2.5C2.9 2.2 3.1 1.9 3.4 1.9H11.5C14.8 1.9 17.1 2.6 18 4.2C18.6 5.1 18.7 6.3 18.2 7.7C17.6 9.7 16.1 11.2 14.2 11.8C13.6 12 12.8 12.1 11.9 12.1H9.9L8.6 18.2C8.6 18.4 8.8 18.5 9 18.5H9.8Z" fill="#003087"/>
                <path d="M12.3 6.8H8.8C8.6 6.8 8.4 7 8.3 7.2L6.6 18C6.5 18.2 6.7 18.4 6.9 18.4H10.1C10.3 18.4 10.5 18.2 10.6 18L11.5 12.8C11.5 12.6 11.7 12.4 12 12.4H13.6C16.5 12.4 18.8 11.2 19.4 7.7C19.7 6 19.3 4.6 18.3 3.6C17.7 5.2 15.6 6.8 12.3 6.8Z" fill="#0079C1"/>
              </svg>
            </div>

            {/* Apple Pay */}
            <div className="h-8 px-2.5 bg-white border border-neutral-200 rounded-md flex items-center justify-center shadow-xs" title="Apple Pay">
              <svg className="h-3.5 w-auto" viewBox="0 0 36 15" fill="black">
                <path d="M4.6 0.1C4.3 0.6 3.9 1.1 3.4 1.4C2.9 1.8 2.3 2 1.8 2C1.7 1.4 1.9 0.8 2.3 0.4C2.7 0.1 3.4 -0.1 4.6 0.1ZM4.7 2.2C4.1 2.2 3.6 2.5 3.3 2.5C3 2.5 2.5 2.2 2 2.2C1.1 2.2 0.3 2.8 0 3.8C-0.3 5.4 0.6 7.9 1.7 9.8C2.1 10.4 2.5 11 3.1 11C3.6 11 3.8 10.7 4.5 10.7C5.1 10.7 5.3 11 5.9 11C6.5 11 7 10.4 7.4 9.8C7.9 9 8.2 8.3 8.3 8C7.4 7.6 6.8 6.6 6.8 5.6C6.8 4.3 7.8 3.4 8.8 3.1C8.2 2.4 7.3 2.2 6.6 2.2C5.9 2.2 5.3 2.5 4.7 2.2Z"/>
                <path d="M12.5 2.3H10V11H11.5V7.9H12.5C14.4 7.9 15.7 6.8 15.7 5.1C15.7 3.4 14.4 2.3 12.5 2.3ZM12.4 6.6H11.5V3.6H12.4C13.5 3.6 14.1 4.2 14.1 5.1C14.1 6 13.5 6.6 12.4 6.6ZM19.7 11V5.7H18.3V6.7C18 6 17.2 5.5 16.3 5.5C15 5.5 14 6.6 14 8.3C14 10 15 11.1 16.3 11.1C17.2 11.1 18 10.6 18.3 9.9V11H19.7ZM16.8 9.9C15.9 9.9 15.4 9.2 15.4 8.3C15.4 7.4 15.9 6.7 16.8 6.7C17.7 6.7 18.3 7.4 18.3 8.3C18.3 9.2 17.7 9.9 16.8 9.9ZM21 13.5C22.6 13.5 23.4 12.8 23.9 11.3L26.5 5.7H25L23.3 9.9L21.6 5.7H20L22.2 10.8L21.7 12.2C21.4 12.5 21.1 12.6 20.8 12.6C20.6 12.6 20.3 12.6 20.1 12.5L20 13.4C20.3 13.5 20.6 13.5 21 13.5Z"/>
              </svg>
            </div>

            {/* Google Pay */}
            <div className="h-8 px-2.5 bg-white border border-neutral-200 rounded-md flex items-center justify-center shadow-xs" title="Google Pay">
              <svg className="h-3.5 w-auto" viewBox="0 0 38 16" fill="none">
                <path d="M7.7 8.1V6.3H4V9.8H6.2C5.9 10.9 4.9 11.6 3.8 11.4C2.5 11.2 1.6 10 1.6 8.7C1.6 7.4 2.5 6.2 3.8 6C4.4 5.9 5.1 6.1 5.6 6.5L6.9 5.2C6 4.4 4.8 4 3.6 4.1C1.6 4.3 0 6 0 8C0 10.2 1.8 12 4 12C6.1 12 7.7 10.4 7.7 8.1Z" fill="#4285F4"/>
                <path d="M12.8 5.5H10.5V12H11.8V9.8H12.8C14.3 9.8 15.5 8.9 15.5 7.6C15.5 6.3 14.3 5.5 12.8 5.5ZM12.7 8.6H11.8V6.6H12.7C13.6 6.6 14.2 7 14.2 7.6C14.2 8.2 13.6 8.6 12.7 8.6ZM19.2 12V7.7H18V8.5C17.7 7.9 17 7.5 16.3 7.5C15.1 7.5 14.2 8.5 14.2 9.8C14.2 11.1 15.1 12.1 16.3 12.1C17 12.1 17.7 11.7 18 11.1V12H19.2ZM16.7 11.1C15.9 11.1 15.4 10.5 15.4 9.8C15.4 9.1 15.9 8.5 16.7 8.5C17.5 8.5 18 9.1 18 9.8C18 10.5 17.5 11.1 16.7 11.1ZM20.7 14.1C22 14.1 22.8 13.5 23.3 12.3L25.5 7.7H24.1L22.7 11.1L21.3 7.7H19.9L21.8 11.9L21.4 13C21.1 13.3 20.8 13.4 20.6 13.4C20.4 13.4 20.2 13.4 20 13.3L19.9 14C20.1 14.1 20.4 14.1 20.7 14.1Z" fill="#5F6368"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
