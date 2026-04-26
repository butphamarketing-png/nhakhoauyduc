import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { LOGO_URL } from "@/lib/api";
import { CLINIC_PROFILE } from "@/lib/site";

export function AboutPreviewSection({ imageUrl }: { imageUrl?: string | null }) {
  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[0.42fr_0.58fr] lg:items-center lg:gap-12">
        <div className="relative">
          <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(232,240,255,.95),rgba(250,252,255,.9))]" />
          <img
            src={imageUrl || LOGO_URL}
            alt={`${CLINIC_PROFILE.name} khong gian va dich vu`}
            className="relative h-[320px] w-full rounded-[1.5rem] object-cover shadow-[0_16px_36px_rgba(20,41,102,.1)] sm:h-[380px] lg:h-[430px]"
          />
        </div>

        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[hsl(42,94%,95%)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[hsl(33,89%,38%)]">
            Gioi thieu
          </div>
          <h2 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-[hsl(223,68%,24%)] sm:text-4xl lg:text-[3.25rem]">
            Nha Khoa Uy Duc Smile - Dong hanh cung nu cuoi khoe dep cho ca gia dinh
          </h2>
          <div className="mt-5 max-w-4xl space-y-4 text-[15px] leading-8 text-slate-600 sm:text-lg">
            <p>
              Phong kham tap trung vao trai nghiem tham kham nhe nhang, giao tiep ro rang va lo trinh dieu tri phu hop thay vi tao ap luc cho khach hang.
            </p>
            <p>
              Tu lan kham dau tien, doi ngu se lang nghe nhu cau, kiem tra tinh trang va giai thich phuong an phu hop voi muc tieu cua ban: dieu tri, phuc hinh hay cai thien tham my.
            </p>
            <p>
              Chung toi uu tien cam giac yen tam va de hieu trong suot hanh trinh, tu dat lich, tiep don, thuc hien dich vu den cham soc sau dieu tri.
            </p>
          </div>
          <div className="mt-8">
            <Link
              href="/gioi-thieu"
              className="inline-flex items-center gap-2 rounded-full border border-[hsl(223,68%,39%)] px-5 py-2.5 text-sm font-semibold text-[hsl(223,68%,39%)] transition hover:bg-[hsl(223,68%,39%)] hover:text-white"
            >
              Tim hieu them
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
