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
    if(index % 2 > 0 || index % 3 > 0  ) return true;
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
            if(hours== 0 ){
              retStr =  todayMonth + "-" + todayDate + "_" + hours;
            }else{
                retStr =  hours;
            }
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
  this.canvas.width="10";

}
DarkJS.prototype.Chart = function (objTime , objTemprature) {
  var config = {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: objTime ,
          datasets: [{
              label: "title adfasdf",
              //backgroundColor: '#FC2525',
              backgroundColor: "rgba(236, 240, 241,1.0)",
              borderColor: "rgba(236, 240, 241,1.0)",
              fill: false,
              data: objTemprature ,
          }]
      },

      // Configuration options go here
      options: {
        barValueSpacing : 10,
        scaleBeginAtZero: false,
        scales: {
            yAxes: [{
                scaleLabel: {
                     display: true,
                     labelString: 'Celsius',
                     fontColor:'rgba(149, 165, 166, 0.9)'
               },
              gridLines: {
                  color: 'rgba(149, 165, 166, 0.2)' // makes grid lines from y axis red
                },
                ticks: {
                    beginAtZero:true,
                    fontColor: 'rgba(149, 165, 166, 0.9)'
                },
            }],
          xAxes: [{
                scaleLabel: {
                     display: true,
                     labelString: 'Time',
                     fontColor:'rgba(149, 165, 166, 0.9)'
               },
                gridLines: {
                    color: 'rgba(149, 165, 166, 0.2)' // makes grid lines from y axis red
                  },
                ticks: {
                    fontColor: 'rgba(149, 165, 166, 0.9)'
                },
            }]
        }
      },
  };

  Chart.plugins.register({
    beforeDraw: function(chartInstance) {
      var ctx = chartInstance.chart.ctx;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
    }
  })
  var myRadar = new Chart(document.getElementById("myChart"), config);
  // var ctx = this.canvas.getContext('2d');
  // var chart = new Chart(ctx, );
}
