console.log("[小墨助手]", "插件已启用")

// 每次改变开关状态时刷新页面使功能及时生效
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(`进入 scripts/content.js 的 onMessage Listener`)

  if (request.action === 'refreshPage') {
    location.reload();
    sendResponse('Reload page because of ' + request.info);
  }

  console.log(`离开 scripts/content.js 的 onMessage Listener`)
  return true;
})
