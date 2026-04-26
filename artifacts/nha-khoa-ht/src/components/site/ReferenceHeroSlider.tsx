import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LOGO_URL } from "@/lib/api";

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
          title: "Phòng khám nha khoa gia đình tại Gia Kiệm",
          subtitle: null,
          imageUrl: LOGO_URL,
          ctaText: null,
        },
      ];

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative overflow-hidden bg-[#edf2ff]">
      <div className="relative h-[440px] md:h-[560px] xl:h-[660px]">
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
                className="h-full w-full object-cover object-center"
              />
            </div>
          );
        })}

        {slides.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => setIndex((index - 1 + slides.length) % slides.length)}
              className="absolute left-5 top-1/2 z-10 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full bg-white/88 text-slate-700 shadow-[0_10px_24px_rgba(26,43,102,.14)] transition hover:bg-white"
              aria-label="Xem slide trước"
            >
              <ChevronLeft className="h-8 w-8 stroke-[1.8]" />
            </button>
            <button
              type="button"
              onClick={() => setIndex((index + 1) % slides.length)}
              className="absolute right-5 top-1/2 z-10 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full bg-white/88 text-slate-700 shadow-[0_10px_24px_rgba(26,43,102,.14)] transition hover:bg-white"
              aria-label="Xem slide sau"
            >
              <ChevronRight className="h-8 w-8 stroke-[1.8]" />
            </button>

            <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {slides.map((slide, slideIndex) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setIndex(slideIndex)}
                  aria-label={`Chuyển tới slide ${slideIndex + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    slideIndex === index ? "w-10 bg-white" : "w-2.5 bg-white/65 hover:bg-white/90"
                  }`}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
