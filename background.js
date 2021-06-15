chrome.browserAction.onClicked.addListener(function (tab) {
  createNewTabInOppositeMode(tab.url, tab.incognito);
  chrome.tabs.remove(tab.id);
});

chrome.contextMenus.create({
  id: "incognitoornot",
  title: "Open Link in Incognito/Normal Window",
  contexts: ["link"]
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  createNewTabInOppositeMode(info.linkUrl, tab.incognito);
});

function createNewTabInOppositeMode(url, incognito) {
  chrome.windows.getAll({ windowTypes: ["normal"] }, function (windows) {
    for (var i = 0; i < windows.length; i++) {
      if (windows[i].incognito != incognito) {
        chrome.windows.update(windows[i].id, { focused: true }, function (focused_window) {
          chrome.tabs.create({ windowId: focused_window.id, url: url, active: true });
        });
        return;
      }
    }
    chrome.windows.create({ url: url, incognito: !incognito });
  });
}
