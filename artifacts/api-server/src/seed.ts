import {
  db,
  admins,
  banners,
  services,
  promotions,
  feedback,
  posts,
  settings,
  bookings,
} from "@workspace/db";

async function main() {
  // Admin
  const existingAdmins = await db.select().from(admins).limit(1);
  if (existingAdmins.length === 0) {
    await db.insert(admins).values({
      email: "admin@nhakhoaht.vn",
      password: "admin123",
    });
  }

  // Settings
  const existingSettings = await db.select().from(settings).limit(1);
  if (existingSettings.length === 0) {
    await db.insert(settings).values({});
  }

  // Banners
  const existingBanners = await db.select().from(banners).limit(1);
  if (existingBanners.length === 0) {
    await db.insert(banners).values([
      {
        title: "GRAND OPENING",
        subtitle:
          "Khuyến mãi đặc biệt: Cạo vôi 100.000đ • Trám răng 150.000đ • Voucher răng sứ Zirconia chỉ 1.900.000đ",
        imageUrl: "/images/banner-1.png",
        ctaText: "ĐẶT HẸN NGAY",
        sortOrder: 1,
      },
      {
        title: "RĂNG SỨ THẨM MỸ ZIRCONIA",
        subtitle:
          "Công nghệ Đức – Bảo hành chính hãng – Hoàn thiện nụ cười tự nhiên",
        imageUrl: "/images/banner-2.png",
        ctaText: "Tư vấn miễn phí",
        sortOrder: 2,
      },
      {
        title: "CẤY GHÉP IMPLANT AN TOÀN",
        subtitle:
          "Đội ngũ bác sĩ hơn 10 năm kinh nghiệm – Hơn 6.000 ca thành công",
        imageUrl: "/images/banner-3.png",
        ctaText: "Đặt lịch khám",
        sortOrder: 3,
      },
    ]);
  }

  // Services
  const existingServices = await db.select().from(services).limit(1);
  if (existingServices.length === 0) {
    await db.insert(services).values([
      {
        name: "Trám răng, nhổ răng, tiểu phẫu",
        description:
          "Điều trị triệt để các vấn đề sâu răng, viêm tủy với công nghệ hiện đại, không đau, an toàn.",
        imageUrl: "/images/service-1.png",
      },
      {
        name: "Tẩy trắng răng",
        description:
          "Công nghệ tẩy trắng răng laser hiện đại giúp răng trắng sáng tự nhiên chỉ sau 1 lần điều trị.",
        imageUrl: "/images/service-2.png",
      },
      {
        name: "Chữa tủy nội nha",
        description:
          "Bảo tồn răng thật, điều trị tủy chính xác bằng máy nội nha kỹ thuật số.",
        imageUrl: "/images/service-3.png",
      },
      {
        name: "Phục hình tháo lắp",
        description:
          "Răng giả tháo lắp thẩm mỹ, phục hồi chức năng ăn nhai và nụ cười tự nhiên.",
        imageUrl: "/images/service-4.png",
      },
      {
        name: "Phục hình cố định - Răng sứ Zirconia",
        description:
          "Răng sứ thẩm mỹ Zirconia cao cấp, độ bền vượt trội, màu sắc tự nhiên.",
        imageUrl: "/images/service-5.png",
      },
      {
        name: "Cấy ghép Implant",
        description:
          "Phục hồi răng mất bằng trụ Implant Hàn Quốc/Mỹ, bảo hành dài hạn.",
        imageUrl: "/images/service-6.png",
      },
    ]);
  }

  // Promotions
  const existingPromos = await db.select().from(promotions).limit(1);
  if (existingPromos.length === 0) {
    await db.insert(promotions).values([
      {
        title: "Cạo vôi răng siêu khuyến mãi",
        content: "Cạo vôi + đánh bóng răng toàn hàm",
        price: "100.000đ",
        validUntil: "31/12/2026",
      },
      {
        title: "Trám răng thẩm mỹ",
        content: "Trám răng Composite cao cấp 1 mặt",
        price: "150.000đ",
        validUntil: "31/12/2026",
      },
      {
        title: "Răng sứ Zirconia cao cấp",
        content: "Voucher giảm giá đặc biệt cho dịch vụ răng sứ Zirconia",
        price: "1.900.000đ",
        validUntil: "31/12/2026",
      },
      {
        title: "Miễn phí tư vấn & thăm khám",
        content: "Áp dụng cho tất cả khách hàng đến phòng khám",
        price: "0đ",
        validUntil: "31/12/2026",
      },
    ]);
  }

  // Feedback
  const existingFeedback = await db.select().from(feedback).limit(1);
  if (existingFeedback.length === 0) {
    await db.insert(feedback).values([
      {
        name: "Dương Quốc Hiệp",
        service: "Làm Sứ",
        content:
          "Dịch vụ rất tốt, bác sĩ tận tâm. Răng sứ đẹp tự nhiên, mình rất hài lòng!",
        rating: 5,
        imageUrl: "/images/feedback-1.png",
        approved: true,
      },
      {
        name: "Cô Mai Thị Cương",
        service: "Phục Hình Răng Sứ Zirconia",
        content:
          "Sau khi làm răng sứ tại Nha Khoa HT, mình tự tin hơn rất nhiều khi cười.",
        rating: 5,
        imageUrl: "/images/feedback-2.png",
        approved: true,
      },
      {
        name: "Cô Việt Kiều Mỹ",
        service: "Phục Hình Sứ Cercon HT 2 Hàm",
        content:
          "Tôi từ Mỹ về làm răng tại Nha Khoa HT, chất lượng quốc tế, giá hợp lý.",
        rating: 5,
        imageUrl: "/images/feedback-3.png",
        approved: true,
      },
      {
        name: "Anh Nguyễn Văn Hùng",
        service: "Cấy ghép Implant",
        content:
          "Cấy ghép Implant không đau, hồi phục nhanh, ăn uống bình thường sau 1 tuần.",
        rating: 5,
        imageUrl: "/images/feedback-4.png",
        approved: true,
      },
    ]);
  }

  // Posts
  const existingPosts = await db.select().from(posts).limit(1);
  if (existingPosts.length === 0) {
    await db.insert(posts).values([
      {
        title: "Trẻ em có nên khám răng sớm không?",
        excerpt:
          "Nên đưa trẻ khám răng 6 tháng/lần tại các nha khoa uy tín để phòng ngừa sâu răng và phát hiện sớm các vấn đề răng miệng.",
        content:
          "Khám răng định kỳ cho trẻ em là việc làm cần thiết để bảo vệ sức khỏe răng miệng. Bác sĩ khuyến cáo nên đưa trẻ đi khám răng từ khi mọc chiếc răng sữa đầu tiên...",
        imageUrl: "/images/blog-1.png",
        category: "Kiến thức",
      },
      {
        title: "Tác hại của việc nghiến răng khi ngủ",
        excerpt:
          "Nghiến răng (bruxism) thường xảy ra vô thức khi ngủ, gây mòn men răng, đau cơ hàm và rối loạn khớp thái dương hàm.",
        content:
          "Nghiến răng là hiện tượng phổ biến nhưng nhiều người không nhận ra. Tình trạng này có thể dẫn tới mòn răng, gãy răng, đau hàm...",
        imageUrl: "/images/blog-2.png",
        category: "Kiến thức",
      },
      {
        title: "Thực phẩm nào tốt cho răng miệng?",
        excerpt:
          "Hạn chế thực phẩm nhiều đường, nước có ga, đồ quá nóng/lạnh thường xuyên. Tăng cường rau xanh, trái cây và sữa.",
        content:
          "Chế độ ăn uống ảnh hưởng trực tiếp đến sức khỏe răng miệng. Một số thực phẩm giàu canxi, vitamin D giúp răng chắc khỏe...",
        imageUrl: "/images/blog-3.png",
        category: "Kiến thức",
      },
    ]);
  }

  // Bookings (a few sample for dashboard chart)
  const existingBookings = await db.select().from(bookings).limit(1);
  if (existingBookings.length === 0) {
    const now = Date.now();
    await db.insert(bookings).values([
      {
        name: "Lê Thị Hoa",
        phone: "0901234567",
        service: "Răng sứ Zirconia",
        appointmentTime: "2026-04-22 09:00",
        status: "Chưa xử lý",
        createdAt: new Date(now - 1000 * 60 * 60 * 2),
      },
      {
        name: "Nguyễn Văn An",
        phone: "0912345678",
        service: "Cạo vôi răng",
        appointmentTime: "2026-04-22 14:00",
        status: "Đã liên hệ",
        createdAt: new Date(now - 1000 * 60 * 60 * 24),
      },
      {
        name: "Trần Bích Ngọc",
        phone: "0987654321",
        service: "Tẩy trắng răng",
        appointmentTime: "2026-04-23 10:00",
        status: "Hoàn tất",
        createdAt: new Date(now - 1000 * 60 * 60 * 24 * 2),
      },
      {
        name: "Phạm Thanh Tùng",
        phone: "0938888888",
        service: "Cấy ghép Implant",
        appointmentTime: "2026-04-24 15:00",
        status: "Chưa xử lý",
        createdAt: new Date(now - 1000 * 60 * 60 * 24 * 3),
      },
      {
        name: "Hoàng Mỹ Linh",
        phone: "0969999999",
        service: "Trám răng",
        appointmentTime: "2026-04-25 09:30",
        status: "Đã liên hệ",
        createdAt: new Date(now - 1000 * 60 * 60 * 24 * 4),
      },
    ]);
  }

  console.log("Seed completed");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
