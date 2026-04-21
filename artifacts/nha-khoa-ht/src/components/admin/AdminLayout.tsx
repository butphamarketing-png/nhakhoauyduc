import { ReactNode, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useGetMe, useAdminLogout } from "@workspace/api-client-react";
import {
  LayoutDashboard,
  Image,
  Briefcase,
  Tag,
  MessageSquare,
  Newspaper,
  CalendarCheck,
  Settings,
  LogOut,
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

  useEffect(() => {
    if (!isLoading && (!me || !me.authenticated)) {
      setLocation("/admin/login");
    }
  }, [me, isLoading, setLocation]);

  if (isLoading || !me?.authenticated) {
    return (
      <div className="min-h-screen grid place-items-center text-gray-500">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-[hsl(215,80%,20%)] text-white flex flex-col">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[hsl(45,90%,55%)] text-[hsl(215,80%,20%)] grid place-items-center font-bold">
              HT
            </div>
            <div>
              <div className="font-bold">{CLINIC_NAME}</div>
              <div className="text-xs text-blue-200">Quản trị</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map((n) => {
            const isActive = active === n.page;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
                  isActive
                    ? "bg-[hsl(45,90%,55%)] text-[hsl(215,80%,20%)] font-semibold"
                    : "text-blue-100 hover:bg-white/10"
                }`}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10">
          <div className="text-xs text-blue-200 mb-2 px-2 truncate">{me.email}</div>
          <button
            onClick={async () => {
              await logout.mutateAsync();
              setLocation("/admin/login");
            }}
            className="flex items-center gap-2 px-3 py-2 w-full rounded-md text-sm text-blue-100 hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" /> Đăng xuất
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="bg-white border-b px-6 py-4">
          <h1 className="text-xl font-bold text-[hsl(215,80%,20%)]">{title}</h1>
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
