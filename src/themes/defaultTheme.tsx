import type { LanguageComboBoxClass } from "../components/LanguagComboBoxClass";
export const defaultTheme: LanguageComboBoxClass = {
    containerClass: 'relative w-full', 
    buttonClass: 'w-full justify-between focus:outline-none focus:border-gray-400 bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 flex rounded-lg items-center gap-2 px-3 py-1.5 transition-all',
    listClass: 'absolute left-0 top-full mt-1 z-50 bg-white border border-gray-200 rounded-lg p-1.5 list-none shadow-xl max-h-60 overflow-y-auto w-full language-combobox-scroll',
    itemClass: 'flex items-center gap-2 my-1 py-2 px-3 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 cursor-pointer transition-all',
    selectedItemClass: 'flex items-center gap-2 my-1 py-2 px-3 rounded-md bg-gray-100 text-gray-900 focus:outline-none cursor-default',
    searchBoxClass: 'w-full box-border my-1 px-3 py-2 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-100 transition-all placeholder-gray-400',
    searchBoxContainerClass: 'w-full',
    FlagListClass : 'border border-gray-200 w-5',
    FlagClass: 'border border-gray-200 w-5',
    labelClass: 'text-left flex-1', 
    arrowClass: 'ml-1'
};