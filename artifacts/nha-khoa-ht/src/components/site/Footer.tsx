import { useListServices } from "@workspace/api-client-react";
import {
  Facebook,
  Globe,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Youtube,
} from "lucide-react";
import { Link } from "wouter";
import { CLINIC_LOGO_ALT, LOGO_URL } from "@/lib/api";
import { FALLBACK_SERVICES } from "@/lib/fallback-content";
import {
  CLINIC_PROFILE,
  FOOTER_POLICIES,
  GOOGLE_MAPS_URL,
  SITE_NAV,
  slugify,
} from "@/lib/site";

export function Footer() {
  const { data: services = [] } = useListServices();
  const featuredServices = ((services as { id: number; name: string }[]).length
    ? (services as { id: number; name: string }[])
    : FALLBACK_SERVICES.map((service) => ({ id: service.id, name: service.name }))
  ).slice(0, 5);

  return (
    <footer className="border-t border-slate-200 bg-[linear-gradient(180deg,#192b63_0%,#172655_100%)] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_26px_60px_rgba(6,16,48,.22)] backdrop-blur md:grid-cols-[1.15fr_.85fr] md:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-semibold text-blue-50">
              <Phone className="h-4 w-4 text-[hsl(45,90%,65%)]" />
              Tư vấn nhanh: {CLINIC_PROFILE.hotline}
            </div>
            <h2 className="mt-4 max-w-2xl text-2xl font-bold leading-tight text-white sm:text-3xl">
              Phòng khám gia đình ưu tiên lịch hẹn rõ ràng, tư vấn kỹ và theo dõi sau điều trị.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100/90">
              Giữ lại các thông tin quan trọng để khách hàng dễ liên hệ, xem đường đi và chuyển nhanh đến các trang dịch vụ đang quan tâm.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <a
              href={`tel:${CLINIC_PROFILE.hotline.replace(/\s+/g, "")}`}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white/12 px-5 py-3 font-semibold text-white ring-1 ring-white/18 transition hover:-translate-y-0.5 hover:bg-white/18"
            >
              <Phone className="h-4 w-4" />
              Gọi hotline
            </a>
            <a
              href={GOOGLE_MAPS_URL}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
            >
              <MapPin className="h-4 w-4 text-[hsl(45,90%,65%)]" />
              Xem bản đồ
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_.9fr_.95fr_.95fr]">
          <div className="rounded-[1.8rem] border border-white/10 bg-white/6 p-6">
            <div className="flex items-center gap-4">
              <img
                src={LOGO_URL}
                alt={CLINIC_LOGO_ALT}
                className="h-16 w-16 rounded-2xl border border-white/10 bg-white object-cover"
              />
              <div>
                <div className="text-lg font-bold uppercase tracking-[0.08em]">{CLINIC_PROFILE.name}</div>
                <div className="mt-1 text-sm text-blue-100">{CLINIC_PROFILE.slogan}</div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-blue-100/95">{CLINIC_PROFILE.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={CLINIC_PROFILE.social.facebook}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={CLINIC_PROFILE.social.youtube}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href={CLINIC_PROFILE.social.instagram}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/10 bg-white/6 p-6">
            <div className="text-lg font-semibold">Dịch vụ nổi bật</div>
            <div className="mt-5 space-y-3 text-sm text-blue-100">
              {featuredServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/dich-vu/${slugify(service.name)}`}
                  className="block rounded-2xl border border-white/8 bg-white/4 px-4 py-3 transition hover:border-white/20 hover:text-white"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/10 bg-white/6 p-6">
            <div className="text-lg font-semibold">Thông tin liên hệ</div>
            <div className="mt-5 space-y-4 text-sm text-blue-100">
              <a
                href={`tel:${CLINIC_PROFILE.hotline.replace(/\s+/g, "")}`}
                className="flex items-start gap-3 transition hover:text-white"
              >
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(45,90%,65%)]" />
                <span>{CLINIC_PROFILE.hotline}</span>
              </a>
              <a href={GOOGLE_MAPS_URL} className="flex items-start gap-3 transition hover:text-white">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(45,90%,65%)]" />
                <span>{CLINIC_PROFILE.fullAddress}</span>
              </a>
              <a href={`mailto:${CLINIC_PROFILE.email}`} className="flex items-start gap-3 transition hover:text-white">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(45,90%,65%)]" />
                <span>{CLINIC_PROFILE.email}</span>
              </a>
              <a href={CLINIC_PROFILE.siteUrl} className="flex items-start gap-3 transition hover:text-white">
                <Globe className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(45,90%,65%)]" />
                <span>{CLINIC_PROFILE.website}</span>
              </a>
            </div>
            <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-white/6 p-4 text-sm text-blue-100">
              <div className="font-semibold text-white">Giờ làm việc</div>
              <div className="mt-2">{CLINIC_PROFILE.hours.weekdays}</div>
              <div>{CLINIC_PROFILE.hours.sunday}</div>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/10 bg-white/6 p-6">
            <div className="text-lg font-semibold">Điều hướng nhanh</div>
            <div className="mt-5 space-y-3 text-sm text-blue-100">
              {SITE_NAV.map((item) => (
                <Link key={item.href} href={item.href} className="block transition hover:text-white">
                  {item.label}
                </Link>
              ))}
              <Link href="/admin/login" className="block transition hover:text-white">
                Đăng nhập quản trị
              </Link>
            </div>

            <div className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-[hsl(45,90%,65%)]">
              Chính sách
            </div>
            <div className="mt-3 space-y-3 text-sm text-blue-100">
              {FOOTER_POLICIES.map((policy) => (
                <div key={policy} className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(45,90%,65%)]" />
                  <span>{policy}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-sm text-blue-100 md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} {CLINIC_PROFILE.name}. Tất cả quyền được bảo lưu.
          </div>
          <div>{CLINIC_PROFILE.shortAddress}</div>
        </div>
      </div>
    </footer>
  );
}
