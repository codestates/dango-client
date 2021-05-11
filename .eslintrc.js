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
    // 확장자 허용 (JSX not allowed in files with extension '.tsx')
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    // 정의되기 전에 사용되도록 허용 ('React' was used before it was defined)
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    // airbnb ESLint 구성의 문제를 해결하기 위함
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
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
