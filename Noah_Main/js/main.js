$(document).ready(function(){
    //var mytap = new MYTAP(3);

    startTime();
    getpoemdata();
    getData();
    //console.log(chrome.bookmarks);


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

    $(document).on("click" , "#btnChangeDesk" , function(){
        $("#desck_1").toggle( );
        $("#desck_2").toggle( );
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

    $(document).on("click" , "#btnGetNews" , function(){
        var nCode = "xinhua-net";
        nCode = "techcrunch-cn";
        nCountry = "kr"
        newsAPi(nCode , nCountry);
    })
    ///----- add newspaper Co -----------
    var get_news_url__ = chrome.extension.getURL("/lib/NEWS_SOURCE.json");

    $.getJSON(get_news_url__ , function(res){

        $.each(res , function (i, item) {
            $("#n_selectBox").append($('<option>', {
                value: item.value,
                text : item.title
            }));
        });
    });

    var $n_items =document.getElementById("n_selectBox");
    $n_items.addEventListener("change", function(e) {
        console.log(this.value)
        newsAPi(this.value, "");
    });
    ///----- add newspaper Co End-----------
    ///----- add Country Co -----------
    var get_newsCountry_url__ = chrome.extension.getURL("/lib/NEWS_COUNTRY.json");
    $.getJSON(get_newsCountry_url__ , function(res){
       $("#ncountry_selectBox").empty();
        $.each(res , function (i, item) {
            $("#ncountry_selectBox")
            .append($('<a>', {
                href: "javascritp:;",
                value : item.title
                })
                .append("<img src='"+getImageUrl(item.title)+"'>")
            );
        });
    });

    /// add event listener
    var $n_items =document.getElementById("ncountry_selectBox");
    $n_items.addEventListener("click", function(e) {
        if(e.target && e.target.matches("a")){
            var obj = e.target;
            newsAPi("",  obj.getAttribute("value"));
        }
    });
    ///----- add Country Co End-----------



 //---get source from open api ----------------------------------------------------------------------------------------------------
    // var nsourcetemp = [];
    // var nstemp = document.getElementById("NEWS_SOURCE").getElementsByClassName("source");
    // $.each(nstemp, function(i , item){
    //     nsourcetemp.push({"title": $(item).find(".name").attr("title") , "value" : $(item).find("kbd").html() })
    // });

    // console.log( JSON.stringify(nsourcetemp) );
//-------------------------------------------------------------------------------------------------------
});

function getImageUrl(str){
    return "https://newsapi.org/images/flags/" + str + ".svg"
}

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
        $("#quotes").html(rand.text);
        $(".quotes p").html(rand.from);
    });
}





async function getData(){
    var p_obj = new POUCHBD_DAC("3");
    var p_data  = await p_obj.GETALLDOC();
    console.log(p_data);
    // $(".doinglist ul").empty();

    // p_data.forEach( item => {
    //     var html = "<li>"
    //     + "<input type='text' value='" + item.doc.navigationData.n_title  +  "' />"
    //     + " <span>" +  getFormattedDate(item.doc.navigationData.n_regdate) + "</span>  "
    //     + "<button class='btn' data-dataid='" + item.id + "'>"
    //     + "         <span>X</span>"
    //     + "</button>"
    //     + "</li>";
    //     $(".doinglist ul").append(html);
    // });
    $(".doingTime_container").empty();
    p_data.forEach( (item , index ) =>{
        $(".doingTime_container").append(
            " <div class='doingTime_content'>"
            + "<span>" + ConvertToDate(item.doc.navigationData.n_regdate, 2 ) + "</span>"
            + "<p>" + item.doc.navigationData.n_title + "</p>"
        )
    });
}



