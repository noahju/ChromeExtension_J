$(document).ready(function(){
   // backgroundImage(4);



   var canvas = document.getElementById('canvas');    
   var ctx = canvas.getContext('2d');
   console.log(ctx);
   ctx.strokeStyle = '#28d1fa';
   
   ctx.lineWidth = 17;
   ctx.lineCap = 'round';
   ctx.shadowBlur = 15;
   ctx.shadowColor = '#28d1fa';

   setInterval( function(){  renderTime(ctx); }  , 500 );
});
var imageDomainPath = "https://d3cbihxaqsuq0s.cloudfront.net/";
var  GetImageXmlUrl =  'https://d3cbihxaqsuq0s.cloudfront.net/';
var backImageRandom  = function(xml , count ){
    var retarray = [];
    var imagePath = ''
    var backImageItemjson = xmlToJson(xml);
    var $Content = backImageItemjson.ListBucketResult.Contents;
    //Radndom Get one object
    for(i = 0 ; i < count ; i ++ ){
        var ContentIndex = Math.floor(Math.random() * $Content.length) + 1
        imagePath = imageDomainPath + $Content[ContentIndex].Key['#text'];
        retarray.push(imagePath);
    }
    return retarray;
}

var backgroundImage = function(count){
    var callback = backImageRandom;

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (callback && typeof (callback) === 'function') {
            var backimagePath = callback(this.responseXML , count );
            console.log(backimagePath)
            backimagePath.forEach((item, index) => {
                console.log(item);
                
                $(".bgimg-" + (index + 1) ).css({'background-image' : 'url(\'' + item + '\')'})
            });
        }
    }
    // Get the HTML
    xhr.open('GET', GetImageXmlUrl);
    xhr.responseType = 'document';
    xhr.send();
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




//*****----------------------------------------------------------//
// canvas test for clock 
function degToRad(degree) {
  var factor = Math.PI/180;
  return degree*factor;
}

function renderTime(ctx) {
  console.log(1);
  var now = new Date();
  var today = now.toDateString();
  var time = now.toLocaleTimeString();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var milliseconds = now.getMilliseconds();
  var newSeconds = seconds+ (milliseconds/1000);
  
  // Background
  gradient = ctx.createRadialGradient(200,200,5,200,200,300);
  gradient.addColorStop(0,'#09303a');
  gradient.addColorStop(1, '#000000');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0,0,400,400);
  
  // Hours
  ctx.beginPath();
  ctx.arc(200, 200, 170, degToRad(270), degToRad((hours*30)-90));
  ctx.stroke();
  
  // Minutes
  ctx.beginPath();
  ctx.arc(200, 200, 140, degToRad(270), degToRad((minutes*6)-90));
  ctx.stroke();
  // Seconds
   ctx.beginPath();
  ctx.arc(200, 200, 110, degToRad(270), degToRad((newSeconds*6)-90));
  ctx.stroke();
  // Date 
  ctx.font = "20px Helvetica";
  ctx.fillStyle = '#28d1fa';
  ctx.fillText(today, 140, 200);
  
  // Time
  ctx.font = "15px Helvetica";
  ctx.fillStyle = '#28d1fa';
  ctx.fillText(time, 140, 230);
}

//------------------------------------------------------------------


