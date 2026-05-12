-- Bài viết tin tức cho Nha Khoa Uy Đức Smile
-- Lấy ảnh từ nguồn miễn phí

-- Xóa bài viết cũ (nếu có)
DELETE FROM posts;

-- Bài 1: Niềng răng
INSERT INTO posts (title, excerpt, content, image_url, category, created_at) VALUES
(
  'Niềng Răng Có Đau Không? Chia Sẻ Thực Tế Trước Khi Quyết Định',
  'Niềng răng là giải pháp phổ biến để cải thiện thẩm mỹ nụ cười. Tuy nhiên, nhiều người vẫn băn khoăn về mức độ đau khi niềng. Hãy cùng tìm hiểu sự thật.',
  '<h2>Niềng răng có đau không?</h2>
<p>Đây là câu hỏi mà hầu hết bệnh nhân đều hỏi trước khi quyết định niềng răng. Thực tế, cảm giác đau khi niềng răng là <strong>khác nhau với mỗi người</strong>, phụ thuộc vào nhiều yếu tố như ngưỡng chịu đau, loại niềng răng và tình trạng răng ban đầu.</p>

<h3>Những thời điểm có thể cảm thấy khó chịu</h3>
<ul>
<li><strong>Khi lắp niềng lần đầu:</strong> Trong 24-48 giờ đầu sau khi lắp niềng, bạn có thể cảm thấy ê buốt và áp lực lên răng. Đây là dấu hiệu cho thấy răng đang bắt đầu di chuyển.</li>
<li><strong>Mỗi lần siết dây:</strong> Thông thường mỗi tháng, bác sĩ sẽ siết lại niềng để điều chỉnh. Sau buổi điều chỉnh, bạn có thể cảm thấy ê buốt trong 2-3 ngày.</li>
<li><strong>Khi thay các khí cụ mới:</strong> Nếu sử dụng niềng răng Invisalign hoặc các khí cụ tháo lắp, mỗi lần đổi khí cụ mới cũng có thể gây ê buốt nhẹ.</li>
</ul>

<h3>Mẹo giảm đau khi niềng răng</h3>
<ul>
<li>Sử dụng sáp nha khoa để bảo vệ môi và щёки khỏi cọ xát với niềng</li>
<li>Ăn thức ăn mềm trong những ngày đầu sau khi lắp hoặc siết niềng</li>
<li>Uống nước lạnh hoặc sử dụng đá lạnh để giảm sưng và ê buốt</li>
<li>Bác sĩ có thể kê thuốc giảm đau nhẹ nếu cần thiết</li>
<li>Dùng gel gây tê tại chỗ nếu cảm thấy khó chịu ở десна</li>
</ul>

<h3>So sánh mức độ đau giữa các loại niềng</h3>
<p><strong>Niềng kim loại truyền thống:</strong> Thường gây ê buốt nhiều nhất do có nhiều thành phần kim loại tiếp xúc trực tiếp với mô mềm.</p>
<p><strong>Niềng sứ:</strong> Ít gây kích ứng hơn so với kim loại, đồng thời thẩm mỹ hơn.</p>
<p><strong>Niềng Invisalign:</strong> Được coi là ít đau nhất vì khí cụ trơn tru và dễ tháo lắp.</p>

<h3>Kết luận</h3>
<p>Niềng răng không đau như nhiều người tưởng tượng. Nếu bạn đang có ý định niềng răng, hãy đặt lịch tư vấn để được bác sĩ thăm khám và tư vấn phương án phù hợp nhất cho tình trạng của bạn.</p>',
  'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80',
  'Niềng răng',
  NOW() - INTERVAL ''5 days''
);

-- Bài 2: Trồng răng implant
INSERT INTO posts (title, excerpt, content, image_url, category, created_at) VALUES
(
  'Trồng Răng Implant Là Gì? Quy Trình Và Lợi Ích Chi Tiết',
  'Trồng răng implant là phương pháp phục hồi răng hiện đại nhất hiện nay, giúp khôi phục chức năng ăn nhai và thẩm mỹ một cách tự nhiên như răng thật.',
  '<h2>Trồng răng implant là gì?</h2>
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
</ul>

<h3>Đối tượng phù hợp trồng răng implant</h3>
<p>Người từ 18 tuổi trở lên, có sức khỏe tốt, không mắc các bệnh lý mãn tính kiểm soát kém, và có đủ xương hàm để cấy ghép. Bác sĩ sẽ thăm khám và đánh giá cụ thể từng trường hợp.</p>

<h3>Bảng giá tham khảo</h3>
<p>Giá trồng răng implant phụ thuộc vào loại implant, mão sứ và tình trạng xương hàm của mỗi bệnh nhân. Hãy liên hệ để được tư vấn chi tiết và báo giá chính xác.</p>',
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
  'Trồng răng implant',
  NOW() - INTERVAL ''10 days''
);

