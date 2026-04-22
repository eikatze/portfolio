const DEFAULT_DATA = {
  site: {
    title: "영상 포트폴리오 템플릿",
    description: "영상 편집자와 크리에이터를 위한 정적 포트폴리오 템플릿입니다. site.json만 수정해 브랜드, 작업물, 가격, 문의 정보를 구성할 수 있습니다.",
    githubRepo: "",
    brand: {
      prefix: "studio",
      name: "your-name",
    },
    nav: {
      links: [
        {
          label: "홈",
          href: "index.html#home",
        },
        {
          label: "서비스 및 가격",
          href: "pricing.html",
        },
        {
          label: "문의하기",
          href: "contact.html",
        },
      ],
      ctaLabel: "문의하기",
      ctaHref: "contact.html",
    },
    footer: {
      enabled: true,
      linksEnabled: false,
      title: "STUDIO YOUR-NAME",
      copy: "© 2026 STUDIO YOUR-NAME. 모든 권리 보유.",
      links: [],
    },
  },
  hero: {
    backgroundVideoUrl: "",
    eyebrow: "VIDEO PORTFOLIO TEMPLATE",
    title: "브랜드에 맞는\n영상 포트폴리오를 시작하세요.",
    titleAccent: "영상 포트폴리오",
    description: "JSON 데이터만 교체하면 소개 문구, 작업물, 가격, 문의 섹션을 프로젝트에 맞게 빠르게 구성할 수 있습니다.",
    statusLabel: "Status",
    statusText: "READY FOR CUSTOMIZATION",
    actions: [
      {
        label: "가격 보기",
        href: "pricing.html",
        variant: "primary",
      },
      {
        label: "문의하기",
        href: "contact.html",
        variant: "ghost",
      },
    ],
    infoPanels: {
      layoutPreset: "1:1",
      career: {
        title: "경력사항",
        mode: "structured",
        structuredItems: [],
        simpleItems: [],
        freeformText: "",
      },
      tools: {
        title: "사용 가능한 툴",
        items: [],
      },
      bgm: {
        title: "BGM 사용 툴",
        items: [],
      },
    },
  },
  projects: {
    enabled: false,
    sectionEyebrow: "",
    sectionTitle: "",
    sectionMeta: "",
    cards: [],
  },
  stats: {
    enabled: false,
    items: [],
  },
  works: {
    sectionTitle: "",
    sectionDescription: "",
    emptyText: "영상 항목을 추가하면 이 영역이 자동으로 채워집니다.",
    displayMode: "grid",
    gridColumns: 3,
    categoryStackColumns: 2,
    categoryStackTypeFilterEnabled: false,
    categoryStackSingleColumnSize: "medium",
    categoryOrder: [],
    categoryEntries: [],
    videos: [],
  },
  pricing: {
    sectionEyebrow: "Pricing Template",
    title: "서비스 구조를 바로 안내할 수 있게 준비해두세요.",
    description: "패키지, 포함 항목, 문의 CTA를 예시로 남겨두었습니다. 프로젝트에 맞게 값만 교체하면 됩니다.",
    plans: [
      {
        slug: "starter",
        design: "shortform",
        badge: "Template Example",
        icon: "movie_edit",
        title: "기본 포트폴리오 편집",
        description: "서비스 설명, 산출물 범위, 수정 횟수 같은 기본 정보를 넣어 구조를 빠르게 완성할 수 있습니다.",
        price: "₩000,000",
        priceUnit: "/ 프로젝트",
        features: [
          "작업 범위 예시 문구",
          "수정 정책 예시 문구",
          "납품 형식 예시 문구",
        ],
        cta: {
          label: "문의하기",
          href: "contact.html",
        },
      },
    ],
    customWorksEnabled: false,
    customWorks: [],
    processEnabled: false,
    processTitle: "",
    processSteps: [],
  },
  contact: {
    eyebrow: "CONTACT",
    title: "프로젝트 문의는\n이메일로 남겨주세요.",
    titleAccent: "이메일",
    description: "메일 주소와 응답 정책을 템플릿으로 남겨두었습니다. 실제 운영 정보로 교체해서 사용하세요.",
    primaryCard: {
      label: "Email",
      value: "your@email.com",
      note: "문의 내용을 간단히 적어 보내주세요.",
      icon: "mail",
      href: "mailto:your@email.com",
    },
    details: [
      {
        label: "Response",
        value: "Within 2 Business Days",
      },
      {
        label: "Location",
        value: "Remote / South Korea",
      },
      {
        label: "Availability",
        value: "Open for Projects",
      },
    ],
  },
  freeContent: "",
};

const WORKS_TYPE_LABELS = {
  long: "롱폼",
  short: "숏폼",
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

let DATA = clone(DEFAULT_DATA);
let mobileMenuOpen = false;
let navIndicatorFrame = 0;
let navIndicatorEventsBound = false;
const worksFilterState = {
  type: "all",
  category: "all",
};
const previewStorageKey = "portfolio-template-admin-preview-data";
const previewMessageType = "portfolio-template-preview-data";

function $(selector) {
  return document.querySelector(selector);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function lerp(start, end, progress) {
  return start + (end - start) * progress;
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  })[char]);
}

function escapeWithBreaks(value) {
  return escapeHTML(value).replace(/\n/g, "<br>");
}

function videoThumb(id) {
  return `https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg`;
}

function videoHref(video) {
  if (!video?.id) return "#";
  return video.type === "short"
    ? `https://www.youtube.com/shorts/${encodeURIComponent(video.id)}`
    : `https://youtu.be/${encodeURIComponent(video.id)}`;
}

function formatWorksDate(value) {
  const iso = String(value || "").trim();
  if (!iso) return "";
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) return iso;
  return `${year}. ${month}. ${day}`;
}

function getWorksCategories(videos) {
  const seen = new Set();
  return (Array.isArray(videos) ? videos : []).reduce((result, video) => {
    const category = String(video?.category || "").trim();
    if (!category || seen.has(category)) return result;
    seen.add(category);
    result.push(category);
    return result;
  }, []);
}

function normalizeWorksDisplayMode(value) {
  return value === "category-stack" ? "category-stack" : "grid";
}

function normalizeWorksColumnCount(value, fallback) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= 8 ? parsed : fallback;
}

function normalizeWorksSingleColumnSize(value) {
  return ["large", "medium", "small"].includes(String(value || "").trim())
    ? String(value).trim()
    : "medium";
}

function normalizePricingPlanDesign(value, fallback = "shortform") {
  const normalized = String(value || "").trim();
  if (normalized === "longform" || normalized === "shortform") return normalized;
  return fallback === "longform" ? "longform" : "shortform";
}

function normalizeWorksCategoryOrder(items, videos) {
  const detected = getWorksCategories(videos);
  const seen = new Set();
  const preserved = (Array.isArray(items) ? items : [])
    .map((item) => String(item || "").trim())
    .filter((item) => {
      if (!item || seen.has(item) || !detected.includes(item)) return false;
      seen.add(item);
      return true;
    });
  const newCategories = detected.filter((category) => !seen.has(category));
  return [...newCategories, ...preserved];
}

function getOrderedWorksCategories(videos, order) {
  return normalizeWorksCategoryOrder(order, videos);
}

function normalizeWorksCategoryEntries(items, videos, order) {
  const categories = getOrderedWorksCategories(videos, order);
  const entryMap = new Map(
    (Array.isArray(items) ? items : [])
      .map((item) => ({
        category: String(item?.category || "").trim(),
        title: String(item?.title || "").trim(),
        meta: String(item?.meta || item?.description || "").trim(),
        columns: Number.isInteger(Number(item?.columns)) ? Number(item.columns) : null,
        singleColumnSize: ["large", "medium", "small"].includes(String(item?.singleColumnSize || "").trim())
          ? String(item.singleColumnSize).trim()
          : "",
      }))
      .filter((item) => item.category)
      .map((item) => [item.category, item]),
  );

  return categories.map((category) => {
    const entry = entryMap.get(category);
    return {
      category,
      title: String(entry?.title || "").trim(),
      meta: String(entry?.meta || "").trim(),
      columns: Number.isInteger(Number(entry?.columns)) && Number(entry.columns) >= 1 && Number(entry.columns) <= 8
        ? Number(entry.columns)
        : null,
      singleColumnSize: ["large", "medium", "small"].includes(String(entry?.singleColumnSize || "").trim())
        ? String(entry.singleColumnSize).trim()
        : "",
    };
  });
}

