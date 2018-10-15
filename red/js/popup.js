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
        ChromeStorageObj.addStorage(storageText);
        $("#s_storage").val("");
        $("#todolistInputform").toggle("active");
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

     $(document).on('click','#todoTemplate .au-checkbox input[type=checkbox]', function(e) {
        //console.log( $(this) );
        var valuetest =  $(this).val();
        console.log(valuetest);

         todo_obj =  JSON.parse( $("#hid_todo").val());
         var testobj =  ChromeStorageObj.getObjects(todo_obj , "todoId" , valuetest);
         console.log(testobj);  
     });
     ChromeStorageObj.getStorage();


     
    $(document).on("click" , "#todoTemplate button" , function(e){
        var valuetest =  $(this).val();
         todo_obj =  JSON.parse( $("#hid_todo").val());
         var testobj =  ChromeStorageObj.getObjects(todo_obj , "todoId" , valuetest);
         console.log(testobj);
         $("#del_id").empty();
         $("#del_todo").empty();
         $("#del_regdate").empty();

         $("#del_id").val(testobj[0].todoId);
         $("#del_todo").val(testobj[0].todoitem);
         $("#del_regdate").val(testobj[0].regdate);
    });

    $(document).on("click" ,"#del_delete" , function(){
        console.log($("#del_id").val());
        var del_id = $("#del_id").val();

        var delhidvalue = $("#hid_todo").val();
       
        var delobj = JSON.parse(delhidvalue);
        //delete incorrect item 

        var i =  delobj.length;
        var data1 = [ del_id ];
        while  (i--){
            if(data1.indexOf(delobj[i].todoId)!=-1){
                delobj.splice(i,1);
            }
        }

        ChromeStorageObj.saveItem(delobj);
        $("#exampleModal").modal('hide');
    });

    $(document).on("click" , "#del_Update" , function(){
        console.log($("#del_id").val());
        var upt_id = $("#del_id").val();
        var upt_todoitem = $("#del_todo").val();
        var upthidvalue = $("#hid_todo").val();
        var uptobj = JSON.parse(upthidvalue);
        var i = uptobj.length;
        var data1 = [ upt_id ];
        while  (i--){
            if(data1.indexOf(uptobj[i].todoId)!=-1){
                uptobj[i].todoitem = upt_todoitem;
            }
        }
        ChromeStorageObj.saveItem(uptobj);
        $("#exampleModal").modal('hide');
    });



    GetNewsData();
    GetNYpd();
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
            console.log($("#hid_todo").val());
            todo_obj =  JSON.parse( $("#hid_todo").val());
            console.log(todo_obj);
        }
        var todoId = ChromeStorageObj.generateKEy(26);

        var todoitem = {
            "todoId" : todoId, 
            "todoitem" : add_message,
            "regdate" : dataStr,
            "status" : false
        }
        todo_obj.push(todoitem);
    
        chrome.storage.sync.set({'todolist': JSON.stringify(todo_obj)}, function() {
            //console.log('successed!' + JSON.stringify(todo_obj));
        });
    
        ChromeStorageObj.getStorage();
        $("#todolistInputform").removeClass('active');
    },
    getStorage : function (){
        chrome.storage.sync.get(['todolist'], function(result) {
            $("#hid_todo").val('');
            
            if(result.todolist == undefined){
                var temptodoitem = [
                    {
                        "origin": "1"
                    }
                ]
                console.log(JSON.stringify(temptodoitem)) ;
                $("#hid_todo").val( JSON.stringify( temptodoitem));
            }else{
                todo_obj = JSON.parse(result.todolist);
            
                $("#hid_todo").val(result.todolist);
                console.log( JSON.parse( $("#hid_todo").val()));
                $("#chromeTodoList").empty();
                
                ChromeStorageObj.RenderHtmlByTemplate();
                
            }
        });
    },
    generateKEy:function( keylength ){
        var ret = "";
        while (ret.length < keylength) {
          ret += Math.random().toString(16).substring(2);
        }
        return ret.substring(0,keylength);
    },
    RenderHtmlByTemplate: function(){
        //var todo_list =  JSON.parse( $("#hid_todo").val());
        var ChromeStorageDt = $("#hid_todo").val();
        if(ChromeStorageDt == "" || ChromeStorageDt == undefined){
            return;
        }
        var ChromeStorageDtObj = JSON.parse(ChromeStorageDt);
        //delete incorrect item 

        var i =  ChromeStorageDtObj.length;
        var deldata = ["todoId"];
        while  (i--){
            if(ChromeStorageDtObj[i].origin == "1"
            ){
                console.log(1);
                ChromeStorageDtObj.splice(i,1);
            }
        }


        //html template
        var geturl__ = chrome.extension.getURL("todolist.html");
        var markup = '';
        // $.get( geturl__ , function( data ) {
        //     //console.log(data);     
        //     markup = data;
        // });
        $.ajax({
            url : geturl__,
            dataType: "html",
            success : function(res){
                markup = res
            },
            complete : function(){
                $.template( "todolistTemplate", markup );
                // Render the template with the movies data and insert
                // the rendered HTML under the "movieList" element
                $("#todoTemplate").empty();
                $.tmpl( "todolistTemplate", ChromeStorageDtObj ).appendTo( "#todoTemplate" );
            }
        })
        // var markup = "<li><b>${Name}</b> (${ReleaseYear})</li>";
        // Compile the markup as a named template
    },
    getObjects : function (obj, key, val) {
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat( ChromeStorageObj.getObjects(obj[i], key, val));
            } else if (i == key && obj[key] == val) {
                objects.push(obj);
            }
        }
        return objects;
    },
    saveItem: function(s_obj){
        chrome.storage.sync.set({'todolist': JSON.stringify(s_obj)}, function() {
            console.log('successed!' + JSON.stringify(s_obj));
        });
    
        ChromeStorageObj.getStorage();

    }
}

