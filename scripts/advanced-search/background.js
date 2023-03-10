/**
 * ss 的寓意
 *
 * - 搜索 (sou suo)
 *
 * - 超级搜索 (super search)
 * - 智慧搜索 (smart search)
 * - 洞见搜索 (sagacious search)
 * - 流畅搜索 (smooth search)
 * - 安全搜索 (safe search)
 *
 * 当然还有...
 * - 简单搜索 (simple search)
 * - 愚蠢搜索 (stupid search)
 *
 * 即使有上面那么多的功能，但我们不往初心，
 *
 * - 开创探索 (seminal search)
 * - 启航 (set sail)
 */

/**
 * refer:
 *
 * omnibox 搜索
 * GitHub demo: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/mv2-archive/extensions/chrome_search
 * Blog: https://www.cnblogs.com/cc11001100/p/12353361.html
 * Debug: https://chrome.google.com/webstore/detail/omnibox-debug/nhgkpjdgjmjhgjhgjhgjhgjhgjhgjhgjhg
 */



/**
 * ****************************************************************************************
 *
 * 搜索模式配置部分
 *
 * ****************************************************************************************
 */

/**
 * 支持的搜索方式
 *
 * Notes:
 * - 第一位需要保留为默认搜索方式（文字）
 * - getSuggestions / search 方法传入参数应该是经过 getInputText 过滤前面搜索模式字符的字符串
 */
