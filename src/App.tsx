import { useTranslation } from "react-i18next";
import { LanguagePicker, } from "./components/LanguagePicker"

function App() {

  const { t, i18n } = useTranslation();

  return (
    <>

 <LanguagePicker
              showFlags={true}
              useAbbreviations={false}
              languages={["en","fr","de","es"]}
              showEnglishNames={true}
              defaultLanguage={i18n.resolvedLanguage}
              languageChanged={(lng) => i18n.changeLanguage(lng)}
            />
    <h1>{t("WelcomeToReact")}</h1>
    </>
  )
}

export default App
