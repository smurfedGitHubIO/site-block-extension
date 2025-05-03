chrome.runtime.onInstalled.addListener(() => {
  console.log("Site Blocker installed");
  
  const blockedSites = [
    "instagram.com",
    "x.com",
    "twitter.com",
    "reddit.com",
    "youtube.com",
    "www.youtube.com"
  ];

  const rules = blockedSites.map((site, index) => ({
    id: 1000 + index,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: site,
      resourceTypes: ["main_frame", "sub_frame"]
    }
  }));
  
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: rules.map(rule => rule.id),
    addRules: rules
  });
});

chrome.declarativeNetRequest.onRuleMatchedDebug?.addListener(
  (info) => {
    console.log("Blocked request:", info);
  }
);