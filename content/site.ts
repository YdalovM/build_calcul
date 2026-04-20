export type SiteNavLink = {
  href: string;
  label: string;
};

export type SiteNavGroup = {
  title: string;
  links: SiteNavLink[];
};

export type CategoryPreview = {
  title: string;
  text: string;
  status: string;
  href?: string;
};

export type WorkflowStep = {
  title: string;
  text: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ProjectSectionItem = {
  title: string;
  text: string;
};

export type PageIdentity = {
  title: string;
  subtitle: string;
};

export const siteTitle = "Build Calcul";

export const siteTagline =
  "Практичные строительные расчеты и понятные объяснения для ремонта и DIY.";

export const pageIdentityByPath: Record<string, PageIdentity> = {
  "/": {
    title: "Главная",
    subtitle: "Строительные калькуляторы",
  },
  "/o-proekte": {
    title: "О проекте",
    subtitle: "Разделы, категории и подход к развитию продукта",
  },
  "/steny-i-otdelka": {
    title: "Стены и отделка",
    subtitle: "Расчет штукатурки, шпаклевки, грунтовки и краски",
  },
  "/pol-i-styazhka": {
    title: "Пол и стяжка",
    subtitle: "Расчет объема стяжки и количества сухой смеси",
  },
  "/plitka-i-pokrytiya": {
    title: "Плитка и покрытия",
    subtitle: "Расчет количества плитки и упаковок для закупки",
  },
  "/rashodniki-i-smety": {
    title: "Расходники и сметы",
    subtitle: "Расчет бюджета ремонта: материалы, работа и резерв",
  },
  "/politika-konfidencialnosti": {
    title: "Политика конфиденциальности",
    subtitle: "Данные посетителей, аналитика и реклама",
  },
};

// ИИ: единый источник данных для сайдбара и мобильной навигации.
// Держим строгую структуру из двух блоков:
// - "Главное" — главная + посадочные страницы калькуляторов (основной функционал).
// - "Страницы" — вспомогательные: о проекте, политика конфиденциальности.
// Новые пункты в эти группы не добавляем без явного запроса пользователя.
export const mainNavGroups: SiteNavGroup[] = [
  {
    title: "Главное",
    links: [
      { href: "/", label: "Главная" },
      { href: "/steny-i-otdelka", label: "Стены и отделка" },
      { href: "/pol-i-styazhka", label: "Пол и стяжка" },
      { href: "/plitka-i-pokrytiya", label: "Плитка и покрытия" },
      { href: "/rashodniki-i-smety", label: "Расходники и сметы" },
    ],
  },
  {
    title: "Страницы",
    links: [
      { href: "/o-proekte", label: "О проекте" },
      { href: "/politika-konfidencialnosti", label: "Конфиденциальность" },
    ],
  },
];

export const categoryPreviews: CategoryPreview[] = [
  {
    title: "Стены и отделка",
    text: "Расчеты под штукатурку, шпаклевку, краску и сопутствующие материалы.",
    status: "Доступно сейчас",
    href: "/steny-i-otdelka",
  },
  {
    title: "Пол и стяжка",
    text: "Объем смеси, запас, этапы закупки и базовые ограничения расчетов.",
    status: "Доступно сейчас",
    href: "/pol-i-styazhka",
  },
  {
    title: "Плитка и покрытия",
    text: "Площадь укладки, подрезка, запас и логика расчета по помещению.",
    status: "Доступно сейчас",
    href: "/plitka-i-pokrytiya",
  },
  {
    title: "Расходники и сметы",
    text: "Блоки с типовыми ошибками и пояснения по закупке без перерасхода.",
    status: "Доступно сейчас",
    href: "/rashodniki-i-smety",
  },
];

export const projectSections: ProjectSectionItem[] = [
  {
    title: "Калькуляторы",
    text: "Ключевые расчетные модули по строительным задачам с прозрачной логикой и понятными ограничениями.",
  },
  {
    title: "Практические пояснения",
    text: "После каждого расчета пользователь получает объяснение результата и следующий прикладной шаг.",
  },
  {
    title: "SEO-страницы",
    text: "Каждый модуль поддерживается отдельной посадочной страницей под конкретный пользовательский интент.",
  },
];

export const workflowSteps: WorkflowStep[] = [
  {
    title: "Быстрый ввод",
    text: "Пользователь заполняет минимальный набор полей и сразу получает первую оценку.",
  },
  {
    title: "Прозрачный расчет",
    text: "Показываем, как получен результат: формула, округление, допущения и запас.",
  },
  {
    title: "Практический следующий шаг",
    text: "Сразу рядом рекомендации: что купить, где ошибаются чаще всего и что проверить.",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Чем Build Calcul будет отличаться от типовых сайтов?",
    answer:
      "Не только расчетом, но и пояснением результата, списком ошибок и практичным следующим шагом для пользователя.",
  },
  {
    question: "Когда включится монетизация?",
    answer:
      "После набора ядра аудитории и подтверждения, что реклама не ломает ключевой пользовательский сценарий.",
  },
];
