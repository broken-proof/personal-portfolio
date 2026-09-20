import gameOfLifeImage from '../../assets/projectImages/gameoflifesim.png'
import portfolioImage from '../../assets/projectImages/personalportfolio.png'

export const projects = [
  {
    title: 'Conway’s Game of Life Simulator',
    stack: 'C++, Raylib',
    paragraphs: [
      'Built a high-performance implementation of John Conway’s Game of Life using C++ and Raylib.',
      'Implemented real-time controls to start, stop, and modify the simulation state dynamically. Added support for random grid generation, custom initial states, adjustable simulation speed, and cell colors.',
    ],
    href: 'https://github.com/broken-proof/Raylib-Game-of-Life-Simulator',
    image: gameOfLifeImage,
    imageAlt: 'Game of Life simulator window showing cyan live cells forming patterns on a dark grid',
  },
  {
    title: 'ShivamOS, 3D Portfolio',
    stack: 'React.js, Three.js, JavaScript',
    paragraphs: [
      'Built an interactive 3D portfolio, featuring a computer floating in space.',
      'Implemented a camera zoom transition into a custom, fully interactive terminal-based OS. Added sound design with Howler to enhance immersion during scene transitions.',
    ],
    href: 'https://github.com/broken-proof/personal-portfolio',
    image: portfolioImage,
    imageAlt: 'ShivamOS terminal on a retro computer, showing the Shivam OS ASCII banner and boot messages',
  },
]
