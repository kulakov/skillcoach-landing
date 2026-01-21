"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Building, User, Check } from "lucide-react";

const ValueByAudience = () => {
  const audiences = [
    {
      id: "ld-leaders",
      label: "Для L&D-лидеров",
      shortLabel: "L&D",
      icon: Target,
      benefits: [
        "Метрики реального использования навыков, а не удовлетворённости",
        "Доказательства эффективности программ для разговоров с CEO/CFO",
        "Масштабируемый пост-тренинг коучинг без расширения штата",
        "Меньше потребности в найме/обучении живых коучей",
        "Дашборд готов к QBR и защите бюджета",
      ],
    },
    {
      id: "business-sponsors",
      label: "Для бизнес-заказчиков",
      shortLabel: "Бизнес",
      icon: Building,
      benefits: [
        "Видимость того, окупились ли инвестиции в обучение",
        "Доказательства, что команда реально меняет поведение",
        "Быстрее выход на продуктивность с новыми навыками",
        "Чёткая связь между расходами на L&D и результатами команды",
        "Больше никакого «мы провели тренинг, поверьте» — теперь можно увидеть",
      ],
    },
    {
      id: "employees",
      label: "Для сотрудников",
      shortLabel: "Сотрудники",
      icon: User,
      benefits: [
        "Персональная поддержка в применении того, чему научились",
        "Небольшие действия, которые вписываются в реальное расписание",
        "Без давления — мягкие напоминания, не назойливость",
        "Шаблоны и ресурсы доставляются в рабочее пространство",
        "Чувствуешь поддержку, а не слежку",
      ],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ценность для разных аудиторий
          </h2>
        </div>

        {/* Tabs */}
        <div className="max-w-3xl mx-auto">
          <Tabs defaultValue="ld-leaders" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-auto p-1">
              {audiences.map((audience) => (
                <TabsTrigger
                  key={audience.id}
                  value={audience.id}
                  className="flex items-center gap-2 py-3 text-xs sm:text-sm"
                >
                  <audience.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{audience.label}</span>
                  <span className="sm:hidden">{audience.shortLabel}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {audiences.map((audience) => (
              <TabsContent key={audience.id} value={audience.id}>
                <div className="bg-white rounded-2xl border border-border p-6 mt-6">
                  <ul className="space-y-4">
                    {audience.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default ValueByAudience;
