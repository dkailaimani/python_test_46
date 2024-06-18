const fetch = require('node-fetch');
const cryptoJS = require('crypto-js');

const privateKey = 'e37415f5b05ef78c2cc26550e622f35c3f5b8548';
const publicKey = '3d7c6c122667f21f281cc97984d75d21';

async function fetchMarvelCharacters() {
    const timeStampInMs = Date.now();
    const hashInput = timeStampInMs + privateKey + publicKey;
    const hash = cryptoJS.MD5(hashInput).toString();

    const apiUrl = `https://gateway.marvel.com/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${timeStampInMs}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.data.results;
    } catch (error) {
        console.error('Error fetching Marvel characters:', error);
        return null;
    }
}

fetchMarvelCharacters()
    .then(characters => {
        if (characters) {
            console.log('Marvel Characters:');
            console.log(characters);
        } else {
            console.log('Failed to fetch Marvel characters.');
        }
    })
    .catch(error => console.error('Error in fetching characters:', error));
