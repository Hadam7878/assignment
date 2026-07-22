import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import LandingPage from './pages/LandingPage'
import MovieCreatePage from './pages/MovieCreatePage'
import MovieDetailPage from './pages/MovieDetailPage'
import MovieEditPage from './pages/MovieEditPage'
import MovieListPage from './pages/MovieListPage'
import MovieOfTheYearPage from './pages/MovieOfTheYearPage'
import './App.css'

function App() {
  const location = useLocation()
  const isLanding = location.pathname === '/'

  return (
    <div className={isLanding ? 'app app-landing' : 'app'}>
      {!isLanding && <Header />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/movies" element={<MovieListPage />} />
        <Route path="/movie-of-the-year" element={<MovieOfTheYearPage />} />
        <Route path="/movies/new" element={<MovieCreatePage />} />
        <Route path="/movies/:id" element={<MovieDetailPage />} />
        <Route path="/movies/:id/edit" element={<MovieEditPage />} />
      </Routes>
    </div>
  )
}

export default App
