// refer: https://developer.chrome.com/docs/extensions/mv3/service_workers/#manifest
console.clear()
console.log("[小墨助手]", "Service Worker init success.")


// Events must be registered synchronously from the start of the page.
chrome.runtime.onInstalled.addListener(() => {
  console.log("[小墨助手]", "chrome.runtime.onInstalled.")

  // In Chrome, you should create the context menu just once after install/update.
  // refer: https://stackoverflow.com/questions/64318529/cannot-create-item-with-duplicate-context-menu-id-in-extension

  /**
   * 右键菜单
   */

  // 右键菜单 contextMenus 的 id
  const contextMenusId = 'xiaomo-extension-contextMenus'

  // 右键菜单选项
  // ContextType: "all", "page", "frame", "selection", "link", "editable", "image", "video", "audio", "launcher", "browser_action", "page_action", "action"
  const contextMenus = [
    {
      id: contextMenusId,
      title: '小墨助手',
      contexts: ["all"], //所有情况都显示
    },
    /*
    {
      parentId: contextMenusId,
      id: `${contextMenusId}-sampleContextMenu`,
      title: "Sample Context Menu",
      contexts: ["selection"], // 选择文字时显示
    },
    */
    {
      parentId: contextMenusId,
      id: `${contextMenusId}-advanced-search`,
      title: '高级搜索',
    },
  ]

  // 添加菜单项
  for (contextMenusItem of contextMenus) {
    chrome.contextMenus.create(contextMenusItem)
  }

  chrome.contextMenus.onClicked.addListener(function (info) {
    console.log('当前菜单信息:' + JSON.stringify(info))
    console.log("[小墨助手]", "高级搜索 已点击菜单")
  })

})

//
chrome.commands.onCommand.addListener((command) => {
  console.log("[小墨助手]", `Command: ${command}`)
})

/**
 * 书签
 */
// This will run when a bookmark is created.
chrome.bookmarks.onCreated.addListener(() => {
  // do something
  console.log("[小墨助手]", "chrome.bookmarks.onCreated.")
})

// chrome.runtime.onMessage.addListener((message, sender, reply) => {
//   chrome.runtime.onMessage.removeListener(event)
// })



const filter = {
  url: [
    {
      urlMatches: 'https://www.baidu.com/.*?',
    },
  ],
}

chrome.webNavigation.onCompleted.addListener((details) => {
  console.info("[小墨助手]", "The user has loaded my favorite website!", details)
}, filter)

importScripts("./scripts/advanced-search/background.js")
