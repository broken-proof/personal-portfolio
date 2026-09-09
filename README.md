# Spaceship Portfolio

A personal portfolio that lives in space. A 3D computer floats in a starfied. You can click to zoom in, and it boots into a custom OS with its own terminal, built entirely with React and Three.js.

**Live site:** https://broken-proof.github.io/personal-portfolio/

## Overview

Instead of a typical static scroll-down portfolio, this project puts you in a 3D scene: a computer drifting in space. Move toward it and the camera zooms into the screen, transitioning into an interactive terminal-style OS. You can explore my projects, view my resume and even try some fun puzzles!

## Features

- Fully 3D scene built with Three.js and React Three Fiber
- Camera Zoom transition from scene to terminal
- Custom in-browser OS/terminal interface for navigating portfolio content
- Sound Effects powered by Howler
- Fast dev/build tooling via Vite

## Tech Stack

- **React 19**
- **Three.js**
- **@react-three/fiber** — React renderer for Three.js
- **@react-three/drei** — helpers and abstractions for R3F
- **Howler** / **use-sound** — audio
- **Vite** — build tool
- **ESLint** — linting

## Hosting Locally

Clone the repo and install dependencies:

```bash
git clone https://github.com/broken-proof/personal-portfolio.git
cd personal-portfolio
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Credits
3D Model: "Retro computer" by Urpo, licensed under Creative Commons Attribution 4.0
SFX: Pixabay

## License

MIT — see [LICENSE](./LICENSE) for details.

## Author

**[Shivam Murawala]**
Portfolio: https://broken-proof.github.io/personal-portfolio/
GitHub: [@broken-proof](https://github.com/broken-proof)