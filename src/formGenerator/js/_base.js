(function ($) {
    if (window.JqFormGenerator && window.JqFormGenerator.dom) return;
    console.log("loading....  base!")

    window.JqFormGenerator || (window.JqFormGenerator = function () {
        var a = /(^|.*[\\\/])JqFormGenerator\.js(?:\?.*|;.*)?$/i,
            d = {
                timestamp: "H4PG",
                version: "0.0.1",
                revision: "20180910",
                rnd: Math.floor(900 * Math.random()) + 100,
                _: { pending: [], basePathSrcPattern: a },
                status: "unloaded",
                basePath: function () {
                    var b = window.JqFormGenerator_BASEPATH || "";
                    if (!b) for (var c = document.getElementsByTagName("script"), d = 0; d < c.length; d++) {
                        var k = c[d].src.match(a);
                        if (k) { b = k[1]; break }
                    }
                    -1 == b.indexOf(":/") && "//" != b.slice(0, 2) && (b = 0 === b.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] + b : location.href.match(/^[^\?]*\/(?:)/)[0] + b);
                    if (!b) throw 'The JqFormGenerator installation path could not be automatically detected. Please set the global variable "JqFormGenerator_BASEPATH" before creating editor instances.'; return b
                }(),
                getUrl: function (a) {
                    -1 == a.indexOf(":/") && 0 !== a.indexOf("/") && (a = this.basePath + a);
                    this.timestamp && "/" != a.charAt(a.length - 1) && !/[&?]t=/.test(a) && (a += (0 <= a.indexOf("?") ? "\x26" : "?") + "t\x3d" + this.timestamp);
                    return a
                }
            }
        return d;
    }());
    JqFormGenerator.scriptLoader = function () {
    }();
})(jQuery)