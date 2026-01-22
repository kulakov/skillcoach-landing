import { Button } from "@/components/ui/button";
import { Check, Calculator, ArrowRight } from "lucide-react";
import Link from "next/link";

const Pricing = () => {
  const features = [
    "Неограниченное количество программ обучения",
    "AI-коучинг сессии (пост-тренинг + follow-up)",
    "Персональные планы внедрения",
    "Интеграции со Slack, Teams, Calendar, Notion",
    "Аналитический дашборд",
    "Персональный менеджер успеха (500+ сотрудников)",
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Цены
          </h2>
        </div>

        {/* Pricing card */}
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl border-2 border-primary shadow-lg p-8">
            <div className="text-center mb-8">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
                Простое, прозрачное ценообразование
              </p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-foreground">$50–75</span>
              </div>
              <p className="text-muted-foreground mt-2">за сотрудника в год</p>
            </div>

            <div className="border-t border-border pt-6 mb-8">
              <p className="font-medium text-foreground mb-4">Включено:</p>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm text-muted-foreground text-center mb-6">
              Скидки при объёме от 1 000 сотрудников.
            </p>

            <Button size="lg" className="w-full" asChild>
              <Link href="/signup" className="flex items-center justify-center gap-2">
                Попробовать бесплатно
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* ROI Calculator teaser */}
        <div className="max-w-lg mx-auto mt-8">
          <div className="bg-muted/50 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 text-primary mb-3">
              <Calculator className="w-5 h-5" />
              <span className="font-medium">Оцените экономию</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Средняя компания с 500 сотрудниками экономит $120K в год по сравнению с наймом 1 дополнительного коуча.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
