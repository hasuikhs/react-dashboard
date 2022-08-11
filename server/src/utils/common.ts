function dateToStringFormat(date: Date): string {
  let year: number | string   = date.getFullYear();
  let month: number | string  = date.getMonth() + 1 < 10 ? `0${ date.getMonth() + 1 }` : date.getMonth() + 1;
  let day: number | string    = date.getDate() < 10 ? `0${ date.getDate() }` : date.getDate();
  let hour: number | string   = date.getHours() < 10 ? `0${ date.getHours() }` : date.getHours();
  let miniute: number | string = date.getMinutes() < 10 ? `0${ date.getMinutes() }` : date.getMinutes();

  return `${ year }${ month }${ day }${ hour }${ miniute }`;
}

function camelToSnake(string: string): string {
  return string.replace(/\.?([A-Z])/g, function (x,y){return '_' + y.toLowerCase()}).replace(/^_/, '');
}

export { dateToStringFormat, camelToSnake };