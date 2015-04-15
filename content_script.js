
var done = false;
$(document).ready(function(){
    $("a").bind('mouseover', function() {
        var text = $(this).text();

        console.log("a mouse over "+text);

        // send msg to backgroud
        chrome.runtime.sendMessage({selText: text}, function(response) {
            console.log("get response, ");
        });
    });

});