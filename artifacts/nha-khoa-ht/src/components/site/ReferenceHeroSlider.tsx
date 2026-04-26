import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LOGO_URL } from "@/lib/api";
import fallbackSlideOne from "../../../../../attached_assets/image_1776782870001.png";
import fallbackSlideTwo from "../../../../../attached_assets/image_1776782883752.png";
import fallbackSlideThree from "../../../../../attached_assets/image_1776782911811.png";

type BannerSlide = {
  id: number;
  title: string;
  subtitle?: string | null;
  imageUrl?: string | null;
  ctaText?: string | null;
};

const FALLBACK_SLIDES: BannerSlide[] = [
  {
    id: 0,
    title: "Phòng khám nha khoa gia đình tại Gia Kiệm",
    subtitle: null,
    imageUrl: fallbackSlideOne,
    ctaText: null,
  },
  {
    id: 1,
    title: "Dịch vụ nha khoa nổi bật",
    subtitle: null,
    imageUrl: fallbackSlideTwo,
    ctaText: null,
  },
  {
    id: 2,
    title: "Cảm nhận từ khách hàng",
    subtitle: null,
    imageUrl: fallbackSlideThree,
    ctaText: null,
  },
];

export function ReferenceHeroSlider({ banners }: { banners: BannerSlide[] }) {
  const [index, setIndex] = useState(0);
  const slides = banners.length ? banners : FALLBACK_SLIDES;

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative overflow-hidden bg-[#edf2ff]">
      <div className="relative h-[340px] md:h-[460px] xl:h-[560px]">
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
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,30,80,.06),rgba(11,30,80,.01)_40%,rgba(11,30,80,.10))]" />
            </div>
          );
        })}

        {slides.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => setIndex((index - 1 + slides.length) % slides.length)}
              className="absolute left-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/92 text-slate-700 shadow-[0_10px_24px_rgba(26,43,102,.14)] transition hover:bg-white md:left-6"
              aria-label="Xem slide trước"
            >
              <ChevronLeft className="h-7 w-7 stroke-[1.8]" />
            </button>
            <button
              type="button"
              onClick={() => setIndex((index + 1) % slides.length)}
              className="absolute right-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/92 text-slate-700 shadow-[0_10px_24px_rgba(26,43,102,.14)] transition hover:bg-white md:right-6"
              aria-label="Xem slide sau"
            >
              <ChevronRight className="h-7 w-7 stroke-[1.8]" />
            </button>

            <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
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
