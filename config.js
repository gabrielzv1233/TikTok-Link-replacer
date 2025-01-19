document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("configForm");
    const replacementText = document.getElementById("replacementText");
    const replacementLink = document.getElementById("replacementLink");
  
    chrome.storage.sync.get(["replacementText", "replacementLink"], (config) => {
      replacementText.value = config.replacementText || "[ Goodbye TikTok :( ]";
      replacementLink.value = config.replacementLink || "https://raw.githubusercontent.com/gabrielzv1233/TikTok-Link-replacer/refs/heads/main/examplelink.txt";
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
  