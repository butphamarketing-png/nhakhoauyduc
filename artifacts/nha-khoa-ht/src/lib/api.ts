import logoUrl from "@assets/image_1776784641294.png";

export const HOTLINE = "0395352639";
export const HOTLINE_DISPLAY = "039 535 2639";
export const ADDRESS = "134/5 Bạch Lâm 1, Xã Thống Nhất, Tỉnh Đồng Nai";
export const ADDRESS_SHORT = "Gia Kiệm, Đồng Nai";
export const CLINIC_NAME = "Nha Khoa Uy Đức Smile";
export const CLINIC_SLOGAN = "Nha khoa gia đình tận tâm, chuẩn chỉ và minh bạch tại Gia Kiệm";
export const CLINIC_EMAIL = "info@nhakhoauyduc.com";
export const CLINIC_WEBSITE = "nhakhoauyduc.com";
export const CLINIC_DESCRIPTION =
  "Nha Khoa Uy Đức Smile mang đến trải nghiệm thăm khám nhẹ nhàng, tư vấn rõ ràng và lộ trình điều trị phù hợp cho từng khách hàng tại Gia Kiệm, Đồng Nai.";
export const CLINIC_LOGO_ALT = `${CLINIC_NAME} logo`;
export const LOGO_URL = logoUrl;

export const SOCIAL = {
  facebook: "https://facebook.com/",
  youtube: "https://youtube.com/",
  tiktok: "https://tiktok.com/",
  instagram: "https://instagram.com/",
  zalo: `https://zalo.me/${HOTLINE}`,
};

export const STATUS_OPTIONS = [
  "Chưa xử lý",
  "Đã liên hệ",
  "Hoàn tất",
  "Hủy",
] as const;

export type BookingStatus = (typeof STATUS_OPTIONS)[number];

export const STATUS_CLASS: Record<string, string> = {
  "Chưa xử lý": "bg-amber-100 text-amber-800",
  "Đã liên hệ": "bg-blue-100 text-blue-800",
  "Hoàn tất": "bg-emerald-100 text-emerald-800",
  "Hủy": "bg-rose-100 text-rose-800",
};
