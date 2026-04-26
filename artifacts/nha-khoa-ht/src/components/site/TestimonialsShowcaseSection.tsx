import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { FALLBACK_FEEDBACK } from "@/lib/fallback-content";

type FeedbackItem = {
  id: number;
  name: string;
  service: string;
  content: string;
  rating?: number | null;
  imageUrl?: string | null;
};

const SERVICE_TABS = ["Bọc răng sứ", "Trồng răng Implant", "Niềng răng"];

export function TestimonialsShowcaseSection({
  feedback,
}: {
  feedback: FeedbackItem[];
}) {
  const items = (feedback.length ? feedback : FALLBACK_FEEDBACK).slice(0, 3);

  return (
    <section id="feedback" className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#fff_35%,#f6f9ff_100%)] py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(88,127,255,.10),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(255,221,132,.08),transparent_20%)]" />
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[hsl(42,94%,94%)] px-3 py-1 text-sm font-semibold text-[hsl(33,89%,38%)]">
            Khách hàng
          </div>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-[hsl(223,68%,24%)] sm:text-4xl">
            Phản hồi thật sau khi trải nghiệm dịch vụ
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-slate-600">
            Khu vực này được làm lại nhẹ hơn, có ảnh lớn và phần thông tin gọn hơn để cảm giác gần với portfolio khách hàng thật thay vì khối card quá thô.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {SERVICE_TABS.map((tab, index) => (
            <button
              key={tab}
              type="button"
              className={`rounded-full px-7 py-3 text-lg font-semibold transition ${
                index === 0
                  ? "border border-slate-200 bg-white text-[hsl(223,68%,32%)] shadow-[0_12px_28px_rgba(24,44,100,.10)]"
                  : "bg-[hsl(233,48%,39%)] text-white shadow-[0_10px_24px_rgba(24,44,100,.08)] hover:bg-[hsl(233,48%,35%)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative mt-10">
          <button
            type="button"
            aria-label="Xem phản hồi trước"
            className="absolute left-0 top-1/2 z-10 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white text-[hsl(223,68%,32%)] shadow-[0_12px_28px_rgba(24,44,100,.12)] lg:grid"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            aria-label="Xem phản hồi sau"
            className="absolute right-0 top-1/2 z-10 hidden h-14 w-14 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white text-[hsl(223,68%,32%)] shadow-[0_12px_28px_rgba(24,44,100,.12)] lg:grid"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="grid gap-8 lg:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-[2rem] border border-white bg-white shadow-[0_22px_54px_rgba(16,37,89,.10)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_64px_rgba(16,37,89,.16)]"
              >
                <div className="h-[390px] overflow-hidden rounded-b-[1.65rem]">
                  <img
                    src={item.imageUrl || FALLBACK_FEEDBACK[0].imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
                  />
                </div>
                <div className="bg-[linear-gradient(180deg,hsl(233,48%,42%),hsl(233,48%,37%))] p-7 text-white">
                  <div className="flex items-center gap-1 text-[hsl(42,100%,82%)]">
                    {Array.from({ length: item.rating || 5 }).map((_, current) => (
                      <Star key={current} className="h-4 w-4 fill-current" />
                    ))}
                    <span className="ml-2 text-sm text-white/82">Dịch vụ tốt</span>
                  </div>

                  <div className="mt-4 flex items-end justify-between gap-4 border-b border-white/18 pb-4">
                    <div>
                      <h3 className="text-[1.85rem] font-bold leading-none">{item.name}</h3>
                      <div className="mt-2 text-white/76">{item.service}</div>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/8 text-white/90">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>

                  <p className="mt-5 text-[1rem] leading-8 text-white/88">{item.content}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
