# TALLURI ANIL BABU — Cybersecurity Portfolio

A responsive, static portfolio website highlighting cybersecurity interests, projects, forensic experience, education, tools, and certifications.

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

No build tools or package installation are required. Open `index.html` in a browser, or serve the project root with a local static web server.

## Publish with GitHub Pages

1. Create a GitHub repository for the portfolio.
2. From this project folder, initialize Git and push the files to your new repository:

   ```powershell
   git init -b main
   git add .
   git commit -m "Add cybersecurity portfolio"
   git remote add origin https://github.com/<username>/<repository>.git
   git push -u origin main
   ```

   Replace `<username>` and `<repository>` with your GitHub account and repository name.
3. Upload the contents of this folder, keeping the directory structure above, if you prefer GitHub's web interface.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Select the `main` branch and `/ (root)` folder, then save.
7. Wait for the Pages deployment to finish. The site URL will appear in the Pages settings.

Because this is a plain static site, no framework, build command, or output folder needs to be configured.

## Customize

- Update the portfolio copy and links in `index.html`.
- Update résumé details in `resume.html`.
- Adjust appearance in `assets/css/styles.css`.
- Adjust navigation, animations, and preview dialogs in `assets/js/script.js`.

The portfolio loads its Manrope, Space Grotesk, and DM Mono fonts from Google Fonts; system fallbacks are included.
