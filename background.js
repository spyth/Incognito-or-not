chrome.browserAction.onClicked.addListener(function(tab) {
  if(tab.incognito){
    createNewTabInNomalMode(tab.url);
  }
});

chrome.contextMenus.create({
  id: "showup",
  title: "Open Link in Normal Window",
  contexts: ["link"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if(tab.incognito){
    createNewTabInNomalMode(info.linkUrl);
  }
});

function createNewTabInNomalMode(url){
  chrome.windows.getAll({windowTypes: ["normal"]}, function(windows){
    for(var i = 0; i < windows.length; i++ ){
      var windowId = 0;
      if(!windows[i].incognito){
        chrome.tabs.create({windowId: windows[i].id, url: url, active: true});
        return;
      }
    }
    chrome.windows.create({url: url});
  })
}
