/*
 * @copyright: Richard Parnaby-King
 * @url: http://richard.parnaby-king.co.uk
 */

//When user clicks on button, run script
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(null, { file: "jquery-1.11.3.min.js" }, function() {
    chrome.tabs.executeScript(null, { file: "contentscript.js" });
	});
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_new_tab" ) {
      chrome.tabs.create({"url": request.url});
    }
  }
);