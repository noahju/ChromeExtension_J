var JUST_TIME = function(){
    this.date = 'init';
}

JUST_TIME.prototype.fromNow  = function( paramDt ){
    //1541149200000
    let totalSeconds = Date.now()  - paramDt
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    console.log("hours: " + hours);
    console.log("minutes: " + minutes);
    console.log("seconds: " + seconds);
}