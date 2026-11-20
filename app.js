(() => {
  const STORAGE_KEY = "muov-portfolio-v3";
  const SESSION_KEY = "muov-admin-session";
  const CREDS_KEY = "muov-admin-creds";
  const LANG_KEY = "muov-lang";
  const THEME_KEY = "muov-theme";
  const SEASON_KEY = "muov-season";
  const FAV_KEY = "muov-favorites";
  const COUNTER_NAMESPACE = "muov-portfolio";

  const DEFAULT_USER = "muov";
  const DEFAULT_PASS_HASH =
    "d43874f677a1e18e57eecd731480fae08dad046dcc2406cad3617c1434e4576d";

  const VALID_SEASONS = ["autumn", "winter", "spring", "summer", "rain"];

  const THEME_COLORS = {
    dark: {
      summer: "#0e1310",
      autumn: "#12100e",
      winter: "#0d1216",
      spring: "#0f1512",
      rain: "#0d1314",
    },
    light: {
      summer: "#f4f1ea",
      autumn: "#f5efe6",
      winter: "#eff4f8",
      spring: "#f4f3ec",
      rain: "#edf2f3",
    },
  };

  // Unified inline SVG icon set (1.8px stroke, no emojis)
  const ICONS = {
    auto: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polygon points="15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5 15.5 8.5"/></svg>',
    autumn: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
    winter: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M4.9 7l14.2 10M19.1 7 4.9 17"/><path d="m9 4 3 3 3-3M9 20l3-3 3 3"/></svg>',
    spring: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2.5"/><path d="M12 4.5a2.5 2.5 0 0 1 2.5 2.5c0 1.4-2.5 2.5-2.5 2.5S9.5 8.4 9.5 7A2.5 2.5 0 0 1 12 4.5Z"/><path d="M19.5 12a2.5 2.5 0 0 1-2.5 2.5c-1.4 0-2.5-2.5-2.5-2.5s1.1-2.5 2.5-2.5a2.5 2.5 0 0 1 2.5 2.5Z"/><path d="M12 19.5a2.5 2.5 0 0 1-2.5-2.5c0-1.4 2.5-2.5 2.5-2.5s2.5 1.1 2.5 2.5a2.5 2.5 0 0 1-2.5 2.5Z"/><path d="M4.5 12A2.5 2.5 0 0 1 7 9.5c1.4 0 2.5 2.5 2.5 2.5S8.4 14.5 7 14.5A2.5 2.5 0 0 1 4.5 12Z"/></svg>',
    summer: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>',
    rain: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2"/><path d="m10 17-1 4M14 17l-1 4M18 17l-1 4"/></svg>',
    views: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
    downloads: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0-4-4m4 4 4-4"/><path d="M4 19h16"/></svg>',
    plays: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 4 20 12 6 20 6 4"/></svg>',
    siteViews: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3.6 9h16.8M3.6 15h16.8M12 3a14 14 0 0 0 0 18M12 3a14 14 0 0 1 0 18"/></svg>',
    rating: '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.1 8.3 22 9.3 17 14.2 18.2 21 12 17.8 5.8 21 7 14.2 2 9.3 8.9 8.3 12 2"/></svg>',
    heart: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
    edit: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
    share: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>',
  };

  function iconHtml(name) {
    return ICONS[name] || "";
  }

  const FALLBACK_DATA = {
    profile: {
      name: "Muov",
      role: "инди-разработчик",
      roleEn: "indie developer",
      city: "itch.io",
      bio: "Создаю игры",
      bioEn: "I create games",
      links: [
        { label: "itch.io", url: "https://muov.itch.io/" },
        { label: "Discord", url: "https://discord.gg/8GpzEHQqG3" },
      ],
    },
    games: [],
  };

  const I18N = {
    en: {
      roleDefault: "indie developer",
      skipLink: "Skip to projects",
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
      adminRibbonTitle: "Owner Mode",
      seasonBtnTitle: "Weather & season",
      seasonAuto: "Auto",
      seasonAutoPrefix: "Current: ",
      seasonAutumn: "Autumn",
      seasonAutumnSub: "Falling leaves",
      seasonWinter: "Winter",
      seasonWinterSub: "Snowfall",
      seasonSpring: "Spring",
      seasonSpringSub: "Blossoms",
      seasonSummer: "Summer",
      seasonSummerSub: "Fireflies",
      seasonRain: "Rain",
      seasonRainSub: "Forest rain",
      seasonToast: (label) => `Atmosphere: ${label}`,
      btnExplore: "Browse projects",
      btnRandom: "Random game",
      lblSpotlightKicker: "Featured",
      lblSpotlight: "Spotlight",
      lblCatalogKicker: "Releases & Builds",
      lblCatalog: "Projects",
      lblCraft: "Tools & Stack",
      craftHeading: "Built with lightweight indie tools",
      craftDesc: "Click any tool to filter matching projects in the catalog.",
      noteKicker: "itch.io Sync",
      noteText: "Games and stats sync directly from muov.itch.io.",
      updatedPrefix: "Synced ",
      backTop: "Back to top",
      all: "All",
      released: "Released",
      wip: "In progress",
      jam: "Jam",
      prototype: "Prototype",
      fav: "Favorites",
      favAdd: "Save to favorites",
      favRemove: "Saved",
      share: "Share",
      linkCopied: "Project link copied",
      sortLabel: "Sort order",
      sortFeatured: "Featured first",
      sortViews: "Most viewed",
      sortDownloads: "Most downloaded",
      sortYear: "Newest first",
      search: "Search games, tags, engines…",
      clearSearch: "Clear search",
      resetFilters: "Reset filters",
      tagFilterPrefix: "Tag: ",
      empty: "No projects match your filter.",
      foot: "Data from",
      footSync: "synced via itch.io API",
      adminBadge:
        "Owner mode — edits are saved locally; Export → commit to GitHub to publish.",
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
      guestHint: "Visitors cannot edit the site. Owner access only.",
      changePass: "Change username / password",
      changeAccess: "Change access",
      currentPass: "Current password",
      newUser: "New username",
      newPass: "New password",
      newPass2: "Confirm new password",
      back: "Back",
      passHint: "Password is stored only as a SHA-256 hash in this browser.",
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
      draftHint: "Export → GitHub to publish",
      importOnly: "Import is only available after owner login",
      importOk: "Portfolio imported into draft",
      importFail: "Could not read JSON",
      coverFail: "Could not process cover",
      shotsFail: "Could not process screenshots",
      navLabel: "Primary navigation",
      actionsLabel: "Controls",
      pageTitle: "Muov — Indie Games & Tools",
      gameComments: "Comments",
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
      craftFiltered: (q) => `Filtered by ${q}`,
      dayToday: "today",
      dayYesterday: "yesterday",
      daysAgo: (n) => `${n}d ago`,
      fileCorsWarn:
        "Opened via file:// — browser blocks loading data/portfolio.json. Run a local server (python -m http.server).",
    },
    ru: {
      roleDefault: "инди-разработчик",
      skipLink: "К проектам",
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
      adminRibbonTitle: "Режим владельца",
      seasonBtnTitle: "Погода и время года",
      seasonAuto: "Авто",
      seasonAutoPrefix: "Сейчас: ",
      seasonAutumn: "Осень",
      seasonAutumnSub: "Листопад",
      seasonWinter: "Зима",
      seasonWinterSub: "Снегопад",
      seasonSpring: "Весна",
      seasonSpringSub: "Лепестки",
      seasonSummer: "Лето",
      seasonSummerSub: "Светлячки",
      seasonRain: "Дождь",
      seasonRainSub: "Лесной дождь",
      seasonToast: (label) => `Атмосфера: ${label}`,
      btnExplore: "Смотреть проекты",
      btnRandom: "Случайная игра",
      lblSpotlightKicker: "Главное",
      lblSpotlight: "В центре внимания",
      lblCatalogKicker: "Релизы и сборки",
      lblCatalog: "Проекты",
      lblCraft: "Инструменты и стек",
      craftHeading: "Инструменты разработки",
      craftDesc: "Нажмите на инструмент, чтобы отфильтровать подходящие проекты.",
      noteKicker: "Синхронизация itch.io",
      noteText: "Игры и статистика автоматически обновляются с muov.itch.io.",
      updatedPrefix: "Обновлено ",
      backTop: "Наверх",
      all: "Все",
      released: "Релиз",
      wip: "В работе",
      jam: "Джем",
      prototype: "Прототип",
      fav: "Избранное",
      favAdd: "В избранное",
      favRemove: "В избранном",
      share: "Поделиться",
      linkCopied: "Ссылка на проект скопирована",
      sortLabel: "Сортировка",
      sortFeatured: "Рекомендуемые",
      sortViews: "По просмотрам",
      sortDownloads: "По скачиваниям",
      sortYear: "Сначала новые",
      search: "Поиск по названию, тегу, движку…",
      clearSearch: "Очистить поиск",
      resetFilters: "Сбросить фильтры",
      tagFilterPrefix: "Тег: ",
      empty: "По вашему запросу проекты не найдены.",
      foot: "Данные с",
      footSync: "обновление через itch.io API",
      adminBadge:
        "Режим владельца — правки сохраняются локально; Экспорт → commit в GitHub для публикации.",
      drop: "Отпустите JSON для импорта портфолио",
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
        "По умолчанию: логин <strong>muov</strong>, пароль <strong>muov-admin</strong> — смените после входа.",
      customHint: "Используется сохранённый пароль на этом устройстве.",
      guestHint: "Гости редактировать сайт не могут.",
      changePass: "Сменить логин / пароль",
      changeAccess: "Сменить доступ",
      currentPass: "Текущий пароль",
      newUser: "Новый логин",
      newPass: "Новый пароль",
      newPass2: "Ещё раз новый пароль",
      back: "Назад",
      passHint: "Пароль хранится только как SHA-256 хеш в этом браузере.",
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
      draftHint: "Экспорт → GitHub для публикации",
      importOnly: "Импорт доступен только владельцу после входа",
      importOk: "Портфолио импортировано в черновик",
      importFail: "Не удалось прочитать JSON",
      coverFail: "Не удалось обработать обложку",
      shotsFail: "Не удалось обработать скриншоты",
      navLabel: "Навигация",
      actionsLabel: "Управление",
      pageTitle: "Muov — инди-игры и инструменты",
      gameComments: "Комментарии",
      gameCommentsHint: "Войдите через GitHub, чтобы оставить отзыв",
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
      craftFiltered: (q) => `Фильтр: ${q}`,
      dayToday: "сегодня",
      dayYesterday: "вчера",
      daysAgo: (n) => {
        const mod10 = n % 10;
        const mod100 = n % 100;
        const word =
          mod10 === 1 && mod100 !== 11
            ? "день"
            : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)
            ? "дня"
            : "дней";
        return `${n} ${word} назад`;
      },
      fileCorsWarn:
        "Открыто через file:// — браузер блокирует загрузку data/portfolio.json. Запустите локальный сервер (python -m http.server).",
    },
  };

  // Standard default language is English unless explicitly set to Russian
  let lang = localStorage.getItem(LANG_KEY) === "ru" ? "ru" : "en";
  let theme = (() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    try {
      return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
    } catch (_) {
      return "dark";
    }
  })();

  let seasonPref = (() => {
    const saved = localStorage.getItem(SEASON_KEY) || "auto";
    return VALID_SEASONS.includes(saved) ? saved : "auto";
  })();

  function calendarSeason(d = new Date()) {
    const m = d.getMonth();
    if (m === 11 || m <= 1) return "winter";
    if (m <= 4) return "spring";
    if (m <= 7) return "summer";
    return "autumn";
  }

  function resolvedSeason() {
    return seasonPref === "auto" ? calendarSeason() : seasonPref;
  }

  function seasonTitle(s) {
    const map = {
      auto: t("seasonAuto"),
      autumn: t("seasonAutumn"),
      winter: t("seasonWinter"),
      spring: t("seasonSpring"),
      summer: t("seasonSummer"),
      rain: t("seasonRain"),
    };
    return map[s] || s;
  }

  function seasonSub(s) {
    if (s === "auto") return `${t("seasonAutoPrefix")}${seasonTitle(calendarSeason())}`;
    const map = {
      autumn: t("seasonAutumnSub"),
      winter: t("seasonWinterSub"),
      spring: t("seasonSpringSub"),
      summer: t("seasonSummerSub"),
      rain: t("seasonRainSub"),
    };
    return map[s] || "";
  }

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
  let swapTimer = null;
  let rebuildWeatherParticles = null;

  const siteViewsCache = new Map();
  const viewedInSession = new Set();
  const SITE_VISIT_KEY = "site-visits";
  const AUTO_REFRESH_MS = 5 * 60 * 1000;
  const MIN_REFRESH_GAP_MS = 60 * 1000;
  let siteVisitsCount = 0;
  let siteVisitRecorded = false;
  let lastLiveRefreshAt = 0;
  let liveRefreshPromise = null;
  let midnightTimerId = null;

  function loadFavorites() {
    try {
      const raw = localStorage.getItem(FAV_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(arr) ? arr.map(String) : []);
    } catch (_) {
      return new Set();
    }
  }
  const favorites = loadFavorites();

  function saveFavorites() {
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify([...favorites]));
    } catch (_) {}
  }

  const $ = (id) => document.getElementById(id);
  const grid = $("grid");
  const empty = $("empty");
  const dialog = $("dialog");
  const dialogBody = $("dialogBody");
  const lightbox = $("lightbox");
  const dropVeil = $("dropVeil");
  const toastStack = $("toastStack");

  const prefersReducedMotion = (() => {
    try {
      return !!window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (_) {
      return false;
    }
  })();

  const isFinePointer = (() => {
    try {
      return !!window.matchMedia && window.matchMedia("(pointer: fine)").matches;
    } catch (_) {
      return false;
    }
  })();

  function t(key) {
    const pack = I18N[lang] || I18N.en;
    return pack[key] ?? I18N.en[key] ?? key;
  }

  function toast(message, kind = "ok", duration = 3200) {
    if (!toastStack || !message) return;
    const item = document.createElement("div");
    item.className = `toast ${kind}`;
    item.textContent = message;
    toastStack.appendChild(item);
    setTimeout(() => item.remove(), duration);
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

  function updateThemeColorMeta() {
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) return;
    const s = resolvedSeason();
    const color = THEME_COLORS[theme]?.[s] || (theme === "light" ? "#f4f1ea" : "#0e1310");
    metaTheme.setAttribute("content", color);
  }

  function updateSeasonUI() {
    const active = resolvedSeason();
    const label = seasonTitle(active);
    const svg = iconHtml(active);
    if ($("seasonIcon")) $("seasonIcon").innerHTML = svg;
    if ($("seasonLabel")) $("seasonLabel").textContent = label;
    if ($("btnSeason")) {
      $("btnSeason").title = t("seasonBtnTitle");
      $("btnSeason").setAttribute("aria-label", `${t("seasonBtnTitle")}: ${label}`);
    }
    if ($("heroSeasonIcon")) $("heroSeasonIcon").innerHTML = svg;
    if ($("heroSeasonText")) {
      $("heroSeasonText").textContent =
        seasonPref === "auto" ? `${label} (${t("seasonAuto")})` : label;
    }
    if ($("heroSeason")) $("heroSeason").title = t("seasonBtnTitle");

    document.querySelectorAll("#seasonMenu [data-season-pick]").forEach((btn) => {
      const pick = btn.getAttribute("data-season-pick");
      const selected = pick === seasonPref;
      btn.classList.toggle("is-selected", selected);
      btn.setAttribute("aria-checked", String(selected));
      const ico = btn.querySelector("[data-s-icon]");
      if (ico && !ico.innerHTML) ico.innerHTML = iconHtml(pick);
      const strong = btn.querySelector("strong");
      const small = btn.querySelector("small");
      if (strong) strong.textContent = seasonTitle(pick);
      if (small) small.textContent = seasonSub(pick);
    });
  }

  function applySeason(nextPref = seasonPref, notify = false) {
    seasonPref = VALID_SEASONS.includes(nextPref) ? nextPref : "auto";
    localStorage.setItem(SEASON_KEY, seasonPref);
    const active = resolvedSeason();
    document.documentElement.setAttribute("data-season", active);
    document.documentElement.setAttribute("data-season-pref", seasonPref);
    updateThemeColorMeta();
    updateSeasonUI();
    if (typeof rebuildWeatherParticles === "function") rebuildWeatherParticles();
    if (notify) {
      const desc =
        seasonPref === "auto"
          ? `${t("seasonAuto")} (${seasonTitle(active)})`
          : seasonTitle(active);
      toast(t("seasonToast")(desc), "ok", 2200);
    }
  }

  function applyTheme(nextTheme) {
    theme = nextTheme === "light" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.setAttribute("data-theme", theme);
    updateThemeColorMeta();
    updateSeasonUI();
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
    const push = (key, iconKey, label) => {
      let n = Number(s[key]);
      if (!isFinite(n) || n < 0) n = 0;
      const attr = key === "siteViews" && gameId ? ` data-site-stat="${esc(gameId)}"` : "";
      items.push(
        `<span class="stat-pill"${attr} title="${esc(label)}"><span class="s-svg" aria-hidden="true">${iconHtml(
          iconKey
        )}</span><b>${esc(formatNum(n))}</b>${compact ? "" : ` <em>${esc(label)}</em>`}</span>`
      );
    };
    push("views", "views", t("views"));
    push("downloads", "downloads", t("downloads"));
    if (Number(s.plays) > 0 && Number(s.plays) !== Number(s.views)) {
      push("plays", "plays", t("plays"));
    }
    push("siteViews", "siteViews", t("siteViews"));
    if (typeof s.rating === "number" && isFinite(s.rating) && s.rating > 0) {
      items.push(
        `<span class="stat-pill" title="${esc(t("rating"))}"><span class="s-svg" aria-hidden="true">${iconHtml(
          "rating"
        )}</span><b>${esc(String(s.rating))}</b></span>`
      );
    }
    return `<div class="stats-row">${items.join("")}</div>`;
  }

  function formatSyncDateText(iso) {
    if (!iso) return { text: "", title: "" };
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return { text: "", title: "" };
    const locale = lang === "ru" ? "ru-RU" : "en-US";
    const formatted = d.toLocaleDateString(locale, { dateStyle: "medium" });
    const now = new Date();
    const startOfDay = (dt) => new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()).getTime();
    const diffDays = Math.round((startOfDay(now) - startOfDay(d)) / 86400000);
    let rel = "";
    if (diffDays === 0) rel = t("dayToday");
    else if (diffDays === 1) rel = t("dayYesterday");
    else if (diffDays > 1 && typeof t("daysAgo") === "function") rel = t("daysAgo")(diffDays);
    const text = rel ? `${t("updatedPrefix")}${formatted} · ${rel}` : `${t("updatedPrefix")}${formatted}`;
    return { text, title: d.toLocaleString(locale) };
  }

  function renderSyncUpdated() {
    const updatedEl = $("syncUpdated");
    if (!updatedEl) return;
    const { text, title } = formatSyncDateText(state?.updatedAt);
    updatedEl.textContent = text;
    if (title) updatedEl.title = title;
  }

  function updateSummaryTotals() {
    const games = state?.games || [];
    let totalViews = Math.max(0, Number(siteVisitsCount) || 0);
    let totalDownloads = 0;
    for (const g of games) {
      const st = g.stats || {};
      totalViews += Math.max(0, Number(st.views) || 0);
      totalViews += Math.max(0, Number(st.siteViews) || 0);
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

  async function counterRequest(op, keyName) {
    try {
      const key = counterKey(keyName);
      const res = await fetch(
        `https://abacus.jasoncameron.dev/${op}/${COUNTER_NAMESPACE}/${encodeURIComponent(key)}`,
        { cache: "no-store" }
      );
      if (!res.ok) return null;
      const data = await res.json();
      if (data && data.error) return op === "get" ? 0 : null;
      return typeof data?.value === "number" ? data.value : null;
    } catch (_) {
      return null;
    }
  }

  function counterGet(keyName) {
    return counterRequest("get", keyName);
  }

  function counterHit(keyName) {
    return counterRequest("hit", keyName);
  }

  async function bumpSiteView(gameId) {
    if (viewedInSession.has(gameId)) {
      return siteViewsCache.has(gameId) ? siteViewsCache.get(gameId) : null;
    }
    viewedInSession.add(gameId);
    const val = await counterHit(gameId);
    if (typeof val === "number") {
      siteViewsCache.set(gameId, val);
      return val;
    }
    viewedInSession.delete(gameId);
    return null;
  }

  async function hydrateSiteVisit() {
    const useHit = !siteVisitRecorded;
    if (useHit) siteVisitRecorded = true;
    const val = useHit ? await counterHit(SITE_VISIT_KEY) : await counterGet(SITE_VISIT_KEY);
    if (typeof val === "number") {
      siteVisitsCount = Math.max(0, val);
      updateSummaryTotals();
    } else if (useHit) {
      siteVisitRecorded = false;
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
        if (typeof n !== "number") return;
        siteViewsCache.set(g.id, n);
        g.stats = g.stats || {};
        g.stats.siteViews = n;
      })
    );
    updateSiteViewDom();
    updateSummaryTotals();
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
    return `<img src="${esc(clean)}" alt="${esc(title || "")}" loading="lazy" class="is-loading" data-fallback-title="${esc(title || "?")}" data-fallback-class="${esc(fallbackClass)}" />`;
  }

  function wireImageFallbacks(root) {
    if (!root) return;
    root.querySelectorAll("img.is-loading").forEach((img) => {
      const markLoaded = () => {
        img.classList.remove("is-loading");
        img.classList.add("is-loaded");
      };
      if (img.complete && img.naturalWidth > 0) markLoaded();
      else img.addEventListener("load", markLoaded, { once: true });
    });
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

  function toggleFavorite(gameId, anchorEl) {
    if (!gameId) return;
    const added = !favorites.has(gameId);
    if (added) {
      favorites.add(gameId);
      if (anchorEl) {
        anchorEl.classList.add("pop");
        setTimeout(() => anchorEl.classList.remove("pop"), 280);
      }
    } else {
      favorites.delete(gameId);
    }
    saveFavorites();

    if (filter === "fav") {
      renderGrid();
    } else {
      updateFilterUI();
      document.querySelectorAll(`.card-fav[data-fav="${CSS.escape(gameId)}"]`).forEach((btn) => {
        btn.classList.toggle("is-on", added);
        btn.setAttribute("aria-pressed", String(added));
        btn.setAttribute("aria-label", added ? t("favRemove") : t("favAdd"));
      });
    }
    const modalFav = dialogBody?.querySelector(`[data-modal-fav="${CSS.escape(gameId)}"]`);
    if (modalFav) {
      modalFav.classList.toggle("is-on", added);
      modalFav.innerHTML = `${iconHtml("heart")} <span>${esc(
        added ? t("favRemove") : t("favAdd")
      )}</span>`;
    }
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
      new Date().toLocaleTimeString(lang === "ru" ? "ru-RU" : "en-US") +
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
    if (adminNav) adminNav.hidden = !isAdmin;
    if (btnLogin) {
      btnLogin.hidden = isAdmin;
      btnLogin.style.display = isAdmin ? "none" : "";
    }
    if (adminBadge) adminBadge.hidden = !isAdmin;
    if (!isAdmin && $("syncStatus")) $("syncStatus").hidden = true;
    hideDropVeil();
  }

  function profileRole(p) {
    if (lang === "en") return p.roleEn || t("roleDefault");
    return p.role || t("roleDefault");
  }

  function profileBio(p) {
    if (lang === "en") return p.bioEn || p.bio || "";
    return p.bio || p.bioEn || "";
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
    const gLang = code === "ru" ? "ru" : "en";
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
    script.setAttribute("data-lang", lang === "ru" ? "ru" : "en");
    wrap.appendChild(script);
  }

  function applyStaticI18n() {
    document.documentElement.lang = lang;
    document.title = t("pageTitle");
    const navLinks = document.querySelector(".nav-links");
    if (navLinks) navLinks.setAttribute("aria-label", t("navLabel"));
    const navActions = document.querySelector(".nav-actions");
    if (navActions) navActions.setAttribute("aria-label", t("actionsLabel"));

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

    const skip = document.querySelector(".skip-link");
    if (skip) skip.textContent = t("skipLink");

    updateSeasonUI();

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

    renderSyncUpdated();

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
    lang = next === "ru" ? "ru" : "en";
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
    if (filter === "fav") {
      list = list.filter((g) => favorites.has(g.id));
    } else if (filter !== "all") {
      list = list.filter((g) => g.status === filter);
    }
    if (sortMode === "views") {
      const totalGameViews = (g) =>
        (Number(g.stats?.views) || 0) + (Number(g.stats?.siteViews) || 0);
      list.sort((a, b) => totalGameViews(b) - totalGameViews(a));
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
    const counts = { all: baseList.length, released: 0, wip: 0, jam: 0, prototype: 0, fav: 0 };
    for (const g of baseList) {
      if (g.status && counts[g.status] != null) counts[g.status]++;
      if (favorites.has(g.id)) counts.fav++;
    }
    document.querySelectorAll("#filters .pill").forEach((chip) => {
      const f = chip.getAttribute("data-filter");
      const labelMap = {
        all: t("all"),
        released: t("released"),
        wip: t("wip"),
        jam: t("jam"),
        prototype: t("prototype"),
        fav: t("fav"),
      };
      const label = labelMap[f] || f;
      const count = counts[f] ?? 0;
      const prefix = f === "fav" ? `${iconHtml("heart")} ` : "";
      chip.innerHTML = `${prefix}${esc(label)} <span class="pill-count">${count}</span>`;
      chip.classList.toggle("active", filter === f);
    });

    const tagChip = $("activeTagChip");
    if (tagChip) {
      tagChip.hidden = !tagFilter;
      if (tagFilter) tagChip.textContent = `${t("tagFilterPrefix")}${tagFilter} ×`;
    }
    if ($("btnClearSearch")) $("btnClearSearch").hidden = !query;
  }

  function renderHero() {
    const p = state.profile || {};
    $("brandName").textContent = p.name || "Muov";
    $("brandRole").textContent = profileRole(p);
    $("heroTitle").textContent = p.name || "Muov";
    $("heroBio").textContent = profileBio(p);
    $("heroCity").textContent = p.city || "itch.io";
    $("heroLinks").innerHTML = (p.links || [])
      .filter((l) => safeUrl(l.url))
      .map(
        (l) =>
          `<a href="${esc(safeUrl(l.url))}" target="_blank" rel="noopener">${esc(
            l.label || l.url
          )}</a>`
      )
      .join("");

    if ($("btnRandom")) $("btnRandom").disabled = !(state.games || []).length;
    updateSummaryTotals();
  }

  function getSpotlightList() {
    const games = state?.games || [];
    if (!games.length) return [];
    const featured = games.filter((g) => g.featured);
    return featured.length ? featured : [games[0]];
  }

  function renderSpotlight(animateSwap = false) {
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

    const paint = () => {
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

      host.innerHTML = `
        <div class="spotlight-media" id="spotMainMedia">
          ${makeCoverHtml(spot.cover, spot.title)}
          ${spot.status ? `<span class="status-tag ${esc(spot.status)}">${esc(stamp)}</span>` : ""}
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

      const mainMedia = host.querySelector("#spotMainMedia");
      if (mainMedia && allMedia.length) {
        mainMedia.addEventListener("click", () => openLightbox(allMedia, 0));
      }
    };

    if (animateSwap && !prefersReducedMotion) {
      if (swapTimer) clearTimeout(swapTimer);
      host.classList.add("is-swapping");
      swapTimer = setTimeout(() => {
        paint();
        host.classList.remove("is-swapping");
      }, 160);
    } else {
      paint();
    }
  }

  function renderGrid() {
    updateFilterUI();
    const list = visibleGames();
    if ($("visibleCount")) $("visibleCount").textContent = String(list.length);
    grid.innerHTML = "";
    empty.hidden = list.length > 0;

    list.forEach((g, idx) => {
      const art = document.createElement("article");
      art.className = "project-card";
      art.style.setProperty("--i", String(Math.min(idx, 12)));
      art.setAttribute("role", "listitem");

      const stamp = statusLabel(g.status);
      const summary = g.tagline || cleanExcerpt(g.description, 110);
      const isFav = favorites.has(g.id);

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
        <button type="button" class="card-fav ${isFav ? "is-on" : ""}" data-fav="${esc(
          g.id
        )}" aria-pressed="${isFav}" aria-label="${esc(isFav ? t("favRemove") : t("favAdd"))}">${iconHtml(
          "heart"
        )}</button>
        ${
          isAdmin
            ? `<button type="button" class="card-quick-edit" data-edit="${esc(g.id)}" title="${esc(
                t("edit")
              )}">${iconHtml("edit")}<span>${esc(t("edit"))}</span></button>`
            : ""
        }
        <div class="card-footer-meta">
          ${chipsHtml ? `<div class="tags-row">${chipsHtml}</div>` : ""}
          ${statsHtml}
        </div>`;

      grid.appendChild(art);
    });

    wireImageFallbacks(grid);
    updateSummaryTotals();
  }

  function renderAll() {
    applyStaticI18n();
    renderHero();
    renderSpotlight(false);
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

  function setGameHash(gameId) {
    try {
      const target = gameId
        ? `#game=${encodeURIComponent(gameId)}`
        : location.pathname + location.search;
      if (gameId) history.replaceState(null, "", target);
      else if (location.hash.startsWith("#game=")) history.replaceState(null, "", target);
    } catch (_) {}
  }

  function openPanel(next) {
    if ((next.mode === "edit" || next.mode === "create" || next.mode === "profile") && !isAdmin) {
      return;
    }
    panel = next;
    dialogBody.innerHTML = "";
    if (panel.mode === "view") {
      renderView(panel.gameId);
      setGameHash(panel.gameId);
    } else if (panel.mode === "edit" || panel.mode === "create") renderForm(panel);
    else if (panel.mode === "profile") renderProfileForm();
    else if (panel.mode === "auth") renderAuth();
    else if (panel.mode === "confirm") renderConfirm(panel);
    if (!dialog.open) dialog.showModal();
  }

  function closePanel() {
    panel = null;
    if (dialog.open) dialog.close();
    dialogBody.innerHTML = "";
    setGameHash("");
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
    dialogBody.querySelector('[data-act="ok"]').onclick = () => onConfirm();
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

  async function shareGame(g) {
    const shareUrl = new URL(`#game=${encodeURIComponent(g.id)}`, location.href).href;
    if (navigator.share) {
      try {
        await navigator.share({ title: g.title, text: g.tagline || g.title, url: shareUrl });
        return;
      } catch (e) {
        if (e?.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast(t("linkCopied"), "ok");
    } catch (_) {
      toast(shareUrl, "ok", 4500);
    }
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
    const isFav = favorites.has(g.id);
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
            }"><img src="${esc(clean)}" alt="" loading="lazy" class="is-loading" data-hide-on-error="1" /></button>`;
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
      `<button type="button" class="btn outline ${isFav ? "is-on" : ""}" data-modal-fav="${esc(
        g.id
      )}">${iconHtml("heart")} <span>${esc(isFav ? t("favRemove") : t("favAdd"))}</span></button>`,
      `<button type="button" class="btn outline" data-act="share">${iconHtml("share")} <span>${esc(
        t("share")
      )}</span></button>`,
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

    const modalFavBtn = dialogBody.querySelector("[data-modal-fav]");
    if (modalFavBtn) modalFavBtn.onclick = () => toggleFavorite(id, modalFavBtn);

    const shareBtn = dialogBody.querySelector('[data-act="share"]');
    if (shareBtn) shareBtn.onclick = () => shareGame(g);

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
      updateSummaryTotals();
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
      renderSpotlight(false);
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

  // Calm seasonal particle renderer
  function initWeatherCanvas() {
    const canvas = $("weatherCanvas");
    if (!canvas || prefersReducedMotion || typeof canvas.getContext !== "function") return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let rafId = 0;
    let particles = [];
    let ripples = [];
    const mouse = { x: -9999, y: -9999 };

    const AUTUMN_COLORS = [
      [217, 142, 78],
      [196, 102, 54],
      [226, 180, 90],
      [176, 108, 56],
    ];
    const SPRING_COLORS = [
      [223, 156, 180],
      [245, 206, 220],
      [116, 201, 142],
    ];

    function spawnParticle(season, randomY = true) {
      const x = Math.random() * (w + 60) - 30;
      const y = randomY ? Math.random() * h : season === "summer" ? h + 12 : -18;
      if (season === "rain") {
        return {
          x,
          y: randomY ? Math.random() * h : -28,
          vx: -1.3 - Math.random() * 0.6,
          vy: 10 + Math.random() * 5,
          len: 12 + Math.random() * 12,
          alpha: 0.18 + Math.random() * 0.24,
        };
      }
      if (season === "autumn") {
        return {
          x,
          y,
          vx: 0.28 + Math.random() * 0.55,
          vy: 0.65 + Math.random() * 0.85,
          size: 4.5 + Math.random() * 4.8,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.035,
          phase: Math.random() * Math.PI * 2,
          speed: 0.018 + Math.random() * 0.018,
          color: AUTUMN_COLORS[Math.floor(Math.random() * AUTUMN_COLORS.length)],
        };
      }
      if (season === "winter") {
        const layer = Math.random();
        return {
          x,
          y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: 0.45 + layer * 0.95,
          r: 1.3 + layer * 2.3,
          crystal: layer > 0.8,
          angle: Math.random() * Math.PI,
          spin: (Math.random() - 0.5) * 0.012,
          phase: Math.random() * Math.PI * 2,
          speed: 0.014 + Math.random() * 0.016,
        };
      }
      if (season === "spring") {
        return {
          x,
          y,
          vx: 0.35 + Math.random() * 0.5,
          vy: 0.45 + Math.random() * 0.75,
          size: 3.5 + Math.random() * 4,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.025,
          phase: Math.random() * Math.PI * 2,
          speed: 0.018 + Math.random() * 0.018,
          color: SPRING_COLORS[Math.floor(Math.random() * SPRING_COLORS.length)],
        };
      }
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.22,
        vy: -0.14 - Math.random() * 0.28,
        r: 1.4 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.014 + Math.random() * 0.02,
        kind: Math.random() < 0.65 ? "amber" : "moss",
      };
    }

    function targetCountFor(season) {
      const area = (w || 1024) * (h || 768);
      if (season === "rain") return Math.min(95, Math.max(36, Math.round(area / 16000)));
      if (season === "winter") return Math.min(64, Math.max(24, Math.round(area / 22000)));
      if (season === "autumn" || season === "spring") {
        return Math.min(34, Math.max(14, Math.round(area / 40000)));
      }
      return Math.min(40, Math.max(14, Math.round(area / 34000)));
    }

    function populate(season) {
      const count = targetCountFor(season);
      particles = [];
      ripples = [];
      for (let i = 0; i < count; i++) particles.push(spawnParticle(season, true));
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth || 1024;
      h = window.innerHeight || 768;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      populate(resolvedSeason());
    }

    rebuildWeatherParticles = () => populate(resolvedSeason());

    function applyMouseBreeze(p, radius = 100, strength = 0.38) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist2 = dx * dx + dy * dy;
      if (dist2 > 1 && dist2 < radius * radius) {
        const dist = Math.sqrt(dist2);
        const force = ((radius - dist) / radius) * strength;
        p.x += (dx / dist) * force;
        p.y += (dy / dist) * force;
      }
    }

    function drawSnowCrystal(x, y, r, angle, alpha, isLight) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.strokeStyle = isLight ? `rgba(39, 110, 153, ${alpha})` : `rgba(215, 236, 250, ${alpha})`;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const a = (Math.PI / 3) * i;
        const dx = Math.cos(a) * r * 1.4;
        const dy = Math.sin(a) * r * 1.4;
        ctx.moveTo(-dx, -dy);
        ctx.lineTo(dx, dy);
      }
      ctx.stroke();
      ctx.restore();
    }

    function tick() {
      if (document.hidden) {
        rafId = 0;
        return;
      }
      ctx.clearRect(0, 0, w, h);
      const season = resolvedSeason();
      const isLight = theme === "light";

      if (season === "rain") {
        ctx.lineWidth = 1.1;
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y > h - 18) {
            if (Math.random() < 0.14 && ripples.length < 22) {
              ripples.push({ x: p.x, y: h - 10 - Math.random() * 24, r: 2, max: 12 + Math.random() * 10, a: 0.32 });
            }
            Object.assign(p, spawnParticle("rain", false));
          }
          if (p.x < -30) p.x = w + 20;
          const stroke = isLight
            ? `rgba(38, 112, 106, ${(p.alpha * 0.8).toFixed(2)})`
            : `rgba(134, 174, 201, ${p.alpha.toFixed(2)})`;
          ctx.strokeStyle = stroke;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 1.2, p.y - p.len);
          ctx.stroke();
        }
        for (let i = ripples.length - 1; i >= 0; i--) {
          const rp = ripples[i];
          rp.r += 0.6;
          rp.a *= 0.91;
          if (rp.a < 0.03 || rp.r > rp.max) {
            ripples.splice(i, 1);
            continue;
          }
          ctx.strokeStyle = isLight
            ? `rgba(38, 112, 106, ${rp.a.toFixed(2)})`
            : `rgba(134, 174, 201, ${rp.a.toFixed(2)})`;
          ctx.beginPath();
          ctx.ellipse(rp.x, rp.y, rp.r, rp.r * 0.35, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      } else if (season === "autumn" || season === "spring") {
        for (const p of particles) {
          p.phase += p.speed;
          p.angle += p.spin;
          applyMouseBreeze(p, 105, 0.5);
          p.x += p.vx + Math.sin(p.phase) * 0.45;
          p.y += p.vy;
          if (p.y > h + 20 || p.x > w + 36) Object.assign(p, spawnParticle(season, false));
          const [r, g, b] = p.color;
          const alpha = isLight ? 0.55 : 0.68;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.scale(1, 0.65 + 0.35 * Math.sin(p.phase));
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.quadraticCurveTo(p.size * 0.85, -p.size * 0.2, 0, p.size);
          ctx.quadraticCurveTo(-p.size * 0.85, -p.size * 0.2, 0, -p.size);
          ctx.fill();
          ctx.restore();
        }
      } else if (season === "winter") {
        for (const p of particles) {
          p.phase += p.speed;
          p.angle += p.spin;
          applyMouseBreeze(p, 100, 0.45);
          p.x += p.vx + Math.sin(p.phase) * 0.3;
          p.y += p.vy;
          if (p.y > h + 16) Object.assign(p, spawnParticle("winter", false));
          if (p.x < -16) p.x = w + 16;
          if (p.x > w + 16) p.x = -16;
          const alpha = (0.35 + 0.35 * Math.sin(p.phase)) * (isLight ? 0.65 : 0.8);
          if (p.crystal) {
            drawSnowCrystal(p.x, p.y, p.r, p.angle, alpha.toFixed(2), isLight);
          } else {
            ctx.fillStyle = isLight
              ? `rgba(39, 110, 153, ${alpha.toFixed(2)})`
              : `rgba(218, 238, 252, ${alpha.toFixed(2)})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else {
        for (const p of particles) {
          p.phase += p.speed;
          applyMouseBreeze(p, 95, 0.35);
          p.x += p.vx + Math.sin(p.phase * 0.7) * 0.2;
          p.y += p.vy;
          if (p.y < -14) {
            p.y = h + 14;
            p.x = Math.random() * w;
          }
          if (p.x < -14) p.x = w + 14;
          if (p.x > w + 14) p.x = -14;

          const alpha = (0.25 + 0.45 * (0.5 + 0.5 * Math.sin(p.phase))) * (isLight ? 0.45 : 0.72);
          const rgb =
            p.kind === "amber"
              ? isLight
                ? "179, 122, 36"
                : "226, 180, 90"
              : isLight
              ? "47, 111, 68"
              : "118, 185, 125";
          const glowR = p.r * 4;
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
          grad.addColorStop(0, `rgba(${rgb}, ${alpha.toFixed(3)})`);
          grad.addColorStop(0.5, `rgba(${rgb}, ${(alpha * 0.3).toFixed(3)})`);
          grad.addColorStop(1, `rgba(${rgb}, 0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      rafId = requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener("resize", resize);
    if (isFinePointer) {
      window.addEventListener("pointermove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      });
      window.addEventListener("pointerleave", () => {
        mouse.x = -9999;
        mouse.y = -9999;
      });
    }
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && !rafId) rafId = requestAnimationFrame(tick);
    });
    rafId = requestAnimationFrame(tick);
  }

  function initScrollAndReveal() {
    if (typeof IntersectionObserver !== "function" || prefersReducedMotion) return;
    document.documentElement.classList.add("js-reveal");
    const revObs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revObs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => revObs.observe(el));

    const sections = [
      ["featured", "navSpotlight"],
      ["catalog", "navCatalog"],
      ["craft", "navCraft"],
    ];
    const spyObs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const pair = sections.find(([secId]) => secId === entry.target.id);
          if (!pair) continue;
          document.querySelectorAll(".nav-link").forEach((a) => a.classList.remove("is-active"));
          $(pair[1])?.classList.add("is-active");
        }
      },
      { rootMargin: "-35% 0px -50% 0px" }
    );
    sections.forEach(([secId]) => {
      const el = $(secId);
      if (el) spyObs.observe(el);
    });
  }

  function registerServiceWorker() {
    try {
      if (
        (location.protocol === "https:" ||
          location.hostname === "localhost" ||
          location.hostname === "127.0.0.1") &&
        navigator.serviceWorker?.register
      ) {
        navigator.serviceWorker.register("./sw.js").catch(() => {});
      }
    } catch (_) {}
  }

  // Event bindings
  $("btnTheme")?.addEventListener("click", () => {
    applyTheme(theme === "light" ? "dark" : "light");
  });

  const seasonMenu = $("seasonMenu");
  const btnSeason = $("btnSeason");
  function setSeasonMenuOpen(open) {
    if (!seasonMenu) return;
    seasonMenu.hidden = !open;
    if (btnSeason) btnSeason.setAttribute("aria-expanded", String(open));
  }

  btnSeason?.addEventListener("click", (e) => {
    e.stopPropagation();
    setSeasonMenuOpen(seasonMenu?.hidden !== false);
  });

  $("heroSeason")?.addEventListener("click", (e) => {
    e.stopPropagation();
    setSeasonMenuOpen(true);
    btnSeason?.focus?.();
  });

  seasonMenu?.addEventListener("click", (e) => {
    const opt = e.target.closest("[data-season-pick]");
    if (!opt) return;
    applySeason(opt.getAttribute("data-season-pick"), true);
    setSeasonMenuOpen(false);
  });

  document.addEventListener("click", (e) => {
    if (seasonMenu && !seasonMenu.hidden && !e.target.closest?.("#seasonControl")) {
      setSeasonMenuOpen(false);
    }
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
    renderSpotlight(true);
  });
  $("btnSpotNext")?.addEventListener("click", () => {
    spotlightIndex++;
    renderSpotlight(true);
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
    const favBtn = e.target.closest("[data-fav]");
    if (favBtn) {
      e.stopPropagation();
      toggleFavorite(favBtn.getAttribute("data-fav"), favBtn);
      return;
    }
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
    setGameHash("");
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
    if (e.key === "Escape") {
      hideDropVeil();
      setSeasonMenuOpen(false);
    }
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

  async function fetchJsonNoStore(url) {
    try {
      const sep = url.includes("?") ? "&" : "?";
      const res = await fetch(`${url}${sep}v=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) return null;
      const data = await res.json();
      return isValidPortfolio(data) ? data : null;
    } catch (_) {
      return null;
    }
  }

  function getUpstreamPortfolioUrl() {
    const repo = String(giscusBaseAttrs()?.repo || "").trim();
    if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo)) return "";
    return `https://raw.githubusercontent.com/${repo}/main/data/portfolio.json`;
  }

  function parseIsoMs(iso) {
    if (!iso) return 0;
    const ms = Date.parse(iso);
    return Number.isFinite(ms) ? ms : 0;
  }

  function portfolioSignalSum(data) {
    return (data?.games || []).reduce(
      (acc, g) =>
        acc +
        (Number(g?.stats?.views) || 0) +
        (Number(g?.stats?.downloads) || 0) +
        (Number(g?.stats?.plays) || 0),
      0
    );
  }

  function shouldAdoptRemotePortfolio(current, remote) {
    if (!isValidPortfolio(remote)) return false;
    if (!isValidPortfolio(current) || !current.games.length) return true;
    const curMs = parseIsoMs(current.updatedAt);
    const remMs = parseIsoMs(remote.updatedAt);
    if (remMs > curMs) return true;
    if (remMs < curMs) return false;
    return (
      remote.games.length !== current.games.length ||
      portfolioSignalSum(remote) > portfolioSignalSum(current)
    );
  }

  function mergePortfolioData(base, incoming) {
    const merged = structuredClone(incoming);
    const baseById = new Map((base?.games || []).map((g) => [g.id, g]));
    merged.games = (merged.games || []).map((g) => {
      const prev = baseById.get(g.id);
      const nextStats = { ...(prev?.stats || {}), ...(g.stats || {}) };
      if (prev?.stats) {
        for (const k of ["views", "downloads", "plays"]) {
          const a = Number(prev.stats[k]) || 0;
          const b = Number(g.stats?.[k]) || 0;
          if (Math.max(a, b) > 0) nextStats[k] = Math.max(a, b);
        }
      }
      if (siteViewsCache.has(g.id)) {
        nextStats.siteViews = siteViewsCache.get(g.id);
      }
      return { ...g, stats: nextStats };
    });
    return merged;
  }

  async function syncRemotePortfolio(allowLocal = true) {
    const urls = [];
    if (allowLocal && location.protocol !== "file:") {
      urls.push("./data/portfolio.json");
    }
    const upstream = getUpstreamPortfolioUrl();
    if (upstream) urls.push(upstream);
    if (!urls.length) return false;

    const results = await Promise.all(urls.map((u) => fetchJsonNoStore(u)));
    let best = null;
    for (const candidate of results) {
      if (candidate && (!best || shouldAdoptRemotePortfolio(best, candidate))) {
        best = candidate;
      }
    }
    if (!best || !shouldAdoptRemotePortfolio(published, best)) return false;

    published = mergePortfolioData(published, best);
    const hasDraft = isAdmin && !!loadDraft();
    if (!hasDraft) {
      state = structuredClone(published);
      applyCachedSiteViews();
      renderAll();
    }
    return true;
  }

  function syncCalendarAndRelativeDates() {
    renderSyncUpdated();
    if (seasonPref === "auto") {
      const active = document.documentElement.getAttribute("data-season");
      if (active !== resolvedSeason()) applySeason("auto", false);
    }
  }

  function refreshLiveState({ initial = false, force = false } = {}) {
    syncCalendarAndRelativeDates();
    const now = Date.now();
    if (!initial && !force && now - lastLiveRefreshAt < MIN_REFRESH_GAP_MS) {
      return liveRefreshPromise || Promise.resolve();
    }
    if (liveRefreshPromise) return liveRefreshPromise;
    lastLiveRefreshAt = now;
    liveRefreshPromise = (async () => {
      try {
        await Promise.all([
          syncRemotePortfolio(!initial),
          hydrateSiteVisit(),
          hydratePublicSiteViews(),
        ]);
        syncCalendarAndRelativeDates();
      } finally {
        liveRefreshPromise = null;
      }
    })();
    return liveRefreshPromise;
  }

  function scheduleMidnightRefresh() {
    if (midnightTimerId) {
      clearTimeout(midnightTimerId);
      midnightTimerId = null;
    }
    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      2
    );
    const delay = Math.max(1000, nextMidnight.getTime() - now.getTime());
    midnightTimerId = setTimeout(() => {
      syncCalendarAndRelativeDates();
      refreshLiveState({ force: true });
      scheduleMidnightRefresh();
    }, delay);
    midnightTimerId?.unref?.();
  }

  function initAutoRefresh() {
    if (typeof setInterval === "function") {
      const iv = setInterval(() => refreshLiveState({ force: false }), AUTO_REFRESH_MS);
      iv?.unref?.();
    }
    scheduleMidnightRefresh();
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) refreshLiveState({ force: false });
    });
    window.addEventListener("focus", () => refreshLiveState({ force: false }));
  }

  async function boot() {
    applyTheme(theme);
    applySeason(seasonPref, false);
    hideDropVeil();
    published = structuredClone(FALLBACK_DATA);
    let loadedJson = false;
    if (location.protocol !== "file:") {
      const localData = await fetchJsonNoStore("./data/portfolio.json");
      if (localData) {
        published = localData;
        loadedJson = true;
      }
    }

    isAdmin = loadSession();
    const draft = isAdmin ? loadDraft() : null;
    state = draft || structuredClone(published);
    renderAll();

    initWeatherCanvas();
    initScrollAndReveal();
    registerServiceWorker();
    initAutoRefresh();

    if (isAdmin && draft) showDraftStatus("draftActive");

    if (location.hash && location.hash.startsWith("#game=")) {
      const targetId = decodeURIComponent(location.hash.slice(6));
      if (getGame(targetId)) {
        openPanel({ mode: "view", gameId: targetId });
      }
    }

    await refreshLiveState({ initial: true });
    if (!loadedJson && !published.games.length && location.protocol === "file:") {
      toast(t("fileCorsWarn"), "err", 7000);
    }
  }

  boot();
})();
