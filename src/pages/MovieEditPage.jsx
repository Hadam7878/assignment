import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import MovieForm from '../components/MovieForm'
import StateMessage from '../components/StateMessage'
import {
  clearSelectedMovie,
  fetchMovieById,
  updateMovie,
} from '../features/movies/movieSlice'

function MovieEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    selectedMovie,
    selectedStatus,
    error,
    mutationStatus,
    mutationError,
  } = useSelector((state) => state.movies)

  useEffect(() => {
    dispatch(fetchMovieById(id))

    return () => {
      dispatch(clearSelectedMovie())
    }
  }, [dispatch, id])

  async function handleSubmit(movie) {
    const result = await dispatch(
      updateMovie({
        id,
        movie: {
          ...movie,
          id: selectedMovie?.id ?? id,
        },
      }),
    )

    if (updateMovie.fulfilled.match(result)) {
      navigate(`/movies/${result.payload.id}`)
    }
  }

  if (selectedStatus === 'idle' || selectedStatus === 'loading') {
    return (
      <main className="page-shell">
        <StateMessage
          title="Loading edit form..."
          message="Existing movie information is being pre-filled."
        />
      </main>
    )
  }

  if (selectedStatus === 'failed') {
    return (
      <main className="page-shell">
        <StateMessage title="Could not edit this film" message={error} tone="danger" />
      </main>
    )
  }

  return (
    <main className="page-shell form-page">
      <section className="page-heading">
        <p className="eyebrow">update record</p>
        <h1>Edit product details.</h1>
        <p>
          This route uses useParams for the movie id, pre-populates the form,
          sends a PUT request, then redirects back to detail.
        </p>
      </section>

      <MovieForm
        mode="edit"
        initialMovie={selectedMovie}
        loading={mutationStatus === 'loading'}
        apiError={mutationError}
        onSubmit={handleSubmit}
      />
    </main>
  )
}

export default MovieEditPage
