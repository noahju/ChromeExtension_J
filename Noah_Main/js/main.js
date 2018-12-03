$(document).ready(function(){
    var mytap = new MYTAP();
    startTime();
    getpoemdata();
    getData();

    var fixedlayerCookie = C_COOKIE.getCookie("fixedlayer");
    if (fixedlayerCookie != "" && fixedlayerCookie != null && fixedlayerCookie == true){
        $(".fixedlayer").show();
        console.log()
    }else{
        fixedlayerCookie = false;
    }

    $(document).on("click" , "#btnchangeback" , function(){
        mytap.my_refreshBackgroundImage();
    });
    $(document).on("click" ,".gear" , function(){
        $(".fixedlayer").toggle(500  , function(){
            console.log("clicked!");
            C_COOKIE.setCookie("fixedlayer" , !fixedlayerCookie , 1)
        })
    });

    $(document).on("click" , "#doingBtn" , function(){
        var doingtxt =  $("#doingTxt").val();
        if(doingtxt == ""){
            alert('return ');
            return;
        }
        var pouchDbobj = new POUCHBD_DAC("3");
        var doingObj = {
            n_title : doingtxt, 
            n_regdate : Date.now(),
            n_uptdate : Date.now(),
            n_auth : 'noah' 
        }
        pouchDbobj.INSERT_DATA(doingObj);
        getData();
    });
    
    $(document).on("click" , ".doinglist .btn" , async function(){
        var del_id = $(this).data('dataid');
        var pouchDbobj = new POUCHBD_DAC("3");
        var finish = await pouchDbobj.REMOVEDATA_2(del_id);
        console.log(finish);
        getData();
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


async function getData(){
    var p_obj = new POUCHBD_DAC("3");
    var p_data  = await p_obj.GETALLDOC();
    console.log(p_data);
    $(".doinglist ul").empty();
    p_data.forEach( item => {
        var html = "<li>"
        + "<input type='text' value='" + item.doc.navigationData.n_title  +  "' >"
        + "<button class='btn' data-dataid='" + item.id + "'>"
        + "            <span>X</span>"
        + "</button>"
        + "</li>";
        $(".doinglist ul").append(html);
    });

}