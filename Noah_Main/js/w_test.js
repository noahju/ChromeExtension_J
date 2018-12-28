$(document).ready(function () {
  // var ctx = document.getElementById('myChart').getContext('2d');
  // var canvas = document.getelementbyid('mychart');
  // var ctx = canvas.getcontext('2d');
  weather();





});

var weather = async function(){
    var get_weather_url__ = "https://api.darksky.net/forecast/67e07d1121f1c1ada1b11c382679de00/37.56621,126.9779";
    var get_weather_obj = new POUCHBD_DAC("5");

    var weatherCookie = await get_weather_obj.GETALLDOC();
    //console.log(weatherCookie);
    /*
    console.log(weatherCookie[0].doc.Obj);
    weatherRender(weatherCookie[0].doc.Obj);
    return;
    */
    if(
      weatherCookie.length < 1 ||
          weatherCookie[0] == null ||
          weatherCookie[0].doc == null ||
          weatherCookie[0].doc.Obj == undefined ||
          weatherCookie[0].doc.Obj == null ||
          weatherCookie[0].doc.Obj == ""

    ){
      $.getJSON(get_weather_url__ , function(res){
          console.log("dadfasd")
          weatherRender(res);
          var weather_obj = new POUCHBD_DAC("5");

          weather_obj.INSERT_DATA_2(res);
          //C_COOKIE.setCookie("weatherCookie" , JSON.stringify(res)  , 2);
      });
    }
    else{
      var tempnow = new Date((weatherCookie[0].doc.Obj.currently.time)*1000);
      var tempToday = tempnow.getFullYear() + "" + (tempnow.getMonth()+1) + "" +  tempnow.getDate();
      var _tempnow = new Date();
      var _tempToday = _tempnow.getFullYear() + "" + (_tempnow.getMonth()+1) + "" +  _tempnow.getDate();

      if( tempToday != _tempToday){
          $.getJSON(get_weather_url__ , function(res){
              weatherRender(res);
              var weather_obj = new POUCHBD_DAC("5");
              console.log(1);
              weather_obj.INSERT_DATA_2(res);
          });
      }else{
        weatherRender(weatherCookie[0].doc.Obj);
      }
    }
}

var weatherRender  = function(weatherObj ){
  console.log(weatherObj);
  var datalist = weatherObj.hourly.data;
  var hourlyTime = [];
  var hourlyapparentTemperature = [];
  datalist.forEach((item , index )=>{
    hourlyTime.push(ConvertToDate(  item.time , 4 ));
    hourlyapparentTemperature.push(ConvertToCelsius(item.apparentTemperature, 1));
  });
  var drk = new DarkJS();
  drk.Chart(hourlyTime,  hourlyapparentTemperature );
}
var ConvertToDate = function(dateStr , d_type ){
       var retStr ;
       var timestamp = dateStr;
       if (timestamp < 10000000000) {
         timestamp = timestamp*1000;
       }
       var now = new Date(timestamp);

       var today = now.toDateString();
       var time = now.toLocaleTimeString();
       var todayDate = now.getDate();
       var todayMonth = now.getMonth() + 1;
       var todayYear = now.getFullYear();

       var hours = now.getHours();
       var minutes = now.getMinutes();
       var seconds = now.getSeconds();
       var milliseconds = now.getMilliseconds();
       var newSeconds = seconds + (milliseconds/1000);

    switch(d_type){
        case 1:
            retStr =  today + " " + time ;
            break;
        case 2:
            retStr =  todayYear + "" + todayMonth + "" + todayDate;
            break;
        case 4:
            retStr =  todayYear + "-" + todayMonth + "-" + todayDate + "  " + hours + ":" + minutes + ":" + seconds;
            break;
        default :
            retStr =  today;
            break;
        break;
    }

    return retStr;

}


// convert Fahrenheit to celsius
var ConvertToCelsius = function (Fahrenheit , rttype ) {
  var Celsius = (Fahrenheit - 32) * 5 / 9 ;
  if (rttype == 1) {
    return  Celsius.toFixed(1);
  }else{
      return Celsius;
  }
}

;var DarkJS = function() {
  this.canvas = document.getElementById('myChart');

}
DarkJS.prototype.Chart = function (objTime , objTemprature) {
  var ctx = this.canvas.getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'radar',
      // The data for our dataset
      data: {
          labels: objTime ,
          datasets: [{
              label: "",
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgb(54, 162, 235)",
              fill: false,
              data: objTemprature ,
          }]
      },

      // Configuration options go here
      options: {
        barValueSpacing : 10,
        scaleBeginAtZero: false
      },
      scales: {
                xAxes: [
                  {
                    type: "time",
                    time: {
                      unit: "hour",
                      displayFormats: {
                        hour: "M/DD @ hA"
                      },
                      tooltipFormat: "MMM. DD @ hA"
                    },
                    scaleLabel: {
                      display: true,
                      labelString: "Date/Time"
                    }
                  }
                ],
                yAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: "Temperature (°F)"
                    },
                    ticks: {
                      callback: function(value, index, values) {
                        return value + "°F";
                      }
                    }
                  }
                ]
              }
  });
}
