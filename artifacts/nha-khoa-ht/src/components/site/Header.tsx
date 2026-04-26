import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  CalendarDays,
  Clock3,
  Facebook,
  Instagram,
  Menu,
  Phone,
  Search,
  X,
  Youtube,
} from "lucide-react";
import { CLINIC_LOGO_ALT, LOGO_URL } from "@/lib/api";
import { CLINIC_PROFILE } from "@/lib/site";

const PRIMARY_NAV = [
  { label: "TRANG CHỦ", href: "/" },
  { label: "GIỚI THIỆU", href: "/gioi-thieu" },
  { label: "DỊCH VỤ", href: "/dich-vu" },
  { label: "KIẾN THỨC", href: "/kien-thuc" },
  { label: "KHUYẾN MÃI", href: "/khuyen-mai" },
  { label: "NHẬN XÉT", href: "/nhan-xet" },
  { label: "TIN TỨC", href: "/tin-tuc" },
  { label: "LIÊN HỆ", href: "/lien-he" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_12px_36px_rgba(21,53,122,.08)]">
      <div
        className={`border-b border-slate-200 bg-white transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <img
              src={LOGO_URL}
              alt={CLINIC_LOGO_ALT}
              className="h-14 w-14 rounded-full border border-slate-200 bg-white object-cover shadow-sm sm:h-16 sm:w-16"
            />
            <div className="min-w-0">
              <div className="truncate text-xl font-extrabold uppercase text-[hsl(218,61%,27%)] sm:text-2xl">
                {CLINIC_PROFILE.name}
              </div>
              <div className="hidden text-sm italic text-slate-500 md:block">
                {CLINIC_PROFILE.slogan}
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-4 xl:flex">
            <div className="flex items-center gap-3 rounded-full bg-slate-50 px-4 py-3 text-slate-700">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[hsl(219,82%,94%)] text-[hsl(221,68%,41%)]">
                <Clock3 className="h-6 w-6" />
              </span>
              <div className="text-sm leading-6">
                <div>{CLINIC_PROFILE.hours.weekdays}</div>
                <div>{CLINIC_PROFILE.hours.sunday}</div>
              </div>
            </div>

            <a
              href={`tel:${CLINIC_PROFILE.hotline.replace(/\s+/g, "")}`}
              className="flex items-center gap-3 rounded-full bg-slate-50 px-4 py-3 text-slate-700 transition hover:bg-slate-100"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[hsl(219,82%,94%)] text-[hsl(221,68%,41%)]">
                <Phone className="h-6 w-6" />
              </span>
              <div className="leading-tight">
                <div className="text-sm text-slate-500">Đường dây nóng</div>
                <div className="text-2xl font-extrabold text-[hsl(218,61%,27%)]">
                  {CLINIC_PROFILE.hotline}
                </div>
              </div>
            </a>

            <div className="flex items-center gap-2">
              <a
                href={CLINIC_PROFILE.social.facebook}
                aria-label="Facebook"
                className="grid h-14 w-14 place-items-center rounded-full bg-[#2d63d5] text-white transition hover:scale-105"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href={CLINIC_PROFILE.social.youtube}
                aria-label="YouTube"
                className="grid h-14 w-14 place-items-center rounded-full bg-[#ff2323] text-white transition hover:scale-105"
              >
                <Youtube className="h-6 w-6" />
              </a>
              <a
                href={CLINIC_PROFILE.social.instagram}
                aria-label="Instagram"
                className="grid h-14 w-14 place-items-center rounded-full bg-[linear-gradient(135deg,#8656ff,#ef47b7)] text-white transition hover:scale-105"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>

            <Link
              href="/lien-he#booking"
              className="inline-flex items-center justify-center rounded-full bg-[hsl(216,65%,33%)] px-7 py-4 text-base font-bold uppercase tracking-[0.04em] text-white transition hover:bg-[hsl(221,68%,41%)]"
            >
              Đặt hẹn
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-12 w-12 place-items-center rounded-2xl border border-slate-200 text-[hsl(218,61%,27%)] transition hover:bg-slate-50 xl:hidden"
            aria-label={open ? "Đóng menu" : "Mở menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="hidden bg-[linear-gradient(90deg,#3b63d8,#3157cf)] xl:block">
        <div className="mx-auto flex max-w-7xl items-stretch px-4">
          <nav className="flex flex-1 items-stretch">
            {PRIMARY_NAV.map((item) => {
              const active = isActivePath(location, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex min-w-0 items-center justify-center whitespace-nowrap px-6 py-4 text-[15px] font-bold uppercase tracking-[0.04em] text-white transition ${
                    active
                      ? "bg-[rgba(20,45,122,.24)]"
                      : "hover:bg-[rgba(255,255,255,.1)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            className="grid w-16 place-items-center text-white transition hover:bg-[rgba(255,255,255,.1)]"
            aria-label="Tìm kiếm"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-slate-200 bg-white transition-all duration-300 xl:hidden ${
          open ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4">
          <div className="grid gap-2">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-2xl px-4 py-3 text-sm font-bold uppercase tracking-[0.04em] transition ${
                  isActivePath(location, item.href)
                    ? "bg-[hsl(219,82%,94%)] text-[hsl(221,68%,41%)]"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 grid gap-3">
            <div className="rounded-[1.4rem] bg-slate-50 p-4 text-sm text-slate-600">
              <div className="flex items-center gap-2 font-semibold text-[hsl(218,61%,27%)]">
                <CalendarDays className="h-4 w-4 text-[hsl(221,68%,41%)]" />
                Lịch làm việc
              </div>
              <div className="mt-2">{CLINIC_PROFILE.hours.weekdays}</div>
              <div>{CLINIC_PROFILE.hours.sunday}</div>
            </div>

            <a
              href={`tel:${CLINIC_PROFILE.hotline.replace(/\s+/g, "")}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 font-bold text-[hsl(221,68%,41%)] transition hover:-translate-y-0.5"
            >
              <Phone className="h-4 w-4" />
              {CLINIC_PROFILE.hotline}
            </a>

            <Link
              href="/lien-he#booking"
              className="inline-flex items-center justify-center rounded-full bg-[hsl(216,65%,33%)] px-5 py-3 font-bold uppercase text-white transition hover:bg-[hsl(221,68%,41%)]"
            >
              Đặt hẹn ngay
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
