const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:3001/movies'

async function request(endpoint = '', options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const message =
      response.status === 404
        ? 'Movie not found in the 24frames archive.'
        : 'The archive API is not responding. Please make sure JSON Server is running.'
    throw new Error(message)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export const movieApi = {
  getMovies() {
    return request()
  },
  getMovie(id) {
    return request(`/${id}`)
  },
  createMovie(movie) {
    return request('', {
      method: 'POST',
      body: JSON.stringify(movie),
    })
  },
  updateMovie(id, movie) {
    return request(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(movie),
    })
  },
  deleteMovie(id) {
    return request(`/${id}`, {
      method: 'DELETE',
    })
  },
}
