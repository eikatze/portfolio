const jsonPath = "../data/site.json";
const githubJsonPath = "data/site.json";
const githubDefaultBranch = "gh-pages";
const previewTargets = {
  brand: {
    title: "브랜드 / 내비 미리보기",
    description: "상단 헤더와 사이트 제목, 설명이 실제 화면에서 어떤 톤으로 보이는지 확인합니다.",
    pathText: "index.html / header",
    openHref: "../index.html",
  },
  hero: {
    title: "히어로 미리보기",
    description: "홈 첫 화면의 상단 히어로 카피와 액션 구성을 바로 확인할 수 있습니다.",
    pathText: "index.html#home",
    openHref: "../index.html#home",
  },
  "hero-panels": {
    title: "경력사항 / 툴 / BGM ",
    description: "경력사항 / 사용 가능한 툴 / BGM 카드 구성을 바로 확인합니다.",
    pathText: "index.html#home",
    openHref: "../index.html#home",
  },
  projects: {
    title: "프로젝트 미리보기",
    description: "프로젝트 섹션 전체 카드 배치와 카피 흐름을 바로 확인합니다.",
    pathText: "index.html#projects",
    openHref: "../index.html#projects",
  },
  works: {
    title: "영상 포트폴리오 미리보기",
    description: "stats 아래에 배치되는 YouTube 영상 포트폴리오 섹션을 바로 확인합니다.",
    pathText: "index.html#works",
    openHref: "../index.html#works",
  },
  "stats-process": {
    title: "통계 / 프로세스 미리보기",
    description: "홈의 통계 영역과 가격 페이지 하단 프로세스 섹션을 함께 보여줍니다.",
    pathText: "index.html#stats + pricing.html#process-section",
    openHref: "../pricing.html#process-section",
  },
  pricing: {
    title: "가격 / 커스텀 미리보기",
    description: "서비스 및 가격 페이지의 헤더, 플랜, 커스텀 작업 영역을 확인합니다.",
    pathText: "pricing.html",
    openHref: "../pricing.html",
  },
  "contact-footer": {
    title: "문의 / 푸터 미리보기",
    description: "문의 페이지와 푸터, 자유 작성 영역이 실제로 어떻게 보이는지 확인합니다.",
    pathText: "contact.html + footer",
    openHref: "../contact.html",
  },
  json: {
    title: "전체 사이트 미리보기",
    description: "현재 JSON 기준으로 홈, 가격, 문의 핵심 구간을 한 번에 빠르게 점검합니다.",
    pathText: "index.html / pricing.html / contact.html",
    openHref: "../index.html",
  },
};

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

const state = {
  data: clone(DEFAULT_DATA),
  activeTab: "works",
  search: "",
  typeFilter: "all",
  metadataTimer: null,
  metadataRequestId: 0,
  lastMetadataVideoId: "",
  worksFormVideoId: "",
};

const DIRECT_BINDINGS = {
  "site-title": ["site", "title"],
  "site-description": ["site", "description"],
  "site-github-repo": ["site", "githubRepo"],
  "brand-prefix": ["site", "brand", "prefix"],
  "brand-name": ["site", "brand", "name"],
  "nav-cta-label": ["site", "nav", "ctaLabel"],
  "nav-cta-href": ["site", "nav", "ctaHref"],
  "hero-video-url": ["hero", "backgroundVideoUrl"],
  "hero-eyebrow": ["hero", "eyebrow"],
  "hero-title": ["hero", "title"],
  "hero-title-accent": ["hero", "titleAccent"],
  "hero-description": ["hero", "description"],
  "hero-status-label": ["hero", "statusLabel"],
  "hero-status-text": ["hero", "statusText"],
  "hero-career-title": ["hero", "infoPanels", "career", "title"],
  "hero-tools-title": ["hero", "infoPanels", "tools", "title"],
  "hero-bgm-title": ["hero", "infoPanels", "bgm", "title"],
  "hero-career-freeform": ["hero", "infoPanels", "career", "freeformText"],
  "projects-eyebrow": ["projects", "sectionEyebrow"],
  "projects-title": ["projects", "sectionTitle"],
  "projects-meta": ["projects", "sectionMeta"],
  "pricing-eyebrow": ["pricing", "sectionEyebrow"],
  "pricing-title": ["pricing", "title"],
  "pricing-description": ["pricing", "description"],
  "pricing-process-title": ["pricing", "processTitle"],
  "contact-eyebrow": ["contact", "eyebrow"],
  "contact-title": ["contact", "title"],
  "contact-title-accent": ["contact", "titleAccent"],
  "contact-description": ["contact", "description"],
  "contact-card-label": ["contact", "primaryCard", "label"],
  "contact-card-value": ["contact", "primaryCard", "value"],
  "contact-card-note": ["contact", "primaryCard", "note"],
  "contact-card-icon": ["contact", "primaryCard", "icon"],
  "contact-card-href": ["contact", "primaryCard", "href"],
  "footer-title": ["site", "footer", "title"],
  "footer-copy": ["site", "footer", "copy"],
  "free-content-input": ["freeContent"],
};

const CHECKBOX_BINDINGS = {
  "projects-enabled": ["projects", "enabled"],
  "stats-enabled": ["stats", "enabled"],
  "pricing-process-enabled": ["pricing", "processEnabled"],
  "pricing-custom-works-enabled": ["pricing", "customWorksEnabled"],
  "footer-enabled": ["site", "footer", "enabled"],
  "footer-links-enabled": ["site", "footer", "linksEnabled"],
};

const HERO_TOOL_PRESETS = Object.freeze({
  "premiere-pro": {
    name: "Premiere Pro",
    logoUrl: "https://i.namu.wiki/i/Ij7VsOqUO-M0A1wkmGU3M3lL98IoQjm1_WWSaaKf3bThbZ5iml-pY3Totigp0p-IjbzTQ0sAGPqMxjugufdZUA.svg",
    logoAlt: "Premiere Pro logo",
  },
  "after-effects": {
    name: "After Effects",
    logoUrl: "https://i.namu.wiki/i/5ffo6UVBxthL_LEs62YVBnlFXkWaHSJ3H827dYMXrYbSS2DvU9LKJ4J26vv0s9qkQtfuGiBf92xtvhrxnILI6w.svg",
    logoAlt: "After Effects logo",
  },
  "photoshop": {
    name: "Photoshop",
    logoUrl: "https://i.namu.wiki/i/utkZKZsqgX2lN8bVgT6iAhkVQgGSTVlpzhqXPf0ATuiqYpEGq6rhGq2SPMElqlrngMTowqBLd8ywzgv4VpKdHg.svg",
    logoAlt: "Photoshop logo",
  },
  "illustrator": {
    name: "Illustrator",
    logoUrl: "https://i.namu.wiki/i/HmMUGgd5edIAGWNHV-n8dn2Hz5gXLT7MhvtJI7ODQWEkqQa4U1AugsKgQ2VhxeFXhftf3W2w1b8-hCgf3U1iYQ.svg",
    logoAlt: "Illustrator logo",
  },
  "lightroom": {
    name: "Lightroom",
    logoUrl: "https://i.namu.wiki/i/SBo3OFGdz8GIufgSI5H_RFGDaS9JKHSneRtpTDVRbTs8N42ducnUETlRaeWRypsQUOBtO8FN3gbXEBm5EE8sPvofA3oNBdTDljEo9kR9nBW6j_QlUjhQZloau_2sNFE2IDgrd_2DBEeFagHYGQBlXw.svg",
    logoAlt: "Lightroom logo",
  },
  "animate": {
    name: "Animate",
    logoUrl: "https://i.namu.wiki/i/94mx5IKH4gtk37eko8wznmpj-BFTX9wRi7ele5UYLcASJ2dKmJMT3by_r_hmxpLHyFsGaSt3NzQ9Gu8UpRiyKWAuGuPdt7jg_4l6BTsgjVW7FMtdaQ12DaeYVIYdrJjT60iZ-YVsmud1149EtTuvUg.svg",
    logoAlt: "Animate logo",
  },
  "premiere-rush": {
    name: "Premiere Rush",
    logoUrl: "https://i.namu.wiki/i/nSfsFM97VdDSUA40t1KLpz6vsmLwUsALoz9GCDatWzIRfefsOuWyex94lM4WOlcq3UJpljOlQ0VAeVcpXwg-3l4nthz8qcIyfDS41eIgSenkzUs8NuhxYndEdTdpTbnswUTMxpKXV_u_ASPuKFCX6w.svg",
    logoAlt: "Premiere Rush logo",
  },
  "indesign": {
    name: "InDesign",
    logoUrl: "https://i.namu.wiki/i/SjtqPHViHH2gl6ACRQnrLzFRLMiR5kWEU3oq9f0s4o5YG12JrTmXGWYrUrAJCa5j5giqlDCPOiSnsOCmwQrSPA.svg",
    logoAlt: "InDesign logo",
  },
  "incopy": {
    name: "InCopy",
    logoUrl: "https://i.namu.wiki/i/rNlmiB6U0mwpi_ssjugc6t_mbR8CmEoPU1p3iZ3185aJGYBv0R4x31IjmMzEHcEeaQJqETM2BVb3CmyXx-_Nj4ygLnqIZL3wy6F6arPOQjTeLgGKXsfPE_lDx9F2e3Y2FAE-Z7bP9-ng43VXIfe1zQ.svg",
    logoAlt: "InCopy logo",
  },
  "dreamweaver": {
    name: "Dreamweaver",
    logoUrl: "https://i.namu.wiki/i/Gxlvull9tBNWUhPsqy_mwy4wlG6rCckVUVihcf6nZXDSoJHaM411kK-1WZJD3omkuwbuoKyAcIC3PfskKY2Kr2dEO6zzQstnTh6mEWO45FZFB_9j-A7nTDo4Ee6-SMDUKP1js8M3B5gDIHYpUQt_sw.svg",
    logoAlt: "Dreamweaver logo",
  },
  "audition": {
    name: "Audition",
    logoUrl: "https://i.namu.wiki/i/dysDKKEZIXg038nVn2tIe-w9PCpp__Mj4vTQANmQAT0IlKE1xPbvXThxF4lT-wI7bdUHYAMYpvX29T1rnPCN2YwcODzE8eVyzU6klZO7tm7PtroHOBU2X6ztQuV34lzum6M_EiADS5oCCz2rSFrKvA.svg",
    logoAlt: "Audition logo",
  },
  "media-encoder": {
    name: "Media Encoder",
    logoUrl: "https://i.namu.wiki/i/HkalKwy8kRBZKQu3orl3utL_Hw10wRB92sJoKV_Ln1yUISyo6CSJIN-HDNZAXRV6o3jUC6gCZDZqD2DPe12ZECUQKraE9NRWkqjBjI-2nsLHx00oHeR6mf9MYr5zS6gOOXpfR2LLokb6umQcwrLlvQ.svg",
    logoAlt: "Media Encoder logo",
  },
  "stock": {
    name: "Stock",
    logoUrl: "https://i.namu.wiki/i/7pmsZxnnSd6w5jjvpHQmQGH0Wqbtg_RzqX6FfOYH4912v6ngDsziw3SdcJdzVP31uGjO8iHuc2RUaSZKLA3u2vvW1hG4Ee-qsTCukduoRIjfnDB-djPOEnSd2PWdmVrdxVHfWA29qazJG9I30JZiHg.svg",
    logoAlt: "Adobe Stock logo",
  },
  "bridge": {
    name: "Bridge",
    logoUrl: "https://i.namu.wiki/i/Jz8v1tcKDRNm8iJEg8asNVKbHnouPJwgEJuslOaisiGhnCBcj1Wm_RjDkl4ZcASqWe4HtMolE1YLzrkVfGLknaMrESLyeGrrXKe3WWWSvIPZN3VABQjM4xgilfltIscaOELryf5yqpG6v5B8NIf0ug.svg",
    logoAlt: "Bridge logo",
  },
  "spark": {
    name: "Spark",
    logoUrl: "https://i.namu.wiki/i/9r5GeEmRlU06naGxsAXYE6NhqE7JcYGEM2bh9TCkaJwoIZaUa3cFE5K9LIb9eK4cjnzUWvZUjd0YwOrnZvMrF-m-c5YI3NQV1Fb6Ts48hFD8Xhhzu3KNkfvRZqE9jT3hTEcsH3xwF0ceuJ-RlTr2rw.webp",
    logoAlt: "Spark logo",
  },
  "xd": {
    name: "XD",
    logoUrl: "https://i.namu.wiki/i/4Qs0FJdevgJhU7y8ztgAvp6k8RBFv14sVvzwS6OuVvWYRyPiH1EmfKhnakueue-ByR0p2Uc2mY8snbhd9dXgl4uNDP1dgFjdOuGyfmLicCx6kM_WWM1jDRSOuptpmfd9YofS6ffJ--t0yr2qakejMw.svg",
    logoAlt: "Adobe XD logo",
  },
  "dimension": {
    name: "Dimension",
    logoUrl: "https://i.namu.wiki/i/rduwglHk4mPcp6EyhEDmUOs8uTmNGBTuXLzfQVWzUgKu0yNppv-o0caYzsz9zvg5YDtM5wOEPZm5pMcpmBN7dEBxwbBPKC0Wws-tt9BjdobTgkTaSa7bpvi6h2o5mq7KXEAa3IiLabiefkYOIGI2Xw.svg",
    logoAlt: "Dimension logo",
  },
  "character-animator": {
    name: "Character Animator",
    logoUrl: "https://i.namu.wiki/i/kenevJANs_D4YTHjgIA7fi3JOlFVaB7Mt1C0OQSsHjkHSG_qZ-m0lb5zGb7Or81tJre1N7TvA0f18uDT5dFlwvUKWyaTt6ptS054E-L7CKtGxZvgD_aCSwC4HVCBuzlvSswm4jTz4ji8KYZDjJGJVQ.svg",
    logoAlt: "Character Animator logo",
  },
  "fresco": {
    name: "Fresco",
    logoUrl: "https://i.namu.wiki/i/jd4JGhe13yHCtGADaCpN5h4Y3ExYcwqzmhbKCrtR__7uSg6pHBnzsa_2ex-3pryu7dV-xhYSHP7YImmrtN6MCX2amwR7VU-sf_pldQwD-ALn4en9eThdQJnj6-QiY-LsVXGUL1Hcyv2CaekbhfU-_Q.svg",
    logoAlt: "Fresco logo",
  },
  "aero": {
    name: "Aero",
    logoUrl: "https://i.namu.wiki/i/CzrLsJrHhqCzsB-y7k8Pq02D7RV7ZvbmssvLWhckMWyIYws0QUPqqGE_SZSWLG4dXZiKzf2jKdjUnvpbq6RGrUvYNa2Uy9iZafxc99yTpdZUvCvWDzRaxEqK-SpW0cZ-O-pusPvbd0Wf1alwXQ5FCA.webp",
    logoAlt: "Aero logo",
  },
  "firefly": {
    name: "Firefly",
    logoUrl: "https://i.namu.wiki/i/jG0lHgs5mA8zq6QEO9Yafbdoh7EFqbMgTDqxOOtfTZ7vMfa1kcD8g59slnrOPkOYyqUQRnqqD0-gy4Py_RH_Pg.svg",
    logoAlt: "Firefly logo",
  },
});

const HERO_BGM_PRESETS = Object.freeze({
  artlist: {
    name: "Artlist",
    logoUrl: "https://search.pstatic.net/sunny?src=https%3A%2F%2Fartlist.io%2Ffavicon.ico%3Fv%3D1&type=f30_30_png_expire24",
    logoAlt: "Artlist logo",
  },
  mewpot: {
    name: "뮤팟",
    logoUrl: "https://i.namu.wiki/i/NCLySXrh5IA5yfffX9NXuDHPdPOedGwH0XK_B1aZx6V9PfvSZrCeQDIGypbA5pnPRZ3jYBt1XGYABSClWrd8TyP0R58AtCX38RE8AJFa0uY4sErYNdcqarurH13Y26UzZTsa9mWLTfMEfHAns5iX4g.webp",
    logoAlt: "뮤팟 logo",
  },
});

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return [...document.querySelectorAll(selector)];
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
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