-- Bài 3: Bọc răng sứ
INSERT INTO posts (title, excerpt, content, image_url, category, created_at) VALUES
(
  'Bọc Răng Sứ Giá Bao Nhiêu? Ưu Điểm Và Lưu Ý Quan Trọng',
  'Bọc răng sứ là phương pháp phục hồi thẩm mỹ răng được nhiều người lựa chọn. Tìm hiểu chi phí, ưu nhược điểm và những điều cần lưu ý trước khi quyết định bọc răng sứ.',
  '<h2>Bọc răng sứ là gì?</h2>
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
<li><strong>Răng sứ Ceramic:</strong> Giá thành vừa phải, thẩm mỹ đẹp, phù hợp cho nhiều đối tượng.</li>
</ol>

<h3>Bảng giá bọc răng sứ (tham khảo)</h3>
<table>
<tr><th>Loại răng sứ</th><th>Giá (VNĐ/răng)</th></tr>
<tr><td>Răng sứ kim loại</td><td>1.500.000 - 2.500.000</td></tr>
<tr><td>Răng sứ Ceramic</td><td>2.500.000 - 4.000.000</td></tr>
<tr><td>Răng sứ Zirconia</td><td>4.000.000 - 7.000.000</td></tr>
<tr><td>Răng sứ Emax</td><td>6.000.000 - 10.000.000</td></tr>
</table>

<h3>Quy trình bọc răng sứ</h3>
<ol>
<li>Thăm khám, chụp phim và lên kế hoạch điều trị</li>
<li>Mài răng theo tỷ lệ chuẩn (thường mài 0.5-2mm tùy loại răng sứ)</li>
<li>Lấy dấu răng hoặc scan 3D để chế tác mão sứ</li>
<li>Thử mão sứ tạm và điều chỉnh nếu cần</li>
<li>Lắp mão sứ vĩnh viễn bằng xi măng chuyên dụng</li>
</ol>

<h3>Lưu ý sau khi bọc răng sứ</h3>
<ul>
<li>Tránh ăn thức ăn quá cứng hoặc dai trong vài ngày đầu</li>
<li>Vệ sinh răng miệng kỹ lưỡng, sử dụng chỉ tơ nha khoa</li>
<li>Thăm khám định kỳ 6 tháng/lần để kiểm tra</li>
<li>Nếu cảm thấy ê buốt kéo dài, liên hệ bác sĩ ngay</li>
</ul>',
  'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=800&q=80',
  'Bọc răng sứ',
  NOW() - INTERVAL ''15 days''
);

