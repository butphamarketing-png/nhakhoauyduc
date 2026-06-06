-- ============================================
-- 🏥 NHA KHOA ĐĂNG KHOA - SEED DỮ LIỆU
-- ============================================
-- Copy toàn bộ nội dung này và chạy trong Supabase SQL Editor
-- ============================================

-- -------------------------------------------------
-- Bước 1: Tạo mới dữ liệu Admin
-- -------------------------------------------------
DELETE FROM admins;
INSERT INTO admins (email, password) VALUES 
('butphamarketing@gmail.com', 'nhakhoauyduc')
ON CONFLICT DO NOTHING;

-- -------------------------------------------------
-- Bước 2: Cài đặt ban đầu Settings
-- -------------------------------------------------
DELETE FROM settings;
INSERT INTO settings DEFAULT VALUES;

-- -------------------------------------------------
-- Bước 3: Thêm Banners cho Slideshow
-- -------------------------------------------------
DELETE FROM banners;
INSERT INTO banners (title, subtitle, image_url, cta_text, sort_order) VALUES 
('NHA KHOA ĐĂNG KHOA', 'Uy tín - Chất lượng - Tận tâm', '/images/COVER PAGE.jpg', 'ĐẶT LỊCH NGAY', 1),
('10.000+ CA RĂNG SỨ THÀNH CÔNG', 'Tin cậy, chất lượng, tận tâm', '/images/hero-slide-10000-rang-su.png', 'Tư vấn miễn phí', 2),
('DỊCH VỤ CHUYÊN NGHIỆP', 'Niềng răng, Implant, Răng sứ và nhiều hơn', '/images/hero-slide-01.png', 'Xem chi tiết', 3);

-- -------------------------------------------------
-- Bước 4: Thêm các Dịch vụ
-- -------------------------------------------------
DELETE FROM services;
INSERT INTO services (name, description, image_url) VALUES 
('Cấy ghép Implant', 'Trồng răng implant hiện đại, an toàn, bảo hành dài hạn.', '/images/service-implant.png'),
('Niềng răng', 'Niềng răng kim loại, sứ, Invisalign - đưa nụ cười hoàn hảo.', '/images/service-nieng-rang.png'),
('Nhổ răng khôn', 'Nhổ răng khôn không đau, an toàn, hồi phục nhanh.', '/images/service-nho-rang-khon.png'),
('Công nghệ iTero', 'Quét răng 3D hiện đại, không cần cạo răng dấu.', '/images/service-cong-nghe-itero.png');

-- -------------------------------------------------
-- Bước 5: Thêm các Chương trình Khuyến mãi
-- -------------------------------------------------
DELETE FROM promotions;
INSERT INTO promotions (title, content, price, valid_until, image_url) VALUES 
('Cần tiếp sớm - Ưu đãi đặc biệt', 'Ưu đãi đặc biệt cho khách hàng đến khám sớm.', 'Liên hệ', '31/12/2026', '/images/promo-can-tiep-som.png'),
('Chính nhà 10%', 'Giảm 10% cho dịch vụ niềng răng.', 'Giảm 10%', '31/12/2026', '/images/promo-chinh-nha-10.png'),
('Mua vàng chỉnh nha', 'Ưu đãi đặc biệt cho khách hàng chỉnh nha.', 'Ưu đãi', '31/12/2026', '/images/promo-mua-vang-chinh-nha.png'),
('Niềng răng hè', 'Chương trình khuyến mãi niềng răng mùa hè.', 'Khuyến mãi', '31/12/2026', '/images/promo-nieng-rang-he.png');

-- -------------------------------------------------
-- Bước 6: Thêm Phản hồi Khách hàng
-- -------------------------------------------------
DELETE FROM feedback;
INSERT INTO feedback (name, service, content, rating, image_url, approved) VALUES 
('Đàm Thị Lát', 'Niềng răng', 'Niềng răng tại Nha Khoa Đăng Khoa rất tốt, bác sĩ tận tâm, kết quả ưng ý!', 5, '/images/testimonial-dam-thi-lat.png', true),
('Lê Thị Thúy', 'Răng sứ', 'Răng sứ đẹp tự nhiên, mình rất hài lòng với dịch vụ!', 5, '/images/testimonial-le-thi-thuy.png', true),
('Nguyễn Đình Phương', 'Implant', 'Cấy ghép implant không đau, hồi phục nhanh!', 5, '/images/testimonial-nguyen-dinh-phuong.png', true),
('Nguyễn Thị Kim Hạnh', 'Tẩy trắng', 'Tẩy trắng răng nhanh, hiệu quả, răng trắng sáng tự nhiên!', 5, '/images/testimonial-nguyen-thi-kim-hanh.png', true);

