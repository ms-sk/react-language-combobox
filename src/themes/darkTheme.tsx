import type { LanguageComboBoxClass } from "../components/LanguagComboBoxClass";

export const darkTheme: LanguageComboBoxClass = {
    containerClass: 'relative w-full',
    buttonClass: 'w-full justify-between focus:outline-none focus:border-slate-500 bg-slate-900 text-slate-200 border border-slate-700 hover:bg-slate-800 flex rounded-lg items-center gap-2 px-3 py-1.5 transition-all',   
    listClass: 'absolute left-0 top-full mt-1 z-50 bg-slate-900 border border-slate-700 rounded-lg p-1.5 list-none shadow-2xl max-h-60 overflow-y-auto w-full language-combobox-scroll scroll-smooth',
    itemClass: 'flex items-center gap-2 my-1 py-2 px-3 rounded-md text-slate-400 hover:bg-slate-800 hover:text-slate-100 focus:outline-none focus:bg-slate-800 focus:text-slate-100 cursor-pointer transition-all',
    selectedItemClass: 'flex items-center gap-2 my-1 py-2 px-3 rounded-md bg-slate-800 text-slate-100 focus:outline-none cursor-default',
    searchBoxClass: 'w-full box-border px-3 py-2 my-1 text-sm text-slate-200 bg-slate-800/50 border border-slate-700 rounded-md focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500/50 transition-all placeholder-slate-500',
    searchBoxContainerClass: 'w-full',
    FlagListClass : 'border border-slate-600 w-5',
    FlagClass: 'border border-slate-600 w-5',
    labelClass: 'text-left flex-1', 
    arrowClass: 'ml-1'
};