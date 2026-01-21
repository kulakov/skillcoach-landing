import { ArrowDown } from "lucide-react";

const Comparison = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Почему мы — другие
          </h2>
        </div>

        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Left - Most L&D systems */}
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
              Большинство L&D-систем измеряют:
            </p>
            <div className="space-y-2 mb-6">
              <p className="text-2xl font-bold text-muted-foreground">ПОСЕЩАЕМОСТЬ</p>
              <p className="text-muted-foreground">и</p>
              <p className="text-2xl font-bold text-muted-foreground">УДОВЛЕТВОРЁННОСТЬ</p>
            </div>
            <ArrowDown className="w-6 h-6 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground italic">«Обучение проведено.»</p>
          </div>

          {/* Right - SkillCoach */}
          <div className="bg-primary/10 rounded-2xl p-8 text-center border-2 border-primary">
            <p className="text-sm font-medium text-primary uppercase tracking-wide mb-6">
              SkillCoach измеряет — и обеспечивает:
            </p>
            <div className="space-y-2 mb-6">
              <p className="text-2xl font-bold text-primary">УСВОЕНИЕ</p>
              <p className="text-muted-foreground">и</p>
              <p className="text-2xl font-bold text-primary">ПРИМЕНЕНИЕ</p>
            </div>
            <ArrowDown className="w-6 h-6 text-primary mx-auto mb-4" />
            <p className="text-primary font-medium italic">«Навыки встроены.»</p>
          </div>
        </div>

        {/* Bottom statement */}
        <div className="text-center mt-12 max-w-2xl mx-auto">
          <p className="text-lg text-muted-foreground">
            Мы — не очередная LMS или библиотека контента.
          </p>
          <p className="text-lg font-semibold text-foreground mt-2">
            Мы — слой, который делает ваше существующее обучение реально работающим.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
