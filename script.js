const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Disable/Enable Button
function toggleButton(){
    button.disabled = !button.disabled;
}

//Passing Joke to VoiceRSS API
function tellMe(joke){
    VoiceRSS.speech({
        key: 'your API key',
        src: jokeString,
        hl:'en-us',
        r: 0,
        c:'mp3',
        f:'44khz_16bit_stereo',
        ssml:false
    });
}

//Get Jokes from Koke API
async function getJokes(){
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist&idRange=0-185';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        tellMe(joke);
        //Disable Button
        toggleButton();
    } catch(error){
        //Catch Errors Here
    }
}

//Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
