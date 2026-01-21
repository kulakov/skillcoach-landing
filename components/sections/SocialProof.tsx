import { Quote } from "lucide-react";

const SocialProof = () => {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Нам доверяют L&D-команды быстрорастущих технологических компаний
          </p>
        </div>

        {/* Company logos placeholder */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-10">
          <div className="text-2xl font-bold text-muted-foreground/30">TechCorp</div>
          <div className="text-2xl font-bold text-muted-foreground/30">ScaleUp</div>
          <div className="text-2xl font-bold text-muted-foreground/30">GrowthCo</div>
          <div className="text-2xl font-bold text-muted-foreground/30">Innovate</div>
          <div className="text-2xl font-bold text-muted-foreground/30">NextGen</div>
        </div>

        {/* Quote */}
        <div className="max-w-3xl mx-auto">
          <blockquote className="relative">
            <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
            <p className="text-lg md:text-xl text-foreground italic text-center pl-8">
              «SkillCoach помог нам доказать, что наша программа лидерства реально изменила поведение менеджеров — а не просто показатели прохождения курсов.»
            </p>
            <footer className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                — VP of Learning, SaaS-компания Series D (400 сотрудников)
              </p>
            </footer>
          </blockquote>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Логотипы размещены с разрешения. Дополнительные референсы доступны по запросу.
        </p>
      </div>
    </section>
  );
};

export default SocialProof;
