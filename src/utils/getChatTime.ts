export default function getChatTime(createdAt: string): string {
  const time = `${new Date(createdAt).getHours() < 12 ? '오전' : '오후'} ${
    new Date(createdAt).getHours() === 0
      ? `12`
      : new Date(createdAt).getHours() > 12
      ? `${new Date(createdAt).getHours() - 12}`
      : `${new Date(createdAt).getHours()}`
  } : ${
    new Date(createdAt).getMinutes() < 10 ? `0${new Date(createdAt).getMinutes()}` : new Date(createdAt).getMinutes()
  }`;
  return time;
}
