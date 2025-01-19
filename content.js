function extractVars(link) {
    try {
      const url = new URL(link);
      const pathParts = url.pathname.split("/").filter(Boolean);
  
      return {
        "{link}": link,
        "{query}": url.search || "{err::500}",
        "{creator}": pathParts[1] || "{err::500}",
        "{video}": pathParts[3] || "{err::500}",
        "{content}": "{err::500}"
      };
    } catch (error) {
      console.error("Failed to parse URL:", link);
      return {
        "{link}": "{err::500}",
        "{query}": "{err::500}",
        "{creator}": "{err::500}",
        "{video}": "{err::500}",
        "{content}": "{err::500}"
      };
    }
  }
  
  function replaceTikTokLinks() {
    chrome.storage.sync.get("isEnabled", (data) => {
      if (data.isEnabled === false) return;
  
      chrome.storage.sync.get(["replacementText", "replacementLink"], (config) => {
        const links = document.querySelectorAll("a[href*='tiktok.com']");
        links.forEach((link) => {
          const originalHref = link.href;
          const originalText = link.textContent;
          const vars = extractVars(originalHref);
  
          vars["{content}"] = originalText || "{err::500}";
  
          const replacementText = config.replacementText || "[Don't remind me]";
          const replacementLink = config.replacementLink || "https://pastebin.com/raw/QW7fubvU";
  
          link.setAttribute("data-original-link", originalHref);
  
          link.textContent = replacementText.replace(/{\w+}/g, (key) => vars[key] || "{err::500}");
          link.href = replacementLink.replace(/{\w+}/g, (key) => vars[key] || "{err::500}");
  
          link.classList.add("replaced-tiktok-link");
        });
      });
    });
  }
  
  const observer = new MutationObserver(() => replaceTikTokLinks());
  observer.observe(document.body, { childList: true, subtree: true });
  
  replaceTikTokLinks();
  