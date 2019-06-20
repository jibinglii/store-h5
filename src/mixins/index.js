export default {
    methods: {
        isIPhoneX() {
            // X XS, XS Max, XR
            const xSeriesConfig = [
                {
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
                const { devicePixelRatio, screen } = window;
                const { width, height } = screen;
                return xSeriesConfig.some(item => item.devicePixelRatio === devicePixelRatio && item.width === width && item.height === height);
            }
            return false;
        },
        isWechat() {
            const ua = window.navigator.userAgent;
            const isWechat = /micromessenger/i.test(ua);
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