function getFormattedDate(n_regdateStr) {
    var n_date = new Date(n_regdateStr);
    var year = n_date.getFullYear();

    var month = (1 + n_date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = n_date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + "-" + day + "-" + year;
  }

  var newsAPi = function( news_Type , country  ){
    var Init_key = "cce2ec7aae82464aa36126ae2e7f43bc";
    var Init_Url = "https://newsapi.org/v2/everything";
    var Init_HeadLine_url = "https://newsapi.org/v2/top-headlines"

    //https://newsapi.org/v2/everything?sources=xinhua-net&apiKey=cce2ec7aae82464aa36126ae2e7f43bc
    //var makeCallUrl = Init_HeadLine_url + "?sources=" + news_Type + "&apiKey=" + Init_key;
    //var makeCallUrl = Init_HeadLine_url + "?country=" + country + "&apiKey=" + Init_key;
    var makeCallUrl = Init_Url;
    if( news_Type == "" && country.length > 0 ){
        makeCallUrl = "https://newsapi.org/v2/top-headlines?country=" + country + "&apiKey=cce2ec7aae82464aa36126ae2e7f43bc";
    }else{
        makeCallUrl = "https://newsapi.org/v2/everything?sources=" + news_Type + "&apiKey=cce2ec7aae82464aa36126ae2e7f43bc";
    }

    var param = {  };
    var ajaxobj = new fnAjaxObj();
    news_1(makeCallUrl);
  }
  var rendernewsHtml = function(obj_param){
    if(obj_param.length <= 0){
        return;
    }

    var obj = null;
    obj = obj_param;


    $(".newsContent").show();
    $(".newsContent div").empty();
    $(".blog-title a").empty();
    $(".blog-summary p").empty();

    document.querySelector(".newsContent").removeEventListener("click" , null );

    obj.articles.forEach( (item , index)  => {
        var html = "  <article data-id = '" + index + "'>"
        +"    <h5>" + item.title + "</h5>"
        +"  </article>"
        $(".newsContent div").append(html);
        html = "";
    });

    document.querySelector(".newsContent").addEventListener('click' , function(event){

        if (event.target.tagName.toLowerCase() === 'h5') {
            // do your action on your 'li' or whatever it is you're listening for
            var news_id = $(event.target).parent().data("id");
            var news_selector = obj.articles[news_id];
            console.log("news_selector : " + news_selector);
            console.log("title : " + news_selector.title);
            $(".blog-title a").empty();
            $(".blog-title a").append(news_selector.title);
            $(".blog-summary p").empty();
            $(".blog-summary p").html(news_selector.content || news_selector.description);
            if(news_selector.urlToImage != ''){
                $(".blog-container").css({
                    'background-image':'url(\'' + news_selector.urlToImage +'\')'
                    ,'background-size':'cover'
                    ,'background-repeat':'no-repeat'
                });
            }
            $(".blog-title").find("a").attr("href", news_selector.url);
            $(".blog-title").find("a").attr("target", "_blank");
            //$(".blog-title").find("a").target="_blank";
            $(".blog-container").show();
          }
    })
  }


function news_1( n_url ){
    console.log(n_url);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                let articles = JSON.parse(xmlhttp.responseText);
                rendernewsHtml(articles);
            }
        }
    };
    xmlhttp.open("GET", n_url , true);
    xmlhttp.send();
}












var fnAjaxObj = function(){
    this.fnAjaxCall = false;
}
fnAjaxObj.prototype.fnajax =  function( url , param , fnCallback ){
    fnObj = this.fnAjaxCallback ;
    if(typeof fnCallback != "undefined" || typeof fnCallback == ''){
        fnObj = fnCallback;
    }
    if(url == ""){
        alert('불정확한 호출입니다.');
        return;
    }
    $.ajax({
        type: 'GET',
        url: url ,
        data: param,
        dataType: 'jsonp',
        jsonpCallback: fnObj ,
        beforeSend: function (jqXHR, opts) {
            //전송중일때
            if (this.fnAjaxCall) {
                jqXHR.abort();
                alert("응모중입니다.");
            }
            else { //전송중이 아닐때
                this.fnAjaxCall = true;
            }
        },
        success:  fnObj ,
        complete: function (results) {
            this.fnAjaxCall = false;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown  + " __ " + textStatus + " __ " + jqXHR.status);
            //alert('서버와 통신중 에러가 발생했습니다. ' + errorThrown);
        }
    });
}
fnAjaxObj.prototype.fnAjaxCallback = function(res){
    console.log(res);
}

