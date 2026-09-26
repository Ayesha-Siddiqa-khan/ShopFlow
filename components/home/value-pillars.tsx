import { Truck, ShieldCheck, RefreshCw, Lock } from "lucide-react";

const PILLARS = [
  {
    icon: Truck,
    title: "Express Global Shipping",
    desc: "Fast tracked courier delivery straight to your door",
  },
  {
    icon: ShieldCheck,
    title: "100% Certified Authentic",
    desc: "Meticulously vetted luxury fabrics & designer tags",
  },
  {
    icon: RefreshCw,
    title: "30-Day Free Returns",
    desc: "Frictionless exchanges and hassle-free returns",
  },
  {
    icon: Lock,
    title: "PCI-DSS Secure Checkout",
    desc: "256-bit encrypted transactions with Apple & Google Pay",
  },
];

export function ValuePillars() {
  return (
    <section className="border-b border-neutral-100 bg-[#FAF9F8] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-xl hover:border-black/30 hover:-translate-y-1.5 transition-all duration-300 cursor-default"
              >
                <div className="p-3 rounded-xl bg-black text-white shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm group-hover:shadow-md">
                  <Icon className="w-5 h-5 transition-transform duration-200" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-black group-hover:text-black transition-colors">{pillar.title}</h4>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
