$(document).ready(function(){
    var mytap = new MYTAP();
    startTime();
    getpoemdata();

    $(document).on("click" , "#btnchangeback" , function(){
        mytap.my_refreshBackgroundImage();
    });
    $(document).on("click" ,".gear" , function(){
        $(".fixedlayer").toggle(500 , function(){
            console.log("clicked!");
        })
    });
});


///---------------------------------------------------
/// cookie object 
///---------------------------------------------------
var C_COOKIE = {
    setCookie : function (cname, cvalue, exHour) {
        var date = new Date();
        //날짜 * 시간 * 분 *  초 *  1000
        date.setTime(date.getTime() + (exHour*60*60*1000));

        var expires = "expires="+ date.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    getCookie:  function (cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    deleteCookie:  function ( name ) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}



function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    // document.getElementById('txt').innerHTML =
    // h + ":" + m + ":" + s;
    $(".digitalclockarea .time").html(h + ":" + m + ":" + s);

    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}


 function getpoemdata(){    
    var geturl__ = chrome.extension.getURL("/lib/quotes.json");
    
    $.getJSON(geturl__ , function(res){
        var myArray = res; 
        var rand = myArray[(Math.random() * myArray.length) | 0];
        console.log(rand);
        $("#quotes").html(rand.text)
    });

}