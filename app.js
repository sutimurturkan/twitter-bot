// Initialize twit and file system modules
var Twit = require('twit');
var fs = require('fs');

// Enter your unique API keys
var TWIT_CONSUMER_KEY = '';
var TWIT_CONSUMER_SECRET = '';
var TWIT_ACCESS_TOKEN = '';
var TWIT_ACCESS_TOKEN_SECRET = '';

// Data file
var DATA = "data.txt";

// Set search key
var SEARCH_KEY = '#javascript';

// Max no of tweets
var MAX = 10;

// Do not make the time too short
var TIMER = 5*60*60*1000; // 5 hrs

// Twit lib
var Bot = new Twit({
  consumer_key: TWIT_CONSUMER_KEY,
  consumer_secret: TWIT_CONSUMER_SECRET,
  access_token: TWIT_ACCESS_TOKEN,
  access_token_secret: TWIT_ACCESS_TOKEN_SECRET
});

function BotStart() {

  var query = {
    q: SEARCH_KEY,
    result_type: "recent",
    lang: 'en',
    count: MAX
  }

  console.log("> Running Twitter Bot...")

  Bot.get('search/tweets', query, QueryResults);

  function QueryResults (error, data, response) {
    if (error) {
      console.log('Could not find tweets matching the search key: ' + error);
    }
    else {

      // Tweet database
      var tweets = [];

      fs.readFile(DATA, 'utf8', function (err, fileData) {
        if (!err) {
          fileData = fileData.trim();
          if (fileData != "") {
            tweets = fileData.split("\n");
          }

          var processed = [];

          for (var i = 0; i < data.statuses.length; i++) {

            // Tweet id
            var id = data.statuses[i].id_str;

            // User id and handle
            var userId = data.statuses[i].user.id_str;
            var userHandle = data.statuses[i].user.screen_name;

            // If id not on db, process
            if (tweets.indexOf(id) == -1) {

              processed.push(id);

              fs.appendFile(DATA, id + "\n", function (err) {
                if (err) {
                  console.log("Error occured while saving'" + DATA + "' file.");
                }
                });

              // Like
              Bot.post('favorites/create', {id: id}, function(err, response){
                    if (err) {
                       console.log("> Error: Tweet " + id + " could not be liked. " + err);
                    }
                });
            }
          }

          // Log of processed tweets
          if (processed.length > 0) {
            console.log("> Tweets processed: " + processed);
          }
          else {
            console.log("> No tweets were processed.");
          }

        }
      });

    }

  }

}

// Start bot and timer
BotStart();
setInterval(BotStart, TIME);