var weather = async function(){
    var get_weather_url__ = "https://api.darksky.net/forecast/67e07d1121f1c1ada1b11c382679de00/37.56621,126.9779";
    var get_weather_obj = new POUCHBD_DAC("5");

    var weatherCookie = await get_weather_obj.GETALLDOC();
    console.log(weatherCookie);
    /*
    console.log(weatherCookie[0].doc.Obj);
    weatherRender(weatherCookie[0].doc.Obj);
    return;
    */
    if(
      weatherCookie.length < 1 ||
          weatherCookie == null ||
          weatherCookie[0].doc == null ||
          weatherCookie[0].doc.Obj == undefined ||
          weatherCookie[0].doc.Obj == null ||
          weatherCookie[0].doc.Obj == ""

    ){
      $.getJSON(get_weather_url__ , function(res){
          console.log(res)
          weatherRender(res);
          var weather_obj = new POUCHBD_DAC("5");

          weather_obj.INSERT_DATA_2(res);

          //C_COOKIE.setCookie("weatherCookie" , JSON.stringify(res)  , 2);
      });
    }
    else{
      var tempnow = new Date((weatherCookie[0].doc.Obj.currently.time)*1000);
      var tempToday = tempnow.getFullYear() + "" + (tempnow.getMonth()+1) + "" +  tempnow.getDate();

      var _tempnow = new Date();
      var _tempToday = _tempnow.getFullYear() + "" + (_tempnow.getMonth()+1) + "" +  _tempnow.getDate();

      if( tempToday != _tempToday){
        console.log('its here');
          $.getJSON(get_weather_url__ , function(res){
              console.log(res)
              weatherRender(res);
              var weather_obj = new POUCHBD_DAC("5");

              weather_obj.INSERT_DATA_2(res);

              //C_COOKIE.setCookie("weatherCookie" , JSON.stringify(res)  , 2);
          });
      }else{
        weatherRender(weatherCookie[0].doc.Obj);
      }
    }
}

var weatherRender  = function(weatherObj ){
    console.log(  "render : " +  weatherObj);

    $(".weather .content").empty();
            $(".weather .content").append(
                    "<h3> 時刻 : " + ConvertToDate(weatherObj.currently.time, 3) + "</h3>"
                    + "<div class='degrees'> 体感温度 : " + weatherObj.currently.apparentTemperature + "</div>"
                    + "<div class='data'>"
                    +"<h2> 概要 : " + weatherObj.currently.summary + "</h2>"
                    +"<div> 風速 : " + weatherObj.currently.windSpeed + "</div>"
                    +"<div> 湿度 : "+ Math.floor((weatherObj.currently.humidity*100)) + "%</div>"
                    + "</div>"
            );

            $(".weather .icon i").removeClass().addClass(weatherObj.currently.icon);
}

weather();

var ConvertToDate = function(dateStr , d_type ){
       var retStr ;
       var timestamp = dateStr;
       var now = new Date(timestamp*1000);

       var today = now.toDateString();
       var time = now.toLocaleTimeString();
       var todayDate = now.getDate();
       var todayMonth = now.getMonth() + 1;
       var todayYear = now.getFullYear();

       var hours = now.getHours();
       var minutes = now.getMinutes();
       var seconds = now.getSeconds();
       var milliseconds = now.getMilliseconds();
       var newSeconds = seconds + (milliseconds/1000);

    switch(d_type){
        case 1:
            retStr =  today + " " + time ;
            break;
        case 2:
            retStr =  todayYear + "" + todayMonth + "" + todayDate;
            break;
        default :
            retStr =  today;
            break;
        break;
    }

    return retStr;

}



///////------------------------------------------
//   https://darksky.net/dev/docs
//   https://api.darksky.net/forecast/67e07d1121f1c1ada1b11c382679de00/37.56621,126.9779
///////==========================================





//*****----------------------------------------------------------//
// canvas test for clock
window.onload = init;

var init = function(){
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#28d1fa';

    ctx.lineWidth = 17;
    ctx.lineCap = 'round';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#28d1fa';
    var canvas = document.getElementById('canvas');


    setInterval(renderTime, 40);

}




function degToRad(degree) {
  var factor = Math.PI/180;
  return degree*factor;
}

function renderTime() {

  var now = new Date();
  var today = now.toDateString();
  var time = now.toLocaleTimeString();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var milliseconds = now.getMilliseconds();
  var newSeconds = seconds+ (milliseconds/1000);

  // Background
  gradient = ctx.createRadialGradient(200,200,5,200,200,300);
  gradient.addColorStop(0,'#09303a');
  gradient.addColorStop(1, '#000000');
  ctx.fillStyle = gradient;
  ctx.fillRect(0,0,400,400);

  // Hours
  ctx.beginPath();
  ctx.arc(200, 200, 170, degToRad(270), degToRad((hours*30)-90));
  ctx.stroke();

  // Minutes
   ctx.beginPath();
  ctx.arc(200, 200, 140, degToRad(270), degToRad((minutes*6)-90));
  ctx.stroke();
  // Seconds
   ctx.beginPath();
  ctx.arc(200, 200, 110, degToRad(270), degToRad((newSeconds*6)-90));
  ctx.stroke();
  // Date
  ctx.font = "20px Helvetica";
  ctx.fillStyle = '#28d1fa';
  ctx.fillText(today, 140, 200);

  // Time
  ctx.font = "15px Helvetica";
  ctx.fillStyle = '#28d1fa';
  ctx.fillText(time, 140, 230);

}


//------------------------------------------------------------------
