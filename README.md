# Netflix-Inspired Personal Developer Portfolio

A cinematic, dark-themed personal portfolio website built for **Prathamesh Fatangade**. Inspired by Netflix's streaming interface and modern developer portfolio showcases, this website combines visual storytelling with developer-focused sections.

---

## 📁 Project Structure

```text
portfolio/
├── index.html              # Main HTML markup and semantic sections
├── css/
│   └── style.css           # Cinematic dark theme, Netflix red accents & animations
├── js/
│   └── script.js           # Intro animation, profile selector, modal, resume download
├── assets/
│   ├── images/             # Place your profile photos and project screenshots here
│   ├── icons/              # Custom brand or tech icons (if not using Font Awesome)
│   └── certificates/       # PDF or image certificate files
└── README.md               # Setup and customization guide
```

---

## 🚀 How to Run in VS Code

### Method 1: Using Live Server (Recommended)
1. Open **VS Code**.
2. Click **File** > **Open Folder...** and select the `portfolio` folder:
   `C:\Users\DELL\.gemini\antigravity\scratch\portfolio`
3. Install the **Live Server** extension by Ritwick Dey from the Extensions tab (`Ctrl+Shift+X`).
4. Right-click on `index.html` in the file explorer and select **"Open with Live Server"**.
5. Your default browser will launch at `http://127.0.0.1:5500/index.html`.

### Method 2: Direct Browser Launch
- Simply double-click `index.html` or open it directly in Google Chrome / Edge / Firefox.

---

## 🎨 Website Sections & Features

1. **Cinematic Intro Screen**:
   - Animated title "PORTFOLIO" with glowing red shimmer pulse and progress bar loader.
   - Includes a **Skip Intro** button. Respects `prefers-reduced-motion`.
2. **Profile Selector ("Who's watching?")**:
   - Netflix-style avatar card with smooth hover expansion and transition into the portfolio.
3. **Sticky Navigation Bar**:
   - Translucent glass navbar with scroll-spy highlighting, active section underline, mobile drawer, and a quick **Resume** button.
4. **Hero Banner**:
   - Big cinematic typography ("PRATHAMESH FATANGADE"), tagline, location, availability badge, and action buttons.
5. **Horizontal Project Carousel**:
   - Netflix-style horizontal row with smooth left/right chevron arrows.
   - Project cards expand on hover showing description, tags, and detail modal buttons.
   - Interactive modal popup with feature breakdown and GitHub/Demo placeholder links.
6. **Skills & Technology Universe**:
   - Grouped into Programming, Frontend, Backend, Database, Tools, and Emerging Tech.
7. **About Me**:
   - Two-column layout with photo placeholder, bio, and key highlights.
8. **Education & Certificates**:
   - Structured visual cards for degrees and certificates with placeholder viewing actions.
9. **Achievements & Highlights**:
   - Highlight cards for completed projects, workshops, and competitions.
10. **Contact Form**:
    - Client-side validation for Name, Email, and Message.
    - Launches the visitor's mail client via prefilled `mailto:` link.
11. **Cinematic Dramatic Ending**:
    - Netflix-style `"TO BE CONTINUED..."` closing title with glowing red aura, social links, and a back-to-top button.

---

## ✏️ How to Customize with Your Real Information

### 1. Replace Profile Photos
- Save your profile photo inside `assets/images/profile.jpg`.
- In `index.html`:
  - Locate `<div class="hero-avatar-placeholder">` and replace its content with:
    ```html
    <img src="assets/images/profile.jpg" alt="Prathamesh Fatangade" style="width:100%;height:100%;object-fit:cover;border-radius:20px;">
    ```
  - Similarly, update the avatar inside `#about`: `<div class="about-avatar-placeholder">`.

### 2. Update Social and Contact Links
- In `index.html` and `js/script.js`:
  - Replace `your.email@example.com` with your actual email.
  - Replace `github.com/your-username` with your real GitHub URL.
  - Replace `linkedin.com/in/your-name` with your real LinkedIn profile.

### 3. Add Project Links & Screenshots
- In `js/script.js`, edit the `projectsData` array:
  - Update `github: "https://github.com/your-username/repo-name"`.
  - Update `demo: "https://your-demo-url.com"`.
- If you have screenshots, place them in `assets/images/` and update the card background or modal body.

### 4. Enable Direct Backend Form Submissions (Optional)
Currently, the form launches the visitor's email client. If you want direct background email delivery without opening their mail app:
- Sign up for a free endpoint at [Formspree](https://formspree.io/) or [Web3Forms](https://web3forms.com/).
- Change `<form id="contactForm">` to point to your endpoint `action="https://formspree.io/f/your_id" method="POST"`.

---

## 📱 Testing Checklist
- [x] Cinematic intro bar loads and skips properly on click.
- [x] "Who's watching?" profile selection card zooms in and opens the main portfolio.
- [x] Navbar sticks to the top with blurred glass effect on scroll.
- [x] Horizontal project row scrolls smoothly with left/right arrows.
- [x] Project "Details" button opens the interactive popup modal.
- [x] "Download Resume" generates and downloads `Prathamesh-Fatangade-Resume.html`.
- [x] Contact form highlights errors when empty and opens mailto when valid.
- [x] Back to top button floats and scrolls smoothly to the top.
- [x] Responsive layout tested on desktop, tablet, and mobile views.
