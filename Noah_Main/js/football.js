$(document).ready(function(){

    var footballApi = 'https://api.football-data.org/v2/competitions/2021/teams'

    var leagueTable = "http://api.football-data.org/v1/competitions/445/leagueTable";
    leagueTable = "https://api.football-data.org/v2/competitions/PL/matches";
    var footballApiTeam = "http://api.football-data.org/v2/competitions/2021/scorers";
    var footballTeam  = " http://api.football-data.org/v2/teams/";

      var footballmatches = "http://api.football-data.org/v2/teams/" // /v2/teams/{id}/matches/
    fnAjax(footballApi ,"", getTeamlist);

    $(document).on("click" ,".teamlist .teamicon", function(){
      console.log( $(this).data('id'));
      var s_team = footballTeam + $(this).data('id');
      var s_team_matches = s_team + "/matches/";
      fnAjax(s_team ,"" , getTeamInfo );
      fnAjax(s_team_matches ,"" , getTeamMatches );
    });
    /*

    $.get(leagueTable , (item)=>{
      console.log(item.standing);
    })
    $.get(footballApi , (item)=>{
      console.log(item);
    })
    /
    *
    2114 Serie A
    Chinese Super League id : 2046 country : China PR
    name : Premier League id : 2072 country : England
    Ligue 1 id : 2081 country : France
    Bundesliga id : 2088 country : Germany
    Serie A id : 2114 country : Italy
    name : Primera Division id : 2224 country : Spain

    /
    more infomation : https://www.football-data.org/documentation/quickstart#available-resources
    */
});
var fnAjax = function(_url , filter , fnCallbackObj) {
  if (typeof fnCallbackObj == undefined ||
    fnCallbackObj == "") {
      fnCallbackObj = fnCallback;
    }
  var _headers =  {"X-Auth-Token" :"959783a20fc14539b46a51acf5eacf8b" };

  $.ajax({
    url : _url ,
    headers: _headers,
    type: 'GET',
    dateType :'json',
    success: fnCallbackObj,
    error: function(xhr, status, error){
        console.log(status);
    }
  })
}
var fnCallback = function(res) {
    console.log(res);
}
var getTeamlist = function (res) {
  $(".teamlist").empty();
  SetTmpl("teamlist.html" , res.teams ,"teamlist");
  /* res.teams.forEach(item=>{
    $(".teamlist").append(
      '<div class="teamicon" data-id="' + item.id + '"><img src="' + item.crestUrl + '" ></div>'
    );
  })
  */
}

var getTeamInfo = function(res) {
  console.log(res);
  $(".desc").empty();
  $(".desc").append("<h1>" + res.name +"</h1>" + "<p>founded: " + res.founded+ "</p>");

  var image = res.crestUrl;
  var clubcolor = res.clubColors.split('/');
  console.log(clubcolor[0]);
  console.log(clubcolor[1]);

  $(".card-head").css("background-color", clubcolor[0].trim());
  $(".card-body").css("background-color", clubcolor[1].trim());

  res.squad.forEach(item=>{

    var sHtml =
    '<div class="playerInfo">'
    +  '<div class="card-head">'
    +    '<img src="' + image + '" >'
    +    '<div class="product-detail">'
    +      '<h2>'+item.name+'</h2>'
    +      item.nationality + "/ " + item.dateOfBirth
    +    '</div>'
    +    '<span class="back-text">'+item.shirtNumber+'</span>'
    +  '</div>'
    +  '<div class="card-body">'
    +    '<div class="badge">'+item.position+'</div>'
    +    '<p>'
    +    item.role + "/" + item.countryOfBirth
    +    '</p>'
    +  '</div>'
    +'</div>'

    $(".desc").append( sHtml ) ;
    sHtml = "";
  });

}

var getTeamMatches = function (res) {
    console.log(res);
}

/* Render Html by jquery Template*/
var SetTmpl = function( templateHtml , DtObj , InsertAreaID) {
  //var getnewsurl__ = chrome.extension.getURL("news.html");
  var getnewsurl__ = chrome.extension.getURL(templateHtml);
  var templateMarkup = '';
    $.ajax({
        url: getnewsurl__,
        dataType: "html",
        success: function (res) {
            templateMarkup = res
        },
        complete: function () {
            $.template("Template", templateMarkup);
            // Render the template with the movies data and insert
            // the rendered HTML under the "movieList" element
            $("#"+ InsertAreaID).empty();
            $.tmpl("Template", DtObj).appendTo("#"+ InsertAreaID);
        }
    })
}
