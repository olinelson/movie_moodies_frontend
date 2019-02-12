const url = "http://localhost:3000/api/v1"

let moodIndex
let movieScrollIndex
let movieIndex
let movieShow
let allMovies = []
let allMoods = []
let searchResults = []
let header

// 
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
  .then(r => populateIndexAndScroll(r) )




}

function populateIndexAndScroll(movies){
  indexMovies(movies)
  indexScrollMovies(movies)
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
      <i data-id="${mood.id}" class="${mood.image}"></i>
      <h4 class="mood-name" data-id="${mood.id}">${mood.name}</h4>
    </div>

    `
  }

}

function indexScrollMovies(movies){
  for (let movie of movies){
    movieScrollIndex.innerHTML +=
    `
    <div data-id="${movie.id}" id="movie-card-${movie.id}" class="movie-card">
      <img data-id="${movie.id}" class="movie-image"  src="${movie.image}" alt="">
      <h4 class="movie-title" data-id="${movie.id}">${movie.title}</h4>
    </div>
    `
  }
}

function indexMovies(movies){
  movieScrollIndex.style.display = "none"
  movieShow.innerHTML = ""
  movieIndex.innerHTML = ""

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

function showMovie(movieId){

  movieIndex.innerHTML = ''
  movieScrollIndex.style.display = "flex"
  moodIndex.style.display = "none"

  movie = findMovieById(movieId)
  movieShow.innerHTML =
  `
    <div class = "movie-show-image">
    <img  src="${movie.image}" alt="">
    </div>
    <div class="movie-show-info">
    <h4>${movie.title}</h4>
    <p>${movie.description}</p>
    <p>${movie.length} minutes</p>
    </div>

  `
}


function homePageConfiguration() {
  movieScrollIndex.style.display = "none"
  moodIndex.style.display = "flex"
  movieShow.innerHTML = ""
  movieIndex.innerHTML = ""
  indexMovies(allMovies)
}


document.addEventListener("DOMContentLoaded", e => {

  moodIndex = document.querySelector('#mood-index')
  movieScrollIndex = document.querySelector('#movie-scroll-index')
  movieIndex = document.querySelector('#movie-index')
  movieShow = document.querySelector('#movie-show')
  header = document.querySelector('header')

  apiGetMoods()
  apiGetMovies()

  //header button
  header.addEventListener("click", e => {
    if (e.target.id === "header-title"){
      homePageConfiguration()
    }
  //

}) // end of header button


  moodIndex.addEventListener('click', e => {
    let moodId = e.target.dataset.id

    relevantMovies = findMoodById(moodId).movies
    indexMovies(relevantMovies)

  }) //end of mood listener

  movieScrollIndex.addEventListener('click', e => {
    let movieId = e.target.dataset.id

    showMovie(movieId)

  }) // end of movie index Listener

  movieIndex.addEventListener('click', e => {
    let movieId = e.target.dataset.id

    showMovie(movieId)

  }) // end of movie index Listener




}) //end of dom content loaded
