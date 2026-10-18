# TALLURI ANIL BABU — Cybersecurity Portfolio

Cybersecurity portfolio of TALLURI ANIL BABU showcasing security projects, technical skills, certifications, and professional experience.

This responsive static website features animated visuals, interactive project and profile previews, and a printable résumé.

**Repository:** [github.com/aniltalluri000-sys/Portfolio](https://github.com/aniltalluri000-sys/Portfolio)

**Live site:** [talluri-anil-babu-portfolio.netlify.app](https://talluri-anil-babu-portfolio.netlify.app/)

## Project structure

```text
.
├── index.html              # Main portfolio
├── resume.html             # Printable résumé (use Print / Save PDF)
├── assets/
│   ├── css/
│   │   └── styles.css      # Portfolio styles and responsive layout
│   └── js/
│       └── script.js       # Navigation, scroll effects, and previews
├── .gitignore
└── README.md
```

## Run locally

No build tools or package installation are required. Open `index.html` in a browser, or serve the project root with any local static web server.

## Deployment

The site is deployed through Netlify from the `main` branch of [the Portfolio GitHub repository](https://github.com/aniltalluri000-sys/Portfolio). New commits to `main` trigger a production deploy automatically.

The live portfolio is available at [talluri-anil-babu-portfolio.netlify.app](https://talluri-anil-babu-portfolio.netlify.app/). It is a plain static site, so no build command is needed; Netlify publishes the repository root.

To connect another copy, create a new Netlify project, import the GitHub repository, select the `main` branch, leave the build command empty, and set the publish directory to `.`.

## Customize

- Update the portfolio copy and links in `index.html`.
- Update résumé details in `resume.html`.
- Adjust appearance in `assets/css/styles.css`.
- Adjust navigation, animations, and preview dialogs in `assets/js/script.js`.

The portfolio loads its Manrope, Space Grotesk, and DM Mono fonts from Google Fonts; system fallbacks are included.
