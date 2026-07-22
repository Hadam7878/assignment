import { Film, Plus, RefreshCcw, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import StateMessage from '../components/StateMessage'
import {
  deleteMovie,
  fetchMovies,
} from '../features/movies/movieSlice'

function MovieListPage() {
  const dispatch = useDispatch()
  const { items, status, error, mutationStatus, mutationError } = useSelector(
    (state) => state.movies,
  )
  const [query, setQuery] = useState('')

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  const filteredMovies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return items
    }

    return items.filter((movie) =>
      [movie.name, movie.description, movie.genre]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    )
  }, [items, query])

  function handleDelete(id) {
    const shouldDelete = window.confirm(
      'Remove this film from the 24frames archive?',
    )

    if (shouldDelete) {
      dispatch(deleteMovie(id))
    }
  }

  return (
    <main className="page-shell">
      <section className="archive-hero">
        <div>
          <p className="eyebrow">
            <Film size={17} aria-hidden="true" />
            main archive
          </p>
          <h1>Animated films for slow eyes.</h1>
          <p>
            Browse, add, edit, and remove the films in the 24frames collection.
            Every record is served from a JSON Server REST API.
          </p>
        </div>
        <Link className="primary-button" to="/movies/new">
          <Plus size={18} aria-hidden="true" />
          Add movie
        </Link>
      </section>

      <section className="toolbar" aria-label="Movie filters">
        <label className="search-box">
          <Search size={18} aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, genre, mood..."
          />
        </label>
        <button
          className="ghost-button"
          type="button"
          onClick={() => dispatch(fetchMovies())}
        >
          <RefreshCcw size={18} aria-hidden="true" />
          Refresh API
        </button>
      </section>

      {status === 'loading' && (
        <StateMessage
          title="Loading the archive..."
          message="The projector is warming up the API records."
        />
      )}

      {status === 'failed' && (
        <StateMessage title="API error" message={error} tone="danger" />
      )}

      {mutationError && (
        <StateMessage title="Action failed" message={mutationError} tone="danger" />
      )}

      {status === 'succeeded' && filteredMovies.length === 0 && (
        <StateMessage
          title="No films found"
          message="Try a different search or add a new animated film."
        />
      )}

      {status === 'succeeded' && filteredMovies.length > 0 && (
        <section className="movie-grid" aria-label="Movie product list">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onDelete={handleDelete}
              deleting={mutationStatus === 'loading'}
            />
          ))}
        </section>
      )}
    </main>
  )
}

export default MovieListPage
