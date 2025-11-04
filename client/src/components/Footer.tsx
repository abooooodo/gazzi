import { NAV_MENU, SERVICES, COMPANY_INFO, PHONE_CONTACTS, CONTACT_LANDLINE, CONTACT_EMAIL, CONTACT_EMAIL_2, CONTACT_EMAIL_3, CONTACT_HOURS } from "@/const";
import { Link } from "wouter";
import { Phone, Mail, Clock, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      {/* Main Footer */}
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 text-white">
              {COMPANY_INFO.name}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {COMPANY_INFO.description}
            </p>
            
            {/* Social Media Links */}
            <div className="flex gap-4 pt-4">
              <a 
                href="#" 
                className="p-2 rounded-lg bg-white/10 hover:bg-primary transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="تابعنا على فيسبوك"
                title="فيسبوك"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-lg bg-white/10 hover:bg-primary transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="تابعنا على تويتر"
                title="تويتر"
              >
                <Twitter className="w-5 h-5" aria-hidden="true" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-lg bg-white/10 hover:bg-primary transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="تابعنا على إنستغرام"
                title="إنستغرام"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-lg bg-white/10 hover:bg-primary transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="تابعنا على لينكد إن"
                title="لينكد إن"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links - Services */}
          <nav aria-label="خدماتنا">
            <h4 className="font-bold mb-4 text-lg text-white">الخدمات</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              {SERVICES.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link href="/services">
                    <a 
                      className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-flex items-center min-h-[32px]"
                      aria-label={`خدمة ${service.title}`}
                    >
                      <span className="w-1.5 h-1.5 bg-primary rounded-full ml-2" aria-hidden="true" />
                      {service.title}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Navigation */}
          <nav aria-label="روابط سريعة">
            <h4 className="font-bold mb-4 text-lg text-white">روابط سريعة</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              {NAV_MENU.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <a 
                      className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-flex items-center min-h-[32px]"
                      aria-label={item.label}
                    >
                      <span className="w-1.5 h-1.5 bg-primary rounded-full ml-2" aria-hidden="true" />
                      {item.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-lg text-white">تواصل معنا</h4>
            <div className="space-y-4 text-sm text-gray-300">
              {/* Mobile Numbers */}
              <div>
                <p className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  أرقام الجوالات
                </p>
                <div className="space-y-2 mr-6">
                  {PHONE_CONTACTS.map((contact, index) => (
                    <div key={index}>
                      <a 
                        href={`tel:${contact.phone}`} 
                        className="hover:text-white transition-colors duration-300 block min-h-[32px] flex items-center"
                        aria-label={`اتصل بـ ${contact.name} على ${contact.phone}`}
                      >
                        <strong>{contact.name}:</strong> {contact.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Landline */}
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-white mb-1">التلفون الثابت</p>
                  <a 
                    href={`tel:${CONTACT_LANDLINE}`} 
                    className="hover:text-white transition-colors duration-300"
                    aria-label={`اتصل على الهاتف الثابت ${CONTACT_LANDLINE}`}
                  >
                    {CONTACT_LANDLINE}
                  </a>
                </div>
              </div>
              
              {/* Emails */}
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-white mb-2">البريد الإلكتروني</p>
                  <div className="space-y-1">
                    <a 
                      href={`mailto:${CONTACT_EMAIL}`} 
                      className="hover:text-white transition-colors duration-300 block break-all"
                      aria-label={`راسلنا على ${CONTACT_EMAIL}`}
                    >
                      {CONTACT_EMAIL}
                    </a>
                    <a 
                      href={`mailto:${CONTACT_EMAIL_2}`} 
                      className="hover:text-white transition-colors duration-300 block break-all"
                      aria-label={`راسلنا على ${CONTACT_EMAIL_2}`}
                    >
                      {CONTACT_EMAIL_2}
                    </a>
                    <a 
                      href={`mailto:${CONTACT_EMAIL_3}`} 
                      className="hover:text-white transition-colors duration-300 block break-all"
                      aria-label={`راسلنا على ${CONTACT_EMAIL_3}`}
                    >
                      {CONTACT_EMAIL_3}
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Working Hours */}
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-white mb-1">ساعات العمل</p>
                  <p>{CONTACT_HOURS}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              © {currentYear} {COMPANY_INFO.name}. جميع الحقوق محفوظة
            </p>
            <div className="flex gap-6">
              <Link href="/privacy">
                <a 
                  className="hover:text-white transition-colors duration-300"
                  aria-label="سياسة الخصوصية"
                >
                  سياسة الخصوصية
                </a>
              </Link>
              <Link href="/terms">
                <a 
                  className="hover:text-white transition-colors duration-300"
                  aria-label="الشروط والأحكام"
                >
                  الشروط والأحكام
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
