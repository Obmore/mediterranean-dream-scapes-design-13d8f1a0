
import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Memoize the scroll handler to avoid recreating on every render
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Memoize the scroll to section function
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  }, []);

  // Memoize navigation items to avoid recreating on every render
  const navItems = React.useMemo(() => [
    { key: 'home', id: 'hero' },
    { key: 'portfolio', id: 'portfolio' },
    { key: 'services', id: 'services' },
    { key: 'about', id: 'about' },
    { key: 'contact', id: 'contact' }
  ], []);

  // Memoize the language toggle function
  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'hu' ? 'en' : 'hu');
  }, [language, setLanguage]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => scrollToSection('hero')}
          className="text-2xl font-serif font-bold text-navy-800 hover:text-terracotta-600 transition-colors"
        >
          [COMPANY NAME]
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => scrollToSection(item.id)}
              className="relative text-sm font-medium transition-colors hover:text-terracotta-600 text-gray-700 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-terracotta-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              {t.nav[item.key as keyof typeof t.nav]}
            </button>
          ))}
        </nav>

        {/* Language Switcher & Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 text-sm font-medium border rounded-md transition-colors hover:bg-terracotta-600 hover:text-white hover:border-terracotta-600"
            aria-label={language === 'hu' ? 'Switch to English' : 'Switch to Hungarian'}
          >
            {language === 'hu' ? t.language.english : t.language.hungarian}
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle mobile menu"
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
            <nav className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-sm font-medium transition-colors hover:text-terracotta-600 text-gray-700"
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
