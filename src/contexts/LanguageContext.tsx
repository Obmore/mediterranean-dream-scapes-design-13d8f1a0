
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from '../utils/translations';

type Language = 'hu' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.hu;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('hu');

  // Memoize the language detection function
  const detectLanguage = useCallback((): Language => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (savedLanguage && (savedLanguage === 'hu' || savedLanguage === 'en')) {
      return savedLanguage;
    }
    
    // Detect browser language
    const browserLanguage = navigator.language.toLowerCase();
    if (browserLanguage.startsWith('en')) {
      return 'en';
    } else if (browserLanguage.startsWith('hu')) {
      return 'hu';
    }
    return 'hu'; // Default to Hungarian
  }, []);

  // Auto-detect language on first visit
  useEffect(() => {
    const detectedLanguage = detectLanguage();
    setLanguage(detectedLanguage);
  }, [detectLanguage]);

  // Memoize the language setter to avoid recreating on every render
  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  }, []);

  // Memoize the translations object to avoid recreating on every render
  const t = React.useMemo(() => translations[language], [language]);

  // Memoize the context value to avoid recreating on every render
  const contextValue = React.useMemo(() => ({
    language,
    setLanguage: handleSetLanguage,
    t
  }), [language, handleSetLanguage, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