function normalizeGitHubRepo(value) {
  let repo = String(value || "").trim();
  if (!repo) return "";

  repo = repo
    .replace(/^https?:\/\/github\.com\//i, "")
    .replace(/^git@github\.com:/i, "")
    .replace(/\.git$/i, "")
    .replace(/^\/+|\/+$/g, "");

  const parts = repo.split("/").filter(Boolean);
  if (parts.length < 2) return "";
  return `${parts[0]}/${parts[1]}`;
}

function resolveGitHubRepoFromPagesLocation(locationRef = window.location) {
  const hostname = String(locationRef.hostname || "").toLowerCase();
  const suffix = ".github.io";
  if (!hostname.endsWith(suffix) || hostname === suffix.slice(1)) return "";

  const owner = hostname.slice(0, -suffix.length);
  if (!owner) return "";

  const pathParts = String(locationRef.pathname || "")
    .split("/")
    .filter(Boolean)
    .map((part) => {
      try {
        return decodeURIComponent(part);
      } catch (error) {
        return part;
      }
    });

  const firstPath = pathParts[0] || "";
  const repoName = !firstPath || firstPath === "admin" || firstPath === "index.html"
    ? `${owner}.github.io`
    : firstPath;

  return `${owner}/${repoName}`;
}

function buildGitHubSiteJsonUrl(repo) {
  const normalizedRepo = normalizeGitHubRepo(repo);
  return normalizedRepo
    ? `https://github.com/${normalizedRepo}/blob/${githubDefaultBranch}/${githubJsonPath}`
    : "";
}

function resolveGitHubSiteJsonUrl(locationRef = window.location) {
  const repoFromPages = resolveGitHubRepoFromPagesLocation(locationRef);
  return repoFromPages ? buildGitHubSiteJsonUrl(repoFromPages) : "";
}

function normalizeNavLinks(items) {
  return Array.isArray(items)
    ? items.map((item) => ({
        label: String(item?.label || "").trim(),
        href: String(item?.href || item?.url || "").trim(),
      })).filter((item) => item.label || item.href)
    : [];
}

function normalizeFooterLinks(items) {
  return Array.isArray(items)
    ? items.map((item) => ({
        label: String(item?.label || "").trim(),
        url: String(item?.url || item?.href || "").trim(),
      })).filter((item) => item.label || item.url)
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
      freeformText: String(career.freeformText || ""),
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

function getProjectsFallbackHash() {
  return state.data.projects?.enabled === false ? "#works" : "#projects";
}

function previewHiddenBlock(message) {
  return `<div class="preview-hidden-block">${escapeHTML(message)}</div>`;
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

function getOrderedWorksCategories(videos = state.data.works?.videos, order = state.data.works?.categoryOrder) {
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

function videoThumb(id) {
  return `https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg`;
}

function videoHref(video) {
  if (!video?.id) return "#";
  return video.type === "short"
    ? `https://www.youtube.com/shorts/${encodeURIComponent(video.id)}`
    : `https://youtu.be/${encodeURIComponent(video.id)}`;
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

function formatDisplayDate(value) {
  const iso = String(value || "").trim();
  if (!iso) return "";
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) return iso;
  return `${year}. ${month}. ${day}`;
}

function getWorksCategories(videos = state.data.works?.videos) {
  const seen = new Set();
  return (Array.isArray(videos) ? videos : []).reduce((result, video) => {
    const category = String(video?.category || "").trim();
    if (!category || seen.has(category)) return result;
    seen.add(category);
    result.push(category);
    return result;
  }, []);
}

function getSortedWorksVideos(videos = state.data.works?.videos) {
  return (Array.isArray(videos) ? videos : [])
    .filter((video) => video.id)
    .slice()
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
}

function watchUrlFromVideoId(videoId) {
  return `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
}

function getWorksFormCategoryValue() {
  const select = $("#works-video-category");
  if (!select) return "";
  if (select.value === "__new__") {
    return String($("#works-new-category-name")?.value || "").trim();
  }
  return String(select.value || "").trim();
}

function renderWorksCategoryOptions(selected = getWorksFormCategoryValue()) {
  const select = $("#works-video-category");
  if (!select) return;
  const categories = getOrderedWorksCategories();

  const options = categories.map((category) => `
    <option value="${escapeHTML(category)}">${escapeHTML(category)}</option>
  `).join("");

  select.innerHTML = `<option value="__new__">새 카테고리 작성</option>${options}`;
  if (selected && categories.includes(selected)) {
    select.value = selected;
  } else {
    select.value = "__new__";
  }

  toggleWorksNewCategoryField();
}

function toggleWorksNewCategoryField() {
  const select = $("#works-video-category");
  const field = $("#works-new-category-field");
  if (!select || !field) return;
  field.hidden = select.value !== "__new__";
}

function clearWorksVideoDetailInputs() {
  const defaults = {
    "works-video-title": "",
    "works-video-date": "",
    "works-new-category-name": "",
  };

  Object.entries(defaults).forEach(([id, value]) => {
    const input = document.getElementById(id);
    if (input) input.value = value;
  });

  const typeSelect = $("#works-video-type");
  if (typeSelect) typeSelect.value = "long";
  renderWorksCategoryOptions("");
}

function toggleWorksVideoFields() {
  const parsed = parseYouTubeUrl($("#works-video-url")?.value || "");
  const fields = $("#works-video-fields");
  const preview = $("#works-new-video-preview");
  const submit = $("#works-video-submit");
  const footer = $("#works-video-form-footer");
  const hint = $("#works-video-url-hint");

  if (fields) fields.hidden = !parsed;
  if (preview) preview.hidden = !parsed;
  if (submit) submit.hidden = !parsed;
  if (footer) footer.hidden = !parsed;
  if (hint) {
    hint.textContent = parsed ? `영상 ID: ${parsed.id}` : "링크를 입력하면 작성칸이 열립니다.";
  }

  return parsed;
}

function fetchVideoMetadata(videoId) {
  return new Promise((resolve, reject) => {
    const callbackName = `__worksMeta${Date.now()}${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("메타데이터 조회 시간이 초과되었습니다."));
    }, 9000);

    function cleanup() {
      window.clearTimeout(timeout);
      delete window[callbackName];
      script.remove();
    }

    window[callbackName] = (payload) => {
      cleanup();
      if (!payload || payload.error || (!payload.title && !payload.author_name)) {
        reject(new Error(payload?.error || "제목과 채널명을 찾지 못했습니다."));
        return;
      }
      resolve(payload);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("Noembed 요청에 실패했습니다."));
    };

    script.src = `https://noembed.com/embed?url=${encodeURIComponent(watchUrlFromVideoId(videoId))}&callback=${encodeURIComponent(callbackName)}`;
    document.head.appendChild(script);
  });
}

function applyWorksVideoMetadata(meta) {
  const title = String(meta?.title || "").trim();
  const authorName = String(meta?.author_name || "").trim();
  const titleInput = $("#works-video-title");
  const select = $("#works-video-category");
  const newCategoryInput = $("#works-new-category-name");
  let changed = false;

  if (title && titleInput && !titleInput.value.trim()) {
    titleInput.value = title;
    changed = true;
  }

  if (authorName && select && newCategoryInput) {
    const categoryUntouched = select.value === "__new__" && !newCategoryInput.value.trim();
    if (categoryUntouched) {
      renderWorksCategoryOptions(authorName);
      if (getWorksCategories().includes(authorName)) {
        newCategoryInput.value = "";
      } else {
        select.value = "__new__";
        newCategoryInput.value = authorName;
        toggleWorksNewCategoryField();
      }
      changed = true;
    }
  }

  if (changed) {
    renderWorksNewVideoPreview();
  }

  return changed;
}

function scheduleWorksVideoMetadataLookup(parsed) {
  if (state.metadataTimer) {
    window.clearTimeout(state.metadataTimer);
    state.metadataTimer = null;
  }

  if (!parsed) return;
  if (state.lastMetadataVideoId === parsed.id) return;

  state.metadataTimer = window.setTimeout(async () => {
    const requestId = state.metadataRequestId + 1;
    state.metadataRequestId = requestId;
    state.lastMetadataVideoId = parsed.id;

    try {
      setStatus("영상 제목과 채널명을 확인하는 중입니다...", "info");
      const meta = await fetchVideoMetadata(parsed.id);
      if (requestId !== state.metadataRequestId) return;
      const changed = applyWorksVideoMetadata(meta);
      setStatus(changed ? "영상 제목과 채널명을 자동으로 채웠습니다." : "영상 정보를 확인했습니다.", "success");
    } catch (error) {
      if (requestId !== state.metadataRequestId) return;
      setStatus(`자동 입력 실패: ${error.message} 수동으로 입력해도 됩니다.`, "error");
    }
  }, 600);
}

function renderWorksNewVideoPreview() {
  const preview = $("#works-new-video-preview");
  if (!preview) return;

  const parsed = toggleWorksVideoFields();
  if (!parsed) {
    preview.innerHTML = "";
    return;
  }

  const title = String($("#works-video-title")?.value || "").trim() || "영상 제목 미입력";
  const date = String($("#works-video-date")?.value || "").trim();
  const type = String($("#works-video-type")?.value || "long").trim() === "short" ? "short" : "long";
  const category = getWorksFormCategoryValue();
  const meta = [category, formatDisplayDate(date)].filter(Boolean).join(" · ");

  preview.innerHTML = `
    <div class="mini-video-card">
      <div class="mini-thumb">
        <img src="${videoThumb(parsed.id)}" alt="" referrerpolicy="no-referrer">
        <span class="type-badge type-${escapeHTML(type)}">${escapeHTML(type === "short" ? "숏폼" : "롱폼")}</span>
      </div>
      <div class="mini-body">
        <strong>${escapeHTML(title)}</strong>
        ${meta ? `<span>${escapeHTML(meta)}</span>` : ""}
        <code>${escapeHTML(parsed.id)}</code>
      </div>
    </div>
  `;
}

function syncWorksVideoUrlFeedback(options = {}) {
  const raw = String($("#works-video-url")?.value || "").trim();
  const parsed = toggleWorksVideoFields();

  if (!raw) {
    state.worksFormVideoId = "";
    state.lastMetadataVideoId = "";
    setWorksUrlFeedback("링크를 입력하면 영상 정보를 확인합니다.");
    renderWorksNewVideoPreview();
    return null;
  }

  if (!parsed) {
    state.worksFormVideoId = "";
    state.lastMetadataVideoId = "";
    setWorksUrlFeedback("인식 가능한 YouTube 링크 또는 11자리 YouTube ID를 입력해주세요.", "error");
    renderWorksNewVideoPreview();
    return null;
  }

  if (state.worksFormVideoId !== parsed.id) {
    clearWorksVideoDetailInputs();
  }
  if (state.worksFormVideoId !== parsed.id) {
    const typeSelect = $("#works-video-type");
    if (typeSelect) typeSelect.value = parsed.type;
  }
  state.worksFormVideoId = parsed.id;

  setWorksUrlFeedback(
    `감지된 ID: ${parsed.id} / 기본 타입: ${parsed.type === "short" ? "숏폼" : "롱폼"}`,
    "success",
  );
  renderWorksNewVideoPreview();

  if (!options.skipMetadata) {
    scheduleWorksVideoMetadataLookup(parsed);
  }

  return parsed;
}

function resetWorksVideoForm() {
  const form = $("#works-video-form");
  form?.reset();
  state.worksFormVideoId = "";
  state.lastMetadataVideoId = "";
  renderWorksCategoryOptions("");
  toggleWorksNewCategoryField();
  syncWorksVideoUrlFeedback({ skipMetadata: true });
}

