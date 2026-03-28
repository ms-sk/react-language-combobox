import type { LanguageComboBoxTheme } from "../components/LanguagComboBoxTheme";

export const defaultTheme: LanguageComboBoxTheme = {
    container: 'inline-block relative',
    button: 'focus:outline-none focus:border-gray-400 bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 flex rounded-lg items-center gap-2 px-3 py-1.5 transition-all',
    list: 'absolute left-0 z-50 bg-white border border-gray-200 rounded-lg p-1.5 list-none shadow-xl max-h-60 overflow-y-auto min-w-full w-max max-w-[90vw] language-combobox-scroll',
    item: 'flex items-center gap-2 my-1 py-2 px-3 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 cursor-pointer transition-all',
    selectedItem: 'flex items-center gap-2 my-1 py-2 px-3 rounded-md bg-gray-100 text-gray-900 focus:outline-none cursor-default',
    searchBox: 'w-full my-1 px-3 py-2 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-100 transition-all placeholder-gray-400',
    searchBoxContainer: 'w-full'
};