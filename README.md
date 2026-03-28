# react-language-combobox

> Small, accessible React language ComboBox component with optional flags and customizable theme classes.

[**🚀 View Live Demo**](https://ms-sk.github.io/react-language-combobox/)


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
import { LanguageComboBox } from 'react-language-combobox'

import './i18n' // make sure i18n is initialized

function App(){
	const { t, i18n } = useTranslation();

	return (
			<LanguageComboBox
				languages={[ 'en', 'fr', 'de', 'es' ]}
				defaultLanguage={i18n.resolvedLanguage}
				showFlags={true}
				nameDisplayMode="english"
				languageChanged={(lng) => i18n.changeLanguage(lng)}
				showSearchBox={true}
				searchBoxPlaceholder={i18n.t("SearchPlaceHolder")}/>

			<h1>{t('WelcomeToReact')}</h1>
	)
}

```

```css
@import "tailwindcss";

@source "../node_modules/react-language-combobox/dist/**";
```

Available exports
-----------------

- `LanguageComboBox` — main component
- `defaultTheme` — default theme class names (Tailwind-friendly)
- `darkTheme` - dark theme (Tailwind-friendly)
- Types: `LanguageComboBoxProperties`, `LanguageComboBoxTheme`, `NameDisplayMode`

Props / Options
---------------

The component accepts a `LanguageComboBoxProperties` object with these fields:

- `languages?: string[]` — array of language tags (e.g. `['en','de','fr']`). Required for rendering; if empty the component returns `['en']`.
- `defaultLanguage?: string` — initial selected language (default: `en`).
- `languageChanged?: (lng: string) => void` — callback invoked when user selects a language.
- `showFlags?: boolean` — when true, shows flag icons next to languages (default: `true`).
- nameDisplayMode: NameDisplayMode — (Required) Defines how language names are rendered:
    - 'english': Always show names in English (e.g., "German").
    - 'native': Show each language in its own script (e.g., "Deutsch").
    - 'current': Show names in the currently selected language.
    - 'abbreviation': Show the ISO code (e.g., "DE").
- `theme?: LanguageComboBoxTheme` — override default classes for styling. See below.
- `showSearchBox: boolean` — Enables a search filter inside the dropdown.
- `searchBoxPlaceholder : string` — placeholder of the search box.
Theme
-----

`LanguageComboBoxTheme` contains these optional string fields (class names are appended directly, so Tailwind or plain CSS works):

- `container` — wrapper container classes (default: `inline-block relative`).
- `button` — classes for the toggle button (default includes rounded border, padding, and layout).
- `list` — classes for the dropdown list (default includes absolute positioning, border, max-height and scrolling behavior).
- `item` — classes for each list item (hover/focus state classes recommended).
- `selectedItem` — classes applied to the selected list item.
- `searchBox` - classes applied to the searchbox.
- `searchBoxContainer` - classes applied to the searchbox container.

Accessibility
-------------
- ARIA Roles: Uses listbox and option roles for screen readers.
- The component uses ARIA roles (`listbox` / `option`) and keyboard navigation (ArrowUp/ArrowDown, Enter/Space to select).

- Focus Management: Focus automatically shifts to the search box (if enabled) or the first item when opened, and returns to the toggle button when closed.

Notes
-----

- The library externals `react` and `react-dom` to avoid bundling React into your app. Ensure those are installed in your host project.
- Flag icons come from the `country-flag-icons` package — include it as a dependency in your project (this package already lists it as a dependency).
- Uses Intl.DisplayNames for localization. Ensure your target environment supports this (modern browsers and Node.js 14.x+).