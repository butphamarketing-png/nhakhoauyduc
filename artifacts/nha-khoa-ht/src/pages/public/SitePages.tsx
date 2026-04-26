import { type ReactNode, useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import { useForm } from "react-hook-form";
import {
  useCreateBooking,
  useCreateContact,
  useListBanners,
  useListFeedback,
  useListPosts,
  useListPromotions,
  useListServices,
} from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { SeoHead } from "@/components/site/SeoHead";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildLocalBusinessSchema,
  buildServiceSchema,
  buildWebsiteSchema,
  StructuredData,
} from "@/components/site/StructuredData";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Users,
} from "lucide-react";
import { LOGO_URL } from "@/lib/api";
import {
  BOOKING_STEPS,
  buildExcerpt,
  CLINIC_PROFILE,
  COMMITMENTS,
  CONTACT_CARDS,
  FAQ_CONTACT,
  FAQ_HOME,
  FAQ_SERVICES,
  getPostBasePath,
  getServiceHighlights,
  GOOGLE_MAPS_URL,
  SITE_FACTS,
  slugify,
  splitParagraphs,
  TRUST_SIGNALS,
} from "@/lib/site";

type BannerItem = {
  id: number;
  title: string;
  subtitle?: string | null;
  imageUrl?: string | null;
  ctaText?: string | null;
};

type ServiceItem = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

type PostItem = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  createdAt: string;
};

type PromotionItem = {
  id: number;
  title: string;
  content: string;
  price: string;
  validUntil: string;
};

type FeedbackItem = {
  id: number;
  name: string;
  service: string;
  content: string;
  rating?: number | null;
  imageUrl: string;
};

