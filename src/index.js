const url = "http://localhost:3000/api/v1"
let moodIndex
let movieIndex
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
      <img data-id="${mood.id}" src="${mood.image}" alt="">
      <h4 data-id="${mood.id}">${mood.name}</h4>
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
      <h4 data-id="${movie.id}">${movie.title}</h4>
    </div>
    `
  }
}



document.addEventListener("DOMContentLoaded", e => {
  moodIndex = document.querySelector('#mood-index')
  movieIndex = document.querySelector('#movie-index')
  apiGetMoods()
  apiGetMovies()

  moodIndex.addEventListener('click', e => {
    let moodId = e.target.dataset.id


    relevantMovies = findMoodById(moodId).movies
    movieIndex.innerHTML = ""
    indexMovies(relevantMovies)

    //unless the id of the movies has the id of the event target
    //hide the movies

    // for(let movie of allMovies){
    //   for (let mood of movie.moods){
    //     console.log(mood.id)
    //     if (mood. != moodId){
    //
    //     }
    //   }
    // }




    })






  })
