import { Shield, Globe } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-12 bg-foreground text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="md:col-span-2">
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
              <li><Link href="#pricing" className="hover:text-white transition-colors">Цены</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Интеграции</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Безопасность</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Changelog</Link></li>
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="font-semibold mb-4">Компания</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="#" className="hover:text-white transition-colors">О нас</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Блог</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Карьера</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Контакты</Link></li>
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <h4 className="font-semibold mb-4">Ресурсы</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="#" className="hover:text-white transition-colors">Документация</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">API Reference</Link></li>
              <li><Link href="#case-studies" className="hover:text-white transition-colors">Кейсы</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Вебинары</Link></li>
              <li><Link href="#roi" className="hover:text-white transition-colors">ROI-калькулятор</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/70">
            &copy; 2026 SkillCoach. Все права защищены.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/70">
            <Link href="#" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
            <Link href="#" className="hover:text-white transition-colors">Условия использования</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-white/70 hover:text-white transition-colors" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </Link>
            <Link href="#" className="text-white/70 hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
