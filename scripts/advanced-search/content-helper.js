console.log("[小墨助手]", "自动搜索模块加载成功")

window.onload = () => {

  /**
   * 先处理不需要传入参数，只需要点击按钮的情况，然后再处理需要传入参数的情况
   */

  /**
   * **********************************************************************************************
   *
   *  不需要传入参数情况
   *
   * **********************************************************************************************
   */
  switch (window.location.host) {

    case "fanyi.qq.com": // 腾讯翻译君
      document.getElementsByClassName("language-translate-button")[0].click()
      // $(".language-translate-button")[0].click()
      clearUrlParams();
      return;

  }

  /**
   * **********************************************************************************************
   *
   *  需要传入参数的情况
   *
   * **********************************************************************************************
   */

  /**
   * 定义函数
   */
  // 获取 URL 参数
  // refer: https://www.cnblogs.com/chen-lhx/p/5198612.html
  function getUrlVar(name) {
    var vars = [], hash;
    let paramString = window.location.href.slice(window.location.href.indexOf('?') + 1)
    if (paramString.includes("#"))
      paramString = paramString.substring(0, paramString.indexOf("#"))
    var hashes = paramString.split('&');
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return decodeURIComponent(vars[name] ?? "");
  }

  // 从URL参数中剔除指定参数
  function clearUrlParams() {
    // 参数获取完成后，清除页面参数
    // History.replaceState()  refer: https://developer.mozilla.org/zh-CN/docs/Web/API/History/replaceState
    // history.replaceState({}, "", "/");
    let urlParams = (location.search + "&").replace(/__xiaomo_extension__=.*?\&/, ""); // 在最后补上一个 & ，然后替换掉 __xiaomo_extension__=xxx&
    urlParams = urlParams.substring(0, urlParams.length - 1); // 去掉最后一个 &
    history.replaceState({}, "", location.pathname + urlParams);
  }

  /**
   * 开始代码逻辑
   */
  // 获取参数
  let transText = getUrlVar('__xiaomo_extension__')

  console.log("[小墨助手]", "transText:", transText);

  // 如果没有传递参数，那么就不执行
  if (!transText || transText.trim() == "" || transText == "undefined")
    return

  switch (window.location.host) {
    default:
      break;

    case "baike.baidu.com": // 百度百科
      document.getElementById("query").value = transText
      document.getElementById("search").click()
      // 跳转新页面，所以不需要清除页面参数
      break;

    case "fanyi.youdao.com": // 有道翻译
      // 插件获取不到 Vue 对象(window.$，DOM元素app的properties)，但是在控制台可以
      // console.log(JSON.stringify(Object.keys(window)))
      // console.log(Object.getOwnPropertyDescriptors(app))
      // console.log(Object.getOwnPropertyDescriptors(document.getElementById("app")))

      // let youdaoVueApp = window.app // window.app.__vue_app__.value // window.$("#app").__vue_app__
      // console.log(youdaoVueApp)

      // 获取输入框
      let input = document.getElementById("js_fanyi_input")
      // let submit = document.querySelector(".transBtn.searchBtn.red-button") // 此时页面上没有显示翻译按钮，所以获取不到
      // console.log(input)

      // 输入文字
      input.innerHTML = transText

      // 输入框要触发输入事件，才能显示出按钮
      // refer: https://blog.csdn.net/weixin_54051261/article/details/125752218
      input.dispatchEvent(
        new Event("input", {
          view: window,
          bubbles: true,
          cancelable: true,
        })
      )

      // 光标挪到最后
      // refer: https://blog.csdn.net/weixin_44461275/article/details/126282272
      function keepLastIndex(obj) {
        obj.focus(); // 解决ff不获取焦点无法定位问题
        var range = window.getSelection(); // 创建range
        range.selectAllChildren(obj); // range 选择obj下所有子内容
        range.collapseToEnd(); // 光标移至最后
      }
      keepLastIndex(input)

      // 最后清理URL上的参数
      clearUrlParams();
      break;

    case "www.cnki.net": // 中国知网
      document.getElementById("txt_SearchText").value = transText
      document.querySelector(".search-btn").click()
      break;

    case "qikan.cqvip.com": // 维普期刊
      document.getElementById("searchKeywords").value = transText
      document.getElementById("btnSearch").click()
      break;

  }

  console.log("[小墨助手]", "自动搜索模块完成搜索 [" + transText + "]");
}
