//load Screen Start
$(window).on("load", function () {
    $(".loader-wrapper").fadeOut(2000);
});
//load screen End

let movies = [];
let allMovies = [];

//Fetch movies function
function getMovies() {
    movies = []
    fetch('https://silk-admitted-crow.glitch.me/movies')
        .then((response) => response.json())
        .then(async data => {
            let updatedMovieData = await addMoviePoster(data);
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
    if (searchItem.length > 0) {
        movies = movies.filter(item =>
            item.title.toLowerCase().includes(searchItem.toLowerCase()) || item.genre.toLowerCase().includes(searchItem.toLowerCase()))
        displayMovies(movies)
    } else {
        movies = allMovies;
        displayMovies(movies);
    }
})

//Sort function
$('#sortArea').on("change", (e) => {
    let value = e.target.value;
    let sorted = movies.sort((a, b) => {
        if (value == "title") {
            return a.title > b.title ? 1 : -1
        } else if (value == "rating") {
            return a.rating < b.rating ? 1 : -1
        } else if (value == "genre") {
            return a.genre > b.genre ? 1 : -1
        }
    })
    sorted = movies
    displayMovies(sorted);
})

// Display Movies function + Button functionality
function displayMovies(data) {
    let mainContainer = document.getElementById("movie");
    $("#movie").empty()
    for (let i = 0; i < data.length; i++) {
        let poster = data[i].poster ? data[i].poster : "css/PopCorn.png"
        let html = '';
        html += `<div class="card htmlCard col-lg-4 p-0 my-2" id=${data[i].id}>
  <img src=${poster} class="card-img-top rounded" alt="">
  <div class="card-body">
    <p class="card-text"> <p class="mb-4"><strong>Title:</strong> ${data[i].title} <br><strong>Rating:</strong>  ${data[i].rating}`
        html += data[i].genre ? `<br><strong>Genre:</strong>  ${data[i].genre}` : ''
        html += `</p><button class="dlt-button rounded px-3 py-1" id=${data[i].id} type=\"button\">Delete</button></p>
  </div>
</div>`;
        $("#movie").append(html);
    }

    let dltBtn = document.querySelectorAll('.dlt-button');
    for (i of dltBtn) {
        i.addEventListener('click', function () {
            deleteMovie(this.id)
        });
    }
}

// deleteMovie function
function deleteMovie(x) {
    fetch(`https://silk-admitted-crow.glitch.me/movies/` + x, {
        method: 'DELETE',
    }).then(res => {
        getMovies()
    })
}

//Submit Add Movie Form
let z = document.getElementById('submitForm')
z.addEventListener('click', function (e) {
    e.preventDefault();
    const movieR = $('#movieRating').find(":selected").val();
    let movieT = document.querySelector('#movieTitle').value
    postMovie(movieT, movieR)
    document.querySelector("#form").reset()
    setTimeout(function () {
        getMovies()
    }, 1500)
});

// Post Method
function postMovie(title, rating) {
    fetch('https://silk-admitted-crow.glitch.me/movies/', {
        method: 'POST',
        body: JSON.stringify({
            title,
            rating: parseInt(rating)
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
}

//modal
const mySelect = document.getElementById('movieEdit')
mySelect.addEventListener('change', (e) => {
    const id = $('#movieEdit').find(":selected").val();
    const selectedMovie = movies.find(movie => movie.id == id)
    const sameId = document.getElementById('movieId')
    const myNewTitle = document.getElementById('movieTitleEdit')
    sameId.value = (selectedMovie.id)
    myNewTitle.value = (selectedMovie.title)
    $('#movieRatingEdit').val(selectedMovie.rating);
    let myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
        keyboard: false
    })
    myModal.show()
})
//end of Modal

// Start Edit & Patch Method
//Edit function
function editMovieList(data) {
    let select = document.getElementById("movieEdit")
    $("#movieEdit").empty();

    let currentOption = document.createElement("option")
    currentOption.textConten = "Click to Select";
    select.appendChild(currentOption);
    for (let i = 0; i < data.length; i++) {
        let currentOption = document.createElement("option")
        currentOption.textContent = data[i].title
        currentOption.value = data[i].id
        select.appendChild(currentOption)
    }
}

//End of Edit function

//Patch Function
let patch = document.getElementById('changes')
patch.addEventListener('click', function (e) {
    e.preventDefault();
    let movieEditRating = document.querySelector('#movieRatingEdit').value
    let movieEditTitle = document.querySelector('#movieTitleEdit').value
    let movieEditId = document.querySelector('#movieId').value
    moviePatch(movieEditId, movieEditTitle, movieEditRating)
    setTimeout(function () {
        getMovies()
    }, 1000)
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
        if (omdbData && omdbData.Response.toLowerCase() === 'true') {
            data[i].poster = omdbData.Poster
            data[i].genre = omdbData.Genre
        }
    }
    return data;
}

//end of moviePoster request



