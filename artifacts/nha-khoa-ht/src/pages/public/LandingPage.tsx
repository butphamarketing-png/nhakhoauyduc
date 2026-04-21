import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useListBanners,
  useListServices,
  useListPromotions,
  useListFeedback,
  useListPosts,
  useCreateBooking,
  useCreateContact,
} from "@workspace/api-client-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { useToast } from "@/hooks/use-toast";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award,
  HeartHandshake,
  Sparkles,
  Users,
  ArrowRight,
  Phone,
  Calendar as CalendarIcon,
} from "lucide-react";
import { CLINIC_NAME } from "@/lib/api";

function HeroSlider({
  banners,
}: {
  banners: { id: number; title: string; subtitle?: string | null; imageUrl?: string | null; ctaText?: string | null }[];
}) {
  const [idx, setIdx] = useState(0);
  const total = banners.length || 1;

  useEffect(() => {
    if (banners.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % total), 5500);
    return () => clearInterval(t);
  }, [total, banners.length]);

  if (banners.length === 0) {
    return (
      <div className="h-[70vh] bg-gradient-to-br from-[hsl(215,80%,35%)] to-[hsl(215,80%,20%)]" />
    );
  }

  const b = banners[idx];

  return (
    <section id="home" className="relative w-full overflow-hidden bg-[hsl(215,80%,20%)]">
      <div className="relative w-full" style={{ aspectRatio: "1366 / 550" }}>
        {banners.map((bn, i) => (
          <img
            key={bn.id}
            src={bn.imageUrl ?? ""}
            alt={bn.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              i === idx ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Bottom CTA strip — does not cover the slideshow image */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent pt-10 pb-5">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-white drop-shadow">
              <div className="text-xs font-semibold uppercase tracking-wider text-[hsl(45,90%,70%)]">
                {b.ctaText || "Ưu đãi đặc biệt"}
              </div>
              <div className="text-lg md:text-2xl font-bold">{b.title}</div>
            </div>
            <div className="flex gap-2">
              <a
                href="#booking"
                className="px-5 py-2.5 bg-[hsl(45,90%,55%)] text-[hsl(215,80%,20%)] font-bold rounded-full hover:bg-[hsl(45,90%,50%)] transition inline-flex items-center gap-2 text-sm"
              >
                <CalendarIcon className="h-4 w-4" /> ĐẶT HẸN
              </a>
              <a
                href="tel:0395352639"
                className="px-5 py-2.5 bg-white/15 backdrop-blur text-white font-bold rounded-full hover:bg-white/25 transition inline-flex items-center gap-2 border border-white/40 text-sm"
              >
                <Phone className="h-4 w-4" /> Gọi ngay
              </a>
            </div>
          </div>
        </div>
      </div>
      {banners.length > 1 && (
        <>
          <button
            onClick={() => setIdx((i) => (i - 1 + total) % total)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 grid place-items-center rounded-full bg-white/20 hover:bg-white/30 text-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => setIdx((i) => (i + 1) % total)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 grid place-items-center rounded-full bg-white/20 hover:bg-white/30 text-white"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-2 rounded-full transition-all ${
                  i === idx ? "w-8 bg-[hsl(45,90%,55%)]" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function QuickContact() {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<{
    name: string;
    phone: string;
  }>();
  const create = useCreateContact();

  return (
    <section className="bg-[hsl(45,90%,55%)] py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="text-[hsl(215,80%,20%)]">
          <h3 className="font-bold text-lg">Tư vấn miễn phí</h3>
          <p className="text-sm">Để lại số điện thoại, chúng tôi sẽ gọi lại trong 5 phút!</p>
        </div>
        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              await create.mutateAsync({ data });
              toast({ title: "Đã gửi!", description: "Chúng tôi sẽ liên hệ trong ít phút." });
              reset();
            } catch {
              toast({ title: "Lỗi", description: "Vui lòng thử lại.", variant: "destructive" });
            }
          })}
          className="flex flex-col sm:flex-row gap-2 w-full md:w-auto"
        >
          <input
            {...register("name", { required: true })}
            placeholder="Họ và tên"
            className="px-4 py-2 rounded-md bg-white border border-[hsl(215,80%,20%)]/20 min-w-[180px]"
          />
          <input
            {...register("phone", { required: true })}
            placeholder="Số điện thoại"
            className="px-4 py-2 rounded-md bg-white border border-[hsl(215,80%,20%)]/20 min-w-[180px]"
          />
          <button
            disabled={isSubmitting}
            className="px-6 py-2 rounded-md bg-[hsl(215,80%,20%)] text-white font-semibold hover:bg-[hsl(215,80%,15%)] transition"
          >
            Gửi yêu cầu
          </button>
        </form>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="text-sm font-semibold text-[hsl(45,90%,45%)] uppercase tracking-wider mb-2">
            Về chúng tôi
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[hsl(215,80%,20%)] mb-4">
            {CLINIC_NAME} – Nụ cười khỏe đẹp tự nhiên
          </h2>
          <p className="text-gray-600 mb-4">
            {CLINIC_NAME} là phòng khám nha khoa uy tín tại Gia Kiệm – Đồng Nai với hơn 10 năm
            kinh nghiệm. Chúng tôi sở hữu đội ngũ bác sĩ giỏi cùng hệ thống
            trang thiết bị hiện đại, đạt chuẩn quốc tế.
          </p>
          <p className="text-gray-600 mb-6">
            Sứ mệnh của chúng tôi là mang đến nụ cười tự tin và sức khỏe răng
            miệng tốt nhất cho mọi khách hàng Việt Nam.
          </p>
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[hsl(215,80%,35%)] text-white font-semibold rounded-md hover:bg-[hsl(215,80%,30%)] transition"
          >
            Khám phá dịch vụ <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { num: "10+", label: "Năm kinh nghiệm" },
            { num: "20+", label: "Bác sĩ chuyên khoa" },
            { num: "6.000+", label: "Ca Implant thành công" },
            { num: "50.000+", label: "Khách hàng tin tưởng" },
          ].map((s) => (
            <div
              key={s.label}
              className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 text-center"
            >
              <div className="text-3xl font-bold text-[hsl(215,80%,35%)]">
                {s.num}
              </div>
              <div className="text-sm text-gray-600 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const { data: services = [] } = useListServices();
  const [start, setStart] = useState(0);
  const perPage = 3;
  const visible = services.slice(start, start + perPage);

  return (
    <section id="services" className="py-16 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="text-sm font-semibold text-[hsl(45,90%,45%)] uppercase tracking-wider mb-2">
            Dịch vụ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[hsl(215,80%,20%)]">
            Dịch vụ nha khoa toàn diện
          </h2>
        </div>

        <div className="relative">
          {services.length > perPage && (
            <button
              onClick={() => setStart(Math.max(0, start - 1))}
              disabled={start === 0}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 grid place-items-center rounded-full bg-white shadow-md disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          <div className="grid md:grid-cols-3 gap-6">
            {visible.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-xl border border-blue-100 overflow-hidden hover:shadow-xl transition group"
              >
                <div className="aspect-video bg-gradient-to-br from-[hsl(215,80%,80%)] to-[hsl(215,80%,60%)] relative overflow-hidden">
                  {s.imageUrl && (
                    <img
                      src={s.imageUrl}
                      alt={s.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-[hsl(215,80%,20%)] mb-2">
                    {s.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {s.description}
                  </p>
                  <a
                    href="#booking"
                    className="text-sm font-semibold text-[hsl(215,80%,35%)] inline-flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Xem chi tiết <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          {services.length > perPage && (
            <button
              onClick={() => setStart(Math.min(services.length - perPage, start + 1))}
              disabled={start >= services.length - perPage}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 grid place-items-center rounded-full bg-white shadow-md disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function Commitments() {
  const items = [
    { icon: ShieldCheck, title: "An toàn tuyệt đối", desc: "Vô trùng đạt chuẩn Bộ Y tế" },
    { icon: Award, title: "Bác sĩ giàu kinh nghiệm", desc: "Đội ngũ chuyên môn cao trên 10 năm" },
    { icon: Sparkles, title: "Công nghệ hiện đại", desc: "Trang thiết bị nhập khẩu Đức, Mỹ" },
    { icon: HeartHandshake, title: "Tận tâm chu đáo", desc: "Chăm sóc khách hàng 24/7" },
    { icon: Users, title: "Chi phí hợp lý", desc: "Bảng giá minh bạch, nhiều ưu đãi" },
  ];
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="text-sm font-semibold text-[hsl(45,90%,45%)] uppercase tracking-wider mb-2">
            Cam kết
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[hsl(215,80%,20%)]">
            5 cam kết của {CLINIC_NAME}
          </h2>
        </div>
        <div className="grid md:grid-cols-5 sm:grid-cols-2 gap-4">
          {items.map((it) => (
            <div
              key={it.title}
              className="text-center p-6 rounded-xl bg-gradient-to-b from-blue-50 to-white border border-blue-100 hover:shadow-md transition"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-[hsl(215,80%,35%)] text-white grid place-items-center mb-3">
                <it.icon className="h-6 w-6" />
              </div>
              <div className="font-semibold text-[hsl(215,80%,20%)] mb-1">
                {it.title}
              </div>
              <div className="text-xs text-gray-600">{it.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let v = 0;
    const step = Math.ceil(end / 60);
    const t = setInterval(() => {
      v = Math.min(v + step, end);
      setN(v);
      if (v >= end) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, [end]);
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-[hsl(45,90%,55%)]">
        {n.toLocaleString("vi-VN")}
        {suffix}
      </div>
      <div className="text-sm text-blue-100 mt-2">{label}</div>
    </div>
  );
}

function Stats() {
  return (
    <section className="py-14 bg-gradient-to-r from-[hsl(215,80%,30%)] to-[hsl(215,80%,20%)]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        <Counter end={50000} label="Khách hàng hài lòng" suffix="+" />
        <Counter end={6000} label="Ca Implant thành công" suffix="+" />
        <Counter end={20} label="Bác sĩ chuyên khoa" suffix="+" />
        <Counter end={10} label="Năm kinh nghiệm" suffix="+" />
      </div>
    </section>
  );
}

function Promotions() {
  const { data: promos = [] } = useListPromotions();
  return (
    <section id="promotions" className="py-16 bg-blue-50/40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="text-sm font-semibold text-[hsl(45,90%,45%)] uppercase tracking-wider mb-2">
            Khuyến mãi
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[hsl(215,80%,20%)]">
            Ưu đãi đang diễn ra
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {promos.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl border border-blue-100 p-5 hover:shadow-lg transition relative"
            >
              <div className="absolute top-3 right-3 px-2 py-1 rounded bg-[hsl(45,90%,55%)] text-[hsl(215,80%,20%)] text-xs font-bold">
                HOT
              </div>
              <h3 className="font-bold text-[hsl(215,80%,20%)] mb-2">{p.title}</h3>
              <p className="text-xs text-gray-600 mb-3">{p.content}</p>
              <div className="text-2xl font-bold text-[hsl(215,80%,35%)]">{p.price}</div>
              {p.validUntil && (
                <div className="text-xs text-gray-500 mt-1">HSD: {p.validUntil}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { data: feedback = [] } = useListFeedback({ approved: true });
  const items = feedback.slice(0, 6);
  return (
    <section id="feedback" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="text-sm font-semibold text-[hsl(45,90%,45%)] uppercase tracking-wider mb-2">
            Cảm nhận khách hàng
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[hsl(215,80%,20%)]">
            Khách hàng nói về chúng tôi
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((f) => (
            <div
              key={f.id}
              className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: f.rating ?? 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[hsl(45,90%,55%)] text-[hsl(45,90%,55%)]" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">"{f.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[hsl(215,80%,35%)] text-white grid place-items-center font-bold">
                  {f.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-[hsl(215,80%,20%)]">{f.name}</div>
                  {f.service && (
                    <div className="text-xs text-gray-500">{f.service}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingSection() {
  const { toast } = useToast();
  const { data: services = [] } = useListServices();
  const create = useCreateBooking();
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<{
    name: string;
    phone: string;
    service: string;
    appointmentTime: string;
    note: string;
  }>();

  return (
    <section
      id="booking"
      className="py-16 bg-gradient-to-br from-[hsl(215,80%,20%)] to-[hsl(215,80%,35%)]"
    >
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <div className="text-white">
          <div className="text-sm font-semibold text-[hsl(45,90%,55%)] uppercase tracking-wider mb-2">
            Đặt lịch hẹn
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Đặt lịch khám miễn phí ngay hôm nay
          </h2>
          <p className="text-blue-100 mb-6">
            Chúng tôi sẽ liên hệ xác nhận lịch hẹn trong vòng 15 phút sau khi bạn gửi yêu cầu.
          </p>
          <ul className="space-y-2 text-sm text-blue-100">
            <li>✓ Tư vấn và thăm khám miễn phí</li>
            <li>✓ Bác sĩ chuyên khoa giàu kinh nghiệm</li>
            <li>✓ Trang thiết bị hiện đại</li>
            <li>✓ Bảo hành dài hạn</li>
          </ul>
        </div>
        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              await create.mutateAsync({ data });
              toast({ title: "Đặt lịch thành công!", description: "Chúng tôi sẽ liên hệ với bạn sớm." });
              reset();
            } catch {
              toast({ title: "Lỗi", description: "Vui lòng thử lại.", variant: "destructive" });
            }
          })}
          className="bg-white rounded-2xl p-6 shadow-2xl space-y-4"
        >
          <h3 className="font-bold text-xl text-[hsl(215,80%,20%)]">Thông tin đặt lịch</h3>
          <input
            {...register("name", { required: true })}
            placeholder="Họ và tên *"
            className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:border-[hsl(215,80%,35%)] outline-none"
          />
          <input
            {...register("phone", { required: true })}
            placeholder="Số điện thoại *"
            className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:border-[hsl(215,80%,35%)] outline-none"
          />
          <select
            {...register("service")}
            className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:border-[hsl(215,80%,35%)] outline-none bg-white"
          >
            <option value="">Chọn dịch vụ</option>
            {services.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          <input
            {...register("appointmentTime")}
            type="datetime-local"
            className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:border-[hsl(215,80%,35%)] outline-none"
          />
          <textarea
            {...register("note")}
            placeholder="Ghi chú thêm"
            rows={3}
            className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:border-[hsl(215,80%,35%)] outline-none"
          />
          <button
            disabled={isSubmitting}
            className="w-full py-3 bg-[hsl(45,90%,55%)] text-[hsl(215,80%,20%)] font-bold rounded-md hover:bg-[hsl(45,90%,50%)] transition disabled:opacity-60"
          >
            ĐẶT LỊCH NGAY
          </button>
        </form>
      </div>
    </section>
  );
}

function Blog() {
  const { data: posts = [] } = useListPosts();
  const items = posts.slice(0, 3);
  return (
    <section id="blog" className="py-16 bg-blue-50/40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="text-sm font-semibold text-[hsl(45,90%,45%)] uppercase tracking-wider mb-2">
            Tin tức
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[hsl(215,80%,20%)]">
            Kiến thức nha khoa
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((p) => (
            <article
              key={p.id}
              className="bg-white rounded-xl border border-blue-100 overflow-hidden hover:shadow-lg transition group"
            >
              <div className="aspect-video bg-gradient-to-br from-[hsl(215,80%,80%)] to-[hsl(215,80%,60%)] overflow-hidden">
                {p.imageUrl && (
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                )}
              </div>
              <div className="p-5">
                {p.category && (
                  <div className="text-xs font-semibold text-[hsl(215,80%,35%)] mb-2 uppercase">
                    {p.category}
                  </div>
                )}
                <h3 className="font-bold text-[hsl(215,80%,20%)] mb-2 line-clamp-2">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-3">{p.excerpt}</p>
                <a href="#" className="text-sm font-semibold text-[hsl(215,80%,35%)] inline-flex items-center gap-1">
                  Đọc thêm <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  const { data: banners = [] } = useListBanners();
  return (
    <div className="bg-white">
      <Header />
      <HeroSlider banners={banners} />
      <QuickContact />
      <About />
      <ServicesSection />
      <Commitments />
      <Stats />
      <Promotions />
      <Testimonials />
      <BookingSection />
      <Blog />
      <Footer />
      <FloatingActions />
    </div>
  );
}
