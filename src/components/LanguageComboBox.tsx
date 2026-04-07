import { useEffect, useRef, useState, useMemo } from 'react';
import Flag from './Flag';
import type { LanguageComboBoxProperties } from './LanguageComboBoxProperties';
import { defaultTheme } from '../themes/defaultTheme';
import type { NameDisplayMode } from './NameDisplayMode';

function getLanguageLabel(code: string, selected: string, mode: NameDisplayMode): string {
    if (mode === 'abbreviation') return code.toUpperCase();

    const localeMap: Record<string, string> = {
        english: 'en',
        native: code,
        current: selected,
    };

    try {
        const targetLocale = localeMap[mode] || 'en';
        return new Intl.DisplayNames([targetLocale], { type: 'language' }).of(code) ?? code;
    } catch (e) {
        return code;
    }
}

export function LanguageComboBox(properties: LanguageComboBoxProperties) {
    const {
        languages = ['en'],
        defaultLanguage = 'en',
        showFlags = true,
        nameDisplayMode = 'english',
        theme = defaultTheme,
        showSearchBox = false,
        searchBoxPlaceholder = "Search...",
        languageChanged
    } = properties;

    const [selected, setSelected] = useState(defaultLanguage);
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const containerRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        function onDoc(e: MouseEvent) {
            if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener('click', onDoc);
        return () => document.removeEventListener('click', onDoc);
    }, []);

    useEffect(() => {
        setSelected(defaultLanguage);
    }, [defaultLanguage]);

    useEffect(() => {
        if (open) {
            const firstElement = showSearchBox
                ? containerRef.current?.querySelector("input")
                : containerRef.current?.querySelector('[role="option"]');
            (firstElement as HTMLElement | null)?.focus();
        } else {
            buttonRef.current?.focus();
        }
    }, [open, showSearchBox]);

    const selectLanguage = (lng: string) => {
        setSelected(lng);
        languageChanged?.(lng);
        setSearchQuery("");
        setOpen(false);
    };

    const getLabel = (code: string) => getLanguageLabel(code, selected, nameDisplayMode);

    const filteredLanguages = useMemo(() => {
        const list = languages.length > 0 ? languages : ['en'];
        return list.filter(lng =>
            getLabel(lng).toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [languages, searchQuery, selected, nameDisplayMode]);

    return (
        <div ref={containerRef} className={`${theme.containerClass}`}>
            <button
                ref={buttonRef}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => {
                    setSearchQuery("");
                    setOpen(s => !s);
                }}
                onKeyDown={(e) => { if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); } }}
                className={theme.buttonClass}
            >
                {showFlags && <Flag language={selected} className={theme.FlagClass} title={selected} />}
                <span className={theme.labelClass}>{getLabel(selected)}</span>
                {open && <span aria-hidden className={theme.arrowClass}>▴</span>}
                {!open && <span aria-hidden className={theme.arrowClass}>▾</span>}
            </button>

            {open && (
                <>
                    {showSearchBox && (
                        <div className={theme.searchBoxContainerClass}>
                            <input
                                type='text'
                                tabIndex={0}
                                className={theme.searchBoxClass}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        selectLanguage(filteredLanguages[0] ?? selected);
                                    }
                                    if (e.key === "Escape") setOpen(false);
                                    if (e.key === 'ArrowDown') {
                                        e.preventDefault();
                                        (containerRef.current?.querySelector('[role="option"]') as HTMLElement)?.focus();
                                    }
                                }}
                                placeholder={searchBoxPlaceholder}
                            />
                        </div>
                    )}
                    <ul role="listbox" aria-label="Language Selector" className={theme.listClass}>
                        {filteredLanguages.map((l) => {
                            const label = getLabel(l);
                            const isSelected = l === selected;

                            return (
                                <li
                                    key={l}
                                    role="option"
                                    aria-selected={isSelected}
                                    tabIndex={0}
                                    ref={(el) => {
                                        if (isSelected && el) {
                                            setTimeout(() => (el as HTMLElement).focus(), 0);
                                        }
                                    }}
                                    aria-label={label}
                                    onClick={() => selectLanguage(l)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            selectLanguage(l);
                                        }
                                        if (e.key === 'ArrowDown') {
                                            e.preventDefault();
                                            (e.currentTarget.nextElementSibling as HTMLElement)?.focus();
                                        }
                                        if (e.key === 'ArrowUp') {
                                            e.preventDefault();
                                            const prev = e.currentTarget.previousElementSibling as HTMLElement;
                                            if (prev) prev.focus();
                                            else containerRef.current?.querySelector("input")?.focus();
                                        }
                                    }}
                                    className={`${isSelected ? theme.selectedItemClass : theme.itemClass}`}
                                >
                                    {showFlags && <Flag language={l} className={theme.FlagListClass} />}
                                    <span className="whitespace-nowrap w-full">{label}</span>
                                    {isSelected && <span className='text-right'>✓</span>}
                                </li>)
                        })}
                    </ul>
                </>
            )}
        </div>
    );
}