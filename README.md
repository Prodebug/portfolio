# Muov — портфолио игр

Персональная полка для [muov.itch.io](https://muov.itch.io/).

Гости **только смотрят**. Править может только владелец после входа.

## Вход (админка)

| | |
|---|---|
| Логин | `muov` |
| Пароль по умолчанию | `muov-admin` |

После входа: **Сменить логин / пароль** (кнопка в окне входа).

> Пароль хранится как SHA-256 в `localStorage` **этого браузера**.  
> На GitHub Pages нет общего сервера аккаунтов — это защита интерфейса, не «банк».  
> Другие люди **не могут** сохранить изменения в твой репозиторий.

### Что видят гости
- Профиль и игры из `data/portfolio.json`
- Без кнопок «+ Игра», импорта, профиля

### Что можешь ты после входа
- Добавлять / править / удалять игры
- Редактировать профиль
- Экспорт / импорт JSON
- Черновик в `localStorage`

Чтобы **все** увидели правки на GitHub Pages:

1. Войди → правь → **Экспорт**
2. Замени файл `data/portfolio.json` в репозитории
3. Commit + push

Или дождись авто-синка с itch (ниже).

## Автосинк с itch.io

GitHub Action (`.github/workflows/sync-itch.yml`):

- раз в сутки и по кнопке **Actions → Sync itch.io games → Run workflow**
- парсит `https://muov.itch.io/`
- обновляет `data/portfolio.json`
- **не затирает** ручные описания и локальные обложки у уже известных игр

Локально:

```bash
python3 scripts/sync_itch.py
```

## GitHub Pages

1. Создай репозиторий, залей эту папку
2. Settings → Pages → Deploy from branch → `main` / root (или `/docs`)
3. Actions: разреши workflow с `contents: write` (по умолчанию для своего репо ок)

Сайт: `https://<user>.github.io/<repo>/`

## Локально

```bash
cd muov-portfolio
python3 -m http.server 5173
```

Открой http://localhost:5173

## Структура

```
data/portfolio.json   # источник правды для гостей + Actions
covers/               # локальные картинки Hexagonia
scripts/sync_itch.py  # синхронизация
.github/workflows/    # ежедневный sync
index.html, app.js, styles.css
```
