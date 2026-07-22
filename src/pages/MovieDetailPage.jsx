import {
  ArrowLeft,
  Calendar,
  Clock,
  Pencil,
  Sparkles,
  Trash2,
} from 'lucide-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import StateMessage from '../components/StateMessage'
import { landingVideo } from '../data/movieAssets'
import {
  clearSelectedMovie,
  deleteMovie,
  fetchMovieById,
} from '../features/movies/movieSlice'
import { formatPrice } from '../utils/formatPrice'

function MovieDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { selectedMovie, selectedStatus, error, mutationStatus } = useSelector(
    (state) => state.movies,
  )

  useEffect(() => {
    dispatch(fetchMovieById(id))

    return () => {
      dispatch(clearSelectedMovie())
    }
  }, [dispatch, id])

  async function handleDelete() {
    const shouldDelete = window.confirm('Delete this film from the API?')

    if (!shouldDelete) {
      return
    }

    const result = await dispatch(deleteMovie(id))

    if (deleteMovie.fulfilled.match(result)) {
      navigate('/movies')
    }
  }

  if (selectedStatus === 'idle' || selectedStatus === 'loading') {
    return (
      <main className="page-shell">
        <StateMessage
          title="Loading film detail..."
          message="The frame is being pulled from the API."
        />
      </main>
    )
  }

  if (selectedStatus === 'failed') {
    return (
      <main className="page-shell">
        <StateMessage title="Could not load this film" message={error} tone="danger" />
      </main>
    )
  }

  if (!selectedMovie) {
    return (
      <main className="page-shell">
        <StateMessage
          title="No film selected"
          message="Return to the archive and choose a frame."
        />
      </main>
    )
  }

  return (
    <main className="detail-page">
      <section className="detail-poster">
        <img src={selectedMovie.image} alt={`${selectedMovie.name} poster`} />
      </section>

      <section className="detail-copy">
        <Link className="inline-back" to="/movies">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to archive
        </Link>

        <p className="eyebrow">
          <Sparkles size={17} aria-hidden="true" />
          {selectedMovie.genre}
        </p>
        <h1>{selectedMovie.name}</h1>
        <p className="detail-description">{selectedMovie.description}</p>

        <div className="detail-meta" aria-label="Movie metadata">
          <span>
            <Clock size={16} aria-hidden="true" />
            {selectedMovie.duration}
          </span>
          <span>
            <Calendar size={16} aria-hidden="true" />
            {selectedMovie.year}
          </span>
          <span>{selectedMovie.rating}</span>
          <span>{selectedMovie.director}</span>
        </div>

        <div className="watch-frame">
          <video
            src={landingVideo}
            controls
            poster={selectedMovie.image}
            aria-label={`${selectedMovie.name} preview video`}
          />
        </div>

        <blockquote>{selectedMovie.curatorNote}</blockquote>

        <div className="detail-price">
          <span className="old-price">
            {formatPrice(selectedMovie.originalPrice)}
          </span>
          <strong>{formatPrice(selectedMovie.currentPrice)}</strong>
        </div>

        <div className="detail-actions">
          <Link className="primary-button" to={`/movies/${selectedMovie.id}/edit`}>
            <Pencil size={18} aria-hidden="true" />
            Edit product
          </Link>
          <button
            className="ghost-button danger"
            type="button"
            onClick={handleDelete}
            disabled={mutationStatus === 'loading'}
          >
            <Trash2 size={18} aria-hidden="true" />
            {mutationStatus === 'loading' ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </section>
    </main>
  )
}

export default MovieDetailPage
