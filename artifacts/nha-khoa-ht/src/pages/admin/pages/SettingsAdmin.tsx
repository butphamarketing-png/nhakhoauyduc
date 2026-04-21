import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGetSettings, useUpdateSettings } from "@workspace/api-client-react";
import type { Settings } from "@workspace/api-client-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export function SettingsAdmin() {
  const { data: settings } = useGetSettings();
  const update = useUpdateSettings();
  const { toast } = useToast();
  const qc = useQueryClient();
  const { register, handleSubmit, reset } = useForm<Settings>();

  useEffect(() => {
    if (settings) reset(settings);
  }, [settings, reset]);

  const onSubmit = handleSubmit(async (d) => {
    try {
      await update.mutateAsync({ data: d });
      toast({ title: "Đã lưu cài đặt" });
      qc.invalidateQueries();
    } catch {
      toast({ title: "Lỗi", variant: "destructive" });
    }
  });

  const fields: { key: keyof Settings; label: string }[] = [
    { key: "logo", label: "Logo URL" },
    { key: "hotline", label: "Hotline" },
    { key: "address", label: "Địa chỉ" },
    { key: "email", label: "Email" },
    { key: "facebook", label: "Facebook" },
    { key: "youtube", label: "Youtube" },
    { key: "tiktok", label: "TikTok" },
    { key: "instagram", label: "Instagram" },
    { key: "zalo", label: "Zalo" },
    { key: "metaTitle", label: "Tiêu đề SEO" },
  ];

  return (
    <AdminLayout active="settings" title="Cài đặt website">
      <form onSubmit={onSubmit} className="bg-white rounded-xl border p-6 max-w-3xl space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          {fields.map((f) => (
            <label key={f.key} className="block">
              <span className="text-sm font-medium text-gray-700">{f.label}</span>
              <input {...register(f.key)} className="mt-1 w-full px-3 py-2 border rounded" />
            </label>
          ))}
        </div>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Mô tả SEO</span>
          <textarea {...register("metaDescription")} rows={3} className="mt-1 w-full px-3 py-2 border rounded" />
        </label>
        <button className="px-6 py-2 bg-[hsl(215,80%,35%)] text-white rounded-md font-semibold">
          Lưu thay đổi
        </button>
      </form>
    </AdminLayout>
  );
}
