import { Link } from "wouter";
import { Phone, MapPin, Clock, Menu, X } from "lucide-react";
import { useState } from "react";
import { HOTLINE, ADDRESS, CLINIC_NAME } from "@/lib/api";

const NAV = [
  { href: "#home", label: "Trang chủ" },
  { href: "#about", label: "Giới thiệu" },
  { href: "#services", label: "Dịch vụ" },
  { href: "#promotions", label: "Khuyến mãi" },
  { href: "#feedback", label: "Cảm nhận" },
  { href: "#blog", label: "Tin tức" },
  { href: "#contact", label: "Liên hệ" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="bg-[hsl(215,80%,20%)] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {ADDRESS}
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> 8:00 - 20:00 (T2 - CN)
            </span>
          </div>
          <a
            href={`tel:${HOTLINE}`}
            className="flex items-center gap-1 font-semibold text-[hsl(45,90%,55%)]"
          >
            <Phone className="h-3.5 w-3.5" /> Hotline: {HOTLINE}
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[hsl(215,80%,35%)] text-white grid place-items-center font-bold text-xl">
            HT
          </div>
          <div>
            <div className="font-bold text-xl text-[hsl(215,80%,20%)] leading-tight">
              {CLINIC_NAME}
            </div>
            <div className="text-xs text-gray-500">Tận tâm – Chuyên nghiệp</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-gray-700 hover:text-[hsl(215,80%,35%)] transition-colors"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#booking"
            className="px-4 py-2 rounded-md bg-[hsl(45,90%,55%)] text-[hsl(215,80%,20%)] font-semibold hover:bg-[hsl(45,90%,50%)] transition"
          >
            Đặt lịch
          </a>
        </nav>

        <button
          className="lg:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t bg-white">
          <nav className="flex flex-col p-4 gap-3">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-gray-700"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-md bg-[hsl(45,90%,55%)] text-[hsl(215,80%,20%)] font-semibold text-center"
            >
              Đặt lịch
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
