import logoUrl from "@assets/image_1776784641294.png";

export const HOTLINE = "0395352639";
export const HOTLINE_DISPLAY = "039 535 2639";
export const ADDRESS = "134/5 Bạch Lâm 1, Xã Thống Nhất, Tỉnh Đồng Nai";
export const ADDRESS_SHORT = "Gia Kiệm – Đồng Nai";
export const CLINIC_NAME = "Nha Khoa Uy Đức Smile";
export const CLINIC_SLOGAN = "Nụ cười tự tin – Sức khoẻ răng miệng";
export const CLINIC_EMAIL = "info@nhakhoauyduc.com";
export const CLINIC_WEBSITE = "Nhakhoauyduc.com";
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
  "Huỷ",
] as const;

export type BookingStatus = (typeof STATUS_OPTIONS)[number];

export const STATUS_CLASS: Record<string, string> = {
  "Chưa xử lý": "bg-amber-100 text-amber-800",
  "Đã liên hệ": "bg-blue-100 text-blue-800",
  "Hoàn tất": "bg-emerald-100 text-emerald-800",
  "Huỷ": "bg-rose-100 text-rose-800",
};
