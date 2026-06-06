-- ============================================
-- 🖼️ CẬP NHẬT HÌNH ẢNH CỦA CÁC BẢN GHI HIỆN CÓ
-- ============================================
-- Copy toàn bộ và chạy trong Supabase SQL Editor
-- ============================================

-- -------------------------------------------------
-- Cập nhật Banners
-- -------------------------------------------------
UPDATE banners SET image_url = '/images/COVER PAGE.jpg' WHERE sort_order = 1;
UPDATE banners SET image_url = '/images/hero-slide-10000-rang-su.png' WHERE sort_order = 2;
UPDATE banners SET image_url = '/images/hero-slide-01.png' WHERE sort_order = 3;

-- -------------------------------------------------
-- Cập nhật Services (theo tên dịch vụ)
-- -------------------------------------------------
UPDATE services SET image_url = '/images/service-implant.png' WHERE name LIKE '%Implant%' OR name LIKE '%trồng%';
UPDATE services SET image_url = '/images/service-nieng-rang.png' WHERE name LIKE '%Niềng%' OR name LIKE '%nieng%';
UPDATE services SET image_url = '/images/service-nho-rang-khon.png' WHERE name LIKE '%Nhổ%' OR name LIKE '%nho%';
UPDATE services SET image_url = '/images/service-cong-nghe-itero.png' WHERE name LIKE '%iTero%' OR name LIKE '%công nghệ%';

-- -------------------------------------------------
-- Cập nhật Promotions (theo tên chương trình)
-- -------------------------------------------------
UPDATE promotions SET image_url = '/images/promo-can-tiep-som.png' WHERE title LIKE '%cần tiếp%' OR title LIKE '%sớm%';
UPDATE promotions SET image_url = '/images/promo-chinh-nha-10.png' WHERE title LIKE '%chính nhà%' OR title LIKE '%10%';
UPDATE promotions SET image_url = '/images/promo-mua-vang-chinh-nha.png' WHERE title LIKE '%mua vàng%';
UPDATE promotions SET image_url = '/images/promo-nieng-rang-he.png' WHERE title LIKE '%niềng%' OR title LIKE '%hè%';

-- -------------------------------------------------
-- Cập nhật Feedback (testimonials)
-- -------------------------------------------------
UPDATE feedback SET image_url = '/images/testimonial-dam-thi-lat.png' WHERE name = 'Đàm Thị Lát';
UPDATE feedback SET image_url = '/images/testimonial-le-thi-thuy.png' WHERE name = 'Lê Thị Thúy';
UPDATE feedback SET image_url = '/images/testimonial-nguyen-dinh-phuong.png' WHERE name = 'Nguyễn Đình Phương';
UPDATE feedback SET image_url = '/images/testimonial-nguyen-thi-kim-hanh.png' WHERE name = 'Nguyễn Thị Kim Hạnh';

-- -------------------------------------------------
-- Cập nhật Posts (bài viết)
-- -------------------------------------------------
UPDATE posts SET image_url = 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80' WHERE category = 'Niềng răng';
UPDATE posts SET image_url = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80' WHERE category = 'Trồng răng implant';
UPDATE posts SET image_url = 'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=800&q=80' WHERE category = 'Bọc răng sứ';
UPDATE posts SET image_url = 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80' WHERE category = 'Chăm sóc răng miệng';
UPDATE posts SET image_url = 'https://images.unsplash.com/photo-1483375443283-1f5a5a5d4c23?w=800&q=80' WHERE category = 'Khuyến mãi';
UPDATE posts SET image_url = 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=800&q=80' WHERE category = 'Kiến thức';

-- -------------------------------------------------
-- HOÀN THÀNH!
-- -------------------------------------------------
SELECT '✅ Cập nhật hình ảnh thành công!' AS message;
