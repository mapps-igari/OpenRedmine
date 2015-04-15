var myMenuId = "redmine001";
var redmineNo = "";

chrome.contextMenus.create({
    id: myMenuId,
    title: "Redmineチケット番号が見つかりません",
    contexts: ["selection", "link"],
    onclick: function(info, tab) {
        openRedmine(redmineNo);
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(sender);
    var selText = request.selText;

    redmineNo = extractRedmineTicketNo(selText);
    var caption = (redmineNo!="") ? "'#"+redmineNo+"'をRedmineで表示" : "Redmineチケット番号が見つかりません";

    chrome.contextMenus.update(myMenuId, {title: caption});
    sendResponse({});
});

function extractRedmineTicketNo(text) {
    var matchResult = text.match(/(_|#|t|\/)\d+/g);
    return (matchResult!=null) ? matchResult[0].match(/\d+/)[0] : "";
}

function openRedmine(redmineNo) {
    if(redmineNo=="") return;

    chrome.tabs.create({
        url: "https://redmine.post-dev.com/issues/" + redmineNo
    });
}