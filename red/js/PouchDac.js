//import PouchDB from '../js/pouchdb-7.0.0.js';

var db = new PouchDB('NAVIGATIONLIST');
var POUCHBD_DAC = function(dbstring){
  
    switch(dbstring) {
        case '1':
            db = new PouchDB('NAVIGATIONLIST');
            break;
        case '2':
            db = new PouchDB('tricycleTodoList');
            break;
        case '3':
            db = new PouchDB('personalmemo');
            break;          
        default:
            db = new PouchDB('NAVIGATIONLIST');
    }
}
///--------------------------------
/// insert data and auto- generate _id 
///--------------------------------
POUCHBD_DAC.prototype.INSERT_DATA = async function(navigationData){    
    try {
        var response = await db.post({
            n_title: navigationData.title,
            n_url : navigationData.url,
            n_regdate : navigationData.regdate,
            n_status : true,
            n_uptdate : navigationData.uptdate,
            n_auth : navigationData.auth
        }).then(function(res){
            console.log(res);
        });
        this.GETALLDOC();

    } catch (err) {
        console.log(err);
    }
}

///--------------------------------
/// get data via _id 
///--------------------------------
POUCHBD_DAC.prototype.GETDATABYID = function(s_id){
    db.get(s_id).then(function (doc) {
        console.log(doc);
    }).catch(function (err) {
        console.log(err);
    });
    this.CLOSEDB();
}

///--------------------------------
/// remove data 
///--------------------------------
POUCHBD_DAC.prototype.REMOVEDATA_1 = function(d_id){
    db.get(d_id).then(function(doc) {
        return db.remove(doc);
    }).then(function (result) {
        console.log(result);
    }).catch(function (err) {
        console.log(err);
    });    
    this.CLOSEDB();
}

POUCHBD_DAC.prototype.REMOVEDATA_2 = function(d_id){
    db.get(d_id).then(function(doc) {
        return db.remove(doc._id, doc._rev);
    }).then(function (result) {
        console.log(result);
    }).catch(function (err) {
        console.log(err);
    });
    this.CLOSEDB();
}

POUCHBD_DAC.prototype.REMOVEDATA_3 = function(d_id){
    db.get(d_id).then(function(doc) {
        doc._deleted = true;
        return db.put(doc);
    }).then(function (result) {
        // handle result
    }).catch(function (err) {
        console.log(err);
    });
    this.CLOSEDB();
}



///--------------------------------
/// INSERT SOME DATA 
///--------------------------------
POUCHBD_DAC.prototype.PUTLISTDATA_1 =  async function (){
    try {
        var result = await db.bulkDocs([
          {title : 'Lisa Says', _id: 'doc1'},
          {title : 'Space Oddity', _id: 'doc2'}
        ]);
    } catch (err) {
        console.log(err);
    }
    this.CLOSEDB();
}

///--------------------------------
/// GET ALL DOC 
///--------------------------------
POUCHBD_DAC.prototype.GETALLDOC =  async function (){
    try {
        var result = await db.allDocs({
            include_docs: true,
            attachments: true
        });
        
        var _naviobjtemp  = result.rows;
        console.log(_naviobjtemp);
        var naviUrl = chrome.extension.getURL("navi.html");
        var naviMarkup = ''
        $.ajax({
            url: naviUrl ,
            dataType: "html",
            success: function(res){
                naviMarkup = res
            },
            complete: function(){
                $.template( "naviTemplate", naviMarkup );
                // Render the template with the movies data and insert
                // the rendered HTML under the "movieList" element
                $("#naviTemplateArea").empty();
                $.tmpl( "naviTemplate", _naviobjtemp ).appendTo( "#naviTemplateArea" );
            }
        })
    } catch (err) {
        console.log(err);
    }
    this.CLOSEDB();
}

POUCHBD_DAC.prototype.CLOSEDB = function(){
    db.close().then(function () {
        console.log('closeed');
    });
}

///--------------------------------
/// SELECT  DOC 
///--------------------------------
POUCHBD_DAC.prototype.FINDITEM = async function(_title){
    try {
        var result = await db.find({
            selector: {name: 'Mario'},
            fields: ['_id', 'name'],
            sort: ['name']
        });
    } catch (err) {
        console.log(err);
    }
}





//test 
POUCHBD_DAC.prototype.GETALLDATA_BACKUP =  async function (){
    var retobj = ''
    try {
        var result = await db.allDocs({
            include_docs: true,
            attachments: true
        });
        
        var _naviobjtemp  = result.rows;
        retobj = _naviobjtemp;
        
    } catch (err) {
        console.log(err);
    }
    this.CLOSEDB();
    return retobj;
}


POUCHBD_DAC.prototype.BACKUP = async function(){
    var res  = await db.allDocs({include_docs: true, attachments: true}).then(JSON.stringify);

    console.log(res);

}
