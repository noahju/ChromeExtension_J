var FEED_URL = 'http://newspeppermint.com/feed/' 

async function Get_peppermint(){
    var peppermint_pouch = new POUCHBD_DAC('4');
    var peppemintalldoc = ''
    var holdimagecookie = C_COOKIE.getCookie("PEPPER_NEWS");
    if(holdimagecookie != ""){
        // var allpeppermintnews = await peppermint_pouch.GETALLDOC();
        // console.log("allpeppermintnews");
        // console.log(allpeppermintnews);
        //console.log(peppermint_pouch.GETALLDOC());
        
        await peppermint_pouch.GETALLDOC().then(function(result){
            peppemintalldoc = result;
        })
        // var a = Promise.resolve('xx')
        // // Promise {[[PromiseStatus]]: "resolved", [[PromiseValue]]: "xx"}
        // a.then(function (result) { console.log(result) })

        peppemintHTML(peppemintalldoc);
        return
    }
    C_COOKIE.setCookie("PEPPER_NEWS" , 'Y', 4 );    
    $.get(FEED_URL,async function (data) {
        //console.log(data);
        $(data).find("item").each(async  function () { // or "item" or whatever suits your feed
            var el = $(this);
            var peppeObj =  new peppermintObj();
            peppeObj.title = el.find("title").text();
            peppeObj.link = el.find("link").text();
            peppeObj.comments = el.find("comments").text();
            peppeObj.pubDate = el.find("pubDate").text();
            peppeObj.description = el.find("description").text();
            peppeObj.content = el.find("content\\:encoded").text();
            peppeObj.guid = el.find("guid").text();

            var isExist =await peppermint_pouch.FINDITEM_PEPP(  peppeObj.guid );
            console.log('isExist :  ' + isExist);
            if(!isExist){
                console.log('Not found  ')
                await peppermint_pouch.PUTLISTDATA_1(peppeObj);
            }
        });

        var allNewsDoc = await peppermint_pouch.GETALLDOC();
        console.log(allNewsDoc);
        console.log("allNewsDoc");
    });
    
}

//peppermintnews
function peppemintHTML(PepperObj){
    console.log(PepperObj ) ;
    var geturl__ = chrome.extension.getURL("PeppemintTemplate.html");
        var markup = '';
        // $.get( geturl__ , function( data ) {
        //     //console.log(data);     
        //     markup = data;
        // });
        $.ajax({
            url: geturl__,
            dataType: "html",
            success: function (res) {
                markup = res
            },
            complete: function () {
                $.template("PeppemintTemplate", markup);
                // Render the template with the movies data and insert
                // the rendered HTML under the "movieList" element
                $("#peppermintnews").empty();
                $.tmpl("PeppemintTemplate", PepperObj).appendTo("#peppermintnews");
            }
        })

}


 
var peppermintObj = function(){
     this.title = '';
     this.link = '';
     this.comments = '';
     this.pubDate = '';
     this.description = '';
     this.content = '';
}