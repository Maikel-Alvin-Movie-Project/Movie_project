//https://silk-admitted-crow.glitch.me/movies

//load Screen Start
$(window).on("load",function(){
    $(".loader-wrapper").fadeOut(2000);
});
//load screen End


//Fetch movies function
function getMovies () {
    fetch('https://silk-admitted-crow.glitch.me/movies')
        .then((response) => response.json())
        .then(data => {
            // console.log(data);
            displayMovies(data);
        });
} getMovies();


// Display Movies function + Button functionality
function displayMovies(data){
        let mainContainer = document.getElementById("movie");
        $("#movie").empty()
        for (let i = 0; i < data.length; i++){

            let html = '';
            html += `<div id=${data[i].id}>` + "<strong>Title:</strong> " + data[i].title + " <br><strong>Rating:</strong> " + data[i].rating + `</div><button class="dlt-button" id=${data[i].id} type=\"button\">Delete</button></div><button class="edit-button ms-1" id=${data[i].id} type=\"button\">Edit Title</button><br><br>`;

            $("#movie").append(html);
        }

    let dltBtn = document.querySelectorAll('.dlt-button');
    for (i of dltBtn) {
        i.addEventListener('click', function() {
            console.log(this.id);
            deleteMovie(this.id)
        });
    }

    let editBtn = document.querySelectorAll('.edit-button');
    for (i of editBtn) {
        i.addEventListener('click', function() {
            console.log(this.id);
            // *********************** Create function for editing title  ************************
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


//editTitle function




//Submit Add Movie Form
let z = document.getElementById('submitForm')
console.log(z);
z.addEventListener('click', function (e){
    e.preventDefault();
    console.log(e);
    let movieR = document.querySelector('#movieRating').value
    let movieT = document.querySelector('#movieTitle').value
    postMovie(movieT, movieR)
    setTimeout(function (){
        getMovies()
    }, 1000)
    console.log(e);
});


// Post Method
function postMovie(title, rating) {
    // console.log(t);
    fetch('https://silk-admitted-crow.glitch.me/movies/', {
    method: 'POST',
    body: JSON.stringify({
        title,
        rating,
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



//Patch Method
// fetch('https://silk-admitted-crow.glitch.me/movies', {
//     method: 'PATCH',
//     body: JSON.stringify({
//         title: 'foo',
//         rating: 5
//
//     }),
//     headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//     },
// })
//     .then((response) => response.json())
//     .then((json) => console.log(json));




//PUT Method
// fetch('https://silk-admitted-crow.glitch.me/movies', {
//     method: 'PUT',
//     body: JSON.stringify({
//         title: 'Movie#?3',
//         rating: 5
//
//     }),
//     headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//     },
// })
//     .then((response) => response.json())
//     .then((json) => console.log(json));