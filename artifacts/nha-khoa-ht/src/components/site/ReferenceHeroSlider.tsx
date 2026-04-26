import { useEffect, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Phone, Sparkles } from "lucide-react";
import { LOGO_URL } from "@/lib/api";
import { CLINIC_PROFILE } from "@/lib/site";

type BannerSlide = {
  id: number;
  title: string;
  subtitle?: string | null;
  imageUrl?: string | null;
  ctaText?: string | null;
};

export function ReferenceHeroSlider({ banners }: { banners: BannerSlide[] }) {
  const [index, setIndex] = useState(0);
  const slides = banners.length
    ? banners
    : [
        {
          id: 0,
          title: "Nha khoa gia đình tận tâm, chuẩn chỉ và minh bạch tại Gia Kiệm",
          subtitle:
            "Thăm khám kỹ, tư vấn rõ ràng, theo dõi sau điều trị và đồng hành lâu dài cho cả gia đình.",
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
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#eef4ff_0%,#ffffff_100%)]">
      <div className="relative h-[420px] sm:h-[500px] lg:h-[620px]">
        {slides.map((slide, slideIndex) => {
          const visible = slideIndex === index;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                visible ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <img
                src={slide.imageUrl || LOGO_URL}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,42,109,.86)_0%,rgba(17,42,109,.7)_34%,rgba(17,42,109,.24)_72%,rgba(17,42,109,.12)_100%)]" />
            </div>
          );
        })}

        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-7xl items-end px-4 pb-10 pt-8 sm:pb-14 lg:items-center lg:pb-0">
            <div className="max-w-3xl text-white">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                <Sparkles className="h-4 w-4 text-[hsl(42,94%,58%)]" />
                Hỗ trợ tư vấn 24/7
              </div>
              <h1 className="mt-5 max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">
                {active.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-blue-50/95 sm:text-lg">
                {active.subtitle || CLINIC_PROFILE.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="/lien-he#booking"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[hsl(223,68%,22%)] shadow-lg shadow-[rgba(12,25,75,.24)] transition hover:-translate-y-0.5"
                >
                  <CalendarDays className="h-4 w-4" />
                  {active.ctaText || "Đặt lịch tư vấn"}
                </a>
                <a
                  href={`tel:${CLINIC_PROFILE.hotline.replace(/\s+/g, "")}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  <Phone className="h-4 w-4" />
                  Gọi {CLINIC_PROFILE.hotline}
                </a>
              </div>
            </div>
          </div>
        </div>

        {slides.length > 1 ? (
          <>
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
              {slides.map((slide, slideIndex) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setIndex(slideIndex)}
                  aria-label={`Chuyển tới slide ${slideIndex + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    slideIndex === index ? "w-9 bg-white" : "w-2.5 bg-white/55 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>

            <div className="absolute bottom-6 right-6 hidden gap-2 sm:flex">
              <button
                type="button"
                onClick={() => setIndex((index - 1 + slides.length) % slides.length)}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/12 text-white backdrop-blur transition hover:bg-white/20"
                aria-label="Xem slide trước"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setIndex((index + 1) % slides.length)}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/12 text-white backdrop-blur transition hover:bg-white/20"
                aria-label="Xem slide sau"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
