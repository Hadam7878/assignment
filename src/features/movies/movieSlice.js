import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { movieApi } from '../../api/movieApi'

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  return movieApi.getMovies()
})

export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (id) => {
    return movieApi.getMovie(id)
  },
)

export const addMovie = createAsyncThunk('movies/addMovie', async (movie) => {
  return movieApi.createMovie(movie)
})

export const updateMovie = createAsyncThunk(
  'movies/updateMovie',
  async ({ id, movie }) => {
    return movieApi.updateMovie(id, movie)
  },
)

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id) => {
  await movieApi.deleteMovie(id)
  return id
})

const initialState = {
  items: [],
  selectedMovie: null,
  status: 'idle',
  selectedStatus: 'idle',
  mutationStatus: 'idle',
  error: '',
  mutationError: '',
}

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearSelectedMovie(state) {
      state.selectedMovie = null
      state.selectedStatus = 'idle'
    },
    clearMutationStatus(state) {
      state.mutationStatus = 'idle'
      state.mutationError = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading'
        state.error = ''
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.selectedStatus = 'loading'
        state.error = ''
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.selectedStatus = 'succeeded'
        state.selectedMovie = action.payload
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.selectedStatus = 'failed'
        state.error = action.error.message
      })
      .addCase(addMovie.pending, (state) => {
        state.mutationStatus = 'loading'
        state.mutationError = ''
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded'
        state.items.push(action.payload)
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.mutationStatus = 'failed'
        state.mutationError = action.error.message
      })
      .addCase(updateMovie.pending, (state) => {
        state.mutationStatus = 'loading'
        state.mutationError = ''
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded'
        const updatedMovie = action.payload
        state.items = state.items.map((movie) =>
          String(movie.id) === String(updatedMovie.id) ? updatedMovie : movie,
        )
        state.selectedMovie = updatedMovie
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.mutationStatus = 'failed'
        state.mutationError = action.error.message
      })
      .addCase(deleteMovie.pending, (state) => {
        state.mutationStatus = 'loading'
        state.mutationError = ''
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded'
        state.items = state.items.filter(
          (movie) => String(movie.id) !== String(action.payload),
        )
        if (String(state.selectedMovie?.id) === String(action.payload)) {
          state.selectedMovie = null
        }
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.mutationStatus = 'failed'
        state.mutationError = action.error.message
      })
  },
})

export const { clearMutationStatus, clearSelectedMovie } = movieSlice.actions
export default movieSlice.reducer
