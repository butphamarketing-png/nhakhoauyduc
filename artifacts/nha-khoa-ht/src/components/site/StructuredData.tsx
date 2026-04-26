import { useEffect } from "react";
import { HOTLINE, LOGO_URL } from "@/lib/api";
import { CLINIC_PROFILE, DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/site";

type JsonLd = Record<string, unknown>;

function absoluteUrl(pathOrUrl?: string | null) {
  if (!pathOrUrl) return `${SITE_URL}${DEFAULT_OG_IMAGE}`;
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

export function StructuredData({ data }: { data: JsonLd | JsonLd[] }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [data]);

  return null;
}

export function buildLocalBusinessSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: CLINIC_PROFILE.name,
    description: CLINIC_PROFILE.description,
    slogan: CLINIC_PROFILE.slogan,
    url: SITE_URL,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    logo: absoluteUrl(LOGO_URL),
    telephone: HOTLINE,
    email: CLINIC_PROFILE.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: CLINIC_PROFILE.fullAddress,
      addressLocality: "Gia Kiệm",
      addressRegion: "Đồng Nai",
      addressCountry: "VN",
    },
    areaServed: ["Gia Kiệm", "Đồng Nai"],
    sameAs: Object.values(CLINIC_PROFILE.social ?? {}).filter(Boolean),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "08:00",
        closes: "12:00",
      },
    ],
  };
}

export function buildWebsiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: CLINIC_PROFILE.name,
    url: SITE_URL,
    description: CLINIC_PROFILE.description,
    inLanguage: "vi-VN",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/kien-thuc`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildFaqSchema(items: Array<{ question: string; answer: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildServiceSchema(service: {
  name: string;
  description: string;
  imageUrl?: string | null;
  slug: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.name,
    description: service.description,
    image: absoluteUrl(service.imageUrl),
    url: absoluteUrl(`/dich-vu/${service.slug}`),
    provider: {
      "@type": "Dentist",
      name: CLINIC_PROFILE.name,
      telephone: HOTLINE,
      address: CLINIC_PROFILE.fullAddress,
    },
    areaServed: ["Gia Kiệm", "Đồng Nai"],
  };
}

export function buildArticleSchema(post: {
  title: string;
  excerpt: string;
  imageUrl?: string | null;
  createdAt: string;
  category: string;
  path: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.imageUrl),
    datePublished: post.createdAt,
    dateModified: post.createdAt,
    articleSection: post.category,
    inLanguage: "vi-VN",
    mainEntityOfPage: absoluteUrl(post.path),
    author: {
      "@type": "Organization",
      name: CLINIC_PROFILE.name,
    },
    publisher: {
      "@type": "Organization",
      name: CLINIC_PROFILE.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(LOGO_URL),
      },
    },
  };
}
