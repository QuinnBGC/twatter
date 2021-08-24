/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Quinn Campfield
 * Email: campfieq@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var fs = require('fs');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var rData = fs.readFileSync('./twitData.json');
var twitData = JSON.parse(rData);

app.use(express.static('public'));


app.get('/twits', function (req, res, next) {
  res.status(200).sendFile(__dirname + '/public/index.html');
});

app.get('/twits/:twit', function (req, res, next){
    var twitId = req.params.twit.toLowerCase();
  console.log(twitId);
  var singleTwitArray = [];
  if((twitId < twitData.length) || (twitId >= 0)){ 
    console.log(twitId);
    singleTwitArray.push(twitData[twitId]); 
    res.status(200).render('updateView', {data: singleTwitArray, index: 0}); 
  }
  else{ 
       next();   
  }
});

app.get('*', function (req, res, next) {
  res.status(404).sendFile(__dirname + '/public/404.html');
});

app.listen(port, function (err) {
  if (err) {
    throw err;
  }

  console.log("== Server is listening on port", port);
});
