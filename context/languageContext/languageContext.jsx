import {createContext} from 'react';

export const LanguageContext = createContext({
    language: 'ar',
    setLanguage: () => { },
    t: () => '',
    isRTL: true
});