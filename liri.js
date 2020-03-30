//@ts-check
require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");


var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var title = process.argv[3];
// console.log(`command: ${command} title: ${title}`);



/**called from {@link movieThis}, {@link concertThis}, {@link spotifyThisSong}, output to log.txt file
 * @function appendLogTxt
 * @param {string} text
*/
const appendLogTxt = (text) => {
    fs.appendFile("log.txt", text, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Content Added to log.txt");
        }
    });
}



/** called from {@link main} based on {@link command}="concert-this", returns next concert related data to console
 * @function concertThis
 * @param {string} artistBand
*/
const concertThis = (artistBand) => {
    var tempArtistBand = artistBand.replace(" ", "+");
    // console.log(`artistBand: ${artistBand}`);
    var url = `https://rest.bandsintown.com/artists/${tempArtistBand}/events?app_id=codingbootcamp`;

    axios
        //@ts-ignore
        .get(url)
        .then(
            function (response) {
                var text = `\n\n${command} ${title} ${moment()}` +
                    `\n${artistBand} next concert: ` +
                    `\nDate: ${moment(response.data[0].datetime).format("MM/DD/YYYY")}` +
                    `\nVenue: ${response.data[0].venue.name}` +
                    `\nCity: ${response.data[0].venue.city}` +
                    `\nRegion: ${response.data[0].venue.region}`;
                console.log(text);
                appendLogTxt(text);
            }
        )
        .catch(
            function (err) {
                console.log(`NOTE: No event found, the band/artist name entered was "${artistBand}"`);
                // console.log(`err: ${err}`);
            }
        )
        ;
}



/** called from {@link main} based on {@link command}="movie-this", returns movie related data to the console
 * @function movieThis
 * @param {string} movieTitle
 */
const movieThis = (movieTitle) => {
    if (movieTitle === "") movieTitle = "Mr. Nobody";
    var tempMovieTitle = movieTitle.replace(" ", "+");
    var url = `http://www.omdbapi.com/?t=${tempMovieTitle}&y=&plot=short&apikey=trilogy`;
    axios
        //@ts-ignore
        .get(url)
        .then(
            function (response) {
                // console.log(response.data);
                var text = `\n\n${command} ${title} ${moment()}` +
                    `\n${movieTitle} summary as follows:` +
                    `\nYear: ${response.data.Year}` +
                    `\nIMDB rating: ${response.data.imdbRating}` +
                    `\nRotten Tomatoes: ${response.data.Metascore}` +
                    `\nCountry: ${response.data.Country}` +
                    `\nLanguage: ${response.data.Language}` +
                    `\nPlot: ${response.data.Plot}` +
                    `\nActors: ${response.data.Actors}`;
                console.log(text);
                appendLogTxt(text);
            }
        )
        .catch(function (err) {
            console.log(`NOTE: No movie found with this title: "${movieTitle}"`);
            console.log(err);
        });
}



/** called from {@link main} based on {@link command}=spotify-this-song returns song data from spotify
 * @function spotifyThisSong
 * @param {string} songTitle 
 */
const spotifyThisSong = (songTitle) => {
    if (songTitle === "") songTitle = "The Sign";
    spotify.search({ type: 'track', query: songTitle }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var text = `\n\n${command} ${title} ${moment()}` +
            `\nSong: ${songTitle}` +
            `\nBand/Artist: ${data.tracks.items[0].album.artists[0].name}` +
            `\nLink to song: ${data.tracks.items[0].album.artists[0].external_urls.spotify}` +
            `\nAlbum: ${data.tracks.items[0].album.name}`;
        console.log(text);
        appendLogTxt(text);
    });
}



/** called from {@link main} when {@link command}="do-what-it-says"
 * @function doWhatItSays
 */
const doWhatItSays = () => {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);
        command = dataArr[0];
        title = dataArr[1].replace(/"/g, '');
        // console.log(`command: ${command} title: ${title}`);
        main();

    });
}


const main = () => {
    switch (command) {
        case `concert-this`:
            concertThis(title);
            break;

        case `spotify-this-song`:
            spotifyThisSong(title);
            break;

        case `movie-this`:
            movieThis(title);
            break;

        case `do-what-it-says`:
            doWhatItSays();
            break;

        default: console.log(`Sorry, don't recognize this command: ${command}`); break;

    }
}

main();