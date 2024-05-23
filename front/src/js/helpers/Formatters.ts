import TimeAgoLib from 'javascript-time-ago'
import ru from 'javascript-time-ago/locale/ru'

TimeAgoLib.addLocale(ru)
const ta = new TimeAgoLib('ru-RU')

export function TimeAgo (datetime: string): string {
  const d = new Date(datetime)

  return ta.format(d)
}

export function SecondsToTime (seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  return [
    h,
    m > 9 ? m : (h ? '0' + m : m || '0'),
    s > 9 ? s : '0' + s
  ].filter(a => a).join(':')
}

export function CompactNumber (value: number| null, fixed = 0): string|null {
  if (value === null) { // terminate early
    return null
  }

  value = Number(value)

  if (isNaN(value)) {
    return '0'
  }

  if (value === 0) {
    return '0'
  }

  fixed = (!fixed || fixed < 0) ? 0 : fixed // number of decimal places to show

  const b = (value).toPrecision(2).split('e') // get power

  const k: number = b.length === 1 ? 0 : Math.floor(Math.min(Number(b[1].slice(1)), 14) / 3) // floor at decimals, ceiling at trillions
  const c: string = k < 1 ? value.toFixed(0 + fixed) : (value / Math.pow(10, k * 3)).toFixed(fixed) // divide by power
  const d: number = Number(c) < 0 ? Number(c) : Math.abs(Number(c)) // enforce -0 is 0
  // append power
  return d + ['', 'k', 'm', 'b', 't'][k]
}

export function LikesPercent (likes: number, dislikes = 0) {
  const votesSum = likes + dislikes

  if (votesSum === 0) {
    return 100
  }

  const likesPercent = (likes / votesSum) * 100

  return Math.ceil(likesPercent)
}

export default {
  TimeAgo,
  SecondsToTime,
  CompactNumber,
  LikesPercent
}
