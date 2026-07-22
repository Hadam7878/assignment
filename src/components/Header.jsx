import { Film, Plus, Sparkles, Trophy } from 'lucide-react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="site-header">
      <NavLink className="brand-mark" to="/" aria-label="24frames landing page">
        <span className="brand-icon">
          <Film size={20} aria-hidden="true" />
        </span>
        <span>24frames</span>
      </NavLink>

      <nav className="site-nav" aria-label="Main navigation">
        <NavLink to="/movies">
          <Sparkles size={16} aria-hidden="true" />
          Archive
        </NavLink>
        <NavLink to="/movie-of-the-year">
          <Trophy size={16} aria-hidden="true" />
          Movie of the Year
        </NavLink>
        <NavLink to="/movies/new">
          <Plus size={16} aria-hidden="true" />
          Add film
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
