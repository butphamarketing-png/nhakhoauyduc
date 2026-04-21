import { Phone, Calendar } from "lucide-react";
import { HOTLINE } from "@/lib/api";

export function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a
        href={`tel:${HOTLINE}`}
        className="w-14 h-14 rounded-full bg-rose-600 text-white grid place-items-center shadow-lg hover:scale-110 transition animate-pulse"
        aria-label="Gọi ngay"
      >
        <Phone className="h-6 w-6" />
      </a>
      <a
        href="#booking"
        className="w-14 h-14 rounded-full bg-rose-600 text-white grid place-items-center shadow-lg hover:scale-110 transition"
        aria-label="Đặt lịch"
      >
        <Calendar className="h-6 w-6" />
      </a>
    </div>
  );
}
