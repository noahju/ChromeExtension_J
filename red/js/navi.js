$(document).ready(function(){
    // nav_edit_btn click 
    $("#btnAddNavi").click(function(){
        var nav_name =  $("#nav_name").val();
        var nav_url  =  $("#nav_url").val();
        
        NAVI_OBJ.SetNaviItem( nav_name , nav_url );
        NAVI_OBJ.GetNaviList();
        
    });
    
});

window.onload= function(){
    NAVI_OBJ.GetNaviList();
}

var NAVI_OBJ = {
    
    _nav_obj_list : '',
    GetNaviList : function(){
        chrome.storage.sync.get(['navi'], function(result) {
            $("#naviTemp").val('');
            
            if(result == undefined){
                var NaviItem = [
                    {
                        "origin": "1"
                    }
                ]
              
                $("#naviTemp").val( JSON.stringify( NaviItem));
                NAVI_OBJ.RenderHTmlNav();
            }else{
                $("#naviTemp").val( result.navi  );
               NAVI_OBJ.RenderHTmlNav();
            }
        });
        
    },
    SetNaviItem: function(NAVI_NAME , NAVI_URL){
        
        if($("#naviTemp").val() == ''){
            
            alert('$NAVITEMP is null');
            return;
        }
        NAVI_OBJ._nav_obj_list = JSON.parse($("#naviTemp").val());

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
            console.log('successed!' + JSON.stringify(NAVI_OBJ._nav_obj_list));
        });
        NAVI_OBJ.GetNaviList();
    },
    
    GetNaviItem : function(){

    },
    RenderHTmlNav:function(){
        var _naviobjtemp  = JSON.parse($("#naviTemp").val()) ;
        
        var naviUrl = chrome.extension.getURL("navi.html");
        var naviMarkup = ''
        $.ajax({
            url: naviUrl ,
            dataType: "html",
            success: function(res){
                naviMarkup = res
            },
            complete: function(){
                $.template( "naviTemplate", naviMarkup );
             // Render the template with the movies data and insert
             // the rendered HTML under the "movieList" element
             $("#naviTemplateArea").empty();
             $.tmpl( "naviTemplate", _naviobjtemp ).appendTo( "#naviTemplateArea" );
            }
        })
              
    }
}

var COMMON_DATE = new Date();
var COMMON_NOW_DATE = COMMON_DATE.getFullYear() + "-" + (COMMON_DATE.getMonth()+1) + "-" + COMMON_DATE.getDate();