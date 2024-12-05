function handleNavigation(url: string) {
  setTimeout(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id; // Use optional chaining to safely access tab id
      if (tabId) {
        chrome.tabs.update(tabId, { url, active: true });
      }
    });
  }, 1500);
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "data") {
    handleNavigation(message.data.link);
  }
  if (message.action === "goFormPage") {
    handleNavigation(message.data);
  }
});
