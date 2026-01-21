import { Quote } from "lucide-react";

const Results = () => {
  const metrics = [
    {
      value: "73%",
      label: "сотрудников применяют новые навыки в течение 30 дней",
      context: "(vs. 15% в среднем по индустрии без подкрепления)",
    },
    {
      value: "4.2x",
      label: "выше вероятность устойчивого изменения поведения через 90 дней",
      context: "По сравнению с контрольными группами только с тренингом",
    },
    {
      value: "12 часов",
      label: "экономит каждый член L&D-команды в месяц",
      context: "На ручных follow-up, check-in и отчётности",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Результаты наших клиентов
          </h2>
        </div>

        {/* Metrics cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-border p-8 text-center shadow-sm"
            >
              <p className="text-5xl md:text-6xl font-bold text-primary mb-3">
                {metric.value}
              </p>
              <p className="text-foreground font-medium mb-2">
                {metric.label}
              </p>
              <p className="text-sm text-muted-foreground">
                {metric.context}
              </p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="max-w-3xl mx-auto">
          <blockquote className="bg-white rounded-2xl border border-border p-8 relative">
            <Quote className="absolute top-6 left-6 w-8 h-8 text-primary/20" />
            <p className="text-lg md:text-xl text-foreground italic text-center pl-6">
              «Впервые я пришёл на защиту бюджета с реальными данными об усвоении — а не просто с показателями прохождения курсов. CFO одобрил увеличение на 20%.»
            </p>
            <footer className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                — Director of Learning, B2B SaaS (1 200 сотрудников)
              </p>
            </footer>
          </blockquote>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-6">
          На основе данных пилотных программ
        </p>
      </div>
    </section>
  );
};

export default Results;
