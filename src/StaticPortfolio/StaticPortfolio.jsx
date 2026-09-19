import './StaticPortfolio.css'
import { useEffect, useState } from 'react'
import { sections } from './data/sections'
import { experience } from './data/experience'
import { achievements } from './data/achievements'
import { projects } from './data/projects'
import { skills } from './data/skills'
import SectionHeader from './components/SectionHeader'
import ExperienceCard from './components/ExperienceCard'
import AchievementItem from './components/AchievementItem'
import ProjectCard from './components/ProjectCard'
import SkillGroup from './components/SkillGroup'
import PixelButton from '../components/PixelButton'

function StaticPortfolio() {
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const lastSectionId = sections[sections.length - 1].id
    // The last section can never reach the observer's band, so treat the page bottom as "last section".
    const isAtPageBottom = () =>
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        if (isAtPageBottom()) {
          setActiveSection(lastSectionId)
          return
        }

        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0]

        if (visibleSection) {
          setActiveSection(visibleSection.target.id)
        }
      },
      { rootMargin: '-18% 0px -65% 0px', threshold: [0, 0.2, 0.5, 1] }
    )

    const handleScroll = () => {
      if (isAtPageBottom()) setActiveSection(lastSectionId)
    }

    sections.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) sectionObserver.observe(section)
    })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      sectionObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <main className="static_portfolio">
      <nav className="portfolio_nav" aria-label="Portfolio sections">
        <div className="nav_links">
          {sections.map(({ id, label }) => (
            <PixelButton variant="nav" active={activeSection === id} href={`#${id}`} key={id}>
              {label}
            </PixelButton>
          ))}
        </div>
      </nav>

      <header className="portfolio_hero">
        <p className="eyebrow"><span className="eyebrow_name">Shivam OS</span><span className="eyebrow_version">V1</span></p>
        <h1>Shivam Murawala</h1>
        <p className="hero_text">
          I build thoughtful digital experiences that blend engineering, design, and systems thinking.
          I enjoy solving real problems with clean interfaces, creative ideas, and practical execution.
        </p>
        <div className="hero_actions">
          <PixelButton variant="primary" href="#projects">View Projects</PixelButton>
          <PixelButton href="#contact">Get In Touch</PixelButton>
        </div>
      </header>

      <section className="portfolio_section" id="about">
        <SectionHeader title="About" />
        <p>
          I’m a developer focused on building polished experiences with a strong technical foundation.
          My work sits at the intersection of software engineering, creative design, and product thinking.
        </p>
      </section>


      <section className="portfolio_section" id="experience">
        <SectionHeader title="Experience" />
        {experience.map((item) => (
          <ExperienceCard key={item.title} {...item} />
        ))}
      </section>

      <section className="portfolio_section" id="achievements">
        <SectionHeader title="Awards & Achievements" />
        <ul className="achievement_list">
          {achievements.map((item) => (
            <AchievementItem key={item.title} {...item} />
          ))}
        </ul>
      </section>

      <section className="portfolio_section" id="projects">
        <SectionHeader title="Projects" />
        <div className="project_grid">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>

      <section className="portfolio_section" id="skills">
        <SectionHeader title="Skills" />
        {skills.map((group) => (
          <SkillGroup key={group.label} {...group} />
        ))}
      </section>

      <section className="portfolio_section" id="contact">
        <SectionHeader title="Contact" />
        <p><strong>Shivam Murawala</strong></p>
        <p>
          <a href="mailto:shivammurawala2810@gmail.com">shivammurawala2810@gmail.com</a> |{' '}
          <a href="https://www.linkedin.com/in/shivam-murawala-b9141829b/" target="_blank" rel="noreferrer">LinkedIn</a> |{' '}
          <a href="https://github.com/broken-proof" target="_blank" rel="noreferrer">GitHub</a>
        </p>
      </section>

      <footer className="portfolio_footer">
        <p>
          <strong>Credits:</strong> Model: “Retro computer” by Urpo, licensed under Creative Commons Attribution
          <a href='https://skfb.ly/ou69O'>https://skfb.ly/ou69O</a>
          <a href='http://creativecommons.org/licenses/by/4.0/'>(http://creativecommons.org/licenses/by/4.0/)</a>
        </p>
        <p>
          SFX: <a href='https://pixabay.com/'>https://pixabay.com/</a>
        </p>
      </footer>

    </main>
  )
}

export default StaticPortfolio;
