import { CheckCircle2, ShieldCheck } from "lucide-react";
import { COMMITMENTS, TRUST_SIGNALS } from "@/lib/site";

export function CommitmentsShowcaseSection() {
  return (
    <section className="relative py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(225,236,255,.62),transparent)]" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:gap-12">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-white/12 bg-[linear-gradient(160deg,hsl(223,68%,38%),hsl(227,53%,26%))] p-8 text-white shadow-[0_28px_54px_rgba(17,34,87,.20)] lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.13),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,214,125,.14),transparent_22%)]" />
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/8 blur-3xl" />
          <div className="absolute -bottom-16 left-10 h-32 w-32 rounded-full bg-[hsl(42,94%,58%)]/16 blur-3xl" />

          <div className="relative inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm text-blue-50/95 backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-[hsl(42,94%,58%)]" />
            Vì sao nhiều khách hàng giới thiệu người thân
          </div>

          <h2 className="relative mt-6 max-w-[12ch] text-[2.35rem] font-bold leading-[1.14] text-white sm:text-[2.7rem]">
            Trải nghiệm thăm khám rõ ràng, nhẹ nhàng và đáng tin hơn
          </h2>

          <p className="relative mt-5 max-w-2xl text-lg leading-8 text-blue-50/90">
            Điều chúng tôi ưu tiên không chỉ là hoàn thiện dịch vụ, mà còn là cảm giác yên tâm trong suốt hành trình của khách hàng.
          </p>

          <div className="relative mt-8 grid gap-3">
            {TRUST_SIGNALS.map((signal) => (
              <div
                key={signal}
                className="flex items-start gap-3 rounded-[1.2rem] border border-white/10 bg-white/8 px-4 py-4 backdrop-blur transition duration-300 hover:border-white/16 hover:bg-white/12"
              >
                <div className="mt-0.5 grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-[rgba(255,255,255,.09)]">
                  <CheckCircle2 className="h-4.5 w-4.5 text-[hsl(42,94%,58%)]" />
                </div>
                <span className="leading-7 text-blue-50/95">{signal}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          {COMMITMENTS.map((item) => (
            <div
              key={item.title}
              className="premium-panel rounded-[1.9rem] border border-slate-200/90 bg-white/95 p-7 shadow-[0_18px_38px_rgba(16,37,89,.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(16,37,89,.12)]"
            >
              <div className="flex items-start gap-5">
                <div className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-[1.35rem] bg-[linear-gradient(180deg,hsl(42,94%,95%),#fff7df)] text-[hsl(33,89%,38%)] shadow-[inset_0_1px_0_rgba(255,255,255,.8)]">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[1.65rem] font-semibold leading-tight text-[hsl(223,68%,24%)]">{item.title}</h3>
                  <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
