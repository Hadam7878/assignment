import { Save, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { movieImageOptions } from '../data/movieAssets'

const emptyMovie = {
  name: '',
  description: '',
  originalPrice: '',
  currentPrice: '',
  image: movieImageOptions[0],
  genre: '',
  duration: '',
  year: new Date().getFullYear(),
  rating: 'G',
  director: '',
  curatorNote: '',
}

function validateMovie(values) {
  const errors = {}
  const originalPrice = Number(values.originalPrice)
  const currentPrice = Number(values.currentPrice)

  if (!values.name.trim()) {
    errors.name = 'Movie name is required.'
  }
  if (!values.description.trim()) {
    errors.description = 'Description is required.'
  }
  if (!values.genre.trim()) {
    errors.genre = 'Genre is required.'
  }
  if (!values.image) {
    errors.image = 'Please choose a poster image.'
  }
  if (!Number.isFinite(originalPrice) || originalPrice <= 0) {
    errors.originalPrice = 'Original price must be greater than 0.'
  }
  if (!Number.isFinite(currentPrice) || currentPrice <= 0) {
    errors.currentPrice = 'Current price must be greater than 0.'
  }
  if (currentPrice > originalPrice) {
    errors.currentPrice = 'Current price cannot be higher than original price.'
  }

  return errors
}

function MovieForm({ mode = 'create', initialMovie, loading, apiError, onSubmit }) {
  const [values, setValues] = useState(emptyMovie)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialMovie) {
      setValues({
        ...emptyMovie,
        ...initialMovie,
      })
    }
  }, [initialMovie])

  const previewAlt = useMemo(
    () => `${values.name || 'Selected movie'} poster preview`,
    [values.name],
  )

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateMovie(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    onSubmit({
      ...values,
      originalPrice: Number(values.originalPrice),
      currentPrice: Number(values.currentPrice),
      year: Number(values.year) || new Date().getFullYear(),
    })
  }

  return (
    <form className="movie-form" onSubmit={handleSubmit} noValidate>
      <div className="form-preview">
        <img src={values.image} alt={previewAlt} />
        <p>{mode === 'create' ? 'New frame' : 'Editing frame'}</p>
      </div>

      <div className="form-grid">
        <label>
          Product name
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Umbrellas"
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </label>

        <label>
          Genre
          <input
            name="genre"
            value={values.genre}
            onChange={handleChange}
            placeholder="Hand-drawn fantasy"
          />
          {errors.genre && <span className="field-error">{errors.genre}</span>}
        </label>

        <label className="form-wide">
          Description
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="Write a short cinematic description..."
            rows="5"
          />
          {errors.description && (
            <span className="field-error">{errors.description}</span>
          )}
        </label>

        <label>
          Original price
          <input
            name="originalPrice"
            type="number"
            min="0"
            value={values.originalPrice}
            onChange={handleChange}
            placeholder="89000"
          />
          {errors.originalPrice && (
            <span className="field-error">{errors.originalPrice}</span>
          )}
        </label>

        <label>
          Current price
          <input
            name="currentPrice"
            type="number"
            min="0"
            value={values.currentPrice}
            onChange={handleChange}
            placeholder="49000"
          />
          {errors.currentPrice && (
            <span className="field-error">{errors.currentPrice}</span>
          )}
        </label>

        <label>
          Duration
          <input
            name="duration"
            value={values.duration}
            onChange={handleChange}
            placeholder="18 min"
          />
        </label>

        <label>
          Release year
          <input
            name="year"
            type="number"
            min="1900"
            max="2100"
            value={values.year}
            onChange={handleChange}
          />
        </label>

        <label>
          Rating
          <select name="rating" value={values.rating} onChange={handleChange}>
            <option value="G">G</option>
            <option value="PG">PG</option>
            <option value="PG-13">PG-13</option>
          </select>
        </label>

        <label>
          Director
          <input
            name="director"
            value={values.director}
            onChange={handleChange}
            placeholder="Artist name"
          />
        </label>

        <label className="form-wide">
          Poster image
          <select name="image" value={values.image} onChange={handleChange}>
            {movieImageOptions.map((image) => (
              <option key={image} value={image}>
                {image.replace('/', '')}
              </option>
            ))}
          </select>
          {errors.image && <span className="field-error">{errors.image}</span>}
        </label>

        <label className="form-wide">
          Curator note
          <textarea
            name="curatorNote"
            value={values.curatorNote}
            onChange={handleChange}
            placeholder="A small note for the viewer..."
            rows="3"
          />
        </label>
      </div>

      {apiError && <p className="form-error">{apiError}</p>}

      <div className="form-actions">
        <button className="primary-button" type="submit" disabled={loading}>
          <Save size={18} aria-hidden="true" />
          {loading ? 'Saving...' : mode === 'create' ? 'Add movie' : 'Save edit'}
        </button>
        <Link className="ghost-button" to="/movies">
          <X size={18} aria-hidden="true" />
          Cancel
        </Link>
      </div>
    </form>
  )
}

export default MovieForm
