import PixelPanel from '../../components/PixelPanel'
import PixelButton from '../../components/PixelButton'

function ProjectCard({ title, stack, paragraphs, href }) {
  return (
    <PixelPanel as="article" className="project_card">
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
