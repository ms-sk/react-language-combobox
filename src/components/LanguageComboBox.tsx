import { useEffect, useRef, useState } from 'react';
import Flag from './Flag';

export const defaultTheme: LanguageComboBoxTheme = {
    container: 'inline-block relative',
    button: 'focus:outline-none focus:border-gray-400 bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 flex rounded-lg items-center gap-2 px-3 py-1.5 transition-all',
    list: 'absolute left-0 z-50 bg-white border border-gray-200 rounded-lg p-1.5 list-none shadow-xl max-h-60 overflow-y-auto min-w-full w-max max-w-[90vw] language-combobox-scroll',
    item: 'flex items-center gap-2 my-1 py-2 px-3 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 cursor-pointer transition-all',
    selectedItem: 'flex items-center gap-2 my-1 py-2 px-3 rounded-md bg-gray-100 text-gray-900 focus:outline-none cursor-default',
    searchBox: 'w-full my-1 px-3 py-2 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-100 transition-all placeholder-gray-400',
    searchBoxContainer: 'w-full'
};

export const darkTheme: LanguageComboBoxTheme = {
    container: 'inline-block relative',
    button: 'focus:outline-none focus:border-slate-500 bg-slate-900 text-slate-200 border border-slate-700 hover:bg-slate-800 flex rounded-lg items-center gap-2 px-3 py-1.5 transition-all',
    // Added mt-2 to create that gap between the button and the list
    list: 'absolute left-0 z-50 bg-slate-900 border border-slate-700 rounded-lg p-1.5 list-none shadow-2xl max-h-60 overflow-y-auto min-w-full w-max max-w-[90vw] language-combobox-scroll',
    item: 'flex items-center gap-2 my-1 py-2 px-3 rounded-md text-slate-400 hover:bg-slate-800 hover:text-slate-100 focus:outline-none focus:bg-slate-800 focus:text-slate-100 cursor-pointer transition-all',
    selectedItem: 'flex items-center gap-2 my-1 py-2 px-3 rounded-md bg-slate-800 text-slate-100 focus:outline-none cursor-default',
    // Adjusted: py-1.5 for a "smaller" height, better focus ring contrast
    searchBox: 'w-full px-3 py-2 my-1 text-sm text-slate-200 bg-slate-800/50 border border-slate-700 rounded-md focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500/50 transition-all placeholder-slate-500',
    searchBoxContainer: 'w-full'
};
export function LanguageComboBox(properties: LanguageComboBoxProperties) {
    const languages = properties.languages ?? [];
    const initial = properties.defaultLanguage ?? 'en';
    const useAbbreviations = properties.useAbbreviations ?? false;
    const showFlags = properties.showFlags ?? true;
    const showEnglishNames = properties.showEnglishNames ?? false;
    const [selected, setSelected] = useState(initial);
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const theme = properties.theme ?? defaultTheme;
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        function onDoc(e: MouseEvent) {
            if (!containerRef.current) return;
            if (!containerRef.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener('click', onDoc);
        return () => document.removeEventListener('click', onDoc);
    }, []);

    useEffect(() => {
        setSelected(properties.defaultLanguage ?? selected);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [properties.defaultLanguage]);

    useEffect(() => {
        if (open) {
            const first = properties.showSearchBox ? (containerRef.current as HTMLElement).querySelector("input") as HTMLElement | null : containerRef.current?.querySelector('[role="option"]') as HTMLElement | null;
            first?.focus();
        } else {
            // when closing, return focus to the button
            buttonRef.current?.focus();
        }
    }, [open]);

    function selectLanguage(lng: string) {
        setSelected(lng);
        properties.languageChanged?.(lng);
        setSearchQuery("");
        setOpen(false);
    }

    if (languages.length === 0) languages.push('en');

    const displayLocale = showEnglishNames ? 'en' : selected;
    const currentLabel = useAbbreviations ? selected.toUpperCase() : new Intl.DisplayNames(displayLocale ?? selected, { type: 'language' }).of(selected);

    return (
        <div ref={containerRef} className={`${theme.container}`}>
            <button
                ref={buttonRef}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => {
                    setSearchQuery("")
                    setOpen(s => !s)
                }}
                onKeyDown={(e) => { if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); } }}
                className={theme.button}
            >
                {showFlags && <Flag language={selected} className="ml-1 mr-1 w-5 h-3" title={selected} />}
                <span className="text-left w-35">{currentLabel}</span>
                <span aria-hidden className="ml-1">▾</span>
            </button>

            {open && (
                <>
                    {properties.showSearchBox && (
                        <div className={theme.searchBoxContainer}>
                            <input type='text'
                                tabIndex={0}
                                className={theme.searchBox}
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value)
                                }}
                                onKeyDown={e => {
                                    if (e.key == "Enter") {
                                        e.preventDefault();
                                        selectLanguage(languages.filter(language => new Intl.DisplayNames(displayLocale, { type: 'language' }).of(language)?.toLowerCase().includes(searchQuery.toLowerCase()))[0] ?? selected)
                                    }

                                    if (e.key == "Escape") {
                                        e.preventDefault();
                                        setOpen(!open);
                                    }

                                    if (e.key === 'ArrowDown') {
                                        e.preventDefault();
                                        const next = (e.currentTarget as HTMLElement).parentElement?.nextSibling?.childNodes[0] as HTMLElement | null;
                                        if (next) next.focus();
                                    }
                                }}
                                placeholder={properties?.searchBoxPlaceholder || "Search..."}></input>
                        </div>)}
                    <ul
                        role="listbox"
                        aria-label="Language Selector"
                        className={theme.list}
                    >
                        {languages.filter(language => useAbbreviations ? language.toUpperCase().includes(searchQuery.toUpperCase()) : new Intl.DisplayNames(displayLocale, { type: 'language' }).of(language)?.toLowerCase().includes(searchQuery.toLowerCase())).map(l => {
                            const label = useAbbreviations ? l.toUpperCase() : new Intl.DisplayNames(displayLocale ?? l, { type: 'language' }).of(l);
                            const isSelected = l === selected;
                            return (
                                <li
                                    key={l}
                                    role="option"
                                    aria-selected={isSelected}
                                    tabIndex={0}
                                    aria-label={label}
                                    onClick={() => selectLanguage(l)}
                                    onKeyDown={(e: React.KeyboardEvent<HTMLLIElement>) => {
                                        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectLanguage(l); }
                                        if (e.key === 'ArrowDown') {
                                            e.preventDefault();
                                            const next = (e.currentTarget as HTMLElement).nextElementSibling as HTMLElement | null;
                                            if (next) next.focus();
                                        }
                                        if (e.key === 'ArrowUp') {
                                            e.preventDefault();
                                            const prev = (e.currentTarget as HTMLElement).previousElementSibling as HTMLElement | null;
                                            if (prev) {
                                                prev.focus();
                                            } else {
                                                const searchBox = e.currentTarget.parentElement?.previousElementSibling?.childNodes[0] as HTMLElement;
                                                if (searchBox) searchBox.focus();
                                            }
                                        }
                                    }}
                                    className={`${isSelected ? theme.selectedItem : theme.item}`}
                                >
                                    {showFlags && <Flag language={l} className="w-5 h-3" />}
                                    <span className="whitespace-nowrap w-full">{label}</span>
                                    {isSelected && <span className='text-right'>✓</span>}
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
        </div>
    );
}

export interface LanguageComboBoxProperties {
    languages?: string[];
    defaultLanguage?: string;
    languageChanged?: (lng: string) => void;
    useAbbreviations?: boolean
    showFlags?: boolean;
    showEnglishNames?: boolean;
    theme?: LanguageComboBoxTheme;
    searchBoxPlaceholder?: string;
    showSearchBox?: boolean;
}

export interface LanguageComboBoxTheme {
    container?: string;
    button?: string;
    list?: string;
    item?: string;
    selectedItem?: string;
    searchBox?: string;
    searchBoxContainer?: string
}