const phoneRules = {
  required: "Vui lòng nhập số điện thoại",
  pattern: {
    value: /^(0|\+84)[0-9\s.-]{8,12}$/,
    message: "Số điện thoại chưa đúng định dạng",
  },
};

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`motion-reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function CountUp({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const numericValue = Number.parseInt(value.replace(/[^\d]/g, ""), 10);
    if (!Number.isFinite(numericValue)) {
      setDisplayValue(value);
      return;
    }

    const node = ref.current;
    if (!node) return;

    let started = false;
    let frame = 0;

    const animate = () => {
      const start = performance.now();
      const duration = 1100;

      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(numericValue * eased);
        setDisplayValue(`${current.toLocaleString("vi-VN")}${suffix}`);

        if (progress < 1) {
          frame = window.requestAnimationFrame(step);
        }
      };

      frame = window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [suffix, value]);

  return <span ref={ref}>{displayValue}</span>;
}

function PublicLayout({
  children,
  softBackground = false,
}: {
  children: ReactNode;
  softBackground?: boolean;
}) {
  return (
    <div className={softBackground ? "bg-[linear-gradient(180deg,#fff_0%,#f6f9ff_100%)]" : "bg-white"}>
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

function Breadcrumb({
  title,
  current,
}: {
  title: string;
  current: string;
}) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-[hsl(223,68%,39%)]">
            Trang chủ
          </Link>
          <span>/</span>
          <span>{current}</span>
        </div>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold text-[hsl(223,68%,24%)] sm:text-4xl">
          {title}
        </h1>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div className="inline-flex items-center gap-2 rounded-full bg-[hsl(42,94%,94%)] px-3 py-1 text-sm font-semibold text-[hsl(33,89%,38%)]">
        {eyebrow}
      </div>
      <h2 className="mt-4 text-3xl font-bold leading-tight text-[hsl(223,68%,24%)] sm:text-4xl">
        {title}
      </h2>
      {description ? <p className="mt-3 text-base leading-7 text-slate-600">{description}</p> : null}
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-sm text-rose-600">{message}</p>;
}

function LoadingCard({ className = "" }: { className?: string }) {
  return <div className={`loading-shimmer rounded-[1.8rem] bg-slate-200/80 ${className}`.trim()} />;
}

function EmptyStateCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[1.8rem] border border-dashed border-slate-300 bg-white/70 p-8 text-center shadow-sm">
      <div className="text-lg font-semibold text-[hsl(223,68%,24%)]">{title}</div>
      <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function HeroSlider({ banners }: { banners: BannerItem[] }) {
  const [index, setIndex] = useState(0);
  const slides = banners.length
    ? banners
    : [
        {
          id: 0,
          title: "Chăm sóc răng miệng nhẹ nhàng, rõ ràng và phù hợp với từng người",
          subtitle:
            "Tư vấn kỹ trước khi làm, lịch hẹn gọn gàng, theo dõi sau điều trị và đồng hành lâu dài cho cả gia đình.",
          imageUrl: LOGO_URL,
          ctaText: "Đặt lịch tư vấn",
        },
      ];

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const active = slides[index];

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.18),transparent_32%),linear-gradient(135deg,hsl(223,68%,42%),hsl(226,55%,22%))]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:py-20">
        <div key={active.id} className="text-white">
          <div className="motion-enter motion-enter-delay-1 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium">
            <Sparkles className="h-4 w-4 text-[hsl(42,94%,58%)]" />
            Đặt lịch nhanh - tư vấn rõ ràng - theo dõi sau điều trị
          </div>
          <h1 className="motion-enter motion-enter-delay-2 mt-6 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            {active.title}
          </h1>
          <p className="motion-enter motion-enter-delay-3 mt-5 max-w-2xl text-lg leading-8 text-blue-50/95">
            {active.subtitle || CLINIC_PROFILE.description}
          </p>

          <div className="motion-enter motion-enter-delay-4 mt-8 flex flex-wrap gap-3">
            <a
              href="/lien-he#booking"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-[hsl(223,68%,22%)] shadow-lg shadow-[rgba(12,25,75,.24)] transition hover:-translate-y-0.5"
            >
              <CalendarDays className="h-4 w-4" />
              {active.ctaText || "Đặt lịch tư vấn"}
            </a>
            <a
              href={`tel:${CLINIC_PROFILE.hotline.replace(/\s+/g, "")}`}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
            >
              <Phone className="h-4 w-4" />
              Gọi {CLINIC_PROFILE.hotline}
            </a>
          </div>

          <div className="motion-enter motion-enter-delay-5 mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-5 backdrop-blur transition duration-300 hover:-translate-y-1">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">Thời gian làm việc</div>
              <div className="mt-2 text-lg font-semibold">{CLINIC_PROFILE.hours.weekdays}</div>
              <div className="text-sm text-blue-100">{CLINIC_PROFILE.hours.sunday}</div>
            </div>
            <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-5 backdrop-blur transition duration-300 hover:-translate-y-1">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">Khu vực phục vụ</div>
              <div className="mt-2 text-lg font-semibold">{CLINIC_PROFILE.shortAddress}</div>
              <div className="text-sm text-blue-100">Tiện ghé thăm khám và tái khám định kỳ</div>
            </div>
            <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-5 backdrop-blur transition duration-300 hover:-translate-y-1">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">Cam kết</div>
              <div className="mt-2 text-lg font-semibold">Minh bạch và nhẹ nhàng</div>
              <div className="text-sm text-blue-100">Giải thích rõ trước khi bắt đầu điều trị</div>
            </div>
          </div>
        </div>

        <div key={`visual-${active.id}`} className="motion-enter motion-enter-delay-3 relative">
          <div className="absolute inset-0 rounded-[2rem] bg-white/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-[0_26px_70px_rgba(5,17,62,.28)] backdrop-blur">
            <div className="overflow-hidden rounded-[1.6rem] bg-white">
              <img
                src={active.imageUrl || LOGO_URL}
                alt={active.title}
                className="hero-image-float h-[420px] w-full object-cover"
              />
            </div>
            <div className="mt-4 grid gap-3 rounded-[1.5rem] bg-white p-5 text-[hsl(223,68%,24%)] shadow-lg sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Lý do khách hàng quay lại
                </div>
                <div className="mt-2 text-lg font-semibold">
                  Khám kỹ, tư vấn dễ hiểu và đồng hành sau điều trị
                </div>
              </div>
              {slides.length > 1 ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIndex((index - 1 + slides.length) % slides.length)}
                    className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50"
                    aria-label="Xem slide trước"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setIndex((index + 1) % slides.length)}
                    className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50"
                    aria-label="Xem slide sau"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickLeadForm({ floating = true }: { floating?: boolean }) {
  const { toast } = useToast();
  const create = useCreateContact();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<{ name: string; phone: string }>();

  return (
    <section className={floating ? "-mt-10 relative z-10" : "relative"}>
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="rounded-[2rem] bg-white p-6 shadow-[0_24px_60px_rgba(18,41,110,.12)] ring-1 ring-slate-100">
          <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[hsl(42,94%,95%)] px-3 py-1 text-sm font-semibold text-[hsl(33,89%,38%)]">
                <HeartHandshake className="h-4 w-4" />
                Tư vấn nhanh trong giờ làm việc
              </div>
              <h2 className="mt-3 text-2xl font-bold text-[hsl(223,68%,24%)]">
                Để lại số điện thoại để được gọi lại và gợi ý dịch vụ phù hợp
              </h2>
              <p className="mt-2 text-slate-600">
                Phù hợp khi bạn cần hỏi nhanh về tình trạng hiện tại, khung giờ trống hoặc chi phí dự kiến.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(async (data) => {
                try {
                  await create.mutateAsync({ data });
                  toast({
                    title: "Đã gửi yêu cầu",
                    description: "Đội ngũ sẽ liên hệ lại với bạn trong thời gian sớm nhất.",
                  });
                  reset();
                } catch {
                  toast({
                    title: "Chưa gửi được yêu cầu",
                    description: "Vui lòng thử lại sau ít phút hoặc gọi trực tiếp hotline.",
                    variant: "destructive",
                  });
                }
              })}
              className="grid gap-3 md:grid-cols-[1fr_1fr_auto]"
            >
              <div>
                <input
                  {...register("name", { required: "Vui lòng nhập họ và tên" })}
                  placeholder="Họ và tên"
                  className="h-12 w-full rounded-full border border-slate-200 px-5 outline-none transition focus:border-[hsl(223,68%,39%)] focus:ring-4 focus:ring-[rgba(37,80,181,.12)]"
                />
                <FieldError message={errors.name?.message} />
              </div>
              <div>
                <input
                  {...register("phone", phoneRules)}
                  placeholder="Số điện thoại"
                  className="h-12 w-full rounded-full border border-slate-200 px-5 outline-none transition focus:border-[hsl(223,68%,39%)] focus:ring-4 focus:ring-[rgba(37,80,181,.12)]"
                />
                <FieldError message={errors.phone?.message} />
              </div>
              <button
                disabled={isSubmitting}
                className={`inline-flex min-h-12 items-center justify-center rounded-full bg-[hsl(223,68%,39%)] px-6 py-3 font-semibold text-white transition hover:bg-[hsl(223,68%,32%)] disabled:cursor-not-allowed disabled:opacity-60 ${isSubmitting ? "animate-pulse" : ""}`}
              >
                {isSubmitting ? "Đang gửi..." : "Nhận tư vấn"}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AboutPreview({ services }: { services: ServiceItem[] }) {
  const imageUrl = services[0]?.imageUrl || LOGO_URL;

  return (
    <section className="py-20">
      <Reveal className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div className="relative">
          <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-[2rem] bg-[linear-gradient(180deg,rgba(255,214,125,.85),rgba(255,236,194,.65))]" />
          <img
            src={imageUrl}
            alt={`${CLINIC_PROFILE.name} không gian và dịch vụ`}
            className="relative h-[430px] w-full rounded-[2rem] object-cover shadow-xl"
          />
          <div className="premium-panel absolute -bottom-6 right-6 max-w-xs rounded-[1.6rem] p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(223,68%,39%)]">
              Trải nghiệm tại phòng khám
            </div>
            <div className="mt-2 text-lg font-semibold text-[hsl(223,68%,22%)]">
              Không gian sáng, quy trình rõ và phù hợp cho cả khách mới lẫn gia đình tái khám định kỳ
            </div>
          </div>
        </div>
        <div>
          <SectionHeading
            eyebrow="Giới thiệu"
            title={`${CLINIC_PROFILE.name} - Đồng hành cùng nụ cười khỏe đẹp cho cả gia đình`}
            description="Phòng khám tập trung vào trải nghiệm thăm khám nhẹ nhàng, giao tiếp rõ ràng và lộ trình điều trị phù hợp thay vì tạo áp lực cho khách hàng."
          />
          <div className="mt-6 space-y-4 text-slate-600">
            <p>
              Từ lần khám đầu tiên, đội ngũ sẽ lắng nghe nhu cầu, kiểm tra tình trạng và giải thích phương án phù hợp với mục tiêu của bạn: điều trị, phục hình hay cải thiện thẩm mỹ.
            </p>
            <p>
              Chúng tôi ưu tiên cảm giác yên tâm và dễ hiểu trong suốt hành trình, từ đặt lịch, tiếp đón, thực hiện dịch vụ đến chăm sóc sau điều trị.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {SITE_FACTS.map((fact) => (
              <div key={fact.label} className="premium-panel rounded-[1.5rem] p-5">
                <div className="text-3xl font-bold text-[hsl(223,68%,39%)]">{fact.value}</div>
                <div className="mt-2 text-sm leading-6 text-slate-600">{fact.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/gioi-thieu"
              className="inline-flex items-center gap-2 rounded-full bg-[hsl(223,68%,39%)] px-6 py-3 font-semibold text-white transition hover:bg-[hsl(223,68%,32%)]"
            >
              Tìm hiểu thêm
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ServiceCard({ service }: { service: ServiceItem }) {
  const highlights = getServiceHighlights(service.name).slice(0, 2);

  return (
    <article className="group premium-card overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_26px_50px_rgba(15,39,103,.12)]">
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <img
          src={service.imageUrl || LOGO_URL}
          alt={service.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[hsl(223,68%,24%)] shadow-sm backdrop-blur">
          <Stethoscope className="h-3.5 w-3.5 text-[hsl(223,68%,39%)]" />
          Dịch vụ được quan tâm nhiều
        </div>
      </div>
      <div className="relative p-6">
        <div className="absolute right-6 top-0 h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(37,80,181,.14),transparent_70%)]" />
        <h3 className="text-xl font-semibold text-[hsl(223,68%,24%)]">{service.name}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{buildExcerpt(service.description, 135)}</p>
        <div className="mt-4 space-y-2">
          {highlights.map((item) => (
            <div key={item} className="flex items-start gap-2 text-sm text-slate-600">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(42,94%,52%)]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <Link
          href={`/dich-vu/${slugify(service.name)}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(223,68%,39%)]"
        >
          Xem chi tiết
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function ServicesPreview({ services, loading = false }: { services: ServiceItem[]; loading?: boolean }) {
  return (
    <section className="bg-[linear-gradient(180deg,#f7f9ff_0%,#fff_100%)] py-20">
      <Reveal className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Dịch vụ"
            title="Danh mục điều trị và chăm sóc răng miệng dễ xem, dễ chọn"
            description="Mỗi dịch vụ đều có phần giới thiệu ngắn, lợi ích nổi bật và trang chi tiết riêng để khách hàng đọc kỹ trước khi đặt lịch."
          />
          <Link
            href="/dich-vu"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-[hsl(223,68%,24%)] transition hover:border-[hsl(223,68%,39%)] hover:text-[hsl(223,68%,39%)]"
          >
            Xem tất cả dịch vụ
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <LoadingCard className="h-56 w-full rounded-[1.5rem]" />
                  <LoadingCard className="mt-5 h-6 w-2/3" />
                  <LoadingCard className="mt-3 h-4 w-full" />
                  <LoadingCard className="mt-2 h-4 w-5/6" />
                  <LoadingCard className="mt-5 h-4 w-1/2" />
                </div>
              ))
            : services.slice(0, 6).map((service) => <ServiceCard key={service.id} service={service} />)}
        </div>
      </Reveal>
    </section>
  );
}

