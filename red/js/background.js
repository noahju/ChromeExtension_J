// omnibox 演示
chrome.omnibox.onInputChanged.addListener((text, suggest) => {
    console.log('inputChanged: ' + text);
    if(!text) return;

    suggest([
        {content: 'translate' , description : text + '뜻'}
    ])
    // if(text.includes('Emt')  ) {
    //     suggest([
    //         {content: '新浪trcontent' + text, description: '新浪trdescription' + text},
    //     ]);
    // }
    // else if(text == '微博') {
    //     suggest([
    //         {content: '新浪' + text, description: '新浪' + text},
    //         {content: '腾讯' + text, description: '腾讯' + text},
    //         {content: '搜狐' + text, description: '搜索' + text},
    //     ]);
    // }
    // else {
    //     suggest([
    //         {content: '百度搜索 ' + text, description: '百度搜索 ' + text},
    //         {content: '谷歌搜索 ' + text, description: '谷歌搜索 ' + text},
    //     ]);
    // }
});

// 当用户接收关键字建议时触发
chrome.omnibox.onInputEntered.addListener((text) => {
    console.log('inputEntered: ' + text);
    if(!text) return;
    var href = '';
    if(text.endsWith('美女')) href = 'http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=' + text;
    else if(text.startsWith('百度搜索')) href = 'https://www.baidu.com/s?ie=UTF-8&wd=' + text.replace('百度搜索 ', '');
    else if(text.startsWith('谷歌搜索')) href = 'https://www.google.com.tw/search?q=' + text.replace('谷歌搜索 ', '');
    else href = 'http://redmine.tricycle.co.kr/issues/' + text;
    openUrlCurrentTab(href);
});



chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if(request.cmd == "read_file") {
        $.ajax({
            url: chrome.extension.getURL("todolist.html"),
            dataType: "html",
            success: sendResponse,
            complete: function(res){
                console.log(res)
            }
        });
    }
})




// 获取当前选项卡ID
function getCurrentTabId(callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        if(callback) callback(tabs.length ? tabs[0].id: null);
    });
}

// 当前标签打开某个链接
function openUrlCurrentTab(url)
{
    getCurrentTabId(tabId => {
        chrome.tabs.update(tabId, {url: url});
    })
}

function pasteit() {

    document.execCommand('Paste');

    var pastevalue = $(":input").first().val()
    $("input[type='text']").each(function(){
        $(this).empty().val(pastevalue);
    })

    var editor = document.getElementById("redid");
    editor.focus();
    editor.select();

}

var getCookies = function(){
    var pairs = document.cookie.split(";");
    var cookies = {};
    for (var i=0; i<pairs.length; i++){
      var pair = pairs[i].split("=");
      cookies[(pair[0]+'').trim()] = unescape(pair[1]);
    }
    return cookies;
}
function listCookies() {
    var theCookies = document.cookie.split(';');
    var aString = '';
    for (var i = 1 ; i <= theCookies.length; i++) {
        aString += i + ' ' + theCookies[i-1] + "\n";
    }
    return aString;
}



$(document).ready(
    function(){

        //pasteit();
      /*  $("#redid").keydown(function(key){
            if (key.keyCode == 13) {
                const redmineid = this.value.replace("#" , "");
                var _url = 'http://redmine.tricycle.co.kr/issues/' + redmineid
                chrome.tabs.create({ url: _url });
            }
        })
        $("#search").click(function(){
            const redmineid = $('#redid').val().replace("#" , "");
            var _url = 'http://redmine.tricycle.co.kr/issues/' + redmineid
            chrome.tabs.create({ url: _url });
        });
        $("#searchgoogle").click(function(){
            var _url = 'https://www.baidu.com/s?ie=utf-8&wd=' + $('#redid').val()
           chrome.tabs.create({ url: _url });
        })
        $("#searchNamu").click(function(){
            var _url = 'https://namu.wiki/w/' + $('#redid').val()
           chrome.tabs.create({ url: _url });
        })

        var myCookies = listCookies();
        console.log(myCookies);
        $("#cookielist").append(myCookies);


*/
        

    }
)
