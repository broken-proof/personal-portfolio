import PixelPanel from '../../components/PixelPanel'
import PixelButton from '../../components/PixelButton'
import './ProjectCard.css'

function ProjectCard({ title, stack, paragraphs, href, image, imageAlt = '' }) {
  return (
    <PixelPanel as="article" className="project_card">
      {image && (
        <div className="project_image">
          <img src={image} alt={imageAlt} loading="lazy" decoding="async" />
        </div>
      )}
      <h3>{title}</h3>
      <p><strong>{stack}</strong></p>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <PixelButton variant="primary" href={href} target="_blank" rel="noreferrer">View project</PixelButton>
    </PixelPanel>
  )
}

export default ProjectCard
