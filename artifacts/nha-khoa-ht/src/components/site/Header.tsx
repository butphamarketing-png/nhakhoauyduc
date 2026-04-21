import { Link } from "wouter";
import { Phone, Clock, Menu, X, Search, Facebook, Youtube, Instagram, ChevronDown } from "lucide-react";
import { useState } from "react";
import { HOTLINE, HOTLINE_DISPLAY, CLINIC_NAME, LOGO_URL, SOCIAL } from "@/lib/api";

const NAV: { href: string; label: string; children?: { href: string; label: string }[] }[] = [
  { href: "#home", label: "TRANG CHỦ" },
  { href: "#about", label: "GIỚI THIỆU" },
  { href: "#services", label: "DỊCH VỤ" },
  { href: "#blog", label: "KIẾN THỨC" },
  { href: "#promotions", label: "KHUYẾN MÃI" },
  {
    href: "#feedback",
    label: "FEEDBACK",
    children: [
      { href: "#feedback", label: "Cảm nhận khách hàng" },
      { href: "#feedback", label: "Hình ảnh trước – sau" },
    ],
  },
  { href: "#blog", label: "TIN TỨC" },
  { href: "#contact", label: "LIÊN HỆ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top utility row */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <img src={LOGO_URL} alt={CLINIC_NAME} className="w-14 h-14 rounded-full object-contain bg-white" />
          <div className="hidden sm:block">
            <div className="font-bold text-base md:text-lg text-[hsl(215,80%,20%)] leading-tight uppercase">
              {CLINIC_NAME}
            </div>
            <div className="text-xs text-gray-500 italic">Tận tâm – Chuyên nghiệp</div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-10 h-10 rounded-full bg-[hsl(215,80%,35%)]/10 grid place-items-center text-[hsl(215,80%,35%)]">
              <Clock className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-xs text-gray-500">Thứ 2 – Thứ 7: 8h00 – 20h00</div>
              <div className="text-xs text-gray-500">Chủ nhật: 8h00 – 12h00</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-10 h-10 rounded-full bg-[hsl(215,80%,35%)]/10 grid place-items-center text-[hsl(215,80%,35%)]">
              <Phone className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-xs text-gray-500">Hotline</div>
              <a href={`tel:${HOTLINE}`} className="font-bold text-[hsl(215,80%,20%)]">{HOTLINE_DISPLAY}</a>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <a href={SOCIAL.facebook} aria-label="Facebook" className="w-9 h-9 rounded-full bg-[#3b5998] text-white grid place-items-center hover:opacity-90">
              <Facebook className="h-4 w-4" />
            </a>
            <a href={SOCIAL.youtube} aria-label="Youtube" className="w-9 h-9 rounded-full bg-[#ff0000] text-white grid place-items-center hover:opacity-90">
              <Youtube className="h-4 w-4" />
            </a>
            <a href={SOCIAL.tiktok} aria-label="TikTok" className="w-9 h-9 rounded-full bg-black text-white grid place-items-center hover:opacity-90 text-xs font-bold">
              T
            </a>
            <a href={SOCIAL.instagram} aria-label="Instagram" className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-white grid place-items-center hover:opacity-90">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#booking"
            className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-[hsl(215,80%,25%)] text-white font-bold text-sm hover:bg-[hsl(215,80%,20%)] transition"
          >
            ĐẶT HẸN
          </a>
          <button
            className="lg:hidden p-2 rounded-md text-[hsl(215,80%,20%)]"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Blue navbar */}
      <nav className="hidden lg:block bg-[hsl(225,75%,55%)] text-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center">
          <ul className="flex items-stretch">
            {NAV.map((n) => (
              <li
                key={n.label}
                className="relative"
                onMouseEnter={() => n.children && setOpenSub(n.label)}
                onMouseLeave={() => setOpenSub(null)}
              >
                <a
                  href={n.href}
                  className={`flex items-center gap-1 px-5 py-3 text-sm font-semibold tracking-wide hover:bg-white/10 transition ${
                    n.label === "GIỚI THIỆU" ? "bg-[hsl(225,80%,45%)]" : ""
                  }`}
                >
                  {n.label}
                  {n.children && <ChevronDown className="h-3.5 w-3.5" />}
                </a>
                {n.children && openSub === n.label && (
                  <ul className="absolute top-full left-0 min-w-[220px] bg-white text-gray-700 shadow-lg border-t-2 border-[hsl(45,90%,55%)] z-50">
                    {n.children.map((c) => (
                      <li key={c.label}>
                        <a href={c.href} className="block px-4 py-2.5 text-sm hover:bg-blue-50 hover:text-[hsl(215,80%,30%)]">
                          {c.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <button className="ml-auto p-3 hover:bg-white/10" aria-label="Tìm kiếm">
            <Search className="h-4 w-4" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t bg-white">
          <nav className="flex flex-col p-4 gap-1">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm font-semibold text-gray-700 rounded hover:bg-blue-50"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-2.5 rounded-full bg-[hsl(215,80%,25%)] text-white font-bold text-center"
            >
              ĐẶT HẸN
            </a>
            <a href={`tel:${HOTLINE}`} className="mt-2 text-sm text-center text-[hsl(215,80%,30%)] font-bold">
              Hotline: {HOTLINE_DISPLAY}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
