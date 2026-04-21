const jsonPath = "../data/site.json";
const githubJsonPath = "data/site.json";
const githubDefaultBranch = "main";
const previewTargets = {
  brand: {
    title: "브랜드 / 내비 미리보기",
    description: "상단 헤더와 사이트 제목, 설명이 실제 화면에서 어떤 톤으로 보이는지 확인합니다.",
    pathText: "index.html / header",
    openHref: "../index.html",
  },
  hero: {
    title: "히어로 미리보기",
    description: "홈 첫 화면의 핵심 히어로 구성만 바로 확인할 수 있습니다.",
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
    title: "진영 포트폴리오",
    description: "",
    githubRepo: "",
    brand: {
      prefix: "studio",
      name: "jinyeong",
    },
    nav: {
      links: [],
      ctaLabel: "문의하기",
      ctaHref: "contact.html",
    },
    footer: {
      title: "STUDIO JINYEONG",
      copy: "",
      links: [],
    },
  },
  hero: {
    backgroundVideoUrl: "",
    eyebrow: "",
    title: "",
    titleAccent: "",
    description: "",
    statusLabel: "",
    statusText: "",
    actions: [],
  },
  projects: {
    sectionEyebrow: "",
    sectionTitle: "",
    sectionMeta: "",
    cards: [],
  },
  stats: {
    items: [],
  },
  works: {
    sectionTitle: "영상 포트폴리오",
    sectionDescription: "",
    emptyText: "해당 조건의 영상이 없습니다.",
    videos: [],
  },
  pricing: {
    sectionEyebrow: "",
    title: "",
    description: "",
    plans: [],
    customWork: {
      eyebrow: "",
      title: "",
      description: "",
      highlight: "",
      caption: "",
      imageUrl: "",
      imageAlt: "",
    },
    processTitle: "",
    processSteps: [],
  },
  contact: {
    eyebrow: "",
    title: "",
    titleAccent: "",
    description: "",
    primaryCard: {
      label: "",
      value: "",
      note: "",
      icon: "",
      href: "",
    },
    details: [],
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
  "projects-eyebrow": ["projects", "sectionEyebrow"],
  "projects-title": ["projects", "sectionTitle"],
  "projects-meta": ["projects", "sectionMeta"],
  "pricing-eyebrow": ["pricing", "sectionEyebrow"],
  "pricing-title": ["pricing", "title"],
  "pricing-description": ["pricing", "description"],
  "pricing-process-title": ["pricing", "processTitle"],
  "custom-eyebrow": ["pricing", "customWork", "eyebrow"],
  "custom-title": ["pricing", "customWork", "title"],
  "custom-description": ["pricing", "customWork", "description"],
  "custom-highlight": ["pricing", "customWork", "highlight"],
  "custom-caption": ["pricing", "customWork", "caption"],
  "custom-image-url": ["pricing", "customWork", "imageUrl"],
  "custom-image-alt": ["pricing", "customWork", "imageAlt"],
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

function resolveGitHubSiteJsonUrl(locationRef = window.location) {
  const configuredRepo = normalizeGitHubRepo(state.data.site?.githubRepo);
  if (configuredRepo) {
    return `https://github.com/${configuredRepo}/blob/${githubDefaultBranch}/${githubJsonPath}`;
  }

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

  return `https://github.com/${owner}/${repoName}/blob/${githubDefaultBranch}/${githubJsonPath}`;
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

  const options = getWorksCategories().map((category) => `
    <option value="${escapeHTML(category)}">${escapeHTML(category)}</option>
  `).join("");

  select.innerHTML = `<option value="__new__">새 카테고리 작성</option>${options}`;
  if (selected && getWorksCategories().includes(selected)) {
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
    },
    projects: {
      ...base.projects,
      ...(source.projects || {}),
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
      items: Array.isArray(source.stats?.items)
        ? source.stats.items.map((item) => ({
            value: String(item?.value || "").trim(),
            label: String(item?.label || "").trim(),
          })).filter((item) => item.value || item.label)
        : [],
    },
    works: {
      sectionTitle: base.works.sectionTitle,
      sectionDescription: base.works.sectionDescription,
      emptyText: base.works.emptyText,
      videos: normalizeWorksVideos(source.works?.videos),
    },
    pricing: {
      ...base.pricing,
      ...(source.pricing || {}),
      plans: Array.isArray(source.pricing?.plans)
        ? source.pricing.plans.map((plan) => ({
            slug: String(plan?.slug || "").trim(),
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
      customWork: {
        ...base.pricing.customWork,
        ...(source.pricing?.customWork || {}),
      },
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
  return previewTargets[tab] || previewTargets.brand;
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

function renderPreviewWorksFilters() {
  const categories = getWorksCategories();
  const chips = [
    '<span class="rounded-full border border-[#fde047]/30 bg-[#fde047]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#fde047]">전체</span>',
    '<span class="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#cec6ad]">롱폼</span>',
    '<span class="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#cec6ad]">숏폼</span>',
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

function renderPreviewWorksCards() {
  const videos = getSortedWorksVideos();
  if (!videos.length) {
    return `
      <div class="rounded-2xl border border-dashed border-white/10 px-6 py-8 text-center text-sm font-medium text-[#8b8577] md:col-span-3">
        ${escapeHTML(textOrFallback(state.data.works.emptyText, "해당 조건의 영상이 없습니다."))}
      </div>
    `;
  }

  return videos.map((video) => {
    const metaParts = [];
    if (video.category) metaParts.push(video.category);
    if (video.date) metaParts.push(formatDisplayDate(video.date));
    const metaMarkup = metaParts.length
      ? `<div class="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em] text-[#97917a]">
           ${metaParts.map((item) => `<span>${escapeHTML(item)}</span>`).join("")}
         </div>`
      : "";

    return `
      <article class="overflow-hidden rounded-2xl border border-white/10 bg-[#1e1c12]">
        <div class="relative aspect-video overflow-hidden bg-[#2d2a1f]">
          <img class="h-full w-full object-cover" alt="${escapeHTML(video.title || "영상 썸네일")}" src="${escapeHTML(videoThumb(video.id))}" referrerpolicy="no-referrer">
          <span class="absolute right-4 top-4 rounded-full border ${video.type === "short" ? "border-[#3bf7ff]/30 text-[#8ffcff]" : "border-[#fde047]/30 text-[#fde047]"} bg-[#16130a]/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]">${escapeHTML(video.type === "short" ? "숏폼" : "롱폼")}</span>
        </div>
        <div class="grid gap-3 p-5">
          <div class="text-2xl font-bold tracking-tight text-white">${escapeHTML(textOrFallback(video.title, "제목 미입력"))}</div>
          ${metaMarkup}
        </div>
      </article>
    `;
  }).join("");
}

function renderPreviewProcessSteps() {
  const steps = state.data.pricing.processSteps.filter((step) => step.number || step.title || step.description);
  if (!steps.length) {
    return '<div class="rounded-2xl border border-dashed border-white/10 px-6 py-8 text-center text-sm font-medium text-[#8b8577]">프로세스 단계를 추가하면 이곳에 표시됩니다.</div>';
  }

  return steps.map((step) => `
    <article class="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div class="text-2xl font-black text-[#fde047] opacity-40">${escapeHTML(textOrFallback(step.number, "00"))}</div>
      <div class="font-bold text-white">${escapeHTML(textOrFallback(step.title, "프로세스 제목"))}</div>
      <div class="text-xs leading-relaxed text-[#cec6ad]">${escapeHTML(textOrFallback(step.description, "프로세스 설명이 이곳에 표시됩니다."))}</div>
    </article>
  `).join("");
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
    const highlighted = plan.slug === "long";
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
            <span style="letter-spacing:-1.2px;">${escapeHTML(textOrFallback(state.data.site.brand.name, "jinyeong"))}</span>
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
            <div class="mt-5 text-3xl font-black tracking-tight text-white md:text-5xl">${escapeHTML(textOrFallback(state.data.site.title, "진영 포트폴리오"))}</div>
            <div class="mt-4 text-sm leading-relaxed text-[#cec6ad] md:text-base">${escapeHTML(textOrFallback(state.data.site.description, "사이트 설명을 입력하면 이 영역에 반영됩니다."))}</div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function buildHeroPreview() {
  return `
    <section class="preview-render-root relative overflow-hidden bg-[#16130a] text-[#e9e2d2]" style="font-family:'Epilogue', sans-serif;">
      <div class="absolute inset-0" style="background:linear-gradient(to bottom, rgba(22, 19, 10, 0.32), rgba(22, 19, 10, 0.72), rgba(22, 19, 10, 0.98));"></div>
      <div class="relative mx-auto flex h-full max-w-screen-2xl items-start px-6 pt-16 pb-16 md:px-8 md:pt-24">
        <div class="flex w-full flex-col gap-12 md:flex-row md:justify-between md:gap-16">
          <div class="max-w-4xl">
            <span class="mb-5 block text-xs font-bold uppercase tracking-[0.3em] text-[#fde047]">${escapeHTML(textOrFallback(state.data.hero.eyebrow, "VIDEO EDITORIAL PORTFOLIO"))}</span>
            <div class="text-5xl font-black leading-[0.95] text-white md:text-7xl">${renderPreviewAccentText(textOrFallback(state.data.hero.title, "영상으로\n이야기를 만듭니다."), state.data.hero.titleAccent, "text-[#FDE047]")}</div>
            <div class="mt-8 max-w-2xl rounded-xl border border-white/10 bg-[#16130a]/30 p-4 text-base font-medium leading-relaxed text-[#cec6ad] backdrop-blur-sm md:text-lg">${escapeWithBreaks(textOrFallback(state.data.hero.description, "히어로 설명을 입력하면 이 영역에 반영됩니다."))}</div>
            <div class="mt-8 flex flex-wrap gap-4">
              ${renderPreviewHeroActions()}
            </div>
          </div>
          <div class="hidden lg:block">
            <div class="flex flex-col items-end gap-2 text-right">
              <span class="text-[10px] uppercase tracking-[0.2em] text-[#cec6ad]">${escapeHTML(textOrFallback(state.data.hero.statusLabel, "Status"))}</span>
              <div class="flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-[#3bf7ff]"></span>
                <span class="text-xs font-bold text-white">${escapeHTML(textOrFallback(state.data.hero.statusText, "AVAILABLE FOR NEW PROJECTS"))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function buildProjectsPreview() {
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
  const description = String(state.data.works.sectionDescription || "").trim();
  const hasVideos = state.data.works.videos.length > 0;
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
        ${hasVideos ? `<div class="mb-8">${renderPreviewWorksFilters()}</div>` : ""}
        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          ${renderPreviewWorksCards()}
        </div>
      </div>
    </section>
  `;
}

function buildProcessPreview() {
  return `
      <section class="preview-render-root bg-[#16130a] px-6 py-14 text-[#e9e2d2] md:px-8" style="font-family:'Epilogue', sans-serif;">
        <div id="process-section" class="mx-auto max-w-screen-xl border-t border-white/10 pt-12">
          <div class="mb-10 text-center text-2xl font-bold text-white">${escapeHTML(textOrFallback(state.data.pricing.processTitle, "진행 프로세스 및 정책"))}</div>
          <div class="grid gap-4 md:grid-cols-4">
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
          <div class="mb-4 inline-block rounded-sm bg-white/10 px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-[#fde047]">${escapeHTML(textOrFallback(state.data.pricing.sectionEyebrow, "Pricing & Packages"))}</div>
          <div class="mb-6 text-4xl font-black leading-[1.1] tracking-tighter text-white md:text-6xl">${escapeHTML(textOrFallback(state.data.pricing.title, "당신의 비전을 편집의 예술로."))}</div>
          <div class="max-w-2xl text-lg leading-relaxed text-[#cec6ad]">${escapeHTML(textOrFallback(state.data.pricing.description, "가격 섹션 설명을 입력하면 이 영역에 반영됩니다."))}</div>
        </header>

        <div class="grid gap-6 md:grid-cols-2">
          ${renderPreviewPlanCards()}
        </div>

        <div class="mt-20 grid gap-6 md:grid-cols-2">
          <section class="flex flex-col justify-center bg-[#1e1c12] p-10">
            <div class="mb-6 text-3xl font-bold text-white">${escapeHTML(textOrFallback(state.data.pricing.customWork.title, "커스텀 작업이 필요하신가요?"))}</div>
            <div class="mb-8 leading-relaxed text-[#cec6ad]">${escapeHTML(textOrFallback(state.data.pricing.customWork.description, "커스텀 작업 설명을 입력하면 이 영역에 반영됩니다."))}</div>
            <div class="flex items-center gap-4">
              <span class="text-xl font-black italic tracking-tight text-[#fde047]">${escapeHTML(textOrFallback(state.data.pricing.customWork.highlight, "FAST & ACCURATE"))}</span>
              <span class="h-px flex-1 bg-white/10"></span>
            </div>
          </section>

          <section class="relative min-h-[280px] overflow-hidden bg-[#2d2a1f]">
            ${state.data.pricing.customWork.imageUrl
              ? `<img class="h-full w-full object-cover grayscale" alt="${escapeHTML(state.data.pricing.customWork.imageAlt || state.data.pricing.customWork.title || "")}" src="${escapeHTML(state.data.pricing.customWork.imageUrl)}">`
              : '<div class="flex h-full min-h-[280px] items-center justify-center text-sm font-medium text-[#8b8577]">커스텀 작업 이미지를 입력하면 이 영역에 표시됩니다.</div>'}
            <div class="absolute inset-0 bg-gradient-to-t from-[#16130a] to-transparent opacity-70"></div>
            <div class="absolute bottom-8 left-8">
              <div class="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#fde047]">${escapeHTML(textOrFallback(state.data.pricing.customWork.eyebrow, "Studio Quality"))}</div>
              <div class="text-2xl font-bold text-white">${escapeHTML(textOrFallback(state.data.pricing.customWork.caption || state.data.pricing.customWork.title, "압도적인 퀄리티의 비결"))}</div>
            </div>
          </section>
        </div>
      </div>
    </section>
  `;
}

function buildContactFooterPreview() {
  const details = state.data.contact.details.filter((detail) => detail.label || detail.value);

  return `
    <section class="preview-render-root bg-[#16130a] text-[#e9e2d2]" style="font-family:'Epilogue', sans-serif;">
      <div id="contact" class="flex min-h-[520px] items-center justify-center px-6 pt-20 pb-16 md:px-8">
        <div class="mx-auto max-w-screen-2xl">
          <div class="text-center">
            <span class="mb-6 block text-[0.75rem] uppercase tracking-[0.3em] text-[#fde047] md:text-[0.875rem]">${escapeHTML(textOrFallback(state.data.contact.eyebrow, "CONTACT ME"))}</span>
            <div class="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">${renderPreviewAccentText(textOrFallback(state.data.contact.title, "빠른 소통을 위해 디스코드로 연락주세요."), state.data.contact.titleAccent, "text-[#fde047]")}</div>
            <div class="mx-auto mb-12 max-w-2xl text-lg text-[#cec6ad] opacity-80">${escapeHTML(textOrFallback(state.data.contact.description, "문의 설명을 입력하면 이 영역에 반영됩니다."))}</div>

            <div class="group relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-tr from-[#fde047]/20 to-transparent p-1">
              <div class="rounded-xl border border-white/10 bg-[#1e1c12] px-10 py-12 md:px-20 md:py-16">
                <div class="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fde047] shadow-[0_0_40px_rgba(253,224,71,0.2)] mx-auto">
                  <span class="material-symbols-outlined text-4xl font-bold text-[#211b00]">${escapeHTML(textOrFallback(state.data.contact.primaryCard.icon, "chat"))}</span>
                </div>
                <span class="mb-3 block text-xs uppercase tracking-[0.2em] text-[#97917a]">${escapeHTML(textOrFallback(state.data.contact.primaryCard.label, "Discord ID"))}</span>
                <strong class="text-3xl font-bold tracking-tighter text-white md:text-5xl">${escapeHTML(textOrFallback(state.data.contact.primaryCard.value, "jinyeoung_"))}</strong>
                ${state.data.contact.primaryCard.note ? `
                  <div class="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-[#fde047]/70">
                    <span class="material-symbols-outlined text-sm">info</span>
                    <span>${escapeHTML(state.data.contact.primaryCard.note)}</span>
                  </div>` : ""}
              </div>
            </div>

            <div class="mx-auto mt-16 grid max-w-3xl gap-6 opacity-80 md:grid-cols-3">
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

      <footer class="w-full px-6 py-16 md:px-8 md:py-20">
        <div class="mx-auto flex max-w-screen-2xl flex-col items-center gap-10 border-t border-white/10 pt-12 text-center">
          <div class="text-3xl font-black uppercase tracking-tighter text-white md:text-4xl">${escapeHTML(textOrFallback(state.data.site.footer.title, "STUDIO JINYEONG"))}</div>
          <div class="flex flex-wrap items-center justify-center gap-4">
            ${renderPreviewFooterLinks()}
          </div>
          <div class="text-[0.6875rem] uppercase tracking-[0.15em] text-[#97917a] opacity-60">${escapeHTML(textOrFallback(state.data.site.footer.copy, "© 2026 STUDIO JINYEONG. 모든 권리 보유."))}</div>
        </div>
      </footer>
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

  const categories = getWorksCategories();
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
  renderDirectInputs();
  renderSummary();
  renderNavLinkList();
  renderHeroActionList();
  renderProjectCardList();
  renderWorksVideoForm();
  renderWorksVideoList();
  renderStatsItemList();
  renderProcessStepList();
  renderPricingPlanList();
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
  extraActions.querySelectorAll("button").forEach((button) => {
    button.tabIndex = isOpen ? 0 : -1;
  });
}

function applyMinorChange(message = "변경 사항이 반영되었습니다.") {
  renderSummary();
  refreshJsonOutput();
  renderLivePreview();
  setStatus(message, "success");
}

function applyDataChange(message = "변경 사항이 반영되었습니다.") {
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
    case "projects":
      return state.data.projects.cards;
    case "works-videos":
      return state.data.works.videos;
    case "stats":
      return state.data.stats.items;
    case "process":
      return state.data.pricing.processSteps;
    case "plans":
      return state.data.pricing.plans;
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
    setStatus("GitHub 저장소 경로를 알 수 없습니다. site.githubRepo를 확인하세요.", "error");
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
        setStatus("JSON을 복사했습니다. 팝업 차단으로 GitHub 페이지는 열지 못했습니다.", "error");
      }
    } else {
      setStatus("JSON을 복사했습니다.", "success");
    }
  } catch (error) {
    if (githubTab && !githubTab.closed) githubTab.close();
    const output = $("#json-output");
    output?.focus();
    output?.select();
    setStatus("클립보드 복사가 막혔습니다. JSON 탭에서 직접 선택해 복사하세요.", "error");
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

function bindEvents() {
  bindDirectInputs();

  $$(".tab-button").forEach((button) => {
    button.addEventListener("click", () => switchTab(button.dataset.tab));
  });

  $("#reload-json")?.addEventListener("click", () => loadJson(true));
  $("#validate-json")?.addEventListener("click", validateJson);
  $("#copy-all-json")?.addEventListener("click", copyAllJson);
  $("#copy-json-panel")?.addEventListener("click", copyAllJson);
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

  $("#pricing-plan-list")?.addEventListener("input", (event) => {
    const planCard = event.target.closest("[data-plan-index]");
    if (!planCard) return;
    const planIndex = Number(planCard.dataset.planIndex);
    const plan = state.data.pricing.plans[planIndex];
    if (!plan) return;

    const planField = event.target.dataset.planField;
    if (planField) {
      plan[planField] = event.target.value;
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
