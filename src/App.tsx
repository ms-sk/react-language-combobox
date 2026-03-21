import { useTranslation } from "react-i18next";
import { LanguagePicker } from "./components/LanguagePicker"

function App() {

  const { t, i18n } = useTranslation();

  return (
    <>
    <div className="m-1">
      <LanguagePicker
        showFlags={true}
        useAbbreviations={false}
        languages={[
          "en","en-us","en-gb",
          "zh",
          "hi","bn","ur","id","ms","my","ta",
          "es","fr","de","it","pt","nl","pl","ru",
          "uk","ro","cs","hu","bg","sv","da","fi","no","el",
          "hr","sr","sk","sl","lt","lv","et","bs","sq","mk",
          "ar","fa","hy","az","ka","kk","uz","be","ky","tg",
          "sw","ha","so","zu",
          "ja","ko","vi","th","km","lo","mn",
          "ne","si","tl","mg","tr",
        ]}
        showEnglishNames={true}
        defaultLanguage={i18n.resolvedLanguage}
        languageChanged={(lng) => i18n.changeLanguage(lng)}
      />
    
    <h1>{t("WelcomeToReact")}</h1></div>
    </>
  )
}

export default App
