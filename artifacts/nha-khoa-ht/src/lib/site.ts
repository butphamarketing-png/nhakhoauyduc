import {
  ADDRESS,
  ADDRESS_SHORT,
  CLINIC_DESCRIPTION,
  CLINIC_EMAIL,
  CLINIC_NAME,
  CLINIC_SLOGAN,
  CLINIC_WEBSITE,
  HOTLINE,
  HOTLINE_DISPLAY,
  SOCIAL,
} from "@/lib/api";

export const SITE_URL = `https://${CLINIC_WEBSITE}`;
export const DEFAULT_OG_IMAGE = "/opengraph.jpg";
export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=134%2F5+B%E1%BA%A1ch+L%C3%A2m+1%2C+X%C3%A3+Th%E1%BB%91ng+Nh%E1%BA%A5t%2C+T%E1%BB%89nh+%C4%90%E1%BB%93ng+Nai";

export const SITE_NAV = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Dịch vụ", href: "/dich-vu" },
  { label: "Khuyến mãi", href: "/khuyen-mai" },
  { label: "Kiến thức", href: "/kien-thuc" },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Liên hệ", href: "/lien-he" },
];

export const SITE_FACTS = [
  { value: "10+", label: "Năm kinh nghiệm đồng hành cùng khách hàng tại Gia Kiệm" },
  { value: "20+", label: "Bác sĩ và phụ tá tận tâm trong từng khâu thăm khám" },
  { value: "6.000+", label: "Ca phục hình và điều trị hoàn thiện thành công" },
  { value: "50.000+", label: "Lượt khách hàng tin tưởng và quay lại tái khám" },
];

export const COMMITMENTS = [
  {
    title: "Khám kỹ trước khi điều trị",
    description: "Mỗi ca đều được thăm khám và tư vấn rõ tình trạng trước khi bắt đầu.",
  },
  {
    title: "Chi phí minh bạch",
    description: "Giải thích phương án, thời gian và mức chi phí để bạn yên tâm quyết định.",
  },
  {
    title: "Quy trình nhẹ nhàng",
    description: "Ưu tiên trải nghiệm ít đau, sạch sẽ, đúng quy trình và dễ theo dõi.",
  },
  {
    title: "Theo dõi sau dịch vụ",
    description: "Luôn có hướng dẫn chăm sóc, tái khám và hỗ trợ nếu cần sau điều trị.",
  },
  {
    title: "Phù hợp cho cả gia đình",
    description: "Từ trẻ nhỏ đến người lớn tuổi đều có lộ trình thăm khám phù hợp.",
  },
];

export const TRUST_SIGNALS = [
  "Không gian sạch sẽ, lịch hẹn rõ ràng, tiếp đón nhanh",
  "Tư vấn theo tình trạng thật thay vì bán quá mức",
  "Có hướng dẫn chăm sóc và lịch tái khám sau điều trị",
  "Nhiều khách hàng quay lại định kỳ cho cả gia đình",
];

export const BOOKING_STEPS = [
  "Để lại số điện thoại và nhu cầu chính",
  "Đội ngũ gọi lại xác nhận dịch vụ hoặc khung giờ phù hợp",
  "Đến thăm khám và nhận lộ trình điều trị rõ ràng",
];

export const CONTACT_CARDS = [
  { title: "Hotline", value: HOTLINE_DISPLAY, href: `tel:${HOTLINE}` },
  { title: "Địa chỉ", value: ADDRESS, href: GOOGLE_MAPS_URL },
  { title: "Email", value: CLINIC_EMAIL, href: `mailto:${CLINIC_EMAIL}` },
  { title: "Website", value: CLINIC_WEBSITE, href: SITE_URL },
];

export const FOOTER_POLICIES = [
  "Chính sách bảo mật thông tin",
  "Chính sách đặt lịch và đổi lịch",
  "Hướng dẫn chăm sóc sau điều trị",
];

export const FAQ_HOME = [
  {
    question: "Phòng khám có nhận tư vấn trước khi đặt lịch không?",
    answer:
      "Có. Bạn có thể để lại số điện thoại hoặc gọi trực tiếp để được tư vấn nhanh về tình trạng, dịch vụ phù hợp và khung giờ trống.",
  },
  {
    question: "Khi đến khám cần chuẩn bị gì?",
    answer:
      "Bạn chỉ cần đến đúng giờ hẹn và chia sẻ rõ tình trạng đang gặp phải. Nếu đã chụp phim hoặc điều trị ở nơi khác, hãy mang theo để bác sĩ tham khảo.",
  },
  {
    question: "Phòng khám có phù hợp cho khách hàng đi cùng gia đình không?",
    answer:
      "Có. Phòng khám tiếp nhận cả khách hàng cá nhân lẫn gia đình với lịch hẹn linh hoạt và tư vấn riêng theo từng độ tuổi.",
  },
];

