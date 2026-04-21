import {
  useGetDashboardSummary,
  useGetBookingsByDay,
  useListBookings,
} from "@workspace/api-client-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  CalendarCheck,
  Newspaper,
  Briefcase,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { STATUS_CLASS } from "@/lib/api";

export function DashboardOverview() {
  const { data: summary } = useGetDashboardSummary();
  const { data: byDay = [] } = useGetBookingsByDay();
  const { data: recent = [] } = useListBookings();

  const cards = [
    { label: "Tổng lịch hẹn", value: summary?.totalBookings ?? 0, icon: CalendarCheck, color: "bg-blue-500" },
    { label: "Chờ xử lý", value: summary?.pendingBookings ?? 0, icon: AlertCircle, color: "bg-amber-500" },
    { label: "Dịch vụ", value: summary?.totalServices ?? 0, icon: Briefcase, color: "bg-emerald-500" },
    { label: "Bài viết", value: summary?.totalPosts ?? 0, icon: Newspaper, color: "bg-indigo-500" },
    { label: "Cảm nhận", value: summary?.totalFeedback ?? 0, icon: MessageSquare, color: "bg-pink-500" },
  ];

  return (
    <AdminLayout active="" title="Tổng quan">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {cards.map((c) => (
          <div key={c.label} className="bg-white p-5 rounded-xl border shadow-sm">
            <div className={`w-10 h-10 ${c.color} text-white rounded-lg grid place-items-center mb-3`}>
              <c.icon className="h-5 w-5" />
            </div>
            <div className="text-2xl font-bold text-[hsl(215,80%,20%)]">{c.value}</div>
            <div className="text-xs text-gray-500">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border">
          <h3 className="font-semibold text-[hsl(215,80%,20%)] mb-4">
            Lịch hẹn theo ngày (14 ngày gần nhất)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={byDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(215,80%,35%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-5 rounded-xl border">
          <h3 className="font-semibold text-[hsl(215,80%,20%)] mb-4">
            Lịch hẹn gần đây
          </h3>
          <div className="space-y-3 max-h-[300px] overflow-auto">
            {recent.slice(0, 8).map((b) => (
              <div key={b.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <div className="font-medium text-sm">{b.name}</div>
                  <div className="text-xs text-gray-500">{b.phone}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${STATUS_CLASS[b.status] || ""}`}>
                  {b.status}
                </span>
              </div>
            ))}
            {recent.length === 0 && (
              <p className="text-sm text-gray-500">Chưa có lịch hẹn nào.</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
