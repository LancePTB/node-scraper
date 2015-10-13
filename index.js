var imageReq = require('request');
var path = require('path');
var fs = require('fs');
var fd = fs.openSync("images.csv", 'w');

imageReq('http://substack.net/images/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var cheerio = require('cheerio'),
    $ = cheerio.load(body);
   
    // var row = $('body').find('tr').find('code');
    
    var filePermissions = $('body').find('tr').each(function(index,value){
      var filePerm = $(value).find('code').text() + ",";
      var href = $(value).find('a').attr('href');
      var fileType = path.extname(href);
      console.log(fileType);
      var row = filePerm + href + "," + fileType + "\n";
      fs.appendFile("images.csv", row, function(err) { 
        if(err) {
            return console.log(err);
        }

        // console.log("Row number: " + index);
      }); 
    });
    
  }
})

// file permissions: $('body').find('code').text()