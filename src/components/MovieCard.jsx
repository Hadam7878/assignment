import { Eye, Pencil, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/formatPrice'

function MovieCard({ movie, onDelete, deleting }) {
  return (
    <article className="movie-card">
      <Link className="poster-link" to={`/movies/${movie.id}`}>
        <img src={movie.image} alt={`${movie.name} poster`} />
      </Link>

      <div className="movie-card-body">
        <div className="movie-card-kicker">
          <span>{movie.genre}</span>
          <span>{movie.duration}</span>
        </div>

        <h2>{movie.name}</h2>
        <p>{movie.description}</p>

        <div className="price-row" aria-label="Movie prices">
          <span className="old-price">{formatPrice(movie.originalPrice)}</span>
          <strong>{formatPrice(movie.currentPrice)}</strong>
        </div>

        <div className="card-actions">
          <Link className="icon-button" to={`/movies/${movie.id}`}>
            <Eye size={16} aria-hidden="true" />
            Detail
          </Link>
          <Link className="icon-button quiet" to={`/movies/${movie.id}/edit`}>
            <Pencil size={16} aria-hidden="true" />
            Edit
          </Link>
          <button
            className="icon-button danger"
            type="button"
            onClick={() => onDelete(movie.id)}
            disabled={deleting}
          >
            <Trash2 size={16} aria-hidden="true" />
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}

export default MovieCard
