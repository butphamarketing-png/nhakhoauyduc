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
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_55%,#f8fbff_100%)] py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top_left,rgba(94,138,255,.11),transparent_30%)]" />
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[hsl(42,94%,94%)] px-3 py-1 text-sm font-semibold text-[hsl(33,89%,38%)]">
              Khuyến mãi
            </div>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Ưu đãi đang diễn ra để bạn chủ động lên lịch phù hợp
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-white/82">
              Gói ưu đãi được trình bày theo dạng thẻ lớn, dễ nhìn và dễ quyết định hơn để tổng thể trang đỡ thô hơn.
            </p>
          </div>
          <Link
            href="/khuyen-mai"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(15,39,103,.08)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/16"
          >
            Xem toàn bộ
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.28fr_.86fr_.86fr]">
          {items.slice(0, 3).map((promo, index) => (
            <article
              key={promo.id}
              className="group overflow-hidden rounded-[2.1rem] border border-white/16 bg-white/10 shadow-[0_22px_52px_rgba(16,37,89,.09)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_62px_rgba(16,37,89,.14)]"
            >
              <div className={`relative ${index === 0 ? "h-[340px]" : "h-[280px]"}`}>
                <img
                  src={promo.imageUrl || FALLBACK_PROMOTIONS[0].imageUrl}
                  alt={promo.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,30,74,.02),rgba(11,30,74,.75))]" />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/55 bg-white/86 px-3 py-1.5 text-xs font-semibold text-[hsl(223,68%,28%)] backdrop-blur">
                  <CalendarDays className="h-3.5 w-3.5 text-[hsl(223,68%,39%)]" />
                  Áp dụng đến {promo.validUntil}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="inline-flex rounded-full bg-[hsl(42,94%,58%)]/94 px-3 py-1 text-xs font-bold text-[hsl(223,68%,18%)] shadow-sm">
                    Ưu đãi nổi bật
                  </div>
                  <h3 className="mt-3 max-w-[15ch] text-[1.95rem] font-bold leading-tight">{promo.title}</h3>
                  <div className="mt-4 text-[1.8rem] font-bold text-[hsl(42,100%,80%)]">{promo.price}</div>
                </div>
              </div>

              <div className="space-y-4 p-6">
                <p className="text-[0.98rem] leading-7 text-white/84">{promo.content}</p>
                <a
                  href="/lien-he#booking"
                  className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-white/28 hover:bg-white/16"
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
