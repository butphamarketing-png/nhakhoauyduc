import { useState } from "react";
import {
  useListBookings,
  useUpdateBooking,
  useDeleteBooking,
} from "@workspace/api-client-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { STATUS_OPTIONS, STATUS_CLASS } from "@/lib/api";

export function BookingsAdmin() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const params: { q?: string; status?: string } = {};
  if (q) params.q = q;
  if (status) params.status = status;
  const { data: bookings = [] } = useListBookings(Object.keys(params).length ? params : undefined);
  const update = useUpdateBooking();
  const remove = useDeleteBooking();
  const { toast } = useToast();
  const qc = useQueryClient();

  return (
    <AdminLayout active="bookings" title="Quản lý Lịch hẹn">
      <div className="bg-white rounded-xl border">
        <div className="flex flex-wrap items-center gap-3 p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm theo tên/SĐT..."
              className="pl-10 pr-4 py-2 border rounded-md w-72"
            />
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-3 py-2 border rounded-md">
            <option value="">Tất cả trạng thái</option>
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <p className="ml-auto text-sm text-gray-500">Tổng cộng {bookings.length}</p>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3">Khách hàng</th>
              <th className="px-4 py-3">SĐT</th>
              <th className="px-4 py-3">Dịch vụ</th>
              <th className="px-4 py-3">Thời gian</th>
              <th className="px-4 py-3">Đăng ký</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="px-4 py-3 font-medium">{b.name}</td>
                <td className="px-4 py-3"><a href={`tel:${b.phone}`} className="text-[hsl(215,80%,35%)]">{b.phone}</a></td>
                <td className="px-4 py-3 text-gray-600">{b.service}</td>
                <td className="px-4 py-3 text-gray-600">{b.appointmentTime}</td>
                <td className="px-4 py-3 text-gray-500">{new Date(b.createdAt).toLocaleString("vi-VN")}</td>
                <td className="px-4 py-3">
                  <select
                    value={b.status}
                    onChange={async (e) => {
                      await update.mutateAsync({ id: b.id, data: { status: e.target.value } });
                      qc.invalidateQueries();
                      toast({ title: "Cập nhật trạng thái" });
                    }}
                    className={`px-2 py-1 rounded text-xs border-0 ${STATUS_CLASS[b.status] || "bg-gray-100"}`}
                  >
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={async () => {
                      if (!confirm("Xoá?")) return;
                      await remove.mutateAsync({ id: b.id });
                      qc.invalidateQueries();
                    }}
                    className="p-2 hover:bg-rose-50 text-rose-600 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr><td colSpan={7} className="text-center py-8 text-gray-500">Chưa có lịch hẹn nào</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
