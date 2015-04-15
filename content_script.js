
var done = false;
$(document).ready(function(){
    // document以下の将来追加されるものも含めたa要素にイベントハンドラを設定
    $(document).on('mouseover', "a", function() {
        var text = $(this).text();

        // send msg to backgroud
        chrome.runtime.sendMessage({selText: text}, function(response) {
        });
    });

    // テキスト選択
    $(document).bind("mouseup", function() {
        var text = document.getSelection().toString();
        if(text=="") return;

        // send msg to backgroud
        chrome.runtime.sendMessage({selText: text}, function(response) {
        });
    });

});