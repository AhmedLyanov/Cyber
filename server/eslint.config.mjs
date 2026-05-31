import js from '@eslint/js';
import globals from 'globals';
import security from 'eslint-plugin-security';

export default [
  
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021,
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        Buffer: 'readonly',
        setImmediate: 'readonly',
        clearImmediate: 'readonly'
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      
    
      'no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }],

      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-template': 'error',
      


      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-duplicate-imports': 'error',
      'no-useless-return': 'error',
      'no-implicit-coercion': 'error'
    }
  },


  {
    files: ['**/*.js'],
    plugins: {
      security
    },
    rules: {
      ...security.configs.recommended.rules,
      'security/detect-object-injection': 'warn',
      'security/detect-possible-timing-attacks': 'warn'
    }
  },

  
  {
    files: ['routes/**/*.js', 'controllers/**/*.js'],
    rules: {
      'no-console': 'off' 
    }
  },

  {
    files: ['models/**/*.js', 'schemas/**/*.js'],
    rules: {
      'no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }]
    }
  },

  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'logs/**',
      '*.min.js',
      '**/.*',
      '**/*.test.js',
      '**/test/**'
    ]
  }
];