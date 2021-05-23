export default function getToday(): string {
  const date = new Date();
  const today = date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return today;
}
