import { useTranslation } from "react-i18next";
import { LanguagePicker } from "./components/LanguagePicker"

function App() {

  const { t, i18n } = useTranslation();

  return (
    <>
    <div className="m-1">
    <LanguagePicker 
    languages={["de","en","es","nl","en-us"]}
    defaultLanguage={i18n.resolvedLanguage} 
    languageChanged={(lng) => i18n.changeLanguage(lng)}
    />
    
    <h1>{t("WelcomeToReact")}</h1></div>
    </>
  )
}

export default App
