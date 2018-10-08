$(document).ready(function(){
     // Get data Sample
     $("#SearchBtn").click(function(){
       /// read File From local
       Alert.readTextFile();
       Alert.getdata();
    });

    // select Event
    $('.tabs-lee li').click(function(e){
        $(this).parent().find('li').find('a').removeClass('active');
        $(this).find('a').addClass('active');

        $(".dvactive").removeClass('dvactive').addClass('dvhide');
        var $seq = $(this).find('a').attr('seq');

        $("#contentPage > div").eq($seq).removeClass("dvhide").addClass("dvactive");
        //$showdv.removeClass('dvactive').addClass('dvhide');
//        $hidedv.
        if($seq == 2){
            $("#editList li").remove();
            Alert.getEditData();
        }
    });
    // alert excuse
    $(document).on("click" , '#resultList li' , function(e){
        Alert.excuseCopy($(this));
    });
    //alert hide
    $(document).on("click" , '#alertmessage' , function(){
        $('#alert').hide();
    });

    $(document).on('click', '.btn-delete-lee', function(){
      var DelSeq = $(this).attr("seq");
      Alert.info('Item '+ DelSeq + ' will Delete !')
    });

    $(document).on('click', '#editList .modalbtn' , function(){

      $(".modal-body").empty();
         var Seq = $(this).data('id');
         var EditData = JSON.parse( $("#textSection").text());
        var filter_json = Alert.find_in_object(EditData.list, { 'index' : Seq});
        if(filter_json != null ){
          $(".modal-body p").append(filter_json[0].description);
        }else{

          $(".modal-body p").append('no data');
        }


    });



    var $create = $("#create"),
      $textbox = $("#textbox");

    $("#create").click(function () {
      var link = document.getElementById('downloadlink');
      link.href = Alert.makeTextFile($textbox.val());
      link.style.display = 'block';
    });


});


Alert = {
    textFile : null,
    readTextFile : function()
    {
        var file = "file:///D:/sample_lee.json"
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    $("#textSection").empty();
                    $("#textSection").append(allText);
                }
            }
        }
        rawFile.send(null);
    },
    excuseCopy: function(obj){
        obj.parent().find('li').removeClass('active');
        obj.addClass('active');
        this.copyToClipboard($(this).text())
        Alert.info('this item has copied !!!');
    },
    show: function($div , msg){
        $div.find(".alert-msg").text(msg);
        if($div.css('display')==="none"){
            $div.fadeIn(200).delay(200).fadeOut(200);
        }
    },
    info : function(msg){
        this.show($("#alert-info"), msg);
    },
    warn: function(msg) {
        this.show($('#alert-warn'), msg);
    },
    getdata : function(){

        var rtdata = JSON.parse( $("#textSection").text());
        if (rtdata == null ) {
          this.info("No Data @ ")
        }
        var $searchForLee = $("#searchForLee");
        $("#resultList li").remove();
        var searchItem = [];
        if ( $searchForLee.val() == ""){
              searchItem = rtdata.list;
        }else{
                $.each(rtdata.list, function (index, value) {
                   if(value.description.indexOf($searchForLee.val()) > -1){
                      searchItem.push(value);
                   }
                });
        }
        this.renderHTML($("#resultList") , searchItem);
    },
    renderHTML:function( $liobj , obj){

        $.each(obj, function(index , value){
            if(value.isDelete == false){
              $liobj.append("<li class='list-group-item media'>"
                                     + "<div class='mr-3'><span class='badge badge-pill badge-info right'>" + value.index + "</span></div>"
                                     +  "<div class='description media-body'>" +  value.description
                                     +  "</div>"
                                     +  "<button type='button' class='btn btn-outline-danger btn-delete-lee' seq='" + value.index + "'>"
                                     +  "Delete"
                                     +  "</button>"
                                     +  "<button type='button' class='btn btn-form modalbtn' data-id='" + value.index + "'   data-toggle='modal' data-target='#myModal'>"
                                     +  "Edit"
                                     +  "</button>"
                                     + "</li>");
            }
        });
    },
    copyToClipboard : function(text){
        const input = document.createElement('input');
        input.style.position = 'fixed';
        input.style.opacity = 0;
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('Copy');
        document.body.removeChild(input);
    },
    ///make data file
    makeTextFile : function (text) {
      if(text == ""){
        this.warn('Please insert Comment');
        return;
      }
      this.readTextFile();
      var jsonObj = $("#textSection").text();
      var obj = JSON.parse(jsonObj);

      obj.list.push({
        "description" : text
      });
      var newObjText = JSON.stringify(obj);
      var data = new Blob([newObjText], {type: 'text/plain'});
        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        if (this.textFile !== null) {
          window.URL.revokeObjectURL(this.textFile);
        }
        this.textFile = window.URL.createObjectURL(data);
        return this.textFile;
    },
    getEditData:function(){
        this.readTextFile();
        var rtdata = JSON.parse( $("#textSection").text());
        if (rtdata == null ) {
          this.info("No Data @ ");
        }
        this.renderHTML($("#editList") , rtdata.list);
    },
    find_in_object: function (my_object, my_criteria){
      return my_object.filter(function(obj) {
        return Object.keys(my_criteria).every(function(c) {
          return obj[c] == my_criteria[c];
        });
      });
    }
}
