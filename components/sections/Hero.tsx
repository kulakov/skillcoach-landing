import { Button } from "@/components/ui/button";
import { Shield, Globe, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-sm font-medium text-primary">AI-коучинг после обучения</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Превращаем обучение в измеримые изменения поведения
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl mx-auto text-balance">
            SkillCoach проводит короткие AI-сессии после тренингов, создаёт персональные планы действий
            и даёт L&D-лидерам данные об усвоении навыков для доказательства ROI — без найма дополнительных коучей.
          </p>

          {/* Price indicator */}
          <p className="text-sm text-muted-foreground mb-8">
            От <span className="font-semibold text-foreground">$50/сотрудник/год</span> за масштабируемую поддержку после обучения
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button size="lg" asChild>
              <Link href="#demo" className="flex items-center gap-2">
                Заказать демо
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#dashboard">Посмотреть дашборд</Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>SOC 2 Type II</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <span>GDPR</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Запуск за 2 недели</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
