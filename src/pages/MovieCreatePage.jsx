import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MovieForm from '../components/MovieForm'
import { addMovie } from '../features/movies/movieSlice'

function MovieCreatePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { mutationStatus, mutationError } = useSelector((state) => state.movies)

  async function handleSubmit(movie) {
    const result = await dispatch(addMovie(movie))

    if (addMovie.fulfilled.match(result)) {
      navigate(`/movies/${result.payload.id}`)
    }
  }

  return (
    <main className="page-shell form-page">
      <section className="page-heading">
        <p className="eyebrow">create record</p>
        <h1>Add a new animated film.</h1>
        <p>
          Controlled form fields send a POST request to JSON Server and update
          the Redux product list immediately.
        </p>
      </section>

      <MovieForm
        mode="create"
        loading={mutationStatus === 'loading'}
        apiError={mutationError}
        onSubmit={handleSubmit}
      />
    </main>
  )
}

export default MovieCreatePage