export const FAQ_CONTACT = [
  {
    question: "Bao lâu sau khi gửi form thì phòng khám liên hệ lại?",
    answer:
      "Thông thường đội ngũ sẽ gọi lại trong thời gian ngắn trong giờ làm việc để xác nhận nhu cầu và đặt lịch phù hợp.",
  },
  {
    question: "Có thể đổi lịch hẹn sau khi đã đăng ký không?",
    answer:
      "Có. Bạn có thể gọi hotline để đổi lịch, phòng khám sẽ hỗ trợ sắp xếp lại theo khung giờ còn trống.",
  },
];

export const FAQ_SERVICES = [
  {
    question: "Làm sao biết mình phù hợp với dịch vụ nào?",
    answer:
      "Bác sĩ sẽ thăm khám, đánh giá tình trạng và tư vấn phương án phù hợp thay vì áp dụng một lộ trình chung cho tất cả khách hàng.",
  },
  {
    question: "Chi phí có được báo trước không?",
    answer:
      "Có. Trước khi thực hiện, phòng khám sẽ tư vấn rõ phương án điều trị và chi phí dự kiến để bạn chủ động quyết định.",
  },
];

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function splitParagraphs(value: string) {
  return value
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function buildExcerpt(value: string, maxLength = 180) {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

export function isNewsCategory(category: string) {
  const slug = slugify(category);
  return ["tin-tuc", "su-kien", "hoat-dong", "thong-bao", "cap-nhat"].some((item) =>
    slug.includes(item),
  );
}

export function getPostBasePath(category: string) {
  return isNewsCategory(category) ? "/tin-tuc" : "/kien-thuc";
}

export function getServiceHighlights(serviceName: string) {
  const name = serviceName.toLowerCase();

  if (name.includes("implant")) {
    return [
      "Phục hồi răng mất với cảm giác ăn nhai ổn định và thẩm mỹ tự nhiên.",
      "Lộ trình rõ ràng từ thăm khám, chụp phim đến theo dõi sau cấy ghép.",
      "Phù hợp cho khách hàng cần giải pháp bền vững và lâu dài.",
    ];
  }

  if (name.includes("sứ") || name.includes("phục hình")) {
    return [
      "Cân chỉnh dáng răng, màu sắc và độ hài hòa với gương mặt.",
      "Ưu tiên độ bền, khả năng ăn nhai và cảm giác sử dụng tự nhiên.",
      "Có hướng dẫn chăm sóc và hẹn tái khám sau hoàn thiện.",
    ];
  }

  if (name.includes("tẩy trắng")) {
    return [
      "Cải thiện màu răng theo hướng sáng khỏe và đồng đều hơn.",
      "Được kiểm tra trước khi thực hiện để phù hợp với men răng hiện tại.",
      "Có hướng dẫn duy trì kết quả sau điều trị tại nhà.",
    ];
  }

  return [
    "Thăm khám kỹ trước khi thực hiện để chọn phương án phù hợp.",
    "Tối ưu thời gian nhưng vẫn ưu tiên trải nghiệm nhẹ nhàng, rõ ràng.",
    "Có hướng dẫn chăm sóc sau dịch vụ để duy trì kết quả tốt hơn.",
  ];
}

export const CLINIC_PROFILE = {
  name: CLINIC_NAME,
  slogan: CLINIC_SLOGAN,
  description: CLINIC_DESCRIPTION,
  shortAddress: ADDRESS_SHORT,
  fullAddress: ADDRESS,
  hotline: HOTLINE_DISPLAY,
  email: CLINIC_EMAIL,
  website: CLINIC_WEBSITE,
  siteUrl: SITE_URL,
  mapsUrl: GOOGLE_MAPS_URL,
  social: SOCIAL,
  hours: {
    weekdays: "Thứ 2 - Thứ 7: 8h00 - 20h00",
    sunday: "Chủ nhật: 8h00 - 12h00",
  },
};
