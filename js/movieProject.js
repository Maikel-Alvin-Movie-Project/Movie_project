//https://silk-admitted-crow.glitch.me/movies

fetch('https://silk-admitted-crow.glitch.me/movies')
    .then((response) => response.json())
    .then( data => {
        console.log(data);
        displayMovies(data);
    });
function displayMovies(data){
        let mainContainer = document.getElementById("movie");
        for (let i = 0; i < data.length; i++){
                let div = document.createElement("div");
                div.innerHTML = 'Title: ' + data[i].title + '<br>Rating: ' + data[i].rating;
                mainContainer.appendChild(div);
        }
}
