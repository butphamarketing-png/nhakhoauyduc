import logoUrl from "@assets/image_1776784641294.png";

export const HOTLINE = "086868786";
export const HOTLINE_DISPLAY = "08.68.68.786";
export const ADDRESS = "345 - 347 Điện Biên Phủ, Ninh Phúc, Ph. Ninh Thành, Tây Ninh";
export const ADDRESS_SHORT = "Tây Ninh";
export const CLINIC_NAME = "Nha Khoa Đăng Khoa";
export const CLINIC_SLOGAN = "Uy tín - Chất lượng - Tận tâm";
export const CLINIC_EMAIL = "info@nhakhoadangkhoa.vn";
export const CLINIC_WEBSITE = "nhakhoadangkhoa.vn";
export const CLINIC_DESCRIPTION =
  "Nha Khoa Đăng Khoa - Nha khoa uy tín tại Tây Ninh với đội ngũ bác sĩ giàu kinh nghiệm, trang thiết bị hiện đại và quy trình chuẩn chỉ khoa học quốc tế.";
export const CLINIC_LOGO_ALT = `${CLINIC_NAME} logo`;
export const LOGO_URL = "/images/logo-dang-khoa.jpg";

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
