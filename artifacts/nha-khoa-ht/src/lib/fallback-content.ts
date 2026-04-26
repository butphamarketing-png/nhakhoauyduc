import aboutPreviewImage from "@assets/image_1776782858611.png";
import clinicConsultationImage from "@assets/image_1776782870001.png";
import implantShowcaseImage from "@assets/image_1776782901886.png";

export const FALLBACK_ABOUT_IMAGE = aboutPreviewImage;

export const FALLBACK_SERVICES = [
  {
    id: 1001,
    name: "Trồng răng Implant",
    description:
      "Giải pháp phục hình răng mất bền vững, hỗ trợ ăn nhai chắc chắn và giữ thẩm mỹ tự nhiên trong thời gian dài.",
    imageUrl: implantShowcaseImage,
  },
  {
    id: 1002,
    name: "Răng sứ thẩm mỹ",
    description:
      "Cải thiện hình dáng, màu sắc và nụ cười bằng giải pháp bọc hoặc phục hình răng sứ theo tình trạng thực tế.",
    imageUrl: aboutPreviewImage,
  },
    {
    id: 1003,
    name: "Niềng răng",
    description:
      "Chỉnh nha an toàn cho các tình trạng răng lệch, chen chúc, hô, móm hoặc thưa để khớp cắn hài hòa hơn.",
    imageUrl: clinicConsultationImage,
  },
  {
    id: 1004,
    name: "Nha khoa điều trị",
    description:
      "Thăm khám kỹ, điều trị rõ ràng theo từng tình trạng răng miệng từ sâu răng, viêm nướu đến nội nha.",
    imageUrl: clinicConsultationImage,
  },
  {
    id: 1005,
    name: "Trám răng thẩm mỹ",
    description:
      "Khôi phục răng sâu, mẻ hoặc sứt nhanh chóng bằng vật liệu phù hợp màu răng, tiết kiệm và ít xâm lấn.",
    imageUrl: clinicConsultationImage,
  },
  {
    id: 1006,
    name: "Tẩy trắng răng",
    description:
      "Hỗ trợ cải thiện màu răng xỉn màu do thực phẩm, cà phê hoặc thuốc lá để nụ cười sáng và khỏe hơn.",
    imageUrl: aboutPreviewImage,
  },
  {
    id: 1007,
    name: "Nhổ răng khôn",
    description:
      "Xử lý răng khôn mọc lệch hoặc mọc ngầm nhằm giảm đau, hạn chế viêm và bảo vệ các răng bên cạnh.",
    imageUrl: clinicConsultationImage,
  },
  {
    id: 1008,
    name: "Răng tháo lắp",
    description:
      "Phương án tiết kiệm cho người mất răng muốn cải thiện ăn nhai, giao tiếp và sinh hoạt hằng ngày.",
    imageUrl: implantShowcaseImage,
  },
  {
    id: 1009,
    name: "Phục hình răng",
    description:
      "Tái tạo hình dáng răng bị mẻ, thưa, xỉn màu hoặc mất răng để cải thiện thẩm mỹ và chức năng ăn nhai.",
    imageUrl: implantShowcaseImage,
  },
  {
    id: 1010,
    name: "Điều trị tủy",
    description:
      "Điều trị nội nha cho răng viêm tủy, đau nhức hoặc nhiễm trùng nhằm giữ lại răng thật tối đa.",
    imageUrl: clinicConsultationImage,
  },
];

export function getFallbackServiceImage(serviceName: string) {
  const name = serviceName.toLowerCase();

  if (name.includes("implant") || name.includes("phục hình") || name.includes("tháo lắp")) {
    return implantShowcaseImage;
  }

  if (name.includes("sứ") || name.includes("tẩy trắng")) {
    return aboutPreviewImage;
  }

  return clinicConsultationImage;
}
