window.onload = function() {

  var dt =  new Date();
  var selectedDt = dt;

  RenderCalendar(dt);
  HistoryOfThisday();
  $(".historyofday").append("History of the " + monthNames[selectedDt.getMonth()] +  ". " + selectedDt.getDate());

  $(document).on("click" ,".right" ,(item)=>{
     var BeforeDay = new Date(selectedDt.getFullYear(), selectedDt.getMonth() + 1, 1);
     RenderCalendar(BeforeDay);
     selectedDt = BeforeDay;
  })
  $(document).on("click" ,".left" ,(item)=>{
    var BeforeDay = new Date(selectedDt.getFullYear(), selectedDt.getMonth() - 1, 1);
    RenderCalendar(BeforeDay);
    selectedDt = BeforeDay;
  })


 $(document).on("click" ,".days li" ,(item) =>{
  var param  = "/" +  (selectedDt.getMonth() + 1) + "/" + item.target.innerHTML;
   HistoryOfThisday(param);
   $(".historyofday").empty();
   $(".historyofday").append("History of the " + monthNames[selectedDt.getMonth()] +  ". " + item.target.innerHTML);
   $(".modal").toggle();
 });

$(document).on("click" ,".closebtn_btn" ,function() {
    $(".modal").hide();
});





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
