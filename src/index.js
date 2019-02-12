const url = "http://localhost:3000/api/v1"
let moodIndex
let movieIndex
let movieShow
let allMovies = []
let allMoods = []
let searchResults = []


function apiGetMoods(){
  fetch(`${url}/moods`)
  .then(r => {return  r.json()})
  .then(r => allMoods = r)
  .then(r => indexMoods(r))

}
function apiGetMovies(){
  fetch(`${url}/movies`)
  .then(r => {return  r.json()})
  .then(r => allMovies = r)
  .then(r => indexMovies(r))



}

function findMovieById(id){
  let found = allMovies.find(element => {
    return element.id == id
  })
  return found
}

function findMoodById(id) {
let found = allMoods.find(element => {
  return element.id == id
})
return found
}




function indexMoods(moods){
  for (let mood of moods){
    moodIndex.innerHTML +=
    `
    <div data-id="${mood.id}" id="mood-card-${mood.id}" class="mood-card">
      <img class="mood-image" data-id="${mood.id}" src="${mood.image}" alt="">
      <h4 class="mood-name" data-id="${mood.id}">${mood.name}</h4>
    </div>

    `
  }

}

function indexMovies(movies){
  for (let movie of movies){
    movieIndex.innerHTML +=
    `
    <div data-id="${movie.id}" id="movie-card-${movie.id}" class="movie-card">
      <img data-id="${movie.id}" class="movie-image"  src="${movie.image}" alt="">
      <h4 class="movie-title" data-id="${movie.id}">${movie.title}</h4>
    </div>
    `
  }
}

function displayMovie(movieId){
  movie = findMovieById(movieId)
  movieShow.innerHTML =
  `
  <div class="movie_show">
    <img class="movie-show-image" src="${movie.image}" alt="">
    <div class="movie-show-info">
    <h4>${movie.title}</h4>
    <p>${movie.description}</p>
    <p>${movie.length} minutes</p>
    </div>
  </div>
  `
}



document.addEventListener("DOMContentLoaded", e => {
  moodIndex = document.querySelector('#mood-index')
  movieIndex = document.querySelector('#movie-index')
  movieShow = document.querySelector('#movie-show')
  apiGetMoods()
  apiGetMovies()

  moodIndex.addEventListener('click', e => {
    let moodId = e.target.dataset.id


    relevantMovies = findMoodById(moodId).movies
    movieIndex.innerHTML = ""
    indexMovies(relevantMovies)

  }) //end of mood listener

  movieIndex.addEventListener('click', e => {
    let movieId = e.target.dataset.id
    movieIndex.innerHTML = ""

    displayMovie(movieId)

  }) // end of movie index Listener




}) //end of dom content loaded
