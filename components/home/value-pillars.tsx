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
                className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-neutral-200/70 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="p-2.5 rounded-xl bg-black text-white shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-black">{pillar.title}</h4>
                  <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
