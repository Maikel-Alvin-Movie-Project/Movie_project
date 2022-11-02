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

                let html = '';
                html += `<div id=${data[i].id}>` + "<strong>Title:</strong> " + data[i].title + " <br><strong>Rating:</strong> " + data[i].rating + "</div>";
                $("#movie").append(html);
        }
}



// Post Method
function postMovie() {
fetch('https://silk-admitted-crow.glitch.me/movies/', {
    method: 'POST',
    body: JSON.stringify({
        title: 'LOTR',
        body: 'Movie # 4',
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then((response) => response.json())
    .then((json) => console.log(json));
}


// Delete Method
// fetch('https://silk-admitted-crow.glitch.me/movies', {
//     method: 'DELETE',
// }).then(res => console.log(res.status))




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