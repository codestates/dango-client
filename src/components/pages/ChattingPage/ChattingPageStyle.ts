import styled from 'styled-components';

export const CONTAINER = styled.div`
  display: grid;
  height: 85vh;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-column-gap: 20px;
  margin: 1rem;
`;

export const CHATLIST = styled.div`
  grid-column: 2/5;
  grid-row: 2/11;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  overflow-y: auto;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: #f2f7f8;

  ::-webkit-scrollbar {
    width: 0.6rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: grey;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;

export const CHAT = styled.div`
  grid-column: 5/10;
  grid-row: 2/11;
  display: flex;
  flex-direction: column;
  background-color: #f2f7f8;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  /* overflow: auto;
  transform: rotate(180deg);
  direction: rtl; */
`;

export const USERBOX = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  width: 100%;
  padding: 1vw;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
`;
export const WRAPIMG = styled.div`
  // 프로필이미지 크기
  width: 4vw; // 5vw * 0.9
  height: 4vw;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1vw;
`;
export const PROFILEIMG = styled.img`
  object-fit: cover;
  object-position: top;
  width: 100%;
  height: 100%;
`;
export const USER = styled.div`
  margin-right: auto;
  height: 100%;
  display: flex;
  align-items: center;
  color: grey;
`;
export const COUNT = styled.div<{ value: number }>`
  width: 2vw;
  min-width: 1rem;
  height: 2vw;
  min-height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #a68bf6;
  border-radius: 70%;
  color: whitesmoke;
  padding-top: 0.2vw;
  ${(props) => props.value === 0 && 'display: none;'}
`;

export const NUMBER = styled.span`
  vertical-align: bottom;
`;