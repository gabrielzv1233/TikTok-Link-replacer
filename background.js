chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "getOriginalLink",
    title: "Get Original Link",
    contexts: ["link"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "getOriginalLink") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [info.linkUrl],
      func: (linkUrl) => {
        const linkElement = Array.from(document.querySelectorAll("a")).find(
          (link) => link.href === linkUrl
        );

        if (linkElement && linkElement.dataset.originalLink) {
          navigator.clipboard.writeText(linkElement.dataset.originalLink).then(() => {
          });
        } else {
          alert("Could not get original link.");
        }
      }
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleExtension") {
    chrome.storage.sync.get("isEnabled", (data) => {
      const isEnabled = data.isEnabled ?? true;
      const newStatus = !isEnabled;
      chrome.storage.sync.set({ isEnabled: newStatus }, () => {
        sendResponse({ isEnabled: newStatus });
      });
    });
    return true;
  }
});

