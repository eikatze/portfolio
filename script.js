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
const previewStorageKey = "jinyeong-admin-preview-data";
const previewMessageType = "jinyeong-preview-data";

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

function normalizeLinkArray(items) {
  return Array.isArray(items)
    ? items.map((item) => ({
        label: String(item?.label || "").trim(),
        href: String(item?.href || item?.url || "").trim(),
        url: String(item?.url || item?.href || "").trim(),
      })).filter((item) => item.label || item.href || item.url)
    : [];
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
    },
    projects: {
      ...clone(DEFAULT_DATA.projects),
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
          })).filter((card) => card.title)
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
      ...clone(DEFAULT_DATA.works),
      ...(source.works || {}),
      videos: Array.isArray(source.works?.videos)
        ? source.works.videos.map((video) => ({
            id: String(video?.id || "").trim(),
            title: String(video?.title || "").trim(),
            date: String(video?.date || "").trim(),
            type: video?.type === "short" ? "short" : "long",
            category: String(video?.category || "").trim(),
          })).filter((video) => video.id)
        : [],
    },
    pricing: {
      ...clone(DEFAULT_DATA.pricing),
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
          })).filter((plan) => plan.title || plan.price)
        : [],
      customWork: {
        ...clone(DEFAULT_DATA.pricing.customWork),
        ...(source.pricing?.customWork || {}),
      },
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

