import './StaticPortfolio.css'
import { useEffect, useState } from 'react'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

function StaticPortfolio() {
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0]

        if (visibleSection) {
          setActiveSection(visibleSection.target.id)
        }
      },
      { rootMargin: '-18% 0px -65% 0px', threshold: [0, 0.2, 0.5, 1] }
    )

    sections.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) sectionObserver.observe(section)
    })

    return () => sectionObserver.disconnect()
  }, [])

  return (
    <main className="static_portfolio">
      <nav className="portfolio_nav" aria-label="Portfolio sections">
        <span className="nav_status" aria-hidden="true"><span /> NAV // ONLINE</span>
        <div className="nav_links">
          {sections.map(({ id, label }) => (
            <a className={activeSection === id ? 'is_active' : ''} href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </div>
      </nav>

      <header className="portfolio_hero">
        <p className="eyebrow">SYS // SHIVAM-OS // PROFILE 01</p>
        <h1>Shivam Murawala</h1>
        <p className="hero_text">
          I build thoughtful digital experiences that blend engineering, design, and systems thinking.
          I enjoy solving real problems with clean interfaces, creative ideas, and practical execution.
        </p>
        <div className="hero_actions">
          <a href="#projects">View Projects</a>
          <a href="#contact">Get In Touch</a>
        </div>
      </header>

      <section className="portfolio_section" id="about">
        <p className="section_kicker">01 / PROFILE</p>
        <h2>About</h2>
        <p>
          I’m a developer focused on building polished experiences with a strong technical foundation.
          My work sits at the intersection of software engineering, creative design, and product thinking.
        </p>
      </section>

      <section className="portfolio_section" id="experience">
        <p className="section_kicker">02 / FLIGHT LOG</p>
        <h2>Experience</h2>
        <article className="experience_item">
          <h3>Mobile Infrastructure Developer — Nokia</h3>
          <p>Ottawa, ON | Jul. 2026 – Aug. 2026</p>
          <ul>
            <li>Resolved 12 blocker bugs in the Java codebase of Nokia Policy Controller (NPC).</li>
            <li>Onboarded 10+ engineers onto a centralized machine learning workflow and configured 2 virtual machines, reducing manual environment setup time by 20%.</li>
            <li>Patched external testing packages, including Rammbock, improving codebase security and network reliability.</li>
          </ul>
        </article>
        <article className="experience_item">
          <h3>Founder and President — WCI Computer Science Club</h3>
          <p>Toronto, ON | Sep. 2025 – Present</p>
          <ul>
            <li>Founded and led a 40+ member club, driving active participation and successful completion of group projects through weekly web development and programming sessions.</li>
            <li>Partnered with UTSC Professor Francisco Estrada (Paco) to host an LLM and Transformer workshop.</li>
            <li>Led the planning and execution of a 2-day school-wide hackathon with 15+ teams.</li>
          </ul>
        </article>
        <article className="experience_item">
          <h3>Independent Researcher — Toronto Science Fair</h3>
          <p>Toronto, ON | Sep. 2023 – Mar. 2024</p>
          <ul>
            <li>Conducted 400+ automated simulations comparing chess engines, including Stockfish and Leela Chess Zero.</li>
            <li>Analyzed differences between Minimax-based search and MCTS/neural-network architectures in gameplay.</li>
            <li>Concluded neural-network engines favor long-term position, while Minimax engines excel at tactics.</li>
          </ul>
        </article>
      </section>

      <section className="portfolio_section" id="achievements">
        <p className="section_kicker">03 / MILESTONES</p>
        <h2>Awards &amp; Achievements</h2>
        <ul className="achievement_list">
          <li><strong>Lloyd Auckland Math Workshop @ University of Waterloo</strong> — One of 95 students invited across Canada</li>
          <li><strong>Canadian Computing Competition (CCC)</strong> — Top 10% and School Champion</li>
          <li><strong>AIME Qualifier</strong> — Top 10% on AMC — Scored 114/150 on AMC 12B</li>
          <li><strong>DECA International Career Development Conference</strong> — Placed 3rd globally out of 1,000+ competitors in my event</li>
          <li><strong>CEMC Euclid Contest</strong> — Distinction, Top 10% and School Champion</li>
          <li><strong>CEMC Hypatia</strong> — Distinction, Group IV Placement, School Champion</li>
          <li><strong>Toronto Science Fair</strong> — Silver Medal Recipient</li>
        </ul>
      </section>

      <section className="portfolio_section" id="projects">
        <p className="section_kicker">04 / ACTIVE BUILDS</p>
        <h2>Projects</h2>
        <div className="project_grid">
          <article className="project_card">
            <h3>Conway’s Game of Life Simulator</h3>
            <p><strong>C++, Raylib</strong></p>
            <p>Built a high-performance implementation of John Conway’s Game of Life using C++ and Raylib.</p>
            <p>Implemented real-time controls to start, stop, and modify the simulation state dynamically. Added support for random grid generation, custom initial states, adjustable simulation speed, and cell colors.</p>
            <a href="https://github.com/broken-proof/Raylib-Game-of-Life-Simulator" target="_blank" rel="noreferrer">View project</a>
          </article>
          <article className="project_card">
            <h3>ShivamOS, 3D Portfolio</h3>
            <p><strong>React.js, Three.js, JavaScript</strong></p>
            <p>Built an interactive 3D portfolio, featuring a computer floating in space.</p>
            <p>Implemented a camera zoom transition into a custom, fully interactive terminal-based OS. Added sound design with Howler to enhance immersion during scene transitions.</p>
            <a href="https://github.com/broken-proof/personal-portfolio" target="_blank" rel="noreferrer">View project</a>
          </article>
        </div>
      </section>

      <section className="portfolio_section" id="skills">
        <p className="section_kicker">05 / SYSTEMS</p>
        <h2>Skills</h2>
        <p><strong>Languages:</strong> C++, Python, Java, JavaScript/TypeScript, HTML5, CSS, SQL</p>
        <p><strong>Frameworks &amp; Libraries:</strong> WPILib, React.js, Matplotlib, Pandas, Scikit-Learn, Raylib, JUnit5, Three.js, Spring</p>
        <p><strong>Tools:</strong> Git, GitHub, VS Code, Gradle, Figma, Gerrit, Jira, Docker, WSL, Maven</p>
      </section>

      <section className="portfolio_section" id="contact">
        <p className="section_kicker">06 / OPEN CHANNEL</p>
        <h2>Contact</h2>
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
