import { useEffect, useState } from "react";
import { CalendarDays, Phone } from "lucide-react";
import { HOTLINE } from "@/lib/api";

export function FloatingActions() {
  const [showMobileBar, setShowMobileBar] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const scrollingUp = currentY < lastY;
      setShowMobileBar(scrollingUp || currentY < 80);
      lastY = currentY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed bottom-24 right-4 z-40 hidden flex-col gap-3 md:flex">
        <a
          href={`tel:${HOTLINE}`}
          className="grid h-14 w-14 place-items-center rounded-full bg-[hsl(223,68%,39%)] text-white shadow-[0_14px_30px_rgba(28,58,139,.3)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_36px_rgba(28,58,139,.34)]"
          aria-label="Gọi hotline"
        >
          <Phone className="h-6 w-6" />
        </a>
        <a
          href="/lien-he#booking"
          className="grid h-14 w-14 place-items-center rounded-full bg-[hsl(42,94%,58%)] text-[hsl(223,68%,18%)] shadow-[0_14px_30px_rgba(247,186,47,.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_36px_rgba(247,186,47,.34)]"
          aria-label="Đặt lịch"
        >
          <CalendarDays className="h-6 w-6" />
        </a>
      </div>

      <div
        className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-slate-200 bg-white/95 p-3 backdrop-blur transition-transform duration-300 md:hidden ${
          showMobileBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <a
          href={`tel:${HOTLINE}`}
          className="mr-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[hsl(223,68%,39%)] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(28,58,139,.22)] transition active:scale-[0.98]"
        >
          <Phone className="h-4 w-4" />
          Gọi ngay
        </a>
        <a
          href="/lien-he#booking"
          className="ml-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[hsl(42,94%,58%)] px-4 py-3 text-sm font-semibold text-[hsl(223,68%,18%)] shadow-[0_10px_24px_rgba(247,186,47,.2)] transition active:scale-[0.98]"
        >
          <CalendarDays className="h-4 w-4" />
          Đặt lịch
        </a>
      </div>
    </>
  );
}
