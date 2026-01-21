"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SC</span>
            </div>
            <span className="font-bold text-xl text-foreground">SkillCoach</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Возможности
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Как это работает
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Цены
            </Link>
            <Link href="#case-studies" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Кейсы
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Ресурсы
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link href="#" className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground rounded-t-lg">
                  Блог
                </Link>
                <Link href="#" className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                  Вебинары
                </Link>
                <Link href="#" className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground rounded-b-lg">
                  Документация
                </Link>
              </div>
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Войти
            </Link>
            <Button asChild>
              <Link href="#demo">Заказать демо</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Меню"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Возможности
              </Link>
              <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Как это работает
              </Link>
              <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Цены
              </Link>
              <Link href="#case-studies" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Кейсы
              </Link>
              <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Блог
              </Link>
              <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Войти
              </Link>
              <Button asChild className="w-full">
                <Link href="#demo">Заказать демо</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
