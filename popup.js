document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggle-extension");
    const configButton = document.getElementById("open-config");
  
    chrome.storage.sync.get("isEnabled", (data) => {
      const isEnabled = data.isEnabled ?? true;
      updateButtonText(isEnabled);
    });
  
    toggleButton.addEventListener("click", () => {
      chrome.runtime.sendMessage({ action: "toggleExtension" }, (response) => {
        if (response) {
          updateButtonText(response.isEnabled);
        }
      });
    });
  
    configButton.addEventListener("click", () => {
      chrome.tabs.create({ url: chrome.runtime.getURL("config.html") });
    });
  
    function updateButtonText(isEnabled) {
      toggleButton.textContent = isEnabled ? "Disable Extension" : "Enable Extension";
    }
  });
  