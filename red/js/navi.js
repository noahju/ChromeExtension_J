$(document).ready(function(){
    // nav_edit_btn click 
    $("#btnAddNavi").click(function(){
        var nav_name =  $("#nav_name").val();
        var nav_url  =  $("nav_url").val();

        NAVI_OBJ.SetNaviItem( nav_name , nav_url );
        NAVI_OBJ.GetNaviList();
        
    });
    var $test = $("#naviTemp");
    console.log($test);
    console.log(NAVI_OBJ.$NAVITEMP);
});









var NAVI_OBJ = {
    $NAVITEMP : $("#naviTemp"),
    _nav_obj_list : '',
    GetNaviList : function(){
        chrome.storage.sync.get(['navi'], function(result) {
            NAVI_OBJ.$NAVITEMP.val('');
            
            if(result.NaviItem == undefined){
                var NaviItem = [
                    {
                        "origin": "1"
                    }
                ]
                NAVI_OBJ.$NAVITEMP.val( JSON.stringify( NaviItem));
                console.log(JSON.stringify( NaviItem));
                console.log(NAVI_OBJ.$NAVITEMP);
            }else{
                NAVI_OBJ.$NAVITEMP.val(result.todolist);
                console.log(2);
            }
        });
        console.log("GetnaviLIst : " + NAVI_OBJ.$NAVITEMP.val() );
    },
    SetNaviItem: function(NAVI_NAME , NAVI_URL){
        
        if(NAVI_OBJ.$NAVITEMP.val() == ''){
            console.log('$NAVITEMP is null');
            alert('$NAVITEMP is null');
            return;
        }
        NAVI_OBJ._nav_obj_list = JSON.parse(NAVI_OBJ.$NAVITEMP.val());

        var NAVI_ID = ChromeStorageObj.generateKEy(26);
        var NAVI_ITEM ={
            "NavId" : NAVI_ID,
            "NaviName" : NAVI_NAME,
            "NaviUrl" : NAVI_URL,
            "RegDate" : COMMON_NOW_DATE,
            "Status" : false
        }
        NAVI_OBJ._nav_obj_list.push(NAVI_ITEM);

        chrome.storage.sync.set({'navi': JSON.stringify(NAVI_OBJ._nav_obj_list)}, function() {
            //console.log('successed!' + JSON.stringify(todo_obj));
        });
        NAVI_OBJ.GetNaviList();
    },
    GetNaviItem : function(){

    }
}

var COMMON_DATE = new Date();
var COMMON_NOW_DATE = COMMON_DATE.getFullYear() + "-" + (COMMON_DATE.getMonth()+1) + "-" + COMMON_DATE.getDate();