import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useListBanners,
  useCreateBanner,
  useUpdateBanner,
  useDeleteBanner,
} from "@workspace/api-client-react";
import type { Banner } from "@workspace/api-client-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Modal } from "@/components/admin/Modal";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

type FormData = {
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText: string;
  sortOrder: number;
};

export function BannersAdmin() {
  const { data: banners = [] } = useListBanners();
  const create = useCreateBanner();
  const update = useUpdateBanner();
  const remove = useDeleteBanner();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Banner | null>(null);
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<FormData>();

  const openCreate = () => {
    setEditing(null);
    reset({ title: "", subtitle: "", imageUrl: "", ctaText: "", sortOrder: banners.length + 1 });
    setOpen(true);
  };
  const openEdit = (b: Banner) => {
    setEditing(b);
    reset({
      title: b.title,
      subtitle: b.subtitle ?? "",
      imageUrl: b.imageUrl,
      ctaText: b.ctaText ?? "",
      sortOrder: b.sortOrder,
    });
    setOpen(true);
  };

  const onSubmit = handleSubmit(async (d) => {
    const payload = {
      title: d.title,
      subtitle: d.subtitle || null,
      imageUrl: d.imageUrl,
      ctaText: d.ctaText || null,
      sortOrder: Number(d.sortOrder) || 0,
    };
    try {
      if (editing) {
        await update.mutateAsync({ id: editing.id, data: payload });
      } else {
        await create.mutateAsync({ data: payload });
      }
      toast({ title: "Đã lưu" });
      setOpen(false);
      qc.invalidateQueries();
    } catch {
      toast({ title: "Lỗi", variant: "destructive" });
    }
  });

  return (
    <AdminLayout active="banners" title="Quản lý Banner">
      <div className="bg-white rounded-xl border">
        <div className="flex justify-between items-center p-4 border-b">
          <p className="text-sm text-gray-500">Tổng cộng {banners.length} banner</p>
          <button
            onClick={openCreate}
            className="px-4 py-2 bg-[hsl(215,80%,35%)] text-white rounded-md text-sm flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Thêm banner
          </button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3">Ảnh</th>
              <th className="px-4 py-3">Tiêu đề</th>
              <th className="px-4 py-3">Mô tả</th>
              <th className="px-4 py-3">Thứ tự</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {banners.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="px-4 py-3">
                  {b.imageUrl && (
                    <img src={b.imageUrl} alt="" className="w-20 h-12 object-cover rounded" />
                  )}
                </td>
                <td className="px-4 py-3 font-medium">{b.title}</td>
                <td className="px-4 py-3 text-gray-500 max-w-md truncate">{b.subtitle}</td>
                <td className="px-4 py-3">{b.sortOrder}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(b)} className="p-2 hover:bg-gray-100 rounded">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={async () => {
                      if (!confirm("Xóa banner này?")) return;
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
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Sửa banner" : "Thêm banner"}>
        <form onSubmit={onSubmit} className="space-y-3">
          <input {...register("title", { required: true })} placeholder="Tiêu đề" className="w-full px-3 py-2 border rounded" />
          <textarea {...register("subtitle")} placeholder="Mô tả" rows={2} className="w-full px-3 py-2 border rounded" />
          <input {...register("imageUrl")} placeholder="URL hình ảnh" className="w-full px-3 py-2 border rounded" />
          <input {...register("ctaText")} placeholder="Nút CTA" className="w-full px-3 py-2 border rounded" />
          <input {...register("sortOrder")} type="number" placeholder="Thứ tự" className="w-full px-3 py-2 border rounded" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 border rounded">
              Hủy
            </button>
            <button className="px-4 py-2 bg-[hsl(215,80%,35%)] text-white rounded">Lưu</button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
