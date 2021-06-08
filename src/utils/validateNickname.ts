export default function validateNickname(nickname: string): string {
  const hasString = /^[가-힣a-z0-9]+$/.test(nickname);
  const hasSpecialPattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi.test(nickname);
  const hasSpace = nickname.search(/\s/) !== -1;

  if (hasSpecialPattern) {
    return '닉네임에 특수문자는 사용하실 수 없습니다.';
  }
  if (hasSpace) {
    return '닉네임에 공백이 포함되어 있습니다.';
  }
  if (!hasString) {
    return '닉네임은 한글,영문 소문자,숫자 2~8자리로 작성해주세요.';
  }

  return '통과';
}
