import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { LanguageComboBoxProperties } from "./components/LanguageComboBoxProperties";
import { LanguageComboBox } from "./components/LanguageComboBox";
import { darkTheme } from "./themes/darkTheme";
import { PRESETS } from "./components/Presets";


function App() {
  const { t, i18n } = useTranslation();
  const [isReady, setIsReady] = useState(false);
  const [config, setConfig] = useState<Partial<LanguageComboBoxProperties>>({
    showSearchBox : false,
    showFlags: true,
    nameDisplayMode: "english"
  });

  useEffect(() => {
    if (i18n.isInitialized) setIsReady(true);
    else i18n.on('initialized', () => setIsReady(true));
  }, [i18n]);

  if (!isReady) return <div className="p-10 font-sans">Loading...</div>;

  const toggle = (key: keyof LanguageComboBoxProperties) => {
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
              <LanguageComboBox
                {...config}
                searchBoxPlaceholder={i18n.t("SearchPlaceHolder")}
                languages={PRESETS.WORLD_TOP_20}
                defaultLanguage={i18n.resolvedLanguage || 'en'}
                languageChanged={(lng) => i18n.changeLanguage(lng)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-500">Custom Dark Theme</p>
            <div className="p-6 bg-slate-950 rounded-2xl flex justify-center shadow-inner">
              <LanguageComboBox 
                {...config}
                languages={["404","en", "fr", "de", "es"]}
                defaultLanguage={i18n.resolvedLanguage || 'en'}
                languageChanged={(lng) => i18n.changeLanguage(lng)}
                theme={darkTheme}
                searchBoxPlaceholder={i18n.t("SearchPlaceHolder")}
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
            ].map((opt) => (
              <label 
                key={opt.key} 
                className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100 group"
              >
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">{opt.label}</span>
                <input
                  type="checkbox"
                  checked={!!config[opt.key as keyof LanguageComboBoxProperties]}
                  onChange={() => toggle(opt.key as keyof LanguageComboBoxProperties)}
                  className="w-5 h-5 accent-blue-600 rounded"
                />
              </label>
            ))}
          </div>
          {/* Name Display Mode Selection */}
<div className="mt-6 pt-6 border-t border-gray-100">
  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Display Mode</p>
  <div className="grid grid-cols-1 gap-2 p-1 bg-gray-50 rounded-2xl border border-gray-100">
    {(['english', 'native', 'abbreviation','current'] as const).map((mode) => (
      <button
        key={mode}
        onClick={() => setConfig(prev => ({ ...prev, nameDisplayMode: mode }))}
        className={`
          px-4 py-2 text-sm font-medium rounded-xl transition-all capitalize
          ${config.nameDisplayMode === mode 
            ? 'bg-white text-blue-600 shadow-sm border border-gray-100' 
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}
        `}
      >
        {mode}
      </button>
    ))}
  </div>
</div>
        </div>
      </div>

    </div>
  );
}

export default App;