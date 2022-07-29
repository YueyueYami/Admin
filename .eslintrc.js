module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    rules: {
        indent: ['off', 2],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'space-before-function-paren': 0,
        'eol-last': 0,
        'space-in-parens': 0,
        'comma-dangle': 'off',
        'eqeqeq': 'off',
        'semi': 'off',
        'spaced-comment': 'off',
        'prefer-const': 'off',
        'quotes': 'off',
        "vue/multi-word-component-names": [
            "error",
            {
                ignores: ["index"], //需要忽略的组件名
            },
        ],

    }
}