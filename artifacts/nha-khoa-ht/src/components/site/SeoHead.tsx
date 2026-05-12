import { useEffect } from "react";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/site";
import { CLINIC_NAME } from "@/lib/api";

type SeoHeadProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  keywords?: string;
};

function ensureMeta(selector: string, create: () => HTMLMetaElement) {
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  if (existing) return existing;
  const meta = create();
  document.head.appendChild(meta);
  return meta;
}

function setMetaByName(name: string, content: string) {
  const meta = ensureMeta(`meta[name="${name}"]`, () => {
    const el = document.createElement("meta");
    el.setAttribute("name", name);
    return el;
  });
  meta.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string) {
  const meta = ensureMeta(`meta[property="${property}"]`, () => {
    const el = document.createElement("meta");
    el.setAttribute("property", property);
    return el;
  });
  meta.setAttribute("content", content);
}

function setCanonical(url: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = url;
}

const DEFAULT_KEYWORDS = "nha khoa Uy Đức Smile, nha khoa Gia Kiệm, niềng răng, trồng răng implant, bọc răng sứ, điều trị răng, phòng khám nha khoa Đồng Nai, khám răng miệng";

export function SeoHead({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noIndex = false,
  keywords = DEFAULT_KEYWORDS,
}: SeoHeadProps) {
  useEffect(() => {
    const url = new URL(path, SITE_URL).toString();
    const imageUrl = new URL(image, SITE_URL).toString();
    const fullTitle = `${title} | ${CLINIC_NAME}`;

    document.title = fullTitle;
    document.documentElement.lang = "vi";

    setCanonical(url);
    setMetaByName("description", description);
    setMetaByName("robots", noIndex ? "noindex, nofollow" : "index, follow");
    setMetaByName("keywords", keywords);
    setMetaByName("author", CLINIC_NAME);
    setMetaByName("copyright", `© ${new Date().getFullYear()} ${CLINIC_NAME}`);

    setMetaByName("geo.region", "VN");
    setMetaByName("geo.placename", "Gia Kiệm, Đồng Nai");

    setMetaByProperty("og:title", fullTitle);
    setMetaByProperty("og:description", description);
    setMetaByProperty("og:url", url);
    setMetaByProperty("og:type", type);
    setMetaByProperty("og:image", imageUrl);
    setMetaByProperty("og:image:width", "1200");
    setMetaByProperty("og:image:height", "630");
    setMetaByProperty("og:locale", "vi_VN");
    setMetaByProperty("og:site_name", CLINIC_NAME);

    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:title", fullTitle);
    setMetaByName("twitter:description", description);
    setMetaByName("twitter:image", imageUrl);
    setMetaByName("twitter:site", "@nhakhoauyduc");
  }, [description, image, keywords, noIndex, path, title, type]);

  return null;
}
