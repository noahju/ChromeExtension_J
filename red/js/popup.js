$(document).ready(function () {
    //loadDoc();

    //toggle menu
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    $("#main-page-show").click(function(e){
        e.preventDefault();
        $("#main_page").toggleClass("active_hide");
        
    });

    // $("#todo_list_date").append(
    //     new Date().getDate() + " " +
    //     Date.locale.en.month_names[new Date().getMonth()] + " " +
    //     new Date().getFullYear()
    // )

    //search Event 
    $("#pills-tab li a").click(function () {
        $("#pills-tab li").find(".active").removeClass("active");
        $(this).addClass("active");
    });


    ChromeStorageObj.getStorage();
    // chrome - storage 
    $("#s_storagebtn").click(function () {
        var storageText = $("#s_storage").val();
        ChromeStorageObj.addStorage(storageText);
        $("#s_storage").val("");
        $("#todolistInputform").toggle("active");
    });

    $("#g_storagebtn").click(function () {
        ChromeStorageObj.getStorage();
    });

    $("#todoListAddBtn").click(function () {
        $("#todolistInputform").toggle("active");
    });

    /// ■ ■ ■----------------------
    /// serach site 
    /// ■ ■ ■----------------------
    $("#s_search").on("keypress", function (e) {
        if (e.keyCode == 13) {
            $("#t_search").click();
        }
    });

    /// ■ ■ ■----------------------
    /// serach site button click event 
    /// ■ ■ ■----------------------
    $("#t_search").click(item => {
        var sUrl = "";
        var s_text = $("#s_search").val();

        var s_site = $("#pills-tab li").find(".active").text();
        if (s_site == "Google") {
            sUrl = 'https://www.google.com.tw/search?q=' + s_text;
        } else if (s_site == "Baidu") {
            sUrl = 'https://www.baidu.com/s?ie=UTF-8&wd=' + s_text;
        } else if (s_site == "naver") {
            sUrl = 'https://search.naver.com/search.naver?query=' + s_text;
        }
        openUrlCurrentTab(sUrl);
    });



    $("#btnAddNavi").click(function () {
        var nav_name = $("#nav_name").val();
        var nav_url = $("#nav_url").val();
        if(nav_name == '' || nav_url == '' ){
            alert('return ');
            return ;
        }
        var navigationData = {
            title : nav_name, 
            url : nav_url , 
            regdate : countDownDateForOffWork,
            uptdate : countDownDateForOffWork,
            auth : 'noah' 
        }
        var pouchdb = new POUCHBD_DAC('1');
        pouchdb.INSERT_DATA(navigationData);
        // NAVI_OBJ.SetNaviItem(nav_name, nav_url);
        // NAVI_OBJ.GetNaviList();
    });

    $(".chrome_menu_btn button").click(function(e){
        console.log($(this).index());
        switch ($(this).index()){
            case 0 : 
                openUrlCurrentTab('chrome://extensions/');
                break;
            case 1 :
                openUrlCurrentTab('chrome://downloads');
                break;
            case 2 : 
                openUrlCurrentTab('chrome://history');
                break;
            case 3 :
                openUrlCurrentTab('chrome://settings');
                break;
            default:
                openUrlCurrentTab('chrome://settings');
                break;
                break;
        }
    })

    // ■ ■ ■----------------------
    ///set checkbox for backgroundimage 
    // ■ ■ ■----------------------
    var holdimagecookie = C_COOKIE.getCookie("HOLD_IMAGE");
    console.log("holdimagecookie : " + holdimagecookie);
    if(holdimagecookie != ""){
        $("#holdImage").attr('checked', true);
    }else{
        $("#holdImage").attr('checked', false);
    }

});

