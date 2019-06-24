export function ucwords (str) {
  return (str + '').replace(/^(.)|\s+(.)/g, function ($1) {
    return $1.toUpperCase()
  })
}

export function formatDate (time) {
  let date = new Date()
  date.setTime(time * 1000)
  return dateFormat(date, 'YYYY-MM-DD HH:mm:ss')
}

export function dateFormat (date, fmt = 'YYYY-MM-DD HH:mm:ss') {
  var o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  var week = {
    '0': '\u65e5',
    '1': '\u4e00',
    '2': '\u4e8c',
    '3': '\u4e09',
    '4': '\u56db',
    '5': '\u4e94',
    '6': '\u516d'
  }
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

export function formatMoney (n, c, d, t) {
  var c = isNaN(c = Math.abs(c)) ? 2 : c
  var d = d == undefined ? '.' : d
  var t = t == undefined ? ', ' : t
  var s = n < 0 ? '-' : ''
  var i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)))
  var j = (j = i.length) > 3 ? j % 3 : 0
  return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '')
}

export function roundNum(num) {
  var numStr = String(num)
  return numStr.split(".")[0]
}

export function decimalNum(num) {
  var numStr = String(num)
  return numStr.split(".")[1]
}
