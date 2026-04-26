import { ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "wouter";
import { FALLBACK_PROMOTIONS } from "@/lib/fallback-content";

type PromotionItem = {
  id: number;
  title: string;
  content: string;
  price: string;
  validUntil: string;
  imageUrl?: string | null;
};

export function PromotionsShowcaseSection({
  promotions,
}: {
  promotions: PromotionItem[];
}) {
  const items = promotions.length ? promotions : FALLBACK_PROMOTIONS;

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[hsl(42,94%,94%)] px-3 py-1 text-sm font-semibold text-[hsl(33,89%,38%)]">
              Khuyến mãi
            </div>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-[hsl(223,68%,24%)] sm:text-4xl">
              Ưu đãi đang diễn ra để bạn chủ động lên lịch phù hợp
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Chúng tôi gom các gói đang nổi bật vào một khu vực rõ ràng hơn để bạn dễ xem, dễ so sánh và quyết định nhanh.
            </p>
          </div>
          <Link
            href="/khuyen-mai"
            className="inline-flex items-center gap-2 rounded-full bg-[hsl(223,68%,24%)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[hsl(223,68%,39%)]"
          >
            Xem toàn bộ
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_.85fr_.85fr]">
          {items.slice(0, 3).map((promo, index) => (
            <article
              key={promo.id}
              className={`group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_44px_rgba(14,35,92,.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_54px_rgba(14,35,92,.14)] ${
                index === 0 ? "lg:row-span-1" : ""
              }`}
            >
              <div className={`relative ${index === 0 ? "h-[320px]" : "h-[260px]"}`}>
                <img
                  src={promo.imageUrl || FALLBACK_PROMOTIONS[0].imageUrl}
                  alt={promo.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,37,89,.05),rgba(16,37,89,.72))]" />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-1.5 text-xs font-semibold text-[hsl(223,68%,28%)]">
                  <CalendarDays className="h-3.5 w-3.5 text-[hsl(223,68%,39%)]" />
                  Áp dụng đến {promo.validUntil}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="inline-flex rounded-full bg-[hsl(42,94%,58%)] px-3 py-1 text-xs font-bold text-[hsl(223,68%,18%)]">
                    Ưu đãi đang mở
                  </div>
                  <h3 className="mt-3 max-w-[15ch] text-2xl font-bold leading-tight">{promo.title}</h3>
                  <div className="mt-4 text-2xl font-bold text-[hsl(42,100%,76%)]">{promo.price}</div>
                </div>
              </div>

              <div className="space-y-4 p-6">
                <p className="text-sm leading-7 text-slate-600">{promo.content}</p>
                <a
                  href="/lien-he#booking"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-[hsl(223,68%,24%)] transition hover:border-[hsl(223,68%,39%)] hover:text-[hsl(223,68%,39%)]"
                >
                  Đăng ký ngay
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
