const path = require("path")
const fs = require("fs")


/**
 * manifest 修改之后记得执行下面这条命令重新 generate
 * node generate-manifest.js
 *
 * 或者使用这条命令监控文件变化
 * nodemon generate-manifest.js
 */
// Manifest file format: https://developer.chrome.com/docs/extensions/mv3/manifest/
var manifest = {
    /**
     * Required
     */
    "manifest_version": 3,
    "name": "小墨助手",
    "version": "1.0.0",


    /**
     * Recommended
     */
    "action": {
        // 浏览器右上角插件logo
        "default_icon": { // optional
            "16": "resources/image/logo.png",
            "24": "resources/image/logo.png",
            "32": "resources/image/logo.png"
        },
        // 浏览器右上角logo 鼠标悬浮显示文字
        "default_title": "点击打开小墨助手 配置页面", // optional, shown in tooltip
        "default_popup": "html/popup.html" // optional
    },

    // "default_locale": "zh",
    // 如果需要配置default_locale，那么需要创建_locales/zh/messages.json，内容框架如下
    // { "keyName": { "message": "msg", "description": "desc" } }

    "description": "便捷，易用的浏览器小助手",

    "icons": { // 插件配置页面图标
        "16": "resources/image/logo.png",
        "32": "resources/image/logo.png",
        "48": "resources/image/logo.png",
        "128": "resources/image/logo.png"
    },


    /**
     * Optional
     */
    // "author": "developer@example.com",

    // "automation": {},

    "background": {
        // "service_worker": "scripts/service_worker/background.js"
        "service_worker": "background.js"
    },

    // "chrome_settings_overrides": {},

    "chrome_url_overrides": {},

    "commands": {
        // 最多可以设置 4 个快捷键，必须包含 Ctrl 或 Alt
        // refer: https://developer.chrome.com/docs/extensions/reference/commands/
        // 查看: chrome://extensions/shortcuts
        "_execute_action": {
            "suggested_key": {
                "default": "Alt+Comma",
                // "windows": "Alt+Comma",
                // "mac": "Alt+Comma",
                // "chromeos": "Alt+Comma",
                // "linux": "Alt+Comma"
            }
        },
        "toggle-feature-foo": {
            "suggested_key": {
                "default": "Ctrl+Shift+U",
                "mac": "Command+Shift+U"
            },
            "description": "Toggle feature foo",
            "global": true
        }
    },

    "content_scripts": [
        {
            "matches": [
                "<all_urls>",
                "*://*/*"
            ],
            "js": [
                // "assets/js/lib/jquery.min.js",
                // "assets/js/content.js",
                // "assets/js/direct-url/url.js",
                "scripts/advanced-search/content.js"
            ],
            "css": [],
            "run_at": "document_start"
        },
        // {
        //     // 屏蔽Google广告模块
        //     "matches": [
        //         "*://*/*"
        //     ],
        //     "js": [
        //         // "assets/js/remove-google-ads/removeAds.js"
        //     ],
        //     "run_at": "document_start"
        // },
        // {
        //     // 自动展开模块
        //     "matches": [
        //         "*://blog.csdn.net/*",
        //         "*://www.it1352.com/*"
        //     ],
        //     "js": [
        //         // "assets/js/lib/jquery.min.js",
        //         // "assets/js/expand-full-text/expand.js"
        //     ],
        //     "run_at": "document_start"
        // },
        {
            // 自动搜索模块
            "matches": [
                "*://fanyi.qq.com/*",
                "*://baike.baidu.com/*",
                "*://fanyi.youdao.com/*",
                "*://www.cnki.net/*",
                "*://qikan.cqvip.com/*",
                "*://lib.cqvip.com/*"
            ],
            "js": [
                "scripts/advanced-search/content-helper.js"
            ],
            "run_at": "document_start"
        }
    ],

    "content_security_policy": {},

    "cross_origin_embedder_policy": {},

    "cross_origin_opener_policy": {},

    // "declarative_net_request": {},

    // "devtools_page": "devtools.html",

    "event_rules": [],

    // "export": {},

    // "externally_connectable": {},

    "file_browser_handlers": [],

    "file_system_provider_capabilities": {},

    // "homepage_url": "https://path/to/homepage", // 主页待配置

    "host_permissions": [],

    // "import": [],

    "incognito": "spanning", // spanning, split, or not_allowed

    "input_components": [],

    // "key": "publicKey",

    "minimum_chrome_version": "107",

    // "nacl_modules": [],

    // "oauth2": {},

    "omnibox": {
        "keyword": "ss"
    },

    "optional_host_permissions": [],

    "optional_permissions": [],

    "options_page": "html/options.html",

    "options_ui": {},

    "permissions": [
        //
        "commands",
        // 浏览器书签
        "bookmarks",
        // 右键菜单
        "contextMenus",
        "storage",
        "webNavigation"
    ],

    // "replacement_web_app": "https://example.com", // 待配置

    "requirements": {},

    "sandbox": {},

    // "short_name": "Short Name",

    "storage": {},

    "tts_engine": {},

    // "update_url": "https://path/to/updateInfo.xml",

    "version_name": "1.0 beta", // 插件配置页面显示版本

    "web_accessible_resources": []
}

function save(beautify = false) {
    if (beautify) {
        fs.writeFileSync(path.join(__dirname, "./manifest.json"), JSON.stringify(manifest, null, 4))
    } else {
        fs.writeFileSync(path.join(__dirname, "./manifest.json"), JSON.stringify(manifest))
    }
}

save()