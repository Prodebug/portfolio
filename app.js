(() => {
  const STORAGE_KEY = "muov-portfolio-v1";
  const SESSION_KEY = "muov-admin-session";
  const CREDS_KEY = "muov-admin-creds";
  const LANG_KEY = "muov-lang";

  const DEFAULT_USER = "muov";
  const DEFAULT_PASS_HASH =
    "d43874f677a1e18e57eecd731480fae08dad046dcc2406cad3617c1434e4576d";

  const SEED = {
  "profile": {
    "name": "Muov",
    "role": "инди-разработчик",
    "city": "itch.io",
    "bio": "Создаю инди-игры, выстраиваю вымышленные миры и пишу истории. Платформеры и эксперименты с механиками.",
    "links": [
      {
        "label": "itch.io",
        "url": "https://muov.itch.io/"
      },
      {
        "label": "Discord",
        "url": "https://discord.gg/8GpzEHQqG3"
      },
      {
        "label": "Hexagonia",
        "url": "https://muov.itch.io/hexagonia"
      }
    ],
    "roleEn": "indie developer",
    "bioEn": "I create indie games, build fictional worlds and write stories. Platformers and experiments with mechanics."
  },
  "games": [
    {
      "id": "glance-up-halloween-edition",
      "title": "Glance Up: Halloween Edition",
      "tagline": "",
      "year": 2026,
      "role": "разработка",
      "status": "released",
      "genres": [
        "Platformer"
      ],
      "platforms": [
        "Windows",
        "Android",
        "Web"
      ],
      "description": "🎃 ХЭЛЛОУИНСКИЙ ИВЕНТ УЖЕ В ИГРЕ! 🎃\n\nGlance Up &mdash; пиксельный платформер-бесконечный прыгун. Прыгай по платформам всё выше, уворачивайся от деревьев-монстров и собирай монеты.\n\nВ Хэллоуинском режиме:\n\n• Фиолетовое небо и красная луна\n\n• Конфеты, которые падают на платформах\n\n• Новый персонаж &mdash; Тыквенный Дух (30 конфет): парение, двойной прыжок и призрачный щит",
      "cover": "https://img.itch.zone/aW1nLzMxNDUzMDUyLnBuZw==/original/pJ2EMu.png",
      "shots": [
        "https://img.itch.zone/aW1hZ2UvNTI0NTU5MC8zMTQ1MzA5NC5wbmc=/original/dbhEC9.png",
        "https://img.itch.zone/aW1hZ2UvNTI0NTU5MC8zMTQ1MzEwNS5wbmc=/original/QPch7I.png",
        "https://img.itch.zone/aW1hZ2UvNTI0NTU5MC8zMTQ1MzE2Mi5wbmc=/original/XJ8tcR.png",
        "https://img.itch.zone/aW1hZ2UvNTI0NTU5MC8zMTQ1MzE5NC5wbmc=/original/j62g02.png"
      ],
      "playUrl": "https://muov.itch.io/glance-up-halloween-edition",
      "trailerUrl": "",
      "repoUrl": "",
      "featured": true,
      "tags": [],
      "itchId": "5245590",
      "itchUrl": "https://muov.itch.io/glance-up-halloween-edition"
    },
    {
      "id": "hexagonia",
      "title": "Hexagonia",
      "tagline": "Платформер с Godot · GMTK Game Jam 2026",
      "year": 2026,
      "role": "разработка",
      "status": "jam",
      "genres": [
        "Platformer",
        "Adventure"
      ],
      "platforms": [
        "Windows"
      ],
      "description": "Hello, dear players! We are a newly formed team, and we are still learning the ropes.\n\nWe decided to create a game and participate in Game Jam 2026.\n\nWe used Aseprite, Canva, and Godot.\n\nThank you for playing our game.",
      "cover": "covers/hexagonia.jpg",
      "shots": [
        "https://img.itch.zone/aW1hZ2UvNDgyMDkxNS8yODc0NjQ4NS5wbmc=/original/UFDXEn.png",
        "https://img.itch.zone/aW1hZ2UvNDgyMDkxNS8yODc0NjQ4Ni5wbmc=/original/lRgZax.png",
        "https://img.itch.zone/aW1hZ2UvNDgyMDkxNS8yODc0NjQ4Ny5wbmc=/original/5ZWky3.png",
        "https://img.itch.zone/aW1hZ2UvNDgyMDkxNS8yODc0NzMwOS5wbmc=/original/dG69cq.png"
      ],
      "playUrl": "https://muov.itch.io/hexagonia",
      "trailerUrl": "",
      "repoUrl": "",
      "featured": false,
      "tags": [
        "2D",
        "Godot",
        "Pixel Art",
        "Story Rich",
        "No AI"
      ],
      "itchId": "4820915",
      "itchUrl": "https://muov.itch.io/hexagonia"
    }
  ],
  "updatedAt": "2026-10-27T22:00:15Z"
}
;

  const I18N = {
    ru: {
      roleDefault: "инди-разработчик",
      profile: "Профиль",
      export: "Экспорт",
      import: "Импорт",
      addGame: "+ Игра",
      logout: "Выйти",
      login: "Вход",
      loginTitle: "Вход для владельца",
      shelf: "Полка",
      all: "Все",
      released: "Релиз",
      wip: "В работе",
      jam: "Джем",
      prototype: "Прототип",
      search: "Поиск по названию…",
      empty: "Игр пока нет.",
      foot: "Данные с",
      footSync: "синхронизация через GitHub Actions",
      adminBadge:
        "Режим админа — правки локально; чтобы обновить сайт для всех — Экспорт → commit в GitHub",
      drop: "Отпусти JSON — импортирую портфолио",
      close: "Закрыть",
      edit: "Править",
      delete: "Удалить",
      play: "Играть / itch",
      trailer: "Трейлер",
      repo: "Репозиторий",
      noDesc: "Описание пока не добавлено.",
      newGame: "Новая игра",
      editing: "Редактирование",
      title: "Название",
      tagline: "Слоган",
      year: "Год",
      role: "Роль",
      status: "Статус",
      genres: "Жанры (через запятую)",
      platforms: "Платформы (через запятую)",
      description: "Описание",
      playUrl: "Ссылка на itch / play",
      trailerUrl: "Трейлер URL",
      repoUrl: "Репозиторий",
      cover: "Обложка",
      shots: "Скриншоты (до 4)",
      featured: "Избранная (широкая карточка)",
      cancel: "Отмена",
      save: "Сохранить",
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
      city: "Город / подпись",
      about: "О себе",
      links: "Ссылки (по одной на строку: Подпись | URL)",
      resetPublished: "Сбросить к published",
      resetConfirm: "Сбросить черновик?",
      deleteConfirm: (title) => `Удалить «${title}»?`,
      draftSaved: "Черновик сохранён локально",
      draftHint: "Экспорт → GitHub, чтобы увидеть у всех",
      importOnly: "Импорт только для владельца после входа",
      importOk: "Портфолио импортировано в черновик",
      importFail: "Не удалось прочитать JSON",
      coverFail: "Не удалось обработать обложку",
      shotsFail: "Не удалось обработать скриншоты",
      navLabel: "Действия",
      pageTitle: "Muov — портфолио игр",
      comments: "Комментарии",
      commentsHint:
        "Общий чат. Чтобы обсудить игру — открой её карточку, комментарии внизу окна.",
      gameComments: "Комментарии к этой игре",
      gameCommentsHint: "Войди через GitHub, чтобы написать комментарий",
      downloads: "скачиваний",
      views: "просмотров",
      plays: "запусков",
      rating: "оценка",
      siteViews: "на сайте",
    },
    en: {
      roleDefault: "indie developer",
      profile: "Profile",
      export: "Export",
      import: "Import",
      addGame: "+ Game",
      logout: "Log out",
      login: "Log in",
      loginTitle: "Owner login",
      shelf: "Shelf",
      all: "All",
      released: "Released",
      wip: "In progress",
      jam: "Jam",
      prototype: "Prototype",
      search: "Search by title…",
      empty: "No games yet.",
      foot: "Data from",
      footSync: "synced via GitHub Actions",
      adminBadge:
        "Admin mode — edits are local; Export → commit to GitHub to update the public site",
      drop: "Drop JSON to import portfolio",
      close: "Close",
      edit: "Edit",
      delete: "Delete",
      play: "Play / itch",
      trailer: "Trailer",
      repo: "Repository",
      noDesc: "No description yet.",
      newGame: "New game",
      editing: "Edit game",
      title: "Title",
      tagline: "Tagline",
      year: "Year",
      role: "Role",
      status: "Status",
      genres: "Genres (comma-separated)",
      platforms: "Platforms (comma-separated)",
      description: "Description",
      playUrl: "itch / play URL",
      trailerUrl: "Trailer URL",
      repoUrl: "Repository",
      cover: "Cover",
      shots: "Screenshots (up to 4)",
      featured: "Featured (wide card)",
      cancel: "Cancel",
      save: "Save",
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
      city: "City / label",
      about: "About",
      links: "Links (one per line: Label | URL)",
      resetPublished: "Reset to published",
      resetConfirm: "Reset draft?",
      deleteConfirm: (title) => `Delete “${title}”?`,
      draftSaved: "Draft saved locally",
      draftHint: "Export → GitHub so everyone sees it",
      importOnly: "Import is only for the owner after login",
      importOk: "Portfolio imported into draft",
      importFail: "Could not read JSON",
      coverFail: "Could not process cover",
      shotsFail: "Could not process screenshots",
      navLabel: "Actions",
      pageTitle: "Muov — game portfolio",
      comments: "Comments",
      commentsHint:
        "General discussion. To comment on a game — open its card; comments are at the bottom.",
      gameComments: "Comments on this game",
      gameCommentsHint: "Sign in with GitHub to leave a comment",
      downloads: "downloads",
      views: "views",
      plays: "plays",
      rating: "rating",
      siteViews: "on site",
    },
  };

  let lang = localStorage.getItem(LANG_KEY) || "ru";
  if (lang !== "ru" && lang !== "en") lang = "ru";

  function t(key) {
    const pack = I18N[lang] || I18N.ru;
    return pack[key] ?? I18N.ru[key] ?? key;
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
    if (typeof n !== "number" || !isFinite(n)) return null;
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    return String(Math.round(n));
  }

  function formatStats(stats, compact) {
    if (!stats || typeof stats !== "object") return "";
    const items = [];
    const push = (key, icon, label) => {
      const n = stats[key];
      if (typeof n === "number" && isFinite(n) && n >= 0) {
        items.push(
          `<span class="stat-pill" title="${esc(label)}"><i>${icon}</i><b>${esc(
            formatNum(n)
          )}</b>${compact ? "" : ` <em>${esc(label)}</em>`}</span>`
        );
      }
    };
    push("downloads", "↓", t("downloads"));
    push("views", "👁", t("views"));
    push("plays", "▶", t("plays"));
    if (typeof stats.rating === "number") {
      items.push(
        `<span class="stat-pill" title="${esc(t("rating"))}"><i>★</i><b>${esc(
          String(stats.rating)
        )}</b></span>`
      );
    }
    if (!items.length) return "";
    return `<div class="stats-row">${items.join("")}</div>`;
  }

  async function bumpSiteView(gameId) {
    try {
      const key = String(gameId || "unknown").replace(/[^a-z0-9_-]/gi, "-").slice(0, 48);
      const res = await fetch(
        `https://api.counterapi.dev/v1/muov-portfolio/${encodeURIComponent(key)}/up`,
        { cache: "no-store" }
      );
      if (!res.ok) return null;
      const data = await res.json();
      const value = data?.value ?? data?.count;
      return typeof value === "number" ? value : null;
    } catch (_) {
      return null;
    }
  }


  let published = structuredClone(SEED);
  let state = structuredClone(SEED);
  let isAdmin = false;
  let filter = "all";
  let query = "";
  let panel = null;
  let dragDepth = 0;

  const $ = (id) => document.getElementById(id);
  const grid = $("grid");
  const empty = $("empty");
  const dialog = $("dialog");
  const dialogBody = $("dialogBody");
  const dropVeil = $("dropVeil");

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

  function saveDraft() {
    if (!isAdmin) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    const sync = $("syncStatus");
    if (sync) {
      sync.hidden = false;
      sync.textContent =
        t("draftSaved") +
        " · " +
        new Date().toLocaleTimeString(lang === "en" ? "en-US" : "ru-RU") +
        " · " +
        t("draftHint");
    }
  }

  function safeUrl(u) {
    if (!u || typeof u !== "string") return "";
    try {
      const url = new URL(u.trim(), location.href);
      if (url.protocol === "http:" || url.protocol === "https:") return url.href;
    } catch (_) {}
    return "";
  }

  function esc(s) {
    return String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
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
      adminNav.style.display = isAdmin ? "flex" : "none";
    }
    if (btnLogin) {
      btnLogin.hidden = isAdmin;
      btnLogin.style.display = isAdmin ? "none" : "";
    }
    if (adminBadge) {
      adminBadge.hidden = !isAdmin;
      adminBadge.style.display = isAdmin ? "" : "none";
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
    script.setAttribute("data-theme", "transparent_dark");
    script.setAttribute("data-lang", lang === "en" ? "en" : "ru");
    wrap.appendChild(script);
  }

  function applyStaticI18n() {
    document.documentElement.lang = lang;
    document.title = t("pageTitle");
    const nav = document.querySelector(".nav");
    if (nav) nav.setAttribute("aria-label", t("navLabel"));

    const setTxt = (id, key) => {
      const el = $(id);
      if (el) el.textContent = t(key);
    };
    setTxt("btnProfile", "profile");
    setTxt("btnExport", "export");
    setTxt("btnAdd", "addGame");
    setTxt("btnLogout", "logout");
    setTxt("btnLogin", "login");

    const fileLabel = document.querySelector(".file-btn");
    if (fileLabel) {
      const input = fileLabel.querySelector("input");
      [...fileLabel.childNodes].forEach((n) => {
        if (n.nodeType === Node.TEXT_NODE) n.remove();
      });
      fileLabel.insertBefore(document.createTextNode(t("import") + " "), input);
    }

    if ($("btnLogin")) $("btnLogin").title = t("loginTitle");
    const section = document.querySelector(".section-title");
    if (section) section.textContent = t("shelf");
    document.querySelectorAll("#filters .chip").forEach((chip) => {
      const f = chip.getAttribute("data-filter");
      if (f === "all") chip.textContent = t("all");
      if (f === "released") chip.textContent = t("released");
      if (f === "wip") chip.textContent = t("wip");
      if (f === "jam") chip.textContent = t("jam");
    });
    if ($("search")) $("search").placeholder = t("search");
    if (empty) empty.textContent = t("empty");
    if ($("adminBadge")) $("adminBadge").textContent = t("adminBadge");
    const dropP = dropVeil?.querySelector("p");
    if (dropP) dropP.textContent = t("drop");
    const foot = document.querySelector(".foot p");
    if (foot) {
      foot.innerHTML =
        t("foot") +
        ' <a href="https://muov.itch.io/" target="_blank" rel="noopener">muov.itch.io</a> · ' +
        t("footSync");
    }
    document.querySelectorAll(".lang-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.lang === lang);
    });
    if ($("commentsTitle")) $("commentsTitle").textContent = t("comments");
    if ($("commentsHint")) $("commentsHint").textContent = t("commentsHint");
    setGiscusLang(lang);
  }

  function setLang(next) {
    lang = next === "en" ? "en" : "ru";
    localStorage.setItem(LANG_KEY, lang);
    applyStaticI18n();
    renderAll();
  }

  function visibleGames() {
    let list = (state?.games || []).slice();
    if (filter !== "all") list = list.filter((g) => g.status === filter);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (g) =>
          (g.title || "").toLowerCase().includes(q) ||
          (g.tagline || "").toLowerCase().includes(q) ||
          (g.genres || []).some((x) => String(x).toLowerCase().includes(q))
      );
    }
    list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return list;
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
  }

  function renderGrid() {
    const list = visibleGames();
    grid.innerHTML = "";
    empty.hidden = list.length > 0;
    for (const g of list) {
      const art = document.createElement("article");
      art.className = "case" + (g.featured ? " is-featured" : "");
      art.setAttribute("role", "listitem");
      const stamp = statusLabel(g.status);
      const cover = g.cover
        ? `<img src="${esc(g.cover)}" alt="" loading="lazy" onerror="this.style.display='none'" />`
        : `<div class="poster-fallback">${esc((g.title || "?").slice(0, 1))}</div>`;
      const metaBits = [];
      if (g.year) metaBits.push(`<span>${esc(g.year)}</span>`);
      (g.genres || []).slice(0, 2).forEach((x) => metaBits.push(`<span>${esc(x)}</span>`));
      (g.platforms || []).slice(0, 2).forEach((x) => metaBits.push(`<span>${esc(x)}</span>`));
      const statsHtml = formatStats(g.stats, true);
      art.innerHTML = `
        <button type="button" class="case-btn" data-open="${esc(g.id)}" aria-label="${esc(g.title)}">
          <div class="poster">
            ${cover}
            ${g.status ? `<span class="stamp ${esc(g.status)}">${esc(stamp)}</span>` : ""}
          </div>
          <div class="case-body">
            <p class="case-title">${esc(g.title)}</p>
            ${g.tagline ? `<p class="case-tagline">${esc(g.tagline)}</p>` : ""}
            <div class="meta">${metaBits.join("")}</div>
            ${statsHtml}
          </div>
        </button>`;
      grid.appendChild(art);
    }
  }

  function renderAll() {
    applyStaticI18n();
    renderHero();
    renderGrid();
    updateAuthUI();
  }

  function openPanel(next) {
    panel = next;
    dialogBody.innerHTML = "";
    if (panel.mode === "view") renderView(panel.gameId);
    else if (panel.mode === "edit" || panel.mode === "create") {
      if (!isAdmin) return;
      renderForm(panel);
    } else if (panel.mode === "profile") {
      if (!isAdmin) return;
      renderProfileForm();
    } else if (panel.mode === "auth") renderAuth();
    if (!dialog.open) dialog.showModal();
  }

  function closePanel() {
    panel = null;
    if (dialog.open) dialog.close();
  }

  function getGame(id) {
    return state.games.find((g) => g.id === id);
  }

  function renderAuth() {
    const creds = getCreds();
    const isCustom = !!localStorage.getItem(CREDS_KEY);
    dialogBody.innerHTML = `
      <div class="sheet-head">
        <h2>${esc(t("ownerLogin"))}</h2>
        <button type="button" class="btn ghost" data-act="close">${esc(t("close"))}</button>
      </div>
      <form id="authForm" class="form-grid auth-box">
        <label class="field">${esc(t("username"))}
          <input name="username" autocomplete="username" required value="${esc(creds.username)}" />
        </label>
        <label class="field">${esc(t("password"))}
          <input name="password" type="password" autocomplete="current-password" required />
        </label>
        <p class="auth-error" id="authError"></p>
        <div class="form-footer" style="justify-content:stretch">
          <button type="submit" class="btn primary" style="width:100%">${esc(t("signIn"))}</button>
        </div>
        <p class="hint">${isCustom ? t("customHint") : t("defaultHint")}</p>
        <p class="hint">${esc(t("guestHint"))}</p>
        <button type="button" class="btn ghost" id="btnRegister" style="width:100%;margin-top:0.5rem">${esc(t("changePass"))}</button>
      </form>`;
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
        state = loadDraft() || structuredClone(published);
        closePanel();
        renderAll();
      } else if (err) err.textContent = t("badLogin");
    };
    dialogBody.querySelector("#btnRegister").onclick = () => renderRegister();
  }

  function renderRegister() {
    dialogBody.innerHTML = `
      <div class="sheet-head">
        <h2>${esc(t("changeAccess"))}</h2>
        <button type="button" class="btn ghost" data-act="close">${esc(t("close"))}</button>
      </div>
      <form id="regForm" class="form-grid auth-box">
        <label class="field">${esc(t("currentPass"))}<input name="current" type="password" required /></label>
        <label class="field">${esc(t("newUser"))}<input name="username" required value="${esc(getCreds().username)}" /></label>
        <label class="field">${esc(t("newPass"))}<input name="password" type="password" required minlength="6" /></label>
        <label class="field">${esc(t("newPass2"))}<input name="password2" type="password" required minlength="6" /></label>
        <p class="auth-error" id="authError"></p>
        <div class="form-footer">
          <button type="button" class="btn ghost" data-act="back">${esc(t("back"))}</button>
          <button type="submit" class="btn primary">${esc(t("save"))}</button>
        </div>
        <p class="hint">${esc(t("passHint"))}</p>
      </form>`;
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
      closePanel();
      alert(t("passUpdated"));
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
    dialogBody.innerHTML = `
      <div class="sheet-head">
        <div>
          <h2>${esc(g.title)}</h2>
          <p style="margin:0.25rem 0 0;color:var(--muted)">${esc(g.tagline || "")}</p>
        </div>
        <div class="sheet-actions">
          ${isAdmin ? `<button type="button" class="btn" data-act="edit">${esc(t("edit"))}</button>` : ""}
          <button type="button" class="btn ghost" data-act="close">${esc(t("close"))}</button>
        </div>
      </div>
      <div class="view-layout ${g.cover ? "has-poster" : ""}">
        ${g.cover ? `<div class="view-poster"><img src="${esc(g.cover)}" alt="" /></div>` : ""}
        <div>
          <p style="white-space:pre-wrap;margin:0 0 1rem">${esc(g.description || t("noDesc"))}</p>
          <div class="meta" style="margin:0 0 1rem">
            <span>${esc(statusLabel(g.status))}</span>
            ${g.year ? `<span>${esc(g.year)}</span>` : ""}
            ${g.role ? `<span>${esc(g.role)}</span>` : ""}
            ${(g.genres || []).map((x) => `<span>${esc(x)}</span>`).join("")}
            ${(g.platforms || []).map((x) => `<span>${esc(x)}</span>`).join("")}
            ${(g.tags || []).map((x) => `<span>${esc(x)}</span>`).join("")}
          </div>
          <div id="gameStatsBar" class="stats-bar">${formatStats(g.stats, false)}</div>
          <div class="sheet-actions">
            ${play ? `<a class="btn primary" href="${esc(play)}" target="_blank" rel="noopener">${esc(t("play"))}</a>` : ""}
            ${trailer ? `<a class="btn" href="${esc(trailer)}" target="_blank" rel="noopener">${esc(t("trailer"))}</a>` : ""}
            ${repo ? `<a class="btn" href="${esc(repo)}" target="_blank" rel="noopener">${esc(t("repo"))}</a>` : ""}
            ${isAdmin ? `<button type="button" class="btn danger" data-act="delete">${esc(t("delete"))}</button>` : ""}
          </div>
          ${(g.shots || []).length ? `<div class="shots">${(g.shots || []).map((s) => `<img src="${esc(s)}" alt="" loading="lazy" />`).join("")}</div>` : ""}
        </div>
      </div>
      <div class="game-comments">
        <h3 class="game-comments-title">${esc(t("gameComments"))}</h3>
        <p class="comments-hint">${esc(t("gameCommentsHint"))}</p>
        <div id="gameGiscusHost"></div>
      </div>`;
    dialogBody.querySelector('[data-act="close"]').onclick = closePanel;
    const editBtn = dialogBody.querySelector('[data-act="edit"]');
    if (editBtn) editBtn.onclick = () => openPanel({ mode: "edit", gameId: id });
    const delBtn = dialogBody.querySelector('[data-act="delete"]');
    if (delBtn)
      delBtn.onclick = () => {
        const msg =
          typeof t("deleteConfirm") === "function"
            ? t("deleteConfirm")(g.title)
            : `Delete ${g.title}?`;
        if (!confirm(msg)) return;
        state.games = state.games.filter((x) => x.id !== id);
        saveDraft();
        closePanel();
        renderGrid();
      };
    mountGameGiscus(dialogBody.querySelector("#gameGiscusHost"), id);
    bumpSiteView(id).then((n) => {
      if (n == null) return;
      const game = getGame(id);
      if (!game) return;
      game.stats = game.stats || {};
      // site open counter shown alongside manual/itch views
      game.stats.siteViews = n;
      const bar = dialogBody.querySelector("#gameStatsBar");
      if (bar) {
        const site = `<span class="stat-pill site"><i>🌐</i><b>${esc(
          formatNum(n)
        )}</b> <em>${esc(t("siteViews"))}</em></span>`;
        bar.innerHTML = (formatStats(game.stats, false) || "") + site;
      }
    });
  }

  function blankGame() {
    return {
      id: uid(),
      title: "",
      tagline: "",
      year: new Date().getFullYear(),
      role: "solo",
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
    };
  }

  function fileToDataUrl(file, maxW = 1280, quality = 0.8) {
    return new Promise((resolve, reject) => {
      if (!file?.type.startsWith("image/")) return reject(new Error("image"));
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const scale = Math.min(1, maxW / img.width);
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", quality));
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
    const g = isNew ? blankGame() : { ...getGame(p.gameId) };
    if (!isNew && !getGame(p.gameId)) {
      closePanel();
      return;
    }
    const statuses = ["released", "wip", "jam", "prototype"];
    dialogBody.innerHTML = `
      <div class="sheet-head">
        <h2>${esc(isNew ? t("newGame") : t("editing"))}</h2>
        <button type="button" class="btn ghost" data-act="close">${esc(t("close"))}</button>
      </div>
      <form id="gameForm" class="form-grid">
        <label class="field">${esc(t("title"))}<input name="title" required value="${esc(g.title)}" /></label>
        <label class="field">${esc(t("tagline"))}<input name="tagline" value="${esc(g.tagline)}" /></label>
        <div class="form-grid two">
          <label class="field">${esc(t("year"))}<input name="year" type="number" value="${esc(g.year || "")}" /></label>
          <label class="field">${esc(t("role"))}<input name="role" value="${esc(g.role || "")}" /></label>
        </div>
        <div class="form-grid two">
          <label class="field">${esc(t("status"))}
            <select name="status">${statuses
              .map(
                (k) =>
                  `<option value="${k}" ${g.status === k ? "selected" : ""}>${esc(
                    statusLabel(k)
                  )}</option>`
              )
              .join("")}</select>
          </label>
          <label class="field">${esc(t("genres"))}<input name="genres" value="${esc(
      (g.genres || []).join(", ")
    )}" /></label>
        </div>
        <label class="field">${esc(t("platforms"))}<input name="platforms" value="${esc(
      (g.platforms || []).join(", ")
    )}" /></label>
        <label class="field">${esc(t("description"))}<textarea name="description">${esc(
      g.description || ""
    )}</textarea></label>
        <label class="field">${esc(t("playUrl"))}<input name="playUrl" type="url" value="${esc(
      g.playUrl || ""
    )}" /></label>
        <div class="form-grid two">
          <label class="field">${esc(t("trailerUrl"))}<input name="trailerUrl" type="url" value="${esc(
      g.trailerUrl || ""
    )}" /></label>
          <label class="field">${esc(t("repoUrl"))}<input name="repoUrl" type="url" value="${esc(
      g.repoUrl || ""
    )}" /></label>
        </div>
        <label class="field">${esc(t("cover"))}<input name="coverFile" type="file" accept="image/*" /></label>
        <label class="field">${esc(t("shots"))}<input name="shotsFile" type="file" accept="image/*" multiple /></label>
        <div class="form-grid two">
          <label class="field">${esc(t("downloads"))}
            <input name="downloads" type="number" min="0" step="1" value="${esc(
              g.stats && g.stats.downloads != null ? g.stats.downloads : ""
            )}" placeholder="0" />
          </label>
          <label class="field">${esc(t("views"))}
            <input name="views" type="number" min="0" step="1" value="${esc(
              g.stats && g.stats.views != null ? g.stats.views : ""
            )}" placeholder="0" />
          </label>
        </div>
        <label class="field">${esc(t("plays"))}
          <input name="plays" type="number" min="0" step="1" value="${esc(
            g.stats && g.stats.plays != null ? g.stats.plays : ""
          )}" placeholder="0" />
        </label>
        <label class="check-row"><input type="checkbox" name="featured" ${
          g.featured ? "checked" : ""
        } /> ${esc(t("featured"))}</label>
        <div class="form-footer">
          <button type="button" class="btn ghost" data-act="close">${esc(t("cancel"))}</button>
          <button type="submit" class="btn primary">${esc(t("save"))}</button>
        </div>
      </form>`;
    dialogBody.querySelector('[data-act="close"]').onclick = closePanel;
    const form = dialogBody.querySelector("#gameForm");
    form.onsubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const next = {
        ...g,
        title: String(fd.get("title") || "").trim(),
        tagline: String(fd.get("tagline") || "").trim(),
        year: Number(fd.get("year")) || null,
        role: String(fd.get("role") || "").trim(),
        status: String(fd.get("status") || "wip"),
        genres: String(fd.get("genres") || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        platforms: String(fd.get("platforms") || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        description: String(fd.get("description") || "").trim(),
        playUrl: String(fd.get("playUrl") || "").trim(),
        trailerUrl: String(fd.get("trailerUrl") || "").trim(),
        repoUrl: String(fd.get("repoUrl") || "").trim(),
        featured: form.featured.checked,
        stats: {
          ...(g.stats || {}),
          downloads: fd.get("downloads") === "" || fd.get("downloads") == null
            ? null
            : Number(fd.get("downloads")),
          views: fd.get("views") === "" || fd.get("views") == null
            ? null
            : Number(fd.get("views")),
          plays: fd.get("plays") === "" || fd.get("plays") == null
            ? null
            : Number(fd.get("plays")),
        },
      };
      // clean NaN
      ["downloads", "views", "plays"].forEach((k) => {
        if (next.stats[k] != null && !isFinite(next.stats[k])) next.stats[k] = null;
      });
      try {
        if (form.coverFile.files[0])
          next.cover = await fileToDataUrl(form.coverFile.files[0], 1280, 0.82);
      } catch (_) {
        alert(t("coverFail"));
        return;
      }
      const shotFiles = [...form.shotsFile.files].slice(0, 4);
      if (shotFiles.length) {
        try {
          next.shots = await Promise.all(shotFiles.map((f) => fileToDataUrl(f, 960, 0.78)));
        } catch (_) {
          alert(t("shotsFail"));
          return;
        }
      }
      if (next.featured)
        state.games.forEach((x) => {
          if (x.id !== next.id) x.featured = false;
        });
      if (isNew) state.games.unshift(next);
      else {
        const i = state.games.findIndex((x) => x.id === next.id);
        if (i >= 0) state.games[i] = next;
      }
      saveDraft();
      closePanel();
      renderGrid();
    };
  }

  function renderProfileForm() {
    const p = state.profile;
    dialogBody.innerHTML = `
      <div class="sheet-head">
        <h2>${esc(t("profile"))}</h2>
        <button type="button" class="btn ghost" data-act="close">${esc(t("close"))}</button>
      </div>
      <form id="profileForm" class="form-grid">
        <div class="form-grid two">
          <label class="field">${esc(t("name"))}<input name="name" required value="${esc(
      p.name || ""
    )}" /></label>
          <label class="field">${esc(t("role"))} (RU)<input name="role" value="${esc(
      p.role || ""
    )}" /></label>
        </div>
        <label class="field">${esc(t("role"))} (EN)<input name="roleEn" value="${esc(
      p.roleEn || ""
    )}" /></label>
        <label class="field">${esc(t("city"))}<input name="city" value="${esc(p.city || "")}" /></label>
        <label class="field">${esc(t("about"))} (RU)<textarea name="bio">${esc(
      p.bio || ""
    )}</textarea></label>
        <label class="field">${esc(t("about"))} (EN)<textarea name="bioEn">${esc(
      p.bioEn || ""
    )}</textarea></label>
        <label class="field">${esc(t("links"))}<textarea name="links">${esc(
      (p.links || []).map((l) => `${l.label} | ${l.url}`).join("\n")
    )}</textarea></label>
        <div class="form-footer">
          <button type="button" class="btn ghost" data-act="reset">${esc(t("resetPublished"))}</button>
          <button type="button" class="btn ghost" data-act="close">${esc(t("cancel"))}</button>
          <button type="submit" class="btn primary">${esc(t("save"))}</button>
        </div>
      </form>`;
    dialogBody.querySelector('[data-act="close"]').onclick = closePanel;
    dialogBody.querySelector('[data-act="reset"]').onclick = () => {
      if (!confirm(t("resetConfirm"))) return;
      localStorage.removeItem(STORAGE_KEY);
      state = structuredClone(published);
      closePanel();
      renderAll();
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
    };
  }

  function exportJson() {
    const blob = new Blob(
      [JSON.stringify({ ...state, updatedAt: new Date().toISOString() }, null, 2)],
      { type: "application/json" }
    );
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "portfolio.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function importText(text) {
    if (!isAdmin) {
      alert(t("importOnly"));
      return;
    }
    try {
      const data = JSON.parse(text);
      if (!isValidPortfolio(data)) throw new Error("bad");
      state = data;
      saveDraft();
      renderAll();
      closePanel();
      alert(t("importOk"));
    } catch (_) {
      alert(t("importFail"));
    }
  }

  $("btnLogin").onclick = () => openPanel({ mode: "auth" });
  $("btnLogout").onclick = () => {
    setSession(false);
    state = structuredClone(published);
    renderAll();
  };
  $("btnAdd").onclick = () => isAdmin && openPanel({ mode: "create" });
  $("btnProfile").onclick = () => isAdmin && openPanel({ mode: "profile" });
  $("btnExport").onclick = () => isAdmin && exportJson();
  $("fileImport").onchange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => importText(String(reader.result || ""));
    reader.readAsText(f);
    e.target.value = "";
  };

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-open]");
    if (!btn) return;
    openPanel({ mode: "view", gameId: btn.getAttribute("data-open") });
  });

  $("filters").addEventListener("click", (e) => {
    const chip = e.target.closest("[data-filter]");
    if (!chip) return;
    filter = chip.getAttribute("data-filter");
    $("filters").querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    renderGrid();
  });

  $("search").addEventListener("input", (e) => {
    query = e.target.value.trim();
    renderGrid();
  });

  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) closePanel();
  });
  dialog.addEventListener("close", () => {
    panel = null;
  });

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
    if (dragDepth === 0) hideDropVeil();
  });
  window.addEventListener("dragover", (e) => {
    if (!isAdmin || !hasFiles(e)) return;
    e.preventDefault();
  });
  window.addEventListener("drop", (e) => {
    e.preventDefault();
    hideDropVeil();
    if (!isAdmin) return;
    const f = e.dataTransfer?.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => importText(String(reader.result || ""));
    reader.readAsText(f);
  });
  window.addEventListener("dragend", hideDropVeil);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideDropVeil();
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  async function boot() {
    hideDropVeil();
    published = structuredClone(SEED);
    try {
      const res = await fetch("data/portfolio.json", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (isValidPortfolio(data) && data.games.length > 0) published = data;
      }
    } catch (_) {}
    isAdmin = loadSession();
    state = isAdmin ? loadDraft() || structuredClone(published) : structuredClone(published);
    renderAll();
  }

  boot();
})();