function CommitmentsSection() {
  return (
    <section className="relative py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(225,236,255,.7),transparent)]" />
      <Reveal className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[.95fr_1.05fr] lg:items-start">
        <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(150deg,hsl(223,68%,39%),hsl(226,55%,23%))] p-8 text-white shadow-xl">
          <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-16 left-8 h-28 w-28 rounded-full bg-[hsl(42,94%,58%)]/20 blur-2xl" />
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm">
            <ShieldCheck className="h-4 w-4 text-[hsl(42,94%,58%)]" />
            Vì sao nhiều khách hàng giới thiệu người thân
          </div>
          <h2 className="mt-5 text-3xl font-bold">Trải nghiệm thăm khám rõ ràng, nhẹ nhàng và đáng tin hơn</h2>
          <p className="mt-4 text-blue-50/95">
            Điều chúng tôi ưu tiên không chỉ là hoàn thiện dịch vụ, mà còn là cảm giác yên tâm trong suốt hành trình của khách hàng.
          </p>
          <div className="mt-8 grid gap-4">
            {TRUST_SIGNALS.map((signal) => (
              <div key={signal} className="flex items-start gap-3 rounded-[1.4rem] bg-white/10 p-4 backdrop-blur transition duration-300 hover:bg-white/14">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[hsl(42,94%,58%)]" />
                <span className="text-blue-50">{signal}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {COMMITMENTS.map((item) => (
            <div key={item.title} className="premium-panel rounded-[1.6rem] p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[hsl(42,94%,94%)] text-[hsl(33,89%,38%)]">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[hsl(223,68%,24%)]">{item.title}</h3>
                  <p className="mt-2 text-slate-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(90deg,hsl(223,68%,26%),hsl(223,68%,39%))] py-16">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-64 bg-[radial-gradient(circle,rgba(255,255,255,.14),transparent_70%)]" />
      <div className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-[hsl(42,94%,58%)]/20 blur-3xl" />
      <Reveal className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 xl:grid-cols-4">
        {SITE_FACTS.map((fact) => (
          <div key={fact.label} className="rounded-[1.8rem] border border-white/15 bg-white/10 p-8 text-white backdrop-blur transition duration-300 hover:-translate-y-1">
            <div className="text-4xl font-bold">
              <CountUp value={fact.value} suffix={fact.value.includes("+") ? "+" : ""} />
            </div>
            <div className="mt-3 text-sm leading-6 text-blue-100">{fact.label}</div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

function PromotionCard({ promo }: { promo: PromotionItem }) {
  return (
    <article className="premium-card relative overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="absolute right-4 top-4 rounded-full bg-[hsl(42,94%,58%)] px-3 py-1 text-xs font-bold text-[hsl(223,68%,18%)]">
        Ưu đãi
      </div>
      <div className="inline-flex items-center gap-2 rounded-full bg-[hsl(223,68%,95%)] px-3 py-1 text-xs font-semibold text-[hsl(223,68%,39%)]">
        Áp dụng đến {promo.validUntil}
      </div>
      <h3 className="mt-4 pr-16 text-xl font-semibold text-[hsl(223,68%,24%)]">{promo.title}</h3>
      <p className="mt-3 min-h-16 text-sm leading-6 text-slate-600">{promo.content}</p>
      <div className="mt-6 text-3xl font-bold text-[hsl(223,68%,39%)]">{promo.price}</div>
      <a
        href="/lien-he#booking"
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-[hsl(223,68%,24%)] transition hover:border-[hsl(223,68%,39%)] hover:text-[hsl(223,68%,39%)]"
      >
        Đăng ký ngay
      </a>
    </article>
  );
}

function PromotionsPreview({ promotions, loading = false }: { promotions: PromotionItem[]; loading?: boolean }) {
  return (
    <section className="bg-slate-50 py-20">
      <Reveal className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Khuyến mãi"
            title="Ưu đãi đang diễn ra để bạn chủ động lên lịch phù hợp"
            description="Danh sách ưu đãi được cập nhật từ hệ thống quản trị để khách hàng dễ theo dõi và đăng ký nhanh."
          />
          <Link
            href="/khuyen-mai"
            className="inline-flex items-center gap-2 rounded-full bg-[hsl(223,68%,24%)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[hsl(223,68%,39%)]"
          >
            Xem toàn bộ
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <LoadingCard className="h-6 w-24" />
                  <LoadingCard className="mt-5 h-6 w-5/6" />
                  <LoadingCard className="mt-3 h-4 w-full" />
                  <LoadingCard className="mt-2 h-4 w-4/5" />
                  <LoadingCard className="mt-8 h-8 w-1/2" />
                </div>
              ))
            : promotions.slice(0, 4).map((promo) => <PromotionCard key={promo.id} promo={promo} />)}
        </div>
      </Reveal>
    </section>
  );
}

function TestimonialCard({ item }: { item: FeedbackItem }) {
  return (
    <article className="premium-card rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src={item.imageUrl || LOGO_URL}
          alt={item.name}
          className="h-16 w-16 rounded-2xl object-cover"
        />
        <div>
          <div className="font-semibold text-[hsl(223,68%,24%)]">{item.name}</div>
          <div className="text-sm text-slate-500">{item.service}</div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1 text-[hsl(42,94%,52%)]">
        {Array.from({ length: item.rating || 5 }).map((_, current) => (
          <Star key={current} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="mt-4 text-sm italic leading-7 text-slate-600">“{item.content}”</p>
    </article>
  );
}

function TestimonialsSection({ feedback, loading = false }: { feedback: FeedbackItem[]; loading?: boolean }) {
  return (
    <section id="feedback" className="py-20">
      <Reveal className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Khách hàng"
          title="Phản hồi thật sau khi trải nghiệm dịch vụ"
          description="Những chia sẻ ngắn gọn giúp người mới hình dung rõ hơn về phong cách phục vụ và cảm giác sau điều trị."
          center
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <LoadingCard className="h-16 w-16 rounded-2xl" />
                    <div className="flex-1">
                      <LoadingCard className="h-5 w-2/3" />
                      <LoadingCard className="mt-2 h-4 w-1/2" />
                    </div>
                  </div>
                  <LoadingCard className="mt-6 h-4 w-full" />
                  <LoadingCard className="mt-2 h-4 w-5/6" />
                  <LoadingCard className="mt-2 h-4 w-4/5" />
                </div>
              ))
            : feedback.slice(0, 6).map((item) => <TestimonialCard key={item.id} item={item} />)}
        </div>
      </Reveal>
    </section>
  );
}

function FaqSection({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: { question: string; answer: string }[];
}) {
  return (
    <section className="relative py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(241,246,255,.9),transparent)]" />
      <Reveal className="mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow="FAQ" title={title} description={description} center />
        <div className="mx-auto mt-10 grid max-w-4xl gap-4">
          {items.map((item) => (
            <details key={item.question} className="faq-item group rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(15,39,103,.08)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-[hsl(223,68%,24%)]">
                <span>{item.question}</span>
                <ChevronRight className="faq-icon h-5 w-5 flex-shrink-0 text-[hsl(223,68%,39%)]" />
              </summary>
              <div className="faq-answer">
                <p className="pt-4 leading-7 text-slate-600">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function BookingSection({ services }: { services: ServiceItem[] }) {
  const { toast } = useToast();
  const create = useCreateBooking();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<{
    name: string;
    phone: string;
    service: string;
    appointmentTime: string;
  }>();

  return (
    <section id="booking" className="relative overflow-hidden bg-[linear-gradient(135deg,hsl(223,68%,39%),hsl(226,55%,23%))] py-20">
      <div className="pointer-events-none absolute -left-12 top-10 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-[hsl(42,94%,58%)]/15 blur-3xl" />
      <Reveal className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div className="text-white">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm">
            <CalendarDays className="h-4 w-4 text-[hsl(42,94%,58%)]" />
            Đặt lịch thăm khám
          </div>
          <h2 className="mt-4 text-4xl font-bold">Đăng ký lịch hẹn chỉ với vài thông tin cơ bản</h2>
          <p className="mt-4 text-lg text-blue-50/95">
            Bạn có thể để lại nhu cầu chính ngay bây giờ, đội ngũ sẽ liên hệ xác nhận lại để chốt lịch phù hợp.
          </p>
          <div className="mt-8 grid gap-4">
            {BOOKING_STEPS.map((item, index) => (
              <div key={item} className="flex items-start gap-4 rounded-[1.4rem] bg-white/10 p-4 backdrop-blur">
                <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-[hsl(42,94%,58%)] text-[hsl(223,68%,18%)] font-bold">
                  {index + 1}
                </div>
                <div className="pt-1 text-blue-50">{item}</div>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              await create.mutateAsync({ data });
              toast({
                title: "Đặt lịch thành công",
                description: "Phòng khám sẽ liên hệ lại để xác nhận lịch phù hợp với bạn.",
              });
              reset();
            } catch {
              toast({
                title: "Chưa gửi được lịch hẹn",
                description: "Vui lòng thử lại hoặc gọi trực tiếp hotline để được hỗ trợ nhanh hơn.",
                variant: "destructive",
              });
            }
          })}
          className="premium-panel rounded-[2rem] bg-white p-7 shadow-[0_25px_70px_rgba(16,31,88,.25)]"
        >
          <div className="mb-5">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[hsl(223,68%,39%)]">
              Nhận lịch tư vấn
            </div>
            <div className="mt-2 text-2xl font-bold text-[hsl(223,68%,24%)]">
              Phù hợp cho khách mới và khách tái khám
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <input
                {...register("name", { required: "Vui lòng nhập họ và tên" })}
                placeholder="Họ và tên *"
                className="h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-[hsl(223,68%,39%)] focus:ring-4 focus:ring-[rgba(37,80,181,.12)]"
              />
              <FieldError message={errors.name?.message} />
            </div>
            <div>
              <input
                {...register("phone", phoneRules)}
                placeholder="Số điện thoại *"
                className="h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-[hsl(223,68%,39%)] focus:ring-4 focus:ring-[rgba(37,80,181,.12)]"
              />
              <FieldError message={errors.phone?.message} />
            </div>
            <div>
              <select
                {...register("service")}
                className="h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-[hsl(223,68%,39%)] focus:ring-4 focus:ring-[rgba(37,80,181,.12)]"
              >
                <option value="">Chọn dịch vụ quan tâm</option>
                {services.map((service) => (
                  <option key={service.id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                {...register("appointmentTime")}
                type="datetime-local"
                className="h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-[hsl(223,68%,39%)] focus:ring-4 focus:ring-[rgba(37,80,181,.12)]"
              />
            </div>
          </div>

          <button
            disabled={isSubmitting}
            className={`mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[hsl(42,94%,58%)] px-6 py-3 font-semibold text-[hsl(223,68%,18%)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 ${isSubmitting ? "animate-pulse" : ""}`}
          >
            {isSubmitting ? "Đang gửi lịch..." : "Đặt lịch ngay"}
            <ArrowRight className="h-4 w-4" />
          </button>
          <p className="mt-3 text-sm text-slate-500">
            Sau khi nhận thông tin, phòng khám sẽ gọi lại để xác nhận khung giờ phù hợp.
          </p>
        </form>
      </Reveal>
    </section>
  );
}

function PostCard({ post, basePath }: { post: PostItem; basePath: string }) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(18,41,110,.12)]">
      <div className="overflow-hidden bg-slate-100">
        <img
          src={post.imageUrl || LOGO_URL}
          alt={post.title}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[hsl(223,68%,39%)]">
          {post.category}
        </div>
        <h3 className="mt-3 text-xl font-semibold text-[hsl(223,68%,24%)]">{post.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{post.excerpt}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-500">{new Date(post.createdAt).toLocaleDateString("vi-VN")}</span>
          <Link
            href={`${basePath}/${slugify(post.title)}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(223,68%,39%)]"
          >
            Đọc thêm
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function BlogPreview({ posts, loading = false }: { posts: PostItem[]; loading?: boolean }) {
  return (
    <section className="py-20">
      <Reveal className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Kiến thức"
            title="Nội dung hữu ích để bạn tìm hiểu trước khi đi khám"
            description="Bài viết được tách thành trang riêng để dễ đọc, dễ chia sẻ và thuận tiện cho SEO lâu dài."
          />
          <div className="flex gap-3">
            <Link
              href="/kien-thuc"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-[hsl(223,68%,24%)] transition hover:border-[hsl(223,68%,39%)] hover:text-[hsl(223,68%,39%)]"
            >
              Xem kiến thức
            </Link>
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-2 rounded-full bg-[hsl(223,68%,24%)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[hsl(223,68%,39%)]"
            >
              Xem tin tức
            </Link>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <LoadingCard className="h-56 w-full rounded-[1.5rem]" />
                  <LoadingCard className="mt-5 h-4 w-1/3" />
                  <LoadingCard className="mt-3 h-6 w-5/6" />
                  <LoadingCard className="mt-3 h-4 w-full" />
                  <LoadingCard className="mt-2 h-4 w-4/5" />
                </div>
              ))
            : posts.slice(0, 3).map((post) => (
                <PostCard key={post.id} post={post} basePath={getPostBasePath(post.category)} />
              ))}
        </div>
      </Reveal>
    </section>
  );
}

function ContactInformation() {
  const mapEmbed =
    "https://www.google.com/maps?q=134%2F5%20B%E1%BA%A1ch%20L%C3%A2m%201%2C%20X%C3%A3%20Th%E1%BB%91ng%20Nh%E1%BA%A5t%2C%20T%E1%BB%89nh%20%C4%90%E1%BB%93ng%20Nai&z=15&output=embed";

  return (
    <section className="py-20">
      <Reveal className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Liên hệ"
          title="Thông tin rõ ràng để khách hàng dễ gọi, dễ tìm và dễ đặt lịch"
          description="Bạn có thể gọi trực tiếp, xem bản đồ hoặc để lại yêu cầu để được đội ngũ hỗ trợ trong thời gian ngắn."
          center
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {CONTACT_CARDS.map((card) => (
            <div key={card.title} className="rounded-[1.8rem] border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[hsl(223,68%,95%)] text-[hsl(223,68%,39%)]">
                {card.title === "Hotline" ? <Phone className="h-5 w-5" /> : null}
                {card.title === "Địa chỉ" ? <MapPin className="h-5 w-5" /> : null}
                {card.title === "Email" ? <Mail className="h-5 w-5" /> : null}
                {card.title === "Website" ? <Search className="h-5 w-5" /> : null}
              </div>
              <div className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">{card.title}</div>
              {card.href ? (
                <a href={card.href} className="mt-3 block text-lg font-semibold text-[hsl(223,68%,24%)]">
                  {card.value}
                </a>
              ) : (
                <div className="mt-3 text-lg font-semibold text-[hsl(223,68%,24%)]">{card.value}</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <iframe
              title="Bản đồ Nha Khoa Uy Đức Smile"
              src={mapEmbed}
              loading="lazy"
              className="h-[380px] w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-[hsl(223,68%,24%)]">Đến phòng khám thuận tiện hơn</h3>
            <div className="mt-5 space-y-4 text-slate-600">
              <div className="flex gap-3">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-[hsl(223,68%,39%)]" />
                <div>
                  <div className="font-semibold text-[hsl(223,68%,24%)]">Địa chỉ</div>
                  <div>{CLINIC_PROFILE.fullAddress}</div>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock3 className="mt-1 h-5 w-5 flex-shrink-0 text-[hsl(223,68%,39%)]" />
                <div>
                  <div className="font-semibold text-[hsl(223,68%,24%)]">Giờ làm việc</div>
                  <div>{CLINIC_PROFILE.hours.weekdays}</div>
                  <div>{CLINIC_PROFILE.hours.sunday}</div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={GOOGLE_MAPS_URL}
                className="inline-flex items-center gap-2 rounded-full bg-[hsl(223,68%,39%)] px-5 py-3 font-semibold text-white"
              >
                <MapPin className="h-4 w-4" />
                Mở Google Maps
              </a>
              <a
                href={`tel:${CLINIC_PROFILE.hotline.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 font-semibold text-[hsl(223,68%,24%)]"
              >
                <Phone className="h-4 w-4" />
                Gọi ngay
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ServicesListing({ services }: { services: ServiceItem[] }) {
  if (!services.length) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center text-slate-500">
        Phòng khám đang cập nhật thêm nội dung dịch vụ. Vui lòng quay lại sau hoặc liên hệ trực tiếp để được tư vấn.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}

function ServiceDetailBody({ service, related }: { service: ServiceItem; related: ServiceItem[] }) {
  const bullets = getServiceHighlights(service.name);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 shadow-sm">
            <img src={service.imageUrl || LOGO_URL} alt={service.name} className="h-[420px] w-full object-cover" />
          </div>
          <div className="prose prose-slate mt-8 max-w-none">
            <p>{service.description}</p>
            {splitParagraphs(service.description).length === 1 ? (
              <>
                <p>
                  Với mỗi khách hàng, bác sĩ sẽ kiểm tra kỹ tình trạng hiện tại trước khi đề xuất phương án phù hợp, ưu tiên cảm giác yên tâm và dễ hiểu trong suốt quá trình.
                </p>
                <p>
                  Bạn sẽ được giải thích rõ mục tiêu điều trị, các bước thực hiện, thời gian dự kiến và cách chăm sóc sau dịch vụ để duy trì kết quả ổn định hơn.
                </p>
              </>
            ) : null}
          </div>
        </div>
        <div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-[hsl(223,68%,95%)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[hsl(223,68%,39%)]">
              Dịch vụ chi tiết
            </div>
            <h1 className="mt-4 text-4xl font-bold text-[hsl(223,68%,24%)]">{service.name}</h1>
            <p className="mt-4 text-slate-600">{service.description}</p>
            <div className="mt-8 space-y-4">
              {bullets.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.4rem] bg-slate-50 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-[hsl(223,68%,39%)]" />
                  <span className="text-slate-600">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-slate-200 p-4">
                <div className="text-sm text-slate-500">Hotline tư vấn</div>
                <a href={`tel:${CLINIC_PROFILE.hotline.replace(/\s+/g, "")}`} className="mt-2 block text-lg font-semibold text-[hsl(223,68%,24%)]">
                  {CLINIC_PROFILE.hotline}
                </a>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200 p-4">
                <div className="text-sm text-slate-500">Đặt lịch nhanh</div>
                <a href="/lien-he#booking" className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-[hsl(223,68%,39%)]">
                  Chuyển tới form đặt lịch
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] bg-[linear-gradient(140deg,hsl(223,68%,30%),hsl(223,68%,42%))] p-7 text-white shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-[hsl(42,94%,58%)]">
              Điều khách hàng quan tâm
            </div>
            <div className="mt-3 text-2xl font-bold">
              Phương án phù hợp sẽ được quyết định sau khi thăm khám trực tiếp
            </div>
            <p className="mt-3 text-blue-50">
              Mỗi tình trạng răng miệng khác nhau sẽ cần lộ trình khác nhau. Đặt lịch trước để được tư vấn rõ hơn và tiết kiệm thời gian khi đến phòng khám.
            </p>
          </div>
        </div>
      </div>

      <FaqSection
        title="Câu hỏi thường gặp về dịch vụ"
        description="Một vài thắc mắc phổ biến trước khi quyết định đặt lịch thăm khám."
        items={FAQ_SERVICES}
      />

      <div className="mt-4">
        <SectionHeading
          eyebrow="Dịch vụ liên quan"
          title="Có thể bạn cũng đang quan tâm các dịch vụ này"
          description="Khách hàng thường xem thêm các dịch vụ liên quan trước khi chốt lịch tư vấn."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {related.map((item) => (
            <ServiceCard key={item.id} service={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PostListing({
  posts,
  title,
  description,
  basePath,
  loading = false,
}: {
  posts: PostItem[];
  title: string;
  description: string;
  basePath: string;
  loading?: boolean;
}) {
  const [query, setQuery] = useState("");
  const filtered = posts.filter((post) => {
    if (!query.trim()) return true;
    const haystack = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
    return haystack.includes(query.trim().toLowerCase());
  });

  return (
    <>
      <Breadcrumb title={title} current={title} />
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <p className="max-w-3xl text-slate-600">{description}</p>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Tìm bài viết"
                className="h-12 w-full min-w-[280px] rounded-full border border-slate-200 bg-white pl-11 pr-5 outline-none transition focus:border-[hsl(223,68%,39%)]"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <LoadingCard className="h-56 w-full rounded-[1.5rem]" />
                  <LoadingCard className="mt-5 h-4 w-1/3" />
                  <LoadingCard className="mt-3 h-6 w-5/6" />
                  <LoadingCard className="mt-3 h-4 w-full" />
                  <LoadingCard className="mt-2 h-4 w-4/5" />
                </div>
              ))
            : filtered.map((post) => <PostCard key={post.id} post={post} basePath={basePath} />)}
        </div>
        {!loading && !filtered.length ? (
          <div className="mx-auto mt-8 max-w-3xl px-4">
            <EmptyStateCard
              title="Chưa có bài viết phù hợp"
              description="Thử đổi từ khóa tìm kiếm hoặc quay lại sau khi phòng khám cập nhật thêm nội dung mới."
            />
          </div>
        ) : null}
      </section>
    </>
  );
}

function PostDetailBody({
  post,
  latest,
  basePath,
}: {
  post: PostItem;
  latest: PostItem[];
  basePath: string;
}) {
  const paragraphs = splitParagraphs(post.content);

  return (
    <>
      <Breadcrumb title={post.title} current={post.category} />
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1fr_360px]">
          <article>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span className="rounded-full bg-[hsl(223,68%,95%)] px-3 py-1 font-semibold text-[hsl(223,68%,39%)]">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock3 className="h-4 w-4" />
                {new Date(post.createdAt).toLocaleDateString("vi-VN")}
              </span>
            </div>
            <h1 className="mt-4 text-4xl font-bold text-[hsl(223,68%,24%)]">{post.title}</h1>
            <p className="mt-4 text-lg text-slate-600">{post.excerpt}</p>
            <img
              src={post.imageUrl || LOGO_URL}
              alt={post.title}
              className="mt-8 h-[430px] w-full rounded-[2rem] object-cover shadow-sm"
            />
            <div className="prose prose-slate mt-8 max-w-none">
              {paragraphs.length ? paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>) : <p>{post.content}</p>}
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-[hsl(223,68%,24%)]">Bài viết mới</h3>
              <div className="mt-5 space-y-4">
                {latest.map((item) => (
                  <Link key={item.id} href={`${getPostBasePath(item.category)}/${slugify(item.title)}`} className="flex gap-4">
                    <img src={item.imageUrl || LOGO_URL} alt={item.title} className="h-20 w-20 rounded-2xl object-cover" />
                    <div>
                      <div className="text-sm font-semibold text-[hsl(223,68%,24%)]">{item.title}</div>
                      <div className="mt-2 text-xs text-slate-500">{new Date(item.createdAt).toLocaleDateString("vi-VN")}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] bg-[linear-gradient(140deg,hsl(223,68%,30%),hsl(223,68%,42%))] p-6 text-white shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-[hsl(42,94%,58%)]">
                Cần tư vấn thêm?
              </div>
              <div className="mt-3 text-2xl font-bold">Liên hệ trực tiếp để được hướng dẫn phù hợp với tình trạng của bạn</div>
              <a
                href="/lien-he#booking"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-[hsl(223,68%,24%)]"
              >
                Đặt lịch tư vấn
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function MissingState({
  title,
  description,
  backHref,
  backLabel,
}: {
  title: string;
  description: string;
  backHref: string;
  backLabel: string;
}) {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-slate-100 text-slate-500">
          <Search className="h-6 w-6" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-[hsl(223,68%,24%)]">{title}</h1>
        <p className="mt-3 text-slate-600">{description}</p>
        <Link
          href={backHref}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[hsl(223,68%,39%)] px-6 py-3 font-semibold text-white"
        >
          {backLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

export function HomePage() {
  const bannersQuery = useListBanners();
  const servicesQuery = useListServices();
  const promotionsQuery = useListPromotions();
  const feedbackQuery = useListFeedback({ approved: true });
  const postsQuery = useListPosts();
  const banners = (bannersQuery.data ?? []) as BannerItem[];
  const services = (servicesQuery.data ?? []) as ServiceItem[];
  const promotions = (promotionsQuery.data ?? []) as PromotionItem[];
  const feedback = (feedbackQuery.data ?? []) as FeedbackItem[];
  const posts = (postsQuery.data ?? []) as PostItem[];

  return (
    <PublicLayout softBackground>
      <SeoHead
        title="Nha khoa gia đình tại Gia Kiệm"
        description="Đặt lịch tư vấn nhanh tại Nha Khoa Uy Đức Smile. Khám kỹ, tư vấn rõ ràng, dịch vụ nhẹ nhàng và đồng hành sau điều trị."
        path="/"
      />
      <StructuredData data={[buildLocalBusinessSchema(), buildWebsiteSchema(), buildFaqSchema(FAQ_HOME)]} />
      <HeroSlider banners={banners} />
      <QuickLeadForm />
      <AboutPreview services={services} />
      <ServicesPreview services={services} loading={servicesQuery.isLoading} />
      <CommitmentsSection />
      <StatsSection />
      <PromotionsPreview promotions={promotions} loading={promotionsQuery.isLoading} />
      <TestimonialsSection feedback={feedback} loading={feedbackQuery.isLoading} />
      <FaqSection
        title="Những điều khách hàng thường hỏi trước khi đặt lịch"
        description="Giải đáp nhanh các thắc mắc thường gặp để bạn dễ quyết định hơn trước khi đến thăm khám."
        items={FAQ_HOME}
      />
      <BookingSection services={services} />
      <BlogPreview posts={posts} loading={postsQuery.isLoading} />
    </PublicLayout>
  );
}

export function AboutPage() {
  const { data: services = [] } = useListServices();
  const aboutStructuredData = [
    buildLocalBusinessSchema(),
    buildBreadcrumbSchema([
      { name: "Trang chủ", path: "/" },
      { name: "Giới thiệu", path: "/gioi-thieu" },
    ]),
  ];

  return (
    <PublicLayout softBackground>
      <StructuredData data={aboutStructuredData} />
      <SeoHead
        title="Giới thiệu phòng khám"
        description="Tìm hiểu về Nha Khoa Uy Đức Smile, đội ngũ đồng hành, phong cách phục vụ và trải nghiệm thăm khám tại Gia Kiệm, Đồng Nai."
        path="/gioi-thieu"
      />
      <Breadcrumb title={`Giới thiệu ${CLINIC_PROFILE.name}`} current="Giới thiệu" />
      <AboutPreview services={services as ServiceItem[]} />
      <CommitmentsSection />
      <StatsSection />
      <ContactInformation />
    </PublicLayout>
  );
}

export function ServicesPage() {
  const { data: services = [] } = useListServices();
  const servicesStructuredData = [
    buildBreadcrumbSchema([
      { name: "Trang chủ", path: "/" },
      { name: "Dịch vụ", path: "/dich-vu" },
    ]),
    buildFaqSchema(FAQ_SERVICES),
  ];

  return (
    <PublicLayout softBackground>
      <StructuredData data={servicesStructuredData} />
      <SeoHead
        title="Dịch vụ nha khoa"
        description="Xem danh mục dịch vụ tại Nha Khoa Uy Đức Smile, từ thăm khám, điều trị, phục hình đến chăm sóc thẩm mỹ răng miệng."
        path="/dich-vu"
      />
      <Breadcrumb title="Dịch vụ" current="Dịch vụ" />
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <p className="max-w-3xl text-slate-600">
            Mỗi dịch vụ đều có mô tả ngắn, lợi ích nổi bật và trang chi tiết riêng để khách hàng dễ tìm hiểu trước khi đặt lịch thăm khám.
          </p>
        </div>
      </section>
      <ServicesListing services={services as ServiceItem[]} />
      <FaqSection
        title="Câu hỏi thường gặp khi chọn dịch vụ"
        description="Một vài giải đáp ngắn gọn trước khi bạn quyết định đi khám hoặc làm dịch vụ."
        items={FAQ_SERVICES}
      />
    </PublicLayout>
  );
}

export function ServiceDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { data: services = [] } = useListServices();
  const service = (services as ServiceItem[]).find((item) => slugify(item.name) === slug);

  return (
    <PublicLayout softBackground>
      {service ? (
        <>
          <StructuredData
            data={[
              buildBreadcrumbSchema([
                { name: "Trang chủ", path: "/" },
                { name: "Dịch vụ", path: "/dich-vu" },
                { name: service.name, path: `/dich-vu/${slug}` },
              ]),
              buildServiceSchema({
                name: service.name,
                description: service.description,
                imageUrl: service.imageUrl,
                slug,
              }),
              buildFaqSchema(FAQ_SERVICES),
            ]}
          />
          <SeoHead
            title={service.name}
            description={buildExcerpt(service.description, 150)}
            path={`/dich-vu/${slug}`}
          />
          <ServiceDetailBody
            service={service}
            related={(services as ServiceItem[]).filter((item) => item.id !== service.id).slice(0, 3)}
          />
        </>
      ) : (
        <>
          <SeoHead
            title="Không tìm thấy dịch vụ"
            description="Dịch vụ này hiện chưa có trong hệ thống hoặc đường dẫn không còn chính xác."
            path={`/dich-vu/${slug}`}
            noIndex
          />
          <MissingState
            title="Không tìm thấy dịch vụ"
            description="Dịch vụ này có thể chưa được cập nhật trong hệ thống hoặc đường dẫn hiện không còn chính xác."
            backHref="/dich-vu"
            backLabel="Quay lại danh sách dịch vụ"
          />
        </>
      )}
    </PublicLayout>
  );
}

export function KnowledgePage() {
  const postsQuery = useListPosts();
  const posts = (postsQuery.data ?? []) as PostItem[];
  const knowledgePosts = posts.filter((post) => getPostBasePath(post.category) === "/kien-thuc");

  return (
    <PublicLayout softBackground>
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Trang chủ", path: "/" },
          { name: "Kiến thức", path: "/kien-thuc" },
        ])}
      />
      <SeoHead
        title="Kiến thức nha khoa"
        description="Tổng hợp bài viết kiến thức nha khoa, lưu ý chăm sóc răng miệng và các thông tin cần biết trước khi đi khám."
        path="/kien-thuc"
      />
      <PostListing
        posts={knowledgePosts}
        title="Kiến thức"
        description="Những nội dung hữu ích giúp bạn hiểu rõ hơn về chăm sóc răng miệng, lựa chọn dịch vụ và các lưu ý trước - sau điều trị."
        basePath="/kien-thuc"
        loading={postsQuery.isLoading}
      />
    </PublicLayout>
  );
}

export function NewsPage() {
  const postsQuery = useListPosts();
  const posts = (postsQuery.data ?? []) as PostItem[];
  const newsPosts = posts.filter((post) => getPostBasePath(post.category) === "/tin-tuc");

  return (
    <PublicLayout softBackground>
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Trang chủ", path: "/" },
          { name: "Tin tức", path: "/tin-tuc" },
        ])}
      />
      <SeoHead
        title="Tin tức phòng khám"
        description="Cập nhật thông tin mới, ưu đãi và những hoạt động nổi bật từ Nha Khoa Uy Đức Smile."
        path="/tin-tuc"
      />
      <PostListing
        posts={newsPosts}
        title="Tin tức"
        description="Các cập nhật mới từ phòng khám, chương trình ưu đãi và thông tin hữu ích để khách hàng theo dõi thuận tiện hơn."
        basePath="/tin-tuc"
        loading={postsQuery.isLoading}
      />
    </PublicLayout>
  );
}

export function PostDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const [location] = useLocation();
  const { data: posts = [] } = useListPosts();
  const post = (posts as PostItem[]).find((item) => slugify(item.title) === slug);
  const routeBasePath = location.startsWith("/tin-tuc") ? "/tin-tuc" : "/kien-thuc";
  const preferredBasePath = post ? getPostBasePath(post.category) : routeBasePath;

  return (
    <PublicLayout softBackground>
      {post ? (
        <>
          <StructuredData
            data={[
              buildBreadcrumbSchema([
                { name: "Trang chủ", path: "/" },
                {
                  name: preferredBasePath === "/tin-tuc" ? "Tin tức" : "Kiến thức",
                  path: preferredBasePath,
                },
                { name: post.title, path: `${preferredBasePath}/${slug}` },
              ]),
              buildArticleSchema({
                title: post.title,
                excerpt: post.excerpt,
                imageUrl: post.imageUrl,
                createdAt: post.createdAt,
                category: post.category,
                path: `${preferredBasePath}/${slug}`,
              }),
            ]}
          />
          <SeoHead
            title={post.title}
            description={post.excerpt}
            path={`${preferredBasePath}/${slug}`}
            type="article"
            noIndex={routeBasePath !== preferredBasePath}
          />
          <PostDetailBody
            post={post}
            latest={(posts as PostItem[]).filter((item) => item.id !== post.id).slice(0, 4)}
            basePath={preferredBasePath}
          />
        </>
      ) : (
        <>
          <SeoHead
            title="Không tìm thấy bài viết"
            description="Bài viết này hiện không còn tồn tại hoặc đã thay đổi đường dẫn."
            path={`${routeBasePath}/${slug}`}
            noIndex
          />
          <MissingState
            title="Không tìm thấy bài viết"
            description="Bài viết này có thể đã được cập nhật lại hoặc đường dẫn hiện không còn chính xác."
            backHref={routeBasePath}
            backLabel="Quay lại danh sách bài viết"
          />
        </>
      )}
    </PublicLayout>
  );
}

export function PromotionsPage() {
  const { data: promotions = [] } = useListPromotions();

  return (
    <PublicLayout softBackground>
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Trang chủ", path: "/" },
          { name: "Khuyến mãi", path: "/khuyen-mai" },
        ])}
      />
      <SeoHead
        title="Khuyến mãi nha khoa"
        description="Theo dõi các chương trình ưu đãi và đăng ký lịch hẹn nhanh tại Nha Khoa Uy Đức Smile."
        path="/khuyen-mai"
      />
      <Breadcrumb title="Khuyến mãi" current="Khuyến mãi" />
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <p className="max-w-3xl text-slate-600">
            Cập nhật các ưu đãi đang diễn ra để bạn dễ lựa chọn thời điểm phù hợp cho lần thăm khám tiếp theo.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2 xl:grid-cols-3">
          {(promotions as PromotionItem[]).map((promo) => (
            <PromotionCard key={promo.id} promo={promo} />
          ))}
        </div>
      </section>
      <ContactInformation />
    </PublicLayout>
  );
}

export function ReviewsPage() {
  const feedbackQuery = useListFeedback({ approved: true });
  const feedback = (feedbackQuery.data ?? []) as FeedbackItem[];
  const reviewsStructuredData = [
    buildBreadcrumbSchema([
      { name: "Trang chá»§", path: "/" },
      { name: "Nháº­n xÃ©t", path: "/nhan-xet" },
    ]),
  ];

  return (
    <PublicLayout softBackground>
      <StructuredData data={reviewsStructuredData} />
      <SeoHead
        title="Nháº­n xÃ©t khÃ¡ch hÃ ng"
        description="Xem cáº£m nháº­n, Ä‘Ã¡nh giÃ¡ vÃ  pháº£n há»“i tá»« khÃ¡ch hÃ ng Ä‘Ã£ tráº£i nghiá»‡m dá»‹ch vá»¥ táº¡i phÃ²ng khÃ¡m."
        path="/nhan-xet"
      />
      <Breadcrumb title="Nháº­n xÃ©t khÃ¡ch hÃ ng" current="Nháº­n xÃ©t" />
      <TestimonialsSection feedback={feedback} loading={feedbackQuery.isLoading} />
      <ContactInformation />
    </PublicLayout>
  );
}

export function ContactPage() {
  const { data: services = [] } = useListServices();
  const contactStructuredData = [
    buildLocalBusinessSchema(),
    buildBreadcrumbSchema([
      { name: "Trang chủ", path: "/" },
      { name: "Liên hệ", path: "/lien-he" },
    ]),
    buildFaqSchema(FAQ_CONTACT),
  ];

  return (
    <PublicLayout softBackground>
      <StructuredData data={contactStructuredData} />
      <SeoHead
        title="Liên hệ và đặt lịch"
        description="Liên hệ Nha Khoa Uy Đức Smile qua hotline, email, bản đồ hoặc form đặt lịch để được hỗ trợ nhanh."
        path="/lien-he"
      />
      <Breadcrumb title="Liên hệ" current="Liên hệ" />
      <ContactInformation />
      <FaqSection
        title="Giải đáp nhanh trước khi đến phòng khám"
        description="Một vài thông tin thường gặp về thời gian phản hồi, đổi lịch và cách liên hệ nhanh nhất."
        items={FAQ_CONTACT}
      />
      <BookingSection services={services as ServiceItem[]} />
    </PublicLayout>
  );
}
