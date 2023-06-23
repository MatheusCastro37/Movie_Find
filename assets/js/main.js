const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzkwOWEzYmUyNWNiNDMxOWVjNGUzNzU0NmYyZmE3YiIsInN1YiI6IjY0OGNjMGQ4YzJmZjNkMDBjNTk5M2YwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MfHEB0EWv1-fAX9y_fJ5bM_qg51-BfHbkeHRQ2GwS3U'
    }
};

function findMovie() {
    const nameMovie = document.querySelector('#Movie').value
    const url = `https://api.themoviedb.org/3/search/movie?query=${nameMovie}&include_adult=true&language=pt-BR`

  fetch(url, options)
    .then(response => response.json())
    .then(listMovies => listMovies.results[0])
    .then(idMovie => idMovie.id)
    .then(DetailsMovie)
    .catch(verificarErro);
}

function DetailsMovie(detailsMovie) {
  const url =`https://api.themoviedb.org/3/movie/${detailsMovie}?language=pt-BR`
  fetch(url, options)
    .then(response => response.json())
    .then(showDetailsMovie)
}

function showDetailsMovie(details) {
  let detailsOfMovie = new Details()
  detailsOfMovie.titulo = details.title
  detailsOfMovie.poster = details.poster_path
  detailsOfMovie.nota = details.vote_average.toFixed(1)
  detailsOfMovie.generos = details.genres.map(g => g)
  detailsOfMovie.anoLancamento = details.release_date
  detailsOfMovie.minutagem = details.runtime
  detailsOfMovie.sinopse = details.overview

  const container = document.querySelector('#showMovie')

  container.innerHTML = `
    <section class="infos">
      <img id="posterMovie" src="https://image.tmdb.org/t/p/w500${detailsOfMovie.poster}" alt="Poster do filme ${detailsOfMovie.titulo}.">
      <div class="infosMovie">
          <h4 id="movieTitle">${detailsOfMovie.titulo}</h4>
          <h5 id="movieScore"><i class="fa-solid fa-star"></i>${detailsOfMovie.nota}</h5>
          <div id="genres">
            ${detailsOfMovie.generos.map(g => `<p class="type">${g.name}</p>`).join('')}
          </div>
      </div>
    </section>

    <section class="detailsMovie">
      <p id="yearLaunch">${detailsOfMovie.anoLancamento.slice(0,4)}</p>
      <p id="timeMovie">${detailsOfMovie.minutagem} Min</p>
    </section>

    <section id="plotMovie">
      <h5>Sinopse:</h5>
      <p>${detailsOfMovie.sinopse}</p>
    </section>
  `
}

function verificarErro() {
  const container = document.querySelector('#showMovie')
  container.innerHTML = `
    <div id="errorMovie">
      <img id="error404" src="assets/img/error404.png" alt="Erro">
      <p id="messageError">Filme não encontrado!</p>
    </div>
  `
}