import  { useEffect, useRef, useState } from 'react';
import Flag from './Flag';

export function LanguagePicker(properties : LanguagePickerProperties){
    const languages = properties.languages ?? [];
    const initial = properties.defaultLanguage ?? 'en';
    const useAbbreviations = properties.useAbbreviations ?? false;
    const showFlags = properties.showFlags ?? true;
    const showEnglishNames = properties.showEnglishNames ?? false;
    const [selected, setSelected] = useState(initial);
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        function onDoc(e: MouseEvent){
            if(!containerRef.current) return;
            if(!containerRef.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener('click', onDoc);
        return () => document.removeEventListener('click', onDoc);
    }, []);

    useEffect(() => {
        setSelected(properties.defaultLanguage ?? selected);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [properties.defaultLanguage]);

    useEffect(() => {
        if(open){
            const first = containerRef.current?.querySelector('[role="option"]') as HTMLElement | null;
            first?.focus();
        } else {
            // when closing, return focus to the button
            buttonRef.current?.focus();
        }
    }, [open]);

    function selectLanguage(lng: string){
        setSelected(lng);
        properties.languageChanged?.(lng);
        setOpen(false);
    }

    if(languages.length === 0) return null;

    const displayLocale = showEnglishNames ? 'en' : selected;
    const currentLabel = useAbbreviations ? selected : new Intl.DisplayNames(displayLocale ?? selected, { type: 'language' }).of(selected);

    return (
        <div ref={containerRef} className="inline-block relative">
            <button
                ref={buttonRef}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={(e) => {
                    setOpen(s => !s)
                }}
                onKeyDown={(e) => { if(e.key === 'ArrowDown'){ e.preventDefault(); setOpen(true); } }}
                className="flex border rounded items-center gap-2"
            >
                {showFlags && <Flag language={selected} className="ml-1 mr-1 w-5 h-3" title={selected} />}
                <span className="">{currentLabel}</span>
                <span aria-hidden className="ml-1">▾</span>
            </button>

            {open && (
                <div className='overflow-y-visible h-500'>
                <ul
                    role="listbox"
                    aria-label="Language selector"
                    className="absolute mt-1 left-0 z-50 bg-white border border-gray-200 rounded p-1 list-none shadow-lg max-h-60 overflow-y-auto"
                >
                    {languages.map(l => {
                        const label = useAbbreviations ? l : new Intl.DisplayNames(displayLocale ?? l, { type: 'language' }).of(l);
                        const isSelected = l === selected;
                        return (
                            <li
                                key={l}
                                role="option"
                                aria-selected={isSelected}
                                tabIndex={0}
                                onClick={() => selectLanguage(l)}
                                onKeyDown={(e: React.KeyboardEvent<HTMLLIElement>) => { 
                                    if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectLanguage(l); }
                                    if(e.key === 'ArrowDown'){
                                        e.preventDefault();
                                        const next = (e.currentTarget as HTMLElement).nextElementSibling as HTMLElement | null;
                                        if(next) next.focus();
                                    }
                                    if(e.key === 'ArrowUp'){
                                        e.preventDefault();
                                        const prev = (e.currentTarget as HTMLElement).previousElementSibling as HTMLElement | null;
                                        if(prev) prev.focus();
                                    }
                                }}
                                className={`flex items-center gap-2 px-2 py-1 cursor-pointer ${isSelected ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                            >
                                 {showFlags && <Flag language={l} className="w-5 h-3" />}
                                <span>{label}</span>
                            </li>
                        );
                    })}
                </ul>
                </div>
            )}
        </div>
    );
}

export interface LanguagePickerProperties{
    languages?: string[];
    defaultLanguage?: string;
    languageChanged?: (lng: string) => void;
    classNames?: string
    useAbbreviations?: boolean
    showFlags? : boolean;
    showEnglishNames? : boolean;
}