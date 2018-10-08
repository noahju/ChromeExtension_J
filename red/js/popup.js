$(document).ready(function(){
    

    if( getCookie("backgroundImage") == "true"){
        $('#toggle-two').prop('checked', true);

    }
    $('#toggle-two').change(function() {
        var toggletwo = $(this).prop('checked');
        document.cookie = "backgroundImage=" + toggletwo + ";expires=Thu, 18 Dec 2020 12:00:00 UTC";
        
    })

    loadDoc();

    $("#newPage").click(function(){
      ///chrome.browserAction.setPopup({popup: "new.html"});
      window.location.href="new.html";
    });

    $(".about").click(function(){
        GetNYpd()
      });

    function showWeather(wi){
        $('#city-weather').text(wi+ 'thsi is djalsdjflkasjdflkjasdklfjlasjdfkl').show();
    };


     function getWeather(cityNum){
         showWeather(cityNum);
     };

     $('#weather-get').click(function(){
         var curCity = $('#city-select').text();
         
         if(curCity < 1){
            console.log("none");
            return;
            }else{
                getWeather(curCity);
            }

     });
     $("#g_search").click(item=>{
        var s_text = $("#googleSearch").val();
        var g_search_url = "https://www.google.com.tw/search?q=" + s_text;
        openUrlCurrentTab(g_search_url);
     });

     $("#s_search").on("keypress", function(e){
        if (e.keyCode == 13){
            $("#t_search").click();
        }
     });

     $("#t_search").click(item =>{
        var sUrl = "";
        var  s_text = $("#s_search").val();
        
        var s_site =  $("#pills-tab li").find(".active").text();
        if(s_site =="Google"){
            sUrl = 'https://www.google.com.tw/search?q=' + s_text;
        }else if(s_site == "Baidu"){
            sUrl = 'https://www.baidu.com/s?ie=UTF-8&wd=' + s_text;
        }else if(s_site == "naver"){
            sUrl = 'https://search.naver.com/search.naver?query=' + s_text;
        }
        openUrlCurrentTab(sUrl);
    });
     $("#redmine_searchbtn").click(item=>{
         var s_text = $("#redmine_search").val();
         var redmine_searchurl = "http://redmine.tricycle.co.kr/issues/" + s_text;
         openUrlCurrentTab(redmine_searchurl);
     })

     
     //toggle menu
     $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });    


    $("#todo_list_date").append(
        new Date().getDate() + " " 
        + Date.locale.en.month_names[new Date().getMonth()] + " "
        + new Date().getFullYear()
    )
   
    //search Event 
    $("#pills-tab li a").click(function(){
        $("#pills-tab li").find(".active").removeClass("active");
        $(this).addClass("active");
    });

    
    ChromeStorageObj.getStorage();    
    // chrome - storage 
    $("#s_storagebtn").click(function(){
        var storageText = $("#s_storage").val();
        ChromeStorageObj.addStorage(storageText) ;
    });

    $("#g_storagebtn").click(function(){
        ChromeStorageObj.getStorage();
    });

    $("#todoListAddBtn").click(function(){
        $("#todolistInputform").toggle("active");
    });

});

window.onload= function(){
    $(".sidebar-nav").css('top', $("#mainNav").height() + "px");
    //$("#mainNav").css( "left" ,  $("#sidebar-wrapper").width()+ "px" );
}

