var MYTAP = function(){
    this.GetImageXmlUrl = 'https://d3cbihxaqsuq0s.cloudfront.net/';
    this.init();
}

MYTAP.prototype.init = function(){
    this.my_backgoundImage();
    
}
MYTAP.prototype.my_backgoundImage = function(  ){

    var callback = this.my_backgroundImageRandom;
    var imagepath = this.GetImageXmlUrl;
    if ( !window.XMLHttpRequest ) return;

    var xhr = new XMLHttpRequest();
	xhr.onload = function() {
		if ( callback && typeof( callback ) === 'function' ) {
            var backimagePath = imagepath +  callback( this.responseXML );
            //document.getElementById('masthead').style.backgroundImage = "url('" + backimagePath + "')";
            // $('body').css({background : 'url(' + backimagePath + ')  no-repeat fixed bottom left'})
            //     .waitForImages(function() {
            //             alert('Background image done loading');
            //             // This *does* work
            //     }, $.noop, true);
                // $('<img/>').attr('src', backimagePath).on('load', function() {
                //     $(this).remove(); // prevent memory leaks as @benweet suggested
                //     $('body').css('background-image', 'url('+backimagePath+')');
                // });
                loadImage(backimagePath);
                //http://jsfiddle.net/gaby/CYFNc/2/


		}
	}
	// Get the HTML
	xhr.open( 'GET', this.GetImageXmlUrl );
	xhr.responseType = 'document';
    xhr.send();
}
MYTAP.prototype.my_backgroundImageRandom = function( xml  ){
    var imagePath = ''
    //var cookiebackgroundImage = getCookie("");
    var cookiebackgroundImage = C_COOKIE.getCookie("backgroundImage")
    console.log(cookiebackgroundImage);
    if (cookiebackgroundImage != "") {
        imagePath = cookiebackgroundImage;
    }else{
        //document.cookie = "backgroundImage=" + imagePath + ";expires=Thu, 18 Dec 2020 12:00:00 UTC";
        var imageDomainPath = "https://d3cbihxaqsuq0s.cloudfront.net/";
        var backImageItemjson = xmlToJson(xml);
    
        var $Content = backImageItemjson.ListBucketResult.Contents;
        //Radndom Get one object
        var ContentIndex = Math.floor(Math.random() * $Content.length) + 1
        imagePath = $Content[ContentIndex].Key['#text'];
    
        C_COOKIE.setCookie("backgroundImage", imagePath , 1 );
    }
   // imagePath =  'images/56298672_xl.jpg';
    //imagePath = 'https://d3cbihxaqsuq0s.cloudfront.net/images/48244404_xl.jpg'
    //document.getElementById('masthead').style.backgroundImage = "url('" + imagePath + "')";

    // chrome.storage.sync.set({
    //     'backgroundImage': JSON.stringify(backImageItemjson.ListBucketResult.Contents)
    // }, function () {
    //     console.log('successed!' + JSON.stringify(backImageItemjson.ListBucketResult.Contents));
    // });


    return imagePath;
},
MYTAP.prototype.my_refreshBackgroundImage = function(){
    C_COOKIE.deleteCookie("backgroundImage");
    this.my_backgoundImage();
}





var getHTML = function(url , callback){

}
  function  xmlToJson(xml){
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
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof (obj[nodeName]) == "undefined") {
                obj[nodeName] = this.xmlToJson(item);
            } else {
                if (typeof (obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(this.xmlToJson(item));
            }
        }
    }
    return obj;
}



 MYTAP.prototype.fnXmlToJson = function(xml){
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
         for (var i = 0; i < xml.childNodes.length; i++) {
             var item = xml.childNodes.item(i);
             var nodeName = item.nodeName;
             if (typeof (obj[nodeName]) == "undefined") {
                 obj[nodeName] = this.fnXmlToJson(item);
             } else {
                 if (typeof (obj[nodeName].push) == "undefined") {
                     var old = obj[nodeName];
                     obj[nodeName] = [];
                     obj[nodeName].push(old);
                 }
                 obj[nodeName].push(this.fnXmlToJson(item));
             }
         }
     }
     return obj;
 }


 function loadImage(url){
    $('body').addClass('loading');
    var img = new Image();
    img.onload = function() {
        $('body').css({
            'background-image': 'url(\'' + this.src + '\')'
            ,'background-size': 'cover'
            ,'background-repeat': 'no-repeat'
        }).removeClass('loading');
    };

    img.src = url;
 }