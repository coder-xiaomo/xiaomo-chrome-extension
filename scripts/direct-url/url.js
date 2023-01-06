window.onload = function () {

  // 判断功能是否启用
  let isEnabled = new Promise((resolve) => {
    chrome.storage.sync.get("State_DirectUrl", ({ State_DirectUrl }) => {
      resolve(State_DirectUrl)
    })
  })
  if (!isEnabled) {
    console.log("[小墨助手]", "确认跳转页直接跳转功能未开启，将不进行跳转")
    return;
  }

  console.log("[小墨助手]", "确认跳转页直接跳转模块加载成功")

  // 创建一个MyukiToast的实例 // $MT = MyukiToast
  // let toastObj = $MT("#xiaomo_chrome_extension_toast")
  let toastObj = $MT("", {
    'type': 'info', // 'type': 'warning',
    'top': '60px',
    'fontSize': '16px',
    'width': '300px',
    "dismissible": false,
    'autoHide': false,
    'animation': 'normal-shake' // 'vibrate-2', 'heartbeat'
  })

  // 获取参数
  function getParams(key) {
    let dict = {}
    location.search.substring(1).split("&").forEach(str => {
      let s = str.split("=")
      dict[s[0]] = s.length > 1 ? s[1] : null
    })
    if (!key) return dict
    else return dict[key]
  }

  function redirect() {
    let url = location.href
    let host = location.host
    let path = location.pathname
    let search = location.search
    // console.log(url, host, path, search)

    // 匹配 host
    const rule = RedirectRule[host]
    if (!rule) return
    console.log("host匹配成功")

    // 匹配 path
    console.log(`real path: [${path}], rule path: [${rule.path}]`)
    if (!path.startsWith(rule.path)) return
    console.log("path匹配成功")

    // 调用toast方法
    toastObj.toast("[小墨助手] 正在自动跳转⛄️")

    // 获取参数
    let target = decodeURIComponent(getParams(rule.param))

    // 如果不是 http(s):// 开头，则手动添加 schema
    if (!target.startsWith("http"))
      target = "http://" + target

    // 跳转
    // location.replace(target)
    location.href = target
  }

  // setTimeout(redirect, 500)
  redirect()
}