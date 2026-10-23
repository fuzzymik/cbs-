# Student Portfolio (dark green)

A responsive portfolio built with plain HTML, CSS, and JavaScript. No build tools or frameworks.
Dark green gradient, gold accents, a left rail of social links, a big faded year behind the hero,
a project carousel, and a bottom bar for moving between sections.

## Files

- `index.html` – page content (Home, About, Skills, Projects, Contact)
- `style.css` – styles. Colors are at the top, in the `:root` block.
- `script.js` – mobile menu, section tracking and bottom bar, skills tabs, project carousel, contact form

## Customize

Search for `PLACEHOLDER` or `[YOUR NAME]` in `index.html` and replace each one with your own content.
Also set `CONTACT_EMAIL` at the top of `script.js`.

- **Photos:** create an `images/` folder, then replace the dashed placeholder boxes with
  `<img class="hero-visual" src="images/your-file.jpg" alt="Describe the image">`
  (use `class="about-photo"` for the About photo).
- **More projects:** copy one `<article class="project">` block inside the carousel. The carousel picks it up automatically.
- **More skill groups:** copy one tab button and one panel, and match their `id`, `aria-controls`, and `aria-labelledby` values.
- **Social links on the left:** edit the `<aside class="rail">` block. It only shows on screens wider than 800px.

Fonts (Montserrat and Barlow Condensed) load from Google Fonts. Without a connection the site uses system fonts instead.

## Preview locally

Open `index.html` in your browser.

## Publish on GitHub Pages

1. Create a new repository on GitHub (e.g. `my-portfolio`) and upload these files to the root.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. After a minute, your site will be live at `https://YOUR-USERNAME.github.io/my-portfolio/`.

Tip: name the repo `YOUR-USERNAME.github.io` to get the shorter address `https://YOUR-USERNAME.github.io/`.
