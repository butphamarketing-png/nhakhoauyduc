import { Link } from "wouter";
import { AlertCircle, ArrowRight, Home, Phone } from "lucide-react";
import { HOTLINE } from "@/lib/api";
import { SeoHead } from "@/components/site/SeoHead";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)] px-4 py-16">
      <SeoHead
        title="Không tìm thấy trang"
        description="Trang bạn đang tìm có thể đã được thay đổi hoặc không còn tồn tại."
        path="/404"
        noIndex
      />
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[0_24px_60px_rgba(18,41,110,.12)] sm:p-12">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-rose-50 text-rose-500">
          <AlertCircle className="h-8 w-8" />
        </div>
        <div className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">404</div>
        <h1 className="mt-3 text-3xl font-bold text-[hsl(223,68%,24%)] sm:text-4xl">
          Trang bạn tìm kiếm hiện không khả dụng
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-600">
          Bạn có thể quay lại trang chủ để tiếp tục xem dịch vụ, bài viết hoặc liên hệ trực tiếp để được hỗ trợ nhanh.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[hsl(223,68%,39%)] px-6 py-3 font-semibold text-white"
          >
            <Home className="h-4 w-4" />
            Về trang chủ
          </Link>
          <a
            href={`tel:${HOTLINE}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-6 py-3 font-semibold text-[hsl(223,68%,28%)]"
          >
            <Phone className="h-4 w-4" />
            Gọi hỗ trợ
          </a>
        </div>
        <Link
          href="/lien-he"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(223,68%,39%)]"
        >
          Đi tới trang liên hệ
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
