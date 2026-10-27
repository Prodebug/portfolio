(() => {
  const STORAGE_KEY = "muov-portfolio-v1";
  const SESSION_KEY = "muov-admin-session";
  const CREDS_KEY = "muov-admin-creds";

  const DEFAULT_USER = "muov";
  const DEFAULT_PASS_HASH =
    "d43874f677a1e18e57eecd731480fae08dad046dcc2406cad3617c1434e4576d"; // muov-admin

  /** Встроенный seed — работает даже без fetch (file://) */
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
    ]
  },
  "games": [
    {
      "id": "hexagonia",
      "title": "Hexagonia",
      "tagline": "Платформер с Godot · GMTK Game Jam 2026",
      "year": 2026,
      "role": "разработка",
      "status": "released",
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
        "covers/hex-shot1.jpg",
        "covers/hex-shot2.jpg",
        "covers/hex-shot3.jpg"
      ],
      "playUrl": "https://muov.itch.io/hexagonia",
      "trailerUrl": "",
      "repoUrl": "",
      "featured": true,
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
  "updatedAt": "2026-10-27T18:14:58Z"
};

  const STATUS_LABEL = {
    released: "Релиз",
    wip: "В работе",
    jam: "Джем",
    prototype: "Прототип",
  };

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
    return [...new Uint8Array(buf)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  function getCreds() {
    try {
      const raw = localStorage.getItem(CREDS_KEY);
      if (raw) {
        const c = JSON.parse(raw);
        if (c && c.username && c.passwordHash) return c;
      }
    } catch (_) {}
    return { username: DEFAULT_USER, passwordHash: DEFAULT_PASS_HASH };
  }

  function setCreds(username, passwordHash) {
    localStorage.setItem(
      CREDS_KEY,
      JSON.stringify({ username, passwordHash })
    );
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
    return (
      data &&
      typeof data === "object" &&
      data.profile &&
      typeof data.profile === "object" &&
      Array.isArray(data.games)
    );
  }

  function loadDraft() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!isValidPortfolio(parsed)) return null;
      // пустой черновик без игр при живом published — игнор
      if (
        parsed.games.length === 0 &&
        published &&
        published.games &&
        published.games.length > 0
      ) {
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
        "Черновик сохранён локально · " +
        new Date().toLocaleTimeString("ru-RU") +
        " · Экспорт → GitHub, чтобы увидеть у всех";
    }
  }

  function safeUrl(u) {
    if (!u || typeof u !== "string") return "";
    const t = u.trim();
    if (!t) return "";
    try {
      const url = new URL(t, location.href);
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
      dropVeil.setAttribute("hidden", "");
      dropVeil.style.display = "none";
    }
  }

  function showDropVeil() {
    if (!isAdmin || !dropVeil) return;
    dropVeil.hidden = false;
    dropVeil.removeAttribute("hidden");
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
    $("brandRole").textContent = p.role || "инди-разработчик";
    $("heroTitle").textContent = p.name || "Muov";
    $("heroBio").textContent = p.bio || "";
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

      const stamp = STATUS_LABEL[g.status] || g.status || "";
      const cover = g.cover
        ? `<img src="${esc(g.cover)}" alt="" loading="lazy" onerror="this.style.display='none';this.parentNode.querySelector('.poster-fallback')?.classList.remove('is-hidden')" />
           <div class="poster-fallback is-hidden">${esc((g.title || "?").slice(0, 1))}</div>`
        : `<div class="poster-fallback">${esc((g.title || "?").slice(0, 1))}</div>`;

      const metaBits = [];
      if (g.year) metaBits.push(`<span>${esc(g.year)}</span>`);
      (g.genres || []).slice(0, 2).forEach((x) =>
        metaBits.push(`<span>${esc(x)}</span>`)
      );
      (g.platforms || []).slice(0, 2).forEach((x) =>
        metaBits.push(`<span>${esc(x)}</span>`)
      );

      art.innerHTML = `
        <button type="button" class="case-btn" data-open="${esc(g.id)}" aria-label="${esc(
        g.title
      )}">
          <div class="poster">
            ${cover}
            ${stamp ? `<span class="stamp ${esc(g.status || "")}">${esc(stamp)}</span>` : ""}
          </div>
          <div class="case-body">
            <p class="case-title">${esc(g.title)}</p>
            ${g.tagline ? `<p class="case-tagline">${esc(g.tagline)}</p>` : ""}
            <div class="meta">${metaBits.join("")}</div>
          </div>
        </button>
      `;
      grid.appendChild(art);
    }
  }

  function renderAll() {
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
        <h2>Вход владельца</h2>
        <button type="button" class="btn ghost" data-act="close">Закрыть</button>
      </div>
      <form id="authForm" class="form-grid auth-box">
        <label class="field">Логин
          <input name="username" autocomplete="username" required value="${esc(
            creds.username
          )}" />
        </label>
        <label class="field">Пароль
          <input name="password" type="password" autocomplete="current-password" required />
        </label>
        <p class="auth-error" id="authError"></p>
        <div class="form-footer" style="justify-content:stretch">
          <button type="submit" class="btn primary" style="width:100%">Войти</button>
        </div>
        <p class="hint">
          ${
            isCustom
              ? "Используется твой сохранённый пароль на этом устройстве."
              : "По умолчанию: логин <strong>muov</strong>, пароль <strong>muov-admin</strong> — смени после входа."
          }
        </p>
        <p class="hint">Гости сайт править не могут. Это только для тебя.</p>
        <button type="button" class="btn ghost" id="btnRegister" style="width:100%;margin-top:0.5rem">
          Сменить логин / пароль
        </button>
      </form>
    `;

    dialogBody.querySelector('[data-act="close"]').onclick = closePanel;

    dialogBody.querySelector("#authForm").onsubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const user = String(fd.get("username") || "").trim();
      const pass = String(fd.get("password") || "");
      const hash = await sha256(pass);
      const c = getCreds();
      const err = dialogBody.querySelector("#authError");
      if (user === c.username && hash === c.passwordHash) {
        setSession(true);
        const draft = loadDraft();
        if (draft) state = draft;
        else state = structuredClone(published);
        closePanel();
        renderAll();
      } else {
        if (err) err.textContent = "Неверный логин или пароль";
      }
    };

    dialogBody.querySelector("#btnRegister").onclick = () => renderRegister();
  }

  function renderRegister() {
    dialogBody.innerHTML = `
      <div class="sheet-head">
        <h2>Сменить доступ</h2>
        <button type="button" class="btn ghost" data-act="close">Закрыть</button>
      </div>
      <form id="regForm" class="form-grid auth-box">
        <label class="field">Текущий пароль
          <input name="current" type="password" required autocomplete="current-password" />
        </label>
        <label class="field">Новый логин
          <input name="username" required autocomplete="username" value="${esc(
            getCreds().username
          )}" />
        </label>
        <label class="field">Новый пароль
          <input name="password" type="password" required minlength="6" autocomplete="new-password" />
        </label>
        <label class="field">Ещё раз новый пароль
          <input name="password2" type="password" required minlength="6" autocomplete="new-password" />
        </label>
        <p class="auth-error" id="authError"></p>
        <div class="form-footer">
          <button type="button" class="btn ghost" data-act="back">Назад</button>
          <button type="submit" class="btn primary">Сохранить</button>
        </div>
        <p class="hint">Пароль хранится только как хеш в браузере этого устройства.</p>
      </form>
    `;
    dialogBody.querySelector('[data-act="close"]').onclick = closePanel;
    dialogBody.querySelector('[data-act="back"]').onclick = () => renderAuth();

    dialogBody.querySelector("#regForm").onsubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const err = dialogBody.querySelector("#authError");
      const curHash = await sha256(String(fd.get("current") || ""));
      if (curHash !== getCreds().passwordHash) {
        err.textContent = "Текущий пароль неверный";
        return;
      }
      const p1 = String(fd.get("password") || "");
      const p2 = String(fd.get("password2") || "");
      if (p1 !== p2) {
        err.textContent = "Пароли не совпадают";
        return;
      }
      if (p1.length < 6) {
        err.textContent = "Минимум 6 символов";
        return;
      }
      const user = String(fd.get("username") || "").trim() || "muov";
      setCreds(user, await sha256(p1));
      setSession(true);
      closePanel();
      alert("Логин и пароль обновлены на этом устройстве");
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
          ${
            isAdmin
              ? `<button type="button" class="btn" data-act="edit">Править</button>`
              : ""
          }
          <button type="button" class="btn ghost" data-act="close">Закрыть</button>
        </div>
      </div>
      <div class="view-layout ${g.cover ? "has-poster" : ""}">
        ${
          g.cover
            ? `<div class="view-poster"><img src="${esc(g.cover)}" alt="" /></div>`
            : ""
        }
        <div>
          <p style="white-space:pre-wrap;margin:0 0 1rem">${esc(
            g.description || "Описание пока не добавлено."
          )}</p>
          <div class="meta" style="margin:0 0 1rem">
            <span>${esc(STATUS_LABEL[g.status] || g.status || "—")}</span>
            ${g.year ? `<span>${esc(g.year)}</span>` : ""}
            ${g.role ? `<span>${esc(g.role)}</span>` : ""}
            ${(g.genres || []).map((x) => `<span>${esc(x)}</span>`).join("")}
            ${(g.platforms || []).map((x) => `<span>${esc(x)}</span>`).join("")}
            ${(g.tags || []).map((x) => `<span>${esc(x)}</span>`).join("")}
          </div>
          <div class="sheet-actions">
            ${
              play
                ? `<a class="btn primary" href="${esc(
                    play
                  )}" target="_blank" rel="noopener">Играть / itch</a>`
                : ""
            }
            ${
              trailer
                ? `<a class="btn" href="${esc(
                    trailer
                  )}" target="_blank" rel="noopener">Трейлер</a>`
                : ""
            }
            ${
              repo
                ? `<a class="btn" href="${esc(
                    repo
                  )}" target="_blank" rel="noopener">Репозиторий</a>`
                : ""
            }
            ${
              isAdmin
                ? `<button type="button" class="btn danger" data-act="delete">Удалить</button>`
                : ""
            }
          </div>
          ${
            (g.shots || []).length
              ? `<div class="shots">${(g.shots || [])
                  .map(
                    (s) =>
                      `<img src="${esc(s)}" alt="" loading="lazy" />`
                  )
                  .join("")}</div>`
              : ""
          }
        </div>
      </div>
    `;

    dialogBody.querySelector('[data-act="close"]').onclick = closePanel;
    const editBtn = dialogBody.querySelector('[data-act="edit"]');
    if (editBtn)
      editBtn.onclick = () => openPanel({ mode: "edit", gameId: id });
    const delBtn = dialogBody.querySelector('[data-act="delete"]');
    if (delBtn)
      delBtn.onclick = () => {
        if (!confirm(`Удалить «${g.title}»?`)) return;
        state.games = state.games.filter((x) => x.id !== id);
        saveDraft();
        closePanel();
        renderGrid();
      };
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
      if (!file || !file.type.startsWith("image/")) {
        reject(new Error("Нужно изображение"));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const scale = Math.min(1, maxW / img.width);
          const w = Math.round(img.width * scale);
          const h = Math.round(img.height * scale);
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          canvas.getContext("2d").drawImage(img, 0, 0, w, h);
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

    dialogBody.innerHTML = `
      <div class="sheet-head">
        <h2>${isNew ? "Новая игра" : "Редактирование"}</h2>
        <button type="button" class="btn ghost" data-act="close">Закрыть</button>
      </div>
      <form id="gameForm" class="form-grid">
        <label class="field">Название
          <input name="title" required value="${esc(g.title)}" />
        </label>
        <label class="field">Слоган
          <input name="tagline" value="${esc(g.tagline)}" />
        </label>
        <div class="form-grid two">
          <label class="field">Год
            <input name="year" type="number" min="1990" max="2100" value="${esc(
              g.year || ""
            )}" />
          </label>
          <label class="field">Роль
            <input name="role" value="${esc(g.role || "")}" />
          </label>
        </div>
        <div class="form-grid two">
          <label class="field">Статус
            <select name="status">
              ${Object.entries(STATUS_LABEL)
                .map(
                  ([k, v]) =>
                    `<option value="${k}" ${
                      g.status === k ? "selected" : ""
                    }>${v}</option>`
                )
                .join("")}
            </select>
          </label>
          <label class="field">Жанры (через запятую)
            <input name="genres" value="${esc((g.genres || []).join(", "))}" />
          </label>
        </div>
        <label class="field">Платформы (через запятую)
          <input name="platforms" value="${esc(
            (g.platforms || []).join(", ")
          )}" />
        </label>
        <label class="field">Описание
          <textarea name="description">${esc(g.description || "")}</textarea>
        </label>
        <label class="field">Ссылка на itch / play
          <input name="playUrl" type="url" placeholder="https://muov.itch.io/..." value="${esc(
            g.playUrl || ""
          )}" />
        </label>
        <div class="form-grid two">
          <label class="field">Трейлер URL
            <input name="trailerUrl" type="url" value="${esc(
              g.trailerUrl || ""
            )}" />
          </label>
          <label class="field">Репозиторий
            <input name="repoUrl" type="url" value="${esc(g.repoUrl || "")}" />
          </label>
        </div>
        <label class="field">Обложка
          <input name="coverFile" type="file" accept="image/*" />
        </label>
        <label class="field">Скриншоты (до 4)
          <input name="shotsFile" type="file" accept="image/*" multiple />
        </label>
        <label class="check-row">
          <input type="checkbox" name="featured" ${
            g.featured ? "checked" : ""
          } />
          Избранная (широкая карточка)
        </label>
        <div class="form-footer">
          <button type="button" class="btn ghost" data-act="close">Отмена</button>
          <button type="submit" class="btn primary">Сохранить</button>
        </div>
      </form>
    `;

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
      };

      const coverFile = form.coverFile.files[0];
      if (coverFile) {
        try {
          next.cover = await fileToDataUrl(coverFile, 1280, 0.82);
        } catch (_) {
          alert("Не удалось обработать обложку");
          return;
        }
      }

      const shotFiles = [...form.shotsFile.files].slice(0, 4);
      if (shotFiles.length) {
        try {
          next.shots = await Promise.all(
            shotFiles.map((f) => fileToDataUrl(f, 960, 0.78))
          );
        } catch (_) {
          alert("Не удалось обработать скриншоты");
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
      renderGrid();
    };
  }

  function renderProfileForm() {
    const p = state.profile;
    dialogBody.innerHTML = `
      <div class="sheet-head">
        <h2>Профиль</h2>
        <button type="button" class="btn ghost" data-act="close">Закрыть</button>
      </div>
      <form id="profileForm" class="form-grid">
        <div class="form-grid two">
          <label class="field">Имя
            <input name="name" required value="${esc(p.name || "")}" />
          </label>
          <label class="field">Роль
            <input name="role" value="${esc(p.role || "")}" />
          </label>
        </div>
        <label class="field">Город / подпись
          <input name="city" value="${esc(p.city || "")}" />
        </label>
        <label class="field">О себе
          <textarea name="bio">${esc(p.bio || "")}</textarea>
        </label>
        <label class="field">Ссылки (по одной на строку: Подпись | URL)
          <textarea name="links">${esc(
            (p.links || []).map((l) => `${l.label} | ${l.url}`).join("\n")
          )}</textarea>
        </label>
        <div class="form-footer">
          <button type="button" class="btn ghost" data-act="reset">Сбросить к published</button>
          <button type="button" class="btn ghost" data-act="close">Отмена</button>
          <button type="submit" class="btn primary">Сохранить</button>
        </div>
      </form>
    `;
    dialogBody.querySelector('[data-act="close"]').onclick = closePanel;
    dialogBody.querySelector('[data-act="reset"]').onclick = () => {
      if (!confirm("Сбросить черновик?")) return;
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
        city: String(fd.get("city") || "").trim(),
        bio: String(fd.get("bio") || "").trim(),
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
      alert("Импорт только для владельца после входа");
      return;
    }
    try {
      const data = JSON.parse(text);
      if (!isValidPortfolio(data)) throw new Error("bad shape");
      state = data;
      saveDraft();
      renderAll();
      closePanel();
      alert("Портфолио импортировано в черновик");
    } catch (_) {
      alert("Не удалось прочитать JSON");
    }
  }

  $("btnLogin").onclick = () => openPanel({ mode: "auth" });
  $("btnLogout").onclick = () => {
    setSession(false);
    state = structuredClone(published);
    renderAll();
  };
  $("btnAdd").onclick = () => {
    if (isAdmin) openPanel({ mode: "create" });
  };
  $("btnProfile").onclick = () => {
    if (isAdmin) openPanel({ mode: "profile" });
  };
  $("btnExport").onclick = () => {
    if (isAdmin) exportJson();
  };
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
    $("filters")
      .querySelectorAll(".chip")
      .forEach((c) => c.classList.remove("active"));
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

  async function boot() {
    hideDropVeil();
    published = structuredClone(SEED);
    try {
      const res = await fetch("data/portfolio.json", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (isValidPortfolio(data) && data.games.length > 0) {
          published = data;
        }
      }
    } catch (_) {
      // file:// или нет сети — остаётся SEED
    }

    isAdmin = loadSession();
    if (isAdmin) {
      state = loadDraft() || structuredClone(published);
    } else {
      state = structuredClone(published);
    }
    renderAll();
  }

  boot();
})();
