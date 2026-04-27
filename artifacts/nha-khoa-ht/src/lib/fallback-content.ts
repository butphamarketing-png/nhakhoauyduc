import heroSmileImage from "@assets/image_1776782858611.png";
import clinicConsultationImage from "@assets/image_1776782870001.png";
import implantFeatureImage from "@assets/image_1776782892625.png";
import treatmentFeatureImage from "@assets/image_1776782901886.png";
import clinicLoungeImage from "@assets/image_1776784860830.png";

export const FALLBACK_ABOUT_IMAGE = clinicLoungeImage;

export const FALLBACK_SERVICES = [
  {
    id: 1001,
    name: "Trồng răng Implant",
    description:
      "Giải pháp phục hình răng mất bền vững, hỗ trợ ăn nhai chắc chắn và giữ thẩm mỹ tự nhiên trong thời gian dài.",
    imageUrl: implantFeatureImage,
  },
  {
    id: 1002,
    name: "Răng sứ thẩm mỹ",
    description:
      "Cải thiện hình dáng, màu sắc và nụ cười bằng giải pháp bọc hoặc phục hình răng sứ theo tình trạng thực tế.",
    imageUrl: heroSmileImage,
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
    imageUrl: treatmentFeatureImage,
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
    imageUrl: heroSmileImage,
  },
  {
    id: 1007,
    name: "Nhổ răng khôn",
    description:
      "Xử lý răng khôn mọc lệch hoặc mọc ngầm nhằm giảm đau, hạn chế viêm và bảo vệ các răng bên cạnh.",
    imageUrl: treatmentFeatureImage,
  },
  {
    id: 1008,
    name: "Răng tháo lắp",
    description:
      "Phương án tiết kiệm cho người mất răng muốn cải thiện ăn nhai, giao tiếp và sinh hoạt hằng ngày.",
    imageUrl: implantFeatureImage,
  },
  {
    id: 1009,
    name: "Phục hình răng",
    description:
      "Tái tạo hình dáng răng bị mẻ, thưa, xỉn màu hoặc mất răng để cải thiện thẩm mỹ và chức năng ăn nhai.",
    imageUrl: implantFeatureImage,
  },
  {
    id: 1010,
    name: "Điều trị tủy",
    description:
      "Điều trị nội nha cho răng viêm tủy, đau nhức hoặc nhiễm trùng nhằm giữ lại răng thật tối đa.",
    imageUrl: treatmentFeatureImage,
  },
];

export const FALLBACK_PROMOTIONS = [
  {
    id: 2001,
    title: "Ưu đãi tẩy trắng răng sáng hơn mỗi lần cười",
    content:
      "Kiểm tra men răng trước khi thực hiện và tư vấn khung giá phù hợp để khách hàng chủ động đặt lịch.",
    price: "Từ 1.200.000đ",
    validUntil: "31/05/2026",
    imageUrl: heroSmileImage,
  },
  {
    id: 2002,
    title: "Gói Implant theo dõi trọn lộ trình",
    content:
      "Thăm khám, chụp phim và hướng dẫn tái khám rõ ràng để khách hàng yên tâm hơn trước khi bắt đầu.",
    price: "Ưu đãi theo tình trạng",
    validUntil: "30/06/2026",
    imageUrl: implantFeatureImage,
  },
  {
    id: 2003,
    title: "Khám và tư vấn ban đầu cho nhu cầu phục hình",
    content:
      "Phù hợp với khách hàng cần nghe rõ phương án điều trị, chi phí dự kiến và khung giờ thực hiện.",
    price: "Đăng ký linh hoạt",
    validUntil: "Theo lịch trống",
    imageUrl: clinicLoungeImage,
  },
];

