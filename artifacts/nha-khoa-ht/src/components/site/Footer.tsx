import { Phone, MapPin, Mail, Clock, Facebook, Youtube, Instagram, Globe } from "lucide-react";
import {
  HOTLINE,
  HOTLINE_DISPLAY,
  ADDRESS,
  CLINIC_NAME,
  CLINIC_EMAIL,
  CLINIC_WEBSITE,
  LOGO_URL,
  SOCIAL,
} from "@/lib/api";

export function Footer() {
  return (
    <footer id="contact" className="bg-[hsl(215,80%,18%)] text-white pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={LOGO_URL} alt={CLINIC_NAME} className="w-14 h-14 rounded-full bg-white p-1" />
            <div className="font-bold text-lg leading-tight">{CLINIC_NAME}</div>
          </div>
          <p className="text-sm text-blue-100 mb-4">
            Phòng khám nha khoa uy tín tại Gia Kiệm – Đồng Nai. Tận tâm chăm sóc nụ cười Việt với đội ngũ bác sĩ giàu kinh nghiệm.
          </p>
          <div className="flex gap-2">
            <a href={SOCIAL.facebook} className="w-9 h-9 rounded-full bg-white/10 grid place-items-center hover:bg-[#3b5998] transition" aria-label="Facebook">
              <Facebook className="h-4 w-4" />
            </a>
            <a href={SOCIAL.youtube} className="w-9 h-9 rounded-full bg-white/10 grid place-items-center hover:bg-[#ff0000] transition" aria-label="Youtube">
              <Youtube className="h-4 w-4" />
            </a>
            <a href={SOCIAL.instagram} className="w-9 h-9 rounded-full bg-white/10 grid place-items-center hover:bg-pink-600 transition" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-[hsl(45,90%,55%)]">Dịch vụ</h4>
          <ul className="space-y-2 text-sm text-blue-100">
            <li>Trám răng – nhổ răng</li>
            <li>Tẩy trắng răng</li>
            <li>Chữa tủy nội nha</li>
            <li>Phục hình tháo lắp</li>
            <li>Răng sứ Zirconia</li>
            <li>Cấy ghép Implant</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-[hsl(45,90%,55%)]">Liên hệ</h4>
          <ul className="space-y-3 text-sm text-blue-100">
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>{ADDRESS}</span>
            </li>
            <li className="flex gap-2">
              <Phone className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <a href={`tel:${HOTLINE}`}>{HOTLINE_DISPLAY}</a>
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>{CLINIC_EMAIL}</span>
            </li>
            <li className="flex gap-2">
              <Globe className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>{CLINIC_WEBSITE}</span>
            </li>
            <li className="flex gap-2">
              <Clock className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>T2–T7: 8h–20h • CN: 8h–12h</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-[hsl(45,90%,55%)]">Thông tin</h4>
          <ul className="space-y-2 text-sm text-blue-100">
            <li><a href="#about" className="hover:text-white">Giới thiệu</a></li>
            <li><a href="#blog" className="hover:text-white">Tin tức – Kiến thức</a></li>
            <li><a href="#feedback" className="hover:text-white">Cảm nhận khách hàng</a></li>
            <li><a href="#promotions" className="hover:text-white">Khuyến mãi</a></li>
            <li><a href="#booking" className="hover:text-white">Đặt lịch hẹn</a></li>
            <li><a href="/admin/login" className="hover:text-white">Đăng nhập quản trị</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-blue-200">
        © {new Date().getFullYear()} {CLINIC_NAME}. Tất cả các quyền được bảo lưu.
      </div>
    </footer>
  );
}
