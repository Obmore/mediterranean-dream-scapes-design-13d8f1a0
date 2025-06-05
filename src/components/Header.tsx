
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'portfolio', path: '/portfolio' },
    { key: 'services', path: '/services' },
    { key: 'about', path: '/about' },
    { key: 'contact', path: '/contact' }
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'hu' ? 'en' : 'hu');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-serif font-bold text-navy-800">
          [COMPANY NAME]
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.path}
              className={`relative text-sm font-medium transition-colors hover:text-terracotta-600 ${
                location.pathname === item.path ? 'text-terracotta-600' : 'text-gray-700'
              } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-terracotta-600 after:transition-all after:duration-300 hover:after:w-full`}
            >
              {t.nav[item.key as keyof typeof t.nav]}
            </Link>
          ))}
        </nav>

        {/* Language Switcher & Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 text-sm font-medium border rounded-md transition-colors hover:bg-terracotta-600 hover:text-white hover:border-terracotta-600"
          >
            {language === 'hu' ? t.language.english : t.language.hungarian}
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
            <nav className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-sm font-medium transition-colors hover:text-terracotta-600 ${
                    location.pathname === item.path ? 'text-terracotta-600' : 'text-gray-700'
                  }`}
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
