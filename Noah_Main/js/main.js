$(document).ready(function(){
    var mytap = new MYTAP();
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
        $("#desck_1").toggle(500  );    
        $("#desck_2").toggle(500 );
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





    // $("details").on("click", function() {
    //     document.querySelectorAll('details').removeAttr('open');

    //     $("details[open]")
    //         .not(this)
    //         .removeAttr("open");
    // });

    //news click event 
    //-------------------------------------------------------------------------------------------------------
//    var o = new Option("option text", "value");
//    /// jquerify the DOM object 'o' so we can use the html method
//    $(o).html("option text");
//    $("#n_selectBox").append(o);
    var n_items = [
        {"value" : "xinhua-net" , "text": "t_1"},
        {"value" : "xinhua-net" , "text": "t_2"},
        {"value" : "xinhua-net" , "text": "t_3"},
        {"value" : "xinhua-net" , "text": "t_4"},
        {"value" : "xinhua-net" , "text": "t_5"},
        {"value" : "xinhua-net" , "text": "t_6"},
        {"value" : "xinhua-net" , "text": "t_7"}
    ]
            
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
 
 //---get source from open api ----------------------------------------------------------------------------------------------------
    var nsourcetemp = [];
    
    var nstemp = document.getElementById("NEWS_SOURCE").getElementsByClassName("source");
    console.log(nstemp.length)
    $.each(nstemp, function(i , item){
        
        nsourcetemp.push({"title": $(item).attr("title") , "value" :$(item).attr('href').replace('/s/' , '') })
    });

    console.log( JSON.stringify(nsourcetemp) );
//-------------------------------------------------------------------------------------------------------


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
        + "<input type='text' value='" + item.doc.navigationData.n_title  +  "' />"
        + " <span>" +  getFormattedDate(item.doc.navigationData.n_regdate) + "</span>  "
        + "<button class='btn' data-dataid='" + item.id + "'>"
        + "         <span>X</span>"
        + "</button>"
        + "</li>";
        $(".doinglist ul").append(html);
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
    var makeCallUrl = "https://newsapi.org/v2/everything?sources=" + news_Type + "&apiKey=cce2ec7aae82464aa36126ae2e7f43bc";
    var param = {  };
    
    var ajaxobj = new fnAjaxObj();
    news_1(makeCallUrl);
  }
  var rendernewsHtml = function(obj){
    if(obj.length <= 0){
        return;
    }
    
    $(".newsContent").show();
    $(".newsContent div").empty();
    $(".blog-title a").empty();
    $(".blog-summary p").empty();

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
            $(".blog-title a").empty();
            $(".blog-title a").append(news_selector.title);
            $(".blog-summary p").empty();
            $(".blog-summary p").html(news_selector.description);
            
            $(".blog-title").find("a").attr("href", news_selector.url);
            $(".blog-title").find("a").attr("target", "_blank");
            //$(".blog-title").find("a").target="_blank";
            $(".blog-container").show();
          }
    })
    // var newContetn = document.getElementsByClassName("newsContent");
    
    // console.log(newContetn);
    // newContetn.forEach(item=>{
    //     $(item).addEventListener("click" , item =>{
    //         if(item.target && item.target.nodeName === "article"){
    //             consoel.log(item.target);
    //         }
    //     });
    // });
    

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
    if(typeof fnCallback != "undefined"){
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
        jsonpCallback: "myCallback",
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
            alert('서버와 통신중 에러가 발생했습니다. ' + errorThrown);
        }
    });
}
fnAjaxObj.prototype.fnAjaxCallback = function(res){
    console.log(res);
}