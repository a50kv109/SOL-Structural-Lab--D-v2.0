/**
 * SOL STRUCTURAL LAB v2.0
 * LANGUAGE CONTEXT & HOOK PROVIDER
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translations, TRANSLATIONS } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'EN',
  setLanguage: () => {},
  t: TRANSLATIONS.EN,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('sol_lab_lang');
      return (saved === 'RU' || saved === 'EN') ? saved : 'EN';
    } catch {
      return 'EN';
    }
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem('sol_lab_lang', lang);
    } catch {
      // ignore in sandboxed environments
    }
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t: TRANSLATIONS[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
