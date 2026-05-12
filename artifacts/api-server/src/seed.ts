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
import { eq } from "drizzle-orm";

async function main() {
  // Admin
  const existingAdmins = await db.select().from(admins).limit(1);
  if (existingAdmins.length === 0) {
    await db.insert(admins).values({
      email: "butphamarketing@gmail.com",
      password: "nhakhoauyduc",
    });
  } else {
    await db
      .update(admins)
      .set({
        email: "butphamarketing@gmail.com",
        password: "nhakhoauyduc",
      })
      .where(eq(admins.id, existingAdmins[0].id));
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
        title: "Niềng Răng Có Đau Không? Chia Sẻ Thực Tế Trước Khi Quyết Định",
        excerpt:
          "Niềng răng là giải pháp phổ biến để cải thiện thẩm mỹ nụ cười. Tuy nhiên, nhiều người vẫn băn khoăn về mức độ đau khi niềng. Hãy cùng tìm hiểu sự thật.",
        content: `<h2>Niềng răng có đau không?</h2>
<p>Đây là câu hỏi mà hầu hết bệnh nhân đều hỏi trước khi quyết định niềng răng. Thực tế, cảm giác đau khi niềng răng là <strong>khác nhau với mỗi người</strong>, phụ thuộc vào nhiều yếu tố như ngưỡng chịu đau, loại niềng răng và tình trạng răng ban đầu.</p>

<h3>Những thời điểm có thể cảm thấy khó chịu</h3>
<ul>
<li><strong>Khi lắp niềng lần đầu:</strong> Trong 24-48 giờ đầu sau khi lắp niềng, bạn có thể cảm thấy ê buốt và áp lực lên răng. Đây là dấu hiệu cho thấy răng đang bắt đầu di chuyển.</li>
<li><strong>Mỗi lần siết dây:</strong> Thông thường mỗi tháng, bác sĩ sẽ siết lại niềng để điều chỉnh. Sau buổi điều chỉnh, bạn có thể cảm thấy ê buốt trong 2-3 ngày.</li>
<li><strong>Khi thay các khí cụ mới:</strong> Nếu sử dụng niềng răng Invisalign hoặc các khí cụ tháo lắp, mỗi lần đổi khí cụ mới cũng có thể gây ê buốt nhẹ.</li>
</ul>

<h3>Mẹo giảm đau khi niềng răng</h3>
<ul>
<li>Sử dụng sáp nha khoa để bảo vệ môi và má khỏi cọ xát với niềng</li>
<li>Ăn thức ăn mềm trong những ngày đầu sau khi lắp hoặc siết niềng</li>
<li>Uống nước lạnh hoặc sử dụng đá lạnh để giảm sưng và ê buốt</li>
<li>Bác sĩ có thể kê thuốc giảm đau nhẹ nếu cần thiết</li>
</ul>

<h3>So sánh mức độ đau giữa các loại niềng</h3>
<p><strong>Niềng kim loại truyền thống:</strong> Thường gây ê buốt nhiều nhất do có nhiều thành phần kim loại tiếp xúc trực tiếp với mô mềm.</p>
<p><strong>Niềng sứ:</strong> Ít gây kích ứng hơn so với kim loại, đồng thời thẩm mỹ hơn.</p>
<p><strong>Niềng Invisalign:</strong> Được coi là ít đau nhất vì khí cụ trơn tru và dễ tháo lắp.</p>

<h3>Kết luận</h3>
<p>Niềng răng không đau như nhiều người tưởng tượng. Nếu bạn đang có ý định niềng răng, hãy đặt lịch tư vấn để được bác sĩ thăm khám và tư vấn phương án phù hợp nhất cho tình trạng của bạn.</p>`,
        imageUrl:
          "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80",
        category: "Niềng răng",
      },
      {
        title: "Trồng Răng Implant Là Gì? Quy Trình Và Lợi Ích Chi Tiết",
        excerpt:
          "Trồng răng implant là phương pháp phục hồi răng hiện đại nhất hiện nay, giúp khôi phục chức năng ăn nhai và thẩm mỹ một cách tự nhiên như răng thật.",
        content: `<h2>Trồng răng implant là gì?</h2>
<p>Implant là một trụ titanium được cấy ghép vào xương hàm để thay thế chân răng đã mất. Sau khi trụ implant tích hợp với xương (thường 3-6 tháng), bác sĩ sẽ lắp mão sứ lên trên, tạo ra chiếc răng mới có hình dáng và chức năng như răng thật.</p>

<h3>Quy trình trồng răng implant tại Nha Khoa Uy Đức</h3>
<ol>
<li><strong>Bước 1 - Thăm khám và chụp phim:</strong> Bác sĩ sẽ kiểm tra tình trạng răng miệng, chụp phim CT 3D để đánh giá chất lượng và mật độ xương hàm.</li>
<li><strong>Bước 2 - Lập kế hoạch điều trị:</strong> Dựa trên kết quả khám, bác sĩ sẽ lên kế hoạch chi tiết về vị trí cấy ghép, loại implant phù hợp và thời gian điều trị.</li>
<li><strong>Bước 3 - Cấy ghép trụ implant:</strong> Bác sĩ sẽ phẫu thuật đặt trụ titanium vào xương hàm dưới gây tê cục bộ, quá trình diễn ra trong khoảng 30-60 phút.</li>
<li><strong>Bước 4 - Chờ tích hợp xương:</strong> Trụ implant cần thời gian 3-6 tháng để tích hợp với xương hàm (osseointegration).</li>
<li><strong>Bước 5 - Lắp abutment và mão sứ:</strong> Khi implant đã ổn định, bác sĩ sẽ lắp trụ nối (abutment) và mão sứ lên trên.</li>
</ol>

<h3>Lợi ích của trồng răng implant</h3>
<ul>
<li><strong>Chức năng như răng thật:</strong> Ăn nhai, nói chuyện hoàn toàn tự nhiên</li>
<li><strong>Thẩm mỹ cao:</strong> Răng implant có màu sắc và hình dáng giống răng thật</li>
<li><strong>Bảo tồn xương hàm:</strong> Ngăn ngừa tiêu xương - vấn đề thường gặp khi mất răng</li>
<li><strong>Độ bền lâu dài:</strong> Với chăm sóc đúng cách, implant có thể sử dụng trọn đời</li>
<li><strong>Không ảnh hưởng răng bên cạnh:</strong> Không cần mài răng kế cận như cầu răng sứ</li>
</ul>`,
        imageUrl:
          "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
        category: "Trồng răng implant",
      },
      {
        title: "Bọc Răng Sứ Giá Bao Nhiêu? Ưu Điểm Và Lưu Ý Quan Trọng",
        excerpt:
          "Bọc răng sứ là phương pháp phục hồi thẩm mỹ răng được nhiều người lựa chọn. Tìm hiểu chi phí, ưu nhược điểm và những điều cần lưu ý trước khi quyết định bọc răng sứ.",
        content: `<h2>Bọc răng sứ là gì?</h2>
<p>Bọc răng sứ (hay còn gọi là kap phục hình sứ) là phương pháp mà bác sĩ sẽ mài nhỏ răng thật và lắp một vỏ sứ bọc bên ngoài để phục hồi hình dáng, màu sắc và chức năng của răng.</p>

<h3>Các trường hợp cần bọc răng sứ</h3>
<ul>
<li>Răng sâu nặng, đã điều trị tủy nhưng răng giòn và dễ vỡ</li>
<li>Răng bị mòn, sứt mẻ hoặc gãy do chấn thương</li>
<li>Răng đổi màu không thể tẩy trắng được</li>
<li>Răng thưa nhẹ hoặc hình dáng không đều</li>
<li>Làm cầu răng sứ để thay thế răng mất</li>
</ul>

<h3>Loại răng sứ phổ biến hiện nay</h3>
<ol>
<li><strong>Răng sứ kim loại:</strong> Giá thành hợp lý, độ bền tốt. Tuy nhiên, có khung kim loại bên trong nên thẩm mỹ không hoàn toàn tự nhiên.</li>
<li><strong>Răng sứ zirconia:</strong> Không chứa kim loại, thẩm mỹ cao, độ bền tốt, phù hợp với nhiều vị trí răng.</li>
<li><strong>Răng sứ Emax:</strong> Loại cao cấp với độ trong suốt tự nhiên, phù hợp với răng cửa, mang lại nụ cười thẩm mỹ tối ưu.</li>
</ol>`,
        imageUrl:
          "https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=800&q=80",
        category: "Bọc răng sứ",
      },
      {
        title: "10 Sai Lầm Thường Gặp Khi Chải Răng Mà Bạn Cần Tránh",
        excerpt:
          "Chải răng tưởng chừng đơn giản nhưng nhiều người vẫn mắc những sai lầm khiến răng không sạch và dễ bị tổn thương. Hãy cùng điểm qua để có thói quen vệ sinh răng miệng đúng cách.",
        content: `<h2>10 sai lầm phổ biến khi chải răng</h2>
<p>Theo các chuyên gia nha khoa, khoảng 80% người trưởng thành mắc các bệnh về nướu liên quan đến vệ sinh răng miệng kém. Chải răng sai cách có thể dẫn đến sâu răng, viêm nướu, hôi miệng và nhiều vấn đề nghiêm trọng khác.</p>

<ul>
<li><strong>Chải răng quá mạnh:</strong> Làm mòn men răng và tổn thương nướu.</li>
<li><strong>Không chải đủ thời gian:</strong> Cần chải ít nhất 2 phút mỗi lần.</li>
<li><strong>Chải răng ngay sau khi ăn:</strong> Acid trong thức ăn làm mềm men răng, chải ngay sẽ làm mòn răng.</li>
<li><strong>Sử dụng bàn chải cũ:</strong> Thay bàn chải định kỳ 3 tháng/lần.</li>
<li><strong>Bỏ qua lưỡi:</strong> Lưỡi là nơi tích tụ nhiều vi khuẩn gây hôi miệng.</li>
</ul>`,
        imageUrl:
          "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80",
        category: "Chăm sóc răng miệng",
      },
      {
        title: "ĐÓN TẾT BÌNH NGỌ – RẠNG RỠ NỤ CƯỜI ĐÓN XUÂN",
        excerpt:
          "Tết đến là lúc ai cũng muốn chỉnh chu hơn cho nụ cười, để tự tin gặp gỡ gia đình, bạn bè và người thân. Cùng Nha Khoa Uy Đức Smile chào đón năm mới với nụ cười rạng rỡ nhất!",
        content: `<h2>Nụ cười rạng rỡ đón Tết</h2>
<p>Tết Nguyên Đán là dịp để sum họp, gặp gỡ người thân và bạn bè. Một nụ cười tự tin, tỏa sáng sẽ giúp bạn gây ấn tượng tốt trong mọi cuộc gặp gỡ. Đừng để những vấn đề về răng miệng làm giảm niềm vui đón Tết của bạn.</p>

<h3>Dịch vụ nha khoa nên làm trước Tết</h3>
<ul>
<li><strong>Tẩy trắng răng:</strong> Để có nụ cười tỏa sáng trong những bức ảnh ngày Tết</li>
<li><strong>Trám răng sâu:</strong> Điều trị sâu răng trước khi nó trở nên nghiêm trọng</li>
<li><strong>Lấy cao răng:</strong> Loại bỏ cao răng giúp răng sạch hơn và hơi thở thơm tho</li>
</ul>`,
        imageUrl:
          "https://images.unsplash.com/photo-1483375443283-1f5a5a5d4c23?w=800&q=80",
        category: "Khuyến mãi",
      },
      {
        title: "Vì Sao Nên Khám Răng Định Kỳ? Những Lợi Ích Không Ngờ",
        excerpt:
          "Nhiều người chỉ đi khám răng khi đau hoặc có vấn đề. Tuy nhiên, việc khám răng định kỳ 6 tháng/lần là cách tốt nhất để phòng ngừa bệnh lý răng miệng và tiết kiệm chi phí dài hạn.",
        content: `<h2>Lợi ích của việc khám răng định kỳ</h2>
<p>Việc khám răng định kỳ giúp bạn duy trì sức khỏe răng miệng tốt và tránh những chi phí điều trị tốn kém về sau.</p>

<ul>
<li><strong>Phát hiện sớm sâu răng:</strong> Điều trị sớm giúp bảo tồn răng thật tối đa.</li>
<li><strong>Ngăn ngừa bệnh nướu:</strong> Phát hiện và điều trị viêm nướu trước khi tiến triển thành nha chu.</li>
<li><strong>Loại bỏ cao răng:</strong> Giúp răng sạch sẽ và hơi thở thơm tho.</li>
<li><strong>Tiết kiệm chi phí:</strong> Phòng bệnh luôn rẻ hơn chữa bệnh.</li>
</ul>`,
        imageUrl:
          "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=800&q=80",
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
