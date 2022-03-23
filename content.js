// So Much For Subtlety
chrome.runtime.onMessage.addListener( //监听扩展程序进程或内容脚本发送的请求
    function  (request, sender, sendResponse) {
        console.log(request)
        if  (request.action ==  "getSelection" ) {
        var selection = window.getSelection().toString()
            sendResponse({ data: selection });
        }
    }
);

