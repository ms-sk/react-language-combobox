import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
  "en": {
    "translation": {
      "WelcomeToReact": "Welcome to React using react-i18next",
      "SearchPlaceHolder": "Search..."
    }
  },
  "zh": {
    "translation": {
      "WelcomeToReact": "欢迎使用 react-i18next 的 React 项目",
      "SearchPlaceHolder": "搜索..."
    }
  },
  "hi": {
    "translation": {
      "WelcomeToReact": "react-i18next का उपयोग करके React में आपका स्वागत है",
      "SearchPlaceHolder": "खोजें..."
    }
  },
  "es": {
    "translation": {
      "WelcomeToReact": "Bienvenido a React usando react-i18next",
      "SearchPlaceHolder": "Buscar..."
    }
  },
  "ar": {
    "translation": {
      "WelcomeToReact": "react-i18next باستخدام React مرحبًا بك في",
      "SearchPlaceHolder": "بحث..."
    }
  },
  "fr": {
    "translation": {
      "WelcomeToReact": "Bienvenue à React en utilisant react-i18next",
      "SearchPlaceHolder": "Rechercher..."
    }
  },
  "bn": {
    "translation": {
      "WelcomeToReact": "react-i18next ব্যবহার করে React-এ স্বাগতম",
      "SearchPlaceHolder": "অনুসন্ধান করুন..."
    }
  },
  "pt": {
    "translation": {
      "WelcomeToReact": "Bem-vindo ao React usando react-i18next",
      "SearchPlaceHolder": "Pesquisar..."
    }
  },
  "ru": {
    "translation": {
      "WelcomeToReact": "Добро пожаловать в React с использованием react-i18next",
      "SearchPlaceHolder": "Поиск..."
    }
  },
  "id": {
    "translation": {
      "WelcomeToReact": "Selamat datang di React menggunakan react-i18next",
      "SearchPlaceHolder": "Cari..."
    }
  },
  "ur": {
    "translation": {
      "WelcomeToReact": "میں خوش آمدید react-i18next کا استعمال کرتے ہوئے React",
      "SearchPlaceHolder": "تلاش کریں..."
    }
  },
  "de": {
    "translation": {
      "WelcomeToReact": "Willkommen bei React mit react-i18next",
      "SearchPlaceHolder": "Suchen..."
    }
  },
  "ja": {
    "translation": {
      "WelcomeToReact": "react-i18next を使用した React へようこそ",
      "SearchPlaceHolder": "検索..."
    }
  },
  "vi": {
    "translation": {
      "WelcomeToReact": "Chào mừng bạn đến với React sử dụng react-i18next",
      "SearchPlaceHolder": "Tìm kiếm..."
    }
  },
  "te": {
    "translation": {
      "WelcomeToReact": "react-i18nextని ఉపయోగిస్తూ Reactలోకి మీకు స్వాగతం",
      "SearchPlaceHolder": "శోధించండి..."
    }
  },
  "tr": {
    "translation": {
      "WelcomeToReact": "react-i18next kullanarak React'a hoş geldiniz",
      "SearchPlaceHolder": "Ara..."
    }
  },
  "ko": {
    "translation": {
      "WelcomeToReact": "react-i18next를 사용한 React에 오신 것을 환영합니다",
      "SearchPlaceHolder": "검색..."
    }
  },
  "it": {
    "translation": {
      "WelcomeToReact": "Benvenuto in React usando react-i18next",
      "SearchPlaceHolder": "Cerca..."
    }
  },
  "fa": {
    "translation": {
      "WelcomeToReact": "خوش آمدید react-i18next با استفاده از React به",
      "SearchPlaceHolder": "جستجو..."
    }
  }
},
    interpolation: {
      escapeValue: false,
    }
  });