(() => {
  const STORAGE_KEY = "muov-portfolio-v3";
  const SESSION_KEY = "muov-admin-session";
  const CREDS_KEY = "muov-admin-creds";
  const LANG_KEY = "muov-lang";
  const THEME_KEY = "muov-theme";
  const COUNTER_NAMESPACE = "muov-portfolio";

  const DEFAULT_USER = "muov";
  const DEFAULT_PASS_HASH =
    "d43874f677a1e18e57eecd731480fae08dad046dcc2406cad3617c1434e4576d";

  const FALLBACK_DATA = {
    profile: {
      name: "Muov",
      role: "инди-разработчик",
      roleEn: "indie developer",
      city: "itch.io · открыт к идеям",
      bio: "Создаю инди-игры, выстраиваю вымышленные миры и пишу истории. Платформеры, инструменты и эксперименты с механиками.",
      bioEn:
        "I create indie games, build fictional worlds and write stories. Platformers, tools and experiments with mechanics.",
      links: [
        { label: "itch.io", url: "https://muov.itch.io/" },
        { label: "Discord", url: "https://discord.gg/8GpzEHQqG3" },
      ],
    },
    games: [],
  };

  const I18N = {
    ru: {
      roleDefault: "инди-разработчик",
      navSpotlight: "Главное",
      navCatalog: "Проекты",
      navCraft: "Инструменты",
      profile: "Профиль",
      export: "Экспорт",
      import: "Импорт",
      addGame: "+ Проект",
      logout: "Выйти",
      login: "Вход",
      loginTitle: "Вход для владельца",
      adminRibbonTitle: "Режим студии",
      btnExplore: "Смотреть проекты",
      btnRandom: "Случайная игра",
      lblQuickLaunch: "Быстрый запуск",
      lblQuickHint: "нажми на обложку",
      lblSpotlightKicker: "В ФОКУСЕ",
      lblSpotlight: "В центре внимания",
      lblCatalogKicker: "АРХИВ И РЕЛИЗЫ",
      lblCatalog: "Все проекты",
      lblCraft: "Подход и инструменты",
      craftHeading: "Создаю атмосферные миры, пиксельную графику и удобные утилиты",
      craftDesc:
        "От прототипов для геймджемов до законченных инди-релизов и инструментов для разработчиков.",
      noteKicker: "Живая синхронизация",
      noteText: "Статистика и релизы автоматически обновляются напрямую с itch.io.",
      updatedPrefix: "Обновлено: ",
      backTop: "Наверх ↑",
      all: "Все",
      released: "Релиз",
      wip: "В работе",
      jam: "Джем",
      prototype: "Прототип",
      sortLabel: "Сортировка",
      sortFeatured: "Рекомендуемые",
      sortViews: "По просмотрам",
      sortDownloads: "По скачиваниям",
      sortYear: "Сначала новые",
      search: "Найти игру, тег или движок…",
      clearSearch: "Очистить поиск",
      resetFilters: "Сбросить фильтры",
      tagFilterPrefix: "Тег: ",
      empty: "По вашему запросу проекты не найдены.",
      foot: "Данные с",
      footSync: "автообновление через itch.io API",
      adminBadge:
        "Режим владельца — правки сохраняются локально в черновик; чтобы опубликовать для всех — Экспорт → commit в GitHub",
      drop: "Отпусти JSON — импортирую портфолио",
      close: "Закрыть",
      edit: "Править",
      delete: "Удалить",
      play: "Открыть / Играть",
      details: "Подробнее",
      trailer: "Трейлер",
      repo: "Репозиторий",
      noDesc: "Описание пока не добавлено.",
      newGame: "Новый проект",
      editing: "Редактирование",
      title: "Название",
      tagline: "Слоган",
      year: "Год",
      role: "Роль",
      status: "Статус",
      genres: "Жанры (через запятую)",
      platforms: "Платформы (через запятую)",
      tags: "Теги (через запятую)",
      description: "Описание",
      playUrl: "Ссылка на itch / проект",
      trailerUrl: "Трейлер URL",
      repoUrl: "Репозиторий",
      cover: "Обложка (URL или файл)",
      coverUrlPlaceholder: "https://... или путь к файлу",
      removeCover: "Убрать обложку",
      shots: "Скриншоты (до 4)",
      addShotUrlPlaceholder: "Добавить URL скриншота",
      addShotBtn: "Добавить",
      featured: "Главный проект (блок «В центре внимания»)",
      cancel: "Отмена",
      save: "Сохранить",
      confirmAction: "Подтверждение",
      confirmBtn: "Подтвердить",
      ownerLogin: "Вход владельца",
      username: "Логин",
      password: "Пароль",
      signIn: "Войти",
      defaultHint:
        "По умолчанию: логин <strong>muov</strong>, пароль <strong>muov-admin</strong> — смени после входа.",
      customHint: "Используется твой сохранённый пароль на этом устройстве.",
      guestHint: "Гости сайт править не могут. Это только для тебя.",
      changePass: "Сменить логин / пароль",
      changeAccess: "Сменить доступ",
      currentPass: "Текущий пароль",
      newUser: "Новый логин",
      newPass: "Новый пароль",
      newPass2: "Ещё раз новый пароль",
      back: "Назад",
      passHint: "Пароль хранится только как хеш в браузере этого устройства.",
      badLogin: "Неверный логин или пароль",
      badCurrent: "Текущий пароль неверный",
      passMismatch: "Пароли не совпадают",
      passShort: "Минимум 6 символов",
      passUpdated: "Логин и пароль обновлены на этом устройстве",
      name: "Имя",
      city: "Статус / подпись",
      about: "О себе",
      links: "Ссылки (по одной на строку: Подпись | URL)",
      resetPublished: "Сбросить к published",
      resetConfirm: "Сбросить локальный черновик и вернуться к опубликованной версии?",
      deleteConfirm: (title) => `Удалить проект «${title}» из черновика?`,
      draftSaved: "Черновик сохранён локально",
      draftActive: "Загружен локальный черновик",
      draftHint: "Экспорт → GitHub, чтобы увидеть у всех",
      importOnly: "Импорт только для владельца после входа",
      importOk: "Портфолио импортировано в черновик",
      importFail: "Не удалось прочитать JSON",
      coverFail: "Не удалось обработать обложку",
      shotsFail: "Не удалось обработать скриншоты",
      navLabel: "Действия",
      pageTitle: "Muov — инди-игры и миры",
      gameComments: "Комментарии к проекту",
      gameCommentsHint: "Войди через GitHub, чтобы оставить отзыв",
      downloads: "скачиваний",
      views: "просмотров",
      plays: "запусков",
      rating: "оценка",
      siteViews: "на сайте",
      sumProjects: "проектов",
      sumViews: "просмотров",
      sumDownloads: "скачиваний",
      themeTitle: "Сменить тему",
      prevProject: "Предыдущий проект",
      nextProject: "Следующий проект",
      prevFrame: "Предыдущий кадр",
      nextFrame: "Следующий кадр",
      menuLabel: "Меню",
      webPlayable: "▶ Web",
      craftFiltered: (q) => `Фильтр: ${q}`,
      fileCorsWarn:
        "Открыто через file:// — браузер блокирует загрузку data/portfolio.json. Запусти локальный сервер (python -m http.server).",
    },
    en: {
      roleDefault: "indie developer",
      navSpotlight: "Spotlight",
      navCatalog: "Projects",
      navCraft: "Tools",
      profile: "Profile",
      export: "Export",
      import: "Import",
      addGame: "+ Project",
      logout: "Log out",
      login: "Log in",
      loginTitle: "Owner login",
      adminRibbonTitle: "Studio Admin",
      btnExplore: "Explore Projects",
      btnRandom: "Random Game",
      lblQuickLaunch: "Quick Launch",
      lblQuickHint: "click a cover",
      lblSpotlightKicker: "FEATURED BUILD",
      lblSpotlight: "Spotlight",
      lblCatalogKicker: "ARCHIVE & RELEASES",
      lblCatalog: "All projects",
      lblCraft: "Craft & Tools",
      craftHeading: "Building atmospheric worlds, pixel art and handy developer tools",
      craftDesc: "From game jam prototypes to polished indie releases and utility software.",
      noteKicker: "Live Sync",
      noteText: "Stats and releases are automatically synced directly from itch.io.",
      updatedPrefix: "Updated: ",
      backTop: "Back to top ↑",
      all: "All",
      released: "Released",
      wip: "In progress",
      jam: "Jam",
      prototype: "Prototype",
      sortLabel: "Sort order",
      sortFeatured: "Featured first",
      sortViews: "Most viewed",
      sortDownloads: "Most downloaded",
      sortYear: "Newest first",
      search: "Search game, tag or engine…",
      clearSearch: "Clear search",
      resetFilters: "Reset filters",
      tagFilterPrefix: "Tag: ",
      empty: "No projects match your filter.",
      foot: "Data from",
      footSync: "auto-synced via itch.io API",
      adminBadge:
        "Owner mode — edits are saved to a local draft; Export → commit to GitHub to publish for everyone",
      drop: "Drop JSON to import portfolio",
      close: "Close",
      edit: "Edit",
      delete: "Delete",
      play: "Open / Play",
      details: "Details",
      trailer: "Trailer",
      repo: "Repository",
      noDesc: "No description yet.",
      newGame: "New project",
      editing: "Edit project",
      title: "Title",
      tagline: "Tagline",
      year: "Year",
      role: "Role",
      status: "Status",
      genres: "Genres (comma-separated)",
      platforms: "Platforms (comma-separated)",
      tags: "Tags (comma-separated)",
      description: "Description",
      playUrl: "itch / project URL",
      trailerUrl: "Trailer URL",
      repoUrl: "Repository",
      cover: "Cover (URL or image file)",
      coverUrlPlaceholder: "https://... or local path",
      removeCover: "Remove cover",
      shots: "Screenshots (up to 4)",
      addShotUrlPlaceholder: "Add screenshot URL",
      addShotBtn: "Add",
      featured: "Spotlight project (featured banner)",
      cancel: "Cancel",
      save: "Save",
      confirmAction: "Confirm action",
      confirmBtn: "Confirm",
      ownerLogin: "Owner login",
      username: "Username",
      password: "Password",
      signIn: "Sign in",
      defaultHint:
        "Default: username <strong>muov</strong>, password <strong>muov-admin</strong> — change after login.",
      customHint: "Using your saved password on this device.",
      guestHint: "Visitors cannot edit the site. This is for you only.",
      changePass: "Change username / password",
      changeAccess: "Change access",
      currentPass: "Current password",
      newUser: "New username",
      newPass: "New password",
      newPass2: "Confirm new password",
      back: "Back",
      passHint: "Password is stored only as a hash in this browser.",
      badLogin: "Wrong username or password",
      badCurrent: "Current password is wrong",
      passMismatch: "Passwords do not match",
      passShort: "At least 6 characters",
      passUpdated: "Username and password updated on this device",
      name: "Name",
      city: "Status / label",
      about: "About",
      links: "Links (one per line: Label | URL)",
      resetPublished: "Reset to published",
      resetConfirm: "Discard local draft and revert to published data?",
      deleteConfirm: (title) => `Delete “${title}” from draft?`,
      draftSaved: "Draft saved locally",
      draftActive: "Local draft loaded",
      draftHint: "Export → GitHub so everyone sees it",
      importOnly: "Import is only for the owner after login",
      importOk: "Portfolio imported into draft",
      importFail: "Could not read JSON",
      coverFail: "Could not process cover",
      shotsFail: "Could not process screenshots",
      navLabel: "Actions",
      pageTitle: "Muov — indie games & worlds",
      gameComments: "Project comments",
      gameCommentsHint: "Sign in with GitHub to leave a comment",
      downloads: "downloads",
      views: "views",
      plays: "plays",
      rating: "rating",
      siteViews: "on site",
      sumProjects: "projects",
      sumViews: "views",
      sumDownloads: "downloads",
      themeTitle: "Switch theme",
      prevProject: "Previous project",
      nextProject: "Next project",
      prevFrame: "Previous image",
      nextFrame: "Next image",
      menuLabel: "Menu",
      webPlayable: "▶ Web",
      craftFiltered: (q) => `Filtered: ${q}`,
      fileCorsWarn:
        "Opened via file:// — browser blocks loading data/portfolio.json. Start a local server (python -m http.server).",
    },
  };

  let lang = localStorage.getItem(LANG_KEY) === "en" ? "en" : "ru";
  let theme = localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
  let published = structuredClone(FALLBACK_DATA);
  let state = structuredClone(FALLBACK_DATA);
  let isAdmin = false;
  let filter = "all";
  let sortMode = "featured";
  let tagFilter = "";
  let query = "";
  let spotlightIndex = 0;
  let panel = null;
  let dragDepth = 0;
  let lightboxItems = [];
  let lightboxIdx = 0;

  const siteViewsCache = new Map();
  const viewedInSession = new Set();

  const $ = (id) => document.getElementById(id);
  const grid = $("grid");
  const empty = $("empty");
  const dialog = $("dialog");
  const dialogBody = $("dialogBody");
  const lightbox = $("lightbox");
  const dropVeil = $("dropVeil");
  const toastStack = $("toastStack");

  function t(key) {
    const pack = I18N[lang] || I18N.ru;
    return pack[key] ?? I18N.ru[key] ?? key;
  }

  function toast(message, kind = "ok", duration = 3400) {
    if (!toastStack || !message) return;
    const item = document.createElement("div");
    item.className = `toast ${kind}`;
    item.textContent = message;
    toastStack.appendChild(item);
    setTimeout(() => {
      item.remove();
    }, duration);
  }

  function esc(s) {
    return String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function safeUrl(u) {
    if (!u || typeof u !== "string") return "";
    const trimmed = u.trim();
    if (!trimmed) return "";
    if (trimmed.startsWith("data:image/")) return trimmed;
    try {
      const url = new URL(trimmed, location.href);
      if (url.protocol === "http:" || url.protocol === "https:") return url.href;
    } catch (_) {}
    return "";
  }

  function safeImgSrc(u) {
    if (!u || typeof u !== "string") return "";
    const trimmed = u.trim();
    if (!trimmed) return "";
    if (trimmed.startsWith("data:image/")) return trimmed;
    if (/^(covers\/|\.\/covers\/)/i.test(trimmed)) return trimmed;
    return safeUrl(trimmed);
  }

  function localizeRole(role) {
    if (!role) return "";
    if (lang === "en" && role.toLowerCase() === "разработка") return "development";
    if (lang === "ru" && role.toLowerCase() === "development") return "разработка";
    return role;
  }

  function cleanExcerpt(text, maxLen = 115) {
    if (!text) return "";
    const normalized = String(text).replace(/\s+/g, " ").trim();
    if (normalized.length <= maxLen) return normalized;
    return normalized.slice(0, maxLen).replace(/\s+\S*$/, "") + "…";
  }

  function applyTheme(nextTheme) {
    theme = nextTheme === "light" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.setAttribute("data-theme", theme);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute("content", theme === "light" ? "#f4f3ee" : "#090a0f");
    document.querySelectorAll("iframe.giscus-frame").forEach((iframe) => {
      try {
        iframe.contentWindow.postMessage(
          {
            giscus: {
              setConfig: { theme: theme === "light" ? "light" : "transparent_dark" },
            },
          },
          "https://giscus.app"
        );
      } catch (_) {}
    });
  }

  function statusLabel(status) {
    return (
      { released: t("released"), wip: t("wip"), jam: t("jam"), prototype: t("prototype") }[
        status
      ] ||
      status ||
      "—"
    );
  }

  function formatNum(n) {
    if (typeof n !== "number" || !isFinite(n)) return "0";
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    return String(Math.round(n));
  }

  function formatStats(stats, compact, gameId = "") {
    const s = stats && typeof stats === "object" ? stats : {};
    const items = [];
    const push = (key, icon, label) => {
      let n = Number(s[key]);
      if (!isFinite(n) || n < 0) n = 0;
      const attr = key === "siteViews" && gameId ? ` data-site-stat="${esc(gameId)}"` : "";
      items.push(
        `<span class="stat-pill"${attr} title="${esc(label)}"><i>${icon}</i><b>${esc(
          formatNum(n)
        )}</b>${compact ? "" : ` <em>${esc(label)}</em>`}</span>`
      );
    };
    push("views", "👁", t("views"));
    push("downloads", "↓", t("downloads"));
    if (Number(s.plays) > 0 && Number(s.plays) !== Number(s.views)) {
      push("plays", "▶", t("plays"));
    }
    push("siteViews", "🌐", t("siteViews"));
    if (typeof s.rating === "number" && isFinite(s.rating) && s.rating > 0) {
      items.push(
        `<span class="stat-pill" title="${esc(t("rating"))}"><i>★</i><b>${esc(
          String(s.rating)
        )}</b></span>`
      );
    }
    return `<div class="stats-row">${items.join("")}</div>`;
  }

  function updateSummaryTotals() {
    const games = state?.games || [];
    let totalViews = 0;
    let totalDownloads = 0;
    for (const g of games) {
      const st = g.stats || {};
      totalViews += Math.max(0, Number(st.views) || 0);
      totalDownloads += Math.max(0, Number(st.downloads) || 0);
    }
    if ($("sumProjects")) $("sumProjects").textContent = formatNum(games.length);
    if ($("sumViews")) $("sumViews").textContent = formatNum(totalViews);
    if ($("sumDownloads")) $("sumDownloads").textContent = formatNum(totalDownloads);
  }

  function counterKey(gameId) {
    return String(gameId || "unknown")
      .replace(/[^a-z0-9_-]/gi, "-")
      .slice(0, 48);
  }

  async function counterGet(gameId) {
    try {
      const key = counterKey(gameId);
      const res = await fetch(
        `https://abacus.jasoncameron.dev/get/${COUNTER_NAMESPACE}/${encodeURIComponent(key)}`,
        { cache: "no-store" }
      );
      if (!res.ok) return 0;
      const data = await res.json();
      if (data && data.error) return 0;
      return typeof data?.value === "number" ? data.value : 0;
    } catch (_) {
      return 0;
    }
  }

  async function bumpSiteView(gameId) {
    if (viewedInSession.has(gameId)) {
      return siteViewsCache.has(gameId) ? siteViewsCache.get(gameId) : null;
    }
    viewedInSession.add(gameId);
    try {
      const key = counterKey(gameId);
      const res = await fetch(
        `https://abacus.jasoncameron.dev/hit/${COUNTER_NAMESPACE}/${encodeURIComponent(key)}`,
        { cache: "no-store" }
      );
      if (!res.ok) return null;
      const data = await res.json();
      if (typeof data?.value === "number") {
        siteViewsCache.set(gameId, data.value);
        return data.value;
      }
      return null;
    } catch (_) {
      return null;
    }
  }

  function applyCachedSiteViews() {
    for (const g of state?.games || []) {
      g.stats = g.stats || {};
      if (siteViewsCache.has(g.id)) {
        g.stats.siteViews = siteViewsCache.get(g.id);
      } else if (typeof g.stats.siteViews !== "number") {
        g.stats.siteViews = 0;
      }
    }
  }

  async function hydratePublicSiteViews() {
    const games = state?.games || [];
    if (!games.length) return;
    await Promise.all(
      games.map(async (g) => {
        const n = await counterGet(g.id);
        const val = typeof n === "number" ? n : 0;
        siteViewsCache.set(g.id, val);
        g.stats = g.stats || {};
        g.stats.siteViews = val;
      })
    );
    updateSiteViewDom();
  }

  function updateSiteViewDom(onlyId = "") {
    const selector = onlyId
      ? `[data-site-stat="${CSS.escape(onlyId)}"]`
      : "[data-site-stat]";
    document.querySelectorAll(selector).forEach((el) => {
      const gid = el.getAttribute("data-site-stat");
      const g = getGame(gid);
      if (!g) return;
      const b = el.querySelector("b");
      if (b) b.textContent = formatNum(Number(g.stats?.siteViews) || 0);
    });
  }

  function makeFallbackHtml(title, cls = "poster-fallback") {
    return `<div class="${cls}">${esc((title || "?").trim().slice(0, 1).toUpperCase() || "?")}</div>`;
  }

  function makeCoverHtml(src, title, fallbackClass = "poster-fallback") {
    const clean = safeImgSrc(src);
    if (!clean) return makeFallbackHtml(title, fallbackClass);
    return `<img src="${esc(clean)}" alt="${esc(title || "")}" loading="lazy" data-fallback-title="${esc(title || "?")}" data-fallback-class="${esc(fallbackClass)}" />`;
  }

  function wireImageFallbacks(root) {
    if (!root) return;
    root.querySelectorAll("img[data-fallback-title]").forEach((img) => {
      img.addEventListener(
        "error",
        () => {
          const title = img.getAttribute("data-fallback-title") || "?";
          const cls = img.getAttribute("data-fallback-class") || "poster-fallback";
          const wrap = document.createElement("div");
          wrap.className = cls;
          wrap.textContent = title.trim().slice(0, 1).toUpperCase() || "?";
          img.replaceWith(wrap);
        },
        { once: true }
      );
    });
    root.querySelectorAll("img[data-hide-on-error]").forEach((img) => {
      img.addEventListener(
        "error",
        () => {
          const target = img.closest("[data-hide-wrap]") || img;
          target.remove();
        },
        { once: true }
      );
    });
  }

  function uid() {
    return "g_" + Math.random().toString(36).slice(2, 10);
  }

  async function sha256(text) {
    const data = new TextEncoder().encode(text);
    const buf = await crypto.subtle.digest("SHA-256", data);
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  function getCreds() {
    try {
      const raw = localStorage.getItem(CREDS_KEY);
      if (raw) {
        const c = JSON.parse(raw);
        if (c?.username && c?.passwordHash) return c;
      }
    } catch (_) {}
    return { username: DEFAULT_USER, passwordHash: DEFAULT_PASS_HASH };
  }

  function setCreds(username, passwordHash) {
    localStorage.setItem(CREDS_KEY, JSON.stringify({ username, passwordHash }));
  }

  function loadSession() {
    try {
      return sessionStorage.getItem(SESSION_KEY) === "1";
    } catch (_) {
      return false;
    }
  }

  function setSession(on) {
    try {
      if (on) sessionStorage.setItem(SESSION_KEY, "1");
      else sessionStorage.removeItem(SESSION_KEY);
    } catch (_) {}
    isAdmin = !!on;
    updateAuthUI();
  }

  function isValidPortfolio(data) {
    return data && data.profile && Array.isArray(data.games);
  }

  function loadDraft() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!isValidPortfolio(parsed)) return null;
      if (parsed.games.length === 0 && published?.games?.length) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return parsed;
    } catch (_) {
      return null;
    }
  }

  function showDraftStatus(prefixKey) {
    const sync = $("syncStatus");
    if (!sync) return;
    sync.hidden = false;
    sync.textContent =
      t(prefixKey) +
      " · " +
      new Date().toLocaleTimeString(lang === "en" ? "en-US" : "ru-RU") +
      " · " +
      t("draftHint");
  }

  function saveDraft() {
    if (!isAdmin) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    showDraftStatus("draftSaved");
  }

  function hideDropVeil() {
    dragDepth = 0;
    if (dropVeil) {
      dropVeil.hidden = true;
      dropVeil.style.display = "none";
    }
  }

  function showDropVeil() {
    if (!isAdmin || !dropVeil) return;
    dropVeil.hidden = false;
    dropVeil.style.display = "grid";
  }

  function updateAuthUI() {
    const adminNav = $("adminNav");
    const btnLogin = $("btnLogin");
    const adminBadge = $("adminBadge");
    if (adminNav) {
      adminNav.hidden = !isAdmin;
    }
    if (btnLogin) {
      btnLogin.hidden = isAdmin;
      btnLogin.style.display = isAdmin ? "none" : "";
    }
    if (adminBadge) {
      adminBadge.hidden = !isAdmin;
    }
    if (!isAdmin && $("syncStatus")) {
      $("syncStatus").hidden = true;
    }
    hideDropVeil();
  }

  function profileRole(p) {
    if (lang === "en" && p.roleEn) return p.roleEn;
    return p.role || t("roleDefault");
  }

  function profileBio(p) {
    if (lang === "en" && p.bioEn) return p.bioEn;
    return p.bio || "";
  }

  function giscusBaseAttrs() {
    try {
      const el = document.getElementById("giscusConfig");
      if (el) {
        const c = JSON.parse(el.textContent);
        if (c.repoId && c.categoryId) return c;
      }
    } catch (_) {}
    return {
      repo: "Prodebug/portfolio",
      repoId: "R_kgDOVZsDQw",
      category: "General",
      categoryId: "DIC_kwDOVZsDQ84DJxqO",
    };
  }

  function setGiscusLang(code) {
    const gLang = code === "en" ? "en" : "ru";
    document.querySelectorAll("iframe.giscus-frame").forEach((iframe) => {
      try {
        iframe.contentWindow.postMessage(
          { giscus: { setConfig: { lang: gLang } } },
          "https://giscus.app"
        );
      } catch (_) {}
    });
  }

  function mountGameGiscus(container, gameId) {
    if (!container) return;
    container.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "giscus-game";
    container.appendChild(wrap);
    const cfg = giscusBaseAttrs();
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", cfg.repo);
    script.setAttribute("data-repo-id", cfg.repoId);
    script.setAttribute("data-category", cfg.category);
    script.setAttribute("data-category-id", cfg.categoryId);
    script.setAttribute("data-mapping", "specific");
    script.setAttribute("data-term", "game-" + gameId);
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", theme === "light" ? "light" : "transparent_dark");
    script.setAttribute("data-lang", lang === "en" ? "en" : "ru");
    wrap.appendChild(script);
  }

  function applyStaticI18n() {
    document.documentElement.lang = lang;
    document.title = t("pageTitle");
    const nav = document.querySelector(".nav-actions");
    if (nav) nav.setAttribute("aria-label", t("navLabel"));

    const setTxt = (id, key) => {
      const el = $(id);
      if (el) el.textContent = t(key);
    };
    setTxt("navSpotlight", "navSpotlight");
    setTxt("navCatalog", "navCatalog");
    setTxt("navCraft", "navCraft");
    setTxt("mobNavSpotlight", "navSpotlight");
    setTxt("mobNavCatalog", "navCatalog");
    setTxt("mobNavCraft", "navCraft");
    setTxt("adminRibbonTitle", "adminRibbonTitle");
    setTxt("btnProfile", "profile");
    setTxt("btnExport", "export");
    setTxt("importLabel", "import");
    setTxt("btnAdd", "addGame");
    setTxt("btnLogout", "logout");
    setTxt("btnLogin", "login");
    setTxt("btnExplore", "btnExplore");
    setTxt("btnRandom", "btnRandom");
    setTxt("lblQuickLaunch", "lblQuickLaunch");
    setTxt("lblQuickHint", "lblQuickHint");
    setTxt("lblSpotlightKicker", "lblSpotlightKicker");
    setTxt("lblSpotlight", "lblSpotlight");
    setTxt("lblCatalogKicker", "lblCatalogKicker");
    setTxt("lblCatalog", "lblCatalog");
    setTxt("lblCraft", "lblCraft");
    setTxt("craftHeading", "craftHeading");
    setTxt("craftDesc", "craftDesc");
    setTxt("noteKicker", "noteKicker");
    setTxt("noteText", "noteText");
    setTxt("backTop", "backTop");
    setTxt("lblSumProjects", "sumProjects");
    setTxt("lblSumViews", "sumViews");
    setTxt("lblSumDownloads", "sumDownloads");
    setTxt("emptyText", "empty");
    setTxt("btnResetFilters", "resetFilters");
    setTxt("btnLightboxClose", "close");

    if ($("btnTheme")) {
      $("btnTheme").title = t("themeTitle");
      $("btnTheme").setAttribute("aria-label", t("themeTitle"));
    }
    if ($("btnMobileMenu")) $("btnMobileMenu").setAttribute("aria-label", t("menuLabel"));
    if ($("btnClearSearch")) $("btnClearSearch").setAttribute("aria-label", t("clearSearch"));
    if ($("btnSpotPrev")) $("btnSpotPrev").setAttribute("aria-label", t("prevProject"));
    if ($("btnSpotNext")) $("btnSpotNext").setAttribute("aria-label", t("nextProject"));
    if ($("btnLightboxPrev")) $("btnLightboxPrev").setAttribute("aria-label", t("prevFrame"));
    if ($("btnLightboxNext")) $("btnLightboxNext").setAttribute("aria-label", t("nextFrame"));

    const sortSel = $("sortSelect");
    if (sortSel) {
      sortSel.setAttribute("aria-label", t("sortLabel"));
      const map = {
        featured: "sortFeatured",
        views: "sortViews",
        downloads: "sortDownloads",
        year: "sortYear",
      };
      [...sortSel.options].forEach((opt) => {
        if (map[opt.value]) opt.textContent = t(map[opt.value]);
      });
    }

    if ($("btnLogin")) $("btnLogin").title = t("loginTitle");
    if ($("search")) $("search").placeholder = t("search");
    if ($("adminBadge")) $("adminBadge").textContent = t("adminBadge");
    const dropP = dropVeil?.querySelector("p");
    if (dropP) dropP.textContent = t("drop");

    const updatedEl = $("syncUpdated");
    if (updatedEl) {
      updatedEl.textContent = state?.updatedAt
        ? t("updatedPrefix") +
          new Date(state.updatedAt).toLocaleString(lang === "en" ? "en-US" : "ru-RU", {
            dateStyle: "medium",
            timeStyle: "short",
          })
        : "";
    }

    const foot = $("footerText");
    if (foot) {
      foot.innerHTML =
        t("foot") +
        ' <a href="https://muov.itch.io/" target="_blank" rel="noopener">muov.itch.io</a> · ' +
        t("footSync");
    }

    document.querySelectorAll(".lang-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.lang === lang);
    });
    setGiscusLang(lang);
  }

  function setLang(next) {
    lang = next === "en" ? "en" : "ru";
    localStorage.setItem(LANG_KEY, lang);
    renderAll();
  }

  function matchesSearchAndTag(g) {
    if (tagFilter) {
      const tf = tagFilter.toLowerCase();
      const bag = [
        ...(g.tags || []),
        ...(g.genres || []),
        ...(g.platforms || []),
        g.role || "",
      ].map((x) => String(x).toLowerCase());
      if (!bag.some((x) => x === tf || x.includes(tf))) return false;
    }
    if (query) {
      const q = query.toLowerCase();
      const hay = [
        g.title,
        g.tagline,
        g.description,
        g.role,
        g.year != null ? String(g.year) : "",
        ...(g.genres || []),
        ...(g.tags || []),
        ...(g.platforms || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }

  function visibleGames() {
    let list = (state?.games || []).filter(matchesSearchAndTag);
    if (filter !== "all") {
      list = list.filter((g) => g.status === filter);
    }
    if (sortMode === "views") {
      list.sort((a, b) => (Number(b.stats?.views) || 0) - (Number(a.stats?.views) || 0));
    } else if (sortMode === "downloads") {
      list.sort(
        (a, b) => (Number(b.stats?.downloads) || 0) - (Number(a.stats?.downloads) || 0)
      );
    } else if (sortMode === "year") {
      list.sort((a, b) => (Number(b.year) || 0) - (Number(a.year) || 0));
    } else {
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return list;
  }

  function updateFilterUI() {
    const baseList = (state?.games || []).filter(matchesSearchAndTag);
    const counts = { all: baseList.length, released: 0, wip: 0, jam: 0, prototype: 0 };
    for (const g of baseList) {
      if (g.status && counts[g.status] != null) counts[g.status]++;
    }
    document.querySelectorAll("#filters .pill").forEach((chip) => {
      const f = chip.getAttribute("data-filter");
      const labelMap = {
        all: t("all"),
        released: t("released"),
        wip: t("wip"),
        jam: t("jam"),
        prototype: t("prototype"),
      };
      const label = labelMap[f] || f;
      const count = counts[f] ?? 0;
      chip.innerHTML = `${esc(label)} <span class="pill-count">${count}</span>`;
      chip.classList.toggle("active", filter === f);
    });

    const tagChip = $("activeTagChip");
    if (tagChip) {
      tagChip.hidden = !tagFilter;
      if (tagFilter) tagChip.textContent = `${t("tagFilterPrefix")}${tagFilter} ×`;
    }
    if ($("btnClearSearch")) {
      $("btnClearSearch").hidden = !query;
    }
  }

  function renderHero() {
    const p = state.profile || {};
    $("brandName").textContent = p.name || "Muov";
    $("brandRole").textContent = profileRole(p);
    $("heroTitle").textContent = p.name || "Muov";
    $("heroBio").textContent = profileBio(p);
    $("heroCity").textContent = p.city || "itch.io · открыт к идеям";
    $("heroLinks").innerHTML = (p.links || [])
      .filter((l) => safeUrl(l.url))
      .map(
        (l) =>
          `<a href="${esc(safeUrl(l.url))}" target="_blank" rel="noopener">${esc(
            l.label || l.url
          )}</a>`
      )
      .join("");

    const strip = $("heroStrip");
    if (strip) {
      const games = (state.games || []).slice(0, 6);
      strip.innerHTML = games
        .map(
          (g) =>
            `<button type="button" class="strip-thumb" data-open="${esc(g.id)}" title="${esc(
              g.title
            )}" aria-label="${esc(g.title)}">${makeCoverHtml(
              g.cover,
              g.title,
              "strip-thumb-fallback"
            )}</button>`
        )
        .join("");
      wireImageFallbacks(strip);
    }

    if ($("btnRandom")) {
      $("btnRandom").disabled = !(state.games || []).length;
    }
    updateSummaryTotals();
  }

  function getSpotlightList() {
    const games = state?.games || [];
    if (!games.length) return [];
    const featured = games.filter((g) => g.featured);
    return featured.length ? featured : [games[0]];
  }

  function renderSpotlight() {
    const section = $("featured");
    const host = $("spotlightHost");
    const controls = $("spotlightControls");
    const counter = $("spotCounter");
    if (!section || !host) return;

    const list = getSpotlightList();
    if (!list.length) {
      section.hidden = true;
      return;
    }
    section.hidden = false;
    spotlightIndex = ((spotlightIndex % list.length) + list.length) % list.length;
    const spot = list[spotlightIndex];

    if (controls) controls.hidden = list.length <= 1;
    if (counter) counter.textContent = `${spotlightIndex + 1} / ${list.length}`;

    const play = safeUrl(spot.playUrl);
    const stamp = statusLabel(spot.status);
    const allMedia = [
      ...(safeImgSrc(spot.cover) ? [safeImgSrc(spot.cover)] : []),
      ...(spot.shots || []).map(safeImgSrc).filter(Boolean),
    ].filter((v, i, arr) => arr.indexOf(v) === i);

    const tags = [];
    if (spot.year) tags.push(`<span>${esc(spot.year)}</span>`);
    (spot.genres || []).slice(0, 3).forEach((x) => tags.push(`<span>${esc(x)}</span>`));
    (spot.platforms || []).slice(0, 3).forEach((x) => tags.push(`<span>${esc(x)}</span>`));

    const thumbsHtml =
      allMedia.length > 1
        ? `<div class="spotlight-thumbs">${allMedia
            .slice(0, 5)
            .map(
              (src, idx) =>
                `<button type="button" class="spot-mini ${idx === 0 ? "active" : ""}" data-spot-src="${esc(
                  src
                )}" aria-label="Preview ${idx + 1}"><img src="${esc(src)}" alt="" data-hide-on-error="1" data-hide-wrap="1" /></button>`
            )
            .join("")}</div>`
        : "";

    host.innerHTML = `
      <div class="spotlight-media-col">
        <div class="spotlight-media" id="spotMainMedia">
          ${makeCoverHtml(spot.cover, spot.title)}
          ${spot.status ? `<span class="status-tag ${esc(spot.status)}">${esc(stamp)}</span>` : ""}
        </div>
        ${thumbsHtml}
      </div>
      <div class="spotlight-info">
        <h3 class="spotlight-title">${esc(spot.title)}</h3>
        <p class="spotlight-desc">${esc(spot.tagline || cleanExcerpt(spot.description, 190) || t("noDesc"))}</p>
        <div class="tags-row">${tags.join("")}</div>
        ${formatStats(spot.stats, false, spot.id)}
        <div class="spotlight-actions">
          ${play ? `<a class="btn primary" href="${esc(play)}" target="_blank" rel="noopener">${esc(t("play"))}</a>` : ""}
          <button type="button" class="btn outline" data-open="${esc(spot.id)}">${esc(t("details"))}</button>
        </div>
      </div>`;

    wireImageFallbacks(host);

    host.querySelectorAll(".spot-mini").forEach((btn) => {
      btn.addEventListener("click", () => {
        const nextSrc = btn.getAttribute("data-spot-src");
        const mediaBox = host.querySelector("#spotMainMedia");
        if (!nextSrc || !mediaBox) return;
        host.querySelectorAll(".spot-mini").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const existingImg = mediaBox.querySelector("img");
        if (existingImg) {
          existingImg.src = nextSrc;
        } else {
          const fallback = mediaBox.querySelector(".poster-fallback");
          if (fallback) {
            const img = document.createElement("img");
            img.src = nextSrc;
            img.alt = spot.title || "";
            fallback.replaceWith(img);
          }
        }
      });
    });
  }

  function renderGrid() {
    updateFilterUI();
    const list = visibleGames();
    if ($("visibleCount")) $("visibleCount").textContent = String(list.length);
    grid.innerHTML = "";
    empty.hidden = list.length > 0;

    for (const g of list) {
      const art = document.createElement("article");
      art.className = "project-card";
      art.setAttribute("role", "listitem");

      const stamp = statusLabel(g.status);
      const isWeb = (g.platforms || []).some((p) => String(p).toLowerCase() === "web");
      const summary = g.tagline || cleanExcerpt(g.description, 110);

      const chipValues = [
        ...(g.genres || []).slice(0, 2),
        ...(g.platforms || []).slice(0, 2),
        ...(g.tags || []).slice(0, 1),
      ].filter((v, i, arr) => arr.indexOf(v) === i);

      const chipsHtml = chipValues
        .slice(0, 4)
        .map(
          (val) =>
            `<button type="button" class="tag-chip" data-tag-filter="${esc(val)}">${esc(
              val
            )}</button>`
        )
        .join("");

      const statsHtml = formatStats(g.stats, true, g.id);

      art.innerHTML = `
        <button type="button" class="card-open" data-open="${esc(g.id)}" aria-label="${esc(g.title)}">
          <div class="card-cover">
            ${makeCoverHtml(g.cover, g.title)}
            ${isWeb ? `<span class="web-badge">${esc(t("webPlayable"))}</span>` : ""}
            ${g.status ? `<span class="status-tag ${esc(g.status)}">${esc(stamp)}</span>` : ""}
          </div>
          <div class="card-body">
            <div class="card-title-row">
              <h3 class="card-title">${esc(g.title)}</h3>
              ${g.year ? `<span class="card-year">${esc(g.year)}</span>` : ""}
            </div>
            ${summary ? `<p class="card-tagline">${esc(summary)}</p>` : ""}
          </div>
        </button>
        ${
          isAdmin
            ? `<button type="button" class="card-quick-edit" data-edit="${esc(g.id)}" title="${esc(
                t("edit")
              )}">✎ ${esc(t("edit"))}</button>`
            : ""
        }
        <div class="card-footer-meta">
          ${chipsHtml ? `<div class="tags-row">${chipsHtml}</div>` : ""}
          ${statsHtml}
        </div>`;

      grid.appendChild(art);
    }
    wireImageFallbacks(grid);
    updateSummaryTotals();
  }

  function renderAll() {
    applyStaticI18n();
    renderHero();
    renderSpotlight();
    renderGrid();
    updateAuthUI();
  }

  function openLightbox(urls, startIdx = 0) {
    if (!lightbox || !urls.length) return;
    lightboxItems = urls;
    lightboxIdx = ((startIdx % urls.length) + urls.length) % urls.length;
    updateLightboxFrame();
    if (!lightbox.open) lightbox.showModal();
  }

  function updateLightboxFrame() {
    const img = $("lightboxImg");
    const counter = $("lightboxCounter");
    const prev = $("btnLightboxPrev");
    const next = $("btnLightboxNext");
    if (!img || !lightboxItems.length) return;
    img.src = lightboxItems[lightboxIdx];
    if (counter) counter.textContent = `${lightboxIdx + 1} / ${lightboxItems.length}`;
    if (prev) prev.hidden = lightboxItems.length <= 1;
    if (next) next.hidden = lightboxItems.length <= 1;
  }

  function closeLightbox() {
    if (lightbox?.open) lightbox.close();
  }

  function openPanel(next) {
    if ((next.mode === "edit" || next.mode === "create" || next.mode === "profile") && !isAdmin) {
      return;
    }
    panel = next;
    dialogBody.innerHTML = "";
    if (panel.mode === "view") renderView(panel.gameId);
    else if (panel.mode === "edit" || panel.mode === "create") renderForm(panel);
    else if (panel.mode === "profile") renderProfileForm();
    else if (panel.mode === "auth") renderAuth();
    else if (panel.mode === "confirm") renderConfirm(panel);
    if (!dialog.open) dialog.showModal();
  }

  function closePanel() {
    panel = null;
    if (dialog.open) dialog.close();
    dialogBody.innerHTML = "";
  }

  function getGame(id) {
    return (state.games || []).find((g) => g.id === id);
  }

  function renderConfirm({ title, message, onConfirm, onCancel }) {
    dialogBody.innerHTML = [
      '<div class="sheet-head">',
      `<h2>${esc(title || t("confirmAction"))}</h2>`,
      `<button type="button" class="btn ghost sm" data-act="cancel">${esc(t("close"))}</button>`,
      "</div>",
      `<p class="confirm-copy">${esc(message)}</p>`,
      '<div class="form-footer">',
      `<button type="button" class="btn ghost" data-act="cancel">${esc(t("cancel"))}</button>`,
      `<button type="button" class="btn danger" data-act="ok">${esc(t("confirmBtn"))}</button>`,
      "</div>",
    ].join("");
    dialogBody.querySelectorAll('[data-act="cancel"]').forEach((btn) => {
      btn.onclick = () => {
        if (onCancel) onCancel();
        else closePanel();
      };
    });
    dialogBody.querySelector('[data-act="ok"]').onclick = () => {
      onConfirm();
    };
  }

  function renderAuth() {
    const creds = getCreds();
    const isCustom = !!localStorage.getItem(CREDS_KEY);
    dialogBody.innerHTML = [
      '<div class="sheet-head">',
      `<h2>${esc(t("ownerLogin"))}</h2>`,
      `<button type="button" class="btn ghost sm" data-act="close">${esc(t("close"))}</button>`,
      "</div>",
      '<form id="authForm" class="form-grid auth-box">',
      `<label class="field">${esc(t("username"))}<input name="username" autocomplete="username" required value="${
        isCustom ? "" : esc(creds.username)
      }" /></label>`,
      `<label class="field">${esc(t("password"))}<input name="password" type="password" autocomplete="current-password" required /></label>`,
      '<p class="auth-error" id="authError"></p>',
      '<div class="form-footer" style="justify-content:stretch">',
      `<button type="submit" class="btn primary" style="width:100%">${esc(t("signIn"))}</button>`,
      "</div>",
      `<p class="hint">${isCustom ? t("customHint") : t("defaultHint")}</p>`,
      `<p class="hint">${esc(t("guestHint"))}</p>`,
      `<button type="button" class="btn ghost" id="btnRegister" style="width:100%;margin-top:0.25rem">${esc(
        t("changePass")
      )}</button>`,
      "</form>",
    ].join("");
    dialogBody.querySelector('[data-act="close"]').onclick = closePanel;
    dialogBody.querySelector("#authForm").onsubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const user = String(fd.get("username") || "").trim();
      const hash = await sha256(String(fd.get("password") || ""));
      const c = getCreds();
      const err = dialogBody.querySelector("#authError");
      if (user === c.username && hash === c.passwordHash) {
        setSession(true);
        const draft = loadDraft();
        state = draft || structuredClone(published);
        applyCachedSiteViews();
        closePanel();
        renderAll();
        if (draft) showDraftStatus("draftActive");
      } else if (err) {
        err.textContent = t("badLogin");
      }
    };
    dialogBody.querySelector("#btnRegister").onclick = () => renderRegister();
  }

  function renderRegister() {
    dialogBody.innerHTML = [
      '<div class="sheet-head">',
      `<h2>${esc(t("changeAccess"))}</h2>`,
      `<button type="button" class="btn ghost sm" data-act="close">${esc(t("close"))}</button>`,
      "</div>",
      '<form id="regForm" class="form-grid auth-box">',
      `<label class="field">${esc(t("currentPass"))}<input name="current" type="password" required /></label>`,
      `<label class="field">${esc(t("newUser"))}<input name="username" required value="${esc(
        getCreds().username
      )}" /></label>`,
      `<label class="field">${esc(t("newPass"))}<input name="password" type="password" required minlength="6" /></label>`,
      `<label class="field">${esc(t("newPass2"))}<input name="password2" type="password" required minlength="6" /></label>`,
      '<p class="auth-error" id="authError"></p>',
      '<div class="form-footer">',
      `<button type="button" class="btn ghost" data-act="back">${esc(t("back"))}</button>`,
      `<button type="submit" class="btn primary">${esc(t("save"))}</button>`,
      "</div>",
      `<p class="hint">${esc(t("passHint"))}</p>`,
      "</form>",
    ].join("");
    dialogBody.querySelector('[data-act="close"]').onclick = closePanel;
    dialogBody.querySelector('[data-act="back"]').onclick = () => renderAuth();
    dialogBody.querySelector("#regForm").onsubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const err = dialogBody.querySelector("#authError");
      if ((await sha256(String(fd.get("current") || ""))) !== getCreds().passwordHash) {
        err.textContent = t("badCurrent");
        return;
      }
      const p1 = String(fd.get("password") || "");
      if (p1 !== String(fd.get("password2") || "")) {
        err.textContent = t("passMismatch");
        return;
      }
      if (p1.length < 6) {
        err.textContent = t("passShort");
        return;
      }
      setCreds(String(fd.get("username") || "").trim() || "muov", await sha256(p1));
      setSession(true);
      const draft = loadDraft();
      state = draft || structuredClone(published);
      applyCachedSiteViews();
      closePanel();
      toast(t("passUpdated"), "ok");
      renderAll();
    };
  }

  function renderView(id) {
    const g = getGame(id);
    if (!g) {
      closePanel();
      return;
    }
    const play = safeUrl(g.playUrl);
    const trailer = safeUrl(g.trailerUrl);
    const repo = safeUrl(g.repoUrl);
    const gallery = [
      ...(safeImgSrc(g.cover) ? [safeImgSrc(g.cover)] : []),
      ...(g.shots || []).map(safeImgSrc).filter(Boolean),
    ].filter((v, i, arr) => arr.indexOf(v) === i);

    const coverBlock = g.cover
      ? `<div class="view-poster" data-gallery-idx="0">${makeCoverHtml(g.cover, g.title)}</div>`
      : "";

    const shotsHtml = (g.shots || []).length
      ? `<div class="shots">${(g.shots || [])
          .map((s) => {
            const clean = safeImgSrc(s);
            if (!clean) return "";
            const idx = gallery.indexOf(clean);
            return `<button type="button" class="shot-btn" data-hide-wrap="1" data-gallery-idx="${
              idx >= 0 ? idx : 0
            }"><img src="${esc(clean)}" alt="" loading="lazy" data-hide-on-error="1" /></button>`;
          })
          .join("")}</div>`
      : "";

    dialogBody.innerHTML = [
      '<div class="sheet-head">',
      `<div><h2>${esc(g.title)}</h2>${
        g.tagline ? `<p class="sheet-subtitle">${esc(g.tagline)}</p>` : ""
      }</div>`,
      '<div class="sheet-actions">',
      isAdmin ? `<button type="button" class="btn sm" data-act="edit">${esc(t("edit"))}</button>` : "",
      `<button type="button" class="btn ghost sm" data-act="close">${esc(t("close"))}</button>`,
      "</div></div>",
      `<div class="view-layout ${g.cover ? "has-poster" : ""}">`,
      coverBlock,
      "<div>",
      `<p class="view-description">${esc(g.description || t("noDesc"))}</p>`,
      '<div class="tags-row" style="margin:0 0 1rem">',
      `<span>${esc(statusLabel(g.status))}</span>`,
      g.year ? `<span>${esc(g.year)}</span>` : "",
      g.role ? `<span>${esc(localizeRole(g.role))}</span>` : "",
      (g.genres || []).map((x) => `<span>${esc(x)}</span>`).join(""),
      (g.platforms || []).map((x) => `<span>${esc(x)}</span>`).join(""),
      (g.tags || []).map((x) => `<span>${esc(x)}</span>`).join(""),
      "</div>",
      `<div id="gameStatsBar" class="stats-bar">${formatStats(g.stats, false, g.id)}</div>`,
      '<div class="sheet-actions">',
      play
        ? `<a class="btn primary" href="${esc(play)}" target="_blank" rel="noopener">${esc(
            t("play")
          )}</a>`
        : "",
      trailer
        ? `<a class="btn" href="${esc(trailer)}" target="_blank" rel="noopener">${esc(
            t("trailer")
          )}</a>`
        : "",
      repo
        ? `<a class="btn" href="${esc(repo)}" target="_blank" rel="noopener">${esc(
            t("repo")
          )}</a>`
        : "",
      isAdmin
        ? `<button type="button" class="btn danger" data-act="delete">${esc(
            t("delete")
          )}</button>`
        : "",
      "</div>",
      shotsHtml,
      "</div></div>",
      '<div class="game-comments">',
      `<h3 class="game-comments-title">${esc(t("gameComments"))}</h3>`,
      `<p class="comments-hint">${esc(t("gameCommentsHint"))}</p>`,
      '<div id="gameGiscusHost"></div>',
      "</div>",
    ].join("");

    wireImageFallbacks(dialogBody);

    dialogBody.querySelectorAll("[data-gallery-idx]").forEach((el) => {
      el.addEventListener("click", () => {
        if (!gallery.length) return;
        const idx = Number(el.getAttribute("data-gallery-idx")) || 0;
        openLightbox(gallery, idx);
      });
    });

    dialogBody.querySelector('[data-act="close"]').onclick = closePanel;
    const editBtn = dialogBody.querySelector('[data-act="edit"]');
    if (editBtn) editBtn.onclick = () => openPanel({ mode: "edit", gameId: id });
    const delBtn = dialogBody.querySelector('[data-act="delete"]');
    if (delBtn) {
      delBtn.onclick = () => {
        const msg =
          typeof t("deleteConfirm") === "function"
            ? t("deleteConfirm")(g.title)
            : `Delete ${g.title}?`;
        openPanel({
          mode: "confirm",
          title: t("delete"),
          message: msg,
          onCancel: () => openPanel({ mode: "view", gameId: id }),
          onConfirm: () => {
            state.games = state.games.filter((x) => x.id !== id);
            saveDraft();
            closePanel();
            renderHero();
            renderSpotlight();
            renderGrid();
            toast(t("draftSaved"), "ok");
          },
        });
      };
    }

    mountGameGiscus(dialogBody.querySelector("#gameGiscusHost"), id);
    bumpSiteView(id).then((n) => {
      if (n == null) return;
      const game = getGame(id);
      if (!game) return;
      game.stats = game.stats || {};
      game.stats.siteViews = n;
      updateSiteViewDom(id);
    });
  }

  function blankGame() {
    return {
      id: uid(),
      title: "",
      tagline: "",
      year: new Date().getFullYear(),
      role: "разработка",
      status: "wip",
      genres: [],
      platforms: [],
      description: "",
      cover: "",
      shots: [],
      playUrl: "",
      trailerUrl: "",
      repoUrl: "",
      featured: false,
      tags: [],
      stats: { downloads: 0, views: 0, plays: 0 },
    };
  }

  function fileToDataUrl(file, maxW = 1280, quality = 0.84) {
    return new Promise((resolve, reject) => {
      if (!file?.type.startsWith("image/")) return reject(new Error("image"));
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const scale = Math.min(1, maxW / img.width);
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(img.width * scale));
          canvas.height = Math.max(1, Math.round(img.height * scale));
          canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL("image/webp", quality);
          resolve(
            dataUrl.startsWith("data:image/webp")
              ? dataUrl
              : canvas.toDataURL("image/png")
          );
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function renderForm(p) {
    const isNew = p.mode === "create";
    const found = isNew ? blankGame() : getGame(p.gameId);
    if (!found) {
      closePanel();
      return;
    }
    const g = structuredClone(found);
    let draftCover = g.cover || "";
    let draftShots = Array.isArray(g.shots) ? [...g.shots] : [];
    const statuses = ["released", "wip", "jam", "prototype"];

    dialogBody.innerHTML = [
      '<div class="sheet-head">',
      `<h2>${esc(isNew ? t("newGame") : t("editing"))}</h2>`,
      `<button type="button" class="btn ghost sm" data-act="close">${esc(t("close"))}</button>`,
      "</div>",
      '<form id="gameForm" class="form-grid">',
      `<label class="field">${esc(t("title"))}<input name="title" required value="${esc(
        g.title
      )}" /></label>`,
      `<label class="field">${esc(t("tagline"))}<input name="tagline" value="${esc(
        g.tagline
      )}" /></label>`,
      '<div class="form-grid two">',
      `<label class="field">${esc(t("year"))}<input name="year" type="number" value="${esc(
        g.year || ""
      )}" /></label>`,
      `<label class="field">${esc(t("role"))}<input name="role" value="${esc(
        g.role || ""
      )}" /></label>`,
      "</div>",
      '<div class="form-grid two">',
      `<label class="field">${esc(t("status"))}<select name="status">${statuses
        .map(
          (k) =>
            `<option value="${k}" ${g.status === k ? "selected" : ""}>${esc(
              statusLabel(k)
            )}</option>`
        )
        .join("")}</select></label>`,
      `<label class="field">${esc(t("genres"))}<input name="genres" value="${esc(
        (g.genres || []).join(", ")
      )}" /></label>`,
      "</div>",
      '<div class="form-grid two">',
      `<label class="field">${esc(t("platforms"))}<input name="platforms" value="${esc(
        (g.platforms || []).join(", ")
      )}" /></label>`,
      `<label class="field">${esc(t("tags"))}<input name="tags" value="${esc(
        (g.tags || []).join(", ")
      )}" /></label>`,
      "</div>",
      `<label class="field">${esc(t("description"))}<textarea name="description">${esc(
        g.description || ""
      )}</textarea></label>`,
      `<label class="field">${esc(t("playUrl"))}<input name="playUrl" type="url" value="${esc(
        g.playUrl || ""
      )}" /></label>`,
      '<div class="form-grid two">',
      `<label class="field">${esc(t("trailerUrl"))}<input name="trailerUrl" type="url" value="${esc(
        g.trailerUrl || ""
      )}" /></label>`,
      `<label class="field">${esc(t("repoUrl"))}<input name="repoUrl" type="url" value="${esc(
        g.repoUrl || ""
      )}" /></label>`,
      "</div>",
      '<div class="media-editor-box">',
      `<label class="field">${esc(t("cover"))}<input name="coverUrl" value="${esc(
        draftCover
      )}" placeholder="${esc(t("coverUrlPlaceholder"))}" /></label>`,
      '<div class="media-preview-row" id="coverPreviewRow"></div>',
      '<div class="form-grid two">',
      `<input name="coverFile" type="file" accept="image/*" />`,
      `<button type="button" class="btn ghost sm danger" id="btnRemoveCover">${esc(
        t("removeCover")
      )}</button>`,
      "</div></div>",
      '<div class="media-editor-box">',
      `<span class="field" style="font-size:0.78rem;font-weight:700;color:var(--muted)">${esc(
        t("shots")
      )}</span>`,
      '<div class="media-preview-row" id="shotsPreviewRow"></div>',
      '<div class="form-grid two">',
      `<input name="shotsFile" type="file" accept="image/*" multiple />`,
      `<div style="display:flex;gap:0.4rem"><input id="shotUrlInput" placeholder="${esc(
        t("addShotUrlPlaceholder")
      )}" style="flex:1;background:var(--bg-soft);border:1px solid var(--line);border-radius:10px;padding:0.42rem 0.7rem" /><button type="button" class="btn outline sm" id="btnAddShotUrl">${esc(
        t("addShotBtn")
      )}</button></div>`,
      "</div></div>",
      '<div class="form-grid two">',
      `<label class="field">${esc(
        t("downloads")
      )}<input name="downloads" type="number" min="0" step="1" value="${esc(
        g.stats && g.stats.downloads != null ? g.stats.downloads : ""
      )}" placeholder="0" /></label>`,
      `<label class="field">${esc(
        t("views")
      )}<input name="views" type="number" min="0" step="1" value="${esc(
        g.stats && g.stats.views != null ? g.stats.views : ""
      )}" placeholder="0" /></label>`,
      "</div>",
      '<div class="form-grid two">',
      `<label class="field">${esc(
        t("plays")
      )}<input name="plays" type="number" min="0" step="1" value="${esc(
        g.stats && g.stats.plays != null ? g.stats.plays : ""
      )}" placeholder="0" /></label>`,
      `<label class="field">${esc(
        t("rating")
      )}<input name="rating" type="number" min="0" max="5" step="0.1" value="${esc(
        g.stats && g.stats.rating != null ? g.stats.rating : ""
      )}" placeholder="5.0" /></label>`,
      "</div>",
      `<label class="check-row"><input type="checkbox" name="featured" ${
        g.featured ? "checked" : ""
      } /> ${esc(t("featured"))}</label>`,
      '<div class="form-footer">',
      `<button type="button" class="btn ghost" data-act="close">${esc(t("cancel"))}</button>`,
      `<button type="submit" class="btn primary">${esc(t("save"))}</button>`,
      "</div>",
      "</form>",
    ].join("");

    const form = dialogBody.querySelector("#gameForm");
    const coverUrlInput = form.querySelector('[name="coverUrl"]');
    const coverFileInput = form.querySelector('[name="coverFile"]');
    const shotsFileInput = form.querySelector('[name="shotsFile"]');
    const featuredInput = form.querySelector('[name="featured"]');
    const coverPreviewRow = dialogBody.querySelector("#coverPreviewRow");
    const shotsPreviewRow = dialogBody.querySelector("#shotsPreviewRow");

    function renderMediaPreviews() {
      const cleanCover = safeImgSrc(draftCover);
      coverPreviewRow.innerHTML = cleanCover
        ? `<div class="media-thumb"><img src="${esc(cleanCover)}" alt="" /></div>`
        : "";
      shotsPreviewRow.innerHTML = draftShots
        .map((s, idx) => {
          const clean = safeImgSrc(s);
          if (!clean) return "";
          return `<div class="media-thumb"><img src="${esc(
            clean
          )}" alt="" /><button type="button" class="media-thumb-del" data-del-shot="${idx}" aria-label="Remove">×</button></div>`;
        })
        .join("");
      shotsPreviewRow.querySelectorAll("[data-del-shot]").forEach((btn) => {
        btn.onclick = () => {
          const idx = Number(btn.getAttribute("data-del-shot"));
          draftShots.splice(idx, 1);
          renderMediaPreviews();
        };
      });
    }

    renderMediaPreviews();

    coverUrlInput?.addEventListener("input", () => {
      draftCover = coverUrlInput.value.trim();
      renderMediaPreviews();
    });

    dialogBody.querySelector("#btnRemoveCover").onclick = () => {
      draftCover = "";
      if (coverUrlInput) coverUrlInput.value = "";
      if (coverFileInput) coverFileInput.value = "";
      renderMediaPreviews();
    };

    dialogBody.querySelector("#btnAddShotUrl").onclick = () => {
      const inp = dialogBody.querySelector("#shotUrlInput");
      const val = inp.value.trim();
      if (!val || draftShots.length >= 4) return;
      draftShots.push(val);
      inp.value = "";
      renderMediaPreviews();
    };

    dialogBody.querySelectorAll('[data-act="close"]').forEach((b) => {
      b.onclick = closePanel;
    });

    form.onsubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const parseComma = (val) =>
        String(val || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      const clampInt = (val) => {
        const n = Number(val);
        return val === "" || val == null || !isFinite(n) ? 0 : Math.max(0, Math.round(n));
      };

      const next = {
        ...g,
        title: String(fd.get("title") || "").trim(),
        tagline: String(fd.get("tagline") || "").trim(),
        year: Number(fd.get("year")) || null,
        role: String(fd.get("role") || "").trim(),
        status: String(fd.get("status") || "wip"),
        genres: parseComma(fd.get("genres")),
        platforms: parseComma(fd.get("platforms")),
        tags: parseComma(fd.get("tags")),
        description: String(fd.get("description") || "").trim(),
        playUrl: String(fd.get("playUrl") || "").trim(),
        trailerUrl: String(fd.get("trailerUrl") || "").trim(),
        repoUrl: String(fd.get("repoUrl") || "").trim(),
        cover: draftCover,
        shots: [...draftShots].slice(0, 4),
        featured: !!featuredInput?.checked,
        stats: {
          ...(g.stats || {}),
          downloads: clampInt(fd.get("downloads")),
          views: clampInt(fd.get("views")),
          plays: clampInt(fd.get("plays")),
        },
      };

      const rawRating = fd.get("rating");
      if (rawRating !== "" && rawRating != null && isFinite(Number(rawRating))) {
        next.stats.rating = Math.min(5, Math.max(0, Number(rawRating)));
      } else {
        delete next.stats.rating;
      }

      try {
        const coverFile = coverFileInput?.files?.item(0);
        if (coverFile) next.cover = await fileToDataUrl(coverFile, 1280, 0.84);
      } catch (_) {
        toast(t("coverFail"), "err");
        return;
      }

      const shotFiles = [...(shotsFileInput?.files || [])];
      if (shotFiles.length) {
        try {
          const uploaded = await Promise.all(
            shotFiles.slice(0, 4).map((f) => fileToDataUrl(f, 960, 0.8))
          );
          next.shots = [...next.shots, ...uploaded].slice(0, 4);
        } catch (_) {
          toast(t("shotsFail"), "err");
          return;
        }
      }

      if (next.featured) {
        state.games.forEach((x) => {
          if (x.id !== next.id) x.featured = false;
        });
      }
      if (isNew) state.games.unshift(next);
      else {
        const i = state.games.findIndex((x) => x.id === next.id);
        if (i >= 0) state.games[i] = next;
      }
      saveDraft();
      closePanel();
      renderHero();
      renderSpotlight();
      renderGrid();
      toast(t("draftSaved"), "ok");
    };
  }

  function renderProfileForm() {
    const p = state.profile;
    dialogBody.innerHTML = [
      '<div class="sheet-head">',
      `<h2>${esc(t("profile"))}</h2>`,
      `<button type="button" class="btn ghost sm" data-act="close">${esc(t("close"))}</button>`,
      "</div>",
      '<form id="profileForm" class="form-grid">',
      '<div class="form-grid two">',
      `<label class="field">${esc(t("name"))}<input name="name" required value="${esc(
        p.name || ""
      )}" /></label>`,
      `<label class="field">${esc(t("role"))} (RU)<input name="role" value="${esc(
        p.role || ""
      )}" /></label>`,
      "</div>",
      '<div class="form-grid two">',
      `<label class="field">${esc(t("role"))} (EN)<input name="roleEn" value="${esc(
        p.roleEn || ""
      )}" /></label>`,
      `<label class="field">${esc(t("city"))}<input name="city" value="${esc(
        p.city || ""
      )}" /></label>`,
      "</div>",
      `<label class="field">${esc(t("about"))} (RU)<textarea name="bio">${esc(
        p.bio || ""
      )}</textarea></label>`,
      `<label class="field">${esc(t("about"))} (EN)<textarea name="bioEn">${esc(
        p.bioEn || ""
      )}</textarea></label>`,
      `<label class="field">${esc(t("links"))}<textarea name="links">${esc(
        (p.links || []).map((l) => `${l.label} | ${l.url}`).join("\n")
      )}</textarea></label>`,
      '<div class="form-footer">',
      `<button type="button" class="btn ghost danger" data-act="reset">${esc(
        t("resetPublished")
      )}</button>`,
      `<button type="button" class="btn ghost" data-act="close">${esc(t("cancel"))}</button>`,
      `<button type="submit" class="btn primary">${esc(t("save"))}</button>`,
      "</div>",
      "</form>",
    ].join("");
    dialogBody.querySelectorAll('[data-act="close"]').forEach((b) => {
      b.onclick = closePanel;
    });
    dialogBody.querySelector('[data-act="reset"]').onclick = () => {
      openPanel({
        mode: "confirm",
        title: t("resetPublished"),
        message: t("resetConfirm"),
        onCancel: () => openPanel({ mode: "profile" }),
        onConfirm: () => {
          localStorage.removeItem(STORAGE_KEY);
          state = structuredClone(published);
          applyCachedSiteViews();
          closePanel();
          renderAll();
          toast(t("resetPublished"), "ok");
        },
      });
    };
    dialogBody.querySelector("#profileForm").onsubmit = (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      state.profile = {
        name: String(fd.get("name") || "").trim(),
        role: String(fd.get("role") || "").trim(),
        roleEn: String(fd.get("roleEn") || "").trim(),
        city: String(fd.get("city") || "").trim(),
        bio: String(fd.get("bio") || "").trim(),
        bioEn: String(fd.get("bioEn") || "").trim(),
        links: String(fd.get("links") || "")
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => {
            const [label, ...rest] = line.split("|");
            return { label: (label || "").trim(), url: rest.join("|").trim() };
          })
          .filter((l) => l.url),
      };
      saveDraft();
      closePanel();
      renderHero();
      toast(t("draftSaved"), "ok");
    };
  }

  function exportJson() {
    const blob = new Blob(
      [JSON.stringify({ ...state, updatedAt: new Date().toISOString() }, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }

  function importText(text) {
    if (!isAdmin) {
      toast(t("importOnly"), "err");
      return;
    }
    try {
      const data = JSON.parse(text);
      if (!isValidPortfolio(data)) throw new Error("bad");
      state = data;
      applyCachedSiteViews();
      saveDraft();
      renderAll();
      closePanel();
      toast(t("importOk"), "ok");
    } catch (_) {
      toast(t("importFail"), "err");
    }
  }

  function resetCatalogFilters() {
    filter = "all";
    tagFilter = "";
    query = "";
    if ($("search")) $("search").value = "";
    renderGrid();
  }

  function applyTagOrCraftFilter(value, scrollCatalog = false) {
    query = value;
    tagFilter = "";
    filter = "all";
    if ($("search")) $("search").value = value;
    renderGrid();
    if (scrollCatalog) {
      $("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
      toast(t("craftFiltered")(value), "ok", 2200);
    }
  }

  $("btnTheme")?.addEventListener("click", () => {
    applyTheme(theme === "light" ? "dark" : "light");
  });

  const mobileBtn = $("btnMobileMenu");
  const mobileDrawer = $("mobileDrawer");
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener("click", () => {
      const open = mobileDrawer.hidden;
      mobileDrawer.hidden = !open;
      mobileBtn.setAttribute("aria-expanded", String(open));
    });
    mobileDrawer.querySelectorAll("[data-close-drawer]").forEach((a) => {
      a.addEventListener("click", () => {
        mobileDrawer.hidden = true;
        mobileBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  $("btnRandom")?.addEventListener("click", () => {
    const games = state?.games || [];
    if (!games.length) return;
    const pick = games[Math.floor(Math.random() * games.length)];
    openPanel({ mode: "view", gameId: pick.id });
  });

  $("btnSpotPrev")?.addEventListener("click", () => {
    spotlightIndex--;
    renderSpotlight();
  });
  $("btnSpotNext")?.addEventListener("click", () => {
    spotlightIndex++;
    renderSpotlight();
  });

  $("btnLogin").onclick = () => openPanel({ mode: "auth" });
  $("btnLogout").onclick = () => {
    setSession(false);
    state = structuredClone(published);
    applyCachedSiteViews();
    renderAll();
  };
  $("btnAdd").onclick = () => isAdmin && openPanel({ mode: "create" });
  $("btnProfile").onclick = () => isAdmin && openPanel({ mode: "profile" });
  $("btnExport").onclick = () => isAdmin && exportJson();
  $("fileImport").onchange = (e) => {
    const f = e.target.files.item(0);
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => importText(String(reader.result || ""));
    reader.readAsText(f);
    e.target.value = "";
  };

  document.addEventListener("click", (e) => {
    const editBtn = e.target.closest("[data-edit]");
    if (editBtn && isAdmin) {
      openPanel({ mode: "edit", gameId: editBtn.getAttribute("data-edit") });
      return;
    }
    const tagBtn = e.target.closest("[data-tag-filter]");
    if (tagBtn) {
      const val = tagBtn.getAttribute("data-tag-filter");
      tagFilter = tagFilter === val ? "" : val;
      renderGrid();
      return;
    }
    const craftBtn = e.target.closest("[data-craft-query]");
    if (craftBtn) {
      applyTagOrCraftFilter(craftBtn.getAttribute("data-craft-query"), true);
      return;
    }
    const openBtn = e.target.closest("[data-open]");
    if (openBtn) {
      openPanel({ mode: "view", gameId: openBtn.getAttribute("data-open") });
    }
  });

  $("filters")?.addEventListener("click", (e) => {
    const chip = e.target.closest("[data-filter]");
    if (!chip) return;
    filter = chip.getAttribute("data-filter");
    renderGrid();
  });

  $("sortSelect")?.addEventListener("change", (e) => {
    sortMode = e.target.value;
    renderGrid();
  });

  $("search")?.addEventListener("input", (e) => {
    query = e.target.value.trim();
    renderGrid();
  });

  $("btnClearSearch")?.addEventListener("click", () => {
    query = "";
    if ($("search")) {
      $("search").value = "";
      $("search").focus();
    }
    renderGrid();
  });

  $("activeTagChip")?.addEventListener("click", () => {
    tagFilter = "";
    renderGrid();
  });

  $("btnResetFilters")?.addEventListener("click", resetCatalogFilters);

  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) closePanel();
  });
  dialog.addEventListener("close", () => {
    panel = null;
    dialogBody.innerHTML = "";
  });

  if (lightbox) {
    $("btnLightboxClose")?.addEventListener("click", closeLightbox);
    $("btnLightboxPrev")?.addEventListener("click", () => {
      lightboxIdx = (lightboxIdx - 1 + lightboxItems.length) % lightboxItems.length;
      updateLightboxFrame();
    });
    $("btnLightboxNext")?.addEventListener("click", () => {
      lightboxIdx = (lightboxIdx + 1) % lightboxItems.length;
      updateLightboxFrame();
    });
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  function hasFiles(e) {
    try {
      return e.dataTransfer && [...e.dataTransfer.types].includes("Files");
    } catch (_) {
      return false;
    }
  }

  window.addEventListener("dragenter", (e) => {
    if (!isAdmin || !hasFiles(e)) return;
    e.preventDefault();
    dragDepth++;
    showDropVeil();
  });
  window.addEventListener("dragleave", (e) => {
    if (!isAdmin) return;
    e.preventDefault();
    dragDepth = Math.max(0, dragDepth - 1);
    if (dragDepth === 0 || e.relatedTarget === null) hideDropVeil();
  });
  window.addEventListener("dragover", (e) => {
    if (!isAdmin || !hasFiles(e)) return;
    e.preventDefault();
  });
  window.addEventListener("drop", (e) => {
    e.preventDefault();
    hideDropVeil();
    if (!isAdmin) return;
    const f = e.dataTransfer?.files?.item(0);
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => importText(String(reader.result || ""));
    reader.readAsText(f);
  });
  window.addEventListener("dragend", hideDropVeil);
  window.addEventListener("blur", hideDropVeil);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideDropVeil();
    if (lightbox?.open) {
      if (e.key === "ArrowLeft") {
        lightboxIdx = (lightboxIdx - 1 + lightboxItems.length) % lightboxItems.length;
        updateLightboxFrame();
      } else if (e.key === "ArrowRight") {
        lightboxIdx = (lightboxIdx + 1) % lightboxItems.length;
        updateLightboxFrame();
      }
    }
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  async function boot() {
    applyTheme(theme);
    hideDropVeil();
    published = structuredClone(FALLBACK_DATA);
    let loadedJson = false;
    try {
      const res = await fetch("./data/portfolio.json?v=" + Date.now(), { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (isValidPortfolio(data)) {
          published = data;
          loadedJson = true;
        }
      }
    } catch (_) {}

    isAdmin = loadSession();
    const draft = isAdmin ? loadDraft() : null;
    state = draft || structuredClone(published);
    renderAll();
    if (isAdmin && draft) showDraftStatus("draftActive");
    if (!loadedJson && location.protocol === "file:") {
      toast(t("fileCorsWarn"), "err", 7000);
    }
    hydratePublicSiteViews();
  }

  boot();
})();
