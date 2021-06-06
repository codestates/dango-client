module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks'],
  extends: [
    'airbnb', // or airbnb-base
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended', // 설치 한경우
    'plugin:import/errors', // 설치한 경우
    'plugin:import/warnings', // 설치한 경우
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': 0,
    'func-names': 0,
    'object-shorthand': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'no-plusplus': 0,
    'no-continue': 0,
    'react/no-array-index-key': 0,
    'no-nested-ternary': 0,
    'no-useless-escape': 0,
    'no-unused-expressions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'import/no-unresolved': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/accessible-emoji': 0,
    // 확장자 허용 (JSX not allowed in files with extension '.tsx')
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    // 정의되기 전에 사용되도록 허용 ('React' was used before it was defined)
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [0],
    // airbnb ESLint 구성의 문제를 해결하기 위함
    'react/jsx-props-no-spreading': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/label-has-for': 'off',
    'react/jsx-boolean-value': 'off',
    'no-underscore-dangle': 'off',
    'import/no-mutable-exports': 0,
    'consistent-return': 'off',
    'import/no-unresolved': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  ignorePatterns: ['dist/'],
};
