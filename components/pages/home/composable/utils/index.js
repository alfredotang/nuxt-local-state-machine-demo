export function getTime(date) {
  const dateTime = new Date(date)
  return `${dateTime.getHours()}:${dateTime.getHours()}:${dateTime.getSeconds()}`
}

export default {
  getTime,
}
