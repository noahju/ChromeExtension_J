var MYTAP = function ( bg_count ) {
    this.GetImageXmlUrl = 'https://d3cbihxaqsuq0s.cloudfront.net/';
    this.BgCount = bg_count || 0 ;
    //this.init();
    console.log("this.BgCount : " + this.BgCount);
    if(this.BgCount > 0 ){
        this.getback2();
    }else{
        this.init();
    }
}

MYTAP.prototype.init = function () {
    this.my_backgoundImage();

}
MYTAP.prototype.my_backgoundImage = function () {

    var callback = this.my_backgroundImageRandom;
    var imagepath = this.GetImageXmlUrl;
    var cookieholdimage = C_COOKIE.getCookie("HOLD_IMAGE");

    if (cookieholdimage != "") {
        loadImage(cookieholdimage);
        return;
    }
    if (!window.XMLHttpRequest) return;
    if(this.BgCount > 0 ){

    }
    
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (callback && typeof (callback) === 'function') {
            var backimagePath = imagepath + callback(this.responseXML);
            loadImage(backimagePath);
        }
    }
    // Get the HTML
    xhr.open('GET', this.GetImageXmlUrl);
    xhr.responseType = 'document';
    xhr.send();
}
MYTAP.prototype.my_backgroundImageRandom = function (xml) {
    console.log(xml);
    var imagePath = ''
    var imageDomainPath = "https://d3cbihxaqsuq0s.cloudfront.net/";
    //var cookiebackgroundImage = getCookie("");
    var cookiebackgroundImage = C_COOKIE.getCookie("backgroundImage")
    console.log("image path : " + imageDomainPath + cookiebackgroundImage);
    if (cookiebackgroundImage != "") {
        imagePath = cookiebackgroundImage;
    } else {
        var backImageItemjson = xmlToJson(xml);

        var $Content = backImageItemjson.ListBucketResult.Contents;
        //Radndom Get one object
        var ContentIndex = Math.floor(Math.random() * $Content.length) + 1
        imagePath = $Content[ContentIndex].Key['#text'];

        C_COOKIE.setCookie("backgroundImage", imagePath, 1);
    }
    return imagePath;
},
MYTAP.prototype.my_refreshBackgroundImage = function () {
    
    if(this.BgCount > 0 ){
        C_COOKIE.deleteCookie("backgroundImageMulti");
        this.getback2();
    }else{
        C_COOKIE.deleteCookie("backgroundImage");
        this.my_backgoundImage();
    }
},
MYTAP.prototype.my_backgroundImageRandomMulti =  function(xml){
    
    var imagePath = [];
    var imageDomainPath = "https://d3cbihxaqsuq0s.cloudfront.net/";
    //쿠키 체크 
    var cookiebackgroundImage = C_COOKIE.getCookie("backgroundImageMulti");
    
    // if (cookiebackgroundImage != "") {
    if(cookiebackgroundImage != undefined && cookiebackgroundImage != ""){
        imagePath = cookiebackgroundImage.split(',');
    } else {
        var backImageItemjson = xmlToJson(xml);
        var $Content = backImageItemjson.ListBucketResult.Contents;
        //Radndom Get one object
        console.log("this.BgCount : " + this.BgCount);
        for(i = 0 ; i < this.BgCount ; i ++ ){
            var ContentIndex = Math.floor(Math.random() * $Content.length) + 1
            var imagetemp = imageDomainPath + $Content[ContentIndex].Key['#text'];
            imagePath.push(imagetemp);
        }
        C_COOKIE.setCookie("backgroundImageMulti", imagePath, 1);
    }
    return imagePath;
},
MYTAP.prototype.makeRequest2 = function(callback){
    return new Promise(
        function(resolve , reject){
            var callImageUrl = "https://d3cbihxaqsuq0s.cloudfront.net/";
            $.get( callImageUrl, function(res){
                resolve(res);
            });
        }
    );
}
,MYTAP.prototype.getback2 = async function(){
    var obj;
    await this.makeRequest2().then(function(res){
        obj = res;
    });
    var selectedImage = this.my_backgroundImageRandomMulti(obj);
    if(selectedImage == undefined){
        console.log("selectedImage is undefined");
        return;
    }
    console.log("selectedImage : " + selectedImage);
    selectedImage.forEach((item , index )=>{
        $(".bgimg-" + index ).css({'background-image' : 'url(\'' + item + '\')'})
    });
}

var getHTML = function (url, callback) {

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



MYTAP.prototype.fnXmlToJson = function (xml) {
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


function loadImage(url  ) {
    $('body').addClass('loading');
    var img = new Image();
    img.onload = function () {
        $('body').css({
            'background-image': 'url(\'' + this.src + '\')'
            , 'background-size': 'cover'
            , 'background-repeat': 'no-repeat'
        }).removeClass('loading');
    };
    img.src = url;
}