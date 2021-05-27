/** 사용법: 스타일을 적용할 곳에 예시처럼 적어준다.
 예시1 background-color: ${({ theme }) => theme.colors.purple}
 예시2 ${({ theme }) => theme.common.flexCenter} (이건 key 없이 적으면 됨)
 */

// 자주 사용하는 색.
const colors = {
  purple: '#835af1',
  lightpurple: '#DEDCEE',
  lightgray: '#F6F6F6',
  yellow: '#fbd14b',
  black: '#000000',
  white: '#ffffff',
};

// 반응형 디자인을 위한 픽셀 컨버팅 함수
const pixelToRem = (size: number) => `${size / 16}rem`;

const fontSizes = {
  small: pixelToRem(14),
  base: pixelToRem(16),
  lg: pixelToRem(18),
  xl: pixelToRem(20),
  xxl: pixelToRem(22),
  xxxl: pixelToRem(24),
  subtitle: pixelToRem(30),
  title: pixelToRem(50),
};

const paddings = {
  small: pixelToRem(8),
  base: pixelToRem(10),
  lg: pixelToRem(12),
  xl: pixelToRem(14),
  xxl: pixelToRem(16),
  xxxl: pixelToRem(18),
};

const margins = {
  small: pixelToRem(8),
  base: pixelToRem(10),
  lg: pixelToRem(12),
  xl: pixelToRem(14),
  xxl: pixelToRem(16),
  xxxl: pixelToRem(18),
};

// 자주 사용하는 스타일 속성.
const common = {
  flexCenter: `
      display: flex;
      justify-content: center;
      align-items: center;
    `,
  flexCenterColumn: `
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `,
};

// theme 객체에 감싸서 반환한다.
const theme = {
  colors,
  fontSizes,
  paddings,
  margins,
  common,
};

export default theme;
