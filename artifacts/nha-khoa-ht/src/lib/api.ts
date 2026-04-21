export const HOTLINE = "0974166440";
export const ADDRESS = "Quận 12, TP.HCM";
export const CLINIC_NAME = "Nha Khoa HT";

export const STATUS_OPTIONS = [
  "Chưa xử lý",
  "Đã liên hệ",
  "Hoàn tất",
  "Huỷ",
] as const;

export type BookingStatus = (typeof STATUS_OPTIONS)[number];

export const STATUS_CLASS: Record<string, string> = {
  "Chưa xử lý": "bg-amber-100 text-amber-800",
  "Đã liên hệ": "bg-blue-100 text-blue-800",
  "Hoàn tất": "bg-emerald-100 text-emerald-800",
  "Huỷ": "bg-rose-100 text-rose-800",
};
