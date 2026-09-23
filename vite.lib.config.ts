import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactLanguageCombobox',
      fileName: (format) => `react-language-combobox.${format === 'es' ? 'es' : 'cjs'}.js`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: [
        'react', 
        'react-dom', 
        'react/jsx-runtime', 
        'i18next', 
        'react-i18next',
        'tailwindcss'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'react-i18next': 'reactI18next'
        }
      }
    }
  }
});