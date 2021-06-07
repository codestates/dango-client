import styled from 'styled-components';

// Large Button, 큰 사이즈
export const LBUTTON = styled.button`
  outline: none;
  border: none;
  border-radius: 2rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  // margin: 1rem; // 삭제

  /* 색상 */
  background: ${({ theme }) => theme.colors.purple};
  &:hover {
    background: ${({ theme }) => theme.colors.yellow};
  }
  &:active {
    background: ${({ theme }) => theme.colors.lightpurple};
  }

  /* 크기 */
  height: 3rem;
  ${({ theme }) => theme.common.flexCenter}; // 글자 수직 가운데 정렬
  font-size: 1.25rem;
`;

// --------------------------------------------------------------------- //
// --------------------------------------------------------------------- //

// Middle Button, 보통 사이즈
export const MBUTTON = styled.button`
  outline: none;
  border: none;
  border-radius: 1.25rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  // margin: 1rem; // 삭제

  /* 색상 */
  background: ${({ theme }) => theme.colors.purple};
  &:hover {
    background: ${({ theme }) => theme.colors.yellow};
  }
  &:active {
    background: ${({ theme }) => theme.colors.lightpurple};
  }

  /* 크기 */
  height: 2.25rem;
  ${({ theme }) => theme.common.flexCenter}; // 글자 수직 가운데 정렬
  font-size: 1rem;
`;

// --------------------------------------------------------------------- //
// --------------------------------------------------------------------- //

// Small Button, 작은 사이즈
export const SBUTTON = styled.button`
  outline: none;
  border: none;
  border-radius: 1.25rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  // margin: 1rem; // 삭제

  /* 색상 */
  background: ${({ theme }) => theme.colors.purple};
  &:hover {
    background: ${({ theme }) => theme.colors.yellow};
  }
  &:active {
    background: ${({ theme }) => theme.colors.lightpurple};
  }

  /* 크기 */
  height: 1.75rem;
  ${({ theme }) => theme.common.flexCenter}; // 글자 수직 가운데 정렬
  font-size: 0.875rem;
`;

// Small Small Button, 아주 작은 사이즈
export const SSBUTTON = styled.button`
  outline: none;
  border: none;
  border-radius: 1.25rem;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  /* 색상 */
  color: ${({ theme }) => theme.colors.purple};
  border: 0.12rem solid ${({ theme }) => theme.colors.purple};
  background: white;
  &:hover {
    color: ${({ theme }) => theme.colors.yellow};
    border: 0.12rem solid ${({ theme }) => theme.colors.yellow};
  }
  &:active {
    color: ${({ theme }) => theme.colors.lightpurple};
    border: 0.12rem solid ${({ theme }) => theme.colors.lightpurple};
  }

  /* 크기 */
  height: 1.25rem;
  ${({ theme }) => theme.common.flexCenter}; // 글자 수직 가운데 정렬
  font-size: 0.75rem;
`;

export default { LBUTTON, MBUTTON, SBUTTON, SSBUTTON };
