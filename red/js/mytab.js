;var MYTAP = function(){
    this.GetImageXmlUrl = 'https://d3cbihxaqsuq0s.cloudfront.net/';
    this.init();
}

MYTAP.prototype.init = function(){
    this.my_backgoundImage();
}

MYTAP.prototype.my_backgoundImage = function(){
    var responsexmlTag = ''    
    // var req = new XMLHttpRequest();
    // //req.responseType = 'json';
    // req.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         //this.my_backgoundImageRender(this.responseXML);
    //         //new MYTAP().my_backgoundImageRender(this.responseXML);
    //     }
    // };
    // req.open("GET", this.GetImageXmlUrl, true);
    // req.send();
     
    $.ajax({
        type: "GET",
        url: this.GetImageXmlUrl,
        cache: false,
        dataType: "xml",
        success: function(xml) {
            console.log(xml);
            this.my_backgoundImageRender(xml);
            // $(xml).find('Contents').each(function(){
            //     console.log( $(this).find("Key").text());
            // });
        }
    });

}
MYTAP.prototype.my_backgoundImageRender = function( xml  ){
    
    var backImageItemjson = this.fnxmlToJson(xml);

    var $Content = backImageItemjson.ListBucketResult.Contents;
    //Radndom Get one object 
    var ContentIndex = Math.floor(Math.random() * $Content.length) + 1
    var imagePath = this.GetImageXmlUrl + $Content[ContentIndex].Key['#text'];

    var cookiebackgroundImage = getCookie("backgroundImage");

    if (cookiebackgroundImage == "true") {
        imagePath = './img/53679405_xl.jpg'
    }
    //For test
    //imagePath = 'https://d3cbihxaqsuq0s.cloudfront.net/images/48244404_xl.jpg'
    //document.getElementById('mainContent').style.backgroundImage = "url('" + imagePath + "')";
    document.getElementById('masthead').style.backgroundImage = "url('" + imagePath + "')";
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

MYTAP.prototype.fnAlert = function(xml){
    console.log(xml);
}
