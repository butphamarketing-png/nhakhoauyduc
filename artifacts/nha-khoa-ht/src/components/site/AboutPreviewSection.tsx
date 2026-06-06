import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useGetSettings } from "@workspace/api-client-react";
import { FALLBACK_ABOUT_IMAGE } from "@/lib/fallback-content";
import { CLINIC_PROFILE } from "@/lib/site";

type AboutSettings = {
  aboutTitle?: string;
  aboutDescription1?: string;
  aboutDescription2?: string;
  aboutDescription3?: string;
  aboutImageUrl?: string;
};

export function AboutPreviewSection({ imageUrl }: { imageUrl?: string | null }) {
  const { data: settings } = useGetSettings();
  const aboutSettings = settings as AboutSettings | undefined;
  const title = aboutSettings?.aboutTitle || "Về Nha Khoa Đăng Khoa";
  const paragraphs = [
    aboutSettings?.aboutDescription1 ||
      "Hệ thống nha khoa uy tín tại Tây Ninh với đội ngũ bác sĩ giàu kinh nghiệm, trang thiết bị hiện đại và quy trình chuẩn chỉ khoa học quốc tế.",
    aboutSettings?.aboutDescription2 ||
      "Từ lần khám đầu tiên, đội ngũ sẽ lắng nghe nhu cầu, kiểm tra tình trạng và giải thích phương án phù hợp với mục tiêu của bạn: điều trị, phục hình hay cải thiện thẩm mỹ.",
    aboutSettings?.aboutDescription3 ||
      "Chúng tôi ưu tiên cảm giác yên tâm và dễ hiểu trong suốt hành trình, từ đặt lịch, tiếp đón, thực hiện dịch vụ đến chăm sóc sau điều trị.",
  ].filter(Boolean);
  const aboutImage = aboutSettings?.aboutImageUrl || imageUrl || "/images/about-rang-su-10000.png";

  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[0.42fr_0.58fr] lg:items-center lg:gap-12">
        <div className="relative">
          <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(232,240,255,.95),rgba(250,252,255,.9))]" />
          <img
            src={aboutImage}
            alt={`${CLINIC_PROFILE.name} không gian và dịch vụ`}
            className="relative h-[320px] w-full rounded-[1.5rem] object-cover shadow-[0_16px_36px_rgba(20,41,102,.1)] sm:h-[380px] lg:h-[430px]"
          />
        </div>

        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[hsl(42,94%,95%)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[hsl(33,89%,38%)]">
            Giới thiệu
          </div>
          <h2 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-[hsl(223,68%,24%)] sm:text-4xl lg:text-[3.25rem]">
            {title}
          </h2>
          <div className="mt-5 max-w-4xl space-y-4 text-[15px] leading-8 text-slate-600 sm:text-lg">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/gioi-thieu"
              className="inline-flex items-center gap-2 rounded-full border border-[hsl(223,68%,39%)] px-5 py-2.5 text-sm font-semibold text-[hsl(223,68%,39%)] transition hover:bg-[hsl(223,68%,39%)] hover:text-white"
            >
              Tìm hiểu thêm
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