function normalizeData(input) {
  const source = input && typeof input === "object" && !Array.isArray(input) ? input : {};
  const base = clone(DEFAULT_DATA);

  return {
    ...base,
    ...source,
    site: {
      ...base.site,
      ...(source.site || {}),
      brand: {
        ...base.site.brand,
        ...(source.site?.brand || {}),
      },
      nav: {
        ...base.site.nav,
        ...(source.site?.nav || {}),
        links: normalizeNavLinks(source.site?.nav?.links),
      },
      footer: {
        ...base.site.footer,
        ...(source.site?.footer || {}),
        enabled: normalizeEnabled(source.site?.footer?.enabled, base.site.footer.enabled),
        linksEnabled: normalizeEnabled(source.site?.footer?.linksEnabled, base.site.footer.linksEnabled),
        links: normalizeFooterLinks(source.site?.footer?.links),
      },
    },
    hero: {
      ...base.hero,
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
      ...base.projects,
      ...(source.projects || {}),
      enabled: normalizeEnabled(source.projects?.enabled, base.projects.enabled),
      cards: Array.isArray(source.projects?.cards)
        ? source.projects.cards.map((card) => ({
            layout: ["featured", "secondary", "small"].includes(card?.layout) ? card.layout : "small",
            tag: String(card?.tag || "").trim(),
            duration: String(card?.duration || "").trim(),
            title: String(card?.title || "").trim(),
            description: String(card?.description || "").trim(),
            ctaLabel: String(card?.ctaLabel || "").trim(),
            href: String(card?.href || "").trim(),
          })).filter((card) => card.title || card.description)
        : [],
    },
    stats: {
      enabled: normalizeEnabled(source.stats?.enabled, base.stats.enabled),
      items: Array.isArray(source.stats?.items)
        ? source.stats.items.map((item) => ({
            value: String(item?.value || "").trim(),
            label: String(item?.label || "").trim(),
          })).filter((item) => item.value || item.label)
        : [],
    },
    works: {
      ...base.works,
      ...(source.works || {}),
      displayMode: normalizeWorksDisplayMode(source.works?.displayMode),
      gridColumns: normalizeWorksColumnCount(source.works?.gridColumns, base.works.gridColumns),
      categoryStackColumns: normalizeWorksColumnCount(source.works?.categoryStackColumns, base.works.categoryStackColumns),
      categoryStackTypeFilterEnabled: normalizeEnabled(source.works?.categoryStackTypeFilterEnabled, base.works.categoryStackTypeFilterEnabled),
      categoryStackSingleColumnSize: normalizeWorksSingleColumnSize(source.works?.categoryStackSingleColumnSize),
      videos: normalizeWorksVideos(source.works?.videos),
      categoryOrder: normalizeWorksCategoryOrder(source.works?.categoryOrder, normalizeWorksVideos(source.works?.videos)),
      categoryEntries: normalizeWorksCategoryEntries(source.works?.categoryEntries, normalizeWorksVideos(source.works?.videos), source.works?.categoryOrder),
    },
    pricing: {
      ...base.pricing,
      ...(source.pricing || {}),
      customWorksEnabled: normalizeEnabled(source.pricing?.customWorksEnabled, base.pricing.customWorksEnabled),
      processEnabled: normalizeEnabled(source.pricing?.processEnabled, base.pricing.processEnabled),
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
        })).filter((plan) => plan.title || plan.price || plan.description)
        : [],
      customWorks: normalizeCustomWorks(source.pricing?.customWorks, source.pricing?.customWork),
      processSteps: Array.isArray(source.pricing?.processSteps)
        ? source.pricing.processSteps.map((step) => ({
            number: String(step?.number || "").trim(),
            title: String(step?.title || "").trim(),
            description: String(step?.description || "").trim(),
          })).filter((step) => step.number || step.title || step.description)
        : [],
    },
    contact: {
      ...base.contact,
      ...(source.contact || {}),
      primaryCard: {
        ...base.contact.primaryCard,
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

function setStatus(message, type = "info") {
  const status = $("#editor-status");
  if (!status) return;
  status.textContent = message;
  status.className = `status ${type}`;
}

function setWorksUrlFeedback(message, type = "") {
  const feedback = $("#works-video-url-feedback");
  if (!feedback) return;
  feedback.textContent = message;
  if (type) {
    feedback.dataset.state = type;
  } else {
    delete feedback.dataset.state;
  }
}

function buildJson() {
  return `${JSON.stringify(state.data, null, 2)}\n`;
}

function refreshJsonOutput() {
  const output = $("#json-output");
  if (output) output.value = buildJson();
}

function textOrFallback(value, fallback) {
  const text = String(value || "").trim();
  return text || fallback;
}

function escapeWithBreaks(value) {
  return escapeHTML(String(value || "")).replace(/\n/g, "<br>");
}

function mountLivePreview() {
  const card = $("#live-preview-card");
  const panel = $(`.tab-panel[data-panel="${state.activeTab}"]`);
  const head = panel?.querySelector(".panel-head");
  if (!card || !panel || !head) return;

  head.insertAdjacentElement("afterend", card);
  card.hidden = false;
}

function previewConfigForTab(tab = state.activeTab) {
  const config = previewTargets[tab] || previewTargets.brand;
  if (tab !== "projects") return config;

  if (state.data.projects.enabled === false) {
    return {
      ...config,
      pathText: "index.html#works",
      openHref: "../index.html#works",
    };
  }

  return config;
}

function renderPreviewAccentText(text, accent, accentClass) {
  const raw = String(text || "");
  const marker = String(accent || "").trim();
  if (!raw) return "";
  if (!marker) return escapeWithBreaks(raw);

  const index = raw.indexOf(marker);
  if (index === -1) return escapeWithBreaks(raw);

  const before = escapeWithBreaks(raw.slice(0, index));
  const middle = escapeHTML(marker);
  const after = escapeWithBreaks(raw.slice(index + marker.length));
  return `${before}<span class="${accentClass}">${middle}</span>${after}`;
}

function renderPreviewNavLinks() {
  const links = state.data.site.nav.links.filter((link) => link.label);
  if (!links.length) {
    return '<span class="text-sm font-medium text-[#8b8577]">내비 링크를 추가하면 이 영역에 반영됩니다.</span>';
  }

  return links.map((link, index) => `
    <span class="${index === 0 ? "border-b-2 border-[#FDE047] pb-1 text-sm font-bold text-[#FDE047]" : "text-sm font-medium text-[#cec6ad]"}">${escapeHTML(link.label)}</span>
  `).join("");
}

function renderPreviewHeroActions() {
  const actions = state.data.hero.actions.filter((action) => action.label);
  if (!actions.length) {
    return '<span class="preview-placeholder inline-flex rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold">액션 버튼을 추가하면 여기에 표시됩니다.</span>';
  }

  return actions.map((action) => `
    <span class="${action.variant === "ghost"
      ? "inline-flex rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white"
      : "inline-flex rounded-lg bg-[#fde047] px-6 py-3 text-sm font-bold text-[#393000]"}">${escapeHTML(action.label)}</span>
  `).join("");
}

function getPreviewHeroCareerActiveContent(panel) {
  const mode = normalizeHeroCareerMode(panel?.mode);
  if (mode === "simple") {
    return (panel?.simpleItems || []).filter((item) => item.text || item.period);
  }
  if (mode === "freeform") {
    return String(panel?.freeformText || "").trim();
  }
  return (panel?.structuredItems || []).filter((item) => item.title || item.period || item.description);
}

function getPreviewHeroLogoItems(panel) {
  return (panel?.items || []).filter((item) => item.name || item.logoUrl || item.logoAlt);
}

function hasPreviewHeroPanelContent(panelKey, panel) {
  if (panelKey === "career") {
    const activeContent = getPreviewHeroCareerActiveContent(panel);
    return Array.isArray(activeContent) ? activeContent.length > 0 : Boolean(activeContent);
  }
  return getPreviewHeroLogoItems(panel).length > 0;
}

function renderPreviewHeroCareerBody(panel) {
  const mode = normalizeHeroCareerMode(panel?.mode);

  if (mode === "simple") {
    const items = getPreviewHeroCareerActiveContent(panel);
    return `
      <div class="grid gap-4">
        ${items.map((item) => `
          <div class="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
            <div class="flex flex-wrap items-baseline justify-between gap-3">
              <span class="hero-preview-entry-title text-white">${escapeHTML(item.text || "")}</span>
              ${item.period ? `<span class="text-[11px] font-bold uppercase tracking-[0.18em] text-[#fde047]">${escapeHTML(item.period)}</span>` : ""}
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  if (mode === "freeform") {
    return `<div class="hero-preview-freeform text-[#cec6ad]">${escapeWithBreaks(panel?.freeformText || "")}</div>`;
  }

  const items = getPreviewHeroCareerActiveContent(panel);
  return `
    <div class="grid gap-4">
      ${items.map((item) => `
        <div class="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
          <div class="flex flex-wrap items-baseline justify-between gap-3">
            <span class="hero-preview-entry-title text-white">${escapeHTML(item.title || "")}</span>
            ${item.period ? `<span class="text-[11px] font-bold uppercase tracking-[0.18em] text-[#fde047]">${escapeHTML(item.period)}</span>` : ""}
          </div>
          ${item.description ? `<div class="hero-preview-entry-copy mt-2 text-[#cec6ad]">${escapeHTML(item.description)}</div>` : ""}
        </div>
      `).join("")}
    </div>
  `;
}

function renderPreviewHeroResourceBody(panel) {
  const items = getPreviewHeroLogoItems(panel);
  return `
    <div class="grid gap-4">
      ${items.map((item) => `
        <div class="flex items-center gap-3 min-w-0">
          ${item.logoUrl ? `
            <span class="hero-preview-resource-logo">
              <img
                alt="${escapeHTML(item.logoAlt || item.name || "")}"
                src="${escapeHTML(item.logoUrl)}"
                referrerpolicy="no-referrer"
                onerror="this.parentElement.style.display='none'; this.remove();">
            </span>
          ` : ""}
          <span class="hero-preview-resource-name min-w-0 break-words text-[#f4ffff]">${escapeHTML(item.name || item.logoAlt || "항목")}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function renderPreviewHeroInfoCard(panelKey, panel) {
  const body = panelKey === "career"
    ? renderPreviewHeroCareerBody(panel)
    : renderPreviewHeroResourceBody(panel);

  return `
    <article class="hero-preview-info-card min-w-0 rounded-[1.5rem] border border-white/10 bg-[#1e1c12]/80 p-6 backdrop-blur-sm" data-panel="${escapeHTML(panelKey)}">
      <div class="mb-4 text-2xl font-extrabold tracking-tight text-white">${escapeHTML(panel.title || "")}</div>
      ${body}
    </article>
  `;
}

function renderPreviewHeroInfoPanels() {
  const infoPanels = state.data.hero.infoPanels || DEFAULT_DATA.hero.infoPanels;
  const layoutPreset = normalizeHeroInfoLayoutPreset(infoPanels.layoutPreset);
  const visiblePanels = [
    { key: "career", panel: infoPanels.career },
    { key: "tools", panel: infoPanels.tools },
    { key: "bgm", panel: infoPanels.bgm },
  ].filter(({ key, panel }) => hasPreviewHeroPanelContent(key, panel));

  if (!visiblePanels.length) return "";

  const hasSplitLayout = visiblePanels.length === 3
    && visiblePanels.some(({ key }) => key === "career")
    && visiblePanels.some(({ key }) => key === "tools")
    && visiblePanels.some(({ key }) => key === "bgm");

  if (hasSplitLayout) {
    return `
      <div class="hero-preview-info-grid is-split" data-layout-preset="${escapeHTML(layoutPreset)}">
        ${renderPreviewHeroInfoCard("career", infoPanels.career)}
        <div class="hero-preview-info-stack">
          ${renderPreviewHeroInfoCard("tools", infoPanels.tools)}
          ${renderPreviewHeroInfoCard("bgm", infoPanels.bgm)}
        </div>
      </div>
    `;
  }

  return `
    <div class="hero-preview-info-grid is-generic" data-count="${visiblePanels.length}">
      ${visiblePanels.map(({ key, panel }) => renderPreviewHeroInfoCard(key, panel)).join("")}
    </div>
  `;
}

function renderPreviewStatsItems() {
  const items = state.data.stats.items.filter((item) => item.value || item.label);
  if (!items.length) {
    return '<div class="rounded-2xl border border-dashed border-white/10 px-6 py-8 text-center text-sm font-medium text-[#8b8577]">통계 아이템을 추가하면 이곳에 표시됩니다.</div>';
  }

  return items.map((item) => `
    <div>
      <span class="mb-4 block text-4xl font-black tracking-tighter text-[#fde047] md:text-5xl">${escapeHTML(textOrFallback(item.value, "00"))}</span>
      <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-[#cec6ad]">${escapeHTML(textOrFallback(item.label, "LABEL"))}</span>
    </div>
  `).join("");
}

function renderPreviewWorksCard(video, options = {}) {
  const metaParts = [];
  if (video.category) metaParts.push(video.category);
  if (video.date) metaParts.push(formatDisplayDate(video.date));
  const metaMarkup = metaParts.length
    ? `<div class="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em] text-[#97917a]">
         ${metaParts.map((item) => `<span>${escapeHTML(item)}</span>`).join("")}
       </div>`
    : "";
  const mediaStyle = options.mediaHeight
    ? `height:${options.mediaHeight};`
    : "aspect-ratio:16 / 9;";

  return `
    <article class="overflow-hidden rounded-2xl border border-white/10 bg-[#1e1c12]">
      <div class="relative overflow-hidden bg-[#2d2a1f]" style="${mediaStyle}">
        <img class="h-full w-full object-cover" alt="${escapeHTML(video.title || "영상 썸네일")}" src="${escapeHTML(videoThumb(video.id))}" referrerpolicy="no-referrer">
        <span class="absolute right-4 top-4 rounded-full border ${video.type === "short" ? "border-[#3bf7ff]/30 text-[#8ffcff]" : "border-[#fde047]/30 text-[#fde047]"} bg-[#16130a]/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]">${escapeHTML(video.type === "short" ? "숏폼" : "롱폼")}</span>
      </div>
      <div class="grid gap-3 p-5">
        <div class="text-lg font-bold leading-snug tracking-tight text-white">${escapeHTML(textOrFallback(video.title, "제목 미입력"))}</div>
        ${metaMarkup}
      </div>
    </article>
  `;
}

function getPreviewWorksSingleColumnCardWidth(singleSize) {
  const size = normalizeWorksSingleColumnSize(singleSize);
  if (size === "small") return "min(100%, calc((100% - 3rem) / 3))";
  if (size === "medium") return "min(100%, calc((100% - 1.5rem) / 2))";
  return "100%";
}

function renderPreviewGridWorksFilters(categories, hasShortVideos) {
  const chips = [
    '<span class="rounded-full border border-[#fde047]/30 bg-[#fde047]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#fde047]">전체</span>',
    '<span class="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#cec6ad]">롱폼</span>',
    ...(hasShortVideos
      ? ['<span class="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#cec6ad]">숏폼</span>']
      : []),
  ];

  const categoryChips = [
    '<span class="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#cec6ad]">전체 카테고리</span>',
    ...categories.map((category) => `
      <span class="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#cec6ad]">${escapeHTML(category)}</span>
    `),
  ];

  return `
    <div class="flex flex-wrap items-center gap-3">
      ${chips.join("")}
      <span class="hidden h-5 w-px bg-white/10 md:block"></span>
      ${categoryChips.join("")}
    </div>
  `;
}

function renderPreviewCategoryStackWorksFilters(hasShortVideos) {
  return `
    <div class="flex flex-wrap items-center gap-3">
      <span class="rounded-full border border-[#fde047]/30 bg-[#fde047]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#fde047]">전체</span>
      <span class="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#cec6ad]">롱폼</span>
      ${hasShortVideos ? '<span class="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#cec6ad]">숏폼</span>' : ""}
    </div>
  `;
}

function renderPreviewWorksGrid(videos, columns) {
  if (!videos.length) {
    return `
      <div class="rounded-2xl border border-dashed border-white/10 px-6 py-8 text-center text-sm font-medium text-[#8b8577]">
        ${escapeHTML(textOrFallback(state.data.works.emptyText, "해당 조건의 영상이 없습니다."))}
      </div>
    `;
  }

  const safeColumns = normalizeWorksColumnCount(columns, DEFAULT_DATA.works.gridColumns);

  return `
    <div class="grid gap-6" style="grid-template-columns:repeat(${safeColumns}, minmax(0, 1fr));">
      ${videos.map((video) => renderPreviewWorksCard(video)).join("")}
    </div>
  `;
}

function renderPreviewWorksCategoryStack(videos, categories, works) {
  const safeColumns = normalizeWorksColumnCount(works.categoryStackColumns, DEFAULT_DATA.works.categoryStackColumns);
  const singleSize = normalizeWorksSingleColumnSize(works.categoryStackSingleColumnSize);
  const categoryEntryMap = new Map(
    normalizeWorksCategoryEntries(works.categoryEntries, works.videos, works.categoryOrder)
      .map((entry) => [entry.category, entry]),
  );

  if (!videos.length) {
    return `
      <div class="rounded-2xl border border-dashed border-white/10 px-6 py-8 text-center text-sm font-medium text-[#8b8577]">
        ${escapeHTML(textOrFallback(state.data.works.emptyText, "해당 조건의 영상이 없습니다."))}
      </div>
    `;
  }

  return `
    <div class="grid gap-12">
      ${categories.map((category) => {
        const categoryVideos = videos
          .filter((video) => video.category === category)
          .slice()
          .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
        const categoryEntry = categoryEntryMap.get(category) || { title: "", meta: "" };
        const displayTitle = categoryEntry.title || category;
        const resolvedColumns = Number.isInteger(categoryEntry.columns)
          ? normalizeWorksColumnCount(categoryEntry.columns, safeColumns)
          : safeColumns;
        const resolvedSingleSize = categoryEntry.singleColumnSize
          ? normalizeWorksSingleColumnSize(categoryEntry.singleColumnSize)
          : singleSize;
        const cardWidth = resolvedColumns === 1 ? getPreviewWorksSingleColumnCardWidth(resolvedSingleSize) : "100%";

        if (!categoryVideos.length) return "";

        return `
          <section class="grid gap-5">
            <div class="grid gap-2 border-b border-white/10 pb-4">
              <span class="text-[11px] font-black uppercase tracking-[0.22em] text-[#97917a]">Category</span>
              <h3 class="mb-0 text-3xl font-black tracking-tight text-white">${escapeHTML(displayTitle)}</h3>
              ${categoryEntry.meta ? `<div class="text-[12px] leading-relaxed text-[#cec6ad]">${escapeWithBreaks(categoryEntry.meta)}</div>` : ""}
            </div>
            <div class="grid gap-6" style="grid-template-columns:repeat(${resolvedColumns}, minmax(0, 1fr));${resolvedColumns === 1 ? "justify-items:center;" : ""}">
              ${categoryVideos.map((video) => `
                <div style="width:${cardWidth};max-width:100%;">
                  ${renderPreviewWorksCard(video)}
                </div>
              `).join("")}
            </div>
          </section>
        `;
      }).join("")}
    </div>
  `;
}

function renderPreviewProcessSteps() {
  const steps = state.data.pricing.processSteps.filter((step) => step.number || step.title || step.description);
  if (!steps.length) {
    return previewHiddenBlock("프로세스 단계를 추가하면 이곳에 표시됩니다.");
  }

  return chunkProcessSteps(steps).map((row) => `
    <div class="grid gap-4 mx-auto w-full" style="${row.length === 1 ? "max-width:18rem;grid-template-columns:repeat(1,minmax(0,1fr));" : ""}${row.length === 2 ? "max-width:38rem;grid-template-columns:repeat(2,minmax(0,1fr));" : ""}${row.length === 3 ? "max-width:58rem;grid-template-columns:repeat(3,minmax(0,1fr));" : ""}${row.length >= 4 ? "max-width:100%;grid-template-columns:repeat(4,minmax(0,1fr));" : ""}">
      ${row.map((step) => `
        <article class="grid gap-4 min-w-0">
          <div class="text-2xl font-black text-[#fde047] opacity-40">${escapeHTML(textOrFallback(step.number, "00"))}</div>
          <div class="font-bold text-white">${escapeHTML(textOrFallback(step.title, "프로세스 제목"))}</div>
          <div class="text-xs leading-relaxed text-[#cec6ad]">${escapeHTML(textOrFallback(step.description, "프로세스 설명이 이곳에 표시됩니다."))}</div>
        </article>
      `).join("")}
    </div>
  `).join("");
}

function renderPreviewCustomWorks() {
  const blocks = (state.data.pricing.customWorks || []).filter(hasCustomWorkContent);
  if (!blocks.length) {
    return previewHiddenBlock("커스텀 작업 블록을 추가하면 이곳에 표시됩니다.");
  }

  return blocks.map((block, index) => {
    const mediaFirst = index % 2 === 1;
    const textSection = `
      <section class="flex flex-col justify-center bg-[#1e1c12] p-10">
        <div class="mb-6 text-3xl font-bold text-white">${escapeHTML(textOrFallback(block.title, "커스텀 작업 제목"))}</div>
        <div class="mb-8 leading-relaxed text-[#cec6ad]">${escapeHTML(textOrFallback(block.description, "커스텀 작업 설명이 이곳에 표시됩니다."))}</div>
        <div class="flex items-center gap-4">
          <span class="text-xl font-black italic tracking-tight text-[#fde047]">${escapeHTML(textOrFallback(block.highlight, "FAST & ACCURATE"))}</span>
          <span class="h-px flex-1 bg-white/10"></span>
        </div>
      </section>
    `;
    const mediaSection = `
      <section class="relative min-h-[280px] overflow-hidden bg-[#2d2a1f]">
        ${block.imageUrl
          ? `<img class="h-full w-full object-cover grayscale" alt="${escapeHTML(block.imageAlt || block.title || "")}" src="${escapeHTML(block.imageUrl)}">`
          : '<div class="flex h-full min-h-[280px] items-center justify-center text-sm font-medium text-[#8b8577]">커스텀 작업 이미지를 입력하면 이 영역에 표시됩니다.</div>'}
        <div class="absolute inset-0 bg-gradient-to-t from-[#16130a] to-transparent opacity-70"></div>
        <div class="absolute bottom-8 left-8 right-8">
          <div class="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#fde047]">${escapeHTML(textOrFallback(block.eyebrow, "Studio Quality"))}</div>
          <div class="text-2xl font-bold text-white">${escapeHTML(textOrFallback(block.caption || block.title, "압도적인 퀄리티의 비결"))}</div>
        </div>
      </section>
    `;

    return `
      <div class="grid gap-6 md:grid-cols-2">
        ${mediaFirst ? `${mediaSection}${textSection}` : `${textSection}${mediaSection}`}
      </div>
    `;
  }).join("");
}

function renderPreviewProjectCards() {
  const cards = state.data.projects.cards.filter((card) => card.title || card.description);
  if (!cards.length) {
    return '<div class="rounded-2xl border border-dashed border-white/10 px-6 py-8 text-center text-sm font-medium text-[#8b8577] md:col-span-12">프로젝트 카드를 추가하면 이곳에 표시됩니다.</div>';
  }

  const layoutClassMap = {
    featured: "md:col-span-8 border-l border-[#fde047]/30 pl-8",
    secondary: "md:col-span-4 border-l border-white/10 pl-8",
    small: "md:col-span-4 border-t border-white/10 pt-8",
  };

  return cards.map((card) => `
    <article class="min-w-0 ${layoutClassMap[card.layout] || layoutClassMap.small}">
      <div class="mb-6 flex items-center gap-3">
        ${card.tag ? `<span class="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">${escapeHTML(card.tag)}</span>` : ""}
        ${card.duration ? `<span class="text-sm font-bold tracking-tight text-[#fde047]">${escapeHTML(card.duration)}</span>` : ""}
      </div>
      <div class="mb-4 text-3xl font-bold leading-none text-white ${card.layout === "featured" ? "md:text-6xl text-4xl" : "text-3xl"}">${escapeHTML(textOrFallback(card.title, "프로젝트 제목"))}</div>
      ${card.description ? `<div class="text-sm leading-relaxed text-[#cec6ad] ${card.layout === "featured" ? "max-w-2xl text-lg" : ""}">${escapeHTML(card.description)}</div>` : ""}
      ${card.ctaLabel ? `<span class="mt-6 inline-flex items-center gap-2 text-xs font-bold tracking-[0.08em] text-[#fde047]">${escapeHTML(card.ctaLabel)} <span class="material-symbols-outlined text-sm">arrow_forward</span></span>` : ""}
    </article>
  `).join("");
}

function renderPreviewPlanCards() {
  const plans = state.data.pricing.plans.filter((plan) => plan.title || plan.price || plan.description);
  if (!plans.length) {
    return '<div class="rounded-2xl border border-dashed border-white/10 px-6 py-8 text-center text-sm font-medium text-[#8b8577] md:col-span-2">가격 플랜을 추가하면 이곳에 표시됩니다.</div>';
  }

  return plans.map((plan) => {
    const highlighted = normalizePricingPlanDesign(plan.design, String(plan.slug || "").trim() === "long" ? "longform" : "shortform") === "longform";
    return `
      <article class="${highlighted ? "relative overflow-hidden border-t-4 border-[#fde047] bg-[#2d2a1f]" : "bg-[#1e1c12]"} rounded-2xl p-8">
        ${plan.badge ? `<div class="${highlighted ? "absolute right-0 top-0 p-4" : "mb-8"}"><span class="${highlighted ? "bg-[#fde047] px-2 py-1 text-[0.625rem] font-black uppercase tracking-tight text-[#211b00]" : "text-[0.6875rem] font-bold uppercase tracking-widest text-[#97917a]"}">${escapeHTML(plan.badge)}</span></div>` : ""}
        <div class="mb-10 flex items-start justify-between gap-3">
          ${plan.icon ? `<span class="material-symbols-outlined text-4xl text-[#fde047]">${escapeHTML(plan.icon)}</span>` : ""}
        </div>
        <div class="mb-2 text-3xl font-bold ${highlighted ? "text-[#fde047]" : "text-white"}">${escapeHTML(textOrFallback(plan.title, "플랜 제목"))}</div>
        <div class="mb-8 text-sm leading-relaxed text-[#cec6ad]">${escapeHTML(textOrFallback(plan.description, "플랜 설명이 이곳에 표시됩니다."))}</div>
        <ul class="mb-10 space-y-4">
          ${(plan.features || []).length
            ? plan.features.map((feature) => `
                <li class="flex items-center gap-3 text-sm">
                  <span class="material-symbols-outlined text-base text-[#fde047]">check_circle</span>
                  <span>${escapeHTML(feature)}</span>
                </li>
              `).join("")
            : '<li class="text-sm text-[#8b8577]">포함 항목을 추가하면 여기에 표시됩니다.</li>'}
        </ul>
        <div class="mb-6 text-4xl font-black tracking-tighter text-white">
          ${escapeHTML(textOrFallback(plan.price, "₩0"))}
          ${plan.priceUnit ? `<span class="text-sm font-normal text-[#97917a]">${escapeHTML(plan.priceUnit)}</span>` : ""}
        </div>
        ${plan.cta?.label ? `<span class="${highlighted ? "bg-[#fde047] text-[#211b00]" : "border border-white/10 text-white"} inline-flex w-full items-center justify-center rounded-lg px-6 py-4 text-sm font-bold">${escapeHTML(plan.cta.label)}</span>` : ""}
      </article>
    `;
  }).join("");
}

function renderPreviewFooterLinks() {
  const links = state.data.site.footer.links.filter((link) => link.label);
  if (!links.length) {
    return '<span class="text-xs uppercase tracking-[0.2em] text-[#8b8577]">푸터 링크를 추가하면 이곳에 표시됩니다.</span>';
  }

  return links.map((link) => `
    <span class="text-xs uppercase tracking-[0.2em] text-[#cec6ad]">${escapeHTML(link.label)}</span>
  `).join("");
}

function buildBrandPreview() {
  return `
    <section class="preview-render-root bg-[#16130a] text-[#e9e2d2]" style="font-family:'Epilogue', sans-serif;">
      <div class="border-b border-white/10 bg-[#16130a]/85 backdrop-blur-xl">
        <div class="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-6 py-4 md:px-8 md:py-6">
          <div class="text-2xl font-black uppercase tracking-tighter text-white">
            <span style="letter-spacing:-1.2px;">${escapeHTML(textOrFallback(state.data.site.brand.prefix, "studio"))}</span>
            <span style="letter-spacing:-1.2px;">${escapeHTML(textOrFallback(state.data.site.brand.name, "your-name"))}</span>
          </div>
          <div class="hidden items-center gap-8 md:flex">
            ${renderPreviewNavLinks()}
          </div>
          <span class="rounded-lg bg-[#fde047] px-5 py-2.5 text-sm font-bold text-[#393000] md:px-6">${escapeHTML(textOrFallback(state.data.site.nav.ctaLabel, "문의하기"))}</span>
        </div>
      </div>

      <div class="px-6 py-10 md:px-8">
        <div class="mx-auto max-w-screen-2xl">
          <div class="max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <span class="preview-label-chip">Site Copy</span>
            <div class="mt-5 text-3xl font-black tracking-tight text-white md:text-5xl">${escapeHTML(textOrFallback(state.data.site.title, "영상 포트폴리오 템플릿"))}</div>
            <div class="mt-4 text-sm leading-relaxed text-[#cec6ad] md:text-base">${escapeHTML(textOrFallback(state.data.site.description, "영상 편집자와 크리에이터를 위한 정적 포트폴리오 템플릿입니다."))}</div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function buildHeroPreview() {
  const backgroundMedia = getHeroBackgroundMedia(state.data.hero.backgroundVideoUrl);
  const backgroundMarkup = backgroundMedia.type === "youtube"
    ? `<iframe class="absolute inset-0 h-full w-full border-0 pointer-events-none" style="transform:scale(1.28);transform-origin:center;" title="Hero background video" allow="autoplay; encrypted-media; picture-in-picture" src="${escapeHTML(backgroundMedia.src)}"></iframe>`
    : backgroundMedia.type === "video"
      ? `<video class="absolute inset-0 h-full w-full object-cover" autoplay loop muted playsinline><source src="${escapeHTML(backgroundMedia.src)}"></video>`
      : "";

  return `
    <section class="preview-render-root relative overflow-hidden bg-[#16130a] text-[#e9e2d2]" style="font-family:'Epilogue', sans-serif;">
      ${backgroundMarkup}
      <div class="absolute inset-0" style="background:linear-gradient(to bottom, rgba(22, 19, 10, 0.32), rgba(22, 19, 10, 0.72), rgba(22, 19, 10, 0.98));"></div>
      <div class="relative mx-auto flex h-full max-w-screen-2xl items-start px-6 pt-16 pb-16 md:px-8 md:pt-24">
        <div class="flex w-full flex-col gap-10">
          <div class="flex w-full flex-col gap-12 md:flex-row md:justify-between md:gap-16">
            <div class="max-w-4xl">
              <span class="mb-5 block text-xs font-bold uppercase tracking-[0.3em] text-[#fde047]">${escapeHTML(textOrFallback(state.data.hero.eyebrow, "VIDEO PORTFOLIO TEMPLATE"))}</span>
              <div class="text-5xl font-black leading-[0.95] text-white md:text-7xl">${renderPreviewAccentText(textOrFallback(state.data.hero.title, "브랜드에 맞는\n영상 포트폴리오를 시작하세요."), state.data.hero.titleAccent, "text-[#FDE047]")}</div>
              <div class="mt-8 max-w-2xl rounded-xl border border-white/10 bg-[#16130a]/30 p-4 text-base font-medium leading-relaxed text-[#cec6ad] backdrop-blur-sm md:text-lg">${escapeWithBreaks(textOrFallback(state.data.hero.description, "JSON 데이터만 교체하면 소개 문구와 섹션 구성을 빠르게 바꿀 수 있습니다."))}</div>
              <div class="mt-8 flex flex-wrap gap-4">
                ${renderPreviewHeroActions()}
              </div>
            </div>
            <div class="hidden lg:block">
              <div class="flex flex-col items-end gap-2 text-right">
                <span class="text-[10px] uppercase tracking-[0.2em] text-[#cec6ad]">${escapeHTML(textOrFallback(state.data.hero.statusLabel, "Status"))}</span>
                <div class="flex items-center gap-2">
                  <span class="h-2 w-2 rounded-full bg-[#3bf7ff]"></span>
                  <span class="text-xs font-bold text-white">${escapeHTML(textOrFallback(state.data.hero.statusText, "READY FOR CUSTOMIZATION"))}</span>
                </div>
              </div>
            </div>
          </div>
          ${renderPreviewHeroInfoPanels()}
        </div>
      </div>
    </section>
  `;
}

function buildProjectsPreview() {
  if (state.data.projects.enabled === false) {
    return `
      <section class="preview-render-root bg-[#16130a] px-6 py-16 text-[#e9e2d2] md:px-8" style="font-family:'Epilogue', sans-serif;">
        <div class="mx-auto max-w-screen-2xl">${previewHiddenBlock("프로젝트 섹션이 꺼져 있습니다. 내부 작업물 링크는 영상 포트폴리오로 이동합니다.")}</div>
      </section>
    `;
  }

  return `
    <section class="preview-render-root bg-[#16130a] px-6 py-16 text-[#e9e2d2] md:px-8" style="font-family:'Epilogue', sans-serif;">
      <div class="mx-auto max-w-screen-2xl">
        <div class="mb-16 flex flex-col gap-6 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <span class="mb-4 block text-xs uppercase tracking-[0.2em] text-[#fde047]">${escapeHTML(textOrFallback(state.data.projects.sectionEyebrow, "Featured Works"))}</span>
            <div class="text-4xl font-bold tracking-tighter text-white md:text-6xl">${escapeHTML(textOrFallback(state.data.projects.sectionTitle, "SELECTED PROJECT"))}</div>
          </div>
          <div class="text-xs uppercase tracking-[0.2em] text-[#cec6ad]">${escapeHTML(textOrFallback(state.data.projects.sectionMeta, "2024 COLLECTION"))}</div>
        </div>
        <div id="projects" class="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-12">
          ${renderPreviewProjectCards()}
        </div>
      </div>
    </section>
  `;
}

function buildStatsPreview() {
  if (state.data.stats.enabled === false) {
    return `
      <section class="preview-render-root bg-[#16130a] px-6 py-14 text-[#e9e2d2] md:px-8" style="font-family:'Epilogue', sans-serif;">
        <div class="mx-auto max-w-screen-2xl">${previewHiddenBlock("통계 섹션이 꺼져 있습니다.")}</div>
      </section>
    `;
  }

  return `
    <section class="preview-render-root bg-[#16130a] px-6 py-14 text-[#e9e2d2] md:px-8" style="font-family:'Epilogue', sans-serif;">
      <div id="stats" class="mx-auto max-w-screen-2xl border-t border-white/10 pt-10">
        <div class="grid gap-6 md:grid-cols-4">
          ${renderPreviewStatsItems()}
        </div>
      </div>
    </section>
  `;
}

function buildWorksPreview() {
  const works = state.data.works || DEFAULT_DATA.works;
  const hasSectionShell = Boolean(String(works.sectionTitle || "").trim() || String(works.sectionDescription || "").trim() || works.videos.length);
  const description = String(state.data.works.sectionDescription || "").trim();
  const videos = getSortedWorksVideos(state.data.works.videos);
  const categories = getOrderedWorksCategories(videos, works.categoryOrder);
  const hasVideos = videos.length > 0;
  const hasShortVideos = videos.some((video) => video.type === "short");
  const displayMode = normalizeWorksDisplayMode(works.displayMode);
  if (!hasSectionShell) {
    return `
      <section class="preview-render-root bg-[#16130a] px-6 py-14 text-[#e9e2d2] md:px-8" style="font-family:'Epilogue', sans-serif;">
        <div class="mx-auto max-w-screen-2xl">${previewHiddenBlock("영상 항목을 추가하면 작업물 섹션이 표시됩니다.")}</div>
      </section>
    `;
  }
  const filtersMarkup = !hasVideos
    ? ""
    : displayMode === "category-stack"
      ? (works.categoryStackTypeFilterEnabled ? renderPreviewCategoryStackWorksFilters(hasShortVideos) : "")
      : renderPreviewGridWorksFilters(categories, hasShortVideos);
  const contentMarkup = displayMode === "category-stack"
    ? renderPreviewWorksCategoryStack(videos, categories, works)
    : renderPreviewWorksGrid(videos, works.gridColumns);

  return `
    <section class="preview-render-root bg-[#16130a] px-6 py-14 text-[#e9e2d2] md:px-8" style="font-family:'Epilogue', sans-serif;">
      <div id="works" class="mx-auto max-w-screen-2xl border-t border-white/10 pt-12">
        <div class="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div class="mb-4 block text-xs uppercase tracking-[0.2em] text-[#fde047]">Video Portfolio</div>
            <div class="text-4xl font-bold tracking-tighter text-white md:text-6xl">${escapeHTML(textOrFallback(state.data.works.sectionTitle, "영상 포트폴리오"))}</div>
          </div>
          ${description ? `<div class="max-w-2xl text-sm leading-relaxed text-[#cec6ad] md:text-base">${escapeHTML(description)}</div>` : ""}
        </div>
        ${filtersMarkup ? `<div class="mb-8">${filtersMarkup}</div>` : ""}
        ${contentMarkup}
      </div>
    </section>
  `;
}

function buildProcessPreview() {
  if (state.data.pricing.processEnabled === false) {
    return `
      <section class="preview-render-root bg-[#16130a] px-6 py-14 text-[#e9e2d2] md:px-8" style="font-family:'Epilogue', sans-serif;">
        <div class="mx-auto max-w-screen-xl">${previewHiddenBlock("진행 프로세스 섹션이 꺼져 있습니다.")}</div>
      </section>
    `;
  }

  return `
      <section class="preview-render-root bg-[#16130a] px-6 py-14 text-[#e9e2d2] md:px-8" style="font-family:'Epilogue', sans-serif;">
        <div id="process-section" class="mx-auto max-w-screen-xl border-t border-white/10 pt-12">
          <div class="mb-10 text-center text-2xl font-bold text-white">${escapeHTML(textOrFallback(state.data.pricing.processTitle, "진행 프로세스 및 정책"))}</div>
          <div class="grid gap-4">
            ${renderPreviewProcessSteps()}
          </div>
        </div>
      </section>
  `;
}

function buildStatsProcessPreview() {
  return `
    <div class="grid gap-4">
      ${buildStatsPreview()}
      ${buildProcessPreview()}
    </div>
  `;
}

function buildPricingPreview() {
  return `
    <section class="preview-render-root bg-[#16130a] px-6 py-16 text-[#e9e2d2] md:px-8" style="font-family:'Epilogue', sans-serif;">
      <div id="pricing" class="mx-auto max-w-screen-xl">
        <header class="mb-16">
          <div class="mb-4 inline-block rounded-sm bg-white/10 px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-[#fde047]">${escapeHTML(textOrFallback(state.data.pricing.sectionEyebrow, "Pricing Template"))}</div>
          <div class="mb-6 text-4xl font-black leading-[1.1] tracking-tighter text-white md:text-6xl">${escapeHTML(textOrFallback(state.data.pricing.title, "서비스 구조를 바로 안내할 수 있게 준비해두세요."))}</div>
          <div class="max-w-2xl text-lg leading-relaxed text-[#cec6ad]">${escapeHTML(textOrFallback(state.data.pricing.description, "패키지, 포함 항목, 문의 CTA를 예시로 남겨두었습니다."))}</div>
        </header>

        <div class="grid gap-6 md:grid-cols-2">
          ${renderPreviewPlanCards()}
        </div>

        <div class="mt-20 grid gap-6">
          ${state.data.pricing.customWorksEnabled === false
            ? previewHiddenBlock("커스텀 작업 블록이 꺼져 있습니다.")
            : renderPreviewCustomWorks()}
        </div>
      </div>
    </section>
  `;
}

function buildContactFooterPreview() {
  const details = state.data.contact.details.filter((detail) => detail.label || detail.value);
  const footerEnabled = state.data.site.footer.enabled !== false;
  const detailGridClass = details.length <= 1
    ? "md:grid-cols-1"
    : details.length === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-3";

  return `
    <section class="preview-render-root bg-[#16130a] text-[#e9e2d2]" style="font-family:'Epilogue', sans-serif;">
      <div id="contact" class="flex min-h-[520px] items-center justify-center px-6 pt-20 pb-16 md:px-8">
        <div class="mx-auto max-w-screen-2xl">
          <div class="text-center">
            <span class="mb-6 block text-[0.75rem] uppercase tracking-[0.3em] text-[#fde047] md:text-[0.875rem]">${escapeHTML(textOrFallback(state.data.contact.eyebrow, "CONTACT ME"))}</span>
            <div class="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">${renderPreviewAccentText(textOrFallback(state.data.contact.title, "프로젝트 문의는\n이메일로 남겨주세요."), state.data.contact.titleAccent, "text-[#fde047]")}</div>
            <div class="mx-auto mb-12 max-w-2xl text-lg text-[#cec6ad] opacity-80">${escapeHTML(textOrFallback(state.data.contact.description, "메일 주소와 응답 정책을 템플릿으로 남겨두었습니다."))}</div>

            <div class="group relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-tr from-[#fde047]/20 to-transparent p-1">
              <div class="rounded-xl border border-white/10 bg-[#1e1c12] px-10 py-12 md:px-20 md:py-16">
                <div class="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fde047] shadow-[0_0_40px_rgba(253,224,71,0.2)] mx-auto">
                  <span class="material-symbols-outlined text-4xl font-bold text-[#211b00]">${escapeHTML(textOrFallback(state.data.contact.primaryCard.icon, "mail"))}</span>
                </div>
                <span class="mb-3 block text-xs uppercase tracking-[0.2em] text-[#97917a]">${escapeHTML(textOrFallback(state.data.contact.primaryCard.label, "Email"))}</span>
                <strong class="text-3xl font-bold tracking-tighter text-white md:text-5xl">${escapeHTML(textOrFallback(state.data.contact.primaryCard.value, "your@email.com"))}</strong>
                ${state.data.contact.primaryCard.note ? `
                  <div class="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-[#fde047]/70">
                    <span class="material-symbols-outlined text-sm">info</span>
                    <span>${escapeHTML(state.data.contact.primaryCard.note)}</span>
                  </div>` : ""}
              </div>
            </div>

            <div class="mx-auto mt-16 grid max-w-3xl gap-6 opacity-80 ${detailGridClass}">
              ${details.length
                ? details.map((detail) => `
                    <div class="flex flex-col items-center">
                      <div class="mb-1 text-xs uppercase tracking-widest text-[#97917a]">${escapeHTML(textOrFallback(detail.label, "LABEL"))}</div>
                      <div class="font-medium text-[#e9e2d2]">${escapeHTML(textOrFallback(detail.value, "VALUE"))}</div>
                    </div>
                  `).join("")
                : '<div class="md:col-span-3 text-sm text-[#8b8577]">문의 상세 정보를 추가하면 이곳에 표시됩니다.</div>'}
            </div>
          </div>
        </div>
      </div>

      ${state.data.freeContent
        ? `<section class="px-6 pb-10 md:px-8">
             <div class="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-[#1e1c12] p-8 text-center">
               <div class="preview-free-copy text-base leading-relaxed text-[#cec6ad] md:text-lg">${escapeWithBreaks(state.data.freeContent)}</div>
             </div>
           </section>`
        : ""}

      ${footerEnabled
        ? `<footer class="w-full px-6 py-16 md:px-8 md:py-20">
             <div class="mx-auto flex max-w-screen-2xl flex-col items-center gap-10 border-t border-white/10 pt-12 text-center">
               <div class="text-3xl font-black uppercase tracking-tighter text-white md:text-4xl">${escapeHTML(textOrFallback(state.data.site.footer.title, "STUDIO YOUR-NAME"))}</div>
               ${state.data.site.footer.linksEnabled === false
                 ? ""
                 : `<div class="flex flex-wrap items-center justify-center gap-4">
                      ${renderPreviewFooterLinks()}
                    </div>`}
               <div class="text-[0.6875rem] uppercase tracking-[0.15em] text-[#97917a] opacity-60">${escapeHTML(textOrFallback(state.data.site.footer.copy, "© 2026 STUDIO YOUR-NAME. 모든 권리 보유."))}</div>
             </div>
           </footer>`
        : `<div class="px-6 pb-12 md:px-8">${previewHiddenBlock("푸터가 꺼져 있습니다.")}</div>`}
    </section>
  `;
}

function buildJsonOverviewPreview() {
  return `
    <div class="grid gap-4">
      ${buildBrandPreview()}
      ${buildHeroPreview()}
      ${buildProjectsPreview()}
      ${buildStatsPreview()}
      ${buildWorksPreview()}
      ${buildPricingPreview()}
      ${buildProcessPreview()}
      ${buildContactFooterPreview()}
    </div>
  `;
}

function buildLivePreviewMarkup() {
  switch (state.activeTab) {
    case "brand":
      return buildBrandPreview();
    case "hero":
    case "hero-panels":
      return buildHeroPreview();
    case "projects":
      return buildProjectsPreview();
    case "works":
      return buildWorksPreview();
    case "stats-process":
      return buildStatsProcessPreview();
    case "pricing":
      return buildPricingPreview();
    case "contact-footer":
      return buildContactFooterPreview();
    case "json":
      return buildJsonOverviewPreview();
    default:
      return buildBrandPreview();
  }
}

function renderLivePreview() {
  mountLivePreview();
  const config = previewConfigForTab();
  $("#live-preview-title").textContent = config.title;
  $("#live-preview-description").textContent = config.description;
  $("#live-preview-path").textContent = config.pathText;
  const openLink = $("#preview-open-page");
  if (openLink) openLink.href = config.openHref;
  const surface = $("#live-preview-surface");
  if (surface) surface.innerHTML = buildLivePreviewMarkup();
}

function getByPath(path) {
  return path.reduce((accumulator, key) => (accumulator == null ? "" : accumulator[key]), state.data) ?? "";
}

function setByPath(path, value) {
  let target = state.data;
  path.slice(0, -1).forEach((key) => {
    if (!target[key] || typeof target[key] !== "object") target[key] = {};
    target = target[key];
  });
  target[path[path.length - 1]] = value;
}

function renderDirectInputs() {
  Object.entries(DIRECT_BINDINGS).forEach(([id, path]) => {
    const input = document.getElementById(id);
    if (!input) return;
    input.value = getByPath(path);
  });
}

function renderCheckboxInputs() {
  Object.entries(CHECKBOX_BINDINGS).forEach(([id, path]) => {
    const input = document.getElementById(id);
    if (!input) return;
    input.checked = Boolean(getByPath(path));
  });
}

function renderSummary() {
  $("#summary-nav-links").textContent = String(state.data.site.nav.links.length);
  $("#summary-projects").textContent = String(state.data.projects.cards.length);
  $("#summary-works").textContent = String(state.data.works.videos.length);
  $("#summary-plans").textContent = String(state.data.pricing.plans.length);
  $("#summary-steps").textContent = String(state.data.pricing.processSteps.length);
  const repo = normalizeGitHubRepo(state.data.site.githubRepo) || "-";
  $("#summary-footer").textContent = `${state.data.site.footer.links.length} / ${repo}`;
}

function rowActions(listKey, index, deleteLabel = "삭제") {
  return `
    <div class="inline-row-actions">
      <button type="button" data-move-list="${escapeHTML(listKey)}" data-index="${index}" data-direction="-1">위로</button>
      <button type="button" data-move-list="${escapeHTML(listKey)}" data-index="${index}" data-direction="1">아래로</button>
      <button class="danger-action" type="button" data-delete-list="${escapeHTML(listKey)}" data-index="${index}">${escapeHTML(deleteLabel)}</button>
    </div>
  `;
}

function moveOnlyActions(listKey, index) {
  return `
    <div class="inline-row-actions">
      <button type="button" data-move-list="${escapeHTML(listKey)}" data-index="${index}" data-direction="-1">위로</button>
      <button type="button" data-move-list="${escapeHTML(listKey)}" data-index="${index}" data-direction="1">아래로</button>
    </div>
  `;
}

function renderNavLinkList() {
  const list = $("#nav-link-list");
  if (!list) return;
  if (!state.data.site.nav.links.length) {
    list.innerHTML = '<div class="empty-state slim">등록된 내비 링크가 없습니다.</div>';
    return;
  }
  list.innerHTML = state.data.site.nav.links.map((link, index) => `
    <article class="editor-row three-col" data-nav-index="${index}">
      <label class="field">
        <span>라벨</span>
        <input type="text" value="${escapeHTML(link.label)}" data-nav-field="label">
      </label>
      <label class="field">
        <span>링크</span>
        <input type="text" value="${escapeHTML(link.href)}" data-nav-field="href">
      </label>
      ${rowActions("nav", index)}
    </article>
  `).join("");
}

function renderHeroActionList() {
  const list = $("#hero-action-list");
  if (!list) return;
  if (!state.data.hero.actions.length) {
    list.innerHTML = '<div class="empty-state slim">등록된 히어로 액션이 없습니다.</div>';
    return;
  }
  list.innerHTML = state.data.hero.actions.map((action, index) => `
    <article class="editor-row four-col" data-hero-action-index="${index}">
      <label class="field">
        <span>버튼 스타일</span>
        <select data-hero-action-field="variant">
          <option value="primary" ${action.variant === "primary" ? "selected" : ""}>Primary</option>
          <option value="ghost" ${action.variant === "ghost" ? "selected" : ""}>Ghost</option>
        </select>
      </label>
      <label class="field">
        <span>라벨</span>
        <input type="text" value="${escapeHTML(action.label)}" data-hero-action-field="label">
      </label>
      <label class="field">
        <span>링크</span>
        <input type="text" value="${escapeHTML(action.href)}" data-hero-action-field="href">
      </label>
      ${rowActions("hero-actions", index)}
    </article>
  `).join("");
}

function syncHeroCareerModeState() {
  const mode = normalizeHeroCareerMode(state.data.hero.infoPanels?.career?.mode);
  const select = $("#hero-career-mode");
  if (select) select.value = mode;

  [
    ["structured", "#hero-career-structured-group"],
    ["simple", "#hero-career-simple-group"],
    ["freeform", "#hero-career-freeform-group"],
  ].forEach(([groupMode, selector]) => {
    const group = $(selector);
    if (!group) return;
    const isActive = groupMode === mode;
    group.classList.toggle("is-active", isActive);
    group.hidden = !isActive;
  });
}

function syncHeroInfoLayoutState() {
  const select = $("#hero-info-layout-preset");
  if (select) {
    select.value = normalizeHeroInfoLayoutPreset(state.data.hero.infoPanels?.layoutPreset);
  }
}

function renderHeroCareerStructuredList() {
  const list = $("#hero-career-structured-list");
  if (!list) return;
  const items = state.data.hero.infoPanels?.career?.structuredItems || [];
  if (!items.length) {
    list.innerHTML = '<div class="empty-state slim">등록된 구조형 경력이 없습니다.</div>';
    return;
  }

  list.innerHTML = items.map((item, index) => `
    <article class="editor-row" data-career-structured-index="${index}">
      <div class="section-row-head">
        <h3>항목 ${index + 1}</h3>
        ${rowActions("career-structured", index)}
      </div>
      <div class="form-grid">
        <label class="field">
          <span>제목</span>
          <input type="text" value="${escapeHTML(item.title)}" data-career-structured-field="title">
        </label>
        <label class="field">
          <span>기간</span>
          <input type="text" value="${escapeHTML(item.period)}" data-career-structured-field="period" placeholder="2024.01 - 2025.03">
        </label>
        <label class="field span-2">
          <span>설명</span>
          <textarea rows="4" data-career-structured-field="description">${escapeHTML(item.description)}</textarea>
        </label>
      </div>
    </article>
  `).join("");
}

function renderHeroCareerSimpleList() {
  const list = $("#hero-career-simple-list");
  if (!list) return;
  const items = state.data.hero.infoPanels?.career?.simpleItems || [];
  if (!items.length) {
    list.innerHTML = '<div class="empty-state slim">등록된 간단형 경력이 없습니다.</div>';
    return;
  }

  list.innerHTML = items.map((item, index) => `
    <article class="editor-row three-col" data-career-simple-index="${index}">
      <label class="field">
        <span>문장</span>
        <input type="text" value="${escapeHTML(item.text)}" data-career-simple-field="text">
      </label>
      <label class="field">
        <span>기간</span>
        <input type="text" value="${escapeHTML(item.period)}" data-career-simple-field="period" placeholder="2024.01~">
      </label>
      ${rowActions("career-simple", index)}
    </article>
  `).join("");
}

function renderHeroResourceEditorList(listSelector, listKey, items, emptyMessage) {
  const list = $(listSelector);
  if (!list) return;
  if (!items.length) {
    list.innerHTML = `<div class="empty-state slim">${escapeHTML(emptyMessage)}</div>`;
    return;
  }

  list.innerHTML = items.map((item, index) => `
    <article class="editor-row hero-logo-row" data-${listKey}-index="${index}">
      <label class="field">
        <span>이름</span>
        <input type="text" value="${escapeHTML(item.name)}" data-${listKey}-field="name">
      </label>
      <label class="field">
        <span>로고 URL</span>
        <input type="text" value="${escapeHTML(item.logoUrl)}" data-${listKey}-field="logoUrl" placeholder="https://...">
      </label>
      <label class="field">
        <span>이미지 설명</span>
        <input type="text" value="${escapeHTML(item.logoAlt)}" data-${listKey}-field="logoAlt" placeholder="logo alt text">
      </label>
      ${rowActions(listKey, index)}
    </article>
  `).join("");
}

function renderHeroToolPresetButtons() {
  const container = $("#hero-tool-presets");
  if (!container) return;
  container.innerHTML = Object.entries(HERO_TOOL_PRESETS).map(([key, preset]) => `
    <button type="button" data-hero-tool-preset="${escapeHTML(key)}">${escapeHTML(preset.name)}</button>
  `).join("");
}

function renderHeroBgmPresetButtons() {
  const container = $("#hero-bgm-presets");
  if (!container) return;
  container.innerHTML = Object.entries(HERO_BGM_PRESETS).map(([key, preset]) => `
    <button type="button" data-hero-bgm-preset="${escapeHTML(key)}">${escapeHTML(preset.name)}</button>
  `).join("");
}

function renderHeroInfoEditors() {
  syncHeroInfoLayoutState();
  syncHeroCareerModeState();
  renderHeroToolPresetButtons();
  renderHeroBgmPresetButtons();
  renderHeroCareerStructuredList();
  renderHeroCareerSimpleList();
  renderHeroResourceEditorList(
    "#hero-tools-list",
    "hero-tools",
    state.data.hero.infoPanels?.tools?.items || [],
    "등록된 툴이 없습니다.",
  );
  renderHeroResourceEditorList(
    "#hero-bgm-list",
    "hero-bgm",
    state.data.hero.infoPanels?.bgm?.items || [],
    "등록된 BGM 툴이 없습니다.",
  );
}

function findHeroResourceIndexByName(items, name) {
  const normalizedName = String(name || "").trim().toLowerCase();
  if (!normalizedName) return -1;
  return (Array.isArray(items) ? items : []).findIndex((item) => String(item?.name || "").trim().toLowerCase() === normalizedName);
}

function findHeroToolIndexByName(name) {
  return findHeroResourceIndexByName(state.data.hero.infoPanels?.tools?.items || [], name);
}

function findHeroBgmIndexByName(name) {
  return findHeroResourceIndexByName(state.data.hero.infoPanels?.bgm?.items || [], name);
}

function addHeroToolPreset(presetKey) {
  const preset = HERO_TOOL_PRESETS[presetKey];
  if (!preset) {
    setStatus("알 수 없는 기본 툴 프리셋입니다.", "error");
    return;
  }

  if (findHeroToolIndexByName(preset.name) !== -1) {
    setStatus(`${preset.name}는 이미 등록되어 있습니다.`, "info");
    return;
  }

  state.data.hero.infoPanels.tools.items.push({
    name: preset.name,
    logoUrl: preset.logoUrl,
    logoAlt: preset.logoAlt,
  });
  applyDataChange(`${preset.name} 기본 툴을 추가했습니다.`);
}

function addHeroBgmPreset(presetKey) {
  const preset = HERO_BGM_PRESETS[presetKey];
  if (!preset) {
    setStatus("알 수 없는 BGM 툴 프리셋입니다.", "error");
    return;
  }

  if (findHeroBgmIndexByName(preset.name) !== -1) {
    setStatus(`${preset.name}는 이미 등록되어 있습니다.`, "info");
    return;
  }

  state.data.hero.infoPanels.bgm.items.push({
    name: preset.name,
    logoUrl: preset.logoUrl,
    logoAlt: preset.logoAlt,
  });
  applyDataChange(`${preset.name} BGM 툴을 추가했습니다.`);
}

function renderProjectCardList() {
  const list = $("#project-card-list");
  if (!list) return;
  if (!state.data.projects.cards.length) {
    list.innerHTML = '<div class="empty-state">등록된 프로젝트 카드가 없습니다.</div>';
    return;
  }
  list.innerHTML = state.data.projects.cards.map((card, index) => `
    <article class="editor-row" data-project-index="${index}">
      <div class="section-row-head">
        <h3>카드 ${index + 1}</h3>
        ${rowActions("projects", index)}
      </div>
      <div class="form-grid">
        <label class="field">
          <span>레이아웃</span>
          <select data-project-field="layout">
            <option value="featured" ${card.layout === "featured" ? "selected" : ""}>featured</option>
            <option value="secondary" ${card.layout === "secondary" ? "selected" : ""}>secondary</option>
            <option value="small" ${card.layout === "small" ? "selected" : ""}>small</option>
          </select>
        </label>
        <label class="field">
          <span>태그</span>
          <input type="text" value="${escapeHTML(card.tag)}" data-project-field="tag">
        </label>
        <label class="field">
          <span>길이</span>
          <input type="text" value="${escapeHTML(card.duration)}" data-project-field="duration">
        </label>
        <label class="field">
          <span>제목</span>
          <input type="text" value="${escapeHTML(card.title)}" data-project-field="title">
        </label>
        <label class="field span-2">
          <span>설명</span>
          <textarea rows="4" data-project-field="description">${escapeHTML(card.description)}</textarea>
        </label>
        <label class="field">
          <span>CTA 라벨</span>
          <input type="text" value="${escapeHTML(card.ctaLabel)}" data-project-field="ctaLabel">
        </label>
        <label class="field">
          <span>CTA 링크</span>
          <input type="text" value="${escapeHTML(card.href)}" data-project-field="href">
        </label>
      </div>
    </article>
  `).join("");
}

function renderWorksVideoList() {
  const list = $("#works-video-list");
  if (!list) return;
  const searchInput = $("#works-video-search");
  const filterInput = $("#works-video-filter");
  if (searchInput && searchInput.value !== state.search) searchInput.value = state.search;
  if (filterInput) filterInput.value = state.typeFilter;

  const categories = getOrderedWorksCategories();
  const keyword = state.search.trim().toLowerCase();
  const filtered = state.data.works.videos
    .map((video, index) => ({ video, index }))
    .filter(({ video }) => state.typeFilter === "all" || video.type === state.typeFilter)
    .filter(({ video }) => {
      if (!keyword) return true;
      return [video.title, video.category, video.id].some((value) => String(value || "").toLowerCase().includes(keyword));
    })
    .sort((a, b) => String(b.video.date || "").localeCompare(String(a.video.date || "")));

  if (!filtered.length) {
    list.innerHTML = '<div class="empty-state">표시할 영상이 없습니다.</div>';
    return;
  }

  list.innerHTML = filtered.map(({ video, index }) => {
    const selectedCategory = video.category && categories.includes(video.category) ? video.category : "__new__";
    const customCategory = selectedCategory === "__new__" ? video.category : "";
    return `
      <article class="video-card" data-works-video-index="${index}">
        <a class="video-thumb" href="${escapeHTML(videoHref(video))}" target="_blank" rel="noopener">
          <img src="${videoThumb(video.id)}" alt="" loading="lazy" referrerpolicy="no-referrer">
          <span class="type-badge type-${escapeHTML(video.type)}">${escapeHTML(video.type === "short" ? "숏폼" : "롱폼")}</span>
        </a>
        <div class="video-body">
          <label class="field">
            <span>제목</span>
            <input type="text" value="${escapeHTML(video.title)}" data-works-video-field="title">
          </label>
          <div class="card-grid">
            <label class="field">
              <span>날짜</span>
              <input type="date" value="${escapeHTML(video.date)}" data-works-video-field="date">
            </label>
            <label class="field">
              <span>타입</span>
              <select data-works-video-field="type">
                <option value="long" ${video.type === "long" ? "selected" : ""}>롱폼</option>
                <option value="short" ${video.type === "short" ? "selected" : ""}>숏폼</option>
              </select>
            </label>
          </div>
          <label class="field">
            <span>카테고리</span>
            <select data-works-video-category-select>
              <option value="__new__">새 카테고리 작성</option>
              ${categories.map((category) => `
                <option value="${escapeHTML(category)}" ${category === selectedCategory ? "selected" : ""}>
                  ${escapeHTML(category)}
                </option>
              `).join("")}
            </select>
          </label>
          <label class="field" ${selectedCategory !== "__new__" ? "hidden" : ""}>
            <span>새 카테고리 이름</span>
            <input type="text" value="${escapeHTML(customCategory)}" data-works-video-custom-category placeholder="처음 등록할 채널명">
          </label>
          <div class="video-card-footer">
            <span class="category-chip">${escapeHTML(video.category || "카테고리 미입력")}</span>
            <button class="danger-action" type="button" data-delete-works-video="${index}">삭제</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderWorksVideoForm() {
  renderWorksCategoryOptions();
  toggleWorksNewCategoryField();
  syncWorksVideoUrlFeedback({ skipMetadata: true });
}

function syncWorksCategoryOrderState() {
  const works = state.data.works || {};
  works.videos = normalizeWorksVideos(works.videos);
  works.displayMode = normalizeWorksDisplayMode(works.displayMode);
  works.gridColumns = normalizeWorksColumnCount(works.gridColumns, DEFAULT_DATA.works.gridColumns);
  works.categoryStackColumns = normalizeWorksColumnCount(works.categoryStackColumns, DEFAULT_DATA.works.categoryStackColumns);
  works.categoryStackTypeFilterEnabled = Boolean(works.categoryStackTypeFilterEnabled);
  works.categoryStackSingleColumnSize = normalizeWorksSingleColumnSize(works.categoryStackSingleColumnSize);
  works.categoryOrder = normalizeWorksCategoryOrder(works.categoryOrder, works.videos);
  works.categoryEntries = normalizeWorksCategoryEntries(works.categoryEntries, works.videos, works.categoryOrder);
  state.data.works = works;
}

function renderWorksDisplaySettings() {
  const works = state.data.works || DEFAULT_DATA.works;
  const displayMode = normalizeWorksDisplayMode(works.displayMode);
  const gridGroup = $("#works-grid-settings-group");
  const stackGroup = $("#works-category-stack-settings-group");
  const singleSizeField = $("#works-category-stack-single-column-size-field");
  const displayModeInput = $("#works-display-mode");
  const gridColumnsInput = $("#works-grid-columns");
  const stackColumnsInput = $("#works-category-stack-columns");
  const stackFilterInput = $("#works-category-stack-type-filter-enabled");
  const singleSizeInput = $("#works-category-stack-single-column-size");
  const isSingleColumn = normalizeWorksColumnCount(works.categoryStackColumns, DEFAULT_DATA.works.categoryStackColumns) === 1;

  if (displayModeInput) displayModeInput.value = displayMode;
  if (gridColumnsInput) gridColumnsInput.value = String(normalizeWorksColumnCount(works.gridColumns, DEFAULT_DATA.works.gridColumns));
  if (stackColumnsInput) stackColumnsInput.value = String(normalizeWorksColumnCount(works.categoryStackColumns, DEFAULT_DATA.works.categoryStackColumns));
  if (stackFilterInput) stackFilterInput.checked = works.categoryStackTypeFilterEnabled !== false;
  if (singleSizeInput) singleSizeInput.value = normalizeWorksSingleColumnSize(works.categoryStackSingleColumnSize);

  if (gridGroup) {
    gridGroup.hidden = displayMode !== "grid";
    gridGroup.classList.toggle("is-active", displayMode === "grid");
  }
  if (stackGroup) {
    stackGroup.hidden = displayMode !== "category-stack";
    stackGroup.classList.toggle("is-active", displayMode === "category-stack");
  }
  if (singleSizeField) {
    singleSizeField.hidden = displayMode !== "category-stack" || !isSingleColumn;
  }
}

function renderWorksCategoryOrderList() {
  const list = $("#works-category-order-list");
  if (!list) return;

  const entries = normalizeWorksCategoryEntries(
    state.data.works.categoryEntries,
    state.data.works.videos,
    state.data.works.categoryOrder,
  );

  if (!entries.length) {
    list.innerHTML = '<div class="empty-state slim">등록된 카테고리가 없습니다. 영상을 추가하면 자동으로 목록이 생성됩니다.</div>';
    return;
  }

  const counts = entries.reduce((accumulator, entry) => {
    accumulator[entry.category] = state.data.works.videos.filter((video) => video.category === entry.category).length;
    return accumulator;
  }, {});

  list.innerHTML = entries.map((entry, index) => `
    <article class="editor-row" data-works-category-entry-index="${index}">
      <div class="section-row-head">
        <div>
          <h3>${escapeHTML(entry.category)}</h3>
          <p class="field-note">현재 이 카테고리의 영상 ${escapeHTML(String(counts[entry.category] || 0))}개</p>
        </div>
        ${moveOnlyActions("works-category-order", index)}
      </div>
      <div class="form-grid">
        <label class="field">
          <span>기준 카테고리</span>
          <input type="text" value="${escapeHTML(entry.category)}" readonly>
        </label>
        <label class="field">
          <span>표시 제목</span>
          <input type="text" value="${escapeHTML(entry.title)}" data-works-category-entry-field="title" placeholder="비워두면 카테고리명을 그대로 사용합니다.">
        </label>
        <label class="field span-2">
          <span>보조 정보</span>
          <textarea rows="3" data-works-category-entry-field="meta" placeholder="예: 2024. 08. 30. ~ 2024. 10. 04.&#10;메인 편집자 / 외주 편집자">${escapeHTML(entry.meta)}</textarea>
        </label>
        <label class="field">
          <span>카테고리별 한 줄 개수</span>
          <select data-works-category-entry-field="columns">
            <option value="" ${entry.columns == null ? "selected" : ""}>공통 설정 사용</option>
            <option value="1" ${entry.columns === 1 ? "selected" : ""}>1개</option>
            <option value="2" ${entry.columns === 2 ? "selected" : ""}>2개</option>
            <option value="3" ${entry.columns === 3 ? "selected" : ""}>3개</option>
            <option value="4" ${entry.columns === 4 ? "selected" : ""}>4개</option>
            <option value="5" ${entry.columns === 5 ? "selected" : ""}>5개</option>
            <option value="6" ${entry.columns === 6 ? "selected" : ""}>6개</option>
            <option value="7" ${entry.columns === 7 ? "selected" : ""}>7개</option>
            <option value="8" ${entry.columns === 8 ? "selected" : ""}>8개</option>
          </select>
        </label>
        <label class="field">
          <span>카테고리별 1열 크기</span>
          <select data-works-category-entry-field="singleColumnSize">
            <option value="" ${!entry.singleColumnSize ? "selected" : ""}>공통 설정 사용</option>
            <option value="large" ${entry.singleColumnSize === "large" ? "selected" : ""}>large</option>
            <option value="medium" ${entry.singleColumnSize === "medium" ? "selected" : ""}>medium</option>
            <option value="small" ${entry.singleColumnSize === "small" ? "selected" : ""}>small</option>
          </select>
        </label>
      </div>
    </article>
  `).join("");
}

function renderStatsItemList() {
  const list = $("#stats-item-list");
  if (!list) return;
  if (!state.data.stats.items.length) {
    list.innerHTML = '<div class="empty-state slim">등록된 통계가 없습니다.</div>';
    return;
  }
  list.innerHTML = state.data.stats.items.map((item, index) => `
    <article class="editor-row three-col" data-stat-index="${index}">
      <label class="field">
        <span>값</span>
        <input type="text" value="${escapeHTML(item.value)}" data-stat-field="value">
      </label>
      <label class="field">
        <span>라벨</span>
        <input type="text" value="${escapeHTML(item.label)}" data-stat-field="label">
      </label>
      ${rowActions("stats", index)}
    </article>
  `).join("");
}

function renderProcessStepList() {
  const list = $("#process-step-list");
  if (!list) return;
  if (!state.data.pricing.processSteps.length) {
    list.innerHTML = '<div class="empty-state slim">등록된 프로세스 단계가 없습니다.</div>';
    return;
  }
  list.innerHTML = state.data.pricing.processSteps.map((step, index) => `
    <article class="editor-row" data-process-index="${index}">
      <div class="section-row-head">
        <h3>단계 ${index + 1}</h3>
        ${rowActions("process", index)}
      </div>
      <div class="form-grid">
        <label class="field">
          <span>번호</span>
          <input type="text" value="${escapeHTML(step.number)}" data-process-field="number">
        </label>
        <label class="field">
          <span>제목</span>
          <input type="text" value="${escapeHTML(step.title)}" data-process-field="title">
        </label>
        <label class="field span-2">
          <span>설명</span>
          <textarea rows="4" data-process-field="description">${escapeHTML(step.description)}</textarea>
        </label>
      </div>
    </article>
  `).join("");
}

function renderPricingPlanList() {
  const list = $("#pricing-plan-list");
  if (!list) return;
  if (!state.data.pricing.plans.length) {
    list.innerHTML = '<div class="empty-state">등록된 가격 플랜이 없습니다.</div>';
    return;
  }
  list.innerHTML = state.data.pricing.plans.map((plan, index) => `
    <article class="plan-card" data-plan-index="${index}">
      <div class="plan-card-head">
        <strong>${escapeHTML(plan.title || `플랜 ${index + 1}`)}</strong>
        ${rowActions("plans", index)}
      </div>

      <div class="form-grid">
        <label class="field">
          <span>Slug</span>
          <input type="text" value="${escapeHTML(plan.slug)}" data-plan-field="slug">
        </label>
        <label class="field">
          <span>배지</span>
          <input type="text" value="${escapeHTML(plan.badge)}" data-plan-field="badge">
        </label>
        <label class="field">
          <span>아이콘</span>
          <input type="text" value="${escapeHTML(plan.icon)}" data-plan-field="icon">
        </label>
        <label class="field">
          <span>가격</span>
          <input type="text" value="${escapeHTML(plan.price)}" data-plan-field="price">
        </label>
        <label class="field">
          <span>카드 디자인</span>
          <select data-plan-field="design">
            <option value="shortform" ${normalizePricingPlanDesign(plan.design, "shortform") === "shortform" ? "selected" : ""}>숏폼 스타일</option>
            <option value="longform" ${normalizePricingPlanDesign(plan.design, "shortform") === "longform" ? "selected" : ""}>롱폼 스타일</option>
          </select>
        </label>
        <label class="field span-2">
          <span>제목</span>
          <input type="text" value="${escapeHTML(plan.title)}" data-plan-field="title">
        </label>
        <label class="field span-2">
          <span>설명</span>
          <textarea rows="3" data-plan-field="description">${escapeHTML(plan.description)}</textarea>
        </label>
        <label class="field">
          <span>가격 단위</span>
          <input type="text" value="${escapeHTML(plan.priceUnit)}" data-plan-field="priceUnit">
        </label>
        <label class="field">
          <span>CTA 라벨</span>
          <input type="text" value="${escapeHTML(plan.cta.label)}" data-plan-cta-field="label">
        </label>
        <label class="field span-2">
          <span>CTA 링크</span>
          <input type="text" value="${escapeHTML(plan.cta.href)}" data-plan-cta-field="href">
        </label>
      </div>

      <div class="section-row-head">
        <h3>포함 항목</h3>
        <button type="button" data-add-feature="${index}">항목 추가</button>
      </div>
      <div class="feature-list">
        ${(plan.features || []).length
          ? plan.features.map((feature, featureIndex) => `
              <div class="feature-row" data-feature-index="${featureIndex}">
                <label class="field">
                  <span>항목</span>
                  <input type="text" value="${escapeHTML(feature)}" data-plan-feature-field="value">
                </label>
                <div class="inline-row-actions">
                  <button type="button" data-move-feature="${featureIndex}" data-direction="-1">위로</button>
                  <button type="button" data-move-feature="${featureIndex}" data-direction="1">아래로</button>
                  <button class="danger-action" type="button" data-delete-feature="${featureIndex}">삭제</button>
                </div>
              </div>
            `).join("")
          : '<div class="empty-state slim">등록된 포함 항목이 없습니다.</div>'}
      </div>
    </article>
  `).join("");
}

function renderCustomWorkList() {
  const list = $("#custom-work-list");
  if (!list) return;
  const items = state.data.pricing.customWorks || [];

  if (!items.length) {
    list.innerHTML = '<div class="empty-state">등록된 커스텀 작업 블록이 없습니다.</div>';
    return;
  }

  list.innerHTML = items.map((block, index) => `
    <article class="editor-row" data-custom-work-index="${index}">
      <div class="section-row-head">
        <div>
          <h3>블록 ${index + 1}</h3>
          <p class="field-note">${index % 2 === 0 ? "공개 페이지에서 이미지가 오른쪽에 배치됩니다." : "공개 페이지에서 이미지가 왼쪽에 배치됩니다."}</p>
        </div>
        ${rowActions("custom-works", index)}
      </div>
      <div class="form-grid">
        <label class="field">
          <span>이미지 Eyebrow</span>
          <input type="text" value="${escapeHTML(block.eyebrow)}" data-custom-work-field="eyebrow">
        </label>
        <label class="field">
          <span>강조 문구</span>
          <input type="text" value="${escapeHTML(block.highlight)}" data-custom-work-field="highlight">
        </label>
        <label class="field span-2">
          <span>제목</span>
          <input type="text" value="${escapeHTML(block.title)}" data-custom-work-field="title">
        </label>
        <label class="field span-2">
          <span>설명</span>
          <textarea rows="4" data-custom-work-field="description">${escapeHTML(block.description)}</textarea>
        </label>
        <label class="field span-2">
          <span>이미지 캡션</span>
          <input type="text" value="${escapeHTML(block.caption)}" data-custom-work-field="caption">
        </label>
        <label class="field span-2">
          <span>이미지 URL</span>
          <input type="text" value="${escapeHTML(block.imageUrl)}" data-custom-work-field="imageUrl">
        </label>
        <label class="field span-2">
          <span>이미지 대체 텍스트</span>
          <input type="text" value="${escapeHTML(block.imageAlt)}" data-custom-work-field="imageAlt">
        </label>
      </div>
    </article>
  `).join("");
}

function renderContactDetailList() {
  const list = $("#contact-detail-list");
  if (!list) return;
  if (!state.data.contact.details.length) {
    list.innerHTML = '<div class="empty-state slim">등록된 문의 상세 정보가 없습니다.</div>';
    return;
  }
  list.innerHTML = state.data.contact.details.map((detail, index) => `
    <article class="editor-row three-col" data-contact-detail-index="${index}">
      <label class="field">
        <span>라벨</span>
        <input type="text" value="${escapeHTML(detail.label)}" data-contact-detail-field="label">
      </label>
      <label class="field">
        <span>값</span>
        <input type="text" value="${escapeHTML(detail.value)}" data-contact-detail-field="value">
      </label>
      ${rowActions("contact-details", index)}
    </article>
  `).join("");
}

function renderFooterLinkList() {
  const list = $("#footer-link-list");
  if (!list) return;
  if (!state.data.site.footer.links.length) {
    list.innerHTML = '<div class="empty-state slim">등록된 푸터 링크가 없습니다.</div>';
    return;
  }
  list.innerHTML = state.data.site.footer.links.map((link, index) => `
    <article class="editor-row three-col" data-footer-link-index="${index}">
      <label class="field">
        <span>라벨</span>
        <input type="text" value="${escapeHTML(link.label)}" data-footer-link-field="label">
      </label>
      <label class="field">
        <span>URL</span>
        <input type="text" value="${escapeHTML(link.url)}" data-footer-link-field="url">
      </label>
      ${rowActions("footer-links", index)}
    </article>
  `).join("");
}

function renderAll() {
  syncWorksCategoryOrderState();
  renderDirectInputs();
  renderCheckboxInputs();
  renderSummary();
  renderNavLinkList();
  renderHeroActionList();
  renderHeroInfoEditors();
  renderProjectCardList();
  renderWorksDisplaySettings();
  renderWorksCategoryOrderList();
  renderWorksVideoForm();
  renderWorksVideoList();
  renderStatsItemList();
  renderProcessStepList();
  renderPricingPlanList();
  renderCustomWorkList();
  renderContactDetailList();
  renderFooterLinkList();
  refreshJsonOutput();
  renderLivePreview();
}

function switchTab(tab) {
  state.activeTab = tab;
  $$(".tab-button").forEach((button) => {
    const isActive = button.dataset.tab === tab;
    button.classList.toggle("on", isActive);
    if (isActive) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });
  $$(".tab-panel").forEach((panel) => panel.classList.toggle("on", panel.dataset.panel === tab));
  mountLivePreview();
  renderLivePreview();
  if (tab === "json") refreshJsonOutput();
}

function setFloatingActionsOpen(isOpen) {
  const actions = $(".floating-actions");
  const toggle = $("#floating-actions-toggle");
  const extraActions = $("#floating-extra-actions");
  if (!actions || !toggle || !extraActions) return;

  actions.classList.toggle("is-open", isOpen);
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.setAttribute("aria-label", isOpen ? "JSON 작업 접기" : "JSON 작업 더 보기");
  extraActions.setAttribute("aria-hidden", String(!isOpen));
  extraActions.querySelectorAll("button").forEach((button) => {
    button.tabIndex = isOpen ? 0 : -1;
  });
}

function applyMinorChange(message = "변경 사항이 반영되었습니다.") {
  syncWorksCategoryOrderState();
  renderSummary();
  renderWorksDisplaySettings();
  renderWorksCategoryOrderList();
  refreshJsonOutput();
  renderLivePreview();
  setStatus(message, "success");
}

function applyDataChange(message = "변경 사항이 반영되었습니다.") {
  syncWorksCategoryOrderState();
  renderAll();
  setStatus(message, "success");
}

function moveArrayItem(items, fromIndex, direction) {
  const toIndex = fromIndex + direction;
  if (
    !Array.isArray(items) ||
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= items.length ||
    toIndex >= items.length
  ) {
    return false;
  }
  const [item] = items.splice(fromIndex, 1);
  items.splice(toIndex, 0, item);
  return true;
}

function listByKey(listKey) {
  switch (listKey) {
    case "nav":
      return state.data.site.nav.links;
    case "hero-actions":
      return state.data.hero.actions;
    case "career-structured":
      return state.data.hero.infoPanels.career.structuredItems;
    case "career-simple":
      return state.data.hero.infoPanels.career.simpleItems;
    case "hero-tools":
      return state.data.hero.infoPanels.tools.items;
    case "hero-bgm":
      return state.data.hero.infoPanels.bgm.items;
    case "projects":
      return state.data.projects.cards;
    case "works-videos":
      return state.data.works.videos;
    case "works-category-order":
      return state.data.works.categoryOrder;
    case "stats":
      return state.data.stats.items;
    case "process":
      return state.data.pricing.processSteps;
    case "plans":
      return state.data.pricing.plans;
    case "custom-works":
      return state.data.pricing.customWorks;
    case "contact-details":
      return state.data.contact.details;
    case "footer-links":
      return state.data.site.footer.links;
    default:
      return null;
  }
}

async function loadJson(confirmReload = false) {
  if (confirmReload && !window.confirm("현재 편집 중인 내용을 버리고 초기 JSON을 다시 불러올까요?")) {
    return;
  }

  try {
    setStatus("데이터를 불러오는 중입니다...", "info");
    const response = await fetch(jsonPath, { cache: "no-store" });
    if (!response.ok) throw new Error(`로드 실패: ${response.status}`);
    const text = await response.text();
    const parsed = text.trim() ? JSON.parse(text) : {};
    state.data = normalizeData(parsed);
    renderAll();
    setStatus("site.json을 불러왔습니다.", "success");
  } catch (error) {
    state.data = normalizeData({});
    renderAll();
    setStatus(`불러오기 실패: ${error.message}. 기본 구조로 시작합니다.`, "error");
  }
}

async function openGitHubJson() {
  const githubUrl = resolveGitHubSiteJsonUrl();
  if (!githubUrl) {
    setStatus("GitHub Pages 배포 주소에서 열었을 때만 GitHub의 data/site.json 페이지로 이동할 수 있습니다.", "error");
    return;
  }

  const opened = window.open(githubUrl, "_blank", "noopener");
  setStatus(
    opened
      ? "GitHub의 data/site.json 페이지를 새 탭으로 열었습니다."
      : "팝업 차단으로 GitHub 페이지를 열지 못했습니다.",
    opened ? "success" : "error"
  );
}

async function copyAllJson() {
  const json = buildJson();
  const githubUrl = resolveGitHubSiteJsonUrl();
  const githubTab = githubUrl ? window.open("", "_blank") : null;

  try {
    await navigator.clipboard.writeText(json);
    if (githubUrl) {
      if (githubTab) {
        githubTab.opener = null;
        githubTab.location.href = githubUrl;
        setStatus("JSON을 복사하고 GitHub 파일 페이지를 새 탭으로 열었습니다.", "success");
      } else {
        const opened = window.open(githubUrl, "_blank", "noopener");
        setStatus(
          opened
            ? "JSON을 복사하고 GitHub 파일 페이지를 새 탭으로 열었습니다."
            : "JSON은 복사했지만 팝업 차단으로 GitHub 페이지를 열지 못했습니다.",
          opened ? "success" : "error"
        );
      }
    } else {
      setStatus("JSON을 복사했습니다. GitHub 이동은 GitHub Pages 배포 주소에서만 동작합니다.", "success");
    }
  } catch (error) {
    if (githubTab && !githubTab.closed) githubTab.close();
    const output = $("#json-output");
    output?.focus();
    output?.select();
    setStatus("클립보드 복사가 막혔습니다. JSON 탭에서 직접 선택해 복사하세요.", "error");
  }
}

function downloadJsonFile() {
  try {
    const blob = new Blob([buildJson()], { type: "application/json;charset=utf-8" });
    const downloadUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.download = "site.json";
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
    setStatus("site.json 파일을 다운로드했습니다.", "success");
  } catch (error) {
    setStatus(`다운로드 실패: ${error.message}`, "error");
  }
}

function validateJson() {
  try {
    JSON.parse(buildJson());
    setStatus("JSON 형식이 올바릅니다.", "success");
  } catch (error) {
    setStatus(`JSON 오류: ${error.message}`, "error");
  }
}

function bindDirectInputs() {
  Object.entries(DIRECT_BINDINGS).forEach(([id, path]) => {
    const input = document.getElementById(id);
    if (!input) return;
    input.addEventListener("input", (event) => {
      setByPath(path, event.target.value);
      applyMinorChange("변경 사항이 반영되었습니다.");
    });
  });
}

function bindCheckboxInputs() {
  Object.entries(CHECKBOX_BINDINGS).forEach(([id, path]) => {
    const input = document.getElementById(id);
    if (!input) return;
    input.addEventListener("change", (event) => {
      setByPath(path, event.target.checked);
      applyMinorChange("섹션 표시 설정이 반영되었습니다.");
    });
  });
}

function bindEvents() {
  bindDirectInputs();
  bindCheckboxInputs();

  $$(".tab-button").forEach((button) => {
    button.addEventListener("click", () => switchTab(button.dataset.tab));
  });

  $("#reload-json")?.addEventListener("click", () => loadJson(true));
  $("#validate-json")?.addEventListener("click", validateJson);
  $("#copy-all-json")?.addEventListener("click", copyAllJson);
  $("#copy-json-panel")?.addEventListener("click", copyAllJson);
  $("#download-json-file")?.addEventListener("click", downloadJsonFile);
  $("#open-github-json")?.addEventListener("click", openGitHubJson);

  $("#floating-actions-toggle")?.addEventListener("click", () => {
    setFloatingActionsOpen(!$(".floating-actions")?.classList.contains("is-open"));
  });
  setFloatingActionsOpen(false);

  $("#add-nav-link")?.addEventListener("click", () => {
    state.data.site.nav.links.push({ label: "", href: "" });
    applyDataChange("내비 링크를 추가했습니다.");
  });

  $("#nav-link-list")?.addEventListener("input", (event) => {
    const row = event.target.closest("[data-nav-index]");
    const field = event.target.dataset.navField;
    if (!row || !field) return;
    const index = Number(row.dataset.navIndex);
    state.data.site.nav.links[index][field] = event.target.value;
    applyMinorChange("내비 링크가 반영되었습니다.");
  });

  $("#add-hero-action")?.addEventListener("click", () => {
    state.data.hero.actions.push({ label: "", href: "", variant: "primary" });
    applyDataChange("히어로 액션을 추가했습니다.");
  });

  $("#hero-action-list")?.addEventListener("input", (event) => {
    const row = event.target.closest("[data-hero-action-index]");
    const field = event.target.dataset.heroActionField;
    if (!row || !field) return;
    const index = Number(row.dataset.heroActionIndex);
    state.data.hero.actions[index][field] = event.target.value;
    applyMinorChange("히어로 액션이 반영되었습니다.");
  });

  $("#hero-career-mode")?.addEventListener("change", (event) => {
    state.data.hero.infoPanels.career.mode = normalizeHeroCareerMode(event.target.value);
    applyDataChange("경력사항 공개 형식이 반영되었습니다.");
  });

  $("#hero-info-layout-preset")?.addEventListener("change", (event) => {
    state.data.hero.infoPanels.layoutPreset = normalizeHeroInfoLayoutPreset(event.target.value);
    applyDataChange("히어로 3분할 비율이 반영되었습니다.");
  });

  $("#add-career-structured")?.addEventListener("click", () => {
    state.data.hero.infoPanels.career.structuredItems.push({ title: "", period: "", description: "" });
    applyDataChange("구조형 경력 항목을 추가했습니다.");
  });

  $("#hero-career-structured-list")?.addEventListener("input", (event) => {
    const row = event.target.closest("[data-career-structured-index]");
    const field = event.target.dataset.careerStructuredField;
    if (!row || !field) return;
    const index = Number(row.dataset.careerStructuredIndex);
    state.data.hero.infoPanels.career.structuredItems[index][field] = event.target.value;
    applyMinorChange("구조형 경력 항목이 반영되었습니다.");
  });

  $("#add-career-simple")?.addEventListener("click", () => {
    state.data.hero.infoPanels.career.simpleItems.push({ text: "", period: "" });
    applyDataChange("간단형 경력 항목을 추가했습니다.");
  });

  $("#hero-career-simple-list")?.addEventListener("input", (event) => {
    const row = event.target.closest("[data-career-simple-index]");
    const field = event.target.dataset.careerSimpleField;
    if (!row || !field) return;
    const index = Number(row.dataset.careerSimpleIndex);
    state.data.hero.infoPanels.career.simpleItems[index][field] = event.target.value;
    applyMinorChange("간단형 경력 항목이 반영되었습니다.");
  });

  $("#add-hero-tool")?.addEventListener("click", () => {
    state.data.hero.infoPanels.tools.items.push({ name: "", logoUrl: "", logoAlt: "" });
    applyDataChange("사용 가능한 툴 항목을 추가했습니다.");
  });

  $("#hero-tool-presets")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-hero-tool-preset]");
    if (!button) return;
    addHeroToolPreset(button.dataset.heroToolPreset);
  });

  $("#hero-bgm-presets")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-hero-bgm-preset]");
    if (!button) return;
    addHeroBgmPreset(button.dataset.heroBgmPreset);
  });

  $("#hero-tools-list")?.addEventListener("input", (event) => {
    const row = event.target.closest("[data-hero-tools-index]");
    const field = event.target.dataset.heroToolsField;
    if (!row || !field) return;
    const index = Number(row.dataset.heroToolsIndex);
    state.data.hero.infoPanels.tools.items[index][field] = event.target.value;
    applyMinorChange("사용 가능한 툴 항목이 반영되었습니다.");
  });

  $("#add-hero-bgm")?.addEventListener("click", () => {
    state.data.hero.infoPanels.bgm.items.push({ name: "", logoUrl: "", logoAlt: "" });
    applyDataChange("BGM 사용 툴 항목을 추가했습니다.");
  });

  $("#hero-bgm-list")?.addEventListener("input", (event) => {
    const row = event.target.closest("[data-hero-bgm-index]");
    const field = event.target.dataset.heroBgmField;
    if (!row || !field) return;
    const index = Number(row.dataset.heroBgmIndex);
    state.data.hero.infoPanels.bgm.items[index][field] = event.target.value;
    applyMinorChange("BGM 사용 툴 항목이 반영되었습니다.");
  });

  $("#add-project-card")?.addEventListener("click", () => {
    state.data.projects.cards.push({
      layout: "small",
      tag: "",
      duration: "",
      title: "",
      description: "",
      ctaLabel: "",
      href: "",
    });
    applyDataChange("프로젝트 카드를 추가했습니다.");
  });

  $("#project-card-list")?.addEventListener("input", (event) => {
    const row = event.target.closest("[data-project-index]");
    const field = event.target.dataset.projectField;
    if (!row || !field) return;
    const index = Number(row.dataset.projectIndex);
    state.data.projects.cards[index][field] = event.target.value;
    applyMinorChange("프로젝트 카드가 반영되었습니다.");
  });

  $("#works-video-url")?.addEventListener("input", () => {
    syncWorksVideoUrlFeedback();
  });

  $("#works-video-title")?.addEventListener("input", () => {
    renderWorksNewVideoPreview();
  });

  $("#works-video-date")?.addEventListener("input", () => {
    renderWorksNewVideoPreview();
  });

  $("#works-video-type")?.addEventListener("change", () => {
    renderWorksNewVideoPreview();
  });

  $("#works-video-category")?.addEventListener("change", () => {
    toggleWorksNewCategoryField();
    renderWorksNewVideoPreview();
  });

  $("#works-new-category-name")?.addEventListener("input", () => {
    renderWorksNewVideoPreview();
  });

  $("#works-display-mode")?.addEventListener("change", (event) => {
    state.data.works.displayMode = normalizeWorksDisplayMode(event.target.value);
    applyMinorChange("영상 포트폴리오 표시 방식이 반영되었습니다.");
  });

  $("#works-grid-columns")?.addEventListener("change", (event) => {
    state.data.works.gridColumns = normalizeWorksColumnCount(event.target.value, DEFAULT_DATA.works.gridColumns);
    applyMinorChange("그리드형 한 줄 영상 개수가 반영되었습니다.");
  });

  $("#works-category-stack-columns")?.addEventListener("change", (event) => {
    state.data.works.categoryStackColumns = normalizeWorksColumnCount(event.target.value, DEFAULT_DATA.works.categoryStackColumns);
    applyMinorChange("카테고리 스택 열 개수가 반영되었습니다.");
  });

  $("#works-category-stack-type-filter-enabled")?.addEventListener("change", (event) => {
    state.data.works.categoryStackTypeFilterEnabled = event.target.checked;
    applyMinorChange("카테고리 스택 타입 필터 표시 설정이 반영되었습니다.");
  });

  $("#works-category-stack-single-column-size")?.addEventListener("change", (event) => {
    state.data.works.categoryStackSingleColumnSize = normalizeWorksSingleColumnSize(event.target.value);
    applyMinorChange("1열 높이 크기 설정이 반영되었습니다.");
  });

  const handleWorksCategoryEntryField = (event) => {
    const row = event.target.closest("[data-works-category-entry-index]");
    const field = event.target.dataset.worksCategoryEntryField;
    if (!row || !field) return;
    const index = Number(row.dataset.worksCategoryEntryIndex);
    const entry = state.data.works.categoryEntries?.[index];
    if (!entry) return;
    entry[field] = event.target.value;
    applyMinorChange("카테고리 표시 정보가 반영되었습니다.");
  };

  $("#works-category-order-list")?.addEventListener("input", handleWorksCategoryEntryField);
  $("#works-category-order-list")?.addEventListener("change", handleWorksCategoryEntryField);

  $("#works-video-form")?.addEventListener("submit", (event) => {
    event.preventDefault();

    const parsed = syncWorksVideoUrlFeedback({ skipMetadata: true });
    const title = String($("#works-video-title")?.value || "").trim();
    const date = String($("#works-video-date")?.value || "").trim();
    const category = getWorksFormCategoryValue();
    const type = $("#works-video-type")?.value === "short" ? "short" : "long";

    if (!parsed) {
      setStatus("YouTube 링크를 확인해주세요. 영상 포트폴리오를 추가하지 못했습니다.", "error");
      return;
    }

    if (state.data.works.videos.some((video) => video.id === parsed.id)) {
      setStatus("이미 등록된 YouTube 영상입니다. 기존 카드에서 수정해주세요.", "error");
      return;
    }

    if (!title) {
      setStatus("영상 제목을 입력해주세요.", "error");
      return;
    }

    if (!category) {
      setStatus("카테고리를 선택하거나 새 카테고리 이름을 입력해주세요.", "error");
      return;
    }

    state.data.works.videos.unshift({
      id: parsed.id,
      title,
      date,
      type,
      category,
    });

    resetWorksVideoForm();
    applyDataChange("영상 포트폴리오를 추가했습니다.");
  });

  $("#works-video-search")?.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderWorksVideoList();
  });

  $("#works-video-filter")?.addEventListener("change", (event) => {
    state.typeFilter = event.target.value;
    renderWorksVideoList();
  });

  $("#works-video-list")?.addEventListener("input", (event) => {
    const card = event.target.closest("[data-works-video-index]");
    if (!card) return;
    const index = Number(card.dataset.worksVideoIndex);
    const video = state.data.works.videos[index];
    if (!video) return;

    const field = event.target.dataset.worksVideoField;
    if (field) {
      video[field] = field === "type"
        ? (event.target.value === "short" ? "short" : "long")
        : event.target.value;
      applyMinorChange("영상 포트폴리오 항목이 반영되었습니다.");
      return;
    }

    if (event.target.dataset.worksVideoCustomCategory !== undefined) {
      video.category = event.target.value;
      const chip = card.querySelector(".category-chip");
      if (chip) chip.textContent = event.target.value.trim() || "카테고리 미입력";
      applyMinorChange("영상 포트폴리오 카테고리가 반영되었습니다.");
    }
  });

  $("#works-video-list")?.addEventListener("change", (event) => {
    const card = event.target.closest("[data-works-video-index]");
    if (!card) return;
    const index = Number(card.dataset.worksVideoIndex);
    const video = state.data.works.videos[index];
    if (!video) return;

    if (event.target.dataset.worksVideoField === "date" || event.target.dataset.worksVideoField === "type") {
      video[event.target.dataset.worksVideoField] = event.target.dataset.worksVideoField === "type"
        ? (event.target.value === "short" ? "short" : "long")
        : event.target.value;
      applyDataChange("영상 포트폴리오 항목이 반영되었습니다.");
      return;
    }

    if (event.target.dataset.worksVideoCategorySelect !== undefined) {
      if (event.target.value === "__new__") {
        const input = card.querySelector("[data-works-video-custom-category]");
        video.category = String(input?.value || "").trim();
      } else {
        video.category = event.target.value;
      }
      applyDataChange("영상 포트폴리오 카테고리가 반영되었습니다.");
      return;
    }

    if (event.target.dataset.worksVideoCustomCategory !== undefined) {
      video.category = String(event.target.value || "").trim();
      applyDataChange("영상 포트폴리오 카테고리가 반영되었습니다.");
    }
  });

  $("#works-video-list")?.addEventListener("click", (event) => {
    const deleteButton = event.target.closest("[data-delete-works-video]");
    if (!deleteButton) return;
    const index = Number(deleteButton.dataset.deleteWorksVideo);
    const title = state.data.works.videos[index]?.title || "이 영상";
    if (!window.confirm(`"${title}"을 삭제할까요?`)) return;
    state.data.works.videos.splice(index, 1);
    applyDataChange("영상이 삭제되었습니다.");
  });

  $("#add-stat-item")?.addEventListener("click", () => {
    state.data.stats.items.push({ value: "", label: "" });
    applyDataChange("통계 아이템을 추가했습니다.");
  });

  $("#stats-item-list")?.addEventListener("input", (event) => {
    const row = event.target.closest("[data-stat-index]");
    const field = event.target.dataset.statField;
    if (!row || !field) return;
    const index = Number(row.dataset.statIndex);
    state.data.stats.items[index][field] = event.target.value;
    applyMinorChange("통계 아이템이 반영되었습니다.");
  });

  $("#add-process-step")?.addEventListener("click", () => {
    state.data.pricing.processSteps.push({ number: "", title: "", description: "" });
    applyDataChange("프로세스 단계를 추가했습니다.");
  });

  $("#process-step-list")?.addEventListener("input", (event) => {
    const row = event.target.closest("[data-process-index]");
    const field = event.target.dataset.processField;
    if (!row || !field) return;
    const index = Number(row.dataset.processIndex);
    state.data.pricing.processSteps[index][field] = event.target.value;
    applyMinorChange("프로세스 단계가 반영되었습니다.");
  });

  $("#add-pricing-plan")?.addEventListener("click", () => {
    state.data.pricing.plans.push({
      slug: "",
      design: "shortform",
      badge: "",
      icon: "",
      title: "",
      description: "",
      price: "",
      priceUnit: "",
      features: [],
      cta: {
        label: "",
        href: "",
      },
    });
    applyDataChange("가격 플랜을 추가했습니다.");
  });

  $("#add-custom-work")?.addEventListener("click", () => {
    state.data.pricing.customWorks.push({
      eyebrow: "",
      title: "",
      description: "",
      highlight: "",
      caption: "",
      imageUrl: "",
      imageAlt: "",
    });
    applyDataChange("커스텀 작업 블록을 추가했습니다.");
  });

  const handlePricingPlanFieldChange = (event) => {
    const planCard = event.target.closest("[data-plan-index]");
    if (!planCard) return;
    const planIndex = Number(planCard.dataset.planIndex);
    const plan = state.data.pricing.plans[planIndex];
    if (!plan) return;

    const planField = event.target.dataset.planField;
    if (planField) {
      plan[planField] = planField === "design"
        ? normalizePricingPlanDesign(event.target.value, "shortform")
        : event.target.value;
      applyMinorChange("가격 플랜이 반영되었습니다.");
      return;
    }

    const ctaField = event.target.dataset.planCtaField;
    if (ctaField) {
      plan.cta[ctaField] = event.target.value;
      applyMinorChange("플랜 CTA가 반영되었습니다.");
      return;
    }

    const featureField = event.target.dataset.planFeatureField;
    const featureRow = event.target.closest("[data-feature-index]");
    if (!featureField || !featureRow) return;
    const featureIndex = Number(featureRow.dataset.featureIndex);
    plan.features[featureIndex] = event.target.value;
    applyMinorChange("플랜 포함 항목이 반영되었습니다.");
  };

  $("#pricing-plan-list")?.addEventListener("input", handlePricingPlanFieldChange);
  $("#pricing-plan-list")?.addEventListener("change", (event) => {
    if (!event.target.matches('select[data-plan-field="design"]')) return;
    handlePricingPlanFieldChange(event);
  });

  $("#custom-work-list")?.addEventListener("input", (event) => {
    const row = event.target.closest("[data-custom-work-index]");
    const field = event.target.dataset.customWorkField;
    if (!row || !field) return;
    const index = Number(row.dataset.customWorkIndex);
    const block = state.data.pricing.customWorks[index];
    if (!block) return;
    block[field] = event.target.value;
    applyMinorChange("커스텀 작업 블록이 반영되었습니다.");
  });

  $("#pricing-plan-list")?.addEventListener("click", (event) => {
    const planCard = event.target.closest("[data-plan-index]");
    if (!planCard) return;
    const planIndex = Number(planCard.dataset.planIndex);
    const plan = state.data.pricing.plans[planIndex];
    if (!plan) return;

    const addButton = event.target.closest("[data-add-feature]");
    if (addButton) {
      plan.features.push("");
      applyDataChange("플랜 포함 항목을 추가했습니다.");
      return;
    }

    const featureDelete = event.target.closest("[data-delete-feature]");
    if (featureDelete) {
      const featureIndex = Number(featureDelete.dataset.deleteFeature);
      plan.features.splice(featureIndex, 1);
      applyDataChange("플랜 포함 항목을 삭제했습니다.");
      return;
    }

    const moveFeatureButton = event.target.closest("[data-move-feature]");
    if (moveFeatureButton) {
      const featureIndex = Number(moveFeatureButton.dataset.moveFeature);
      const direction = Number(moveFeatureButton.dataset.direction);
      if (moveArrayItem(plan.features, featureIndex, direction)) {
        applyDataChange("플랜 포함 항목 순서를 변경했습니다.");
      }
    }
  });

  $("#add-contact-detail")?.addEventListener("click", () => {
    state.data.contact.details.push({ label: "", value: "" });
    applyDataChange("문의 상세 정보를 추가했습니다.");
  });

  $("#contact-detail-list")?.addEventListener("input", (event) => {
    const row = event.target.closest("[data-contact-detail-index]");
    const field = event.target.dataset.contactDetailField;
    if (!row || !field) return;
    const index = Number(row.dataset.contactDetailIndex);
    state.data.contact.details[index][field] = event.target.value;
    applyMinorChange("문의 상세 정보가 반영되었습니다.");
  });

  $("#add-footer-link")?.addEventListener("click", () => {
    state.data.site.footer.links.push({ label: "", url: "" });
    applyDataChange("푸터 링크를 추가했습니다.");
  });

  $("#footer-link-list")?.addEventListener("input", (event) => {
    const row = event.target.closest("[data-footer-link-index]");
    const field = event.target.dataset.footerLinkField;
    if (!row || !field) return;
    const index = Number(row.dataset.footerLinkIndex);
    state.data.site.footer.links[index][field] = event.target.value;
    applyMinorChange("푸터 링크가 반영되었습니다.");
  });

  document.addEventListener("click", (event) => {
    const moveButton = event.target.closest("[data-move-list]");
    if (moveButton) {
      const listKey = moveButton.dataset.moveList;
      const index = Number(moveButton.dataset.index);
      const direction = Number(moveButton.dataset.direction);
      const list = listByKey(listKey);
      if (moveArrayItem(list, index, direction)) {
        applyDataChange("항목 순서를 변경했습니다.");
      }
      return;
    }

    const deleteButton = event.target.closest("[data-delete-list]");
    if (!deleteButton) return;
    const listKey = deleteButton.dataset.deleteList;
    const index = Number(deleteButton.dataset.index);
    const list = listByKey(listKey);
    if (!Array.isArray(list) || index < 0 || index >= list.length) return;

    if (!window.confirm("이 항목을 삭제할까요?")) return;
    list.splice(index, 1);
    applyDataChange("항목을 삭제했습니다.");
  });

  $("#json-output")?.addEventListener("input", (event) => {
    try {
      state.data = normalizeData(JSON.parse(event.target.value));
      renderAll();
      setStatus("JSON 원문 변경 사항이 적용되었습니다.", "success");
    } catch (error) {
      setStatus(`JSON 원문 오류: ${error.message}`, "error");
    }
  });

  mountLivePreview();
  renderLivePreview();
}

bindEvents();
loadJson();
