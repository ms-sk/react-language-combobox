import type { LanguageComboBoxTheme } from "../components/LanguagComboBoxTheme";

export const darkTheme: LanguageComboBoxTheme = {
    container: 'inline-block relative',
    button: 'focus:outline-none focus:border-slate-500 bg-slate-900 text-slate-200 border border-slate-700 hover:bg-slate-800 flex rounded-lg items-center gap-2 px-3 py-1.5 transition-all',
    list: 'absolute left-0 z-50 bg-slate-900 border border-slate-700 rounded-lg p-1.5 list-none shadow-2xl max-h-60 overflow-y-auto min-w-full w-max max-w-[90vw] language-combobox-scroll',
    item: 'flex items-center gap-2 my-1 py-2 px-3 rounded-md text-slate-400 hover:bg-slate-800 hover:text-slate-100 focus:outline-none focus:bg-slate-800 focus:text-slate-100 cursor-pointer transition-all',
    selectedItem: 'flex items-center gap-2 my-1 py-2 px-3 rounded-md bg-slate-800 text-slate-100 focus:outline-none cursor-default',
    searchBox: 'w-full px-3 py-2 my-1 text-sm text-slate-200 bg-slate-800/50 border border-slate-700 rounded-md focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500/50 transition-all placeholder-slate-500',
    searchBoxContainer: 'w-full'
};