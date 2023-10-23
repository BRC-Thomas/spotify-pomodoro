function getFormattedValue(time: number) {
  const minutes = `${
    Math.trunc(time / 60) < 10
      ? `0${Math.trunc(time / 60)}`
      : Math.trunc(time / 60)
  }`;
  const seconds = `${
    Math.trunc(time % 60) < 10 ? `0${time % 60}` : time % 60
  }`;

  return (`${minutes}:${seconds}`)
}
export default getFormattedValue;
