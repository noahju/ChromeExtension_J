$(document).ready(function(){

    var footballApi = 'https://api.football-data.org/v2/competitions/2021/'

    var leagueTable = "http://api.football-data.org/v1/competitions/445/leagueTable";
    leagueTable = "https://api.football-data.org/v2/competitions/PL/matches";
    var footballApiTeam = "http://api.football-data.org/v2/competitions/2021/scorers";
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

    https://www.football-data.org/documentation/quickstart#available-resources
    */
    $.ajax({
      url: footballApi,
      headers: {"X-Auth-Token" :"959783a20fc14539b46a51acf5eacf8b" },
      //data:{"id" : 2021},
      type: 'GET',
      dataType : "json",
      success: function(res) {
        console.log(res);
         res.competitions.forEach(item=>{
           console.log(
             " name : " + item.name
               + " id : " +  item.id
               + " country : " + item.area.name
           );
         })
      },
      error: function( xhr , status , error) {
        console.log(status);
      }
    });
});
