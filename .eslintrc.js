module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    rules: {
        'semi-spacing': [
            'error',
            {
                after: true,
                before: false,
            },
        ],
        'semi-style': ['error', 'last'],
        'no-extra-semi': 'error',
        'no-unexpected-multiline': 'error',
        'no-unreachable': 'error',
        'no-non-null-assertion': 0,
        '@typescript-eslint/no-explicit-any': 0,
    },
}
