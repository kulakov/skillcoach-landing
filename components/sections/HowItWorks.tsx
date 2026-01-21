import { Settings, MessageSquare, ClipboardList, BarChart3 } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: Settings,
      title: "Настройка",
      subtitle: "(15 минут)",
      description: "Загрузите контекст обучения:",
      bullets: [
        "Чему учили (фреймворки, модели, ожидаемое поведение)",
        "Контекст компании (язык, приоритеты, инструменты)",
        "Контекст роли (обязанности, цели, вызовы)",
      ],
      footer: "SkillCoach учится, как выглядит «хорошо» для вашей организации.",
    },
    {
      number: 2,
      icon: MessageSquare,
      title: "Пост-тренинг интервью",
      subtitle: "(2-3 мин на сотрудника)",
      description: "В течение 48 часов после тренинга AI:",
      bullets: [
        "Связывается через Slack, Teams или Email",
        "Диагностирует текущую стадию усвоения навыка",
        "Находит реалистичные моменты для применения",
        "Фиксирует намерения и ограничения",
      ],
      footer: "Без планирования встреч. Общение там, где работают сотрудники.",
    },
    {
      number: 3,
      icon: ClipboardList,
      title: "План и напоминания",
      subtitle: "",
      description: "AI создаёт:",
      bullets: [
        "2-3 конкретных действия на следующие 2 недели",
        "Блоки в календаре для практики",
        "Шаблоны и ресурсы в рабочем пространстве",
      ],
      footer: "Затем следит за выполнением с лёгкими check-in и корректирует план.",
    },
    {
      number: 4,
      icon: BarChart3,
      title: "Измерение",
      subtitle: "",
      description: "Руководители видят:",
      bullets: [
        "Показатели усвоения по программам, командам и ролям",
        "Движение от «изучил» к «применил» и «вошло в привычку»",
        "Конкретные примеры изменения поведения",
        "Данные для обоснования бюджета",
      ],
      footer: "Наконец — ответ на вопрос «Стоило ли обучение своих денег?»",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Как это работает
          </h2>
          <p className="text-lg text-muted-foreground">
            От завершения тренинга к измеримому усвоению навыков за 4 шага
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
            >
              {/* Step header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Шаг {step.number}</p>
                  <h3 className="font-bold text-foreground">
                    {step.title}
                    {step.subtitle && (
                      <span className="font-normal text-muted-foreground"> {step.subtitle}</span>
                    )}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-3">{step.description}</p>

              {/* Bullets */}
              <ul className="space-y-2 mb-4">
                {step.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <p className="text-sm font-medium text-foreground border-t border-border pt-4">
                {step.footer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
