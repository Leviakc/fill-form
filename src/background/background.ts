// background.js
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "data") {
    setTimeout(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0]?.id; // Use optional chaining to safely access tab id
        if (tabId) {
          chrome.tabs.update(tabId, { url: message.data.link, active: true });
        }
      });
    }, 1500);
  }
});
