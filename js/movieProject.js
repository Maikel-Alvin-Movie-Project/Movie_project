// //Datetime
// const timeElement = document.getElementById('time');
// const dateElement = document.getElementById('date');
//
// const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
// const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
//
// //Interval function Updates every 1 min
// setInterval(() => {
//     // Declarations
//     const time = new Date();
//     const month = time.getMonth();
//     const date = time.getDate();
//     const day = time.getDay();
//     const hour = time.getHours();
//     const hoursIn12HrFormat = hour >= 13 ? hour % 12: hour
//     const minutes = time.getMinutes();
//     const ampm = hour >=12 ? 'PM' : 'AM'
//
//     //Time Element
//     timeElement.innerHTML = hoursIn12HrFormat + ":" + (minutes>=9 ? minutes:"0" + minutes) +  " " + ampm
//     //Date Element
//     dateElement.innerHTML = `${days[day]}, ${date} ${months[month]}`
// }, 1000)
//
// //Datetime ends

//https://silk-admitted-crow.glitch.me/movies

//load Screen Start
$(window).on("load",function(){
    $(".loader-wrapper").fadeOut(2000);
});
//load screen End

let movies = [];
let allMovies = [];

//Fetch movies function
function getMovies () {
    movies = []
    fetch('https://silk-admitted-crow.glitch.me/movies')
        .then((response) => response.json())
        .then(async data => {
            // console.log();
            let updatedMovieData = await addMoviePoster(data);
            console.log(updatedMovieData);
            movies = updatedMovieData;
            allMovies = [...movies];
            displayMovies(updatedMovieData);
            editMovieList(updatedMovieData);
        });
}
getMovies();

//Search function
$('#searchBox').on("input", (e) => {
    let searchItem = e.target.value;
    if (searchItem.length > 0){
    movies = movies.filter(item =>
        item.title.toLowerCase().includes(searchItem.toLowerCase()) || item.genre.toLowerCase().includes(searchItem.toLowerCase()))
    displayMovies(movies)
    } else {
        movies = allMovies;
        displayMovies(movies);
    }
})

//sortFunction
$('#sortArea').on("change", (e) => {
    let value = e.target.value;
    console.log(value);
    let sorted = movies.sort((a,b) => {
        if (value == "title"){
            return a.title > b.title ? 1 : -1
        } else if (value  == "rating"){
            return a.rating < b.rating ? 1 : -1
        } else if (value == "genre"){
            return a.genre > b.genre ? 1 : -1
        }
    })
    sorted = movies
    console.log(sorted);
    displayMovies(sorted);
})

// Display Movies function + Button functionality
function displayMovies(data){
        let mainContainer = document.getElementById("movie");
        $("#movie").empty()
        for (let i = 0; i < data.length; i++){
            let poster = data[i].poster ? data[i].poster: "css/PopCorn.png"

            let html = '';
            html += `<div class="card htmlCard col-lg-4 p-0 my-2" id=${data[i].id}>
  <img src=${poster} class="card-img-top rounded" alt="">
  <div class="card-body">
    <p class="card-text"> <p class="mb-4"><strong>Title:</strong> ${data[i].title} <br><strong>Rating:</strong>  ${data[i].rating}`

            html += data[i].genre ? `<br><strong>Genre:</strong>  ${data[i].genre}`:''
            html += `</p><button class="dlt-button rounded px-3 py-1" id=${data[i].id} type=\"button\">Delete</button></p>
  </div>
</div>`;

            $("#movie").append(html);
        }

    let dltBtn = document.querySelectorAll('.dlt-button');
    for (i of dltBtn) {
        i.addEventListener('click', function() {
            console.log(this.id);
            deleteMovie(this.id)
        });
    }
}

// deleteMovie function
function deleteMovie(x) {
    console.log(x);
    fetch(`https://silk-admitted-crow.glitch.me/movies/` + x, {
        method: 'DELETE',
    }).then(res => {
        console.log(res.status)
        getMovies()
    })
}

//Submit Add Movie Form
let z = document.getElementById('submitForm')
console.log(z);
z.addEventListener('click', function (e){
    e.preventDefault();
    console.log(e);
    const movieR = $('#movieRating').find(":selected").val();
    // let movieR = document.querySelector('#movieRating').value
    let movieT = document.querySelector('#movieTitle').value
    // let movieG = document.querySelector('#movieGenre').value
    postMovie(movieT, movieR)
    document.querySelector("#form").reset()
    setTimeout(function (){
        getMovies()
    }, 1500)

    console.log(e);
});

// Post Method
function postMovie(title, rating) {
    // console.log(t);
    fetch('https://silk-admitted-crow.glitch.me/movies/', {
    method: 'POST',
    body: JSON.stringify({
        title,
        rating: parseInt(rating)
        // genre,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        // $('#movies').remove()
    })
}

//modal
const mySelect = document.getElementById('movieEdit')
mySelect.addEventListener('change', (e) =>{
    const id = $('#movieEdit').find(":selected").val();
    const selectedMovie = movies.find(movie => movie.id == id)
    const sameId = document.getElementById('movieId')
    const myNewTitle = document.getElementById('movieTitleEdit')
    const addGenre = document.getElementById('movieGenreEdit')
    sameId.value = (selectedMovie.id)
    myNewTitle.value = (selectedMovie.title)
    $('#movieRatingEdit').val(selectedMovie.rating);
    addGenre.value = (selectedMovie.genre ? selectedMovie.genre:'')
    let myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
        keyboard: false
    })
    myModal.show()
})
//end of Modal

// Start Edit & Patch Method
//Edit function
function editMovieList(data){
    let select = document.getElementById("movieEdit")
    $("#movieEdit").empty();

    let currentOption = document.createElement("option")
    currentOption.textConten = "Click to Select";
    select.appendChild(currentOption);
    for (let i = 0; i < data.length; i++){
        let currentOption = document.createElement("option")
        currentOption.textContent = data[i].title
        currentOption.value = data[i].id
        select.appendChild(currentOption)
    }
}
//End of Edit function

//Patch Function
let patch = document.getElementById('changes')
console.log(patch);
patch.addEventListener('click', function (e){
    e.preventDefault();
    console.log(e);
    let movieEditRating = document.querySelector('#movieRatingEdit').value
    let movieEditTitle = document.querySelector('#movieTitleEdit').value
    let movieEditId = document.querySelector('#movieId').value
    let movieGenre = document.querySelector('#movieGenreEdit').value
    moviePatch(movieEditId, movieEditTitle, movieEditRating, movieGenre)
    setTimeout(function (){
        getMovies()
    }, 1000)
    console.log(e);
});

function moviePatch(id, title, rating, genre) {
    fetch('https://silk-admitted-crow.glitch.me/movies/' + id, {
        method: 'PATCH',
        body: JSON.stringify({
            title,
            rating,
            genre,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
}
//Patch & edit Movie Method

//start of moviePoster request
function omdbInfo(title) {
    return new Promise((resolve, reject) => {


        fetch('https://omdbapi.com/?apikey=33246cb9&t=' + title, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((json) => resolve(json));
    })
}
async function addMoviePoster(data) {
    for (let i = 0; i < data.length; i++) {
        let omdbData = await omdbInfo(data[i].title)
        if (omdbData && omdbData.Response.toLowerCase() === 'true'){
            data[i].poster = omdbData.Poster
            data[i].genre = omdbData.Genre
        }
    }
    return data;
}
//end of moviePoster request



