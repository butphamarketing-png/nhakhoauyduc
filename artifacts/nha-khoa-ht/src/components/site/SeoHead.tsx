import { useEffect } from "react";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/site";

type SeoHeadProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
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

export function SeoHead({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noIndex = false,
}: SeoHeadProps) {
  useEffect(() => {
    const url = new URL(path, SITE_URL).toString();
    const imageUrl = new URL(image, SITE_URL).toString();
    const fullTitle = `${title} | Nha Khoa Uy Đức Smile`;

    document.title = fullTitle;
    document.documentElement.lang = "vi";

    setCanonical(url);
    setMetaByName("description", description);
    setMetaByName("robots", noIndex ? "noindex, nofollow" : "index, follow");

    setMetaByProperty("og:title", fullTitle);
    setMetaByProperty("og:description", description);
    setMetaByProperty("og:url", url);
    setMetaByProperty("og:type", type);
    setMetaByProperty("og:image", imageUrl);

    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:title", fullTitle);
    setMetaByName("twitter:description", description);
    setMetaByName("twitter:image", imageUrl);
  }, [description, image, noIndex, path, title, type]);

  return null;
}
