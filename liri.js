var keys = require('./keys.js');
var Twitter = require('twitter');
var LastFM = require('last-fm');

var getMyTweets = function() {

  var client = new Twitter(keys.twitterKeys);

  var params = {screen_name: 'pearlstockman'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      // console.log(tweets);
      for (var i = 0; i < tweets.length; i++) {
        console.log('\"' + tweets[i].text + '\"');
        console.log('-' + tweets[i].created_at);
        console.log('--------------------');
      }
    }
  });

}

var searchMusic = function(functionData) {
  var key = keys.lastFmKeys.api_key;

  // console.log(key);
  var lastfm = new LastFM(key, { userAgent: 'MyApp/1.0.0 (http://example.com)' })

  if (functionData == null) {
    var defaultSong = "The Sign";
    lastfm.trackSearch({ q: defaultSong }, (err, data) => {
      if (err) console.error(err)
      else console.log("Artist Name: " + data.result[2].artistName + "\n" + "Song Name: " + data.result[2].name + "\n")
    })
  }
  else {
    lastfm.search({ q: functionData }, (err, data) => {
      if (err) console.error(err)
      else console.log("Artist Name: " + data.result.top.artistName + "\n" + "Song Name: " + data.result.top.name + "\n")
    })
  }
}

var pick = function(caseData, functionData) {
  switch (caseData) {
    case 'show-tweets' :
      getMyTweets();
      break;
    case 'find-music' :
      searchMusic(functionData);
      break;
    default:
      console.log('LIRI does not know that');
  }
}

var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
