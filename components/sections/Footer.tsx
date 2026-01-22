import { Shield, Globe } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-12 bg-foreground text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-foreground font-bold text-sm">SC</span>
              </div>
              <span className="font-bold text-xl">SkillCoach</span>
            </div>
            <p className="text-white/70 text-sm mb-4 max-w-xs">
              AI-коучинг после обучения, который превращает инвестиции в обучение в измеримые изменения поведения.
            </p>
            <div className="flex items-center gap-4 text-sm text-white/70">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span>SOC 2 Type II</span>
              </div>
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                <span>GDPR</span>
              </div>
            </div>
          </div>

          {/* Product column */}
          <div>
            <h4 className="font-semibold mb-4">Продукт</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="#features" className="hover:text-white transition-colors">Возможности</Link></li>
              <li><Link href="#how-it-works" className="hover:text-white transition-colors">Как это работает</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Цены</Link></li>
              <li><Link href="#case-studies" className="hover:text-white transition-colors">Кейсы</Link></li>
            </ul>
          </div>

          {/* Account column */}
          <div>
            <h4 className="font-semibold mb-4">Аккаунт</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/login" className="hover:text-white transition-colors">Войти</Link></li>
              <li><Link href="/signup" className="hover:text-white transition-colors">Регистрация</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Дашборд</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="text-sm text-white/70">
            &copy; 2026 SkillCoach. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