function normalizeWorksVideos(items) {
  return Array.isArray(items)
    ? items.map((video) => ({
        id: String(video?.id || "").trim(),
        title: String(video?.title || "").trim(),
        date: String(video?.date || "").trim(),
        type: video?.type === "short" ? "short" : "long",
        category: String(video?.category || "").trim(),
      })).filter((video) => video.id)
    : [];
}

function normalizeLinkArray(items) {
  return Array.isArray(items)
    ? items.map((item) => ({
        label: String(item?.label || "").trim(),
        href: String(item?.href || item?.url || "").trim(),
        url: String(item?.url || item?.href || "").trim(),
      })).filter((item) => item.label || item.href || item.url)
    : [];
}

function normalizeHeroCareerMode(value) {
  return ["structured", "simple", "freeform"].includes(value) ? value : "structured";
}

function normalizeHeroInfoLayoutPreset(value) {
  return ["1:1", "2:1:1"].includes(String(value || "").trim()) ? String(value).trim() : "1:1";
}

function normalizeHeroCareerStructuredItems(items) {
  return Array.isArray(items)
    ? items.map((item) => ({
        title: String(item?.title || "").trim(),
        period: String(item?.period || "").trim(),
        description: String(item?.description || "").trim(),
      }))
    : [];
}

function normalizeHeroCareerSimpleItems(items) {
  return Array.isArray(items)
    ? items.map((item) => ({
        text: String(item?.text || "").trim(),
        period: String(item?.period || "").trim(),
      }))
    : [];
}

function normalizeHeroLogoItems(items) {
  return Array.isArray(items)
    ? items.map((item) => ({
        name: String(item?.name || "").trim(),
        logoUrl: String(item?.logoUrl || "").trim(),
        logoAlt: String(item?.logoAlt || "").trim(),
      }))
    : [];
}

function normalizeHeroInfoPanels(sourcePanels) {
  const basePanels = clone(DEFAULT_DATA.hero.infoPanels);
  const career = sourcePanels?.career || {};
  const tools = sourcePanels?.tools || {};
  const bgm = sourcePanels?.bgm || {};

  return {
    layoutPreset: normalizeHeroInfoLayoutPreset(sourcePanels?.layoutPreset ?? basePanels.layoutPreset),
    career: {
      ...basePanels.career,
      ...career,
      title: String(career.title ?? basePanels.career.title).trim() || basePanels.career.title,
      mode: normalizeHeroCareerMode(career.mode),
      structuredItems: normalizeHeroCareerStructuredItems(career.structuredItems),
      simpleItems: normalizeHeroCareerSimpleItems(career.simpleItems),
      freeformText: String(career.freeformText || "").trim(),
    },
    tools: {
      ...basePanels.tools,
      ...tools,
      title: String(tools.title ?? basePanels.tools.title).trim() || basePanels.tools.title,
      items: normalizeHeroLogoItems(tools.items),
    },
    bgm: {
      ...basePanels.bgm,
      ...bgm,
      title: String(bgm.title ?? basePanels.bgm.title).trim() || basePanels.bgm.title,
      items: normalizeHeroLogoItems(bgm.items),
    },
  };
}

function normalizeEnabled(value, fallback = true) {
  if (value === undefined || value === null) return fallback;
  return Boolean(value);
}

function normalizeCustomWorkBlock(block) {
  return {
    eyebrow: String(block?.eyebrow || "").trim(),
    title: String(block?.title || "").trim(),
    description: String(block?.description || "").trim(),
    highlight: String(block?.highlight || "").trim(),
    caption: String(block?.caption || "").trim(),
    imageUrl: String(block?.imageUrl || "").trim(),
    imageAlt: String(block?.imageAlt || "").trim(),
  };
}

function hasCustomWorkContent(block) {
  if (!block || typeof block !== "object") return false;
  return [
    block.eyebrow,
    block.title,
    block.description,
    block.highlight,
    block.caption,
    block.imageUrl,
    block.imageAlt,
  ].some((value) => String(value || "").trim());
}

function normalizeCustomWorks(items, legacyItem) {
  const normalizedItems = Array.isArray(items)
    ? items.map((item) => normalizeCustomWorkBlock(item)).filter(hasCustomWorkContent)
    : [];

  if (normalizedItems.length) return normalizedItems;

  const legacyBlock = normalizeCustomWorkBlock(legacyItem);
  return hasCustomWorkContent(legacyBlock) ? [legacyBlock] : [];
}

function parseYouTubeUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;

  const plainId = raw.match(/^[a-zA-Z0-9_-]{11}$/);
  if (plainId) return { id: raw, type: "long" };

  try {
    const url = new URL(raw);
    const host = url.hostname.replace(/^www\./, "");
    const segments = url.pathname.split("/").filter(Boolean);
    let id = "";
    let type = "long";

    if (host === "youtu.be") {
      id = segments[0] || "";
    } else if (host.endsWith("youtube.com")) {
      if (url.searchParams.get("v")) {
        id = url.searchParams.get("v") || "";
      } else if (segments[0] === "shorts") {
        id = segments[1] || "";
        type = "short";
      } else if (segments[0] === "embed") {
        id = segments[1] || "";
      }
    }

    id = id.split("?")[0].split("&")[0].trim();
    if (!/^[a-zA-Z0-9_-]{11}$/.test(id)) return null;
    return { id, type };
  } catch (error) {
    return null;
  }
}

function isDirectVideoUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return false;

  try {
    const url = new URL(raw, window.location.href);
    return /\.(mp4|webm|ogg|mov|m4v)$/i.test(url.pathname);
  } catch (error) {
    return /\.(mp4|webm|ogg|mov|m4v)(?:[?#].*)?$/i.test(raw);
  }
}

function buildYouTubeEmbedUrl(videoId) {
  return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1&mute=1&controls=0&loop=1&playlist=${encodeURIComponent(videoId)}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1`;
}

function getHeroBackgroundMedia(value) {
  const raw = String(value || "").trim();
  if (!raw) return { type: "none", src: "" };

  const youtube = parseYouTubeUrl(raw);
  if (youtube?.id) {
    return {
      type: "youtube",
      src: buildYouTubeEmbedUrl(youtube.id),
    };
  }

  if (isDirectVideoUrl(raw)) {
    return {
      type: "video",
      src: raw,
    };
  }

  return { type: "none", src: "" };
}

function normalizeData(input) {
  const source = input && typeof input === "object" && !Array.isArray(input) ? input : {};

  return {
    ...clone(DEFAULT_DATA),
    ...source,
    site: {
      ...clone(DEFAULT_DATA.site),
      ...(source.site || {}),
      brand: {
        ...clone(DEFAULT_DATA.site.brand),
        ...(source.site?.brand || {}),
      },
      nav: {
        ...clone(DEFAULT_DATA.site.nav),
        ...(source.site?.nav || {}),
        links: normalizeLinkArray(source.site?.nav?.links),
      },
      footer: {
        ...clone(DEFAULT_DATA.site.footer),
        ...(source.site?.footer || {}),
        enabled: normalizeEnabled(source.site?.footer?.enabled, DEFAULT_DATA.site.footer.enabled),
        linksEnabled: normalizeEnabled(source.site?.footer?.linksEnabled, DEFAULT_DATA.site.footer.linksEnabled),
        links: normalizeLinkArray(source.site?.footer?.links),
      },
    },
    hero: {
      ...clone(DEFAULT_DATA.hero),
      ...(source.hero || {}),
      actions: Array.isArray(source.hero?.actions)
        ? source.hero.actions.map((action) => ({
            label: String(action?.label || "").trim(),
            href: String(action?.href || "").trim(),
            variant: String(action?.variant || "primary").trim() || "primary",
          })).filter((action) => action.label || action.href)
        : [],
      infoPanels: normalizeHeroInfoPanels(source.hero?.infoPanels),
    },
    projects: {
      ...clone(DEFAULT_DATA.projects),
      ...(source.projects || {}),
      enabled: normalizeEnabled(source.projects?.enabled, DEFAULT_DATA.projects.enabled),
      cards: Array.isArray(source.projects?.cards)
        ? source.projects.cards.map((card) => ({
            layout: ["featured", "secondary", "small"].includes(card?.layout) ? card.layout : "small",
            tag: String(card?.tag || "").trim(),
            duration: String(card?.duration || "").trim(),
            title: String(card?.title || "").trim(),
            description: String(card?.description || "").trim(),
            ctaLabel: String(card?.ctaLabel || "").trim(),
            href: String(card?.href || "").trim(),
          })).filter((card) => card.title)
        : [],
    },
    stats: {
      enabled: normalizeEnabled(source.stats?.enabled, DEFAULT_DATA.stats.enabled),
      items: Array.isArray(source.stats?.items)
        ? source.stats.items.map((item) => ({
            value: String(item?.value || "").trim(),
            label: String(item?.label || "").trim(),
          })).filter((item) => item.value || item.label)
        : [],
    },
    works: {
      ...clone(DEFAULT_DATA.works),
      ...(source.works || {}),
      displayMode: normalizeWorksDisplayMode(source.works?.displayMode),
      gridColumns: normalizeWorksColumnCount(source.works?.gridColumns, DEFAULT_DATA.works.gridColumns),
      categoryStackColumns: normalizeWorksColumnCount(source.works?.categoryStackColumns, DEFAULT_DATA.works.categoryStackColumns),
      categoryStackTypeFilterEnabled: normalizeEnabled(source.works?.categoryStackTypeFilterEnabled, DEFAULT_DATA.works.categoryStackTypeFilterEnabled),
      categoryStackSingleColumnSize: normalizeWorksSingleColumnSize(source.works?.categoryStackSingleColumnSize),
      videos: normalizeWorksVideos(source.works?.videos),
      categoryOrder: normalizeWorksCategoryOrder(source.works?.categoryOrder, normalizeWorksVideos(source.works?.videos)),
      categoryEntries: normalizeWorksCategoryEntries(source.works?.categoryEntries, normalizeWorksVideos(source.works?.videos), source.works?.categoryOrder),
    },
    pricing: {
      ...clone(DEFAULT_DATA.pricing),
      ...(source.pricing || {}),
      customWorksEnabled: normalizeEnabled(source.pricing?.customWorksEnabled, DEFAULT_DATA.pricing.customWorksEnabled),
      processEnabled: normalizeEnabled(source.pricing?.processEnabled, DEFAULT_DATA.pricing.processEnabled),
      plans: Array.isArray(source.pricing?.plans)
        ? source.pricing.plans.map((plan) => ({
            slug: String(plan?.slug || "").trim(),
            design: normalizePricingPlanDesign(plan?.design, String(plan?.slug || "").trim() === "long" ? "longform" : "shortform"),
            badge: String(plan?.badge || "").trim(),
            icon: String(plan?.icon || "").trim(),
            title: String(plan?.title || "").trim(),
            description: String(plan?.description || "").trim(),
            price: String(plan?.price || "").trim(),
            priceUnit: String(plan?.priceUnit || "").trim(),
            features: Array.isArray(plan?.features)
              ? plan.features.map((feature) => String(feature || "").trim()).filter(Boolean)
              : [],
            cta: {
              label: String(plan?.cta?.label || "").trim(),
              href: String(plan?.cta?.href || "").trim(),
          },
        })).filter((plan) => plan.title || plan.price)
        : [],
      customWorks: normalizeCustomWorks(source.pricing?.customWorks, source.pricing?.customWork),
      processSteps: Array.isArray(source.pricing?.processSteps)
        ? source.pricing.processSteps.map((step) => ({
            number: String(step?.number || "").trim(),
            title: String(step?.title || "").trim(),
            description: String(step?.description || "").trim(),
          })).filter((step) => step.title || step.description)
        : [],
    },
    contact: {
      ...clone(DEFAULT_DATA.contact),
      ...(source.contact || {}),
      primaryCard: {
        ...clone(DEFAULT_DATA.contact.primaryCard),
        ...(source.contact?.primaryCard || {}),
      },
      details: Array.isArray(source.contact?.details)
        ? source.contact.details.map((detail) => ({
            label: String(detail?.label || "").trim(),
            value: String(detail?.value || "").trim(),
          })).filter((detail) => detail.label || detail.value)
        : [],
    },
    freeContent: String(source.freeContent || ""),
  };
}

function isAdminPreview() {
  try {
    return new URLSearchParams(window.location.search).get("preview") === "admin";
  } catch (error) {
    return false;
  }
}

function readAdminPreviewData() {
  try {
    const raw = window.localStorage.getItem(previewStorageKey);
    if (!raw) return null;
    return normalizeData(JSON.parse(raw));
  } catch (error) {
    console.warn("Failed to read admin preview data:", error);
    return null;
  }
}

function applyAdminPreviewData(raw) {
  DATA = normalizeData(raw);
  renderAll();
}

function resolveHref(href) {
  const value = String(href || "").trim();
  if (!value) return "";
  if (value.startsWith("#") || value.startsWith("mailto:") || value.startsWith("tel:")) return value;
  if (/^https?:\/\//i.test(value)) return value;
  if (/^(?:\.{1,2}\/|\/)/.test(value)) return value;
  if (/^[\w./-]+\.(?:html?|json|js|css|png|jpe?g|webp|svg|gif|pdf)(?:[?#].*)?$/i.test(value)) return value;
  if (/^[\w.-]+\.[a-z]{2,}(\/|$)/i.test(value)) return `https://${value}`;
  return value;
}

function getProjectsFallbackHash() {
  return DATA.projects?.enabled === false ? "#works" : "#projects";
}

function rewriteProjectsHref(href) {
  const resolved = resolveHref(href);
  if (!resolved || DATA.projects?.enabled !== false) return resolved;
  if (resolved.startsWith("mailto:") || resolved.startsWith("tel:")) return resolved;
  if (resolved.startsWith("#")) {
    return resolved.toLowerCase() === "#projects" ? "#works" : resolved;
  }
  if (isExternalHref(resolved)) return resolved;

  try {
    const url = new URL(resolved, window.location.href);
    if (url.origin !== window.location.origin) return resolved;
    const lastSegment = url.pathname.split("/").filter(Boolean).pop() || "";
    const page = !lastSegment || !lastSegment.includes(".") ? "index.html" : lastSegment.toLowerCase();
    if (page !== "index.html" || String(url.hash || "").trim().toLowerCase() !== "#projects") {
      return resolved;
    }
    return `index.html#works`;
  } catch (error) {
    return resolved;
  }
}

function resolvePreviewAwareHref(href) {
  const resolved = rewriteProjectsHref(href);
  if (!resolved || !isAdminPreview()) return resolved;
  if (resolved.startsWith("#") || resolved.startsWith("mailto:") || resolved.startsWith("tel:")) return resolved;
  if (isExternalHref(resolved)) return resolved;

  try {
    const url = new URL(resolved, window.location.href);
    if (url.origin !== window.location.origin) return resolved;
    url.searchParams.set("preview", "admin");
    return url.href;
  } catch (error) {
    return resolved;
  }
}

function isExternalHref(href) {
  return /^https?:\/\//i.test(resolveHref(href));
}

function currentPageName(locationRef = window.location) {
  const pathname = String(locationRef.pathname || "");
  const lastSegment = pathname.split("/").filter(Boolean).pop() || "";
  if (!lastSegment || !lastSegment.includes(".")) return "index.html";
  return lastSegment.toLowerCase();
}

function currentHash(locationRef = window.location) {
  return String(locationRef.hash || "").trim().toLowerCase();
}

function pageTargetFromHref(href) {
  const resolved = resolveHref(href);
  if (!resolved || resolved.startsWith("#") || isExternalHref(resolved) || resolved.startsWith("mailto:") || resolved.startsWith("tel:")) {
    return { page: "", hash: "" };
  }

  try {
    const url = new URL(resolved, window.location.href);
    const lastSegment = url.pathname.split("/").filter(Boolean).pop() || "";
    const page = !lastSegment || !lastSegment.includes(".") ? "index.html" : lastSegment.toLowerCase();
    const hash = String(url.hash || "").trim().toLowerCase();
    return { page, hash };
  } catch (error) {
    return { page: "", hash: "" };
  }
}

function renderAccentText(text, accent, accentClass) {
  const raw = String(text || "");
  const marker = String(accent || "").trim();
  if (!raw) return "";
  if (!marker) return escapeHTML(raw).replace(/\n/g, "<br>");

  const index = raw.indexOf(marker);
  if (index === -1) return escapeHTML(raw).replace(/\n/g, "<br>");

  const before = escapeHTML(raw.slice(0, index)).replace(/\n/g, "<br>");
  const middle = escapeHTML(marker);
  const after = escapeHTML(raw.slice(index + marker.length)).replace(/\n/g, "<br>");
  return `${before}<span class="${accentClass}">${middle}</span>${after}`;
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = String(value || "");
}

function setHidden(element, shouldHide) {
  if (!element) return;
  element.hidden = !!shouldHide;
}

function renderNavLinks(links, mobile = false) {
  const activePage = currentPageName();
  const activeHash = currentHash();
  return links.map((link) => {
    const href = resolvePreviewAwareHref(link.href || link.url);
    const attrs = isExternalHref(href) ? ' target="_blank" rel="noopener"' : "";
    const target = pageTargetFromHref(href);
    const targetPage = target.page;
    const targetHash = target.hash;
    const isActive = (() => {
      if (!targetPage || targetPage !== activePage) return false;
      if (targetHash === "#home") return !activeHash || activeHash === "#home";
      if (!targetHash) return !activeHash || activeHash === "#home";
      return targetHash === activeHash;
    })();
    const className = mobile
      ? isActive
        ? "rounded-lg border border-[#FDE047]/40 bg-[#FDE047]/10 px-4 py-3 text-sm font-bold text-[#FDE047]"
        : "rounded-lg border border-white/10 px-4 py-3 text-sm font-medium text-[#cec6ad] transition-colors duration-300 hover:text-[#FDE047]"
      : isActive
        ? "desktop-nav-link is-active"
        : "desktop-nav-link";
    const ariaCurrent = isActive ? ' aria-current="page"' : "";
    const dataset = mobile
      ? ""
      : ` data-nav-link="desktop" data-target-page="${escapeHTML(targetPage)}" data-target-hash="${escapeHTML(targetHash)}" data-static-active="${isActive ? "true" : "false"}"`;
    return `<a href="${escapeHTML(href || "#")}" class="${className}"${dataset}${attrs}${ariaCurrent}>${escapeHTML(link.label)}</a>`;
  }).join("");
}

function renderNav() {
  setText("brand-prefix", DATA.site.brand.prefix);
  setText("brand-name", DATA.site.brand.name);
  const brandLink = $("#brand-link");
  if (brandLink) brandLink.href = "index.html";

  const desktopLinks = $("#nav-links");
  const mobileLinks = $("#mobile-nav-links");
  if (desktopLinks) {
    desktopLinks.innerHTML = renderNavLinks(DATA.site.nav.links, false);
    desktopLinks.insertAdjacentHTML("beforeend", '<span id="nav-indicator" class="desktop-nav-indicator" aria-hidden="true"></span>');
  }
  if (mobileLinks) {
    mobileLinks.innerHTML = renderNavLinks(DATA.site.nav.links, true);
  }

  const ctaHref = resolveHref(DATA.site.nav.ctaHref) || "contact.html";
  const previewAwareCtaHref = resolvePreviewAwareHref(ctaHref);
  const ctaLabel = DATA.site.nav.ctaLabel || "문의하기";
  ["nav-cta", "mobile-nav-cta"].forEach((id) => {
    const link = document.getElementById(id);
    if (!link) return;
    link.textContent = ctaLabel;
    link.href = previewAwareCtaHref;
    if (isExternalHref(previewAwareCtaHref)) {
      link.target = "_blank";
      link.rel = "noopener";
    } else {
      link.removeAttribute("target");
      link.removeAttribute("rel");
    }
  });
}

function getDesktopNavLinks() {
  return Array.from(document.querySelectorAll('#nav-links [data-nav-link="desktop"]'));
}

function getLinkMetrics(link, container) {
  const linkRect = link.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  return {
    left: linkRect.left - containerRect.left,
    width: linkRect.width,
  };
}

function setDesktopNavActiveState(links, predicate) {
  links.forEach((link) => {
    const active = !!predicate(link);
    link.classList.toggle("is-active", active);
    if (active) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function getIndexNavProgress() {
  const homeSection = document.getElementById("home");
  const targetSection = document.getElementById(DATA.projects?.enabled === false ? "works" : "projects");
  if (!homeSection || !targetSection || targetSection.hidden) return null;

  const headerHeight = document.querySelector("header")?.offsetHeight || 0;
  const start = Math.max(homeSection.offsetTop, 0);
  const end = Math.max(targetSection.offsetTop - headerHeight - 24, start + 1);
  const scrollTop = window.scrollY || window.pageYOffset || 0;
  return clamp((scrollTop - start) / (end - start), 0, 1);
}

function syncDesktopNavIndicator() {
  navIndicatorFrame = 0;

  const container = $("#nav-links");
  const indicator = $("#nav-indicator");
  const links = getDesktopNavLinks();

  if (!container || !indicator || !links.length || container.offsetParent === null) {
    if (indicator) indicator.style.opacity = "0";
    return;
  }

  const activePage = currentPageName();
  const activeHash = currentHash();
  const homeLink = links.find((link) => link.dataset.targetPage === "index.html" && link.dataset.targetHash === "#home");
  const transitionHash = getProjectsFallbackHash();
  const targetLink = links.find((link) => link.dataset.targetPage === "index.html" && link.dataset.targetHash === transitionHash);

  let nextLeft = 0;
  let nextWidth = 0;
  let showIndicator = false;

  if (activePage === "index.html" && homeLink && targetLink) {
    const progress = getIndexNavProgress();
    if (progress !== null) {
      const homeMetrics = getLinkMetrics(homeLink, container);
      const targetMetrics = getLinkMetrics(targetLink, container);
      nextLeft = lerp(homeMetrics.left, targetMetrics.left, progress);
      nextWidth = lerp(homeMetrics.width, targetMetrics.width, progress);
      showIndicator = nextWidth > 0;

      setDesktopNavActiveState(links, (link) => {
        if (link === homeLink) return progress < 0.55;
        if (link === targetLink) return progress >= 0.55;
        const targetPage = String(link.dataset.targetPage || "").toLowerCase();
        const targetHash = String(link.dataset.targetHash || "").toLowerCase();
        if (!targetPage || targetPage !== activePage) return false;
        if (targetHash === "#home") return !activeHash || activeHash === "#home";
        if (!targetHash) return !activeHash || activeHash === "#home";
        return targetHash === activeHash;
      });
    }
  }

  if (!showIndicator) {
    const activeLink = links.find((link) => {
      const targetPage = String(link.dataset.targetPage || "").toLowerCase();
      const targetHash = String(link.dataset.targetHash || "").toLowerCase();
      if (!targetPage || targetPage !== activePage) return false;
      if (targetHash === "#home") return !activeHash || activeHash === "#home";
      if (!targetHash) return !activeHash || activeHash === "#home";
      return targetHash === activeHash;
    }) || links.find((link) => link.dataset.staticActive === "true") || null;

    setDesktopNavActiveState(links, (link) => link === activeLink);

    if (activeLink) {
      const metrics = getLinkMetrics(activeLink, container);
      nextLeft = metrics.left;
      nextWidth = metrics.width;
      showIndicator = nextWidth > 0;
    }
  }

  if (!showIndicator) {
    indicator.style.opacity = "0";
    indicator.style.width = "0px";
    return;
  }

  indicator.style.width = `${nextWidth}px`;
  indicator.style.transform = `translateX(${nextLeft}px)`;
  indicator.style.opacity = "1";
}

function scheduleDesktopNavIndicatorSync() {
  if (navIndicatorFrame) return;
  navIndicatorFrame = window.requestAnimationFrame(syncDesktopNavIndicator);
}

function getHeroCareerActiveItems(panel) {
  const mode = normalizeHeroCareerMode(panel?.mode);
  if (mode === "simple") {
    return (panel?.simpleItems || []).filter((item) => item.text || item.period);
  }
  if (mode === "freeform") {
    return String(panel?.freeformText || "").trim();
  }
  return (panel?.structuredItems || []).filter((item) => item.title || item.period || item.description);
}

function getHeroLogoPanelItems(panel) {
  return (panel?.items || []).filter((item) => item.name || item.logoUrl || item.logoAlt);
}

function hasHeroPanelContent(panelKey, panel) {
  if (panelKey === "career") {
    const active = getHeroCareerActiveItems(panel);
    return Array.isArray(active) ? active.length > 0 : Boolean(active);
  }
  return getHeroLogoPanelItems(panel).length > 0;
}

function renderHeroCareerPanel(panel) {
  const mode = normalizeHeroCareerMode(panel?.mode);

  if (mode === "simple") {
    const items = getHeroCareerActiveItems(panel);
    return `
      <ul class="hero-career-list">
        ${items.map((item) => `
          <li class="hero-career-item">
            <div class="hero-career-head">
              <span class="hero-career-text">${escapeHTML(item.text || "")}</span>
              ${item.period ? `<span class="hero-career-period">${escapeHTML(item.period)}</span>` : ""}
            </div>
          </li>
        `).join("")}
      </ul>
    `;
  }

  if (mode === "freeform") {
    return `<div class="hero-career-freeform">${escapeHTML(String(panel?.freeformText || "")).replace(/\n/g, "<br>")}</div>`;
  }

  const items = getHeroCareerActiveItems(panel);
  return `
    <ul class="hero-career-list">
      ${items.map((item) => `
        <li class="hero-career-item">
          <div class="hero-career-head">
            <span class="hero-career-name">${escapeHTML(item.title || "")}</span>
            ${item.period ? `<span class="hero-career-period">${escapeHTML(item.period)}</span>` : ""}
          </div>
          ${item.description ? `<div class="hero-career-description">${escapeHTML(item.description)}</div>` : ""}
        </li>
      `).join("")}
    </ul>
  `;
}

function renderHeroResourcePanel(panel) {
  const items = getHeroLogoPanelItems(panel);
  return `
    <ul class="hero-resource-list">
      ${items.map((item) => `
        <li class="hero-resource-item">
          ${item.logoUrl ? `
            <span class="hero-resource-logo">
              <img
                src="${escapeHTML(item.logoUrl)}"
                alt="${escapeHTML(item.logoAlt || item.name || "")}"
                loading="lazy"
                referrerpolicy="no-referrer"
                onerror="this.parentElement.classList.add('is-hidden'); this.remove();">
            </span>
          ` : ""}
          <span class="hero-resource-name">${escapeHTML(item.name || item.logoAlt || "항목")}</span>
        </li>
      `).join("")}
    </ul>
  `;
}

function renderHeroInfoCard(panelKey, panel) {
  const body = panelKey === "career"
    ? renderHeroCareerPanel(panel)
    : renderHeroResourcePanel(panel);

  return `
    <article class="hero-info-card" data-panel="${escapeHTML(panelKey)}">
      <h2 class="hero-info-card-title">${escapeHTML(panel.title || "")}</h2>
      ${body}
    </article>
  `;
}

function renderHeroInfoPanels() {
  const container = $("#hero-info-panels");
  if (!container) return;

  const infoPanels = DATA.hero?.infoPanels || DEFAULT_DATA.hero.infoPanels;
  const layoutPreset = normalizeHeroInfoLayoutPreset(infoPanels.layoutPreset);
  const visiblePanels = [
    { key: "career", panel: infoPanels.career },
    { key: "tools", panel: infoPanels.tools },
    { key: "bgm", panel: infoPanels.bgm },
  ].filter(({ key, panel }) => hasHeroPanelContent(key, panel));

  if (!visiblePanels.length) {
    container.hidden = true;
    container.className = "hero-info-grid";
    container.removeAttribute("data-count");
    container.removeAttribute("data-layout-preset");
    container.innerHTML = "";
    return;
  }

  const hasSplitLayout = visiblePanels.length === 3
    && visiblePanels.some(({ key }) => key === "career")
    && visiblePanels.some(({ key }) => key === "tools")
    && visiblePanels.some(({ key }) => key === "bgm");

  if (hasSplitLayout) {
    container.hidden = false;
    container.className = "hero-info-grid is-split";
    container.removeAttribute("data-count");
    container.dataset.layoutPreset = layoutPreset;
    container.innerHTML = `
      ${renderHeroInfoCard("career", infoPanels.career)}
      <div class="hero-info-stack">
        ${renderHeroInfoCard("tools", infoPanels.tools)}
        ${renderHeroInfoCard("bgm", infoPanels.bgm)}
      </div>
    `;
    return;
  }

  container.hidden = false;
  container.className = "hero-info-grid is-generic";
  container.dataset.count = String(visiblePanels.length);
  container.removeAttribute("data-layout-preset");
  container.innerHTML = visiblePanels.map(({ key, panel }) => renderHeroInfoCard(key, panel)).join("");
}

function renderHero() {
  setText("hero-eyebrow", DATA.hero.eyebrow);
  const title = $("#hero-title");
  if (title) {
    title.innerHTML = renderAccentText(DATA.hero.title, DATA.hero.titleAccent, "text-[#FDE047]");
  }
  const description = $("#hero-description");
  if (description) {
    description.innerHTML = escapeWithBreaks(DATA.hero.description);
  }
  setText("hero-status-label", DATA.hero.statusLabel);
  setText("hero-status-text", DATA.hero.statusText);
  setHidden($("#hero-status"), !(DATA.hero.statusLabel || DATA.hero.statusText));

  const actions = $("#hero-actions");
  if (actions) {
    actions.innerHTML = DATA.hero.actions.map((action) => {
      const href = resolvePreviewAwareHref(action.href) || "#";
      const external = isExternalHref(href) ? ' target="_blank" rel="noopener"' : "";
      const className = action.variant === "ghost"
        ? "inline-flex rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-all hover:border-[#FDE047] hover:text-[#FDE047]"
        : "inline-flex rounded-lg bg-primary-container px-6 py-3 text-sm font-bold text-on-primary transition-transform active:scale-95";
      return `<a href="${escapeHTML(href)}" class="${className}"${external}>${escapeHTML(action.label)}</a>`;
    }).join("");
  }

  const video = $("#hero-video");
  const source = $("#hero-video-source");
  const youtubeFrame = $("#hero-youtube");
  const backgroundMedia = getHeroBackgroundMedia(DATA.hero.backgroundVideoUrl);

  if (video && source) {
    if (backgroundMedia.type === "video" && backgroundMedia.src) {
      source.src = backgroundMedia.src;
      video.load();
      setHidden(video, false);
    } else {
      source.removeAttribute("src");
      video.pause?.();
      setHidden(video, true);
    }
  }

  if (youtubeFrame) {
    if (backgroundMedia.type === "youtube" && backgroundMedia.src) {
      youtubeFrame.src = backgroundMedia.src;
      setHidden(youtubeFrame, false);
    } else {
      youtubeFrame.removeAttribute("src");
      setHidden(youtubeFrame, true);
    }
  }

  renderHeroInfoPanels();
}

function renderProjects() {
  const section = $("#projects");
  setHidden(section, DATA.projects.enabled === false);
  if (DATA.projects.enabled === false) return;

  setText("projects-eyebrow", DATA.projects.sectionEyebrow);
  setText("projects-title", DATA.projects.sectionTitle);
  setText("projects-meta", DATA.projects.sectionMeta);

  const grid = $("#projects-grid");
  if (!grid) return;

  const layoutClassMap = {
    featured: "project-card md:col-span-8 border-primary-container/30",
    secondary: "project-card md:col-span-4 border-outline-variant/30",
    small: "project-card md:col-span-4 border-outline-variant/20",
  };

  grid.innerHTML = DATA.projects.cards.map((card) => {
    const href = resolvePreviewAwareHref(card.href);
    const external = isExternalHref(href) ? ' target="_blank" rel="noopener"' : "";
    const cta = card.ctaLabel && href
      ? `<a href="${escapeHTML(href)}" class="mt-6 inline-flex items-center gap-2 text-xs font-bold tracking-[0.08em] text-primary-container"${external}>
           ${escapeHTML(card.ctaLabel)}
           <span class="material-symbols-outlined text-sm">arrow_forward</span>
         </a>`
      : "";
    const desc = card.description
      ? `<p class="text-sm leading-relaxed text-on-surface-variant ${card.layout === "featured" ? "max-w-2xl text-lg" : ""}">${escapeHTML(card.description)}</p>`
      : "";
    const duration = card.duration
      ? `<span class="text-sm font-bold tracking-tight text-primary-container">${escapeHTML(card.duration)}</span>`
      : "";

    return `
      <article class="${layoutClassMap[card.layout] || layoutClassMap.small}" data-layout="${escapeHTML(card.layout)}">
        <div class="mb-6 flex items-center gap-3">
          ${card.tag ? `<span class="rounded-full bg-surface-container-highest px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-on-surface">${escapeHTML(card.tag)}</span>` : ""}
          ${duration}
        </div>
        <h3 class="project-title mb-4 text-3xl font-bold leading-none transition-colors ${card.layout === "featured" ? "md:text-6xl text-4xl" : "text-3xl"}">${escapeHTML(card.title)}</h3>
        ${desc}
        ${cta}
      </article>
    `;
  }).join("");
}

function renderStats() {
  const section = $("#stats");
  setHidden(section, DATA.stats.enabled === false);
  if (DATA.stats.enabled === false) return;

  const grid = $("#stats-grid");
  if (!grid) return;
  grid.innerHTML = DATA.stats.items.map((item) => `
    <div>
      <span class="mb-4 block text-4xl font-black tracking-tighter text-primary-container md:text-5xl">${escapeHTML(item.value)}</span>
      <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">${escapeHTML(item.label)}</span>
    </div>
  `).join("");
}

function renderWorksCard(video) {
  const href = videoHref(video);
  const metaParts = [];
  if (video.category) metaParts.push(video.category);
  if (video.date) metaParts.push(formatWorksDate(video.date));
  const metaMarkup = metaParts.length
    ? `<div class="works-card-meta">
         ${metaParts.map((item) => `<span>${escapeHTML(item)}</span>`).join("")}
       </div>`
    : "";

  return `
    <a class="works-card" href="${escapeHTML(href)}" target="_blank" rel="noopener">
      <div class="works-thumb">
        <img src="${escapeHTML(videoThumb(video.id))}" alt="${escapeHTML(video.title || "영상 썸네일")}" loading="lazy" referrerpolicy="no-referrer">
        <span class="works-type-badge" data-type="${escapeHTML(video.type)}">${escapeHTML(WORKS_TYPE_LABELS[video.type] || WORKS_TYPE_LABELS.long)}</span>
      </div>
      <div class="works-card-body">
        <div class="works-card-title">${escapeHTML(video.title || "제목 미입력")}</div>
        ${metaMarkup}
      </div>
    </a>
  `;
}

function renderGridWorksFilters(categories, hasShortVideos) {
  return `
    <div class="works-filter-group" role="group" aria-label="타입 필터">
      ${[
        { key: "all", label: "전체" },
        { key: "long", label: "롱폼" },
        ...(hasShortVideos ? [{ key: "short", label: "숏폼" }] : []),
      ].map((item) => `
        <button
          type="button"
          class="works-filter-button ${worksFilterState.type === item.key ? "is-active" : ""}"
          data-works-filter-type="${item.key}">
          ${item.label}
        </button>
      `).join("")}
    </div>
    <div class="works-filter-divider" aria-hidden="true"></div>
    <div class="works-filter-group" role="group" aria-label="카테고리 필터">
      <button
        type="button"
        class="works-filter-button ${worksFilterState.category === "all" ? "is-active" : ""}"
        data-works-filter-category="all">
        전체 카테고리
      </button>
      ${categories.map((category) => `
        <button
          type="button"
          class="works-filter-button ${worksFilterState.category === category ? "is-active" : ""}"
          data-works-filter-category="${escapeHTML(category)}">
          ${escapeHTML(category)}
        </button>
      `).join("")}
    </div>
  `;
}

function renderCategoryStackWorksFilters(hasShortVideos) {
  return `
    <div class="works-filter-group" role="group" aria-label="타입 필터">
      ${[
        { key: "all", label: "전체" },
        { key: "long", label: "롱폼" },
        ...(hasShortVideos ? [{ key: "short", label: "숏폼" }] : []),
      ].map((item) => `
        <button
          type="button"
          class="works-filter-button ${worksFilterState.type === item.key ? "is-active" : ""}"
          data-works-filter-type="${item.key}">
          ${item.label}
        </button>
      `).join("")}
    </div>
  `;
}

function renderWorksGrid(videos) {
  return videos.map((video) => renderWorksCard(video)).join("");
}

function renderWorksCategoryStack(videos, categories, works) {
  const columns = normalizeWorksColumnCount(works.categoryStackColumns, DEFAULT_DATA.works.categoryStackColumns);
  const singleSize = normalizeWorksSingleColumnSize(works.categoryStackSingleColumnSize);
  const categoryEntryMap = new Map(
    normalizeWorksCategoryEntries(works.categoryEntries, works.videos, works.categoryOrder)
      .map((entry) => [entry.category, entry]),
  );

  return `
    <div class="works-category-stack">
      ${categories.map((category) => {
        const categoryVideos = videos
          .filter((video) => video.category === category)
          .slice()
          .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
        const categoryEntry = categoryEntryMap.get(category) || { title: "", meta: "" };
        const displayTitle = categoryEntry.title || category;
        const resolvedColumns = Number.isInteger(categoryEntry.columns)
          ? normalizeWorksColumnCount(categoryEntry.columns, columns)
          : columns;
        const resolvedSingleSize = categoryEntry.singleColumnSize
          ? normalizeWorksSingleColumnSize(categoryEntry.singleColumnSize)
          : singleSize;

        if (!categoryVideos.length) return "";

        return `
          <section class="works-category-section">
            <div class="works-category-heading">
              <span class="works-category-kicker">Category</span>
              <h3 class="works-category-title">${escapeHTML(displayTitle)}</h3>
              ${categoryEntry.meta ? `<div class="works-category-subcopy">${escapeWithBreaks(categoryEntry.meta)}</div>` : ""}
            </div>
            <div class="works-category-grid" data-columns="${resolvedColumns}" data-single-size="${escapeHTML(resolvedSingleSize)}">
              ${categoryVideos.map((video) => renderWorksCard(video)).join("")}
            </div>
          </section>
        `;
      }).join("")}
    </div>
  `;
}

function renderWorks() {
  const section = $("#works");
  const title = $("#works-title");
  const description = $("#works-description");
  const filters = $("#works-filters");
  const groups = $("#works-groups");
  const grid = $("#works-grid");
  const empty = $("#works-empty");
  if (!section || !title || !description || !filters || !groups || !grid || !empty) return;

  const works = DATA.works || DEFAULT_DATA.works;
  const rawVideos = Array.isArray(works.videos) ? works.videos : [];
  const sectionTitle = String(works.sectionTitle || "").trim();
  const sectionDescription = String(works.sectionDescription || "").trim();
  const emptyText = String(works.emptyText || DEFAULT_DATA.works.emptyText || "").trim();
  const displayMode = normalizeWorksDisplayMode(works.displayMode);
  const hasSectionContent = Boolean(sectionTitle || sectionDescription || rawVideos.length);
  const hasShortVideos = rawVideos.some((video) => video.type === "short");
  const categories = getOrderedWorksCategories(rawVideos, works.categoryOrder);

  setHidden(section, !hasSectionContent);
  if (!hasSectionContent) {
    grid.innerHTML = "";
    groups.innerHTML = "";
    filters.innerHTML = "";
    empty.textContent = "";
    return;
  }

  title.textContent = sectionTitle;
  description.textContent = sectionDescription;
  setHidden(description, !sectionDescription);

  if (!["all", "long", "short"].includes(worksFilterState.type)) {
    worksFilterState.type = "all";
  }
  if (worksFilterState.type === "short" && !hasShortVideos) {
    worksFilterState.type = "all";
  }
  if (worksFilterState.category !== "all" && !categories.includes(worksFilterState.category)) {
    worksFilterState.category = "all";
  }
  if (displayMode === "category-stack" && works.categoryStackTypeFilterEnabled === false) {
    worksFilterState.type = "all";
  }

  if (rawVideos.length) {
    if (displayMode === "category-stack") {
      if (works.categoryStackTypeFilterEnabled) {
        filters.hidden = false;
        filters.innerHTML = renderCategoryStackWorksFilters(hasShortVideos);
      } else {
        filters.hidden = true;
        filters.innerHTML = "";
      }
    } else {
      filters.hidden = false;
      filters.innerHTML = renderGridWorksFilters(categories, hasShortVideos);
    }
  } else {
    filters.hidden = true;
    filters.innerHTML = "";
  }

  const filteredByType = rawVideos
    .filter((video) => worksFilterState.type === "all" || video.type === worksFilterState.type)
    .slice()
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));

  const visibleVideos = displayMode === "category-stack"
    ? filteredByType
    : filteredByType.filter((video) => worksFilterState.category === "all" || video.category === worksFilterState.category);

  if (!visibleVideos.length) {
    grid.innerHTML = "";
    groups.innerHTML = "";
    setHidden(grid, true);
    setHidden(groups, true);
    empty.textContent = emptyText || "해당 조건의 영상이 없습니다.";
    empty.hidden = false;
    return;
  }

  empty.hidden = true;

  if (displayMode === "category-stack") {
    groups.innerHTML = renderWorksCategoryStack(visibleVideos, categories, works);
    grid.innerHTML = "";
    setHidden(groups, false);
    setHidden(grid, true);
    return;
  }

  grid.dataset.columns = String(normalizeWorksColumnCount(works.gridColumns, DEFAULT_DATA.works.gridColumns));
  grid.innerHTML = renderWorksGrid(visibleVideos);
  groups.innerHTML = "";
  setHidden(grid, false);
  setHidden(groups, true);
}

function getProcessGridRowSizes(count) {
  const presets = {
    1: [1],
    2: [2],
    3: [3],
    4: [4],
    5: [3, 2],
    6: [3, 3],
    7: [4, 3],
    8: [4, 4],
    9: [3, 3, 3],
    10: [4, 4, 2],
    11: [4, 4, 3],
    12: [4, 4, 4],
  };

  if (presets[count]) return presets[count];

  const rows = [];
  let remaining = count;
  while (remaining > 0) {
    const next = Math.min(4, remaining);
    rows.push(next);
    remaining -= next;
  }
  return rows;
}

function chunkProcessSteps(steps) {
  const rowSizes = getProcessGridRowSizes(steps.length);
  const rows = [];
  let offset = 0;

  rowSizes.forEach((size) => {
    rows.push(steps.slice(offset, offset + size));
    offset += size;
  });

  return rows;
}

function renderProcessGrid(steps) {
  const visibleSteps = (Array.isArray(steps) ? steps : []).filter((step) => step.number || step.title || step.description);
  if (!visibleSteps.length) return "";

  return chunkProcessSteps(visibleSteps).map((row) => `
    <div class="process-grid-row" data-columns="${row.length}">
      ${row.map((step) => `
        <article class="process-step-card">
          <div class="process-step-number">${escapeHTML(step.number)}</div>
          <h4 class="process-step-title">${escapeHTML(step.title)}</h4>
          <p class="process-step-copy">${escapeHTML(step.description)}</p>
        </article>
      `).join("")}
    </div>
  `).join("");
}

function renderCustomWorkBlocks(blocks) {
  const visibleBlocks = (Array.isArray(blocks) ? blocks : []).filter(hasCustomWorkContent);
  if (!visibleBlocks.length) return "";

  return visibleBlocks.map((block, index) => {
    const direction = index % 2 === 1 ? "media-first" : "text-first";
    const caption = block.caption || block.title;

    return `
      <article class="custom-work-block" data-direction="${direction}">
        <section class="custom-work-copy">
          <h2 class="custom-work-title">${escapeHTML(block.title)}</h2>
          <p class="custom-work-description">${escapeHTML(block.description)}</p>
          <div class="custom-work-divider">
            <span class="custom-work-highlight">${escapeHTML(block.highlight)}</span>
            <span class="custom-work-line" aria-hidden="true"></span>
          </div>
        </section>

        <section class="custom-work-media">
          ${block.imageUrl
            ? `<img class="custom-work-image" alt="${escapeHTML(block.imageAlt || block.title || "")}" src="${escapeHTML(block.imageUrl)}">`
            : '<div class="custom-work-placeholder">이미지를 입력하면 이 영역에 표시됩니다.</div>'}
          <div class="custom-work-media-overlay"></div>
          <div class="custom-work-caption-wrap">
            <div class="custom-work-eyebrow">${escapeHTML(block.eyebrow)}</div>
            <div class="custom-work-caption">${escapeHTML(caption)}</div>
          </div>
        </section>
      </article>
    `;
  }).join("");
}

function renderPricing() {
  setText("pricing-eyebrow", DATA.pricing.sectionEyebrow);
  setText("pricing-title", DATA.pricing.title);
  setText("pricing-description", DATA.pricing.description);

  const plans = $("#pricing-plans");
  if (plans) {
    plans.innerHTML = DATA.pricing.plans.map((plan) => {
      const href = resolvePreviewAwareHref(plan.cta?.href);
      const external = isExternalHref(href) ? ' target="_blank" rel="noopener"' : "";
      const highlighted = normalizePricingPlanDesign(plan.design, String(plan.slug || "").trim() === "long" ? "longform" : "shortform") === "longform";
      const buttonClass = highlighted
        ? "inline-flex w-full items-center justify-center rounded-lg bg-primary-container px-6 py-4 font-black text-on-primary-container transition-all duration-300 hover:bg-primary-fixed-dim"
        : "inline-flex w-full items-center justify-center rounded-lg border border-outline-variant bg-transparent px-6 py-4 font-bold text-on-surface transition-all duration-300 hover:border-primary-container hover:bg-primary-container hover:text-on-primary-container";

      return `
        <article class="plan-card ${highlighted ? "highlighted border-primary-container bg-surface-container-high relative overflow-hidden p-10" : "bg-surface-container-low p-10"}">
          ${plan.badge ? `<div class="${highlighted ? "absolute right-0 top-0 p-4" : "mb-8"}"><span class="${highlighted ? "bg-primary-container px-2 py-1 text-[0.625rem] font-black uppercase tracking-tight text-on-primary-fixed" : "text-[0.6875rem] font-bold uppercase tracking-widest text-outline"}">${escapeHTML(plan.badge)}</span></div>` : ""}
          <div class="mb-12 flex items-start justify-between gap-3">
            ${plan.icon ? `<span class="material-symbols-outlined text-4xl text-primary-container">${escapeHTML(plan.icon)}</span>` : ""}
            ${!highlighted && plan.badge ? "" : ""}
          </div>
          <h3 class="mb-2 text-3xl font-bold ${highlighted ? "text-primary-container" : ""}">${escapeHTML(plan.title)}</h3>
          <p class="mb-8 text-sm leading-relaxed text-on-surface-variant">${escapeHTML(plan.description)}</p>
          <ul class="mb-12 space-y-4">
            ${plan.features.map((feature) => `
              <li class="flex items-center gap-3 text-sm">
                <span class="material-symbols-outlined text-base text-primary-container">check_circle</span>
                <span>${escapeHTML(feature)}</span>
              </li>
            `).join("")}
          </ul>
          <div>
            <div class="mb-6 text-4xl font-black tracking-tighter">
              ${escapeHTML(plan.price)}
              ${plan.priceUnit ? `<span class="text-sm font-normal text-outline">${escapeHTML(plan.priceUnit)}</span>` : ""}
            </div>
            ${plan.cta?.label && href ? `<a href="${escapeHTML(href)}" class="${buttonClass}"${external}>${escapeHTML(plan.cta.label)}</a>` : ""}
          </div>
        </article>
      `;
    }).join("");
  }

  const customWorksSection = $("#custom-works-section");
  const customWorksList = $("#custom-works-list");
  const customWorks = (DATA.pricing.customWorks || []).filter(hasCustomWorkContent);
  const showCustomWorks = DATA.pricing.customWorksEnabled !== false && customWorks.length > 0;
  setHidden(customWorksSection, !showCustomWorks);
  if (customWorksList) {
    customWorksList.innerHTML = showCustomWorks ? renderCustomWorkBlocks(customWorks) : "";
  }

  setText("process-title", DATA.pricing.processTitle);
  const processGrid = $("#process-grid");
  const processSection = $("#process-section");
  if (processGrid) {
    processGrid.innerHTML = renderProcessGrid(DATA.pricing.processSteps);
  }
  const hasProcessContent = (DATA.pricing.processSteps || []).some((step) => step.number || step.title || step.description)
    || Boolean(DATA.pricing.processTitle);
  setHidden(processSection, DATA.pricing.processEnabled === false || !hasProcessContent);
}

function renderContact() {
  setText("contact-eyebrow", DATA.contact.eyebrow);
  const title = $("#contact-title");
  if (title) {
    title.innerHTML = renderAccentText(DATA.contact.title, DATA.contact.titleAccent, "text-primary-container");
  }
  setText("contact-description", DATA.contact.description);

  const primary = $("#contact-primary-card");
  if (primary) {
    const icon = escapeHTML(DATA.contact.primaryCard.icon || "mail");
    const label = escapeHTML(DATA.contact.primaryCard.label);
    const value = escapeHTML(DATA.contact.primaryCard.value);
    const note = DATA.contact.primaryCard.note
      ? `<div class="mt-8 flex items-center gap-2 text-sm font-medium text-primary-container/70 transition-colors duration-300 group-hover:text-primary-container">
           <span class="material-symbols-outlined text-sm">info</span>
           <span>${escapeHTML(DATA.contact.primaryCard.note)}</span>
         </div>`
      : "";
    const inner = `
      <div class="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-container shadow-[0_0_40px_rgba(253,224,71,0.2)]">
        <span class="material-symbols-outlined text-4xl font-bold text-on-primary-container">${icon}</span>
      </div>
      <span class="mb-3 text-xs uppercase tracking-[0.2em] text-outline">${label}</span>
      <strong class="text-3xl font-bold tracking-tighter text-white md:text-5xl">${value}</strong>
      ${note}
    `;
    const href = resolveHref(DATA.contact.primaryCard.href);
    const previewAwareHref = resolvePreviewAwareHref(href);
    if (previewAwareHref) {
      const external = isExternalHref(previewAwareHref) ? ' target="_blank" rel="noopener"' : "";
      primary.innerHTML = `<a href="${escapeHTML(previewAwareHref)}" class="flex flex-col items-center"${external}>${inner}</a>`;
    } else {
      primary.innerHTML = `<div class="flex flex-col items-center">${inner}</div>`;
    }
  }

  const details = $("#contact-details");
  if (details) {
    const items = DATA.contact.details.filter((detail) => detail.label || detail.value);
    if (items.length === 1 || items.length === 2) {
      details.dataset.count = String(items.length);
    } else {
      delete details.dataset.count;
    }

    details.innerHTML = items
      .map((detail) => `
        <div class="flex flex-col items-center">
          <p class="mb-1 text-xs uppercase tracking-widest text-outline">${escapeHTML(detail.label)}</p>
          <p class="font-medium text-on-surface">${escapeHTML(detail.value)}</p>
        </div>
      `).join("");
  }
}

function renderFooter() {
  const footer = document.querySelector("footer");
  setHidden(footer, DATA.site.footer.enabled === false);
  if (DATA.site.footer.enabled === false) return;

  setText("footer-title", DATA.site.footer.title);
  setText("footer-copy", DATA.site.footer.copy);

  const links = $("#footer-links");
  if (links) {
    const items = DATA.site.footer.links.filter((link) => link.label);
    links.innerHTML = items.map((link) => {
      const href = resolvePreviewAwareHref(link.url || link.href) || "#";
      const external = isExternalHref(href) ? ' target="_blank" rel="noopener"' : "";
      return `<a href="${escapeHTML(href)}" class="text-xs uppercase tracking-[0.2em] text-[#cec6ad] transition-colors hover:text-[#FDE047]"${external}>${escapeHTML(link.label)}</a>`;
    }).join("");
    setHidden(links, DATA.site.footer.linksEnabled === false || items.length === 0);
  }
}

function renderFreeContent() {
  const section = $("#free-content");
  const copy = $("#free-content-copy");
  const content = String(DATA.freeContent || "").trim();
  if (!section || !copy) return;

  if (!content) {
    section.hidden = true;
    copy.textContent = "";
    return;
  }

  section.hidden = false;
  copy.textContent = content;
}

function applySiteMeta() {
  document.title = DATA.site.title || DEFAULT_DATA.site.title;
  const desc = $("#site-desc");
  if (desc) desc.setAttribute("content", DATA.site.description || "");
}

function setMobileMenu(open) {
  const panel = $("#mobile-nav");
  const toggle = $("#menu-toggle");
  mobileMenuOpen = open;
  if (panel) panel.hidden = !open;
  if (toggle) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    toggle.innerHTML = `<span class="material-symbols-outlined">${open ? "close" : "menu"}</span>`;
  }
}

function bindStaticEvents() {
  $("#menu-toggle")?.addEventListener("click", () => {
    setMobileMenu(!mobileMenuOpen);
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (link && mobileMenuOpen) setMobileMenu(false);
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-works-filter-type], [data-works-filter-category]");
    if (!button) return;

    const nextType = button.dataset.worksFilterType;
    const nextCategory = button.dataset.worksFilterCategory;
    if (nextType) worksFilterState.type = nextType;
    if (nextCategory) worksFilterState.category = nextCategory;
    renderWorks();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenuOpen) setMobileMenu(false);
  });

  if (!navIndicatorEventsBound) {
    navIndicatorEventsBound = true;
    window.addEventListener("scroll", scheduleDesktopNavIndicatorSync, { passive: true });
    window.addEventListener("resize", scheduleDesktopNavIndicatorSync);
    window.addEventListener("hashchange", scheduleDesktopNavIndicatorSync);
    window.addEventListener("load", scheduleDesktopNavIndicatorSync);
    document.fonts?.ready?.then(() => {
      scheduleDesktopNavIndicatorSync();
    }).catch(() => {});
  }
}

