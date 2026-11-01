import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig(
    ...tseslint.configs.recommended,
    {
        files: ['src/**/*.{js,mjs,cjs,ts,mts,cts}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: { 
            globals: {
                ...globals.browser,
                ...globals.node,
            }},
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['warn', { 
                'argsIgnorePattern': '^_',
                'varsIgnorePattern': '^_' 
            }],
            '@typescript-eslint/no-explicit-any': 'error',
            'no-undef': 'warn',
            'no-var': 'error',
            'prefer-const': 'error',
            'no-console': 'warn',
        }
    }
);
