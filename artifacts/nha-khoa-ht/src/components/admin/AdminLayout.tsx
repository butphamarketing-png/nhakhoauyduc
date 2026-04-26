import { type ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useAdminLogout, useGetMe } from "@workspace/api-client-react";
import {
  Briefcase,
  CalendarCheck,
  ExternalLink,
  Image,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Newspaper,
  Settings,
  Tag,
  X,
} from "lucide-react";
import { CLINIC_NAME } from "@/lib/api";

const NAV = [
  { href: "/admin", icon: LayoutDashboard, label: "Tổng quan", page: "" },
  { href: "/admin/banners", icon: Image, label: "Banner", page: "banners" },
  { href: "/admin/services", icon: Briefcase, label: "Dịch vụ", page: "services" },
  { href: "/admin/promotions", icon: Tag, label: "Khuyến mãi", page: "promotions" },
  { href: "/admin/feedback", icon: MessageSquare, label: "Cảm nhận", page: "feedback" },
  { href: "/admin/posts", icon: Newspaper, label: "Bài viết", page: "posts" },
  { href: "/admin/bookings", icon: CalendarCheck, label: "Lịch hẹn", page: "bookings" },
  { href: "/admin/settings", icon: Settings, label: "Cài đặt", page: "settings" },
];

function SidebarContent({
  active,
  email,
  onNavigate,
  onLogout,
}: {
  active: string;
  email: string;
  onNavigate?: () => void;
  onLogout: () => void;
}) {
  return (
    <>
      <div className="border-b border-white/10 p-5">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[hsl(45,90%,55%)] font-bold text-[hsl(215,80%,20%)] shadow-sm">
            UD
          </div>
          <div className="min-w-0">
            <div className="truncate font-bold">{CLINIC_NAME}</div>
            <div className="text-xs text-blue-200">Bảng điều khiển nội dung</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {NAV.map((item) => {
          const isActive = active === item.page;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                isActive
                  ? "bg-[hsl(45,90%,55%)] font-semibold text-[hsl(215,80%,20%)] shadow-sm"
                  : "text-blue-100 hover:bg-white/10"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <div className="mb-3 rounded-xl bg-white/5 px-3 py-2 text-xs text-blue-100">
          <div className="text-[10px] uppercase tracking-[0.16em] text-blue-200">Đăng nhập bởi</div>
          <div className="mt-1 truncate">{email}</div>
        </div>
        <div className="grid gap-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-blue-100 transition hover:bg-white/10"
          >
            <ExternalLink className="h-4 w-4" />
            Xem site public
          </a>
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-blue-100 transition hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" />
            Đăng xuất
          </button>
        </div>
      </div>
    </>
  );
}

export function AdminLayout({
  children,
  active,
  title,
}: {
  children: ReactNode;
  active: string;
  title: string;
}) {
  const { data: me, isLoading } = useGetMe();
  const [, setLocation] = useLocation();
  const logout = useAdminLogout();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && (!me || !me.authenticated)) {
      setLocation("/admin/login");
    }
  }, [me, isLoading, setLocation]);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  if (isLoading || !me?.authenticated) {
    return <div className="grid min-h-screen place-items-center text-gray-500">Đang tải...</div>;
  }

  const handleLogout = async () => {
    await logout.mutateAsync();
    setLocation("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f7fb_0%,#eef4ff_100%)]">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col bg-[linear-gradient(180deg,hsl(215,80%,20%),hsl(221,70%,17%))] text-white lg:flex">
          <SidebarContent active={active} email={me.email ?? ""} onLogout={handleLogout} />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-white/70 bg-white/92 backdrop-blur">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMobileOpen(true)}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(215,80%,35%)]">Admin</div>
                  <h1 className="text-xl font-bold text-[hsl(215,80%,20%)]">{title}</h1>
                </div>
              </div>

              <div className="hidden items-center gap-3 sm:flex">
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-[hsl(215,80%,35%)] hover:text-[hsl(215,80%,35%)]"
                >
                  <ExternalLink className="h-4 w-4" />
                  Xem site
                </a>
                <div className="rounded-full bg-[hsl(215,80%,95%)] px-4 py-2 text-sm text-[hsl(215,80%,28%)]">
                  {me.email}
                </div>
              </div>
            </div>
          </header>

          <main className="min-w-0 flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm transition lg:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[linear-gradient(180deg,hsl(215,80%,20%),hsl(221,70%,17%))] text-white shadow-[0_20px_50px_rgba(15,23,42,.35)] transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-100">Điều hướng</div>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-full border border-white/10 p-2 text-blue-100 transition hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <SidebarContent active={active} email={me.email ?? ""} onNavigate={() => setMobileOpen(false)} onLogout={handleLogout} />
      </aside>
    </div>
  );
}
