import { TrendingDown, BarChart3, Users } from "lucide-react";

const Problem = () => {
  const problems = [
    {
      icon: TrendingDown,
      title: "Обучение не закрепляется",
      description: "85% новых навыков забываются в течение 30 дней без подкрепления. Ваша программа лидерства за $200K? Большая часть испаряется.",
    },
    {
      icon: BarChart3,
      title: "L&D не может доказать эффект",
      description: "Показатели прохождения и оценки удовлетворённости не впечатляют CFO. Нужны доказательства, что обучение изменило реальное поведение.",
    },
    {
      icon: Users,
      title: "Коучинг не масштабируется",
      description: "Коуч стоит $150K+ в год и может вести только 30-50 человек. Вашей команде не хватает ресурсов на follow-up со всеми.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Проблема пост-тренинга
          </h2>
        </div>

        {/* Three columns */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {problems.map((problem, index) => (
            <div key={index} className="text-center p-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-red-100 rounded-xl mb-5">
                <problem.icon className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {problem.title}
              </h3>
              <p className="text-muted-foreground">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom statement */}
        <div className="text-center">
          <p className="text-xl font-semibold text-primary">
            SkillCoach решает все три проблемы — в масштабе.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Problem;
