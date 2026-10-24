"use client";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  Plus,
  Search,
  Library,
  Heart,
  Folder,
  Compass,
  ArrowRight,
  X,
  SlidersHorizontal,
  Check,
  Bookmark,
  Grid2X2,
  List,
  FileText,
} from "lucide-react";
import { resources, topics, collections, type Resource } from "@/lib/resources";

export default function Hub({ concept }: { concept: "a" | "b" }) {
  const [view, setView] = useState("Все ресурсы"),
    [query, setQuery] = useState(""),
    [topic, setTopic] = useState("Все темы"),
    [type, setType] = useState("Все типы"),
    [sort, setSort] = useState("recent"),
    [favorites, setFavorites] = useState([1, 6, 24]),
    [selected, setSelected] = useState<Resource | null>(null),
    [adding, setAdding] = useState(false),
    [documentMode, setDocumentMode] = useState(false),
    [message, setMessage] = useState(""),
    [state, setState] = useState("normal"),
    [list, setList] = useState(false),
    [notes, setNotes] = useState<Record<number, string>>({}),
    [members, setMembers] = useState<Record<number, string>>({});
  const dialog = useRef<HTMLDialogElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const go = (v: string) => {
    setView(v);
    setQuery("");
    setTopic("Все темы");
    setType("Все типы");
    setState("normal");
  };
  const open = (r?: Resource) => {
    setSelected(r ?? null);
    setAdding(!r);
    setMessage("");
    setDocumentMode(false);
    dialog.current?.showModal();
  };
  const toggle = (id: number) =>
    setFavorites((old) =>
      old.includes(id) ? old.filter((x) => x !== id) : [...old, id],
    );
  const filtered = resources
    .filter(
      (r) =>
        (view !== "Избранное" || favorites.includes(r.id)) &&
        (!collections.includes(view) ||
          (members[r.id] ?? r.collection) === view) &&
        (topic === "Все темы" || r.topics.includes(topic)) &&
        (type === "Все типы" || r.type === type) &&
        `${r.title} ${r.summary} ${r.tags.join(" ")}`
          .toLocaleLowerCase("ru")
          .includes(query.toLocaleLowerCase("ru")),
    )
    .sort((a, b) => (sort === "az" ? a.title.localeCompare(b.title, "ru") : 0));
  const nav = [
    { title: "Все ресурсы", icon: Library },
    { title: "Темы", icon: Compass },
    { title: "Подборки", icon: Folder },
    { title: "Избранное", icon: Heart },
  ];
  return (
    <div className={`hub concept-${concept}`}>
      <a className="skip" href="#content">
        Перейти к содержимому
      </a>
      <aside className="sidebar">
        <a className="brand" href={concept === "b" ? "./?concept=b" : "./"}>
          <span className="brand-mark">
            <Library size={23} />
          </span>
          Resource<span className="brand-light">Hub</span>
          <span className="brand-dot">.</span>
        </a>
        <div className="sidebar-label">ЛИЧНАЯ БИБЛИОТЕКА</div>
        <nav aria-label="Основная навигация">
          {nav.map(({ title, icon: Icon }) => (
            <button
              key={title}
              className={view === title ? "active" : ""}
              onClick={() => go(title)}
            >
              <Icon size={19} />
              {title}
              {title === "Все ресурсы" && (
                <span className="nav-count">{resources.length}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="sidebar-label collection-label">МОИ ПОДБОРКИ</div>
        <div className="side-collections">
          {collections.map((c, i) => (
            <button
              className={view === c ? "active" : ""}
              key={c}
              onClick={() => go(c)}
            >
              <span className={`collection-dot dot-${i}`} />
              {c}
            </button>
          ))}
        </div>
        <div className="side-bottom">
          <div className="demo-note">
            <span className="demo-dot" />
            Дизайн-прототип · Gate 0
            <p>
              Реальные материалы.
              <br />
              Только демо-взаимодействия.
            </p>
          </div>
          <div className="owner">
            <span>А</span>
            <div>
              Моя библиотека<small>Локальная демонстрация</small>
            </div>
          </div>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <span className="breadcrumb">
            Библиотека <span>/</span> {view}
          </span>
          <span className="mobile-brand">
            <Library size={20} /> Resource Hub.
          </span>
          <div className="top-actions">
            <a
              className="concept-switch"
              href={concept === "a" ? "./?concept=b" : "./"}
            >
              {concept === "a" ? "B · Индекс" : "A · Библиотека"}
              <ArrowUpRight size={14} />
            </a>
            <button className="primary desktop-add" onClick={() => open()}>
              <Plus size={18} />
              Добавить ресурс
            </button>
          </div>
        </header>
        <main id="content">
          <div className="page-heading">
            <div>
              <div className="eyebrow">
                {concept === "a"
                  ? "СОБРАНО С ИНТЕРЕСОМ"
                  : "RESOURCE HUB / ЛИЧНЫЙ ИНДЕКС"}
              </div>
              <h1>
                {view === "Все ресурсы"
                  ? concept === "a"
                    ? "Хорошее стоит сохранить."
                    : "Найти. Открыть. Применить."
                  : view}
              </h1>
              <p>
                {concept === "a"
                  ? "Инструменты, идеи и знания — для того, что вы создаёте."
                  : "Ваш рабочий каталог. От полезной ссылки до следующего действия."}
              </p>
            </div>
            <span className="edition">
              Личная коллекция
              <br />
              <b>№ 001 / 2026</b>
            </span>
          </div>
          <div className="demo-strip">
            ДЕМО · Реестр материалов · Без облачного сохранения
          </div>
          <div className="searchbox">
            <Search size={21} />
            <input
              ref={search}
              aria-label="Поиск ресурсов"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Найти ресурс, идею или инструмент…"
            />
            {query ? (
              <button aria-label="Очистить поиск" onClick={() => setQuery("")}>
                <X size={18} />
              </button>
            ) : (
              <span className="search-hint">По названию, описанию и тегам</span>
            )}
          </div>
          <div className="mobile-shortcuts">
            <button onClick={() => go("Темы")}>
              <Compass size={15} />
              Темы
            </button>
            <button onClick={() => go("Избранное")}>
              <Heart size={15} />
              Избранное
            </button>
          </div>
          {view === "Все ресурсы" && !query && (
            <section className="collection-feature" aria-label="Подборка дня">
              <div className="feature-copy">
                <span className="eyebrow">ВАША ПОДБОРКА</span>
                <h2>
                  <span>Для следующего</span> <span>проекта</span>
                </h2>
                <p>
                  Всё, что пригодится на старте. <br />
                  От первого экрана до предложения.
                </p>
                <button onClick={() => go(collections[0])}>
                  Открыть подборку <ArrowRight size={18} />
                </button>
              </div>
              <div className="feature-art" aria-hidden="true">
                <div className="art-paper paper-back">
                  Aa<span>TYPE / FORM</span>
                </div>
                <div className="art-paper paper-front">
                  <span>RESOURCE NOTES</span>
                  <div className="art-orbit" />
                  <b>
                    Идея начинается
                    <br />с любопытства.
                  </b>
                  <small>КОЛЛЕКЦИЯ / 01</small>
                </div>
              </div>
              <span className="feature-number" aria-hidden="true">
                01—
              </span>
            </section>
          )}
          {view === "Темы" && (
            <section className="topic-directory" aria-label="Все темы">
              {topics.map((t, i) => (
                <button
                  key={t}
                  className={topic === t ? "selected" : ""}
                  onClick={() => setTopic(t)}
                >
                  <span>0{i + 1}</span>
                  {t}
                  <ArrowUpRight size={18} />
                </button>
              ))}
            </section>
          )}
          {view === "Подборки" && (
            <section className="collection-directory">
              {collections.map((c, i) => (
                <button key={c} onClick={() => go(c)}>
                  <Folder size={24} />
                  <span>0{i + 1}</span>
                  <h2>{c}</h2>
                  <p>
                    {
                      resources.filter(
                        (r) => (members[r.id] ?? r.collection) === c,
                      ).length
                    }{" "}
                    материалов <ArrowRight size={17} />
                  </p>
                </button>
              ))}
            </section>
          )}
          <section className="catalog" aria-label="Каталог ресурсов">
            <div className="catalog-heading">
              <h2>
                {collections.includes(view)
                  ? "В этой подборке"
                  : view === "Избранное"
                    ? "Всегда под рукой"
                    : "Все ресурсы"}{" "}
                <span>{filtered.length}</span>
              </h2>
              <div className="view-toggle">
                <button
                  aria-label="Карточки"
                  aria-pressed={!list}
                  onClick={() => setList(false)}
                >
                  <Grid2X2 size={17} />
                </button>
                <button
                  aria-label="Список"
                  aria-pressed={list}
                  onClick={() => setList(true)}
                >
                  <List size={19} />
                </button>
              </div>
            </div>
            <div className="filters">
              <div className="filter-select">
                <SlidersHorizontal size={16} />
                <select
                  aria-label="Тема"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                >
                  {["Все темы", ...topics].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <select
                aria-label="Тип материала"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {["Все типы", ...new Set(resources.map((r) => r.type))].map(
                  (t) => (
                    <option key={t}>{t}</option>
                  ),
                )}
              </select>
              <select
                className="sort"
                aria-label="Сортировка"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="recent">Порядок подборки</option>
                <option value="az">По названию А–Я</option>
              </select>
            </div>
            {state === "loading" ? (
              <div className="state-panel" role="status">
                <div className="skeleton" />
                <h3>Загрузка каталога</h3>
                <p>Демонстрация состояния загрузки.</p>
              </div>
            ) : state === "error" ? (
              <div className="state-panel" role="alert">
                <h3>Не удалось загрузить каталог</h3>
                <p>Это демонстрация ошибки. Ваши данные не затронуты.</p>
                <button className="primary" onClick={() => setState("normal")}>
                  Повторить
                </button>
              </div>
            ) : state === "pending" ? (
              <div className="state-panel">
                <Bookmark />
                <h3>Ожидает обработки</h3>
                <p>
                  Демонстрация pending: запрос ещё не принят в каталог.
                  <br />
                  Реальная очередь и синхронизация не подключены.
                </p>
                <button onClick={() => setState("normal")}>
                  Вернуться к ресурсам
                </button>
              </div>
            ) : !filtered.length ? (
              <div className="state-panel">
                <Search />
                <h3>Пока ничего не нашлось</h3>
                <p>Попробуйте другое слово или уберите фильтры.</p>
                <button
                  className="primary"
                  onClick={() => {
                    setQuery("");
                    setTopic("Все темы");
                    setType("Все типы");
                  }}
                >
                  Сбросить поиск и фильтры
                </button>
              </div>
            ) : (
              <div className={`resource-grid ${list ? "list-mode" : ""}`}>
                {filtered.map((r, i) => (
                  <article className="resource-card" key={r.id}>
                    <button
                      className={`cover ${r.cover}`}
                      aria-label={`Открыть ${r.title}`}
                      onClick={() => open(r)}
                    >
                      <span className="cover-caption">
                        {r.type === "GitHub"
                          ? "REPOSITORY"
                          : r.type === "PDF"
                            ? "DOCUMENT / 12 PAGES"
                            : "RESOURCE / COLLECTION"}
                      </span>
                      <strong>{r.mark}</strong>
                      <span className="cover-index">
                        {String(i + 1).padStart(2, "0")}{" "}
                        <ArrowUpRight size={18} />
                      </span>
                    </button>
                    <div className="card-body">
                      <div className="card-meta">
                        <span>{r.type}</span>
                        <button
                          className={`favorite ${favorites.includes(r.id) ? "is-favorite" : ""}`}
                          aria-label={`${favorites.includes(r.id) ? "Убрать из избранного:" : "Добавить в избранное:"} ${r.title}`}
                          aria-pressed={favorites.includes(r.id)}
                          onClick={() => toggle(r.id)}
                        >
                          <Heart size={18} />
                        </button>
                      </div>
                      <button className="card-title" onClick={() => open(r)}>
                        {r.title}
                      </button>
                      <p>{r.summary}</p>
                      <div className="card-footer">
                        <span>{r.topics[0]}</span>
                        <span>
                          {!r.urls.length && r.type !== "PDF"
                            ? "Источник не подтверждён"
                            : r.type === "PDF"
                              ? "Файл не приложен"
                              : r.urls.length > 1
                                ? "2 ссылки"
                                : "Из реестра"}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
          <footer className="page-footer">
            <span>
              Демо · {resources.length} записей из реестра · изменения до
              перезагрузки
            </span>
            <label>
              Проверка состояний
              <select
                aria-label="Демонстрационное состояние"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="normal">Каталог</option>
                <option value="loading">Загрузка</option>
                <option value="error">Ошибка</option>
                <option value="pending">Pending import</option>
              </select>
            </label>
          </footer>
        </main>
      </div>
      <nav className="mobile-nav" aria-label="Мобильная навигация">
        {[
          { title: "Все ресурсы", label: "Каталог", icon: Library },
          { title: "Поиск", label: "Поиск", icon: Search },
          { title: "Подборки", label: "Подборки", icon: Folder },
          { title: "Добавить", label: "Добавить", icon: Plus },
        ].map(({ title, label, icon: Icon }) => (
          <button
            key={title}
            className={view === title ? "active" : ""}
            onClick={() =>
              title === "Добавить"
                ? open()
                : title === "Поиск"
                  ? (search.current?.focus(),
                    search.current?.scrollIntoView({ block: "center" }))
                  : go(title)
            }
          >
            <Icon size={21} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <dialog
        aria-label={
          adding ? "Добавить ресурс" : (selected?.title ?? "Карточка ресурса")
        }
        ref={dialog}
        onClose={() => {
          setAdding(false);
          setSelected(null);
        }}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        <div className="dialog-head">
          <span>{adding ? "ДОБАВИТЬ РЕСУРС" : "КАРТОЧКА РЕСУРСА"} · ДЕМО</span>
          <button aria-label="Закрыть" onClick={() => dialog.current?.close()}>
            <X />
          </button>
        </div>
        {selected && (
          <div className="detail">
            <div className={`cover ${selected.cover}`} aria-hidden="true">
              <strong>{selected.mark}</strong>
            </div>
            <span className="eyebrow">{selected.type} / НЕ ПРОВЕРЕНО</span>
            <h2>{selected.title}</h2>
            <p>{selected.summary}</p>
            <div className="detail-tags">
              {selected.topics.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <h3>Источник</h3>
            <p className="subtle">
              {selected.source}. Описание из реестра; проверка и установка не
              подтверждены.
            </p>
            {selected.urls.map((u) => (
              <a
                className="source-link"
                key={u}
                href={u}
                target="_blank"
                rel="noopener noreferrer"
              >
                {u}
                <ArrowUpRight size={16} />
              </a>
            ))}
            {!selected.urls.length && (
              <p className="file-notice">
                <FileText size={20} />
                {selected.type === "PDF"
                  ? "Council_Guide.pdf упомянут в реестре. Сам файл не приложен и не загружен."
                  : "URL отсутствует. Конкретный проект требует подтверждения."}
              </p>
            )}
            <label>
              Личная заметка <small>Только в текущем демо</small>
              <textarea
                value={notes[selected.id] ?? ""}
                onChange={(e) =>
                  setNotes({ ...notes, [selected.id]: e.target.value })
                }
                placeholder="Чем пригодится этот ресурс?"
              />
            </label>
            <label>
              Подборка
              <select
                value={members[selected.id] ?? selected.collection}
                onChange={(e) =>
                  setMembers({ ...members, [selected.id]: e.target.value })
                }
              >
                {collections.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <button className="primary" onClick={() => toggle(selected.id)}>
              <Heart size={18} />
              {favorites.includes(selected.id) ? "В избранном" : "В избранное"}
            </button>
            <p className="subtle">
              Статус проверки: сохранено в исходном реестре. Установка не
              подтверждена. Все изменения здесь временные.
            </p>
          </div>
        )}
        {adding && (
          <form
            className="add-form"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const url = String(data.get("url") ?? "");
              if (!documentMode) {
                try {
                  const u = new URL(url);
                  if (!["http:", "https:"].includes(u.protocol)) throw Error();
                } catch {
                  setMessage("Введите полный адрес с https:// или http://.");
                  return;
                }
              }
              setMessage(
                "Демо-запрос сформирован · pending. Ничего не отправлено и не сохранено.",
              );
            }}
          >
            <h2>Что сохраним?</h2>
            <p>Полезную ссылку или документ — в одном месте.</p>
            <div className="segmented">
              <button
                type="button"
                aria-pressed={!documentMode}
                onClick={() => {
                  setDocumentMode(false);
                  setMessage("");
                }}
              >
                Ссылка
              </button>
              <button
                type="button"
                aria-pressed={documentMode}
                onClick={() => {
                  setDocumentMode(true);
                  setMessage("");
                }}
              >
                Документ без URL
              </button>
            </div>
            {!documentMode ? (
              <label>
                Адрес ресурса
                <input name="url" type="url" required placeholder="https://" />
              </label>
            ) : (
              <p className="file-notice">
                <FileText size={24} />
                Демо карточки документа. Выбор и загрузка файла появятся на
                следующих этапах.
              </p>
            )}
            <label>
              Название
              <input
                name="title"
                required
                placeholder={
                  documentMode
                    ? "Например, Council Guide"
                    : "Как называется ресурс"
                }
              />
            </label>
            <label>
              Тема
              <select>
                {["Неразобранное", ...topics].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label>
              Заметка
              <textarea placeholder="Почему стоит вернуться к этому материалу?" />
            </label>
            <p className="subtle">
              Автоописание и проверка дублей не подключены. Здесь можно
              проверить только форму.
            </p>
            {message && (
              <p className="form-message" role="status">
                <Check size={18} />
                {message}
              </p>
            )}
            <button className="primary" type="submit">
              Проверить демо-заявку <ArrowRight size={18} />
            </button>
            <p className="subtle">
              Нет облачной записи, загрузки файлов или синхронизации.
            </p>
          </form>
        )}
      </dialog>
    </div>
  );
}