var omniboxSearchModes = [
  // #############################################################################################################
  {
    key: "",
    // 显示文字
    showText: "文字",
    // 搜索模式匹配
    // match: function (text) { },
    // 获取输入文字
    getInputText: function (text, opt = { encodeText: true }) {
      return opt.encodeText ? encodeXML(text) : text
    },
    // 搜索建议
    getSuggestions: async function (text, suggest) {
      // 传入的 text 没有经过 encode
      let encodeText = encodeXML(text)
      // 如果前面已经有了 【[xx] 】，则先去掉
      text = text.replace(/^\[.*?\]\s*/, "");
      suggest([
        { content: "[百度] " + text, description: "使用 <url>[百度]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "[搜狗] " + text, description: "使用 <url>[搜狗]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "[必应] " + text, description: "使用 <url>[必应]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "[360] " + text, description: "使用 <url>[360]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "[微博] " + text, description: "使用 <url>[微博]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "[知乎] " + text, description: "使用 <url>[知乎]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "[今日头条] " + text, description: "使用 <url>[今日头条]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "[中国搜索] " + text, description: "使用 <url>[中国搜索]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
      ]);
      return;

      // var url = "https://code.google.com/p/chromium/codesearch#search/&type=cs&q=" + query +
      //   "&exact_package=chromium&type=cs";
      // var req = new XMLHttpRequest();
      // req.open("GET", url, true);
      // req.setRequestHeader("GData-Version", "2");
      // req.onreadystatechange = function () {
      //   if (req.readyState == 4) callback(req.responseXML);
      // }
      // req.send(null);
      // // return req;


      // suggestions.forEach((suggestion) => { suggestion.deletable = false /* 用户不可删除 */ });
      // /**
      //  * SuggestResult
      //  * refer: https://developer.chrome.com/docs/extensions/reference/omnibox/
      //  * { content, description[, deletable] }
      //  */
      // suggest(suggestions);

      // // suggest([
      // //   { content: "one", description: "the <match>aaa</match><url>www</url>first one", deletable: false },
      // //   { content: "number two", description: "the second entry", deletable: false }
      // // ]);
    },
    // 执行搜索
    search: function (text) {
      let searchInput = /^(\[.*?\])?( )?(.*)$/.exec(text)
      let searchType = /^\[(.*?)\]$/.exec((searchInput[1] ?? "[百度]"/* 默认百度搜索 */).trim())[0].trim()
      let searchText = searchInput[3].trim()
      console.log("[文字搜索开始]");
      console.log("    传入参数为：", text);
      console.log("    searchInput为：", searchInput);
      console.log("    searchType为：", searchType);
      console.log("    searchText为：", searchText);
      switch (searchType) {
        default:
        case "[百度]":
          navigate("https://www.baidu.com/s?wd=" + encodeURIComponent(searchText), true);
          break;
        case "[搜狗]":
          navigate("https://www.sogou.com/web?query=" + encodeURIComponent(searchText), true);
          break;
        case "[必应]":
          navigate("https://cn.bing.com/search?q=" + encodeURIComponent(searchText), true);
          break;
        case "[360]":
          navigate("https://www.so.com/s?q=" + encodeURIComponent(searchText), true);
          break;
        case "[微博]":
          navigate("https://s.weibo.com/weibo?q=" + encodeURIComponent(searchText), true);
          break;
        case "[知乎]":
          navigate("https://www.zhihu.com/search?type=content&q=" + encodeURIComponent(searchText), true);
          break;
        case "[今日头条]":
          navigate("https://so.toutiao.com/search?dvpf=pc&keyword=" + encodeURIComponent(searchText), true);
          break;
        case "[中国搜索]":
          navigate("http://www.chinaso.com/newssearch/all/allResults?q=" + encodeURIComponent(searchText), true);
          break;
      }
      console.log("[文字搜索结束]");
    }
  },
  // #############################################################################################################
  {
    key: "img",
    // 显示文字
    showText: "图片",
    // 搜索模式匹配
    match: function (text) {
      return /^img( |:|\uff1a)?/i.test(text)
    },
    // 获取输入文字
    getInputText: function (text, opt = { encodeText: true }) {
      let returnText = /^img(:| |\uff1a)?(.*)$/i.exec(text)[2].trim()
      return opt.encodeText ? encodeXML(returnText) : returnText
    },
    // 搜索建议
    getSuggestions: async function (text, suggest) {
      // 传入的 text 没有经过 encode
      let encodeText = encodeXML(text)
      // 如果前面已经有了 【[xx] 】，则先去掉
      text = text.replace(/^\[.*?\]\s*/, "");
      suggest([
        { content: "img: [百度] " + text, description: "使用 <url>[百度图片]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "img: [搜狗] " + text, description: "使用 <url>[搜狗图片]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "img: [必应] " + text, description: "使用 <url>[必应图片]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "img: [360] " + text, description: "使用 <url>[360图片]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "img: [微博] " + text, description: "使用 <url>[微博图片]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "img: [今日头条] " + text, description: "使用 <url>[今日头条]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "img: [中国搜索] " + text, description: "使用 <url>[中国搜索图片]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
      ]);
      return;
    },
    // 执行搜索
    search: function (text) {
      let searchInput = /^(\[.*?\])?( )?(.*)$/.exec(text)
      let searchType = /^\[(.*?)\]$/.exec((searchInput[1] ?? "[百度]"/* 默认百度图片搜索 */).trim())[0].trim()
      let searchText = searchInput[3].trim()
      console.log("[图片搜索开始]");
      console.log("    传入参数为：", text);
      console.log("    searchInput为：", searchInput);
      console.log("    searchType为：", searchType);
      console.log("    searchText为：", searchText);
      switch (searchType) {
        default:
        case "[百度]":
          navigate("https://image.baidu.com/search/index?tn=baiduimage&word=" + encodeURIComponent(searchText), true);
          break;
        case "[搜狗]":
          navigate("https://pic.sogou.com/pics?query=" + encodeURIComponent(searchText), true);
          break;
        case "[必应]":
          navigate("https://cn.bing.com/images/search?q=" + encodeURIComponent(searchText), true);
          break;
        case "[360]":
          navigate("https://image.so.com/i?q=" + encodeURIComponent(searchText), true);
          break;
        case "[微博]":
          navigate("https://s.weibo.com/pic?q=" + encodeURIComponent(searchText), true);
          break;
        case "[今日头条]":
          navigate("https://so.toutiao.com/search?pd=atlas&dvpf=pc&keyword=" + encodeURIComponent(searchText), true);
          break;
        case "[中国搜索]":
          navigate("http://www.chinaso.com/newssearch/image?q=" + encodeURIComponent(searchText), true);
          break;

      }
      console.log("[图片搜索结束]");
    }
  },
  // #############################################################################################################
  {
    key: "video",
    // 显示文字
    showText: "视频",
    // 搜索模式匹配
    match: function (text) {
      return /^video( |:|\uff1a)?/i.test(text)
    },
    // 获取输入文字
    getInputText: function (text, opt = { encodeText: true }) {
      let returnText = /^video(:| |\uff1a)?(.*)$/i.exec(text)[2].trim()
      return opt.encodeText ? encodeXML(returnText) : returnText
    },
    // 搜索建议
    getSuggestions: async function (text, suggest) {
      // 传入的 text 没有经过 encode
      let encodeText = encodeXML(text)
      // 如果前面已经有了 【[xx] 】，则先去掉
      text = text.replace(/^\[.*?\]\s*/, "");
      suggest([
        { content: "video: [B站] " + text, description: "使用 <url>[哔哩哔哩动画]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "video: [爱奇艺] " + text, description: "使用 <url>[爱奇艺]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "video: [腾讯视频] " + text, description: "使用 <url>[腾讯视频]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "video: [优酷] " + text, description: "使用 <url>[优酷]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "video: [百度] " + text, description: "使用 <url>[百度视频]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "video: [搜狗] " + text, description: "使用 <url>[搜狗视频]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "video: [微博] " + text, description: "使用 <url>[微博视频]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "video: [抖音] " + text, description: "使用 <url>[抖音]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "video: [必应] " + text, description: "使用 <url>[必应视频]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        // 以下内容超出9个不被显示
        { content: "video: [360] " + text, description: "使用 <url>[360视频]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "video: [今日头条] " + text, description: "使用 <url>[今日头条]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "video: [快手] " + text, description: "使用 <url>[快手]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "video: [知乎] " + text, description: "使用 <url>[知乎]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "video: [搜狐] " + text, description: "使用 <url>[搜狐视频]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "video: [央视网] " + text, description: "使用 <url>[央视网]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "video: [中国搜索] " + text, description: "使用 <url>[中国搜索视频]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
      ]);
      return;
    },
    // 执行搜索
    search: function (text) {
      let searchInput = /^(\[.*?\])?( )?(.*)$/.exec(text)
      let searchType = /^\[(.*?)\]$/.exec((searchInput[1] ?? "[B站]"/* 默认爱奇艺搜索 */).trim())[0].trim()
      let searchText = searchInput[3].trim()
      console.log("[视频搜索开始]");
      console.log("    传入参数为：", text);
      console.log("    searchInput为：", searchInput);
      console.log("    searchType为：", searchType);
      console.log("    searchText为：", searchText);
      switch (searchType) {
        default:
        case "[B站]":
          navigate("https://search.bilibili.com/all?keyword=" + searchText);
          break;
        case "[爱奇艺]":
          navigate("https://so.iqiyi.com/so/q_" + encodeURIComponent(searchText), true);
          break;
        case "[腾讯视频]":
          navigate("https://v.qq.com/x/search/?q=" + encodeURIComponent(searchText), true);
          break;
        case "[优酷]":
          navigate("https://so.youku.com/search_video/q_" + encodeURIComponent(searchText), true);
          break;
        case "[百度]":
          navigate("https://v.baidu.com/v?word=" + encodeURIComponent(searchText), true);
          break;
        case "[搜狗]":
          navigate("https://v.sogou.com/v?query=" + encodeURIComponent(searchText), true);
          break;
        case "[360]":
          navigate("https://tv.360kan.com/s?q=" + encodeURIComponent(searchText), true);
          break;
        case "[微博]":
          navigate("https://s.weibo.com/video?q=" + encodeURIComponent(searchText), true);
          break;
        case "[抖音]":
          navigate("https://www.douyin.com/search/" + encodeURIComponent(searchText) + "?type=video", true);
          break;
        case "[必应]":
          navigate("https://cn.bing.com/videos/search?q=" + encodeURIComponent(searchText), true);
          break;
        case "[今日头条]":
          navigate("https://so.toutiao.com/search?pd=video&dvpf=pc&keyword=" + encodeURIComponent(searchText), true);
          break;
        case "[知乎]":
          navigate("https://www.zhihu.com/search?type=zvideo&q=" + encodeURIComponent(searchText), true);
          break;
        case "[快手]":
          navigate("https://www.kuaishou.com/search/video?searchKey=" + encodeURIComponent(searchText), true);
          break;
        case "[搜狐]":
          navigate("https://so.tv.sohu.com/mts?wd=" + encodeURIComponent(searchText), true);
          break;
        case "[央视网]":
          navigate("https://search.cctv.com/search.php?type=video&qtext=" + encodeURIComponent(searchText), true);
          break;
        case "[中国搜索]":
          navigate("http://www.chinaso.com/newssearch/video?q=" + encodeURIComponent(searchText), true);
          break;
      }
      console.log("[视频搜索结束]");
    }
  },
  // #############################################################################################################
  {
    key: "news",
    // 显示文字
    showText: "新闻",
    // 搜索模式匹配
    match: function (text) {
      return /^news( |:|\uff1a)?/i.test(text)
    },
    // 获取输入文字
    getInputText: function (text, opt = { encodeText: true }) {
      let returnText = /^news(:| |\uff1a)?(.*)$/i.exec(text)[2].trim()
      return opt.encodeText ? encodeXML(returnText) : returnText
    },
    // 搜索建议
    getSuggestions: async function (text, suggest) {
      // 传入的 text 没有经过 encode
      let encodeText = encodeXML(text)
      // 如果前面已经有了 【[xx] 】，则先去掉
      text = text.replace(/^\[.*?\]\s*/, "");
      suggest([
        { content: "news: [今日头条] " + text, description: "使用 <url>[今日头条]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "news: [百度] " + text, description: "使用 <url>[百度资讯]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "news: [360] " + text, description: "使用 <url>[360资讯]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "news: [微博] " + text, description: "使用 <url>[微博]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "news: [人民网] " + text, description: "使用 <url>[人民网]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "news: [中国搜索] " + text, description: "使用 <url>[中国搜索]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "news: [快资讯] " + text, description: "使用 <url>[快资讯]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
      ]);
      return;
    },
    // 执行搜索
    search: function (text) {
      let searchInput = /^(\[.*?\])?( )?(.*)$/.exec(text)
      let searchType = /^\[(.*?)\]$/.exec((searchInput[1] ?? "[今日头条]"/* 默认今日头条搜索 */).trim())[0].trim()
      let searchText = searchInput[3].trim()
      console.log("[新闻搜索开始]");
      console.log("    传入参数为：", text);
      console.log("    searchInput为：", searchInput);
      console.log("    searchType为：", searchType);
      console.log("    searchText为：", searchText);
      switch (searchType) {
        default:
        case "[今日头条]":
          navigate("https://www.toutiao.com/search/?keyword=" + encodeURIComponent(searchText), true);
          break;
        case "[百度]":
          navigate("https://www.baidu.com/s?tn=news&word=" + encodeURIComponent(searchText), true);
          break;
        case "[360]":
          navigate("https://news.so.com/ns?q=" + encodeURIComponent(searchText), true);
          break;
        case "[微博]":
          navigate("https://s.weibo.com/weibo/" + encodeURIComponent(searchText), true);
          break;
        case "[人民网]":
          navigate("http://search.people.cn/s?keyword=" + encodeURIComponent(searchText) + "&st=0&_=" + Date.now(), true);
          break;
        case "[中国搜索]":
          navigate("http://www.chinaso.com/newssearch/news?q=" + encodeURIComponent(searchText), true);
          break;
        case "[快资讯]":
          navigate("https://www.360kuai.com/search?q=" + encodeURIComponent(searchText), true);
          break;
      }
      console.log("[新闻搜索结束]");
    }
  },
  // #############################################################################################################
  {
    key: "fanyi",
    // 显示文字
    showText: "翻译",
    // 搜索模式匹配
    match: function (text) {
      return /^fanyi( |:|\uff1a)?/i.test(text)
    },
    // 获取输入文字
    getInputText: function (text, opt = { encodeText: true }) {
      let returnText = /^fanyi(:| |\uff1a)?(.*)$/i.exec(text)[2].trim()
      return opt.encodeText ? encodeXML(returnText) : returnText
    },
    // 搜索建议
    getSuggestions: async function (text, suggest) {
      // 传入的 text 没有经过 encode
      let encodeText = encodeXML(text)
      // 如果前面已经有了 【[xx] 】，则先去掉
      text = text.replace(/^\[.*?\]\s*/, "");
      suggest([
        { content: "fanyi: [有道翻译] " + text, description: "<url>翻译</url> | 使用 <url>[有道翻译]</url> 翻译 <match>" + encodeText + "</match>", deletable: false },
        { content: "fanyi: [百度] " + text, description: "<url>翻译</url> | 使用 <url>[百度翻译]</url> 翻译 <match>" + encodeText + "</match>", deletable: false },
        { content: "fanyi: [腾讯] " + text, description: "<url>翻译</url> | 使用 <url>[腾讯翻译君]</url> 翻译 <match>" + encodeText + "</match>", deletable: false },
        { content: "fanyi: [DeepL] " + text, description: "<url>翻译</url> | 使用 <url>[DeepL翻译]</url> 翻译 <match>" + encodeText + "</match>", deletable: false },
        // 【需要注入自动翻译】 { content: "fanyi: [海词翻译] " + text, description: "<url>翻译</url> | 使用 <url>[海词翻译]</url> 翻译 <match>" + encodeText + "</match>", deletable: false },
        { content: "fanyi: [必应] " + text, description: "<url>查词</url> | 使用 <url>[必应词典]</url> 查词 <match>" + encodeText + "</match>", deletable: false },
        { content: "fanyi: [有道] " + text, description: "<url>查词</url> | 使用 <url>[有道]</url> 查词 <match>" + encodeText + "</match>", deletable: false },
        { content: "fanyi: [海词] " + text, description: "<url>查词</url> | 使用 <url>[海词]</url> 查词 <match>" + encodeText + "</match>", deletable: false },
        { content: "fanyi: [金山词霸] " + text, description: "<url>查词</url> | 使用 <url>[金山词霸]</url> 查词 <match>" + encodeText + "</match>", deletable: false },
        // 以下内容超出9个不被显示
        { content: "fanyi: [360] " + text, description: "<url>翻译</url> | 使用 <url>[360翻译]</url> 翻译 <match>" + encodeText + "</match>", deletable: false },
        { content: "fanyi: [翻译狗] " + text, description: "<url>翻译</url> | 使用 <url>[翻译狗]</url> 翻译 <match>" + encodeText + "</match>", deletable: false },
        { content: "fanyi: [Google] " + text, description: "<url>翻译</url> | 使用 <url>[Google翻译]</url> 翻译 <match>" + encodeText + "</match> （Google翻译在中国大陆无法使用）", deletable: false },
      ]);
      return;
    },
    // 执行搜索
    search: function (text) {
      let searchInput = /^(\[.*?\])?( )?(.*)$/.exec(text)
      let searchType = /^\[(.*?)\]$/.exec((searchInput[1] ?? "[有道翻译]"/* 默认有道翻译 */).trim())[0].trim()
      let searchText = searchInput[3].trim()
      console.log("[翻译搜索开始]");
      console.log("    传入参数为：", text);
      console.log("    searchInput为：", searchInput);
      console.log("    searchType为：", searchType);
      console.log("    searchText为：", searchText);
      switch (searchType) {
        default:
        case "[有道翻译]":
          // 后面参数通过注入的js代码获取并在网页加载完后填入到翻译框中，点击翻译按钮
          navigate("https://fanyi.youdao.com/index.html?__xiaomo_extension__=" + encodeURIComponent(searchText), true);
          break;
        case "[百度]":
          // 百度翻译中英文会自动识别，所以不需要手动判断
          navigate("https://fanyi.baidu.com/#en/zh/" + encodeURIComponent(searchText), true);
          break;
        case "[必应]":
          navigate("https://cn.bing.com/dict/search?q=" + encodeURIComponent(searchText), true);
          break;
        case "[腾讯]":
          // 网页加载好后自动点击翻译按钮
          navigate("https://fanyi.qq.com/?text=" + encodeURIComponent(searchText), true);
          break;
        case "[DeepL]":
          let hasChineseChar = /.*[\u4e00-\u9fa5]+.*$/.test(searchText)
          navigate("https://www.deepl.com/translator#" + (hasChineseChar ? "zh/en/" : "en/zh/") + encodeURIComponent(searchText), true);
          break;
        // case "[海词翻译]":
        //   navigate("http://fanyi.dict.cn/" + encodeURIComponent(searchText), true);
        //   break;
        case "[金山词霸]":
          navigate("https://www.iciba.com/word?w=" + encodeURIComponent(searchText), true);
          break;
        case "[海词]":
          navigate("https://dict.cn/" + encodeURIComponent(searchText), true);
          break;
        case "[有道]":
          navigate("https://www.youdao.com/w/" + encodeURIComponent(searchText), true);
          break;
        case "[360]":
          navigate("https://fanyi.so.com/#" + encodeURIComponent(searchText), true);
          break;
        case "[翻译狗]":
          navigate("https://www.fanyigou.com/trans/totran/tranText.html?text=" + encodeURIComponent(searchText), true);
          break;
        case "[Google]":
          navigate("https://translate.google.cn/?text=" + encodeURIComponent(searchText), true);
          break;
      }
      console.log("[翻译搜索结束]");
    }
  },
  // #############################################################################################################
  {
    key: "paper",
    // 显示文字
    showText: "学术论文",
    // 搜索模式匹配
    match: function (text) {
      return /^paper( |:|\uff1a)?/i.test(text)
    },
    // 获取输入文字
    getInputText: function (text, opt = { encodeText: true }) {
      let returnText = /^paper(:| |\uff1a)?(.*)$/i.exec(text)[2].trim()
      return opt.encodeText ? encodeXML(returnText) : returnText
    },
    // 搜索建议
    getSuggestions: async function (text, suggest) {
      // 传入的 text 没有经过 encode
      let encodeText = encodeXML(text)
      // 如果前面已经有了 【[xx] 】，则先去掉
      text = text.replace(/^\[.*?\]\s*/, "");
      suggest([
        { content: "paper: [知网] " + text, description: "使用 <url>[中国知网]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "paper: [万方] " + text, description: "使用 <url>[万方数据]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "paper: [维普] " + text, description: "使用 <url>[维普期刊]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "paper: [百度] " + text, description: "使用 <url>[百度学术]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "paper: [必应] " + text, description: "使用 <url>[必应学术]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "paper: [搜狗] " + text, description: "使用 <url>[搜狗学术]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "paper: [谷歌] " + text, description: "使用 <url>[谷歌学术]</url> 搜索 <match>" + encodeText + "</match> （谷歌学术在中国大陆无法使用）", deletable: false },
      ]);
      return;
    },
    // 执行搜索
    search: function (text) {
      let searchInput = /^(\[.*?\])?( )?(.*)$/.exec(text)
      let searchType = /^\[(.*?)\]$/.exec((searchInput[1] ?? "[知网]"/* 默认中国知网搜索 */).trim())[0].trim()
      let searchText = searchInput[3].trim()
      console.log("[学术论文搜索开始]");
      console.log("    传入参数为：", text);
      console.log("    searchInput为：", searchInput);
      console.log("    searchType为：", searchType);
      console.log("    searchText为：", searchText);
      switch (searchType) {
        default:
        case "[知网]":
          // 后面参数通过注入的js代码获取并在网页加载完后填入到搜索框中，点击搜索按钮
          navigate("https://www.cnki.net/?__xiaomo_extension__=" + encodeURIComponent(searchText), true);
          break;
        case "[万方]":
          navigate("https://s.wanfangdata.com.cn/paper?q=" + encodeURIComponent(searchText), true);
          break;
        case "[维普]":
          // 后面参数通过注入的js代码获取并在网页加载完后填入到搜索框中，点击搜索按钮
          navigate("http://qikan.cqvip.com/?__xiaomo_extension__=" + encodeURIComponent(searchText), true);
          break;
        case "[百度]":
          navigate("https://xueshu.baidu.com/s?wd=" + encodeURIComponent(searchText), true);
          break;
        case "[必应]":
          navigate("https://cn.bing.com/academic/search?q=" + encodeURIComponent(searchText), true);
          break;
        case "[搜狗]":
          navigate("https://scholar.sogou.com/xueshu?query=" + encodeURIComponent(searchText), true);
          break;
        case "[Google]":
          navigate("https://scholar.google.com/scholar?q=" + encodeURIComponent(searchText), true);
          break;
      }
      console.log("[学术论文搜索结束]");
    }
  },
  // #############################################################################################################
  {
    key: "baike",
    // 显示文字
    showText: "百科",
    // 搜索模式匹配
    match: function (text) {
      return /^baike( |:|\uff1a)?/i.test(text)
    },
    // 获取输入文字
    getInputText: function (text, opt = { encodeText: true }) {
      let returnText = /^baike(:| |\uff1a)?(.*)$/i.exec(text)[2].trim()
      return opt.encodeText ? encodeXML(returnText) : returnText
    },
    // 搜索建议
    getSuggestions: async function (text, suggest) {
      // 传入的 text 没有经过 encode
      let encodeText = encodeXML(text)
      // 如果前面已经有了 【[xx] 】，则先去掉
      text = text.replace(/^\[.*?\]\s*/, "");
      suggest([
        { content: "baike: [百度] " + text, description: "使用 <url>[百度百科]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "baike: [搜狗] " + text, description: "使用 <url>[搜狗百科]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "baike: [360] " + text, description: "使用 <url>[360百科]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
      ]);
      return;
    },
    // 执行搜索
    search: function (text) {
      let searchInput = /^(\[.*?\])?( )?(.*)$/.exec(text)
      let searchType = /^\[(.*?)\]$/.exec((searchInput[1] ?? "[百度]"/* 默认百度百科搜索 */).trim())[0].trim()
      let searchText = searchInput[3].trim()
      console.log("[百科搜索开始]");
      console.log("    传入参数为：", text);
      console.log("    searchInput为：", searchInput);
      console.log("    searchType为：", searchType);
      console.log("    searchText为：", searchText);
      switch (searchType) {
        default:
        case "[百度]":
          // 后面参数通过注入的js代码获取并在网页加载完后填入到搜索框中，点击搜索按钮
          navigate("https://baike.baidu.com/?__xiaomo_extension__=" + encodeURIComponent(searchText), true);
          break;
        case "[搜狗]":
          //步骤一:创建异步对象
          var ajax = new XMLHttpRequest();
          //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
          ajax.open('get', 'https://baike.sogou.com/bapi/searchBarEnter?searchText=' + encodeURIComponent(searchText));
          //步骤三:发送请求
          ajax.send();
          //步骤四:注册事件 onreadystatechange 状态改变就会调用
          ajax.onreadystatechange = function () {
            console.log("ajax result", ajax)
            if (ajax.readyState == 4) {
              if (ajax.status == 200) {
                //步骤五 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
                console.log(ajax.responseText);//输入相应的内容
                navigate("https://baike.sogou.com" + ajax.responseText, true);
              } else {
                alert("搜索失败，可能是搜狗官网搜索相关api已变更，你的输入已经复制到剪切板，请手动粘贴搜索");
                navigate("https://baike.sogou.com/", true);
              }
            }
          }
          break;
        case "[360]":
          navigate("https://baike.so.com/doc/search?word=" + encodeURIComponent(searchText), true);
          break;
      }
      console.log("[百科搜索结束]");
    }
  },
  // #############################################################################################################
  {
    key: "map",
    // 显示文字
    showText: "地图",
    // 搜索模式匹配
    match: function (text) {
      return /^map( |:|\uff1a)?/i.test(text)
    },
    // 获取输入文字
    getInputText: function (text, opt = { encodeText: true }) {
      let returnText = /^map(:| |\uff1a)?(.*)$/i.exec(text)[2].trim()
      return opt.encodeText ? encodeXML(returnText) : returnText
    },
    // 搜索建议
    getSuggestions: async function (text, suggest) {
      // 传入的 text 没有经过 encode
      let encodeText = encodeXML(text)
      // 如果前面已经有了 【[xx] 】，则先去掉
      text = text.replace(/^\[.*?\]\s*/, "");
      suggest([
        { content: "map: [百度] " + text, description: "使用 <url>[百度地图]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "map: [高德] " + text, description: "使用 <url>[高德地图]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "map: [必应] " + text, description: "使用 <url>[必应地图]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "map: [360] " + text, description: "使用 <url>[360地图]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
        { content: "map: [搜狗] " + text, description: "使用 <url>[搜狗地图]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
      ]);
      return;
    },
    // 执行搜索
    search: function (text) {
      let searchInput = /^(\[.*?\])?( )?(.*)$/.exec(text)
      let searchType = /^\[(.*?)\]$/.exec((searchInput[1] ?? "[百度]"/* 默认百度图片搜索 */).trim())[0].trim()
      let searchText = searchInput[3].trim()
      console.log("[地图搜索开始]");
      console.log("    传入参数为：", text);
      console.log("    searchInput为：", searchInput);
      console.log("    searchType为：", searchType);
      console.log("    searchText为：", searchText);
      switch (searchType) {
        default:
        case "[百度]":
          navigate("https://map.baidu.com/search?querytype=s&wd=" + encodeURIComponent(searchText), true);
          break;
        case "[高德]":
          navigate("https://www.amap.com/search?query=" + encodeURIComponent(searchText), true);
          break;
        case "[必应]":
          navigate("https://cn.bing.com/maps?q=" + encodeURIComponent(searchText), true);
          break;
        case "[360]":
          navigate("https://ditu.so.com/?k=" + encodeURIComponent(searchText), true);
          break;
        case "[搜狗]":
          navigate("http://map.sogou.com/#lq=" + encodeURIComponent(searchText), true);
          break;
      }
      console.log("[地图搜索结束]");
    }
  },
  // 购物：https://s.taobao.com/search?q=搜索关键词
  // #############################################################################################################
  // {
  //   key: "jk",
  //   // 显示文字
  //   showText: "健康",
  //   // 搜索模式匹配
  //   match: function (text) {
  //     return /^jk( |:|\uff1a)?/i.test(text)
  //   },
  //   // 获取输入文字
  //   getInputText: function (text, opt = { encodeText: true }) {
  //     let returnText = /^jk(:| |\uff1a)?(.*)$/i.exec(text)[2].trim()
  //     return opt.encodeText ? encodeXML(returnText) : returnText
  //   },
  //   // 搜索建议
  //   getSuggestions: async function (text, suggest) {
  //     // 传入的 text 没有经过 encode
  //     let encodeText = encodeXML(text)
  //     // 如果前面已经有了 【[xx] 】，则先去掉
  //     text = text.replace(/^\[.*?\]\s*/, "");
  //     suggest([
  //       { content: "jk: [免责声明] " + text, description: "<match>[免责声明] <url>小墨助手仅提供快捷搜索功能，不对搜索结果承担责任。搜索结果仅供参考，请自行甄别，以免上当受骗。继续搜索代表您已知晓此声明。</url></match>", deletable: false },
  //       { content: "jk: [丁香医生] " + text, description: "使用 <url>[丁香医生]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
  //       { content: "jk: [360] " + text, description: "使用 <url>[360良医]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
  //       { content: "jk: [好大夫] " + text, description: "使用 <url>[好大夫在线]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
  //       { content: "jk: [寻医问药] " + text, description: "使用 <url>[寻医问药网]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
  //       { content: "jk: [新华健康] " + text, description: "使用 <url>[新华健康]</url> 搜索 <match>" + encodeText + "</match>", deletable: false },
  //       // 腾讯医典没有网页版；中华网健康没有搜索功能：https://health.china.com/；搜狐健康搜索为全站搜索：https://health.sohu.com/
  //     ]);
  //     return;
  //   },
  //   // 执行搜索
  //   search: function (text) {
  //     let searchInput = /^(\[.*?\])?( )?(.*)$/.exec(text)
  //     let searchType = /^\[(.*?)\]$/.exec((searchInput[1] ?? "[免责声明]"/* 默认弹出免责声明 */).trim())[0].trim()
  //     let searchText = searchInput[3].trim()
  //     console.log("[学术论文搜索开始]");
  //     console.log("    传入参数为：", text);
  //     console.log("    searchInput为：", searchInput);
  //     console.log("    searchType为：", searchType);
  //     console.log("    searchText为：", searchText);
  //     alert("[免责声明] 小墨助手仅提供快捷搜索功能，不对搜索结果承担责任。搜索结果仅供参考，请自行甄别，以免上当受骗。继续搜索代表您已知晓此声明。");
  //     switch (searchType) {
  //       default:
  //       case "[免责声明]":
  //         // Silence is gold.
  //         break;
  //       case "[丁香医生]":
  //         navigate("https://dxy.com/search/result?query=" + encodeURIComponent(searchText), true);
  //         break;
  //       case "[360]":
  //         navigate("https://ly.so.com/s?q=" + encodeURIComponent(searchText), true);
  //         break;
  //       case "[好大夫]":
  //         navigate("https://so.haodf.com/index/search?kw=" + encodeURIComponent(searchText), true);
  //         break;
  //       case "[寻医问药]":
  //         navigate("https://so.xywy.com/comse.php?keyword=" + encodeURIComponent(searchText), true);
  //         break;
  //       case "[新华健康]":
  //         navigate("http://so.xinhuanet.com/#search/0/" + encodeURIComponent(searchText) + "/1/", true);
  //         break;
  //     }
  //     console.log("[学术论文搜索结束]");
  //   }
  // },
  // #############################################################################################################
  // {
  //   key: "yn",
  //   // 显示文字
  //   showText: "网页内搜索(Todo)",
  //   // 搜索模式匹配
  //   match: function (text) {
  //     return /^yn( |:|\uff1a)?/i.test(text)
  //   },
  //   // 获取输入文字
  //   getInputText: function (text, opt = { encodeText: true }) {
  //     let returnText = /^yn(:| |\uff1a)?(.*)$/i.exec(text)[2].trim()
  //     return opt.encodeText ? encodeXML(returnText) : returnText
  //   },
  //   // 搜索建议
  //   getSuggestions: async function (text, suggest) {
  //     return;
  //   },
  //   // 执行搜索
  //   search: function (text) {

  //   }
  // },
  // #############################################################################################################
  // {
  //   key: "re",
  //   // 显示文字
  //   showText: "网页内正则表达式搜索(Todo)",
  //   // 搜索模式匹配
  //   match: function (text) {
  //     return /^re( |:|\uff1a)?/i.test(text)
  //   },
  //   // 获取输入文字
  //   getInputText: function (text, opt = { encodeText: true }) {
  //     let returnText = /^re(:| |\uff1a)?(.*)$/i.exec(text)[2].trim()
  //     return opt.encodeText ? encodeXML(returnText) : returnText
  //   },
  //   // 搜索建议
  //   getSuggestions: async function (text, suggest) {
  //     return;
  //   },
  //   // 执行搜索
  //   search: function (text) {

  //   }
  // },
  // #############################################################################################################
  // {
  //   key: "ls",
  //   // 显示文字
  //   showText: "历史记录(Todo)",
  //   // 搜索模式匹配
  //   match: function (text) {
  //     return /^ls( |:|\uff1a)?/i.test(text)
  //   },
  //   // 获取输入文字
  //   getInputText: function (text, opt = { encodeText: true }) {
  //     let returnText = /^ls(:| |\uff1a)?(.*)$/i.exec(text)[2].trim()
  //     return opt.encodeText ? encodeXML(returnText) : returnText
  //   },
  //   // 搜索建议
  //   getSuggestions: async function (text, suggest) {
  //     return;
  //   },
  //   // 执行搜索
  //   search: function (text) {
  //     function onGot(historyItems) {
  //       for (item of historyItems) {
  //         console.log(item.url);
  //         console.log(new Date(item.lastVisitTime));
  //       }
  //     }

  //     var searching = browser.history.search({ text: text, startTime: 0 });

  //     searching.then(onGot);
  //   }
  // },
  // #############################################################################################################
  // {
  //   key: "boss",
  //   // 显示文字
  //   showText: "召唤“小墨助手”",
  //   // 搜索模式匹配
  //   match: function (text) {
  //     // return text.trim() == "boss"
  //     return /^boss( |:|\uff1a)?$/i.test(text)
  //   },
  //   // 获取输入文字
  //   getInputText: (text) => "回车执行",
  //   // 搜索建议
  //   getSuggestions: async function (text, suggest) {
  //     return;
  //   },
  //   // 执行搜索
  //   search: function (text) {

  //   }
  // }
]



/**
 * ****************************************************************************************
 *
 * 全局变量定义部分
 *
 * ****************************************************************************************
 */
// 当前匹配的搜索模式的下标
var currentSearchModeIndex = 0;

// 当前正在向服务端进行的请求
var currentRequest = null;

//
var ajaxUrl = "https://www.baidu.com/s?wd=";



/**
 * ****************************************************************************************
 *
 * 搜索模式配置部分
 *
 * ****************************************************************************************
 */

/**
 * 用户开始输入文本
 */
chrome.omnibox.onInputStarted.addListener(async function () {
  if (!await checkIsActived()) return;

  console.log("chrome.omnibox.onInputStarted");
  updateDefaultSuggestion('');
});

/**
 * 搜索框失去焦点
 */
chrome.omnibox.onInputCancelled.addListener(async function () {
  if (!await checkIsActived()) return;

  console.log("chrome.omnibox.onInputCancelled");
  updateDefaultSuggestion('');
});

/**
 * 输入框文本改变事件
 */
chrome.omnibox.onInputChanged.addListener(async function (text, suggest) {
  if (!await checkIsActived()) return;

  console.log("chrome.omnibox.onInputChanged", text);

  // 停止上一次搜索行为
  if (currentRequest != null) {
    currentRequest.onreadystatechange = null;
    currentRequest.abort();
    currentRequest = null;
  }

  // 更新输入框回显提示信息
  updateDefaultSuggestion(text);

  // 如果啥也没有输入就返回
  if (text.trim() == '')
    return;

  // 访问后端服务获得搜索建议
  var currentSearchMode = omniboxSearchModes[currentSearchModeIndex];
  currentSearchMode.getSuggestions(currentSearchMode.getInputText(text, { encodeText: false }), suggest);
});

/**
 * 用户输入完成，按下回车键
 */
chrome.omnibox.onInputEntered.addListener(async function (text) {
  if (!await checkIsActived()) return;

  console.log("chrome.omnibox.onInputEntered");

  // 更新输入框回显提示信息
  // 注意：这里必须还要更新一次，因为用户在输入时使用上下键选择suggest项目时，会触发 chrome.omnibox.onInputChanged 事件
  //       如果不执行，那么输入 ss img 之后上下选择对应搜索，按回车会被解析为文字搜索，而不是图片搜索
  updateDefaultSuggestion(text);

  var searchMode = omniboxSearchModes[currentSearchModeIndex];
  var searchText = searchMode.getInputText(text, { encodeText: false });
  searchMode.search(searchText);
  console.log("用户输入：" + text);
});



/**
 * ****************************************************************************************
 *
 * 公共函数部分
 *
 * ****************************************************************************************
 */

/**
 * 读取功能开启状态，如果没有开启，则显示一个提示信息
 * @returns
 */
async function checkIsActived() {
  var isActived = await new Promise((resolve) => {
    chrome.storage.sync.get('State_SSSearch', function (State) {
      resolve(State.State_SSSearch);
    });
  });
  // console.log("Double S 快捷搜索功能开启状态：" + isActived);
  if (!isActived) {
    chrome.omnibox.setDefaultSuggestion({
      description: "Double S 快捷搜索功能未开启，请在小墨助手扩展设置中开启后再试"
    });
  }
  return isActived;
}


/**
 *
 * 将 & < > " ' 等特殊字符转义（中文不转义）
 *
 * XML中共有5个特殊的字符，分别为： & < > " '
 * 如果配置文件中的值包括这些特殊字符，就需要进行特别处理
 * refer: https://www.cnblogs.com/forestwolf/p/16832229.html
 *
 * 测试通过: [ re：    百度&nbsp;<>!@#$%%^&*()_+-=[]{}|\:;'",./? ]
 *
 * @param string str
 * @returns
 */
function encodeXML(str, opt = { encodeAngleBrackets: true /* 是否转义 < > */ }) {
  let result = str
  let map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&apos;"
  }

  if (opt && !opt.encodeAngleBrackets) {
    delete map["<"]
    delete map[">"]
  }

  Object.keys(map).forEach((key) => result = result.replaceAll(key, map[key]))
  return result

  /**
   * 以下方法在MV3扩展中已失效
   *
   * refer: https://www.javaroad.cn/questions/108186
   */
  // var holder = document.createElement('div');
  // holder.textContent = str;
  // return holder.innerHTML;
}


/**
 * 特殊字符 & < > " ' 的反转义（上述函数的反向操作）
 *
 * @param string str
 * @returns
 */
function decodeXML(str) {
  let result = str
  let map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&apos;"
  }
  Object.keys(map).forEach((key) => result = result.replaceAll(map[key], key))
  return result
}


/**
 * 将当前标签页导航到指定Url / 或者新建标签页
 *
 * @param String url 要导航到的url
 * @param bool openInNewTab 是否打开新标签页  false - 当前标签页， true - 新标签页（当前标签页为newtab时使用当前标签页）
 */
function navigate(url, openInNewTab = false) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (!openInNewTab || isCurrentNewTab(tabs)) {
      // 如果不在新标签页打开，或者当前标签页是新标签页
      chrome.tabs.update(tabs[0].id, { url: url });
    } else {
      // 如果在新标签页打开，且当前标签页不是新标签页
      chrome.tabs.create({ url: url });
    }
  });
}



/**
 * 获取当前是否是新标签页
 * 需要先使用以下代码获取当前所有标签页
 * chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) { });
 *
 * @param {*} tabs
 */
function isCurrentNewTab(tabs) {
  let isNewTab = (tabs && tabs.length > 0 && !!tabs[0].url && /^(.*?):\/\/newtab\/$/.test(tabs[0].url));
  console.log("当前标签页" + (isNewTab ? "是" : "不是") + "新标签页");
  return isNewTab;
}



/**
 * 更新搜索框中提示
 * @param String text 用户输入文本
 */
function updateDefaultSuggestion(text) {

  var description = [
    '<match><url>搜索方式</url></match>',
    '<dim> [ </dim>',
    '' /* 文字搜索 显示文字占位 */
  ];

  // 如果用户输入不为空，先假设为文字搜索，如果后面匹配上了其他搜索方式，则更新
  let isPlaintext = true;
  currentSearchModeIndex = 0; // 初始化搜索方式下标

  // 默认第 0 个为文字搜索，除此之外的搜索方式如果都没有匹配到，则显示文字搜索
  for (var i = 1, keyword; i < omniboxSearchModes.length; i++) {
    keyword = omniboxSearchModes[i];

    // 分隔符
    description.push('<dim> \| </dim>');

    // 通过用户输入文本匹配搜索方式
    if (keyword.match(text)) {
      // 是当前这种搜索模式
      isPlaintext = false; // 说明不是文字搜索
      currentSearchModeIndex = i; // 记录当前搜索模式的下标
      description.push('<match>' + keyword.showText + '：' + keyword.getInputText(text, { encodeText: true }) + '</match>');
    } else {
      // 不是当前这种搜索模式
      description.push('<dim>' + keyword.key + ": " + keyword.showText + '</dim>');
    }
  }
  description.push('<dim> ] </dim>');

  // 最后来处理最前面的文字部分
  if (isPlaintext) {
    // 当前为文字搜索，这里不加粗
    description[2] = '<match>' + omniboxSearchModes[0].showText + (text.trim().length > 0 ? encodeXML('：' + text.trim()) : "") + '</match>'
  } else {
    // 当前为其他类型搜索，这里不加粗
    description[2] = '<dim>' + omniboxSearchModes[0].showText + '</dim>'
  }

  console.log("[更新搜索建议]", "搜索模式:", omniboxSearchModes[currentSearchModeIndex].showText);

  chrome.omnibox.setDefaultSuggestion({
    description: description.join('')
  });
}
