chrome.pageAction.onClicked.addListener(clicked);

function clicked(tab) {
  const currentURL = tab.url;
  const REGEX = /https:\/\/www.facebook.com\/groups\/([0-9a-zA-Z._]+)\/?(\?[a-z_=A-z0-9]+)?$/;
  const result = currentURL.match(REGEX);
  //checks we are on facebook group url but not the main feed page, and that we've not already added the CHRONOLOGICAL param
  if (REGEX.test(currentURL) && result[1] !== "feed") {
    chrome.tabs.executeScript(null, { file: "content.js" });
  }
}

let rule1 = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {
        hostEquals: "www.facebook.com",
        pathPrefix: "/groups",
        schemes: ["https"],
      },
    }),
  ],
  actions: [new chrome.declarativeContent.ShowPageAction()],
};

chrome.declarativeContent.onPageChanged.removeRules(undefined, (data) => {
  chrome.declarativeContent.onPageChanged.addRules([rule1], (data) => {
    console.log("addRules", data);
  });
});
