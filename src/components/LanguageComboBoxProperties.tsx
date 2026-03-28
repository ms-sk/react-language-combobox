import type { LanguageComboBoxTheme } from "./LanguagComboBoxTheme";
import type { NameDisplayMode } from "./NameDisplayMode";


export interface LanguageComboBoxProperties {
    languages?: string[];
    defaultLanguage?: string;
    languageChanged?: (lng: string) => void;
    nameDisplayMode?: NameDisplayMode;
    showFlags?: boolean;
    theme?: LanguageComboBoxTheme;
    searchBoxPlaceholder?: string;
    showSearchBox?: boolean;
}

