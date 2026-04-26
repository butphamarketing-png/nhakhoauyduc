import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { getFallbackServiceImage } from "@/lib/fallback-content";
import { slugify } from "@/lib/site";

type ServiceItem = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

function getServiceLabel(name: string) {
  const lower = name.toLowerCase();

  if (lower.includes("implant")) {
    return { eyebrow: "TRỒNG RĂNG", title: "IMPLANT" };
  }

  if (lower.includes("sứ")) {
    return { eyebrow: "BỌC", title: "RĂNG SỨ" };
  }

  if (lower.includes("niềng")) {
    return { eyebrow: "NIỀNG RĂNG", title: "THẨM MỸ" };
  }

  return { eyebrow: "NHA KHOA", title: "ĐIỀU TRỊ" };
}

function FeaturedServiceCard({ service }: { service: ServiceItem }) {
  const label = getServiceLabel(service.name);

  return (
    <article className="group overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_44px_rgba(20,41,102,.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_56px_rgba(20,41,102,.16)]">
      <div className="relative h-[360px] overflow-hidden bg-slate-100">
        <img
          src={service.imageUrl || getFallbackServiceImage(service.name)}
          alt={service.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,28,73,.04)_0%,rgba(12,28,73,.12)_40%,rgba(24,44,113,.96)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-full bg-[linear-gradient(180deg,#ffe79c,#f4bf2b)] shadow-[0_10px_18px_rgba(244,191,43,.35)]">
              <div className="h-6 w-6 rounded-full border-2 border-white/90" />
            </div>
            <div>
              <div className="text-sm font-medium tracking-[0.12em] text-white/80">{label.eyebrow}</div>
              <h3 className="mt-1 text-[2rem] font-bold leading-none text-[hsl(45,100%,72%)]">{label.title}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 px-6 py-4">
        <Link
          href={`/dich-vu/${slugify(service.name)}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(223,68%,39%)]"
        >
          Xem chi tiết
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export function FeaturedServicesSection({ services }: { services: ServiceItem[] }) {
  const featuredServices = services.slice(0, 4);

  return (
    <section className="bg-[linear-gradient(180deg,#fbfcff_0%,#f4f8ff_100%)] py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 text-[hsl(223,68%,29%)]">
            <span className="h-8 w-8 rounded-full bg-[radial-gradient(circle,#ffd95f,#f4bf2b)]" />
            <span className="text-2xl font-bold uppercase tracking-[0.08em]">Dịch vụ nổi bật</span>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredServices.map((service) => (
            <FeaturedServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
