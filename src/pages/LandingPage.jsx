import { ArrowRight, Clapperboard } from 'lucide-react'
import { Link } from 'react-router-dom'
import { landingVideo } from '../data/movieAssets'

function LandingPage() {
  return (
    <main className="landing-page">
      <video
        className="landing-video"
        src={landingVideo}
        autoPlay
        loop
        muted
        playsInline
        aria-label="24frames animated landing background"
      />
      <div className="landing-shade" aria-hidden="true" />

      <section className="landing-copy">
        <p className="eyebrow">
          <Clapperboard size={18} aria-hidden="true" />
          animated cinema archive
        </p>
        <h1>24frames</h1>
        <p className="landing-intro">
          A nocturnal shelf for hand-painted animated films, gentle visual
          poems, and stories that feel like someone left a frame of a dream
          glowing on the table.
        </p>
        <Link className="landing-button" to="/movies">
          Enter the archive
          <ArrowRight size={19} aria-hidden="true" />
        </Link>
      </section>
    </main>
  )
}

export default LandingPage