window.onload = function () {

    var mytap = new MYTAP();
    
    $("#main-page-refresh").click(function(){
        mytap.my_refreshBackgroundImage();
    });

    // ■ ■ ■----------------------
    // Get Movie
    // ■ ■ ■----------------------
    //var movie = new MOVIE();
    // ■ ■ ■----------------------


    // ■ ■ ■----------------------
    //Get Storage Data
    // ■ ■ ■----------------------
    ChromeStorageObj.getStorage();
   
    // ■ ■ ■----------------------
    //Get navi Data
    // ■ ■ ■----------------------
    var pouchdb = new POUCHBD_DAC('1');
    pouchdb.GETALLDOC();


    $(".sidebar-nav").css('top', $("#mainNav").height() + "px");
    
    // update status to True 
    $(document).on('click', '#todoTemplate .au-checkbox input[type=checkbox]', function (e) {
        //console.log( $(this) );
        var valuetest = $(this).val();
        console.log("valuetest : " + valuetest);

        todo_obj = JSON.parse($("#hid_todo").val());
        var testobj = ChromeStorageObj.getObjects(todo_obj, "todoId", valuetest);
        

        var uptobj = JSON.parse( $("#hid_todo").val());
        console.log(uptobj);
        var i = uptobj.length;
        while (i--) {
            if (valuetest.indexOf(uptobj[i].todoId) != -1) {
                uptobj[i].status = !testobj[0].status
            }
        }
        ChromeStorageObj.saveItem(uptobj);
        ChromeStorageObj.getStorage();
    });

    // 
    $(document).on("click", "#todoTemplate button", function (e) {
        var valuetest = $(this).val();
        todo_obj = JSON.parse($("#hid_todo").val());
        var testobj = ChromeStorageObj.getObjects(todo_obj, "todoId", valuetest);
        console.log(testobj);
        $("#del_id").empty();
        $("#del_todo").empty();
        $("#del_regdate").empty();

        $("#del_id").val(testobj[0].todoId);
        $("#del_todo").val(testobj[0].todoitem);
        $("#del_regdate").val(testobj[0].regdate);
    });

    $(document).on("click", "#del_delete", function () {
        console.log($("#del_id").val());
        var del_id = $("#del_id").val();

        var delhidvalue = $("#hid_todo").val();

        var delobj = JSON.parse(delhidvalue);
        //delete incorrect item 

        var i = delobj.length;
        var data1 = [del_id];
        while (i--) {
            if (data1.indexOf(delobj[i].todoId) != -1) {
                delobj.splice(i, 1);
            }
        }

        ChromeStorageObj.saveItem(delobj);
        $("#exampleModal").modal('hide');
    });

    $(document).on("click", "#del_Update", function () {
        console.log($("#del_id").val());
        var upt_id = $("#del_id").val();
        var upt_todoitem = $("#del_todo").val();
        var upthidvalue = $("#hid_todo").val();
        var uptobj = JSON.parse(upthidvalue);
        var i = uptobj.length;
        var data1 = [upt_id];
        while (i--) {
            if (data1.indexOf(uptobj[i].todoId) != -1) {
                uptobj[i].todoitem = upt_todoitem;
            }
        }
        ChromeStorageObj.saveItem(uptobj);
        $("#exampleModal").modal('hide');
    });
    
    //test for vue 
    $(document).on("click" , "#vuejstestbtn" , function(){
        //alert(1)
        openUrlCurrentTab('localhost:8080');
    });

    // ■ ■ ■----------------------
    //hold background iamge 
    // ■ ■ ■----------------------
    $holdImage = $("#holdImage");
    $(document).on("click" , "#holdImage" , function(){
        var holdimagecookie = C_COOKIE.getCookie("HOLD_IMAGE");
        if(holdimagecookie == "" ){
            var background_image = $("body").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
            C_COOKIE.setCookie("HOLD_IMAGE" , background_image, 8 );    
        }else{
            C_COOKIE.deleteCookie("HOLD_IMAGE");
        }  
        $(".alert-msg").text("ublic int ImageBuilder_Manage_Update()!");
        $("#alert-warn").toggle("show");
        setTimeout(() => {
            $("#alert-warn").toggle("show");
        }, 1000);
    });
    //취소 처리 chrome storage to pouch db ( locastorage db )
    //NAVI_OBJ.GetNaviList();
    
    //set auto focus to search Input 
    setFocus()
    

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
    addStorage: function (add_message) {

        var nowdate = new Date();
        var dataStr = nowdate.getFullYear() + "-" + (nowdate.getMonth() + 1) + "-" + nowdate.getDate();

        if ($("#hid_todo").val() == '') {
            var notreadymill = (new Date().getTime()) + "" + (new Date().getMilliseconds());
            console.log('null --> ' + notreadymill);
            ChromeStorageObj.getStorage();
            return;
        } else {
            console.log($("#hid_todo").val());
            todo_obj = JSON.parse($("#hid_todo").val());
            console.log(todo_obj);
        }
        var todoId = ChromeStorageObj.generateKEy(26);

        var todoitem = {
            "todoId": todoId,
            "todoitem": add_message,
            "regdate": dataStr,
            "uptdate" : dataStr,
            "status": false
        }
        todo_obj.push(todoitem);

        chrome.storage.sync.set({
            'todolist': JSON.stringify(todo_obj)
        }, function () {
            //console.log('successed!' + JSON.stringify(todo_obj));
        });

        ChromeStorageObj.getStorage();
        $("#todolistInputform").removeClass('active');
    },
    getStorage: function () {
        chrome.storage.sync.get(['todolist'], function (result) {
            $("#hid_todo").val('');

            if (result.todolist == undefined) {
                var temptodoitem = [{
                    "origin": "1"
                }]
                $("#hid_todo").val(JSON.stringify(temptodoitem));
            } else {
                todo_obj = JSON.parse(result.todolist);
                $("#hid_todo").val(result.todolist);
                $("#chromeTodoList").empty();
                ChromeStorageObj.RenderHtmlByTemplate();
            }
        });
    },
    generateKEy: function (keylength) {
        var ret = "";
        while (ret.length < keylength) {
            ret += Math.random().toString(16).substring(2);
        }
        return ret.substring(0, keylength);
    },
    RenderHtmlByTemplate: function () {
        //var todo_list =  JSON.parse( $("#hid_todo").val());
        var ChromeStorageDt = $("#hid_todo").val();
        if (ChromeStorageDt == "" || ChromeStorageDt == undefined) {
            return;
        }
        var ChromeStorageDtObj = JSON.parse(ChromeStorageDt);
        //delete incorrect item 

        var i = ChromeStorageDtObj.length;
        var deldata = ["todoId"];
        while (i--) {
            if (ChromeStorageDtObj[i].origin == "1") {
                //console.log(1);
                ChromeStorageDtObj.splice(i, 1);
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
            url: geturl__,
            dataType: "html",
            success: function (res) {
                markup = res
            },
            complete: function () {
                $.template("todolistTemplate", markup);
                // Render the template with the movies data and insert
                // the rendered HTML under the "movieList" element
                $("#todoTemplate").empty();
                $.tmpl("todolistTemplate", ChromeStorageDtObj).appendTo("#todoTemplate");
            }
        })
        // var markup = "<li><b>${Name}</b> (${ReleaseYear})</li>";
        // Compile the markup as a named template
    },
    getObjects: function (obj, key, val) {
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(ChromeStorageObj.getObjects(obj[i], key, val));
            } else if (i == key && obj[key] == val) {
                objects.push(obj);
            }
        }
        return objects;
    },
    saveItem: function (s_obj) {
        chrome.storage.sync.set({
            'todolist': JSON.stringify(s_obj)
        }, function () {
            //console.log('successed!' + JSON.stringify(s_obj));
        });

        ChromeStorageObj.getStorage();
    }
}

