const movieListEl = document.querySelector('.movie__list');
const searchResultsEl = document.querySelector('.search__results--response');
const headerEl = document.querySelector('#header__top');

async function renderMovies(filter, search) {
  movieListEl.classList += ' movie__loading';
  const movies = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=c5a8f649&s=${search}`);
  movieListEl.classList.remove('movie__loading');
  const moviesData = await movies.json();

  if (moviesData.Search) {
    if (filter === 'NEWEST_TO_OLDEST') {
      moviesData.Search.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
    } else if (filter === 'OLDEST_TO_NEWEST') {
      moviesData.Search.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
    }

    movieListEl.innerHTML = moviesData.Search.map((movie) => moviesHTML(movie)).join('');
    headerEl.scrollIntoView({ behavior: 'smooth'});
  } else {
  }
}

function onSearchChange(event) {
  const search = event.target.value;
  searchResultsEl.innerHTML = search;
  renderMovies('', search);
}

function filterMovies(event) {
  const filter = event.target.value;
  const search = searchResultsEl.innerHTML;
  renderMovies(filter, search);
}

function moviesHTML(movie) {
  return `
    <div class="movie__card">
        <div class="movie__card--container">
        <img src="${movie.Poster}" class="movie__poster" alt="This image is unavailable.">
        <div class="movie__description">
          <h3 class="movie__title">${movie.Title}</h3>
          <p class="movie__year"><b></b>${movie.Year}</p>
        </div>
        </div>
      </div>`;
}

setTimeout(() => {
  renderMovies('', ''); 
});

