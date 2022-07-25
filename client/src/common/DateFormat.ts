function toDateFormat(dateString: string): string {
  const date: Date = new Date(dateString);

  let year: number = date.getFullYear();
  let month: number|string = date.getMonth() + 1;
  let day: number|string = date.getDate();

  if (month < 10) {
    month = `0${ month }`;
  }

  if (day < 10) {
    day = `0${ day }`;
  }

  return `${ year }-${ month }-${ day }`;
}

function toDatetimeFormat(dateString: string): string {
  const dateFormat = toDateFormat(dateString);
  const date: Date = new Date(dateString);

  let hours: number|string = date.getHours();
  let minutes: number|string = date.getMinutes();
  let seconds: number|string = date.getSeconds();

  if (hours < 10) {
    hours = `0${ hours }`;
  }

  if (minutes < 10) {
    minutes = `0${ minutes }`;
  }

  if (seconds < 10) {
    seconds = `0${ seconds }`;
  }

  return `${ dateFormat } ${ hours }:${ minutes}:${ seconds }`;
}


export { toDateFormat, toDatetimeFormat };