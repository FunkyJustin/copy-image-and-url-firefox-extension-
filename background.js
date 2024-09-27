chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copyImageAndURL",
    title: "Copy Image and URL",
    contexts: ["image"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copyImageAndURL") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: copyImageAndURL,
      args: [info.srcUrl, tab.url]
    });
  }
});

function copyImageAndURL(imageUrl, pageUrl) {
  fetch(imageUrl)
    .then(response => response.blob())
    .then(blob => {
      const item = new ClipboardItem({ "image/png": blob });
      navigator.clipboard.write([item]);
    });

  navigator.clipboard.writeText(pageUrl);
}
