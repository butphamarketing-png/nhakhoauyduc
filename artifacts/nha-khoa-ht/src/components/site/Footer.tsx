import { Phone, MapPin, Mail, Clock, Facebook, Youtube } from "lucide-react";
import { HOTLINE, ADDRESS, CLINIC_NAME } from "@/lib/api";

export function Footer() {
  return (
    <footer className="bg-[hsl(215,80%,20%)] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[hsl(45,90%,55%)] text-[hsl(215,80%,20%)] grid place-items-center font-bold text-xl">
              HT
            </div>
            <div className="font-bold text-xl">{CLINIC_NAME}</div>
          </div>
          <p className="text-sm text-blue-100">
            Nha khoa thẩm mỹ uy tín tại TP.HCM. Tận tâm chăm sóc nụ cười Việt.
          </p>
          <div className="flex gap-3 mt-4">
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/10 grid place-items-center hover:bg-[hsl(45,90%,55%)] hover:text-[hsl(215,80%,20%)] transition"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/10 grid place-items-center hover:bg-[hsl(45,90%,55%)] hover:text-[hsl(215,80%,20%)] transition"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-[hsl(45,90%,55%)]">
            Dịch vụ
          </h4>
          <ul className="space-y-2 text-sm text-blue-100">
            <li>Trám răng, nhổ răng</li>
            <li>Tẩy trắng răng</li>
            <li>Chữa tủy nội nha</li>
            <li>Phục hình tháo lắp</li>
            <li>Răng sứ Zirconia</li>
            <li>Cấy ghép Implant</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-[hsl(45,90%,55%)]">
            Liên hệ
          </h4>
          <ul className="space-y-3 text-sm text-blue-100">
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>{ADDRESS}</span>
            </li>
            <li className="flex gap-2">
              <Phone className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <a href={`tel:${HOTLINE}`}>{HOTLINE}</a>
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>info@nhakhoaht.vn</span>
            </li>
            <li className="flex gap-2">
              <Clock className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>8:00 - 20:00 (T2 - CN)</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-[hsl(45,90%,55%)]">
            Thông tin
          </h4>
          <ul className="space-y-2 text-sm text-blue-100">
            <li>
              <a href="#about">Giới thiệu</a>
            </li>
            <li>
              <a href="#blog">Tin tức</a>
            </li>
            <li>
              <a href="#feedback">Cảm nhận khách hàng</a>
            </li>
            <li>
              <a href="#booking">Đặt lịch hẹn</a>
            </li>
            <li>
              <a href="/admin/login">Đăng nhập quản trị</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-blue-200">
        © {new Date().getFullYear()} {CLINIC_NAME}. Tất cả các quyền được bảo lưu.
      </div>
    </footer>
  );
}
