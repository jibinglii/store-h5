! function(t) {
    var e = {};

    function n(o) {
        if (e[o]) return e[o].exports;
        var r = e[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return t[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }
    n.m = t, n.c = e, n.d = function(t, e, o) {
        n.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: o
        })
    }, n.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, n.t = function(t, e) {
        if (1 & e && (t = n(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var o = Object.create(null);
        if (n.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var r in t) n.d(o, r, function(e) {
                return t[e]
            }.bind(null, r));
        return o
    }, n.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t["default"]
        } : function() {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "", n(n.s = 31)
}([function(t, e, n) {
    "use strict";
    var o = function() {
        var t = 1,
            e = /subsid=(\d+)/.exec(location.href);
        e && (t = parseInt(e[1], 10) + 1);
        var n = function(e, n) {
            var o = n || t;
            return e = /subsid=\d+/.test(e) ? e.replace(/subsid=\d+/g, "subsid=" + o) : e + "&subsid=" +
                o, n || t++, e
        };
        return n.get = function() {
            return t
        }, n.bind = function() {
            var e = t++;
            return function(t) {
                return n(t, e)
            }
        }, n
    }();
    t.exports = o
}, , function(t, e, n) {
    "use strict";
    var o = Object.prototype.hasOwnProperty,
        r = Object.prototype.toString,
        i = Object.defineProperty,
        a = Object.getOwnPropertyDescriptor,
        c = function(t) {
            return "function" == typeof Array.isArray ? Array.isArray(t) : "[object Array]" === r.call(t)
        },
        s = function(t) {
            if (!t || "[object Object]" !== r.call(t)) return !1;
            var e, n = o.call(t, "constructor"),
                i = t.constructor && t.constructor.prototype && o.call(t.constructor.prototype, "isPrototypeOf");
            if (t.constructor && !n && !i) return !1;
            for (e in t);
            return void 0 === e || o.call(t, e)
        },
        u = function(t, e) {
            i && "__proto__" === e.name ? i(t, e.name, {
                enumerable: !0,
                configurable: !0,
                value: e.newValue,
                writable: !0
            }) : t[e.name] = e.newValue
        },
        p = function(t, e) {
            if ("__proto__" === e) {
                if (!o.call(t, e)) return;
                if (a) return a(t, e).value
            }
            return t[e]
        };
    t.exports = function f() {
        var t, e, n, o, r, i, a = arguments[0],
            l = 1,
            d = arguments.length,
            h = !1;
        for ("boolean" == typeof a && (h = a, a = arguments[1] || {}, l = 2), (null == a || "object" !=
                typeof a && "function" != typeof a) && (a = {}); l < d; ++l)
            if (null != (t = arguments[l]))
                for (e in t) n = p(a, e), a !== (o = p(t, e)) && (h && o && (s(o) || (r = c(o))) ? (r ? (r = !
                    1, i = n && c(n) ? n : []) : i = n && s(n) ? n : {}, u(a, {
                    name: e,
                    newValue: f(h, i, o)
                })) : void 0 !== o && u(a, {
                    name: e,
                    newValue: o
                }));
        return a
    }
}, function(t, e, n) {
    "use strict";
    var o, r, i = n(0),
        a = {
            ERROR_TYPE_FRAMEJS_DOWNLOAD_FAIL: 16,
            ERROR_TYPE_JSONP_PREHANDLE: 17,
            ERROR_TYPE_FRAMEJS_CODE_ERROR: 18,
            CALLBACK_NAME: 19
        },
        c = {
            ERROR_TYPE_FRAMEJS_DOWNLOAD_FAIL: "ERROR_TYPE_FRAMEJS_DOWNLOAD_FAIL",
            ERROR_TYPE_JSONP_PREHANDLE: "ERROR_TYPE_JSONP_PREHANDLE",
            ERROR_TYPE_FRAMEJS_CODE_ERROR: "ERROR_TYPE_FRAMEJS_CODE_ERROR",
            CALLBACK_NAME: "CALLBACK_NAME"
        },
        s = (o = document.referrer, r = location.href || document.URL, o = o.length > 512 ? o.substr(0, 512) :
            o, r = r.length > 1024 ? r.substr(0, 1024) : r, ["referer=" + encodeURIComponent(o), "href=" +
                encodeURIComponent(r)
            ].join("&"));
    t.exports = {
        type: a,
        send: function(t, e, n) {
            try {
                (n = n || c[t]).length > 1024 && n.substr(0, 1024);
                var o = ["type=" + (t = a[t]), "appid=" + e, "reason=" + encodeURIComponent(n)],
                    r = "https://aq.qq.com/cn2/manage/mbtoken/cap_monitor?" + s + "&" + o.join("&");
                (new Image).src = i(r)
            } catch (u) {}
        },
        perfectStack: function(t) {
            var e = "";
            t && t.stack && (e = t.stack.replace(/\n/gi, "").split(/\bat\b/).join("\n").replace(
                /\?[^:]+/gi, ""));
            try {
                var n = t.toString();
                e.indexOf(n) < 0 && (e = n + "@" + e)
            } catch (o) {}
            return e
        }
    }
}, , function(t, e, n) {
    "use strict";
    t.exports = {
        add: function(t, e, n) {
            t && (t.addEventListener ? t.addEventListener(e, n, !1) : t.attachEvent ? t.attachEvent(
                "on" + e, n) : t["on" + e] = n)
        },
        remove: function(t, e, n) {
            t && (t.removeEventListener ? t.removeEventListener(e, n, !1) : t.detachEvent ? t.detachEvent(
                "on" + e, n) : t["on" + e] = null)
        }
    }
}, , , , , , , function(t, e) {
    t.exports = function(t) {
        var e = [];
        return e.toString = function() {
            return this.map(function(e) {
                var n = function(t, e) {
                    var n = t[1] || "",
                        o = t[3];
                    if (!o) return n;
                    if (e && "function" == typeof btoa) {
                        var r = (a = o,
                                "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," +
                                btoa(unescape(encodeURIComponent(JSON.stringify(a)))) +
                                " */"),
                            i = o.sources.map(function(t) {
                                return "/*# sourceURL=" + o.sourceRoot + t + " */"
                            });
                        return [n].concat(i).concat([r]).join("\n")
                    }
                    var a;
                    return [n].join("\n")
                }(e, t);
                return e[2] ? "@media " + e[2] + "{" + n + "}" : n
            }).join("")
        }, e.i = function(t, n) {
            "string" == typeof t && (t = [
                [null, t, ""]
            ]);
            for (var o = {}, r = 0; r < this.length; r++) {
                var i = this[r][0];
                "number" == typeof i && (o[i] = !0)
            }
            for (r = 0; r < t.length; r++) {
                var a = t[r];
                "number" == typeof a[0] && o[a[0]] || (n && !a[2] ? a[2] = n : n && (a[2] = "(" + a[2] +
                    ") and (" + n + ")"), e.push(a))
            }
        }, e
    }
}, function(t, e) {
    var n = {},
        o = function(t) {
            var e;
            return function() {
                return void 0 === e && (e = t.apply(this, arguments)), e
            }
        },
        r = o(function() {
            return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())
        }),
        i = o(function() {
            return document.head || document.getElementsByTagName("head")[0]
        }),
        a = null,
        c = 0;

    function s(t, e) {
        for (var o = 0; o < t.length; o++) {
            var r = t[o],
                i = n[r.id];
            if (i) {
                i.refs++;
                for (var a = 0; a < i.parts.length; a++) i.parts[a](r.parts[a]);
                for (; a < r.parts.length; a++) i.parts.push(l(r.parts[a], e))
            } else {
                var c = [];
                for (a = 0; a < r.parts.length; a++) c.push(l(r.parts[a], e));
                n[r.id] = {
                    id: r.id,
                    refs: 1,
                    parts: c
                }
            }
        }
    }

    function u(t) {
        for (var e = [], n = {}, o = 0; o < t.length; o++) {
            var r = t[o],
                i = r[0],
                a = {
                    css: r[1],
                    media: r[2],
                    sourceMap: r[3]
                };
            n[i] ? n[i].parts.push(a) : e.push(n[i] = {
                id: i,
                parts: [a]
            })
        }
        return e
    }

    function p(t, e) {
        var n = Array.prototype.slice.call(arguments, 2);
        return function() {
            var o = Array.prototype.slice.call(arguments);
            t.apply(e, n.concat(o))
        }
    }

    function f() {
        var t = document.createElement("style"),
            e = i();
        return t.type = "text/css", e.appendChild(t), t
    }

    function l(t, e) {
        var n, o, r, s, u;
        if (e.singleton) {
            var l = c++;
            n = a || (a = f()), o = p(y, null, n, l, !1), r = p(y, null, n, l, !0)
        } else t.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL &&
            "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ?
            (s = document.createElement("link"), u = i(), s.rel = "stylesheet", u.appendChild(s), o = p(m, null,
                n = s), r = function() {
                n.parentNode.removeChild(n), n.href && URL.revokeObjectURL(n.href)
            }) : (n = f(), o = p(b, null, n), r = function() {
                n.parentNode.removeChild(n)
            });
        return o(t),
            function(e) {
                if (e) {
                    if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap) return;
                    o(t = e)
                } else r()
            }
    }
    t.exports = function(t, e) {
        if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error(
            "The style-loader cannot be used in a non-browser environment");
        "undefined" == typeof(e = e || {}).singleton && (e.singleton = r());
        var o = u(t);
        return s(o, e),
            function(t) {
                for (var r = [], i = 0; i < o.length; i++) {
                    var a = o[i];
                    (c = n[a.id]).refs--, r.push(c)
                }
                t && s(u(t), e);
                for (i = 0; i < r.length; i++) {
                    var c;
                    if (0 === (c = r[i]).refs) {
                        for (var p = 0; p < c.parts.length; p++) c.parts[p]();
                        delete n[c.id]
                    }
                }
            }
    };
    var d, h = (d = [], function(t, e) {
        var n = [];
        d[t] = e;
        for (var o = 0; o < d.length; o++) d[o] && n.push(d[o]);
        return n.join("\n")
    });

    function y(t, e, n, o) {
        var r = n ? "" : o.css;
        if (t.styleSheet) t.styleSheet.cssText = h(e, r);
        else {
            var i = document.createTextNode(r),
                a = t.childNodes;
            a[e] && t.removeChild(a[e]), a.length ? t.insertBefore(i, a[e]) : t.appendChild(i)
        }
    }

    function b(t, e) {
        var n = e.css,
            o = e.media;
        e.sourceMap;
        if (o && t.setAttribute("media", o), t.styleSheet) t.styleSheet.cssText = n;
        else {
            for (; t.firstChild;) t.removeChild(t.firstChild);
            t.appendChild(document.createTextNode(n))
        }
    }

    function m(t, e) {
        var n = e.css,
            o = (e.media, e.sourceMap);
        o && (n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(
            JSON.stringify(o)))) + " */");
        var r = new Blob([n], {
                type: "text/css"
            }),
            i = t.href;
        t.href = URL.createObjectURL(r), i && URL.revokeObjectURL(i)
    }
}, function(module, exports, __webpack_require__) {
    "use strict";
    var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ?
            "symbol" : typeof t
    };
    "object" !== ("undefined" == typeof JSON ? "undefined" : _typeof(JSON)) && (JSON = {}),
    function() {
        var rx_one = /^[\],:{}\s]*$/,
            rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
            rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            rx_four = /(?:^|:|,)(?:\s*\[)+/g,
            rx_escapable =
            /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            rx_dangerous =
            /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap, indent, meta, rep;

        function f(t) {
            return t < 10 ? "0" + t : t
        }

        function this_value() {
            return this.valueOf()
        }

        function quote(t) {
            return rx_escapable.lastIndex = 0, rx_escapable.test(t) ? '"' + t.replace(rx_escapable, function(t) {
                var e = meta[t];
                return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + t + '"'
        }

        function str(t, e) {
            var n, o, r, i, a, c = gap,
                s = e[t];
            switch (s && "object" === (void 0 === s ? "undefined" : _typeof(s)) && "function" == typeof s.toJSON &&
                (s = s.toJSON(t)), "function" == typeof rep && (s = rep.call(e, t, s)), void 0 === s ?
                "undefined" : _typeof(s)) {
                case "string":
                    return quote(s);
                case "number":
                    return isFinite(s) ? String(s) : "null";
                case "boolean":
                case "null":
                    return String(s);
                case "object":
                    if (!s) return "null";
                    if (gap += indent, a = [], "[object Array]" === Object.prototype.toString.apply(s)) {
                        for (i = s.length, n = 0; n < i; n += 1) a[n] = str(n, s) || "null";
                        return r = 0 === a.length ? "[]" : gap ? "[\n" + gap + a.join(",\n" + gap) + "\n" + c +
                            "]" : "[" + a.join(",") + "]", gap = c, r
                    }
                    if (rep && "object" === (void 0 === rep ? "undefined" : _typeof(rep)))
                        for (i = rep.length, n = 0; n < i; n += 1) "string" == typeof rep[n] && (r = str(o =
                            rep[n], s)) && a.push(quote(o) + (gap ? ": " : ":") + r);
                    else
                        for (o in s) Object.prototype.hasOwnProperty.call(s, o) && (r = str(o, s)) && a.push(
                            quote(o) + (gap ? ": " : ":") + r);
                    return r = 0 === a.length ? "{}" : gap ? "{\n" + gap + a.join(",\n" + gap) + "\n" + c + "}" :
                        "{" + a.join(",") + "}", gap = c, r
            }
        }
        "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
                return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) +
                    "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) +
                    ":" + f(this.getUTCSeconds()) + "Z" : null
            }, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype
            .toJSON = this_value), "function" != typeof JSON.stringify && (meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, JSON.stringify = function(t, e, n) {
            var o;
            if (gap = "", indent = "", "number" == typeof n)
                for (o = 0; o < n; o += 1) indent += " ";
            else "string" == typeof n && (indent = n);
            if (rep = e, e && "function" != typeof e && ("object" !== (void 0 === e ? "undefined" :
                    _typeof(e)) || "number" != typeof e.length)) throw new Error("JSON.stringify");
            return str("", {
                "": t
            })
        }), "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
            var j;

            function walk(t, e) {
                var n, o, r = t[e];
                if (r && "object" === (void 0 === r ? "undefined" : _typeof(r)))
                    for (n in r) Object.prototype.hasOwnProperty.call(r, n) && ((o = walk(r, n)) !==
                        undefined ? r[n] = o : delete r[n]);
                return reviver.call(t, e, r)
            }
            if (text = String(text), rx_dangerous.lastIndex = 0, rx_dangerous.test(text) && (text =
                    text.replace(rx_dangerous, function(t) {
                        return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
                    })), rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four,
                    ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                "": j
            }, "") : j;
            throw new SyntaxError("JSON.parse")
        })
    }()
}, function(t, e, n) {
    "use strict";
    var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ?
                "symbol" : typeof t
        },
        r = "[CODE_VERIFY]",
        i = "postMessage" in window;

    function a(t, e, n) {
        var r = "";
        if (arguments.length < 2 ? r = "[Msger] error 1" : "object" != (void 0 === t ? "undefined" : o(t)) ? r =
            "[Msger] error 2" : "string" != typeof e && (r = "[Msger] error 3"), r) throw new Error(r);
        this.target = t, this.name = e, this.domain = n || "*"
    }

    function c(t, e) {
        this.targets = {}, this.name = t, this.listenFunc = [], "string" != typeof(r = e || r) && (r = r.toString()),
            this.initListen()
    }
    a.prototype.send = i ? function(t) {
        this.target.postMessage(t, this.domain)
    } : function(t) {
        var e = window.navigator[r + this.name];
        if ("function" != typeof e) throw new Error("target callback function is not defined");
        e(t, window)
    }, c.prototype.addTarget = function(t, e, n) {
        var o = new a(t, e, n);
        this.targets[e] = o
    }, c.prototype.initListen = function() {
        var t = this,
            e = function(e) {
                "object" == (void 0 === e ? "undefined" : o(e)) && e.data && (e = e.data);
                for (var n = 0; n < t.listenFunc.length; n++) t.listenFunc[n](e)
            };
        i ? "addEventListener" in document ? window.addEventListener("message", e, !1) : "attachEvent" in
            document && window.attachEvent("onmessage", e) : window.navigator[r + this.name] = e
    }, c.prototype.listen = function(t) {
        this.listenFunc.push(t)
    }, c.prototype.clear = function() {
        this.listenFunc = []
    }, c.prototype.send = function(t) {
        var e, n = this.targets;
        for (e in n) n.hasOwnProperty(e) && n[e].send(t)
    }, window.TCapMsg = c, t.exports = c
}, , , , , , , , , , , , , , , , function(module, exports, __webpack_require__) {
    "use strict";
    var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ?
            "symbol" : typeof t
    };
    if (!0 === window.__TencentCaptchaExists__) throw new Error(
        "\u8bf7\u52ff\u591a\u6b21\u5f15\u7528\u817e\u8baf\u9a8c\u8bc1\u7801\u7684\u63a5\u5165js");
    window.__TencentCaptchaExists__ = !0, __webpack_require__(32), __webpack_require__(14);
    var Messenger = __webpack_require__(15),
        domReady = __webpack_require__(34),
        btoa = window.btoa || __webpack_require__(35),
        extend = Object.assign || __webpack_require__(2),
        loadScript = __webpack_require__(36),
        eventListener = __webpack_require__(5),
        Executor = __webpack_require__(37),
        isIEVar = __webpack_require__(38),
        isElement = __webpack_require__(39),
        invisibleIframe = __webpack_require__(40),
        isWechatDevtools = navigator.userAgent && /wechatdevtools/.test(navigator.userAgent),
        isWindows = /windows/i.test(navigator.userAgent),
        isMobile = !isWindows && ("ontouchstart" in window || "ontouchstart" in document.createElement("div") ||
            isWechatDevtools),
        capDomain = "https://ssl.captcha.qq.com",
        cdnDomain = "https://captcha.gtimg.com/1",
        mobileFrameJs = "/TCaptchaFrame_m.88ec788b.js",
        pcFrameJs = "/TCapIframe.js?v=" + (new Date).getTime(),
        grayscaleFrameJs = "/tcaptcha-frame.b46b256e.js",
        autoFrameJs = isMobile ? mobileFrameJs : pcFrameJs,
        grayscaleThreshold = 1,
        grayscaleAppId = ["123", "2100049389", "2100049390", "2046103261", "2070173641", "2060075756"],
        grayscaleProb = Math.random(),
        needGrayscaleJs = void 0,
        jsLoadStatus = "none",
        capError = __webpack_require__(3),
        preVerifyData = {},
        capObj = void 0,
        initQueue = [],
        defaultOpt = {
            type: "popup",
            pos: isIEVar(6) ? "absolute" : "fixed",
            lang: 2052,
            showHeader: isMobile,
            needFeedBack: !0,
            themeColor: "",
            tcaptchaFlag: !0,
            gettype: "cap_union_prehandle",
            domain: capDomain,
            htdoc_path: capDomain
        },
        noop = function() {},
        isGrayscaleAppId = function(t) {
            if (needGrayscaleJs !== undefined) return needGrayscaleJs;
            for (var e = 0, n = grayscaleAppId.length; e < n; e++)
                if (t == grayscaleAppId[e]) return needGrayscaleJs = !0;
            return needGrayscaleJs = !1
        },
        callbackWrap = function(t, e) {
            return function(n) {
                "object" === (void 0 === n ? "undefined" : _typeof(n)) && (n = extend({
                    bizState: t.options.bizState,
                    appid: t.options.appid
                }, n)), e && e(n)
            }
        },
        executor = new Executor(function() {
            if (initQueue.length > 0) {
                for (var t = 0; t < initQueue.length; t++) initQueue[t].show();
                initQueue.length = 0
            }
        }, 0),
        Captcha = function Captcha($btn, appid, _tcallback_, opts) {
            var bizState = void 0;
            if (isElement($btn))
                if (appid && "object" === (void 0 === appid ? "undefined" : _typeof(appid))) opts = appid,
                    appid = null, _tcallback_ = null;
                else {
                    if (appid = appid || $btn.getAttribute("data-appid"), !_tcallback_) {
                        var callbackName = $btn.getAttribute("data-cbfn");
                        try {
                            _tcallback_ = eval("window." + callbackName)
                        } catch (e) {
                            throw new Error("Lost `callback`")
                        }
                    }
                    bizState = $btn.getAttribute("data-biz-state")
                }
            else {
                if ("string" != typeof $btn || "function" != typeof appid) throw new Error("Arguments error.");
                opts = _tcallback_, _tcallback_ = appid, appid = $btn, $btn = null
            }
            opts = opts || {}, opts.callback = _tcallback_ || opts.callback, opts.start = opts.start || noop,
                opts.end = opts.end || noop;
            var readyCallback = "function" == typeof opts.ready ? opts.ready : noop;
            if (opts.ready = function(t) {
                    readyCallback.call(this, t)
                }, opts.appid = appid || opts.appid, opts.bizState = bizState || opts.bizState, opts.fwidth =
                parseFloat(opts.fwidth) || 0, opts.sdkOpts = opts.sdkOpts || null, opts.ele = $btn, this.options =
                opts, "function" != typeof opts.callback) throw new Error("Lost `callback`");
            if (this.initOpts = extend({}, defaultOpt, opts), this.langFun(), $btn) {
                var that = this;
                eventListener.add($btn, "click", function() {
                    that.show()
                })
            }
        };
    Captcha.prototype = {
        show: function() {
            if (executor.isDone) this.__show__();
            else {
                for (var t = 0; t < initQueue.length; t++)
                    if (initQueue[t] === this) return;
                initQueue.push(this)
            }
        },
        __show__: function() {
            var t = this.initOpts;
            if ("undefined" == typeof window.AqSCode) return capError.send(
                "ERROR_TYPE_FRAMEJS_CODE_ERROR", t.appid), alert(
                "\u9875\u9762\u52a0\u8f7d\u5f02\u5e38\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5"
            );
            this.destroy();
            var e = [];
            for (var n in e.push("aid=" + t.appid), e.push("accver=1"), e.push("showtype=" + t.type), e
                    .push("ua=" + encodeURIComponent(btoa(navigator.userAgent))), e.push("noheader=" +
                        ("" + t.showHeader == "false" ? "1" : "0")), e.push("fb=" + ("" + t.needFeedBack ==
                        "false" ? "0" : "1")), t.sid && e.push("sid=" + t.sid), preVerifyData)
                preVerifyData[n] && e.push(n + "=" + encodeURIComponent(preVerifyData[n]));
            t.uid = "" + (t.uin || ""), needGrayscaleJs && (e.push("grayscale=1"), t.grayscale = 1),
                isMobile ? (e.push("clientype=1"), t.clientype = 1, t.forceLang && e.push("lang=" + t.forceLang),
                    t.params = "?" + e.join("&")) : (e.push("clientype=2"), t.clientype = 2,
                    needGrayscaleJs && t.forceLang && e.push("lang=" + t.forceLang), t.params = "?" + e
                    .join("&"), t.s_type_suffix = "?" + e.join("&"), t.src = capDomain +
                    "/template/new_placeholder.html" + t.s_type_suffix, t.s_type = capDomain +
                    "/cap_union_prehandle" + t.s_type_suffix, t.slide_src = capDomain +
                    "/template/new_slide_placeholder.html" + t.s_type_suffix, t.fb = "" + t.needFeedBack ==
                    "false" ? "0" : "1"), (capObj = new AqSCode(t)).listen(callbackWrap(this, t.callback),
                    callbackWrap(this, t.ready)), capObj.start(callbackWrap(t.start)), capObj.end(
                    callbackWrap(t.end)), needGrayscaleJs ? ((t.top || t.left) && capObj.initPos({
                    top: t.top || undefined,
                    left: t.left || undefined
                }), capObj.create()) : isMobile && ((t.top || t.left) && capObj.initPos({
                    top: t.top || undefined,
                    left: t.left || undefined
                }), capObj.create())
        },
        langFun: function() {
            if (this.initOpts.forceLang) {
                var t = {
                        "zh-cn": "2052",
                        "zh-hk": "1028",
                        en: "1033"
                    },
                    e = this.initOpts.forceLang;
                t[e] ? (this.initOpts.lang = t[e], this.initOpts.forceLang = t[e], this.initOpts.forcestyle =
                    1) : this.initOpts.forceLang = ""
            }
        },
        destroy: function() {
            capObj && capObj.destroy && capObj.destroy()
        },
        refresh: function() {
            capObj && capObj.refresh && capObj.refresh()
        },
        getTicket: function() {
            if (capObj && capObj.getTicket) {
                var t = null;
                return callbackWrap(this, function(e) {
                    t = e
                })(capObj.getTicket()), t
            }
            return null
        }
    };
    var autoBindBtn = function() {
        var t = document.getElementById("TencentCaptcha");
        t && new Captcha(t)
    };
    executor.exec(function(t) {
        domReady(function() {
            try {
                autoBindBtn()
            } catch (e) {}
            new Messenger("TCaptchaVerifyDetect").listen(function(t) {
                if (t && "object" === (void 0 === t ? "undefined" : _typeof(t))) switch (
                    t.type) {
                    case "preVerify":
                        extend(preVerifyData, t.data)
                }
            });
            try {
                invisibleIframe("https://ssl.captcha.qq.com/template/captcha-pre-verify.html")
            } catch (e) {}
            t()
        })
    }), executor.exec(function(t) {
        jsLoadStatus = "loading", needGrayscaleJs = !0, loadScript(grayscaleFrameJs, capDomain,
            capDomain,
            function() {
                return !!window.AqSCode
            },
            function() {
                jsLoadStatus = "loaded", t()
            },
            function() {
                jsLoadStatus = "none", capError.send("ERROR_TYPE_FRAMEJS_DOWNLOAD_FAIL"), t()
            })
    }), window.TencentCaptcha = Captcha
}, function(t, e, n) {
    var o = n(33);
    "string" == typeof o && (o = [
        [t.i, o, ""]
    ]);
    n(13)(o, {});
    o.locals && (t.exports = o.locals)
}, function(t, e, n) {
    (t.exports = n(12)(!1)).push([t.i,
        "@keyframes animate_dots{0%{opacity:1}to{opacity:0}}@-webkit-keyframes animate_dots{0%{opacity:1}to{opacity:0}}.dot0,.dot1{animation:animate_dots .9s infinite;-moz-animation:animate_dots .9s infinite;-webkit-animation:animate_dots .9s infinite;-o-animation:animate_dots .9s infinite}.dot1{animation-delay:.2s;-webkit-animation-delay:.2s}.dot2{animation:animate_dots .9s infinite;-moz-animation:animate_dots .9s infinite;-webkit-animation:animate_dots .9s infinite;-o-animation:animate_dots .9s infinite;animation-delay:.4s;-webkit-animation-delay:.4s}.dots_item{display:inline-block;margin-right:5px;width:10px;height:10px;border-radius:50%;background:#4886ff}.verify-icon{position:absolute;width:100%;margin-top:70px;text-align:center}.t-mask{width:100%;height:100%;position:fixed;_position:absolute;left:0;top:0;background:#000;opacity:.5;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50);z-index:2000000000}",
        ""
    ])
}, function(t, e, n) {
    t.exports = function(t) {
        var e, n = [],
            o = document,
            r = o.documentElement,
            i = r.doScroll,
            a = (i ? /^loaded|^c/ : /^loaded|c/).test(o.readyState);

        function c(t) {
            for (a = 1; t = n.shift();) t()
        }
        return o.addEventListener && o.addEventListener("DOMContentLoaded", e = function() {
            o.removeEventListener("DOMContentLoaded", e, !1), c()
        }, !1), i && o.attachEvent("onreadystatechange", e = function() {
            /^c/.test(o.readyState) && (o.detachEvent("onreadystatechange", e), c())
        }), t = i ? function(e) {
            self != top ? a ? e() : n.push(e) : function() {
                try {
                    r.doScroll("left")
                } catch (n) {
                    return setTimeout(function() {
                        t(e)
                    }, 50)
                }
                e()
            }()
        } : function(t) {
            a ? t() : n.push(t)
        }
    }()
}, function(t, e, n) {
    "use strict";
    var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        r = function(t) {
            var e = [0, 2, 1][t.length % 3],
                n = t.charCodeAt(0) << 16 | (t.length > 1 ? t.charCodeAt(1) : 0) << 8 | (t.length > 2 ? t.charCodeAt(
                    2) : 0);
            return [o.charAt(n >>> 18), o.charAt(n >>> 12 & 63), e >= 2 ? "=" : o.charAt(n >>> 6 & 63), e >= 1 ?
                "=" : o.charAt(63 & n)
            ].join("")
        };
    t.exports = function(t) {
        return t.replace(/[\s\S]{1,3}/g, r)
    }
}, function(t, e, n) {
    "use strict";
    var o = 2;
    t.exports = function r(t, e, n, i, a, c, s) {
        s = s || 1;
        var u = !1,
            p = document.createElement("script");

        function f(t) {
            u || (t && "load" === t.type || /^(loaded|complete)$/.test(this.readyState)) && (i() ? (u = !0,
                a && a()) : l())
        }
        p.type = "text/javascript", p.async = !0, p.src = (s > 1 ? n : e) + t, "onload" in p ? p.onload = f :
            p.onreadystatechange = f;
        var l = function() {
            u || (u = !0, s >= o ? c && c() : r(t, e, n, i, a, c, s + 1))
        };
        p.onerror = l, document.getElementsByTagName("head").item(0).appendChild(p)
    }
}, function(t, e, n) {
    "use strict";
    var o = function(t, e) {
        this.i = 0, this.doneCallback = t, this.isDone = !1, this.timeout = e || 0;
        var n = this;
        this.immediateExec = setTimeout(function() {
            n.doneCheck()
        }, 0)
    };
    o.prototype = {
        doneCheck: function(t, e) {
            try {
                t && t(e)
            } catch (n) {}
            if (this.i--, this.i <= 0) try {
                this.isDone = !0, this.doneCallback()
            } catch (n) {}
        },
        exec: function(t, e, n) {
            clearTimeout(this.immediateExec);
            var o = !1,
                r = "",
                i = this;
            this.i++, this.i > 0 && (this.isDone = !1);
            try {
                (r = t(function(t) {
                    o || (o = !0, setTimeout(function() {
                        i.doneCheck(e, t)
                    }, 0))
                })) && (o = !0, setTimeout(function() {
                    i.doneCheck(e, r)
                }, 0))
            } catch (a) {}(n = n || this.timeout || 0) > 0 && setTimeout(function() {
                o || (o = !0, i.doneCheck(e, ""))
            }, n)
        }
    }, t.exports = o
}, function(t, e, n) {
    "use strict";
    t.exports = function(t) {
        var e = document.createElement("b");
        return e.innerHTML = "\x3c!--[if IE " + t + "]><i></i><![endif]--\x3e", e.getElementsByTagName("i") &&
            1 === e.getElementsByTagName("i").length
    }
}, function(t, e, n) {
    "use strict";
    var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ?
            "symbol" : typeof t
    };
    t.exports = function(t) {
        try {
            return t instanceof HTMLElement
        } catch (e) {
            return "object" === (void 0 === t ? "undefined" : o(t)) && 1 === t.nodeType && "object" === o(t
                .style) && "object" === o(t.ownerDocument)
        }
    }
}, function(t, e, n) {
    "use strict";
    t.exports = function(t) {
        var e = document.createElement("iframe");
        return e.src = t, e.style.cssText = "width: 0px; height: 0px; display: none;", (document.body ||
            document.getElementsByTagName("body").item("0")).appendChild(e), e
    }
}]);