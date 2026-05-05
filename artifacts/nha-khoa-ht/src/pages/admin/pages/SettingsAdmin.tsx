import { useEffect } from "react";
import type { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useGetSettings, useUpdateSettings } from "@workspace/api-client-react";
import type { Settings } from "@workspace/api-client-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { fileToImageDataUrl } from "@/lib/admin-image";
import { useQueryClient } from "@tanstack/react-query";

type ExtendedSettings = Settings & {
  aboutTitle: string;
  aboutDescription1: string;
  aboutDescription2: string;
  aboutDescription3: string;
  aboutImageUrl: string;
};

export function SettingsAdmin() {
  const { data: settings } = useGetSettings();
  const update = useUpdateSettings();
  const { toast } = useToast();
  const qc = useQueryClient();
  const { register, handleSubmit, reset, watch, setValue } = useForm<ExtendedSettings>();
  const aboutImagePreview = watch("aboutImageUrl");

  useEffect(() => {
    if (settings) {
      reset({
        ...settings,
        aboutTitle: (settings as ExtendedSettings).aboutTitle || "Nha Khoa Uy Đức Smile - Đồng hành cùng nụ cười khỏe đẹp cho cả gia đình",
        aboutDescription1:
          (settings as ExtendedSettings).aboutDescription1 ||
          "Phòng khám tập trung vào trải nghiệm thăm khám nhẹ nhàng, giao tiếp rõ ràng và lộ trình điều trị phù hợp thay vì tạo áp lực cho khách hàng.",
        aboutDescription2:
          (settings as ExtendedSettings).aboutDescription2 ||
          "Từ lần khám đầu tiên, đội ngũ sẽ lắng nghe nhu cầu, kiểm tra tình trạng và giải thích phương án phù hợp với mục tiêu của bạn: điều trị, phục hình hay cải thiện thẩm mỹ.",
        aboutDescription3:
          (settings as ExtendedSettings).aboutDescription3 ||
          "Chúng tôi ưu tiên cảm giác yên tâm và dễ hiểu trong suốt hành trình, từ đặt lịch, tiếp đón, thực hiện dịch vụ đến chăm sóc sau điều trị.",
        aboutImageUrl: (settings as ExtendedSettings).aboutImageUrl || "",
      });
    }
  }, [settings, reset]);

  const handleAboutImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "File không phải là ảnh", variant: "destructive" });
      return;
    }
    try {
      const dataUrl = await fileToImageDataUrl(file);
      setValue("aboutImageUrl", dataUrl, { shouldDirty: true, shouldValidate: true });
      toast({ title: "Đã chọn ảnh giới thiệu" });
    } catch {
      toast({ title: "Không thể đọc ảnh", variant: "destructive" });
    } finally {
      event.target.value = "";
    }
  };

  const onSubmit = handleSubmit(async (d) => {
    try {
      await update.mutateAsync({ data: d as Settings });
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
      <form onSubmit={onSubmit} className="max-w-5xl space-y-6 rounded-xl border bg-white p-6">
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
        <div className="rounded-xl border bg-slate-50 p-4">
          <h3 className="text-lg font-bold text-slate-900">Giới thiệu trang chủ</h3>
          <p className="mt-1 text-sm text-slate-500">Nội dung này hiển thị ở phần “Giới thiệu” trên trang chủ và trang giới thiệu.</p>
          <div className="mt-4 grid gap-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Tiêu đề giới thiệu</span>
              <input {...register("aboutTitle")} className="mt-1 w-full px-3 py-2 border rounded" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Đoạn mô tả 1</span>
              <textarea {...register("aboutDescription1")} rows={3} className="mt-1 w-full px-3 py-2 border rounded" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Đoạn mô tả 2</span>
              <textarea {...register("aboutDescription2")} rows={3} className="mt-1 w-full px-3 py-2 border rounded" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Đoạn mô tả 3</span>
              <textarea {...register("aboutDescription3")} rows={3} className="mt-1 w-full px-3 py-2 border rounded" />
            </label>
            <div className="grid gap-2">
              <span className="text-sm font-medium text-gray-700">Ảnh giới thiệu</span>
              <input {...register("aboutImageUrl")} placeholder="URL ảnh hoặc chọn ảnh từ máy" className="w-full px-3 py-2 border rounded" />
              <label className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-[hsl(215,80%,35%)] px-4 py-3 text-sm font-semibold text-[hsl(215,80%,35%)] transition hover:bg-[hsl(215,80%,96%)]">
                Chọn ảnh giới thiệu từ máy
                <input type="file" accept="image/*" onChange={handleAboutImageChange} className="hidden" />
              </label>
              {aboutImagePreview ? <img src={aboutImagePreview} alt="Xem trước giới thiệu" className="h-52 w-full rounded-lg border object-cover" /> : null}
            </div>
          </div>
        </div>
        <button className="px-6 py-2 bg-[hsl(215,80%,35%)] text-white rounded-md font-semibold">
          Lưu thay đổi
        </button>
      </form>
    </AdminLayout>
  );
}
