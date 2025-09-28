import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import prettierPlugin from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
    {
        ignores: [
            'node_modules/**',
            '.next/**',
            'out/**',
            'build/**',
            'next-env.d.ts'
        ]
    },
    ...compat.config({
        extends: [
            'next/core-web-vitals',
            'next/typescript',
            'eslint-config-prettier'
        ]
    }),
    {
        files: ['**/*.{js,jsx,ts,tsx,mjs}'],
        languageOptions: {
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module'
            }
        },
        plugins: {
            prettier: prettierPlugin
        },
        rules: {
            'prettier/prettier': 'error',
            'react/no-escape-entities': 'off'
        }
    }
];

export default eslintConfig;
