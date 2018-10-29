var MOVIE = function () {
    this.GetUrl = 'https://api.douban.com/v2/movie/in_theaters?count=18',
    /*test : https://www.jianshu.com/p/e6f072839282 */
    this.init();
}
MOVIE.prototype.init = function () {
    this.getmovielist();
}

MOVIE.prototype.getmovielist = function () {
    var renderMovielist = this.IntheaterMovieRender;
    this.fnAjax(this.GetUrl, renderMovielist);
}

MOVIE.prototype.IntheaterMovieRender = function (movielist) {
    var getmovietemplateurl__ = chrome.extension.getURL("movielist.html");
    $.ajax({
        url: getmovietemplateurl__,
        dataType: "html",
        success: function (res) {
            movielisttemp = res
        },
        complete: function () {
            $.template("movielist", movielisttemp);
            // Render the template with the movies data and insert
            // the rendered HTML under the "movieList" element
            $("#moviebrights").empty();
            $.tmpl("movielist", movielist).appendTo("#moviebrights");
        }
    })
    var movielisttemp = '';
}


MOVIE.prototype.fnAjax = function (_url, _fnobj) {
    $.ajax({
        type: 'Get',
        url: _url,
        dataType: "jsonp",
        contentType: "application/json",
        success: function (res) {
            _fnobj(res.subjects);
        },
        complete: function () {

        }
    })
}