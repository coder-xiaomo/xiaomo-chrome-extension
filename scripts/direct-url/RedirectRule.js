/**
 * 规则定义
 */
const RedirectRule = {
    // 腾讯QQ
    "c.pc.qq.com": {
        path: "/middlem.html",
        param: "pfurl",
    },
    // 腾讯文档
    "docs.qq.com": {
        path: "/scenario/link.html",
        param: "url",
    },
    "www.tianyancha.com": {
        path: "/security",
        param: "target",
    },
    "jump.bdimg.com": {
        path: "/safecheck/index",
        param: "url",
    },
    "jump2.bdimg.com": {
        path: "/safecheck/index",
        param: "url",
    },
    "www.chinaz.com": {
        path: "/go.shtml",
        param: "url",
    },
    "www.douban.com": {
        path: "/link2/",
        param: "url",
    },
    "link.csdn.net": {
        path: "/",
        param: "target",
    },
    "link.zhihu.com": {
        path: "/",
        param: "target",
    },
    "link.juejin.cn": {
        path: "/",
        param: "target",
    },
    "links.jianshu.com": {
        path: "/go",
        param: "url",
    },
    "www.jianshu.com": {
        path: "/go-wild", // "/go-wild?ac=2&url="
        param: "url",
    },
    // QQ、腾讯文档、天眼查、百度贴吧、站长之家、豆瓣、Zaker、开发者知识库、CSDN、知乎、掘金、简书etc...
}

if (typeof module !== 'undefined') {
    module.exports = RedirectRule
}
