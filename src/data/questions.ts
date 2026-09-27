export interface Question {
  cau: number;
  hoi: string;
  A: string;
  B: string;
  C: string;
  D: string;
  dapAn: 'A' | 'B' | 'C' | 'D';
}

export const QUESTIONS: Question[] = [
  {"cau":1,"hoi":"Sau kỳ nghỉ hè, Như Quỳnh trở lại trường học với tinh thần rất **energetic**. Từ 'energetic' trong câu trên có nghĩa là gì?","A":"Mệt mỏi","B":"Tràn đầy năng lượng","C":"Buồn chán","D":"Lo lắng","dapAn":"B"},
  {"cau":2,"hoi":"Có bạn trong lớp hay bị nhắc nhở vì tính **lazy**, không chịu làm bài tập về nhà. Từ 'lazy' trong câu trên có nghĩa là gì?","A":"Chăm chỉ","B":"Cẩn thận","C":"Lười biếng","D":"Sáng tạo","dapAn":"C"},
  {"cau":3,"hoi":"Như Quỳnh luôn được thầy cô khen là học sinh **hardworking**. Từ 'hardworking' trong câu trên có nghĩa là gì?","A":"Chăm chỉ","B":"Lười biếng","C":"Nhút nhát","D":"Bướng bỉnh","dapAn":"A"},
  {"cau":4,"hoi":"Trong giờ Mỹ thuật, Như Quỳnh vẽ những bức tranh rất **creative**. Từ 'creative' trong câu trên có nghĩa là gì?","A":"Đơn giản","B":"Cũ kỹ","C":"Nhàm chán","D":"Sáng tạo","dapAn":"D"},
  {"cau":5,"hoi":"Cô bạn cùng bàn của Như Quỳnh rất **talented** về môn Âm nhạc. Từ 'talented' trong câu trên có nghĩa là gì?","A":"Vụng về","B":"Chậm chạp","C":"Bình thường","D":"Tài năng","dapAn":"D"},
  {"cau":6,"hoi":"Khi mới chuyển trường, Như Quỳnh khá **shy** nên ít nói chuyện với bạn mới. Từ 'shy' trong câu trên có nghĩa là gì?","A":"Nhút nhát","B":"Tự tin","C":"Hài hước","D":"Nóng nảy","dapAn":"A"},
  {"cau":7,"hoi":"May mắn là các bạn trong lớp mới đều rất **friendly** với Như Quỳnh. Từ 'friendly' trong câu trên có nghĩa là gì?","A":"Lạnh lùng","B":"Kiêu ngạo","C":"Thân thiện","D":"Nghiêm khắc","dapAn":"C"},
  {"cau":8,"hoi":"Không ai thích chơi với một người **selfish**, chỉ biết nghĩ cho bản thân. Từ 'selfish' trong câu trên có nghĩa là gì?","A":"Hào phóng","B":"Ích kỷ","C":"Rộng lượng","D":"Tốt bụng","dapAn":"B"},
  {"cau":9,"hoi":"Như Quỳnh luôn **polite** khi nói chuyện với người lớn tuổi. Từ 'polite' trong câu trên có nghĩa là gì?","A":"Lịch sự","B":"Thô lỗ","C":"Cộc cằn","D":"Xấc xược","dapAn":"A"},
  {"cau":10,"hoi":"Cậu bạn đó bị nhắc nhở vì có thái độ **rude** với cô giáo. Từ 'rude' trong câu trên có nghĩa là gì?","A":"Lịch sự","B":"Nhã nhặn","C":"Khiêm tốn","D":"Thô lỗ","dapAn":"D"},
  {"cau":11,"hoi":"Dù bài kiểm tra khó, Như Quỳnh vẫn giữ vẻ **cheerful** suốt cả ngày. Từ 'cheerful' trong câu trên có nghĩa là gì?","A":"Buồn bã","B":"Vui vẻ","C":"Tức giận","D":"Lo âu","dapAn":"B"},
  {"cau":12,"hoi":"Em trai của Như Quỳnh rất **stubborn**, không chịu nghe lời khuyên của ai. Từ 'stubborn' trong câu trên có nghĩa là gì?","A":"Dễ bảo","B":"Ngoan ngoãn","C":"Bướng bỉnh","D":"Hiền lành","dapAn":"C"},
  {"cau":13,"hoi":"Vì **careless** khi làm bài, Như Quỳnh đã viết sai một vài con số. Từ 'careless' trong câu trên có nghĩa là gì?","A":"Cẩn thận","B":"Chính xác","C":"Bất cẩn","D":"Tỉ mỉ","dapAn":"C"},
  {"cau":14,"hoi":"Lần sau, Như Quỳnh hứa sẽ **careful** hơn khi làm bài kiểm tra. Từ 'careful' trong câu trên có nghĩa là gì?","A":"Bất cẩn","B":"Cẩn thận","C":"Vội vàng","D":"Cẩu thả","dapAn":"B"},
  {"cau":15,"hoi":"Đứng trước cả lớp thuyết trình, Như Quỳnh cảm thấy mình thật **brave**. Từ 'brave' trong câu trên có nghĩa là gì?","A":"Sợ hãi","B":"Rụt rè","C":"Yếu đuối","D":"Can đảm","dapAn":"D"},
  {"cau":16,"hoi":"Không ai muốn bị coi là **cowardly** khi gặp khó khăn. Từ 'cowardly' trong câu trên có nghĩa là gì?","A":"Hèn nhát","B":"Can đảm","C":"Mạnh mẽ","D":"Quyết đoán","dapAn":"A"},
  {"cau":17,"hoi":"Gia đình bạn thân của Như Quỳnh khá **wealthy**, có cửa hàng riêng. Từ 'wealthy' trong câu trên có nghĩa là gì?","A":"Nghèo khó","B":"Giàu có","C":"Bình thường","D":"Khó khăn","dapAn":"B"},
  {"cau":18,"hoi":"Trường tổ chức quyên góp sách vở cho các bạn học sinh **poor** ở vùng cao. Từ 'poor' trong câu trên có nghĩa là gì?","A":"Giàu có","B":"Khá giả","C":"Dư dả","D":"Nghèo","dapAn":"D"},
  {"cau":19,"hoi":"Ăn nhiều rau xanh giúp Như Quỳnh có một cơ thể **healthy**. Từ 'healthy' trong câu trên có nghĩa là gì?","A":"Yếu ớt","B":"Bệnh tật","C":"Khỏe mạnh","D":"Mệt mỏi","dapAn":"C"},
  {"cau":20,"hoi":"Ăn quá nhiều đồ ăn nhanh là một thói quen **unhealthy**. Từ 'unhealthy' trong câu trên có nghĩa là gì?","A":"Không lành mạnh","B":"Bổ dưỡng","C":"Lành mạnh","D":"Cân bằng","dapAn":"A"},
  {"cau":21,"hoi":"Cô giáo nhắc học sinh không nên đi qua con đường **dangerous** đó một mình. Từ 'dangerous' trong câu trên có nghĩa là gì?","A":"Nguy hiểm","B":"An toàn","C":"Yên tĩnh","D":"Thuận tiện","dapAn":"A"},
  {"cau":22,"hoi":"Đội mũ bảo hiểm giúp Như Quỳnh cảm thấy **safe** hơn khi đi xe đạp. Từ 'safe' trong câu trên có nghĩa là gì?","A":"Nguy hiểm","B":"Lo lắng","C":"An toàn","D":"Bất ổn","dapAn":"C"},
  {"cau":23,"hoi":"Buổi biểu diễn văn nghệ của trường diễn ra rất **successful**. Từ 'successful' trong câu trên có nghĩa là gì?","A":"Thất bại","B":"Thành công","C":"Nhàm chán","D":"Lộn xộn","dapAn":"B"},
  {"cau":24,"hoi":"Không ai muốn trải qua một **failure** lớn trong kỳ thi quan trọng. Từ 'failure' trong câu trên có nghĩa là gì?","A":"Thành công","B":"Chiến thắng","C":"Cơ hội","D":"Thất bại","dapAn":"D"},
  {"cau":25,"hoi":"Như Quỳnh mong muốn **graduate** từ cấp 2 với kết quả thật tốt. Từ 'graduate' trong câu trên có nghĩa là gì?","A":"Nhập học","B":"Nghỉ học","C":"Chuyển trường","D":"Tốt nghiệp","dapAn":"D"},
  {"cau":26,"hoi":"Sau kỳ thi vào 10, Như Quỳnh sẽ **enroll** vào ngôi trường mơ ước. Từ 'enroll' trong câu trên có nghĩa là gì?","A":"Rời khỏi","B":"Ghi danh, đăng ký","C":"Từ chối","D":"Hoãn lại","dapAn":"B"},
  {"cau":27,"hoi":"Nhờ thành tích học tập tốt, Như Quỳnh nhận được một **scholarship** của trường. Từ 'scholarship' trong câu trên có nghĩa là gì?","A":"Học bổng","B":"Học phí","C":"Bằng khen","D":"Phần thưởng tiền mặt","dapAn":"A"},
  {"cau":28,"hoi":"Bố mẹ Như Quỳnh phải đóng **tuition** đầy đủ mỗi học kỳ. Từ 'tuition' trong câu trên có nghĩa là gì?","A":"Học bổng","B":"Tiền thưởng","C":"Học phí","D":"Tiền ăn","dapAn":"C"},
  {"cau":29,"hoi":"Sáng nay cả lớp chăm chú nghe một **lecture** thú vị về lịch sử. Từ 'lecture' trong câu trên có nghĩa là gì?","A":"Bài kiểm tra","B":"Buổi thảo luận nhóm","C":"Bài giảng","D":"Buổi dã ngoại","dapAn":"C"},
  {"cau":30,"hoi":"Khi lên đại học, Như Quỳnh dự định sống trong **dormitory** của trường. Từ 'dormitory' trong câu trên có nghĩa là gì?","A":"Ký túc xá","B":"Nhà riêng","C":"Khách sạn","D":"Căn hộ cho thuê","dapAn":"A"},
  {"cau":31,"hoi":"Việc học nhóm giúp Như Quỳnh rèn luyện thêm nhiều **skill** mềm. Từ 'skill' trong câu trên có nghĩa là gì?","A":"Kiến thức","B":"Bằng cấp","C":"Kinh nghiệm","D":"Kỹ năng","dapAn":"D"},
  {"cau":32,"hoi":"Đọc sách mỗi ngày giúp mở rộng **knowledge** của Như Quỳnh. Từ 'knowledge' trong câu trên có nghĩa là gì?","A":"Kỹ năng","B":"Kiến thức","C":"Kinh nghiệm","D":"Tài năng","dapAn":"B"},
  {"cau":33,"hoi":"Chuyến đi thực tế đem lại cho Như Quỳnh nhiều **experience** quý báu. Từ 'experience' trong câu trên có nghĩa là gì?","A":"Kiến thức","B":"Kinh nghiệm","C":"Kỹ năng","D":"Bằng cấp","dapAn":"B"},
  {"cau":34,"hoi":"Để xin vào trường chuyên, học sinh cần có đủ **qualification** cần thiết. Từ 'qualification' trong câu trên có nghĩa là gì?","A":"Bằng cấp, điều kiện đủ","B":"Kinh nghiệm sống","C":"Sở thích cá nhân","D":"Mối quan hệ","dapAn":"A"},
  {"cau":35,"hoi":"Sau khi tốt nghiệp, nhiều người tìm kiếm **employment** ổn định. Từ 'employment' trong câu trên có nghĩa là gì?","A":"Học bổng","B":"Kỳ nghỉ","C":"Việc làm","D":"Chương trình đào tạo","dapAn":"C"},
  {"cau":36,"hoi":"Chú của Như Quỳnh đang **unemployed** sau khi công ty giải thể. Từ 'unemployed' trong câu trên có nghĩa là gì?","A":"Đang đi làm","B":"Đang đi học","C":"Đang nghỉ hưu","D":"Đang thất nghiệp","dapAn":"D"},
  {"cau":37,"hoi":"Gia đình Như Quỳnh có **income** ổn định nhờ cửa hàng tạp hóa nhỏ. Từ 'income' trong câu trên có nghĩa là gì?","A":"Chi phí","B":"Khoản nợ","C":"Tiền tiết kiệm","D":"Thu nhập","dapAn":"D"},
  {"cau":38,"hoi":"Mỗi tháng, gia đình phải tính toán kỹ các **expense** trong nhà. Từ 'expense' trong câu trên có nghĩa là gì?","A":"Thu nhập","B":"Tiền lãi","C":"Chi phí","D":"Tiền thưởng","dapAn":"C"},
  {"cau":39,"hoi":"Cuối tuần, Như Quỳnh cùng bạn bè đi **volunteer** dọn dẹp công viên. Từ 'volunteer' trong câu trên có nghĩa là gì?","A":"Nghỉ ngơi","B":"Làm tình nguyện","C":"Đi du lịch","D":"Đi mua sắm","dapAn":"B"},
  {"cau":40,"hoi":"Cả lớp cùng nhau **donate** sách cũ cho trẻ em vùng khó khăn. Từ 'donate' trong câu trên có nghĩa là gì?","A":"Quyên góp, từ thiện","B":"Bán lại","C":"Giữ lại","D":"Vứt bỏ","dapAn":"A"}
];