-- Bài 4: 10 sai lầm khi chải răng
INSERT INTO posts (title, excerpt, content, image_url, category, created_at) VALUES
(
  '10 Sai Lầm Thường Gặp Khi Chải Răng Mà Bạn Cần Tránh',
  'Chải răng tưởng chừng đơn giản nhưng nhiều người vẫn mắc những sai lầm khiến răng không sạch và dễ bị tổn thương. Hãy cùng điểm qua để có thói quen vệ sinh răng miệng đúng cách.',
  '<h2>Tại sao chải răng đúng cách lại quan trọng?</h2>
<p>Theo các chuyên gia nha khoa, khoảng 80% người trưởng thành mắc các bệnh về nướu liên quan đến vệ sinh răng miệng kém. Chải răng sai cách có thể dẫn đến sâu răng, viêm nướu, hôi miệng và nhiều vấn đề nghiêm trọng khác.</p>

<h3>10 sai lầm phổ biến khi chải răng</h3>

<h4>1. Chải răng quá mạnh</h4>
<p>Nhiều người nghĩ chải mạnh sẽ sạch hơn, nhưng thực tế đây là một trong những sai lầm nguy hiểm nhất. Chải quá mạnh có thể làm mòn men răng, tổn thương nướu và gây tụt десна. Hãy chải nhẹ nhàng với bàn chải lông mềm.</p>

<h4>2. Không chải đủ thời gian</h4>
<p>Thời gian chải răng tối thiểu là 2 phút, 2 lần/ngày. Hầu hết mọi người chỉ chải trung bình 45 giây. Sử dụng đồng hồ hoặc bàn chải điện có hẹn giờ để đảm bảo đủ thời gian.</p>

<h4>3. Chải răng ngay sau khi ăn</h4>
<p>Sau khi ăn, acid trong thức ăn làm mềm men răng. Chải răng ngay lập tức sẽ làm men răng bị mài mòn nhanh hơn. Hãy đợi ít nhất 30-60 phút sau khi ăn hoặc uống đồ ngọt.</p>

<h4>4. Sử dụng bàn chải cũ</h4>
<p>Lông bàn chải sau 3-4 tháng sẽ bị mòn và không làm sạch hiệu quả. Thay bàn chải định kỳ 3 tháng/lần hoặc sớm hơn nếu lông bàn chải đã xù ra.</p>

<h4>5. Kỹ thuật chải sai</h4>
<p>Chải răng theo chiều ngang có thể gây tổn thương đường tiếp xúc giữa răng và nướu. Thay vào đó, hãy chải theo chiều dọc hoặc chuyển động tròn nhẹ nhàng.</p>

<h4>6. Bỏ qua lưỡi</h4>
<p>Lưỡi là nơi tích tụ vi khuẩn gây hôi miệng. Sau khi chải răng, hãy nhẹ nhàng chải lưỡi hoặc sử dụng dụng cụ cạo lưỡi chuyên dụng.</p>

<h4>7. Không sử dụng chỉ tơ nha khoa</h4>
<p>Bàn chải chỉ làm sạch được 60% bề mặt răng. 40% còn lại (bề mặt giữa các răng) cần được làm sạch bằng chỉ tơ nha khoa mỗi ngày.</p>

<h4>8. Sử dụng kem đánh răng không phù hợp</h4>
<p>Kem đánh răng có chất tẩy trắng mạng hoặc quá nhiều flouride có thể gây hại nếu sử dụng không đúng cách. Chọn kem đánh răng phù hợp với tình trạng răng miệng của bạn.</p>

<h4>9. Chải răng quá nhiều lần</h4>
<p>Chải răng hơn 3 lần/ngày hoặc ngay sau khi ăn có thể gây mài mòn men răng. 2 lần/ngày là đủ nếu bạn duy trì chế độ ăn uống hợp lý.</p>

<h4>10. Khám nha khoa định kỳ</h4>
<p>Nhiều người chỉ đi khám khi có vấn đề. Việc khám định kỳ 6 tháng/lần giúp phát hiện sớm các vấn đề và điều trị kịp thời, tiết kiệm chi phí.</p>

<h3>Hướng dẫn chải răng đúng cách</h3>
<ol>
<li>Đặt bàn chải 45 độ so với đường nướu</li>
<li>Chải nhẹ nhàng theo chuyển động tròn</li>
<li>Chải cả mặt ngoài, mặt trong và mặt nhai của răng</li>
<li>Chải lưỡi để loại bỏ vi khuẩn</li>
<li>Sử dụng chỉ tơ nha khoa sau khi chải răng</li>
<li>Súc miệng với nước hoặc nước muối loãng</li>
</ol>',
  'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80',
  'Chăm sóc răng miệng',
  NOW() - INTERVAL ''20 days''
);

