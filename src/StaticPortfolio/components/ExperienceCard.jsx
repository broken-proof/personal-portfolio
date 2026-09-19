import PixelPanel from '../../components/PixelPanel'

function ExperienceCard({ title, meta, bullets }) {
  return (
    <PixelPanel as="article" className="experience_item">
      <h3>{title}</h3>
      <p>{meta}</p>
      <ul>
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </PixelPanel>
  )
}

export default ExperienceCard
