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

const NAV = [
  { href: "/admin", icon: LayoutDashboard, label: "Bảng điều khiển", page: "" },
  { href: "/admin/settings", icon: Settings, label: "Setting", page: "settings" },
  { href: "/admin/bookings", icon: CalendarCheck, label: "Đặt Lịch", page: "bookings", group: "Quản lý Đặt lịch" },
  { href: "/admin/feedback", icon: MessageSquare, label: "Cảm nhận", page: "feedback", group: "Quản lý Trang Chủ" },
  { href: "/admin/banners", icon: Image, label: "Slide", page: "banners", group: "Quản lý Trang Chủ" },
  { href: "/admin/services", icon: Briefcase, label: "Dịch vụ", page: "services", group: "Quản lý Nội dung" },
  { href: "/admin/promotions", icon: Tag, label: "Khuyến mãi", page: "promotions", group: "Quản lý Nội dung" },
  { href: "/admin/posts", icon: Newspaper, label: "Bài viết", page: "posts", group: "Quản lý Nội dung" },
];

const LOCAL_ADMIN_SESSION_KEY = "nkht_local_admin";
const ADMIN_COOKIE_NAME = "nkht_admin";

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
      <div className="p-7">
        <div className="truncate text-lg font-bold text-slate-950">Nha Khoa HT ADMIN</div>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto px-6 pb-4">
        {NAV.map((item, index) => {
          const isActive = active === item.page;
          const previous = NAV[index - 1];
          const showGroup = item.group && item.group !== previous?.group;
          return (
            <div key={item.href}>
              {showGroup ? <div className="px-2 pb-1 pt-5 text-sm text-slate-500">{item.group}</div> : null}
              <Link
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition ${
                  isActive
                    ? "bg-[#2f66ed] font-semibold text-white shadow-sm"
                    : "text-slate-600 hover:bg-white hover:text-[#2f66ed]"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            </div>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-4">
        <div className="mb-3 rounded-xl bg-white px-3 py-2 text-xs text-slate-500">
          <div className="text-[10px] uppercase tracking-[0.16em] text-slate-400">Hồ sơ của tôi</div>
          <div className="mt-1 truncate text-slate-700">{email}</div>
        </div>
        <div className="grid gap-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-600 transition hover:bg-white"
          >
            <ExternalLink className="h-4 w-4" />
            Xem site public
          </a>
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-600 transition hover:bg-white"
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
  const localAdminEmail =
    typeof window !== "undefined" ? localStorage.getItem(LOCAL_ADMIN_SESSION_KEY) : null;
  const hasLocalSession = Boolean(localAdminEmail);
  const isAuthenticated = Boolean(me?.authenticated || hasLocalSession);
  const adminEmail = me?.email ?? localAdminEmail ?? "";

  useEffect(() => {
    if (!hasLocalSession && !isLoading && !isAuthenticated) {
      setLocation("/admin/login");
    }
  }, [hasLocalSession, isAuthenticated, isLoading, setLocation]);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  if ((!hasLocalSession && isLoading) || !isAuthenticated) {
    return <div className="grid min-h-screen place-items-center text-gray-500">Đang tải...</div>;
  }

  const handleLogout = async () => {
    localStorage.removeItem(LOCAL_ADMIN_SESSION_KEY);
    document.cookie = `${ADMIN_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
    try {
      await logout.mutateAsync();
    } catch {}
    setLocation("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#eef6ff]">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 flex-col bg-[#eaf3ff] text-slate-700 lg:flex">
          <SidebarContent active={active} email={adminEmail} onLogout={handleLogout} />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 bg-[#eef6ff]">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMobileOpen(true)}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div className="lg:hidden">
                  <h1 className="text-xl font-bold text-slate-950">{title}</h1>
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
                <div className="grid h-9 w-9 place-items-center rounded-full bg-black text-sm font-bold text-white">
                  {(adminEmail || "A").charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </header>

          <main className="min-w-0 flex-1 rounded-tl-[1.6rem] bg-white p-6 shadow-[0_0_0_1px_rgba(226,232,240,.7)] sm:p-8">{children}</main>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm transition lg:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#eaf3ff] text-slate-700 shadow-[0_20px_50px_rgba(15,23,42,.20)] transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Điều hướng</div>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <SidebarContent active={active} email={adminEmail} onNavigate={() => setMobileOpen(false)} onLogout={handleLogout} />
      </aside>
    </div>
  );
}