-- Bài 5: Đón Tết
INSERT INTO posts (title, excerpt, content, image_url, category, created_at) VALUES
(
  'ĐÓN TẾT BÌNH NGỌ – RẠNG RỠ NỤ CƯỜI ĐÓN XUÂN',
  'Tết đến là lúc ai cũng muốn chỉnh chu hơn cho nụ cười, để tự tin gặp gỡ gia đình, bạn bè và người thân. Cùng Nha Khoa Uy Đức Smile chào đón năm mới với nụ cười rạng rỡ nhất!',
  '<h2>Nụ cười rạng rỡ - Món quà cho bản thân dịp Tết</h2>
<p>Tết Nguyên Đán là dịp để sum họp, gặp gỡ người thân và bạn bè. Một nụ cười tự tin, tỏa sáng sẽ giúp bạn gây ấn tượng tốt trong mọi cuộc gặp gỡ. Đừng để những vấn đề về răng miệng làm giảm niềm vui đón Tết của bạn.</p>

<h3>Những vấn đề răng miệng thường gặp dịp Tết</h3>
<ul>
<li><strong>Đau răng do ăn nhiều đồ ngọt:</strong> Bánh chưng, mứt, kẹo... là những món ăn không thể thiếu ngày Tết. Việc ăn nhiều đồ ngọt có thể gây sâu răng hoặc làm sâu răng cũ trở nên nghiêm trọng hơn.</li>
<li><strong>Hôi miệng:</strong> Do ăn uống không điều độ, uống rượu bia nhiều và vệ sinh răng miệng không kỹ.</li>
<li><strong>Răng nhạy cảm:</strong> Thời tiết lạnh kết hợp với đồ ăn lạnh nhiều có thể gây ê buốt răng.</li>
<li><strong>Nướu sưng đỏ:</strong> Do vệ sinh răng miệng kém trong những ngày lễ.</li>
</ul>

<h3>Lời khuyên chăm sóc răng miệng dịp Tết</h3>

<h4>1. Hạn chế đồ ngọt và acid</h4>
<p>Sau khi ăn bánh chưng, mứt hoặc uống nước ngọt, hãy uống nước lọc để trung hòa acid trong miệng. Tránh ăn đồ ngọt liên tục trong thời gian dài.</p>

<h4>2. Đánh răng đúng cách</h4>
<p>Duy trì thói quen đánh răng 2 lần/ngày, mỗi lần ít nhất 2 phút. Đặc biệt chú ý đánh răng trước khi đi ngủ để loại bỏ thức ăn tích tụ trong ngày.</p>

<h4>3. Sử dụng chỉ tơ nha khoa</h4>
<p>Chỉ tơ nha khoa giúp làm sạch thức ăn kẹt giữa các răng mà bàn chải không thể chạy tới. Hãy sử dụng chỉ tơ sau mỗi bữa ăn chính.</p>

<h4>4. Không sử dụng răng làm công cụ</h4>
<p>Tránh dùng răng để bóc nắp chai, bẻ hạt dứa hay mở nút chai rượu. Đây là những thói quen có thể gây gãy răng hoặc sứt mẻ.</p>

<h4>5. Hạn chế rượu bia và thuốc lá</h4>
<p>Rượu bia và thuốc lá không chỉ gây ố vàng răng mà còn làm tăng nguy cơ bệnh nướu và ung thư miệng.</p>

<h3>Dịch vụ nha khoa nên làm trước Tết</h3>
<ul>
<li><strong>Tẩy trắng răng:</strong> Để có nụ cười tỏa sáng trong những bức ảnh ngày Tết</li>
<li><strong>Trám răng sâu:</strong> Điều trị sâu răng trước khi nó trở nên nghiêm trọng</li>
<li><strong>Lấy cao răng:</strong> Loại bỏ cao răng giúp răng sạch hơn và hơi thở thơm tho</li>
<li><strong>Kiểm tra tổng quát:</strong> Phát hiện sớm các vấn đề tiềm ẩn</li>
</ul>

<h3>Ưu đãi Tết tại Nha Khoa Uy Đức Smile</h3>
<p>Để hỗ trợ bạn có một nụ cười rạng rỡ đón Tết, Nha Khoa Uy Đức Smile triển khai nhiều ưu đãi hấp dẫn trong dịp cuối năm. Liên hệ ngay để được tư vấn và đặt lịch hẹn phù hợp.</p>

<h3>Chúc bạn và gia đình một năm mới An Khang Thịnh Vượng!</h3>
<p>Hãy chăm sóc nụ cười của mình ngay hôm nay để tự tin đón chào một năm mới với thật nhiều niềm vui và may mắn.</p>',
  'https://images.unsplash.com/photo-1483375443283-1f5a5a5d4c23?w=800&q=80',
  'Khuyến mãi',
  NOW() - INTERVAL ''25 days''
);

