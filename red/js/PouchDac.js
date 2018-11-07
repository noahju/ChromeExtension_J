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
        case '4':
            db = new PouchDB('~/db/localtest');
            break;          
        case '5':
            db = new PouchDB('peppermint');
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
            navigationData
            // n_title: navigationData.n_title,
            // n_url : navigationData.n_url,
            // n_regdate : navigationData.n_regdate,
            // n_status : true,
            // n_uptdate : navigationData.n_uptdate,
            // n_auth : navigationData.n_auth
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
POUCHBD_DAC.prototype.PUTLISTDATA_1 =  async function (item){
    console.log(item);
    try {
        var result = await db.bulkDocs([
            item
        ]);
        console.log(result);
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
        return _naviobjtemp;
        
    } catch (err) {
        console.log(err);
    }
    this.CLOSEDB();
}

POUCHBD_DAC.prototype.CLOSEDB = async function(){
    
    // await db.close().then(function () {
    //     console.log('closeed');
    // });
}

///--------------------------------
/// SELECT  DOC 
///--------------------------------
POUCHBD_DAC.prototype.FINDITEM = async function(_title){
    try {
        var result = await db.find({
            selector: { title: _title },
            //selector Defines a selector to filter the results. Required.
            //fields: ['n_title', _title ]
            //,sort: ['n_title']
        });
        console.log("result");
        console.log(result)
        console.log(result.docs.length)
        if(result.docs.length > 0 ){
            return true;
        }else{
            return false;
        }
    } catch (err) {
        console.log(err);
    }
}

POUCHBD_DAC.prototype.FINDITEM_PEPP = async function(_guid){
    try {
        var result = await db.find({
            selector: { guid: _guid }
        });
        console.log("result");
        console.log(result)
        console.log(result.docs.length)
        if(result.docs.length > 0 ){
            return true;
        }else{
            return false;
        }
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
POUCHBD_DAC.prototype.READBACKUPFILE = async function(){
        var allText = "";
        var file = "file:///D:/sample_Red.json"
        console.log(file);
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    allText = rawFile.responseText;
                }
            }
        }
        rawFile.send(null);
        console.log(allText);
        return JSON.parse(allText) ;
}

POUCHBD_DAC.prototype.RESTORE_DATA = async function(){
    var B_dt = await this.READBACKUPFILE();
    B_dt.forEach(item => {
        this.FINDITEM(item.n_title);
        //this.INSERT_DATA(item);
        
    });

}


function setFromTime(paramDt){
    
    let totalSeconds = Date.now() - paramDt
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    // console.log("--------------start---------------------");
    // console.log(paramDt);
    // console.log(Date.now());
    // console.log("hours: " + hours);
    // console.log("minutes: " + minutes);
    // console.log("seconds: " + seconds);
    // console.log("--------------End---------------------");
}

