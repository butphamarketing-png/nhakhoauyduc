import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";

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
  const items = feedback.slice(0, 3);

  return (
    <section id="feedback" className="relative overflow-hidden bg-slate-50 py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,80,181,.05),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(255,221,132,.05),transparent_40%)]" />
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            Cảm nhận khách hàng
          </div>
          <h2 className="mt-6 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Nụ cười của bạn là <br className="hidden sm:block" /> niềm hạnh phúc của chúng tôi
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Hàng ngàn khách hàng đã tin tưởng và hài lòng với dịch vụ tại Nha Khoa Uy Đức Smile.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {SERVICE_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              className="rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-primary hover:text-primary hover:shadow-md active:scale-95"
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative mt-16">
          <div className="grid gap-8 lg:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.id}
                className="group relative overflow-hidden rounded-[2.5rem] bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={item.imageUrl || ""}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80" />
                </div>
                
                <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                  <div className="flex items-center gap-1 text-orange-400">
                    {Array.from({ length: item.rating || 5 }).map((_, current) => (
                      <Star key={current} className="h-4 w-4 fill-current" />
                    ))}
                  </div>

                  <div className="mt-4">
                    <h3 className="text-3xl font-bold tracking-tight">{item.name}</h3>
                    <div className="mt-1 text-sm font-medium text-white/70 uppercase tracking-widest">{item.service}</div>
                  </div>

                  <p className="mt-6 text-lg leading-relaxed text-white/90 italic font-medium">
                    "{item.content}"
                  </p>

                  <div className="mt-8 flex items-center gap-3 text-sm font-bold text-white/60">
                    <div className="h-px flex-1 bg-white/20" />
                    <span>Khách hàng thực tế</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="/lien-he#booking"
            className="inline-flex items-center gap-3 rounded-full bg-primary px-10 py-5 font-bold text-white shadow-2xl shadow-primary/30 transition-all hover:bg-primary/90 hover:-translate-y-1"
          >
            Trải nghiệm dịch vụ ngay
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