export const FALLBACK_FEEDBACK = [
  {
    id: 3001,
    name: "Chị Hồng",
    service: "Bọc răng sứ",
    content:
      "Ngay từ buổi đầu mình đã được giải thích rất kỹ, làm xong nhìn tự nhiên hơn và cười tự tin hơn hẳn.",
    rating: 5,
    imageUrl: heroSmileImage,
  },
  {
    id: 3002,
    name: "Cô Nguyệt",
    service: "Trồng răng Implant",
    content:
      "Mình thích nhất là đội ngũ theo dõi rất sát sau điều trị, dặn dò rõ ràng nên đi lại ăn nhai cũng yên tâm hơn.",
    rating: 5,
    imageUrl: clinicLoungeImage,
  },
  {
    id: 3003,
    name: "Bạn Minh Anh",
    service: "Niềng răng",
    content:
      "Lịch hẹn gọn, khám kỹ và giao tiếp dễ chịu nên cả quá trình chỉnh nha không còn áp lực như mình từng nghĩ.",
    rating: 5,
    imageUrl: clinicConsultationImage,
  },
];

export const FALLBACK_POSTS = [
  {
    id: 4001,
    title: "Răng ê buốt kéo dài thì nên kiểm tra gì trước?",
    excerpt:
      "Những dấu hiệu như ê buốt khi uống lạnh, đau khi nhai hoặc nhức về đêm thường không nên tự bỏ qua quá lâu.",
    content:
      "Ê buốt kéo dài có thể liên quan đến men răng mòn, sâu răng, viêm nướu hoặc viêm tủy. Việc thăm khám sớm giúp xác định đúng nguyên nhân và tránh để cơn đau nặng hơn. Khi đến phòng khám, bác sĩ sẽ kiểm tra tình trạng hiện tại, chụp phim nếu cần và giải thích rõ phương án phù hợp trước khi điều trị.",
    imageUrl: clinicConsultationImage,
    category: "Kiến thức",
    createdAt: "2026-04-20T08:00:00.000Z",
  },
  {
    id: 4002,
    title: "Niềng răng cần chuẩn bị gì để lịch hẹn đầu nhẹ nhàng hơn?",
    excerpt:
      "Chuẩn bị sẵn nhu cầu, hình dung mục tiêu và lịch sinh hoạt sẽ giúp buổi tư vấn đầu diễn ra rõ ràng và tiết kiệm thời gian hơn.",
    content:
      "Trước buổi tư vấn niềng răng, bạn nên ghi chú những vấn đề mình đang quan tâm như răng chen chúc, hô, móm hay thói quen ăn nhai. Bác sĩ sẽ đánh giá khớp cắn, tư vấn lộ trình và giải thích những giai đoạn quan trọng để bạn dễ cân nhắc trước khi bắt đầu.",
    imageUrl: heroSmileImage,
    category: "Kiến thức",
    createdAt: "2026-04-16T08:00:00.000Z",
  },
  {
    id: 4003,
    title: "Ưu đãi thăm khám ban đầu cho khách đặt lịch sớm trong tuần",
    excerpt:
      "Một số khung giờ trong tuần được ưu tiên cho khách muốn kiểm tra tổng quát và nghe tư vấn rõ ràng trước khi quyết định điều trị.",
    content:
      "Phòng khám hiện mở thêm các khung giờ linh hoạt cho khách muốn thăm khám sớm trong tuần. Khi đặt lịch trước, bạn sẽ được giữ chỗ thuận tiện hơn, nhận hướng dẫn chuẩn bị trước buổi hẹn và dễ chủ động thời gian tái khám nếu cần.",
    imageUrl: clinicLoungeImage,
    category: "Tin tức",
    createdAt: "2026-04-12T08:00:00.000Z",
  },
];

export function getFallbackServiceImage(serviceName: string) {
  const name = serviceName.toLowerCase();

  if (name.includes("implant") || name.includes("phục hình") || name.includes("tháo lắp")) {
    return implantFeatureImage;
  }

  if (name.includes("sứ") || name.includes("tẩy trắng")) {
    return heroSmileImage;
  }

  return clinicConsultationImage;
}
