// https://agnostic.github.io/LocalDB.js/
// https://pouchdb.com/download.html
//var books = new LDB.Collection('books');
// var item = {
//     author: 'Author name123',
//     title: 'Book title test'
//     };
    
// books.save(item, function(_item){
//     console.log('New item:', _item);
// });



// var items = [{
//     author: 'Author name2',
//     title: 'Book title test'
//   },{
//     autor: 'Another author',
//     title: 'New book'
//   }];
  
// books.save(items, function(_items){
//     console.log('New items:', _items);
// });

// books.find(function(results){
//     console.log(results);
//   });

// books.update({ author: 'Author name' }, function(updated_items){
//     console.log(updated_items);
//  });

//  books.find({ author: 'Author name2' }, function(items){
//     for(var i in items){
//       items[i].delete();
//     }
//   });

//   books.find(function(results){
//     console.log(results);
//   });
//import PouchDB from '../js/pouchdb-7.0.0.js';
var db = new PouchDB('dbname');
db.put({
    _id: 'mydoc',
    title: 'Heroes'
  }).then(function (response) {
    // handle response
  }).catch(function (err) {
    console.log(err);
  });

  db.get('mydoc').then(function(doc) {
    return db.put({
      _id: 'mydoc',
      _rev: doc._rev,
      title: "Let's Dance"
    });
  }).then(function(response) {
    // handle response
  }).catch(function (err) {
    console.log(err);
  });

//   db.post({
//     title: 'Ziggy Stardust'
//   }).then(function (response) {
//     // handle response
//   }).catch(function (err) {
//     console.log(err);
//   });