//----------------------------------------------------------------------------
// Excuse chrome.storage.sync data  start  End 
//----------------------------------------------------------------------------




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
        imagePath = './img/53679405_xl.jpg'
    }
    //For test
    //imagePath = 'https://d3cbihxaqsuq0s.cloudfront.net/images/48244404_xl.jpg'

    //document.getElementById('mainContent').style.backgroundImage = "url('" + imagePath + "')";
    document.getElementById('masthead').style.backgroundImage = "url('" + imagePath + "')";
    
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
        $("#warningOffwork").toggle("active");
        $("#warningOffwork").append('Good day Today!!!')
    }else 
    // If the count down is finished, write some text 
    if (distance < 0) {
      clearInterval(x);
      $("#now_timer").append("Let's Call it a day!!!");
      $("#warningOffwork").toggle("active");
      $("#warningOffwork").append('Go Home and get Some food with honey!')
    }else{
        $("#now_timer").append(hours + "h "+ minutes + "m " + seconds + "s ")
    }
  }, 1000);




    
  function renderingNews(newsObj){  
    //html template
     var getnewsurl__ = chrome.extension.getURL("news.html");
     var newsmarkup = '';
     
     $.ajax({
         url : getnewsurl__,
         dataType: "html",
         success : function(res){
            newsmarkup = res
         },
         complete : function(){
             $.template( "newsTemplate", newsmarkup );
             // Render the template with the movies data and insert
             // the rendered HTML under the "movieList" element
             $("#brights").empty();
             $.tmpl( "newsTemplate", newsObj ).appendTo( "#brights" );
         }
     })    
  }

  function GetNewsData(){
    var n_obj = ''
    var Url = "https://api.washingtonpost.com/rainbow-tv/brights/";
    $.ajax({
        url : Url,
        dataType: "json",
        success : function(res){
            n_obj = res.brights
        },
        complete : function(){

            ///var entry = n_obj[Math.floor(Math.random()*n_obj.length)];
            renderingNews(n_obj);
        }
    });
  }
  
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
        console.log(JSON.stringify( result.response.docs))
    }).fail(function(err) {
        throw err;
    });
}
  