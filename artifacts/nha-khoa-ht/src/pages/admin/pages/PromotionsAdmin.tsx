import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useCreatePromotion,
  useDeletePromotion,
  useListPromotions,
  useUpdatePromotion,
} from "@workspace/api-client-react";
import type { Promotion } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { CalendarRange, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Modal } from "@/components/admin/Modal";
import { useToast } from "@/hooks/use-toast";

type FormData = { title: string; content: string; price: string; validUntil: string };

export function PromotionsAdmin() {
  const { data: promos = [] } = useListPromotions();
  const create = useCreatePromotion();
  const update = useUpdatePromotion();
  const remove = useDeletePromotion();
  const qc = useQueryClient();
  const { toast } = useToast();
  const [editing, setEditing] = useState<Promotion | null>(null);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { register, handleSubmit, reset } = useForm<FormData>();

  const filtered = promos.filter((promo) => {
    if (!q.trim()) return true;
    const haystack = `${promo.title} ${promo.content} ${promo.price}`.toLowerCase();
    return haystack.includes(q.trim().toLowerCase());
  });

  const openCreate = () => {
    setEditing(null);
    reset({ title: "", content: "", price: "", validUntil: "" });
    setOpen(true);
  };

  const openEdit = (promo: Promotion) => {
    setEditing(promo);
    reset({
      title: promo.title,
      content: promo.content,
      price: promo.price,
      validUntil: promo.validUntil,
    });
    setOpen(true);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (editing) {
        await update.mutateAsync({ id: editing.id, data });
      } else {
        await create.mutateAsync({ data });
      }
      toast({
        title: "Đã lưu khuyến mãi",
        description: "Thông tin ưu đãi đã được cập nhật.",
      });
      setOpen(false);
      qc.invalidateQueries();
    } catch {
      toast({
        title: "Không thể lưu khuyến mãi",
        description: "Vui lòng kiểm tra lại dữ liệu.",
        variant: "destructive",
      });
    }
  });

  return (
    <AdminLayout active="promotions" title="Quản lý khuyến mãi">
      <div className="rounded-[1.25rem] border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              value={q}
              onChange={(event) => setQ(event.target.value)}
              placeholder="Tìm tiêu đề, nội dung, giá..."
              className="w-full rounded-xl border px-4 py-2 pl-10 sm:w-80"
            />
          </div>
          <p className="text-sm text-gray-500">Hiển thị {filtered.length}/{promos.length} khuyến mãi</p>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-xl bg-[hsl(215,80%,35%)] px-4 py-2 text-sm text-white shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Thêm khuyến mãi
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[760px] w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3">Tiêu đề</th>
                <th className="px-4 py-3">Nội dung</th>
                <th className="px-4 py-3">Giá</th>
                <th className="px-4 py-3">Hiệu lực</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((promo) => (
                <tr key={promo.id} className="border-t">
                  <td className="px-4 py-3 font-medium">{promo.title}</td>
                  <td className="max-w-md truncate px-4 py-3 text-gray-500">{promo.content}</td>
                  <td className="px-4 py-3 font-bold text-[hsl(215,80%,35%)]">{promo.price}</td>
                  <td className="px-4 py-3 text-gray-500">{promo.validUntil}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(promo)} className="rounded p-2 hover:bg-gray-100">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={async () => {
                        if (!confirm(`Xóa khuyến mãi "${promo.title}"?`)) return;
                        await remove.mutateAsync({ id: promo.id });
                        qc.invalidateQueries();
                        toast({ title: "Đã xóa khuyến mãi" });
                      }}
                      className="rounded p-2 text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    Chưa có khuyến mãi phù hợp với từ khóa hiện tại.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Sửa khuyến mãi" : "Thêm khuyến mãi"}>
        <form onSubmit={onSubmit} className="space-y-4">
          <input {...register("title", { required: true })} placeholder="Tiêu đề" className="w-full rounded-xl border px-3 py-2" />
          <textarea {...register("content")} placeholder="Nội dung" rows={3} className="w-full rounded-xl border px-3 py-2" />
          <input {...register("price")} placeholder="Giá ưu đãi" className="w-full rounded-xl border px-3 py-2" />
          <input {...register("validUntil")} placeholder="Hạn sử dụng" className="w-full rounded-xl border px-3 py-2" />
          <div className="rounded-xl border bg-slate-50 p-3 text-sm text-slate-600">
            <div className="flex items-center gap-2 font-medium text-slate-700">
              <CalendarRange className="h-4 w-4" />
              Gợi ý hiển thị
            </div>
            <div className="mt-2">Nên nhập hạn sử dụng rõ ràng, ví dụ: `31/12/2026` hoặc `Đến hết tháng 12` để ngoài site dễ hiểu hơn.</div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setOpen(false)} className="rounded-xl border px-4 py-2">
              Hủy
            </button>
            <button className="rounded-xl bg-[hsl(215,80%,35%)] px-4 py-2 text-white">Lưu</button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