-- Bài 6: Vì sao nên khám răng định kỳ
INSERT INTO posts (title, excerpt, content, image_url, category, created_at) VALUES
(
  'Vì Sao Nên Khám Răng Định Kỳ? Những Lợi Ích Không Ngờ',
  'Nhiều người chỉ đi khám răng khi đau hoặc có vấn đề. Tuy nhiên, việc khám răng định kỳ 6 tháng/lần là cách tốt nhất để phòng ngừa bệnh lý răng miệng và tiết kiệm chi phí dài hạn.',
  '<h2>Tầm quan trọng của việc khám răng định kỳ</h2>
<p>Theo thống kê của các chuyên gia nha khoa, có đến 85% các vấn đề về răng miệng có thể phòng ngừa được nếu được phát hiện và điều trị sớm. Việc khám răng định kỳ giúp bạn duy trì sức khỏe răng miệng tốt và tránh những chi phí điều trị tốn kém về sau.</p>

<h3>Những lợi ích của việc khám răng định kỳ</h3>

<h4>1. Phát hiện sớm sâu răng</h4>
<p>Sâu răng ở giai đoạn đầu thường không có triệu chứng rõ ràng. Khi răng bắt đầu đau, sâu răng có thể đã lan đến tủy và cần điều trị tủy tốn kém hơn nhiều so với việc chỉ cần hàn trước đó.</p>

<h4>2. Ngăn ngừa bệnh nướu</h4>
<p>Viêm nướu (viêm десна) nếu không được điều trị sẽ tiến triển thành viêm nha nhu (parodontitis) - một trong những nguyên nhân hàng đầu gây mất răng ở người trưởng thành.</p>

<h4>3. Loại bỏ cao răng</h4>
<p>Cao răng (tartar) tích tụ theo thời gian có thể gây hôi miệng, viêm nướu và làm răng ố vàng. Việc lấy cao răng định kỳ giúp răng sạch sẽ và десна khỏe mạnh.</p>

<h4>4. Phát hiện ung thư miệng</h4>
<p>Ung thư miệng là căn bệnh nguy hiểm nhưng có thể chữa khỏi nếu phát hiện sớm. Bác sĩ nha khoa sẽ kiểm tra toàn diện để phát hiện các dấu hiệu bất thường.</p>

<h4>5. Tiết kiệm chi phí dài hạn</h4>
<p>Một ca điều trị sâu răng sớm có thể chỉ từ 300.000 - 500.000 VNĐ, trong khi điều trị tủy và bọc răng sứ có thể lên đến vài triệu đồng. Phòng bệnh hơn chữa bệnh!</p>

<h3>Khám răng định kỳ bao gồm những gì?</h3>
<ul>
<li><strong>Kiểm tra toàn diện:</strong> Bác sĩ sẽ kiểm tra tất cả các răng, nướu, lưỡi và niêm mạc miệng</li>
<li><strong>Chụp phim X-quang:</strong> Phát hiện sâu răng, mất xương hoặc các vấn đề bên dưới десна</li>
<li><strong>Siêu âm cao răng:</strong> Loại bỏ cao răng và mảng bám</li>
<li><strong>�ánh bóng răng:</strong> Giúp răng sạch bóng và mịn màng hơn</li>
<li><strong>Tư vấn vệ sinh:</strong> Hướng dẫn cách chải răng và sử dụng chỉ tơ đúng cách</li>
</ul>

<h3>bao lâu nên khám răng một lần?</h3>
<p>Đối với người có sức khỏe răng miệng tốt, nên khám răng định kỳ <strong>6 tháng/lần</strong>. Đối với người có tiền sử bệnh nha chu hoặc đang niềng răng, nên khám thường xuyên hơn theo chỉ định của bác sĩ.</p>

<h3>Dấu hiệu cần đi khám răng ngay</h3>
<ul>
<li>Răng đau hoặc nhạy cảm với nóng, lạnh</li>
<li>Nướu sưng đỏ, chảy máu khi chải răng</li>
<li>Hôi miệng kéo dài dù vệ sinh kỹ</li>
<li>Răng lung lay hoặc thay đổi vị trí</li>
<li>Xuất hiện các vết trắng, đốm hoặc lỗ trên răng</li>
<li>Khó khăn khi nhai hoặc ngậm miệng</li>
</ul>

<h3>Hãy đặt lịch khám ngay hôm nay!</h3>
<p>Đừng để những vấn đề nhỏ trở thành những căn bệnh lớn. Liên hệ Nha Khoa Uy Đức Smile để đặt lịch khám định kỳ và nhận tư vấn miễn phí từ đội ngũ bác sĩ chuyên nghiệp.</p>',
  'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=800&q=80',
  'Kiến thức',
  NOW() - INTERVAL ''3 days''
);

-- Hiển thị kết quả
SELECT id, title, category, created_at FROM posts ORDER BY created_at DESC;
