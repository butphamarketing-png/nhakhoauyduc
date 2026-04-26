import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Clock3, Facebook, Instagram, Menu, Phone, Search, X, Youtube } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { CLINIC_LOGO_ALT, LOGO_URL } from "@/lib/api";
import { CLINIC_PROFILE } from "@/lib/site";

const PRIMARY_NAV = [
  { label: "TRANG CHỦ", href: "/" },
  { label: "GIỚI THIỆU", href: "/gioi-thieu" },
  { label: "DỊCH VỤ", href: "/dich-vu" },
  { label: "KIẾN THỨC", href: "/kien-thuc" },
  { label: "KHUYẾN MÃI", href: "/khuyen-mai" },
  { label: "FEEDBACK", href: "/nhan-xet" },
  { label: "TIN TỨC", href: "/tin-tuc" },
  { label: "LIÊN HỆ", href: "/lien-he" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SocialCircle({
  href,
  label,
  className,
  children,
}: {
  href: string;
  label: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className={`grid h-11 w-11 place-items-center rounded-full text-white transition hover:scale-105 ${className}`}
    >
      {children}
    </a>
  );
}

export function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_10px_28px_rgba(23,55,128,.08)]">
      <div className={`border-b border-slate-200 bg-white transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}>
        <div className="mx-auto flex max-w-[1720px] items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="flex min-w-[320px] flex-none items-center gap-3 xl:min-w-[380px]">
            <img
              src={LOGO_URL}
              alt={CLINIC_LOGO_ALT}
              className="h-16 w-16 rounded-full border border-slate-200 bg-white object-cover shadow-sm sm:h-[72px] sm:w-[72px]"
            />
            <div className="min-w-0">
              <div className="truncate text-[18px] font-extrabold uppercase leading-none text-[hsl(218,61%,27%)] sm:text-[21px]">
                {CLINIC_PROFILE.name}
              </div>
              <div className="mt-1 hidden max-w-[360px] text-[14px] italic leading-6 text-slate-500 xl:block">
                {CLINIC_PROFILE.slogan}
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-4 lg:flex xl:gap-5">
            <div className="flex items-center gap-3 border-l border-slate-300 pl-5">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[hsl(228,90%,63%)]/14 text-[hsl(231,80%,58%)]">
                <Clock3 className="h-6 w-6" />
              </span>
              <div className="text-[15px] leading-[1.45] text-slate-900">
                <div>{CLINIC_PROFILE.hours.weekdays}</div>
                <div>{CLINIC_PROFILE.hours.sunday}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 border-l border-slate-300 pl-5">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[hsl(228,90%,63%)]/14 text-[hsl(231,80%,58%)]">
                <Phone className="h-6 w-6" />
              </span>
              <div className="leading-tight">
                <div className="text-[15px] text-slate-900">Hotline</div>
                <div className="mt-1 text-[17px] font-bold text-slate-950">{CLINIC_PROFILE.hotline}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 border-l border-slate-300 pl-5">
              <SocialCircle href={CLINIC_PROFILE.social.facebook} label="Facebook" className="bg-[#4069e5]">
                <Facebook className="h-5 w-5" />
              </SocialCircle>
              <SocialCircle href={CLINIC_PROFILE.social.youtube} label="YouTube" className="bg-[#ff2a23]">
                <Youtube className="h-5 w-5" />
              </SocialCircle>
              <SocialCircle href={CLINIC_PROFILE.social.tiktok} label="TikTok" className="bg-[#4b59e6]">
                <FaTiktok className="h-4 w-4" />
              </SocialCircle>
              <SocialCircle href={CLINIC_PROFILE.social.instagram} label="Instagram" className="bg-[#6d55f5]">
                <Instagram className="h-5 w-5" />
              </SocialCircle>
              <SocialCircle
                href={CLINIC_PROFILE.social.zalo}
                label="Zalo"
                className="bg-[#5464ff] text-[10px] font-bold uppercase tracking-[0.08em]"
              >
                Zalo
              </SocialCircle>
            </div>

            <div className="flex items-center gap-4 border-l border-slate-300 pl-5">
              <Link
                href="/lien-he#booking"
                className="inline-flex min-w-[210px] items-center justify-center rounded-full bg-[linear-gradient(180deg,#5f6dff,#2839b9)] px-7 py-4 text-[16px] font-bold uppercase tracking-[0.04em] text-white shadow-[0_10px_22px_rgba(48,67,177,.24)] transition hover:translate-y-[-1px]"
              >
                ĐẶT HẸN
              </Link>
              <button
                type="button"
                className="grid h-11 w-11 place-items-center text-[hsl(231,80%,58%)]"
                aria-label="Mở menu"
              >
                <Menu className="h-8 w-8 stroke-[1.75]" />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-12 w-12 place-items-center rounded-2xl border border-slate-200 text-[hsl(218,61%,27%)] transition hover:bg-slate-50 lg:hidden"
            aria-label={open ? "Đóng menu" : "Mở menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="hidden bg-[linear-gradient(90deg,#5b67f6,#4d5cf3)] lg:block">
        <div className="mx-auto flex max-w-[1720px] items-stretch">
          <nav className="mx-auto flex flex-1 items-stretch justify-center overflow-hidden">
            {PRIMARY_NAV.map((item) => {
              const active = isActivePath(location, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center justify-center whitespace-nowrap px-7 py-6 text-[15px] font-bold uppercase leading-none text-white transition xl:px-8 ${
                    active ? "bg-[rgba(36,51,168,.24)]" : "hover:bg-[rgba(255,255,255,.08)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            className="grid w-20 place-items-center text-white transition hover:bg-[rgba(255,255,255,.08)]"
            aria-label="Tìm kiếm"
          >
            <Search className="h-7 w-7 stroke-[1.9]" />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-slate-200 bg-white transition-all duration-300 lg:hidden ${
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
        </div>
      </div>
    </header>
  );
}
