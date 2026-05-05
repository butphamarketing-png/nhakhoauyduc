import { useState } from "react";
import type { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateService,
  useDeleteService,
  useListServices,
  useUpdateService,
} from "@workspace/api-client-react";
import type { Service } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { ExternalLink, ImagePlus, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Modal } from "@/components/admin/Modal";
import { useToast } from "@/hooks/use-toast";
import { fileToImageDataUrl } from "@/lib/admin-image";
import { slugify } from "@/lib/site";

type FormData = { name: string; description: string; imageUrl: string };

export function ServicesAdmin() {
  const { data: services = [] } = useListServices();
  const create = useCreateService();
  const update = useUpdateService();
  const remove = useDeleteService();
  const qc = useQueryClient();
  const { toast } = useToast();
  const [editing, setEditing] = useState<Service | null>(null);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { register, handleSubmit, reset, watch, setValue } = useForm<FormData>();
  const imagePreview = watch("imageUrl");
  const namePreview = watch("name");

  const filtered = services.filter((service) => {
    if (!q.trim()) return true;
    const haystack = `${service.name} ${service.description}`.toLowerCase();
    return haystack.includes(q.trim().toLowerCase());
  });

  const openCreate = () => {
    setEditing(null);
    reset({ name: "", description: "", imageUrl: "" });
    setOpen(true);
  };

  const openEdit = (service: Service) => {
    setEditing(service);
    reset({
      name: service.name,
      description: service.description,
      imageUrl: service.imageUrl,
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
        title: "Đã lưu dịch vụ",
        description: "Nội dung public đã được cập nhật.",
      });
      setOpen(false);
      qc.invalidateQueries();
    } catch {
      toast({
        title: "Không thể lưu dịch vụ",
        description: "Vui lòng kiểm tra lại dữ liệu rồi thử lại.",
        variant: "destructive",
      });
    }
  });

  const previewHref = namePreview ? `/dich-vu/${slugify(namePreview)}` : null;

  const handleImageFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "File không phải là ảnh", variant: "destructive" });
      return;
    }
    try {
      const dataUrl = await fileToImageDataUrl(file);
      setValue("imageUrl", dataUrl, { shouldDirty: true, shouldValidate: true });
      toast({ title: "Đã chọn ảnh" });
    } catch {
      toast({ title: "Không thể đọc ảnh", variant: "destructive" });
    } finally {
      event.target.value = "";
    }
  };

  return (
    <AdminLayout active="services" title="Quản lý dịch vụ">
      <div className="rounded-[1.25rem] border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              value={q}
              onChange={(event) => setQ(event.target.value)}
              placeholder="Tìm theo tên hoặc mô tả..."
              className="w-full rounded-xl border px-4 py-2 pl-10 sm:w-80"
            />
          </div>
          <p className="text-sm text-gray-500">Hiển thị {filtered.length}/{services.length} dịch vụ</p>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-xl bg-[hsl(215,80%,35%)] px-4 py-2 text-sm text-white shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Thêm dịch vụ
          </button>
        </div>

        <div className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((service) => (
            <div key={service.id} className="rounded-xl border border-slate-200 p-4">
              {service.imageUrl ? (
                <img src={service.imageUrl} alt={service.name} className="mb-3 h-36 w-full rounded-lg object-cover" />
              ) : (
                <div className="mb-3 grid h-36 place-items-center rounded-lg bg-slate-100 text-sm text-slate-400">
                  Chưa có ảnh
                </div>
              )}
              <h4 className="font-semibold text-slate-900">{service.name}</h4>
              <p className="mt-1 line-clamp-3 text-sm text-gray-500">{service.description}</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => openEdit(service)} className="flex flex-1 items-center justify-center gap-1 rounded-lg border py-2 text-xs">
                  <Pencil className="h-3 w-3" />
                  Sửa
                </button>
                <a
                  href={`/dich-vu/${slugify(service.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 items-center justify-center gap-1 rounded-lg border py-2 text-xs text-[hsl(215,80%,35%)]"
                >
                  <ExternalLink className="h-3 w-3" />
                  Xem public
                </a>
                <button
                  onClick={async () => {
                    if (!confirm(`Xóa dịch vụ "${service.name}"?`)) return;
                    await remove.mutateAsync({ id: service.id });
                    qc.invalidateQueries();
                    toast({ title: "Đã xóa dịch vụ" });
                  }}
                  className="flex items-center justify-center rounded-lg border border-rose-200 px-3 py-2 text-xs text-rose-600"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 ? (
            <div className="col-span-full rounded-xl border border-dashed bg-slate-50 p-8 text-center text-sm text-slate-500">
              Chưa tìm thấy dịch vụ phù hợp. Thử đổi từ khóa hoặc thêm dịch vụ mới.
            </div>
          ) : null}
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Sửa dịch vụ" : "Thêm dịch vụ"}>
        <form onSubmit={onSubmit} className="space-y-4">
          <input {...register("name", { required: true })} placeholder="Tên dịch vụ" className="w-full rounded-xl border px-3 py-2" />
          <textarea {...register("description")} placeholder="Mô tả" rows={4} className="w-full rounded-xl border px-3 py-2" />
          <div className="grid gap-2">
            <input {...register("imageUrl")} placeholder="URL ảnh hoặc chọn ảnh từ máy" className="w-full rounded-xl border px-3 py-2" />
            <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-[hsl(215,80%,35%)] px-4 py-3 text-sm font-semibold text-[hsl(215,80%,35%)] transition hover:bg-[hsl(215,80%,96%)]">
              <ImagePlus className="h-4 w-4" />
              Chọn ảnh từ máy
              <input type="file" accept="image/*" onChange={handleImageFileChange} className="hidden" />
            </label>
          </div>
          <div className="rounded-xl border bg-slate-50 p-3">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-600">
              <ImagePlus className="h-4 w-4" />
              Xem trước ảnh
            </div>
            {imagePreview ? (
              <img src={imagePreview} alt="Xem trước dịch vụ" className="h-44 w-full rounded-lg object-cover" />
            ) : (
              <div className="grid h-44 place-items-center rounded-lg border border-dashed text-sm text-slate-400">
                Chưa có ảnh xem trước
              </div>
            )}
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            {previewHref ? (
              <a
                href={previewHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm text-[hsl(215,80%,35%)]"
              >
                <ExternalLink className="h-4 w-4" />
                Xem ngoài site
              </a>
            ) : null}
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