Date.locale = {
    en: {
       month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
       month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
}

//----------------------------------------------------------------------------
// Excuse chrome.storage.sync data  start 
//----------------------------------------------------------------------------
var todo_obj;
var ChromeStorageObj = {
    addStorage : function ( add_message ){
        
        var nowdate = new Date();
        var dataStr = nowdate.getFullYear() + "-" + (nowdate.getMonth()+1) + "-" + nowdate.getDate();

        if($("#hid_todo").val() == ''){
            var notreadymill = (new Date().getTime()) + "" +  (new Date().getMilliseconds());
            console.log('null --> ' + notreadymill  );
            ChromeStorageObj.getStorage();
            return;
        }else{
            todo_obj =  JSON.parse( $("#hid_todo").val());
        }
        console.log(todo_obj);
        var todoitem = {
            "todoitem" : add_message,
            "regdate" : dataStr
        }
        todo_obj.push(todoitem);
    
        chrome.storage.sync.set({'value1': JSON.stringify(todo_obj)}, function() {
            console.log('successed!' + JSON.stringify(todo_obj));
        });
    
        ChromeStorageObj.getStorage();
        $("#todolistInputform").removeClass('active');
    },
    getStorage : function (){
        chrome.storage.sync.get(['value1'], function(result) {
            $("#hid_todo").val('');
            todo_obj = JSON.parse(result.value1);
            $("#hid_todo").val(result.value1);
            console.log( JSON.parse( $("#hid_todo").val()));
            $("#chromeTodoList").empty();
            ChromeStorageObj.renderChromeStorageData();
        });
    }
    ,
    renderChromeStorageData : function (){
        var ChromeStorageDt = $("#hid_todo").val();
        if(ChromeStorageDt == "" || ChromeStorageDt == undefined){
            return;
        }
        var ChromeStorageDtObj = JSON.parse(ChromeStorageDt);
        var renderHtml = "";
        var chromeStorageIndex = 0;
        ChromeStorageDtObj.forEach(chromestorageItem => {
            
            renderHtml += "<div class='au-task__item au-task__item--danger'>"
                +   " <div class='au-task__item-inner'>"
                +    "  <h6>" + (chromeStorageIndex + 1) + "</h6>"
                +    "  <h5 class='task'>"
                +     "   <a href='#'>" + chromestorageItem.todoitem + "</a>"
                +     " </h5>"
                +     " <span class='time'>10:00 AM</span>"
                +    "</div>"
                +  "</div>"
                chromeStorageIndex ++;     
        });
        $("#chromeTodoList").append(renderHtml);
    }


}

//----------------------------------------------------------------------------
// Excuse chrome.storage.sync data  start  End 
//----------------------------------------------------------------------------


function GetNYpd(){
        // Built by LucyBot. www.lucybot.com
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
            'api-key': "7778a6357a37473a84802d825dae0d3e"
        });
        $.ajax({
            url: url,
            method: 'GET',
        }).done(function(result) {
            
        }).fail(function(err) {
            throw err;
        });
}

var GetImageXmlUrl = 'https://d3cbihxaqsuq0s.cloudfront.net/';

function loadDoc() {
    var req = new XMLHttpRequest();
    //req.responseType = 'json';
    req.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) { 
            ChangeBackImage(this.responseXML);
       }
    };
    req.open("GET", GetImageXmlUrl , true);
    req.send();
  }

  function ChangeBackImage(xml) {
    var backImageItemjson = xmlToJson(xml);
    
    var $Content = backImageItemjson.ListBucketResult.Contents;
    
    var ContentIndex = Math.floor(Math.random() * $Content.length) + 1  
    var imagePath =  GetImageXmlUrl +  $Content[ContentIndex].Key['#text'];
    
    var cookiebackgroundImage = getCookie("backgroundImage");
   
    if(cookiebackgroundImage == "true"){
        imagePath = './img/17935469_xl.jpg'
    }
    //document.getElementById('mainContent').style.backgroundImage = "url('" + imagePath + "')";
    //document.getElementById('masthead').style.backgroundImage = "url('" + imagePath + "')";
    
  }


  function xmlToJson(xml) {
	// Create the return object
	var obj = {};
	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};


function getCookie(cname) {
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
}

var countDownDateForOffWork = new Date(
            new Date().getFullYear() , 
            new Date().getMonth() ,
            new Date().getDate() , 
            "18","0","0","0"
    ).getTime();


var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();
    
    // Find the distance between now and the count down date
    var distance =  countDownDateForOffWork - now  ;
  
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    // Display the result in the element with id="demo"
    $("#now_timer").empty();
    if(new Date().getHours() < 9 ){
        clearInterval(x);
        $("#now_timer").append("It's not work time NOW");
    }else 
    // If the count down is finished, write some text 
    if (distance < 0) {
      clearInterval(x);
      $("#now_timer").append("Let's Call it a day!!!");
      
    }else{
        $("#now_timer").append(hours + "h "+ minutes + "m " + seconds + "s ")
    }
  }, 1000);