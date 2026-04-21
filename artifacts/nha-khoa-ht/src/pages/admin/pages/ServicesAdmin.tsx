import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useListServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
} from "@workspace/api-client-react";
import type { Service } from "@workspace/api-client-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Modal } from "@/components/admin/Modal";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

type FormData = { name: string; description: string; imageUrl: string };

export function ServicesAdmin() {
  const { data: services = [] } = useListServices();
  const create = useCreateService();
  const update = useUpdateService();
  const remove = useDeleteService();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Service | null>(null);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormData>();

  const openCreate = () => {
    setEditing(null);
    reset({ name: "", description: "", imageUrl: "" });
    setOpen(true);
  };
  const openEdit = (s: Service) => {
    setEditing(s);
    reset({ name: s.name, description: s.description, imageUrl: s.imageUrl });
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
    <AdminLayout active="services" title="Quản lý Dịch vụ">
      <div className="bg-white rounded-xl border">
        <div className="flex justify-between items-center p-4 border-b">
          <p className="text-sm text-gray-500">Tổng cộng {services.length} dịch vụ</p>
          <button onClick={openCreate} className="px-4 py-2 bg-[hsl(215,80%,35%)] text-white rounded-md text-sm flex items-center gap-2">
            <Plus className="h-4 w-4" /> Thêm dịch vụ
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {services.map((s) => (
            <div key={s.id} className="border rounded-lg p-4">
              {s.imageUrl && <img src={s.imageUrl} className="w-full h-32 object-cover rounded mb-3" />}
              <h4 className="font-semibold">{s.name}</h4>
              <p className="text-sm text-gray-500 mt-1 line-clamp-3">{s.description}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => openEdit(s)} className="flex-1 py-1.5 border rounded text-xs flex items-center justify-center gap-1">
                  <Pencil className="h-3 w-3" /> Sửa
                </button>
                <button
                  onClick={async () => {
                    if (!confirm("Xoá?")) return;
                    await remove.mutateAsync({ id: s.id });
                    qc.invalidateQueries();
                  }}
                  className="flex-1 py-1.5 border border-rose-200 text-rose-600 rounded text-xs flex items-center justify-center gap-1"
                >
                  <Trash2 className="h-3 w-3" /> Xoá
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Sửa dịch vụ" : "Thêm dịch vụ"}>
        <form onSubmit={onSubmit} className="space-y-3">
          <input {...register("name", { required: true })} placeholder="Tên dịch vụ" className="w-full px-3 py-2 border rounded" />
          <textarea {...register("description")} placeholder="Mô tả" rows={4} className="w-full px-3 py-2 border rounded" />
          <input {...register("imageUrl")} placeholder="URL ảnh" className="w-full px-3 py-2 border rounded" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 border rounded">Huỷ</button>
            <button className="px-4 py-2 bg-[hsl(215,80%,35%)] text-white rounded">Lưu</button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