///---------------------------------------------------
/// Set timer  start 
///---------------------------------------------------
var countDownDateForOffWork = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    "18", "0", "0", "0"
).getTime();


var x = setInterval(function () {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDateForOffWork - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    $("#now_timer").empty();
    if (new Date().getHours() < 9) {
        clearInterval(x);
        $("#now_timer").append("It's not work time NOW");
        $("#warningOffwork").toggle("active");
        $("#warningOffwork").append('Good day Today!!!')
    } else
        // If the count down is finished, write some text 
        if (distance < 0) {
            clearInterval(x);
            $("#now_timer").append("Let's Call it a day!!!");
            $("#warningOffwork").toggle("active");
            $("#warningOffwork").append('Go Home and get Some food with honey!')
        } else {
            $("#now_timer").append(hours + "h " + minutes + "m " + seconds + "s ")
        }
}, 1000);

///---------------------------------------------------
/// Set timer  End 
///---------------------------------------------------



///---------------------------------------------------
/// Set News  start 
///---------------------------------------------------

function renderingNews(newsObj) {
    //html template
    var getnewsurl__ = chrome.extension.getURL("news.html");
    var newsmarkup = '';

    $.ajax({
        url: getnewsurl__,
        dataType: "html",
        success: function (res) {
            newsmarkup = res
        },
        complete: function () {
            $.template("newsTemplate", newsmarkup);
            // Render the template with the movies data and insert
            // the rendered HTML under the "movieList" element
            $("#brights").empty();
            $.tmpl("newsTemplate", newsObj).appendTo("#brights");
        }
    })
}




