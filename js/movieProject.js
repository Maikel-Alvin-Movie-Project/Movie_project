//https://silk-admitted-crow.glitch.me/movies

fetch('https://silk-admitted-crow.glitch.me/movies')
    .then((response) => response.json())
    .then((json) => console.log(json));