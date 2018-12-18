window.onload = function() {

  var dt =  new Date();
  var selectedDt = dt;

  //RenderCalendar(dt);
  RenderChineseCalendar(dt);
  HistoryOfThisday();
  boriboriBest100();
  getData();
  $(".historyofday").append("History of the " + monthNames[selectedDt.getMonth()] +  ". " + selectedDt.getDate());

  $(document).on("click" ,".right" ,(item)=>{
     var BeforeDay = new Date(selectedDt.getFullYear(), selectedDt.getMonth() + 1, 1);
     RenderChineseCalendar(BeforeDay);
     selectedDt = BeforeDay;
  })
  $(document).on("click" ,".left" ,(item)=>{
    var BeforeDay = new Date(selectedDt.getFullYear(), selectedDt.getMonth() - 1, 1);
    RenderChineseCalendar(BeforeDay);
    selectedDt = BeforeDay;
  })

 $(document).on("click" ,".days li" ,(item) =>{
  var param  = "/" +  (selectedDt.getMonth() + 1) + "/" + item.target.innerHTML;
   HistoryOfThisday(param);
   $(".historyofday").empty();
   $(".historyofday").append("History of the " + monthNames[selectedDt.getMonth()] +  ". " + item.target.innerHTML);
   $('.txtb_title p').empty();
   $('.txtb_title p').append( selectedDt.getFullYear() + "-" + (selectedDt.getMonth()+ 1) + "-" + item.target.innerHTML  )
   $(".modal").toggle();
 });

$(document).on("click" ,".closebtn_btn" ,function() {
    $(".modal").hide();
});

$(document).on("click" , "#modal_btn" ,function(){
  var date_doSomething = {
      c_date : $(".txtb_title p").text(),
      title : $('#modal_title').val(),
      description : $('#modal_description').val(),
      description2 : $('#modal_description2').val(),
      description3 : $('#modal_description3').val()
  }
  var pouchdb = new POUCHBD_DAC("4");
  pouchdb.INSERT_DATA(date_doSomething);
  getData();
});
//* @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
//console.log(calendar.solar2lunar(selectedDt.getFullYear(),(selectedDt.getMonth()+1),selectedDt.getDate()));
//var chineseCalendar =  calendar.solar2lunarMonth(selectedDt.getFullYear(),(selectedDt.getMonth()+1));


}

var getData = async function() {
  var pouchdbGet = new POUCHBD_DAC("4");
  var pouch_calendarObj = await pouchdbGet.GETALLDOC();
  console.log(pouch_calendarObj);
}

var RenderCalendar = function(millSecStr) {
  var today = new Date();
  if (millSecStr != undefined ||
    millSecStr != ""||
    typeof millSecStr != undefined
   ) {

     today = new Date(millSecStr);
  }

  $(".today span").empty();
  $(".today span").append(
    today.getDate() + " - " + (today.getMonth()+1)  + " - " + today.getFullYear()
  );

  var firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  var lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  var dayCountOfmonth = lastDay.getDate();
  var firtstdayWeek  = firstDay.getDay();

  var sHtml = "";
  for (var i = 0; i < ( firtstdayWeek + dayCountOfmonth ); i++) {
      if(i < firtstdayWeek){
        sHtml +=  "<li></li>";
      }else{
        sHtml += "<li>" + ((i + 1) - firtstdayWeek) + "</li>";
      }
  }
  $(".days ul").empty();
  $(".days ul").append(sHtml);
}


var weekday = [
  "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
]
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var HistoryOfThisday = function (dtparma) {
   //http://history.muffinlabs.com/date
   //http://history.muffinlabs.com/date/2/14
   var historyUrl = "http://history.muffinlabs.com/date"
   if(typeof dtparma != "undefined"){
     historyUrl += dtparma;
   }
   $(".pro_event ul").empty();
    + dtparma
   $.getJSON( historyUrl  , function(res){
       res.data.Events.forEach((item , index)=>{
          var sHtml =
            "<li>" +
             "<div class='year'>" + item.year + "</div>" +
             "<div class='text'>" + item.text + "</div>"
             "</li>"
            $(".pro_event ul").append(sHtml);
       });
   });

}

var RenderChineseCalendar = function (millSecStr) {
  var today = new Date();
  if (millSecStr != undefined ||
    millSecStr != ""||
    typeof millSecStr != undefined
   ) {
     today = new Date(millSecStr);
  }
  $(".today span").empty();
  $(".today span").append(
    today.getDate() + " - " + (today.getMonth()+1)  + " - " + today.getFullYear()
  );
  //* @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
  //console.log(calendar.solar2lunar(selectedDt.getFullYear(),(selectedDt.getMonth()+1),selectedDt.getDate()));
  var chineseCalendar =  calendar.solar2lunarMonth(today.getFullYear(),(today.getMonth()+1));

  var firstDay = new Date(chineseCalendar[0].cYear, (chineseCalendar[0].cMonth-1),chineseCalendar[0].cDay );
  var firtstdayWeek  = firstDay.getDay();

  var sHtml = "";
  for (var j = 0; j < firtstdayWeek; j++) {
    sHtml +=  "<li></li>";
  }
  for (var i = 0; i < chineseCalendar.length ; i++) {
        sHtml += "<li>"
         +"<div class='c_date'>"+ chineseCalendar[i].cDay +"</div>"
         +"<div class='c_astr'>"+ chineseCalendar[i].astro +"</div>"
         +"<div class='chinese_date'>" +
         chineseCalendar[i].IDayCn + "/" +chineseCalendar[i].IMonthCn
            + "</div>"
         +"</li>";
  }
  $(".days ul").empty();
  $(".days ul").append(sHtml);
}

//http://m.halfclub.com/partner/linkprice_best.aspx
//http://www.halfclub.com/Shop/Best100ItemList
// http://m.halfclub.com/caching/json/best/hf/main_mobile_best_product_all.json
var boriboriBest100 = function () {
    $.get('http://www.boribori.co.kr/shop/Best100ItemList' , item=>{
      console.log('boriboris');
      console.log(item);
    });

    $.get('http://m.halfclub.com/caching/json/best/hf/main_mobile_best_product_all.json' , item=>{
      console.log('halfclub');
      console.log(item);

    });

    //
    // $.get('http://m.halfclub.com/caching/json/best/hf/main_mobile_best_product_all.json' item=>{
    //   console.log('halfclub');
    //   console.log(item);
    // });
}
