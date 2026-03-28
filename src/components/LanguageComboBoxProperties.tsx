import type { LanguageComboBoxClass } from "./LanguagComboBoxClass";
import type { NameDisplayMode } from "./NameDisplayMode";


export interface LanguageComboBoxProperties {
    languages?: string[];
    defaultLanguage?: string;
    languageChanged?: (lng: string) => void;
    nameDisplayMode?: NameDisplayMode;
    showFlags?: boolean;
    theme?: LanguageComboBoxClass;
    searchBoxPlaceholder?: string;
    showSearchBox?: boolean;
}

