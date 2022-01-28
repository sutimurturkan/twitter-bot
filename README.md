# twitter-bot
A simple twitter bot with Node.js, just for fun.

* Functionality to ...

## Configuration

Create a Twitter app from [Twitter](https://apps.twitter.com/) and retrieve your API keys.

```javascript
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
```

Adjust your query:

```javascript
var query = {
    q: SEARCH_KEY,
    result_type: "recent",
    lang: 'en',
    count: MAX
  }
```
## Dependencies

* [Node](https://nodejs.org/en/)
* [Twit](https://github.com/ttezel/twit)

You can run this command to install all:

```
npm install
```

## Usage

Run the following command to start bot running

```
npm start
```