function resolvePreviewAwareHref(href) {
  const resolved = resolveHref(href);
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
  const projectsSection = document.getElementById("projects");
  if (!homeSection || !projectsSection) return null;

  const headerHeight = document.querySelector("header")?.offsetHeight || 0;
  const start = Math.max(homeSection.offsetTop, 0);
  const end = Math.max(projectsSection.offsetTop - headerHeight - 24, start + 1);
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
  const projectsLink = links.find((link) => link.dataset.targetPage === "index.html" && link.dataset.targetHash === "#projects");

  let nextLeft = 0;
  let nextWidth = 0;
  let showIndicator = false;

  if (activePage === "index.html" && homeLink && projectsLink) {
    const progress = getIndexNavProgress();
    if (progress !== null) {
      const homeMetrics = getLinkMetrics(homeLink, container);
      const projectsMetrics = getLinkMetrics(projectsLink, container);
      nextLeft = lerp(homeMetrics.left, projectsMetrics.left, progress);
      nextWidth = lerp(homeMetrics.width, projectsMetrics.width, progress);
      showIndicator = nextWidth > 0;

      setDesktopNavActiveState(links, (link) => {
        if (link === homeLink) return progress < 0.55;
        if (link === projectsLink) return progress >= 0.55;
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

function renderHero() {
  setText("hero-eyebrow", DATA.hero.eyebrow);
  const title = $("#hero-title");
  if (title) {
    title.innerHTML = renderAccentText(DATA.hero.title, DATA.hero.titleAccent, "text-[#FDE047]");
  }
  setText("hero-description", DATA.hero.description);
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
  const videoUrl = String(DATA.hero.backgroundVideoUrl || "").trim();
  if (video && source) {
    if (videoUrl) {
      source.src = videoUrl;
      video.load();
      setHidden(video, false);
    } else {
      source.removeAttribute("src");
      setHidden(video, true);
    }
  }
}

function renderProjects() {
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
  const grid = $("#stats-grid");
  if (!grid) return;
  grid.innerHTML = DATA.stats.items.map((item) => `
    <div>
      <span class="mb-4 block text-4xl font-black tracking-tighter text-primary-container md:text-5xl">${escapeHTML(item.value)}</span>
      <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">${escapeHTML(item.label)}</span>
    </div>
  `).join("");
}

function renderWorks() {
  const section = $("#works");
  const title = $("#works-title");
  const description = $("#works-description");
  const filters = $("#works-filters");
  const grid = $("#works-grid");
  const empty = $("#works-empty");
  if (!section || !title || !description || !filters || !grid || !empty) return;

  const works = DATA.works || DEFAULT_DATA.works;
  const rawVideos = Array.isArray(works.videos) ? works.videos : [];
  const sectionTitle = String(works.sectionTitle || "").trim();
  const sectionDescription = String(works.sectionDescription || "").trim();
  const emptyText = String(works.emptyText || DEFAULT_DATA.works.emptyText || "").trim();
  const hasSectionContent = Boolean(sectionTitle || sectionDescription || rawVideos.length);

  setHidden(section, !hasSectionContent);
  if (!hasSectionContent) {
    grid.innerHTML = "";
    filters.innerHTML = "";
    empty.textContent = "";
    return;
  }

  title.textContent = sectionTitle;
  description.textContent = sectionDescription;
  setHidden(description, !sectionDescription);

  const categories = getWorksCategories(rawVideos);
  if (!["all", "long", "short"].includes(worksFilterState.type)) {
    worksFilterState.type = "all";
  }
  if (worksFilterState.category !== "all" && !categories.includes(worksFilterState.category)) {
    worksFilterState.category = "all";
  }

  if (rawVideos.length) {
    filters.hidden = false;
    filters.innerHTML = `
      <div class="works-filter-group" role="group" aria-label="타입 필터">
        ${[
          { key: "all", label: "전체" },
          { key: "long", label: "롱폼" },
          { key: "short", label: "숏폼" },
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
  } else {
    filters.hidden = true;
    filters.innerHTML = "";
  }

  const filtered = rawVideos
    .filter((video) => worksFilterState.type === "all" || video.type === worksFilterState.type)
    .filter((video) => worksFilterState.category === "all" || video.category === worksFilterState.category)
    .slice()
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));

  if (!filtered.length) {
    grid.innerHTML = "";
    empty.textContent = emptyText || "해당 조건의 영상이 없습니다.";
    empty.hidden = false;
    return;
  }

  empty.hidden = true;
  grid.innerHTML = filtered.map((video) => {
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
      const highlighted = plan.slug === "long";
      const buttonClass = highlighted
        ? "w-full rounded-lg bg-primary-container py-4 font-black text-on-primary-container transition-all duration-300 hover:bg-primary-fixed-dim"
        : "w-full rounded-lg border border-outline-variant bg-transparent py-4 font-bold text-on-surface transition-all duration-300 hover:border-primary-container hover:bg-primary-container hover:text-on-primary-container";

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

  setText("custom-work-title", DATA.pricing.customWork.title);
  setText("custom-work-description", DATA.pricing.customWork.description);
  setText("custom-work-highlight", DATA.pricing.customWork.highlight);
  setText("custom-work-eyebrow", DATA.pricing.customWork.eyebrow);
  setText("custom-work-caption", DATA.pricing.customWork.caption || DATA.pricing.customWork.title);

  const customMedia = $("#custom-work-media");
  const customImage = $("#custom-work-image");
  if (customMedia && customImage) {
    if (DATA.pricing.customWork.imageUrl) {
      customImage.src = DATA.pricing.customWork.imageUrl;
      customImage.alt = DATA.pricing.customWork.imageAlt || DATA.pricing.customWork.title || "";
      setHidden(customMedia, false);
    } else {
      customImage.removeAttribute("src");
      setHidden(customMedia, true);
    }
  }

  setText("process-title", DATA.pricing.processTitle);
  const processGrid = $("#process-grid");
  const processSection = $("#process-section");
  if (processGrid) {
    processGrid.innerHTML = DATA.pricing.processSteps.map((step) => `
      <article class="space-y-4">
        <div class="text-2xl font-black text-primary-container opacity-30">${escapeHTML(step.number)}</div>
        <h4 class="font-bold">${escapeHTML(step.title)}</h4>
        <p class="text-xs leading-relaxed text-on-surface-variant">${escapeHTML(step.description)}</p>
      </article>
    `).join("");
  }
  setHidden(processSection, DATA.pricing.processSteps.length === 0 && !DATA.pricing.processTitle);
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
    const icon = escapeHTML(DATA.contact.primaryCard.icon || "chat");
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
    details.innerHTML = DATA.contact.details
      .filter((detail) => detail.label || detail.value)
      .map((detail) => `
        <div class="flex flex-col items-center">
          <p class="mb-1 text-xs uppercase tracking-widest text-outline">${escapeHTML(detail.label)}</p>
          <p class="font-medium text-on-surface">${escapeHTML(detail.value)}</p>
        </div>
      `).join("");
  }
}

function renderFooter() {
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
    setHidden(links, items.length === 0);
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
