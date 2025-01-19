document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("configForm");
    const replacementText = document.getElementById("replacementText");
    const replacementLink = document.getElementById("replacementLink");
  
    chrome.storage.sync.get(["replacementText", "replacementLink"], (config) => {
      replacementText.value = config.replacementText || "[Don't remind me]";
      replacementLink.value = config.replacementLink || "https://pastebin.com/raw/QW7fubvU";
    });
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      chrome.storage.sync.set(
        {
          replacementText: replacementText.value,
          replacementLink: replacementLink.value,
        },
        () => {
          alert("Settings saved!");
        }
      );
    });
  });
  