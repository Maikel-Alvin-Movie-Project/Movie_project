//https://silk-admitted-crow.glitch.me/movies

function getMovies () {
    fetch('https://silk-admitted-crow.glitch.me/movies')
        .then((response) => response.json())
        .then(data => {
            // console.log(data);
            displayMovies(data);
        });
}

getMovies();

$("#form").submit(function(e) {
    e.preventDefault();
});

function displayMovies(data){
        let mainContainer = document.getElementById("movie");
        for (let i = 0; i < data.length; i++){

            let html = '';
            html += `<div id=${data[i].id}>` + "<strong>Title:</strong> " + data[i].title + " <br><strong>Rating:</strong> " + data[i].rating + `</div><button id=${data[i].id} type=\"button\">Click Me!</button><br><br>`;

            $("#movie").append(html);
        }

    let btns = document.querySelectorAll('button');
    for (i of btns) {
        i.addEventListener('click', function() {
            console.log(this.id);
            deleteMovie(this.id)
        });
    }
}

// $('button').on('click', function (e) {
//     console.log(e)
// })

function formSubmit (formTitle, formRating){
    postMovie(formTitle, formRating);
}
// Post Method
function postMovie(title, rating) {
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
        $('#movies').remove()
    })
}


// Delete Method
function deleteMovie(x) {
    console.log(x);
fetch(`https://silk-admitted-crow.glitch.me/movies/` + x, {
    method: 'DELETE',
}).then(res => {
    console.log(res.status)
    getMovies()
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