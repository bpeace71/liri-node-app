var dataKeys = require("./keys.js");
var fs = require('fs'); //file system
var twitter = require('twitter');


var twitterKeys = 0 

var client = new twitter({
  consumer_key: '<BfWjy3h518FwBnJJXQfDBBVer>',
  consumer_secret: '<aDTpC8DPYRveqMwZzhleDewFogRSyhwDRBejpqBt80y7mOhPh9>',
  access_token_key: '<59731143-NYT82LdFFJ1FkYNury4A9ZS9vEwdHB83pLVzbojKl>',
  access_token_secret: '<WMAQqPG4NEa9Bkmc2sakr3vjF7K1MfxbhFjBgtyV7DKRM>',
});


console.log(dataKeys);

runThis(process.argv[2], process.argv[3]);


//run this on load of js file
function runThis(argOne, argTwo) {
    pick(argOne, argTwo);
};

function pick(caseData, functionData) {
    switch (caseData) {
        case 'my-tweets':
            getTweets();
            break;
        case 'spotify-this-song':
            getMeSpotify(functionData);
            break;
        case 'movie-this':
            getMeMovie(functionData);
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log('LIRI doesn\'t know that');
    }
}




function writeToLog(data) {
    fs.appendFile("log.txt", '\r\n\r\n');

    fs.appendFile("log.txt", JSON.stringify(data), function(err) {
        if (err) {
            return console.log(err);
        }

        console.log("log.txt was updated!");
    });
}

function  getTweets() {
  
    var params = {
        screen_name: 'bpeace71'
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        //checks if there is an error, logs tweets if not error found 
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log('\n > ' + tweets[i].created_at + ': ' + tweets[i].text);
            }
            goBack();
        }
        //logs error
        else {
            console.log(error);
        }
    });

};


function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        console.log(data);
        writeToLog(data);
        var dataArr = data.split(',')

        if (dataArr.length == 2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length == 1) {
            pick(dataArr[0]);
        }

    });
}

