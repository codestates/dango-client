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
  line-height: 3rem; // 글자 수직 가운데 정렬
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
  line-height: 2.25rem; // 글자 수직 가운데 정렬
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
  line-height: 1.75rem; // 글자 수직 가운데 정렬
  font-size: 0.875rem;
`;

export default { LBUTTON, MBUTTON, SBUTTON };
