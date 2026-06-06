import { CheckCircle2, ShieldCheck } from "lucide-react";
import { COMMITMENTS, TRUST_SIGNALS } from "@/lib/site";

export function CommitmentsShowcaseSection() {
  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[0.42fr_0.58fr] lg:items-center lg:gap-12">
        <div className="relative">
          <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(232,240,255,.95),rgba(250,252,255,.9))]" />
          <img
            src="/images/Ve-chung-tôi.jpg"
            alt="Vì sao chọn Nha Khoa Đăng Khoa"
            className="relative h-[320px] w-full rounded-[1.5rem] object-cover shadow-[0_16px_36px_rgba(20,41,102,.1)] sm:h-[380px] lg:h-[430px]"
          />
        </div>

        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[hsl(42,94%,95%)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[hsl(33,89%,38%)]">
            Lý do chọn chúng tôi
          </div>
          <h2 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-[hsl(223,68%,24%)] sm:text-4xl lg:text-[3.25rem]">
            Tại sao chọn Nha Khoa Đăng Khoa?
          </h2>
          <div className="mt-8 grid gap-5">
            {COMMITMENTS.map((item) => (
              <div
                key={item.title}
                className="premium-panel relative overflow-hidden rounded-[2rem] border border-white bg-white/95 p-7 shadow-[0_18px_42px_rgba(16,37,89,.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(16,37,89,.12)]"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,hsl(42,94%,58%),hsl(223,68%,62%))]" />
                <div className="flex items-start gap-5">
                  <div className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-[1.35rem] bg-[linear-gradient(180deg,hsl(42,94%,95%),#fff7df)] text-[hsl(33,89%,38%)] shadow-[0_12px_24px_rgba(255,213,120,.18),inset_0_1px_0_rgba(255,255,255,.8)]">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[1.5rem] font-semibold leading-tight text-[hsl(223,68%,24%)]">{item.title}</h3>
                    <p className="mt-3 max-w-2xl text-[1.02rem] leading-8 text-slate-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