///---------------------------------------------------
/// Set News  End 
///---------------------------------------------------

///---------------------------------------------------
/// Get Cookie 
///---------------------------------------------------
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
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


///---------------------------------------------------
//Get data from clien webSite 
///---------------------------------------------------
function GetHtmlforClien(){
    var clienUrl = "https://www.clien.net/service/search?q=%EC%9E%90%EC%A0%84%EA%B1%B0";
    var clienmarkup = ''
    var req = new XMLHttpRequest();
    req.onreadystatechange=function(){
        if (this.readyState == 4 && this.status == 200) {
            clienmarkup = this.responseText
            ReadClien(clienmarkup);
         }
    };
    req.open("GET", clienUrl, true);
    req.send();
}
function ReadClien(clien_html){
    console.log(clien_html);
    console.log( clien_html.find('.search_list').text());
}

///---------------------------------------------------
// logging  json object 
///---------------------------------------------------
function processNode(node) {
    // recursively process child nodes
    if(node.children) {
        node.children.forEach(function (child) {
            processNode(child);
        });
    }
    // print leaf nodes URLs to console
    if(node.url) { 
        //console.log("nodeid : " + node.id   + " / " + node.parentId + " / " + node.title  + "/" + node.url); 
    }
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



///---------------------------------------------------
/// Get news OBJECT 
///---------------------------------------------------
var NEWS_DATA = {
    ///---------------------------------------------------
    /// Get news washingtonpost
    ///---------------------------------------------------
    GetNewsData : function () {
        var n_obj = ''
        var Url = "https://api.washingtonpost.com/rainbow-tv/brights/";
        $.ajax({
            url: Url,
            dataType: "json",
            success: function (res) {
                n_obj = res.brights
            },
            complete: function () {
                ///var entry = n_obj[Math.floor(Math.random()*n_obj.length)];
                renderingNews(n_obj);
            }
        });
    },
    ///---------------------------------------------------
    /// Get newyork times news 
    ///---------------------------------------------------
    GetNYpd :  function () {
        // Built by LucyBot. www.lucybot.com
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
            'api-key': "7778a6357a37473a84802d825dae0d3e"
        });
        $.ajax({
            url: url,
            method: 'GET',
        }).done(function (result) {
            //console.log(JSON.stringify( result.response.docs))
        }).fail(function (err) {
            throw err;
        });
    }
}


///---------------------------------------------------
/// document loading status  test 
///---------------------------------------------------
document.onreadystatechange = function () {
    // if(document.readyState == "complete") {
    //     //alert("OK!");
    //     //$("#loading").empty();
    // }
    switch (document.readyState) {
        case "loading":
          // The document is still loading.
            //console.log("loading");
            break;
        case "interactive":
          // The document has finished loading. We can now access the DOM elements.
          // But sub-resources such as images, stylesheets and frames are still loading.
        //   var span = document.createElement("span");
        //   span.textContent = "A <span> element.";
        //   document.body.appendChild(span);
            //console.log("interactive");
            break;
        case "complete":
          // The page is fully loaded.
            //console.log("conplete");
            //console.log("The first CSS rule is: " + document.styleSheets[0].cssRules[0].cssText);
            break;
      }
}
function setFocus(){
    $("#s_search").focus();
}

//https://goo.gl/7mznDM
