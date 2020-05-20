# liri-node-app

### Overview

The purpose of this app is to facilite user access to various multi-media sources including: [Spotify](https://www.spotify.com) for music, [IMDb](https://www.imdb.com) for movies and [Bands In Town](https://www.artists.bandsintown.com) for upcoming concerts.   It is hoped that this app will be of use to users as they pass time at home during the coronavirus shelter-in-place period and beyond.

In addition to the purpose mentioned above, the exercise of creating `liri-node-app` has provided me, Steven Bowler, with the opportunity to develop all of the code shown in the repository and to integrate the use of different API technologies such as [Spotify API](https://www.npmjs.com/package/node-spotify-api), [IMDb API](https://www.omdbapi.com) and [Bands In Town API](https://www.artists.bandsintown.com/bandsintown-api) with multiple technologies available thru [Node Package Manager](https://www.npmjs.com/), `NPM`.  The technologies integrated thru `NPM` are [Moment](https://www.npmjs.com/package/moment), to manage time stamps on transactions; [fs](https://www.npmjs.com/package/fs), to handle storage and retrieval of data from local text files; [JSDoc](https://www.npmjs.com/package/jsdoc), to provide a clean summary and documentation of the code in `liri-node-app`; [Axios](https://www.npmjs.com/package/axios), to make calls to the APIs mentioned above; [dotenv](https://www.npmjs.com/package/dotenv), to protect spotify client and secret keys once the `liri-node-app` is deployed.

### User Documentation

User will need to create `.env` file and store personal `SPOTIFY_ID` and personal `SPOTIFY_SECRET` as shown in the following:
````
SPOTIFY_ID=your_spotify_id
SPOTIFY_SECRET=your_spotify_secret
````

To best understand the app functionality, please first watch the following video: _*[liri-node-app](https://drive.google.com/file/d/10E7WnFGT-kwfidCYFJF2rwrz3oOCrV8y/view)*_.

To run `liri-node-app` the user must follow these steps:

1. Access the command line interpreter to run `liri-node-app`.
2. Go to the directory where `liri.js` is located.
3. Enter `node liri Argument1 "Argument2"`
4. Where `Argument1` must be one of either `movie-this`, `concert-this`, `spotify-this-song`, or `do-what-it-says`.
    1. `movie-this` expects `Argument2` will be a movie name in quotes like `"The Sting"`.
    2. `concert-this` expects `Argument2` will be a concert artist name in quotes like `"Celine Dion"`.
    3. `spotify-this-song` expects `Argument2` will be a song name in quotes like `"All The Small Things"` or `"The Sign"`.
    4. `do-what-it-says` will not look for Argument2 rather will open `random.txt` and use the command found in that file.


Example input and output with `movie-this`
````
$ node liri movie-this "The Sting"

movie-this The Sting Sun Mar 29 2020 19:02:30 GMT-0500
The Sting summary as follows:
Year: 1973
IMDB rating: 8.3
Rotten Tomatoes: 83
Country: USA
Language: English
Plot: Two grifters team up to pull off the ultimate con.
Actors: Paul Newman, Robert Redford, Robert Shaw, Charles Durning
Content Added to log.txt
````

Example input and output with `concert-this`
````
$ node liri concert-this "Celine Dion"

concert-this Celine Dion Sun Mar 29 2020 19:00:29 GMT-0500
Celine Dion next concert:
Date: 03/29/2020
Venue: Gila River Arena
City: Glendale
Region: AZ
Content Added to log.txt
````

Example input and output with `spotify-this-song`
````
$ node liri spotify-this-song 'All the Small Things'

spotify-this-song All the Small Things Sun Mar 29 2020 19:01:39 GMT-0500
Song: All the Small Things
Band/Artist: blink-182
Link to song: https://open.spotify.com/artist/6FBDaR13swtiWwGhX1WQsP
Album: Enema Of The State
Content Added to log.txt
````

Example input and output with `do-what-it-says` which will take `Argument1` and `Argument2` from `random.txt`.
````
$ node liri do-what-it-says
spotify-this-song,"All The Small Things"
[ 'spotify-this-song', '"All The Small Things"' ]


spotify-this-song All The Small Things Sun Mar 29 2020 19:35:33 GMT-0500
Song: All The Small Things
Band/Artist: blink-182
Link to song: https://open.spotify.com/artist/6FBDaR13swtiWwGhX1WQsP
Album: Enema Of The State
Content Added to log.txt
````

As noted in the examples above, in each case, any output from the above commands will be echoed to the console and appended to the bottom of the file `log.txt` which is located in the same directory as `liri.js`.



### Code Organization and Documentation

The app is documented in JS docs.  Documentation of global variables can be accessed [here](https://stevenbowler.github.io/liri-node-app/docs/global.html).  Listing of code can be accessed [here](https://stevenbowler.github.io/liri-node-app/docs/liri.js.html).

The program enters at `mainEntry();` which contains a switch statement that expects one of 4 inputs from command line third argument:
1. `movie-this` calls `movieThis()` to log movie name, year, rating, actors, plot to console and log.txt
2. `concert-this` calls `concertThis()` to log artist, venue, date of the artist's next concert to console and log.txt
3. `spotify-this-song` calls `spotifyThisSong` to log artist, song, album, link to song, to console and log.txt
4. `do-what-it-says` calls `doWhatItSays` to log item 1, 2, 3 info as called out in file random.txt

Link to the repository [here](https://github.com/stevenbowler/liri-node-app/), wherein can be found the file `liri.js`





