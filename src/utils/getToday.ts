export default function getToday(type = 'normal'): string {
  const date = new Date();
  if (type === 'normal') {
    const today = date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return today;
  }

  const weekday = date
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    })
    .split(' ')[3];
  return weekday;
}
