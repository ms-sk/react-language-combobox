# react-language-combobox

> Small, accessible React language picker component with optional flags and customizable theme classes.

Install
-------

Install from npm:

```bash
npm install react-language-combobox
```

Usage
-----

```tsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { useTranslation } from 'react-i18next'
import { LanguagePicker } from 'react-language-picker'

import './i18n' // make sure i18n is initialized

function App(){
	const { t, i18n } = useTranslation();

	return (
			<LanguagePicker
				languages={[ 'en', 'fr', 'de', 'es' ]}
				defaultLanguage={i18n.resolvedLanguage}
				showFlags={true}
				showEnglishNames={true}
				languageChanged={(lng) => i18n.changeLanguage(lng)}
				searchBoxPlaceholder={i18n.t("SearchPlaceHolder")}/>

			<h1>{t('WelcomeToReact')}</h1>
	)
}

```

```css
@import "tailwindcss";

@source "../node_modules/react-language-combobox/**";
```

Available exports
-----------------

- `LanguagePicker` — main component
- `defaultTheme` — default theme class names (Tailwind-friendly)
- `darkTheme` - dark theme (Tailwind-friendly)
- Types: `LanguagePickerProperties`, `LanguagePickerTheme`

Props / Options
---------------

The component accepts a `LanguagePickerProperties` object with these fields:

- `languages?: string[]` — array of language tags (e.g. `['en','de','fr']`). Required for rendering; if empty the component returns `null`.
- `defaultLanguage?: string` — initial selected language (default: `en`).
- `languageChanged?: (lng: string) => void` — callback invoked when user selects a language.
- `classNames?: string` — additional class names applied to the root container.
- `useAbbreviations?: boolean` — when true, display language codes (`en`) instead of localized names.
- `showFlags?: boolean` — when true, shows flag icons next to languages (default: `true`).
- `showEnglishNames?: boolean` — when true, display language names in English rather than the selected locale.
- `theme?: LanguagePickerTheme` — override default classes for styling. See below.
- `searchBoxPlaceholder : string` - placeholder of the search box.
Theme
-----

`LanguagePickerTheme` contains these optional string fields (class names are appended directly, so Tailwind or plain CSS works):

- `container` — wrapper container classes (default: `inline-block relative`).
- `button` — classes for the toggle button (default includes rounded border, padding, and layout).
- `list` — classes for the dropdown list (default includes absolute positioning, border, max-height and scrolling behavior).
- `item` — classes for each list item (hover/focus state classes recommended).
- `selectedItem` — classes applied to the selected list item.
- `searchBox` - classes applied to the searchbox.
- `searchBoxContainer` - classes applied to the searchbox container.

Accessibility
-------------

The component uses ARIA roles (`listbox` / `option`) and keyboard navigation (ArrowUp/ArrowDown, Enter/Space to select). When the list is closed focus returns to the toggle button.

Notes
-----

- The library externals `react` and `react-dom` to avoid bundling React into your app. Ensure those are installed in your host project.
- Flag icons come from the `country-flag-icons` package — include it as a dependency in your project (this package already lists it as a dependency).