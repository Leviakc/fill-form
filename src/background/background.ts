// background.js
chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.url.match(/\/Alumnos\/Evaluacion_Docente\//)) {
    chrome.scripting.executeScript({
      files: ["content.js"],
      target: { tabId: details.tabId },
    });
    chrome.scripting.insertCSS({
      files: ["content.css"],
      target: { tabId: details.tabId },
    });
  }
});

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
