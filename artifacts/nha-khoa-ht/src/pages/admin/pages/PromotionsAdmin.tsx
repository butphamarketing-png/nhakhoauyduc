import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useListPromotions,
  useCreatePromotion,
  useUpdatePromotion,
  useDeletePromotion,
} from "@workspace/api-client-react";
import type { Promotion } from "@workspace/api-client-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Modal } from "@/components/admin/Modal";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

type FormData = { title: string; content: string; price: string; validUntil: string };

export function PromotionsAdmin() {
  const { data: promos = [] } = useListPromotions();
  const create = useCreatePromotion();
  const update = useUpdatePromotion();
  const remove = useDeletePromotion();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Promotion | null>(null);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormData>();

  const openCreate = () => {
    setEditing(null);
    reset({ title: "", content: "", price: "", validUntil: "" });
    setOpen(true);
  };
  const openEdit = (p: Promotion) => {
    setEditing(p);
    reset(p);
    setOpen(true);
  };
  const onSubmit = handleSubmit(async (d) => {
    try {
      if (editing) await update.mutateAsync({ id: editing.id, data: d });
      else await create.mutateAsync({ data: d });
      toast({ title: "Đã lưu" });
      setOpen(false);
      qc.invalidateQueries();
    } catch {
      toast({ title: "Lỗi", variant: "destructive" });
    }
  });

  return (
    <AdminLayout active="promotions" title="Quản lý Khuyến mãi">
      <div className="bg-white rounded-xl border">
        <div className="flex justify-between items-center p-4 border-b">
          <p className="text-sm text-gray-500">Tổng cộng {promos.length} khuyến mãi</p>
          <button onClick={openCreate} className="px-4 py-2 bg-[hsl(215,80%,35%)] text-white rounded-md text-sm flex items-center gap-2">
            <Plus className="h-4 w-4" /> Thêm khuyến mãi
          </button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3">Tiêu đề</th>
              <th className="px-4 py-3">Nội dung</th>
              <th className="px-4 py-3">Giá</th>
              <th className="px-4 py-3">Hiệu lực</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {promos.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3 text-gray-500 max-w-md truncate">{p.content}</td>
                <td className="px-4 py-3 font-bold text-[hsl(215,80%,35%)]">{p.price}</td>
                <td className="px-4 py-3 text-gray-500">{p.validUntil}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(p)} className="p-2 hover:bg-gray-100 rounded">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={async () => {
                      if (!confirm("Xoá?")) return;
                      await remove.mutateAsync({ id: p.id });
                      qc.invalidateQueries();
                    }}
                    className="p-2 hover:bg-rose-50 text-rose-600 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Sửa khuyến mãi" : "Thêm khuyến mãi"}>
        <form onSubmit={onSubmit} className="space-y-3">
          <input {...register("title", { required: true })} placeholder="Tiêu đề" className="w-full px-3 py-2 border rounded" />
          <textarea {...register("content")} placeholder="Nội dung" rows={3} className="w-full px-3 py-2 border rounded" />
          <input {...register("price")} placeholder="Giá ưu đãi" className="w-full px-3 py-2 border rounded" />
          <input {...register("validUntil")} placeholder="Hạn sử dụng" className="w-full px-3 py-2 border rounded" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 border rounded">Huỷ</button>
            <button className="px-4 py-2 bg-[hsl(215,80%,35%)] text-white rounded">Lưu</button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
