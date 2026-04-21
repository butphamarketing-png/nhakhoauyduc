import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useListFeedback,
  useCreateFeedback,
  useUpdateFeedback,
  useDeleteFeedback,
} from "@workspace/api-client-react";
import type { Feedback } from "@workspace/api-client-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Modal } from "@/components/admin/Modal";
import { Plus, Pencil, Trash2, Star, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

type FormData = {
  name: string;
  service: string;
  content: string;
  rating: number;
  imageUrl: string;
  approved: boolean;
};

export function FeedbackAdmin() {
  const { data: items = [] } = useListFeedback();
  const create = useCreateFeedback();
  const update = useUpdateFeedback();
  const remove = useDeleteFeedback();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Feedback | null>(null);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormData>();

  const openCreate = () => {
    setEditing(null);
    reset({ name: "", service: "", content: "", rating: 5, imageUrl: "", approved: false });
    setOpen(true);
  };
  const openEdit = (f: Feedback) => {
    setEditing(f);
    reset(f);
    setOpen(true);
  };
  const onSubmit = handleSubmit(async (d) => {
    const payload = { ...d, rating: Number(d.rating) };
    try {
      if (editing) await update.mutateAsync({ id: editing.id, data: payload });
      else await create.mutateAsync({ data: payload });
      toast({ title: "Đã lưu" });
      setOpen(false);
      qc.invalidateQueries();
    } catch {
      toast({ title: "Lỗi", variant: "destructive" });
    }
  });

  const toggleApprove = async (f: Feedback) => {
    await update.mutateAsync({ id: f.id, data: { approved: !f.approved } });
    qc.invalidateQueries();
  };

  return (
    <AdminLayout active="feedback" title="Quản lý Cảm nhận">
      <div className="bg-white rounded-xl border">
        <div className="flex justify-between items-center p-4 border-b">
          <p className="text-sm text-gray-500">Tổng cộng {items.length} cảm nhận</p>
          <button onClick={openCreate} className="px-4 py-2 bg-[hsl(215,80%,35%)] text-white rounded-md text-sm flex items-center gap-2">
            <Plus className="h-4 w-4" /> Thêm cảm nhận
          </button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3">Khách hàng</th>
              <th className="px-4 py-3">Dịch vụ</th>
              <th className="px-4 py-3">Nội dung</th>
              <th className="px-4 py-3">Đánh giá</th>
              <th className="px-4 py-3">Duyệt</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((f) => (
              <tr key={f.id} className="border-t">
                <td className="px-4 py-3 font-medium">{f.name}</td>
                <td className="px-4 py-3 text-gray-500">{f.service}</td>
                <td className="px-4 py-3 max-w-xs truncate text-gray-500">{f.content}</td>
                <td className="px-4 py-3">
                  <div className="flex">
                    {Array.from({ length: f.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleApprove(f)}
                    className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
                      f.approved ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {f.approved ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    {f.approved ? "Đã duyệt" : "Chưa duyệt"}
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(f)} className="p-2 hover:bg-gray-100 rounded">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={async () => {
                      if (!confirm("Xoá?")) return;
                      await remove.mutateAsync({ id: f.id });
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

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Sửa cảm nhận" : "Thêm cảm nhận"}>
        <form onSubmit={onSubmit} className="space-y-3">
          <input {...register("name", { required: true })} placeholder="Tên khách hàng" className="w-full px-3 py-2 border rounded" />
          <input {...register("service")} placeholder="Dịch vụ" className="w-full px-3 py-2 border rounded" />
          <textarea {...register("content")} placeholder="Nội dung" rows={3} className="w-full px-3 py-2 border rounded" />
          <input {...register("imageUrl")} placeholder="URL ảnh" className="w-full px-3 py-2 border rounded" />
          <select {...register("rating")} className="w-full px-3 py-2 border rounded">
            {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} sao</option>)}
          </select>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("approved")} /> Duyệt hiển thị
          </label>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 border rounded">Huỷ</button>
            <button className="px-4 py-2 bg-[hsl(215,80%,35%)] text-white rounded">Lưu</button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
