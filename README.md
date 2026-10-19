# TALLURI ANIL BABU — Cybersecurity Portfolio

Cybersecurity portfolio of TALLURI ANIL BABU showcasing security projects, technical skills, certifications, and professional experience.

This responsive static website features animated visuals, interactive project and profile previews, and a printable résumé.

**Repository:** [github.com/aniltalluri000-sys/Portfolio](https://github.com/aniltalluri000-sys/Portfolio)

**Live site:** [talluri-anil-babu-portfolio.netlify.app](https://talluri-anil-babu-portfolio.netlify.app/)

## Key features

- Clean, responsive design optimized for desktop and mobile
- Animated visuals and smooth scroll interactions
- Interactive project previews and profile dialogs
- Printable résumé (see `resume.html`)
- No build tools required — plain static HTML, CSS, and JavaScript

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

No build tools or package installation are required. To run locally:

1. Open `index.html` directly in a browser, or
2. Serve the project root with any static web server (for example, with Python 3: `python -m http.server 8000` from the project root), then open http://localhost:8000

## Deployment

The site is deployed through Netlify from the `main` branch of this repository. New commits to `main` trigger a production deploy on Netlify.

Because this is a plain static site, no build command is needed. To connect your own Netlify project:

1. Create a new site in Netlify and choose "Import from Git"
2. Select this GitHub repository and the `main` branch
3. Leave the build command empty and set the publish directory to `.`

The live portfolio is available at: https://talluri-anil-babu-portfolio.netlify.app/

## Customize

- Edit copy and links in `index.html` to update content and project descriptions.
- Update résumé details in `resume.html`.
- Change colors, spacing, and layout in `assets/css/styles.css`.
- Modify navigation, animations, and preview dialogs in `assets/js/script.js`.

The portfolio loads the Manrope, Space Grotesk, and DM Mono fonts from Google Fonts; system fallbacks are included.

## Credits

Built as a static portfolio to showcase cybersecurity work and professional experience.

---

If you'd like any specific changes (add a Projects section, badges, or contact details), tell me what to include and I will update the README further.