import Link from "next/link";
import { NewsletterCard } from "@/components/navigation/newsletter-card";

export function Footer() {
  return (
    <footer className="shop-hero-bg text-neutral-600 relative mt-24">
      {/* Floating Newsletter Black Card from SHOP.CO */}
      <NewsletterCard />

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
            <div className="flex items-center gap-3">
              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-[#1DA1F2] text-white shadow-xs hover:bg-[#0c85d0] hover:scale-110 hover:shadow-md transition-all duration-200"
                aria-label="Twitter"
                title="Twitter / X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-[#1877F2] text-white shadow-xs hover:bg-[#166fe5] hover:scale-110 hover:shadow-md transition-all duration-200"
                aria-label="Facebook"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-xs hover:scale-110 hover:shadow-md transition-all duration-200"
                style={{
                  background:
                    "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                }}
                aria-label="Instagram"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/Ayesha-Siddiqa-khan/ShopFlow"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-[#24292F] text-white shadow-xs hover:bg-[#181717] hover:scale-110 hover:shadow-md transition-all duration-200"
                aria-label="GitHub"
                title="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links 1 */}
          {/* Links 1 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-black uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-sm text-neutral-500">
              <li><Link href="/products" className="hover:text-black transition-colors">About</Link></li>
              <li><Link href="/products?category=casual" className="hover:text-black transition-colors">Features</Link></li>
              <li><Link href="/products?category=formal" className="hover:text-black transition-colors">Works</Link></li>
              <li><Link href="/products" className="hover:text-black transition-colors">Career</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-black uppercase tracking-wider">Help</h4>
            <ul className="space-y-2.5 text-sm text-neutral-500">
              <li><Link href="/account" className="hover:text-black transition-colors">Customer Support</Link></li>
              <li><Link href="/cart" className="hover:text-black transition-colors">Delivery Details</Link></li>
              <li><Link href="/products" className="hover:text-black transition-colors">Terms &amp; Conditions</Link></li>
              <li><Link href="/products" className="hover:text-black transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-black uppercase tracking-wider">FAQ</h4>
            <ul className="space-y-2.5 text-sm text-neutral-500">
              <li><Link href="/account" className="hover:text-black transition-colors">Account</Link></li>
              <li><Link href="/cart" className="hover:text-black transition-colors">Manage Deliveries</Link></li>
              <li><Link href="/account" className="hover:text-black transition-colors">Orders</Link></li>
              <li><Link href="/checkout" className="hover:text-black transition-colors">Payments</Link></li>
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

            {/* JazzCash */}
            <div className="h-8 px-3 bg-[#EC1C24] text-white rounded-md flex items-center justify-center shadow-xs font-bold text-xs tracking-wider" title="JazzCash">
              Jazz<span className="text-[#FFC20E]">Cash</span>
            </div>

            {/* EasyPaisa */}
            <div className="h-8 px-3 bg-[#00A551] text-white rounded-md flex items-center justify-center shadow-xs font-bold text-xs tracking-tight" title="EasyPaisa">
              easypaisa
            </div>

            {/* PayPal */}
            <div className="h-8 px-3 bg-white border border-neutral-200 rounded-md flex items-center justify-center shadow-xs" title="PayPal">
              <svg className="h-4 w-auto" viewBox="0 0 28 20" fill="none">
                <path d="M9.8 18.5H6.2C5.9 18.5 5.7 18.3 5.6 18L3 2.5C2.9 2.2 3.1 1.9 3.4 1.9H11.5C14.8 1.9 17.1 2.6 18 4.2C18.6 5.1 18.7 6.3 18.2 7.7C17.6 9.7 16.1 11.2 14.2 11.8C13.6 12 12.8 12.1 11.9 12.1H9.9L8.6 18.2C8.6 18.4 8.8 18.5 9 18.5H9.8Z" fill="#003087"/>
                <path d="M12.3 6.8H8.8C8.6 6.8 8.4 7 8.3 7.2L6.6 18C6.5 18.2 6.7 18.4 6.9 18.4H10.1C10.3 18.4 10.5 18.2 10.6 18L11.5 12.8C11.5 12.6 11.7 12.4 12 12.4H13.6C16.5 12.4 18.8 11.2 19.4 7.7C19.7 6 19.3 4.6 18.3 3.6C17.7 5.2 15.6 6.8 12.3 6.8Z" fill="#0079C1"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
