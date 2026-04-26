import { useState } from "react";
import {
  useDeleteBooking,
  useListBookings,
  useUpdateBooking,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Search, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { STATUS_CLASS, STATUS_OPTIONS } from "@/lib/api";

export function BookingsAdmin() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [busyId, setBusyId] = useState<number | null>(null);
  const params: { q?: string; status?: string } = {};
  if (q) params.q = q;
  if (status) params.status = status;

  const { data: bookings = [] } = useListBookings(Object.keys(params).length ? params : undefined);
  const update = useUpdateBooking();
  const remove = useDeleteBooking();
  const qc = useQueryClient();
  const { toast } = useToast();

  return (
    <AdminLayout active="bookings" title="Quản lý lịch hẹn">
      <div className="rounded-[1.25rem] border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center gap-3 border-b p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              value={q}
              onChange={(event) => setQ(event.target.value)}
              placeholder="Tìm theo tên hoặc số điện thoại..."
              className="w-full rounded-xl border py-2 pl-10 pr-4 sm:w-80"
            />
          </div>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-xl border px-3 py-2">
            <option value="">Tất cả trạng thái</option>
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <p className="ml-auto text-sm text-gray-500">Tổng cộng {bookings.length} lịch hẹn</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[980px] w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3">Khách hàng</th>
                <th className="px-4 py-3">SĐT</th>
                <th className="px-4 py-3">Dịch vụ</th>
                <th className="px-4 py-3">Thời gian</th>
                <th className="px-4 py-3">Đăng ký</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t">
                  <td className="px-4 py-3 font-medium">{booking.name}</td>
                  <td className="px-4 py-3">
                    <a href={`tel:${booking.phone}`} className="text-[hsl(215,80%,35%)]">
                      {booking.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{booking.service || "Chưa chọn dịch vụ"}</td>
                  <td className="px-4 py-3 text-gray-600">{booking.appointmentTime || "Khách muốn được gọi lại"}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(booking.createdAt).toLocaleString("vi-VN")}</td>
                  <td className="px-4 py-3">
                    <select
                      value={booking.status}
                      disabled={busyId === booking.id}
                      onChange={async (event) => {
                        setBusyId(booking.id);
                        try {
                          await update.mutateAsync({ id: booking.id, data: { status: event.target.value } });
                          qc.invalidateQueries();
                          toast({
                            title: "Đã cập nhật trạng thái",
                            description: `${booking.name} đã được chuyển sang "${event.target.value}".`,
                          });
                        } finally {
                          setBusyId(null);
                        }
                      }}
                      className={`rounded border-0 px-2 py-1 text-xs ${STATUS_CLASS[booking.status] || "bg-gray-100"}`}
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={async () => {
                        if (!confirm(`Xóa lịch hẹn của "${booking.name}"?`)) return;
                        await remove.mutateAsync({ id: booking.id });
                        qc.invalidateQueries();
                        toast({ title: "Đã xóa lịch hẹn" });
                      }}
                      className="rounded p-2 text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    Chưa có lịch hẹn nào phù hợp với bộ lọc hiện tại.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