-- -------------------------------------------------
-- Bước 7: Thêm các Bài viết Tin tức & Kiến thức
-- -------------------------------------------------
DELETE FROM posts;
INSERT INTO posts (title, excerpt, content, image_url, category) VALUES 
(
    'Niềng Răng Có Đau Không? Chia Sẻ Thực Tế Trước Khi Quyết Định',
    'Niềng răng là giải pháp phổ biến để cải thiện thẩm mỹ nụ cười. Tuy nhiên, nhiều người vẫn băn khoăn về mức độ đau khi niềng. Hãy cùng tìm hiểu sự thật.',
    '<h2>Niềng răng có đau không?</h2><p>Đây là câu hỏi mà hầu hết bệnh nhân đều hỏi trước khi quyết định niềng răng. Thực tế, cảm giác đau khi niềng răng là <strong>khác nhau với mỗi người</strong>, phụ thuộc vào nhiều yếu tố như ngưỡng chịu đau, loại niềng răng và tình trạng răng ban đầu.</p><h3>Những thời điểm có thể cảm thấy khó chịu</h3><ul><li><strong>Khi lắp niềng lần đầu:</strong> Trong 24-48 giờ đầu sau khi lắp niềng, bạn có thể cảm thấy ê buốt và áp lực lên răng. Đây là dấu hiệu cho thấy răng đang bắt đầu di chuyển.</li><li><strong>Mỗi lần siết dây:</strong> Thông thường mỗi tháng, bác sĩ sẽ siết lại niềng để điều chỉnh. Sau buổi điều chỉnh, bạn có thể cảm thấy ê buốt trong 2-3 ngày.</li></ul>',
    'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80',
    'Niềng răng'
),
(
    'Trồng Răng Implant Là Gì? Quy Trình Và Lợi Ích Chi Tiết',
    'Trồng răng implant là phương pháp phục hồi răng hiện đại nhất hiện nay, giúp khôi phục chức năng ăn nhai và thẩm mỹ một cách tự nhiên như răng thật.',
    '<h2>Trồng răng implant là gì?</h2><p>Implant là một trụ titanium được cấy ghép vào xương hàm để thay thế chân răng đã mất. Sau khi trụ implant tích hợp với xương (thường 3-6 tháng), bác sĩ sẽ lắp mão sứ lên trên, tạo ra chiếc răng mới có hình dạng và chức năng như răng thật.</p><h3>Lợi ích của trồng răng implant</h3><ul><li><strong>Chức năng như răng thật:</strong> Ăn nhai, nói chuyện hoàn toàn tự nhiên</li><li><strong>Thẩm mỹ cao:</strong> Răng implant có màu sắc và hình dạng giống răng thật</li></ul>',
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
    'Trồng răng implant'
),
(
    'Bọc Răng Sứ Giá Bao Nhiêu? Ưu Điểm Và Lưu Ý Quan Trọng',
    'Bọc răng sứ là phương pháp phục hồi thẩm mỹ răng được nhiều người lựa chọn. Tìm hiểu chi phí, ưu nhược điểm và những điều cần lưu ý trước khi quyết định bọc răng sứ.',
    '<h2>Bọc răng sứ là gì?</h2><p>Bọc răng sứ (hay còn gọi là kap phục hình sứ) là phương pháp mà bác sĩ sẽ mài nhỏ răng thật và lắp một vỏ sứ bọc bên ngoài để phục hồi hình dạng, màu sắc và chức năng của răng.</p>',
    'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=800&q=80',
    'Bọc răng sứ'
),
(
    '10 Sai Lầm Thường Gặp Khi Chải Răng Mà Bạn Cần Tránh',
    'Chải răng tưởng chừng đơn giản nhưng nhiều người vẫn mắc những sai lầm khiến răng không sạch và dễ bị tổn thương. Hãy cùng điểm qua để có thói quen vệ sinh răng miệng đúng cách.',
    '<h2>10 sai lầm phổ biến khi chải răng</h2><p>Theo các chuyên gia nha khoa, khoảng 80% người trưởng thành mắc các bệnh về nướu liên quan đến vệ sinh răng miệng kém. Chải răng sai cách có thể dẫn đến sâu răng, viêm nướu, hôi miệng và nhiều vấn đề nghiêm trọng khác.</p>',
    'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80',
    'Chăm sóc răng miệng'
),
(
    'ĐÓN TẾT BÌNH NGỌ – RẠNG RỠ NỤ CƯỜI ĐÓN XUÂN',
    'Tết đến là lúc ai cũng muốn chỉnh chu hơn cho nụ cười, để tự tin gặp gỡ gia đình, bạn bè và người thân. Cùng Nha Khoa Đăng Khoa chào đón năm mới với nụ cười rạng rỡ nhất!',
    '<h2>Nụ cười rạng rỡ - Món quà cho bản thân dịp Tết</h2><p>Tết Nguyên Đán là dịp để sum họp, gặp gỡ người thân và bạn bè. Một nụ cười tự tin, tỏa sáng sẽ giúp bạn gây ấn tượng tốt trong mọi cuộc gặp gỡ.</p>',
    'https://images.unsplash.com/photo-1483375443283-1f5a5a5d4c23?w=800&q=80',
    'Khuyến mãi'
),
(
    'Vì Sao Nên Khám Răng Định Kỳ? Những Lợi Ích Không Ngờ',
    'Nhiều người chỉ đi khám răng khi đau hoặc có vấn đề. Tuy nhiên, việc khám răng định kỳ 6 tháng/lần là cách tốt nhất để phòng ngừa bệnh lý răng miệng và tiết kiệm chi phí dài hạn.',
    '<h2>Lợi ích của việc khám răng định kỳ</h2><p>Việc khám răng định kỳ giúp bạn duy trì sức khỏe răng miệng tốt và tránh những chi phí điều trị tốn kém về sau.</p>',
    'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=800&q=80',
    'Kiến thức'
);

-- -------------------------------------------------
-- HOÀN THÀNH!
-- -------------------------------------------------
SELECT '✅ Seed dữ liệu Nha Khoa Đăng Khoa thành công!' AS message;
