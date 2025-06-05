
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'portfolio', path: '/portfolio' },
    { key: 'services', path: '/services' },
    { key: 'about', path: '/about' },
    { key: 'contact', path: '/contact' }
  ];

  return (
    <footer className="bg-navy-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          {/* Logo */}
          <div className="text-2xl font-serif font-bold text-white">
            [COMPANY NAME]
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className="text-sm hover:text-terracotta-400 transition-colors"
              >
                {t.nav[item.key as keyof typeof t.nav]}
              </Link>
            ))}
          </nav>

          {/* Social Media */}
          <div className="flex space-x-4">
            <a
              href="https://instagram.com/pelda"
              className="p-2 hover:text-terracotta-400 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://facebook.com/pelda"
              className="p-2 hover:text-terracotta-400 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-navy-700 text-center text-sm text-gray-300">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
