var FEED_URL = 'http://newspeppermint.com/feed/' 

function Get_peppermint(){
    var peppermint_pouch = new POUCHBD_DAC('5');
    $.get(FEED_URL, async  function (data) {
        console.log(data);
        $(data).find("item").each(function () { // or "item" or whatever suits your feed
            var el = $(this);
            var peppeObj =  new peppermintObj();
            peppeObj.title = el.find("title").text();
            peppeObj.link = el.find("link").text();
            peppeObj.comments = el.find("comments").text();
            peppeObj.pubDate = el.find("pubDate").text();
            peppeObj.description = el.find("description").text();
            peppeObj.content = el.find("content\\:encoded").text();
            peppeObj.guid = el.find("guid").text();

            var isExist = await peppermint_pouch.FINDITEM_PEPP(  peppeObj.guid );
            console.log('isExist :  ' + isExist);
            if(!isExist){
                peppermint_pouch.INSERT_DATA(peppeObj);
            }
        });

        var allNewsDoc = peppermint_pouch.GETALLDOC();
        console.log(allNewsDoc);
        console.log("allNewsDoc");

    });
    
}

 
var peppermintObj = function(){
     this.title = '';
     this.link = '';
     this.comments = '';
     this.pubDate = '';
     this.description = '';
     this.content = '';
}