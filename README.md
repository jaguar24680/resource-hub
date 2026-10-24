# Resource Hub · Gate 0

Новый отдельный Next.js App Router / TypeScript / Tailwind CSS design mock. Только локальная демонстрация, 18 fixture-записей из исходного реестра. Никакой записи данных, подключения внешних систем или авторизации.

## Запуск в PowerShell

```powershell
Set-Location 'C:\Users\user\Documents\ChatGPT\Resource Hub\Resource-Hub'
npm ci
npm run dev
```

Открыть http://127.0.0.1:3000/ (A) или http://127.0.0.1:3000/?concept=b (B). Сервер привязан к loopback и не доступен с физического iPhone по сети. Ширины iPhone проверяются в браузере; реальное устройство и клавиатура Safari требуют отдельного review. Для production-mode локального review: `npm run build`, затем `npm start`.

Проверки: `npm run typecheck`, `npm run lint`, `npm run build`. Lockfile фиксирует установленные версии. Внешние шрифты/изображения не запрашиваются.

## Что попробовать

Поиск `react`, `council`, несуществующее слово; тема вместе с типом; сортировка по названию; избранное и подборки; заметка в карточке; обе ссылки YouMind; Council Guide без URL; Pi.Alert без подтверждённого источника; добавление ссылки и документа. Внизу страницы переключатель демонстрационных состояний загрузки, ошибки и pending.

Все изменения только в памяти и сбрасываются при reload/переключении концепции. Формы никуда не отправляются. Обложки — оригинальные CSS/типографические композиции, не официальные логотипы источников. Старый HTML/Next.js прототип не использован.

Документация: docs/UX-IA.md, docs/DESIGN-DIRECTIONS.md, docs/DESIGN-TOKENS.md, docs/GATE-0-REPORT.md. Скриншоты: screenshots/.

Остановка после Gate 0. Выбор дизайна и разрешение Gate 1 — отдельное решение владельца.
