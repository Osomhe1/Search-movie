import React,{useState, useEffect} from 'react'

function SearchMovies() {

    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])


    const searchMovies = async(e) =>{
        e.preventDefault();
        console.log("Submitting")
        const api_key = 'a0f1f6057234b63753542ad9f7ce93bb'

        const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&page=3&query=${query}&include_adult=true`

        try {
            const res = await fetch(url)
            const data = await res.json()
            console.log(data.results, 'first log')
            await setMovies(data.results)
            console.log(movies, 'second log')
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() =>{
      //  searchMovies();
      console.log( movies, 'movies');
    }, [movies]); 


  return (
    <div>
      <div>
        <form action='' className='form' onSubmit={searchMovies}>
          <label htmlFor='query' className='label'>
            Movie Name
          </label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type='text'
            name='query'
            placeholder='i.e Spider man'
          />
          <button type='submit' className='button'>
            Search
          </button>
        </form>
      </div>

      <div className='card-list'>
        {movies
          ? movies
              .filter((movie) => movie.poster_path)
              .map((movie) => (
                <div className='card' key={movie.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h3>{movie.title}</h3>
                  <p>
                    <small>RATING: {movie.vote_average}</small>
                  </p>
                  <p>
                    <small>REALEASE DATE: {movie.release_date}</small>
                  </p>

                  <p className='card--desc'>{movie.overview}</p>
                </div>
              ))
          : 'Nothing to show...'}
        
      </div>
    </div>
  )
}

export default SearchMovies