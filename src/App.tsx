import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { darkTheme, LanguagePicker, type LanguagePickerProperties } from "./components/LanguagePicker";

function App() {
  const { t, i18n } = useTranslation();
  const [isReady, setIsReady] = useState(false);
  const [config, setConfig] = useState<Partial<LanguagePickerProperties>>({
    showFlags: true,
    useAbbreviations: false,
    showEnglishNames: true,
  });

  useEffect(() => {
    if (i18n.isInitialized) setIsReady(true);
    else i18n.on('initialized', () => setIsReady(true));
  }, [i18n]);

  if (!isReady) return <div className="p-10 font-sans">Loading...</div>;

  const toggle = (key: keyof LanguagePickerProperties) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 p-6 lg:p-12 gap-8 font-sans items-start">
      
      <div className="flex-1 w-full flex flex-col gap-6 bg-white rounded-3xl p-10 shadow-sm border border-gray-200">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Preview</h2>
        
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-500">Default Light Theme</p>
            <div className="p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex justify-center">
              <LanguagePicker
                {...config}
                languages={["en", "fr", "de", "es"]}
                defaultLanguage={i18n.resolvedLanguage || 'en'}
                languageChanged={(lng) => i18n.changeLanguage(lng)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-500">Custom Dark Theme</p>
            <div className="p-6 bg-slate-950 rounded-2xl flex justify-center shadow-inner">
              <LanguagePicker 
                {...config}
                languages={["en", "fr", "de", "es"]}
                defaultLanguage={i18n.resolvedLanguage || 'en'}
                languageChanged={(lng) => i18n.changeLanguage(lng)}
                theme={darkTheme}
              />
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">{t("WelcomeToReact")}</h1>
          <p className="text-gray-400 text-sm mt-1">Try switching languages above</p>
        </div>
      </div>

      <div className="w-full md:w-80 h-fit sticky top-6 lg:top-12">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Configuration</h2>
          <div className="space-y-3">
            {[
              {key: "showSearchBox", label: "Show Search Box"},
              { key: "showFlags", label: "Show Flags" },
              { key: "useAbbreviations", label: "Use Abbreviations (EN, DE)" },
              { key: "showEnglishNames", label: "Show English Names" },
            ].map((opt) => (
              <label 
                key={opt.key} 
                className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100 group"
              >
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">{opt.label}</span>
                <input
                  type="checkbox"
                  checked={!!config[opt.key as keyof LanguagePickerProperties]}
                  onChange={() => toggle(opt.key as keyof LanguagePickerProperties)}
                  className="w-5 h-5 accent-blue-600 rounded"
                />
              </label>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;