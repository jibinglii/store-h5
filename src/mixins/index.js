export default {
  methods: {
    isIPhoneX() {
      // X XS, XS Max, XR
      const xSeriesConfig = [{
        devicePixelRatio: 3,
        width: 375,
        height: 812,
      },
        {
          devicePixelRatio: 3,
          width: 414,
          height: 896,
        },
        {
          devicePixelRatio: 2,
          width: 414,
          height: 896,
        },
      ];
      // h5
      if (typeof window !== 'undefined' && window) {
        const isIOS = /iphone/gi.test(window.navigator.userAgent);
        if (!isIOS) return false;
        const {devicePixelRatio, screen} = window;
        const {width, height} = screen;
        return xSeriesConfig.some(item => item.devicePixelRatio === devicePixelRatio && item.width === width && item.height === height);
      }
      return false;
    },
    isWechat() {
      const ua = window.navigator.userAgent;
      const isWechat = /micromessenger/i.test(ua);
      return isWechat;
    },
    isAlipay() {
      const ua = window.navigator.userAgent;
      const isWechat = /alipayclient/i.test(ua);
      return isWechat;
    },
    isSoogua() {
      const ua = window.navigator.userAgent;
      const isWechat = /soogua/i.test(ua);
      return isWechat;
    },
    isIos() {
      const ua = window.navigator.userAgent;
      const isIos = /iphone/gi.test(ua);
      return isIos;
    },
    isAndroid() {
      const ua = window.navigator.userAgent;
      const isAndroid = /(Android);?[\s/]+([\d.]+)?/.test(ua);
      return isAndroid;
    },
    getQueryString(name) {
      const queryString = require('query-string');
      const parsed = queryString.parse(location.search);
      return parsed[name]
    },
    formatMoney(n, c, d, t) {
      var c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
      return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    },
    dateFormat(date, fmt = 'YYYY-MM-DD HH:mm:ss') {
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
  }
}

// const isAndroid = /(Android);?[\s/]+([\d.]+)?/.test(ua)
// const isIpad = /(iPad).*OS\s([\d_]+)/.test(ua)
// const isIpod = /(iPod)(.*OS\s([\d_]+))?/.test(ua)
// const isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(ua)
// const isWechat = /micromessenger/i.test(ua)
// const isAlipay = /alipayclient/i.test(ua)
// const isZsshop = /gncs/i.test(ua)
