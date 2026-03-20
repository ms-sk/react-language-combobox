import  { useEffect, useRef, useState } from 'react';
import Flag from './Flag';

export function LanguagePicker(properties : LanguagePickerProperties){
    const languages = properties.languages ?? [];
    const initial = properties.defaultLanguage ?? 'en';
    const [selected, setSelected] = useState(initial);
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

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

    function selectLanguage(lng: string){
        setSelected(lng);
        properties.languageChanged?.(lng);
        setOpen(false);
    }

    if(languages.length === 0) return null;

    const currentLabel = new Intl.DisplayNames([selected], { type: 'language' }).of(selected) || selected;

    return (
        <div ref={containerRef} className="inline-block relative">
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen(s => !s)}
                onKeyDown={(e) => { if(e.key === 'ArrowDown'){ e.preventDefault(); setOpen(true); } }}
                className="inline-flex items-center gap-2"
            >
                <Flag language={selected} className="w-5 h-3" title={selected} />
                <span>{currentLabel}</span>
                <span aria-hidden className="ml-1">▾</span>
            </button>

            {open && (
                <ul
                    role="listbox"
                    aria-label="Language selector"
                    className="absolute mt-1 left-0 z-50 bg-white border border-gray-200 rounded p-1 list-none shadow-lg"
                >
                    {languages.map(l => {
                        const label = new Intl.DisplayNames([l], { type: 'language' }).of(l) || l;
                        const isSelected = l === selected;
                        return (
                            <li
                                key={l}
                                role="option"
                                aria-selected={isSelected}
                                tabIndex={0}
                                onClick={() => selectLanguage(l)}
                                onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectLanguage(l); } }}
                                className={`flex items-center gap-2 px-2 py-1 cursor-pointer ${isSelected ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                            >
                                <Flag className="w-5 h-3" language={l} />
                                <span>{label}</span>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export interface LanguagePickerProperties{
    languages?: string[];
    defaultLanguage?: string;
    languageChanged?: (lng: string) => void;
    classNames?: string
}