import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const FinalCTA = () => {
  return (
    <section id="demo" className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Сделайте обучение работающим — и докажите это.
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Закажите демо, чтобы увидеть пост-тренинг интервью, опыт сотрудника и аналитический дашборд.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="#contact" className="flex items-center gap-2">
                Заказать демо
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#dashboard">Посмотреть дашборд</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
