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
import HeroAvatar from './components/HeroAvatar'
import ContactForm from './components/ContactForm'
import SocialLinks from './components/SocialLinks'
import PolaroidPhoto from './components/PolaroidPhoto'
import portrait from '../assets/personalImages/portrait.jpeg'

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
        <div className="hero_copy">
          <p className="eyebrow"><span className="eyebrow_name">Shivam OS</span><span className="eyebrow_version">V1</span></p>
          <h1>Hey There!!! I'm Shivam</h1>
          <p className="hero_text">
            Grade 12 developer who thinks Math, CS and Business are cool. I like building apps, solving math/cp problems,
            thinking too much and drinking Black Coffee while doing it.
          </p>
          <div className="hero_actions">
            <PixelButton variant="primary" href="#projects">View Projects</PixelButton>
            <PixelButton href="#contact">Get In Touch</PixelButton>
          </div>
        </div>
        <HeroAvatar />
      </header>

      <section className="portfolio_section" id="about">
        <SectionHeader title="About" />
        <div className="about_layout">
          <p>
            My name is Shivam Murawala and I'm a senior @ Woburn CI. I started coding around 2 years ago and it's been pretty fun so far.
            I think tech basically runs the world so I'm trying to learn about this field as much as I can. If your a recruiter pls hire me{":)"} If your a fellow developer, check out the
            terminal I made {"(promise it's not as vibecoded as this page)"}. When I'm AFK, I might be watching
            anime or the NBA, listening to music, sketching my thoughts, or doomscrolling. You also might catch me playing basketball, larping,
            or watching dog videos (since dogs are superior to cats, obviously).
          </p>
          <PolaroidPhoto src={portrait} alt="Portrait of Shivam" />
        </div>
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
        <SocialLinks />
        <ContactForm />
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
