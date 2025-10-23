import { CONTACT_PHONE, CONTACT_EMAIL, CONTACT_HOURS, SERVICES, NAV_MENU, COMPANY_INFO } from "@/const";
import { Link } from "wouter";
import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Instagram, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      {/* Main Footer Content */}
      <div className="container relative z-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-black mb-4 text-white flex items-center gap-2">
              <span className="text-3xl">🏗️</span>
              {COMPANY_INFO.name}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 font-medium">
              {COMPANY_INFO.description}
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-3 rounded-lg bg-primary/20 hover:bg-primary/40 transition-all duration-300 text-primary hover:text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 rounded-lg bg-primary/20 hover:bg-primary/40 transition-all duration-300 text-primary hover:text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 rounded-lg bg-primary/20 hover:bg-primary/40 transition-all duration-300 text-primary hover:text-white">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">الخدمات</h4>
            <ul className="space-y-3">
              {SERVICES.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">روابط سريعة</h4>
            <ul className="space-y-3">
              {NAV_MENU.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <a className="text-gray-300 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group">
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">تواصل معنا</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400 text-xs font-semibold mb-1">الهاتف</p>
                  <a href={`tel:${CONTACT_PHONE}`} className="text-white hover:text-primary transition-colors text-sm font-medium">
                    {CONTACT_PHONE}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400 text-xs font-semibold mb-1">البريد</p>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-white hover:text-primary transition-colors text-sm font-medium">
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400 text-xs font-semibold mb-1">الساعات</p>
                  <p className="text-white text-sm font-medium">{CONTACT_HOURS}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-700 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-bold mb-3 text-white">اشترك في النشرة البريدية</h4>
              <p className="text-gray-300 text-sm font-medium">
                احصل على آخر الأخبار والعروض الحصرية من درر النفائس
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-primary focus:outline-none transition-colors text-sm font-medium"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-primary to-primary/80 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 whitespace-nowrap"
              >
                اشترك
              </button>
            </form>
          </div>
          {subscribed && (
            <div className="mt-4 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-300 text-sm font-medium animate-fade-in">
              ✓ شكراً لاشتراكك! تحقق من بريدك الإلكتروني
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 py-8 relative z-10">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm font-medium">
              © 2025 درر النفائس للاستشارات الهندسية. جميع الحقوق محفوظة
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                شروط الاستخدام
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                اتصل بنا
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
