$(function () {
    /**
     * Direct Url
     */
    const btnDirectUrl = document.querySelector("#btnDirectUrl");
    // 页面加载时，更新界面开关状态
    chrome.storage.sync.get("State_DirectUrl", ({ State_DirectUrl }) => {
        btnDirectUrl.checked = !State_DirectUrl;
    });

    // 点击开关时存储按钮状态并刷新页面
    btnDirectUrl.addEventListener("change", () => {
        chrome.storage.sync.set({ State_DirectUrl: !btnDirectUrl.checked });
        refreshPage('Direct Url');
    });


    /**
     * Expand Fulltext
     */
    const btnExpandFulltext = document.querySelector("#btnExpandFulltext");
    // 页面加载时，更新界面开关状态
    chrome.storage.sync.get("State_ExpandFulltext", ({ State_ExpandFulltext }) => {
        btnExpandFulltext.checked = !State_ExpandFulltext;
    });

    // 点击开关时存储按钮状态并刷新页面
    btnExpandFulltext.addEventListener("change", () => {
        chrome.storage.sync.set({ State_ExpandFulltext: !btnExpandFulltext.checked });
        refreshPage('Expand Fulltext');
    });


    /**
     * Google 广告拦截
     */
    const btnGoogleAds = document.querySelector("#btnAdsBlock");
    // 页面加载时，更新界面开关状态
    chrome.storage.sync.get('State_AdsBlock', function (budget) {
        btnGoogleAds.checked = !budget.State_AdsBlock;
    });

    // 点击开关时存储按钮状态并刷新页面
    $("#btnAdsBlock").click(function () {
        chrome.storage.sync.set({ 'State_AdsBlock': !btnGoogleAds.checked });
        chrome.extension.getBackgroundPage().updateAdsBlockStatus(!btnGoogleAds.checked);
        refreshPage('Ads Block');
    })


    /**
     * Double S 快捷搜索
     */
    const btnSSSearch = document.querySelector("#btnSSSearch");
    // 页面加载时，更新界面开关状态
    chrome.storage.sync.get('State_SSSearch', function (budget) {
        btnSSSearch.checked = !budget.State_SSSearch;
    });

    // 点击开关时存储按钮状态并刷新页面
    $("#btnSSSearch").click(function () {
        chrome.storage.sync.set({ 'State_SSSearch': !btnSSSearch.checked });
        // refreshPage('SS Search');
    })


    // ****************************************************************************************************************

    /**
     * 判断是否是浏览器设置页面
     * 即是否是 chrome:// 或 edge:// 开头的链接
     * @param {} url
     * @returns
     */
    function isBrowserSettingPage({ url, action, showSorryInfo = true }) {
        var protocol, isSettingPage = true;
        if (/^chrome:\/\/.*$/.test(url)) {
            protocol = "chrome://"
        } else if (/^edge:\/\/.*$/.test(url)) {
            protocol = "edge://"
        } else {
            isSettingPage = false;
        }
        if (showSorryInfo && isSettingPage) {
            alert(`十分抱歉，由于浏览器限制，“${protocol}”开头的网站不支持${action}`);
        }
        return isSettingPage;
    }

    /**
     * 改变开关自动刷新页面
     *
     * 向网页发送一条消息，由注入的脚本接收，完成页面刷新操作
     */
    function refreshPage(messageInfo) {
        console.log("refreshPage", messageInfo)
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, (tabs) => {
            console.log(tabs);
            let message = {
                info: messageInfo,
                action: "refreshPage"
            }
            chrome.tabs.sendMessage(tabs[0].id, message, res => {
                console.log(res);
            })
        })
    }
})
