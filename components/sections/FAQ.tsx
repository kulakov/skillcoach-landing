"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FAQ = () => {
  const faqs = [
    {
      question: "Сколько времени занимает внедрение?",
      answer: [
        "Большинство команд запускаются за 2 недели. Настройка включает:",
        "1. Конфигурация SSO (1 день)",
        "2. Настройка интеграций — Slack/Teams, Calendar, HRIS (2-3 дня)",
        "3. Настройка первой программы обучения (1-2 часа)",
        "4. Пилот с одной командой (1 неделя)",
        "Мы берём на себя техническую настройку. Вашей команде нужно только предоставить контекст обучения.",
      ],
    },
    {
      question: "Какие интеграции вы поддерживаете?",
      answer: [
        "Текущие интеграции:",
        "• Коммуникации: Slack, Microsoft Teams, Email",
        "• Календарь: Google Calendar, Outlook",
        "• Рабочее пространство: Notion, Confluence, Google Docs",
        "• HRIS: Workday, BambooHR, Rippling (через API)",
        "• SSO: Okta, Azure AD, Google Workspace",
        "",
        "Скоро: Salesforce, HubSpot, кастомные LMS webhook.",
        "",
        "Не видите свою? Поговорите с нами — мы выпускаем новые интеграции ежемесячно.",
      ],
    },
    {
      question: "Как реагируют сотрудники? Это «ещё один бот»?",
      answer: [
        "Мы спроектировали минимальное трение:",
        "• Первый контакт — 2-3 минуты, разговорный формат",
        "• Сотрудники выбирают предпочитаемый канал (Slack, Teams, Email)",
        "• «Мягкие напоминания» — не навязчивость. Можно отложить или пропустить.",
        "• 78% сотрудников оценивают опыт на 4+ звезды",
        "• Частый отзыв: «Реально полезно, не раздражает»",
        "",
        "Мы готовы поделиться данными об отзывах сотрудников на демо.",
      ],
    },
    {
      question: "Чем это отличается от LMS / LinkedIn Learning?",
      answer: [
        "LMS и библиотеки контента отлично справляются с доставкой. SkillCoach — это то, что происходит после.",
        "",
        "| Функция | LMS | LinkedIn Learning | SkillCoach |",
        "|---------|-----|-------------------|------------|",
        "| Доставка контента | Да | Да | Нет |",
        "| Трекинг прохождения | Да | Да | Нет |",
        "| Пост-тренинг follow-up | Нет | Нет | Да |",
        "| Персональные планы | Нет | Нет | Да |",
        "| Измерение усвоения | Нет | Нет | Да |",
        "| Данные об изменении поведения | Нет | Нет | Да |",
        "",
        "Мы интегрируемся с вашей существующей LMS — мы её не заменяем.",
      ],
    },
    {
      question: "Какой у вас уровень безопасности?",
      answer: [
        "• SOC 2 Type II сертифицирован (отчёт доступен под NDA)",
        "• GDPR compliant — данные ЕС остаются в ЕС",
        "• Шифрование при передаче (TLS 1.3) и хранении (AES-256)",
        "• SSO обязателен для enterprise-аккаунтов",
        "• Данные сотрудников не продаются и не используются для обучения моделей",
        "• Ежегодное пентестирование третьей стороной",
        "",
        "Полная документация по безопасности доступна по запросу.",
      ],
    },
    {
      question: "Можно посмотреть, как это работает, до принятия решения?",
      answer: [
        "Конечно. Наше демо включает:",
        "• Живой показ опыта сотрудника",
        "• Пример дашборда с анонимизированными данными",
        "• Моделирование ROI для вашей конкретной ситуации",
        "• Q&A с нашей командой",
        "",
        "Никаких обязательств. Большинство демо длится 30 минут.",
      ],
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Часто задаваемые вопросы
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-muted-foreground">
                    {faq.answer.map((line, i) => (
                      <p key={i} className={line.startsWith("•") ? "ml-4" : ""}>
                        {line}
                      </p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA after FAQ */}
          <div className="text-center mt-8">
            <Button size="lg" asChild>
              <Link href="#demo">Заказать демо</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