function bindAdminPreviewBridge() {
  if (!isAdminPreview()) return;

  window.addEventListener("message", (event) => {
    const sameOrigin = event.origin === window.location.origin || event.origin === "null";
    if (!sameOrigin || event.data?.type !== previewMessageType) return;
    applyAdminPreviewData(event.data.payload);
  });

  window.addEventListener("storage", (event) => {
    if (event.key !== previewStorageKey || !event.newValue) return;
    try {
      applyAdminPreviewData(JSON.parse(event.newValue));
    } catch (error) {
      console.warn("Failed to parse storage preview data:", error);
    }
  });
}

function renderAll() {
  applySiteMeta();
  renderNav();
  renderHero();
  renderProjects();
  renderStats();
  renderWorks();
  renderPricing();
  renderContact();
  renderFreeContent();
  renderFooter();
  scheduleDesktopNavIndicatorSync();
}

async function boot() {
  bindStaticEvents();
  bindAdminPreviewBridge();
  setMobileMenu(false);

  if (isAdminPreview()) {
    const previewData = readAdminPreviewData();
    if (previewData) {
      DATA = previewData;
      renderAll();
      return;
    }
  }

  try {
    const response = await fetch("data/site.json", { cache: "no-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const raw = await response.json();
    DATA = normalizeData(raw);
  } catch (error) {
    console.error("Failed to load data/site.json:", error);
    DATA = clone(DEFAULT_DATA);
    const main = $("#site-main");
    if (main) {
      main.innerHTML = `
        <section class="mx-auto flex min-h-screen max-w-screen-md items-center justify-center px-6 text-center">
          <div class="rounded-2xl border border-outline-variant/40 bg-surface-container-low p-8">
            <h1 class="mb-4 text-3xl font-bold text-white">데이터를 불러오지 못했습니다.</h1>
            <p class="text-on-surface-variant">data/site.json 경로와 JSON 형식을 확인해주세요.</p>
          </div>
        </section>
      `;
      return;
    }
  }

  renderAll();
}

boot();
