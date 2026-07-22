import {
  Award,
  BadgeCheck,
  BarChart3,
  Crown,
  Eye,
  Palette,
  Sparkles,
  Star,
  Ticket,
  Trophy,
} from 'lucide-react'
import { designTextureAssets } from '../data/movieAssets'

const awardStats = [
  {
    icon: <Star size={18} aria-hidden="true" />,
    label: 'jury score',
    value: '98.7',
    meta: 'highest rated frame',
  },
  {
    icon: <Eye size={18} aria-hidden="true" />,
    label: 'festival views',
    value: '42K',
    meta: 'opening week',
  },
  {
    icon: <Ticket size={18} aria-hidden="true" />,
    label: 'owner pick',
    value: '#01',
    meta: 'locked selection',
  },
]

const nominees = [
  ['01', 'The Shadow in the Woods', 'Movie of the Year'],
  ['02', 'My Family and the Wolf', 'Best Emotional Frame'],
  ['03', 'Lightfall', 'Best Art Direction'],
  ['04', 'Pimo & Rex', 'Audience Favorite'],
]

const galleryLabels = [
  'official award backdrop',
  'winner concept valley',
  'ceremony key visual',
  'after-hours spotlight frame',
]

function MovieOfTheYearPage() {
  return (
    <main className="page-shell awards-page">
      <section className="owner-awards-hero">
        <div className="owner-awards-copy">
          <p className="eyebrow">
            <Trophy size={17} aria-hidden="true" />
            owner selection room
          </p>
          <h1>The Owner&apos;s Cut.</h1>
          <p>
            A private 24frames board for the yearly winner, award labels,
            shortlist ranking, and the landing artworks behind the festival
            identity.
          </p>

          <div className="owner-award-tags" aria-label="Winner awards">
            <span>
              <Crown size={15} aria-hidden="true" />
              Movie of the Year 2026
            </span>
            <span>
              <Palette size={15} aria-hidden="true" />
              Best Landing Concept
            </span>
            <span>
              <Sparkles size={15} aria-hidden="true" />
              Visual Poetry Prize
            </span>
          </div>
        </div>

        <article className="winner-spotlight">
          <img
            src="/940a3ce4de78fb799a36bf2a7a8261c3.jpg"
            alt="The Shadow in the Woods winner poster"
          />
          <div className="winner-spotlight-copy">
            <p className="eyebrow">
              <BadgeCheck size={15} aria-hidden="true" />
              grand winner
            </p>
            <h2>The Shadow in the Woods</h2>
            <p>
              A dark fairytale chosen for its atmosphere, handmade texture, and
              the kind of silence that makes an animated frame feel alive.
            </p>
          </div>
        </article>
      </section>

      <section className="owner-stat-grid" aria-label="Owner award statistics">
        {awardStats.map((stat) => (
          <article key={stat.label}>
            {stat.icon}
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <p>{stat.meta}</p>
          </article>
        ))}
      </section>

      <section className="owner-board">
        <article className="owner-verdict">
          <p className="eyebrow">
            <Award size={16} aria-hidden="true" />
            final verdict
          </p>
          <h2>Approved for the 24frames front window.</h2>
          <p>
            The winner carries the darker, painterly mood of the site while
            still feeling cinematic enough to headline the annual collection.
          </p>
        </article>

        <article className="nominee-board">
          <div className="nominee-board-heading">
            <p className="eyebrow">
              <BarChart3 size={16} aria-hidden="true" />
              shortlist
            </p>
            <span>owner ranking</span>
          </div>

          {nominees.map(([rank, title, award]) => (
            <div className="nominee-row" key={title}>
              <strong>{rank}</strong>
              <span>{title}</span>
              <em>{award}</em>
            </div>
          ))}
        </article>
      </section>

      <section className="year-gallery" aria-label="Movie of the year artwork">
        {designTextureAssets.map((image, index) => (
          <article className={index === 0 ? 'featured-year-art' : ''} key={image}>
            <img src={image} alt={`Movie of the year artwork ${index + 1}`} />
            <div>
              <p className="eyebrow">
                <Sparkles size={15} aria-hidden="true" />
                frame {index + 1}
              </p>
              <h2>{galleryLabels[index]}</h2>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

export default MovieOfTheYearPage
