import { Award, Crown, Sparkles, Trophy } from 'lucide-react'
import { designTextureAssets } from '../data/movieAssets'

const awardNotes = [
  'Movie of the Year 2026',
  'Best Animated Landing Concept',
  'Audience Choice for Visual Poetry',
]

function MovieOfTheYearPage() {
  return (
    <main className="page-shell awards-page">
      <section className="awards-hero">
        <div>
          <p className="eyebrow">
            <Trophy size={17} aria-hidden="true" />
            annual selection
          </p>
          <h1>Movie of the Year.</h1>
          <p>
            A special 24frames exhibition for the landing artwork, festival
            frames, and award-winning visual concepts behind the archive.
          </p>
        </div>

        <div className="award-medal" aria-label="Movie of the year badge">
          <Crown size={34} aria-hidden="true" />
          <strong>24F</strong>
          <span>Grand Prize</span>
        </div>
      </section>

      <section className="award-strip" aria-label="Award titles">
        {awardNotes.map((note) => (
          <article key={note}>
            <Award size={18} aria-hidden="true" />
            <span>{note}</span>
          </article>
        ))}
      </section>

      <section className="year-gallery" aria-label="Movie of the year artwork">
        {designTextureAssets.map((image, index) => (
          <article className={index === 0 ? 'featured-year-art' : ''} key={image}>
            <img src={image} alt={`Movie of the year artwork ${index + 1}`} />
            <div>
              <p className="eyebrow">
                <Sparkles size={15} aria-hidden="true" />
                winner frame {index + 1}
              </p>
              <h2>
                {index === 0
                  ? 'Official festival backdrop'
                  : 'Awarded concept frame'}
              </h2>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

export default MovieOfTheYearPage
