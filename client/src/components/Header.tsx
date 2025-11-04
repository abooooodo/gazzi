import { NAV_MENU, APP_TITLE, APP_LOGO, CONTACT_PHONE, CONTACT_EMAIL, CONTACT_EMAIL_FORM } from "@/const";
import { Link } from "wouter";
import { Menu, X, Moon, Sun, Phone, Mail } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when pressing Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleDarkMode = () => setIsDark(!isDark);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-background border-b border-border/50"
      }`}
      role="banner"
    >
      {/* Top Bar - معلومات التواصل */}
      <div 
        className="bg-gradient-to-r from-primary/10 to-accent/10 text-foreground py-3 px-4 text-sm border-b border-border/50"
        role="complementary"
        aria-label="معلومات التواصل"
      >
        <div className="container flex justify-between items-center">
          <div className="flex gap-4 md:gap-6 flex-wrap">
            <a
              href={`tel:${CONTACT_PHONE}`}
              className="hover:text-primary transition-colors font-medium flex items-center gap-2 min-h-[44px] min-w-[44px]"
              aria-label={`اتصل بنا على ${CONTACT_PHONE}`}
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">{CONTACT_PHONE}</span>
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="hover:text-primary transition-colors font-medium flex items-center gap-2 min-h-[44px] min-w-[44px]"
              aria-label={`راسلنا على ${CONTACT_EMAIL}`}
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">{CONTACT_EMAIL}</span>
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL_FORM}`}
              className="hover:text-primary transition-colors font-medium flex items-center gap-2 hidden md:flex min-h-[44px] min-w-[44px]"
              aria-label={`راسلنا على ${CONTACT_EMAIL_FORM}`}
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>{CONTACT_EMAIL_FORM}</span>
            </a>
          </div>
          <div className="hidden sm:flex gap-4">
            <a 
              href="#" 
              className="hover:text-primary transition-colors min-h-[44px] flex items-center"
              aria-label="تابعنا على فيسبوك"
            >
              Facebook
            </a>
            <a 
              href="#" 
              className="hover:text-primary transition-colors min-h-[44px] flex items-center"
              aria-label="تابعنا على تويتر"
            >
              Twitter
            </a>
            <a 
              href="#" 
              className="hover:text-primary transition-colors min-h-[44px] flex items-center"
              aria-label="تابعنا على إنستغرام"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav 
        className="container py-4 flex justify-between items-center"
        role="navigation"
        aria-label="القائمة الرئيسية"
      >
        <Link href="/">
          <a 
            className="text-2xl font-black text-primary hover:text-primary-hover transition-colors flex items-center gap-3 min-h-[44px]"
            aria-label="الصفحة الرئيسية - درة النفيس للاستشارات الهندسية"
          >
            <img 
              src="/gec-logo.png" 
              alt="شعار درة النفيس للاستشارات الهندسية" 
              className="h-12 w-auto dark:bg-white dark:p-2 dark:rounded-lg"
              width="48"
              height="48"
            />
            <span className="hidden sm:inline text-lg">{APP_TITLE}</span>
          </a>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8 items-center" role="menubar">
          {NAV_MENU.map((item) => (
            <Link key={item.href} href={item.href}>
              <a 
                className="font-bold text-foreground hover:text-primary transition-colors relative group min-h-[44px] flex items-center"
                role="menuitem"
                aria-label={item.label}
              >
                {item.label}
                <span 
                  className="absolute bottom-0 right-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" 
                  aria-hidden="true"
                />
              </a>
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all duration-300 text-primary hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع المظلم"}
            aria-pressed={isDark}
            title={isDark ? "الوضع الفاتح" : "الوضع المظلم"}
          >
            {isDark ? (
              <Sun className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Moon className="w-5 h-5" aria-hidden="true" />
            )}
          </button>

          {/* CTA Button - Desktop */}
          <Link href="/contact">
            <a 
              className="hidden md:block btn-modern btn-primary"
              aria-label="احصل على استشارة مجانية"
            >
              احصل على استشارة
            </a>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-primary min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          id="mobile-menu"
          className="lg:hidden bg-background border-t border-border py-4 animate-slide-in-down"
          role="menu"
          aria-label="قائمة التنقل للأجهزة المحمولة"
        >
          <div className="container flex flex-col gap-3">
            {NAV_MENU.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 rounded-lg font-bold text-foreground hover:bg-primary/10 hover:text-primary transition-all min-h-[44px] flex items-center"
                  role="menuitem"
                  aria-label={item.label}
                >
                  {item.label}
                </a>
              </Link>
            ))}
            <Link href="/contact">
              <a
                onClick={() => setIsMenuOpen(false)}
                className="btn-modern btn-primary w-full text-center"
                role="menuitem"
                aria-label="احصل على استشارة مجانية"
              >
                احصل على استشارة
              </a>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
