/**
 * Netflix-Inspired Cinematic Developer Portfolio
 * Prathamesh Fatangade
 * Script handling animations, profile selection, navigation, project modal,
 * resume generation, and form validation.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // PROJECT DATA REPOSITORY (Details for Modals)
  // ============================================================
  const projectsData = [
    {
      title: "Smart Agriculture Robot with Edge AI",
      subtitle: "Raspberry Pi 4B &bull; Edge CNN &bull; IoT Telemetry &bull; Published Research",
      tags: ["Raspberry Pi 4B", "Edge CNN", "IoT Sensors", "IJIRT IF 8.412", "Python", "Robotics"],
      description: "An autonomous differential-drive ground robot engineered for precision agricultural monitoring. The rover integrates a multi-sensor telemetry suite (capacitive soil moisture, DHT22 temperature/humidity) and on-board convolutional neural network edge computer vision on a Raspberry Pi 4B to classify crop leaf diseases in real-time, streaming telemetry to a farmer decision support dashboard. Published in the peer-reviewed International Journal of Innovative Research in Technology (IJIRT, ISSN: 2349-6002, Impact Factor: 8.412, Reg ID: 209192).",
      features: [
        "Autonomous obstacle avoidance and differential-drive ground navigation",
        "Edge CNN computer vision for real-time leaf disease identification",
        "Multi-sensor IoT telemetry pipeline (DHT22, capacitive soil moisture, ultrasonic)",
        "Published in IJIRT Vol 13 Issue 5 (IF: 8.412) and featured in CRC Press book chapter"
      ],
      github: "https://github.com/fatangadeprathamesh-svg",
      demo: "#research"
    },
    {
      title: "Quantitative Trading Backtester & Risk Engine",
      subtitle: "Python &bull; Pandas &bull; NSE/BSE Equities &bull; Global Forex",
      tags: ["Python", "Pandas", "NumPy", "NSE/BSE", "Forex Markets", "Risk 1:2+"],
      description: "A comprehensive quantitative analysis and strategy backtesting framework developed from over 4 years of active financial market trading. The engine models multi-timeframe price action, Market Structure Shifts (MSS), liquidity sweeps, and dynamic position sizing with strict capital preservation (maximum 1-2% risk per position with minimum 1:2+ Risk-to-Reward ratio).",
      features: [
        "Historical OHLCV data ingestion and multi-timeframe trend segmentation",
        "Automated Price Action & Market Structure Shift (MSS) signal detection",
        "Monte Carlo risk simulation and maximum drawdown bound evaluation",
        "Integrated performance analytics: Win Rate, Profit Factor, and Sharpe Ratio"
      ],
      github: "https://github.com/fatangadeprathamesh-svg",
      demo: "#markets"
    },
    {
      title: "Autonomous Object Following Robot",
      subtitle: "Raspberry Pi 4B &bull; OpenCV &bull; Closed-Loop PID Control",
      tags: ["Raspberry Pi 4B", "Python", "OpenCV", "PID Control", "Computer Vision", "Robotics"],
      description: "An autonomous robotic vehicle powered by a Raspberry Pi 4B and high-definition camera module. Utilizing computer vision algorithms implemented in OpenCV, the robot extracts color and contour features to track a dynamic target object and modulates DC motor speeds via closed-loop PID control to maintain optimal distance and heading.",
      features: [
        "Real-time HSV color space thresholding and centroid tracking in OpenCV",
        "PID-inspired closed-loop motor velocity adjustment for fluid trajectory following",
        "Ultrasonic distance sensing with instant collision avoidance fallback",
        "Full hardware bill-of-materials and comprehensive formal project documentation"
      ],
      github: "https://github.com/fatangadeprathamesh-svg",
      demo: "#"
    },
    {
      title: "Personal Portfolio Website — Luxury Editorial Edition",
      subtitle: "HTML5 &bull; CSS3 &bull; Vanilla JS &bull; Wine Red &bull; Light Sand",
      tags: ["HTML5", "CSS3", "JavaScript", "Spotlight Search", "3D Physics", "AI Chatbot"],
      description: "A bespoke, luxury developer portfolio designed around Wine Red (#7F011F) and Light Sand (#F5EBD0) aesthetics. Features an instant keyboard-driven spotlight search engine, spring-lerped 3D card tilt physics, 3D canvas starfield tunnel, dynamic printable resume generator, and an integrated interactive AI portfolio assistant.",
      features: [
        "Zero external JS framework dependencies — 100% pure vanilla performance",
        "Instant spotlight search indexing projects, research, trading, and skills",
        "Spring-damped RequestAnimationFrame 3D parallax and dynamic specular glare",
        "Interactive AI knowledge assistant trained on verified academic and market experience"
      ],
      github: "https://github.com/fatangadeprathamesh-svg",
      demo: "#hero"
    }
  ];

  // Check Reduced Motion Preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // DOM Elements
  const introScreen = document.getElementById('introScreen');
  const loaderBar = document.getElementById('loaderBar');
  const loaderPercent = document.getElementById('loaderPercent');
  const introShockwave = document.getElementById('introShockwave');
  const skipIntro = document.getElementById('skipIntro');
  const profileScreen = document.getElementById('profileScreen');
  const profileCard = document.getElementById('profileCard');
  const mainContent = document.getElementById('mainContent');
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('backToTop');
  const endingBackToTop = document.getElementById('endingBackToTop');

  // Modal Elements
  const projectModal = document.getElementById('projectModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalBody = document.getElementById('modalBody');

  // Resume buttons
  const navResumeBtn = document.getElementById('navResumeBtn');
  const heroResumeBtn = document.getElementById('heroResumeBtn');
  const mobileResumeBtn = document.getElementById('mobileResumeBtn');
  const resumeConfirm = document.getElementById('resumeConfirm');

  // Contact form
  const contactForm = document.getElementById('contactForm');

  // Theme toggle buttons
  const themeToggle = document.getElementById('themeToggle');
  const mobileThemeToggle = document.getElementById('mobileThemeToggle');

  function updateThemeUI(theme) {
    const isLight = theme === 'light';
    const iconClass = isLight ? 'fa-moon' : 'fa-sun';
    const titleText = isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode';

    [themeToggle, mobileThemeToggle].forEach(btn => {
      if (!btn) return;
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = `fas ${iconClass}`;
      }
      btn.setAttribute('title', titleText);
      const span = btn.querySelector('span');
      if (span) {
        span.textContent = isLight ? 'Dark Mode' : 'Light Mode';
      }
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeUI(theme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  }

  // Initial theme (default dark, can follow system if preferred)
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  applyTheme('dark');

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

  // ============================================================
  // 1. INTRO & PROFILE SCREEN TRANSITIONS
  // ============================================================
  function enterProfileScreen() {
    if (introScreen) {
      introScreen.classList.add('zoom-exit');
      setTimeout(() => {
        introScreen.classList.add('screen-hidden');
        if (profileScreen) {
          profileScreen.classList.remove('screen-hidden');
        }
      }, 650);
    }
  }

  function enterMainPortfolio() {
    if (profileScreen) {
      profileScreen.classList.add('fade-out');
      setTimeout(() => {
        profileScreen.classList.add('screen-hidden');
        if (mainContent) {
          mainContent.classList.remove('screen-hidden');
          initScrollReveals();
        }
      }, 500);
    }
  }

  // Handle Reduced Motion or normal intro
  if (prefersReducedMotion) {
    if (introScreen) introScreen.classList.add('screen-hidden');
    if (profileScreen) profileScreen.classList.add('screen-hidden');
    if (mainContent) {
      mainContent.classList.remove('screen-hidden');
      initScrollReveals();
    }
  } else {
    // Setup 3D Starfield & Ember Tunnel Particle System for Intro Screen
    const introCanvas = document.getElementById('introParticles');
    let particlesRunning = true;
    if (introCanvas) {
      const ctx = introCanvas.getContext('2d');
      let width = introCanvas.width = window.innerWidth;
      let height = introCanvas.height = window.innerHeight;

      window.addEventListener('resize', () => {
        if (!introCanvas) return;
        width = introCanvas.width = window.innerWidth;
        height = introCanvas.height = window.innerHeight;
      });

      const numParticles = 65;
      const particles = Array.from({ length: numParticles }, () => ({
        x: (Math.random() - 0.5) * width * 1.6,
        y: (Math.random() - 0.5) * height * 1.6,
        z: Math.random() * 850 + 40,
        radius: Math.random() * 2.2 + 0.8,
        color: Math.random() > 0.4 ? '#7F011F' : (Math.random() > 0.5 ? '#F5EBD0' : '#FFFFFF'),
        speed: Math.random() * 2.8 + 1.2
      }));

      let mouse3DX = 0;
      let mouse3DY = 0;

      window.addEventListener('mousemove', (e) => {
        if (!particlesRunning) return;
        mouse3DX = (e.clientX - width / 2) * 0.15;
        mouse3DY = (e.clientY - height / 2) * 0.15;
      });

      function renderParticles() {
        if (!particlesRunning) return;
        ctx.clearRect(0, 0, width, height);

        const projected = [];
        particles.forEach(p => {
          p.z -= p.speed;
          if (p.z <= 15) {
            p.z = 850;
            p.x = (Math.random() - 0.5) * width * 1.6;
            p.y = (Math.random() - 0.5) * height * 1.6;
          }

          // 3D perspective projection formula
          const k = 380 / (p.z + 380);
          const px = (p.x - mouse3DX) * k + width / 2;
          const py = (p.y - mouse3DY) * k + height / 2;
          const pr = Math.max(0.6, p.radius * k * 2.4);
          const alpha = Math.min(1, Math.max(0.1, (1 - p.z / 850) * 1.3));

          if (px >= 0 && px <= width && py >= 0 && py <= height) {
            projected.push({ px, py, alpha, color: p.color });
            ctx.beginPath();
            ctx.arc(px, py, pr, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = alpha;
            ctx.shadowBlur = 10 * k;
            ctx.shadowColor = p.color;
            ctx.fill();
          }
        });

        // 3D Constellation filament mesh between nearby nodes
        for (let i = 0; i < projected.length; i++) {
          for (let j = i + 1; j < projected.length; j++) {
            const dx = projected[i].px - projected[j].px;
            const dy = projected[i].py - projected[j].py;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 65) {
              ctx.beginPath();
              ctx.moveTo(projected[i].px, projected[i].py);
              ctx.lineTo(projected[j].px, projected[j].py);
              ctx.strokeStyle = '#F5EBD0';
              ctx.globalAlpha = (1 - dist / 65) * 0.16 * Math.min(projected[i].alpha, projected[j].alpha);
              ctx.lineWidth = 0.7;
              ctx.stroke();
            }
          }
        }

        ctx.globalAlpha = 1;
        requestAnimationFrame(renderParticles);
      }
      renderParticles();
    }

    // Animate loader bar & percentage (extended by +1s for cinematic pacing, 42ms)
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      if (loaderBar) loaderBar.style.width = progress + '%';
      if (loaderPercent) loaderPercent.textContent = progress + '%';

      // Trigger shockwave pulse at 52%
      if (progress === 52 && introShockwave) {
        introShockwave.classList.add('fire');
      }

      if (progress >= 100) {
        clearInterval(interval);
        particlesRunning = false;
        setTimeout(enterProfileScreen, 500);
      }
    }, 42);

    // Skip Intro Button
    if (skipIntro) {
      skipIntro.addEventListener('click', () => {
        clearInterval(interval);
        enterProfileScreen();
      });
    }

    // Profile Card Selection
    if (profileCard) {
      profileCard.addEventListener('click', () => {
        enterMainPortfolio();
      });
      // Keyboard support (Enter / Space)
      profileCard.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          enterMainPortfolio();
        }
      });
    }
  }

  // ============================================================
  // 2. NAVBAR SCROLL EFFECT & ACTIVE LINK HIGHLIGHTING
  // ============================================================
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top visibility
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    // Scroll Spy for nav links
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';

    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Mobile Hamburger Toggle
  if (hamburger && mobileNavOverlay) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNavOverlay.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNavOverlay.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
      });
    });
  }

  // ============================================================
  // 3. HORIZONTAL PROJECT SCROLLING
  // ============================================================
  const rowArrows = document.querySelectorAll('.row-arrow');
  rowArrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
      const targetRowId = arrow.getAttribute('data-row');
      const row = document.getElementById(targetRowId);
      if (!row) return;

      const isRight = arrow.classList.contains('row-arrow-right');
      const scrollAmount = 320;
      row.scrollBy({
        left: isRight ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    });
  });

  // ============================================================
  // 4. PROJECT DETAIL MODAL
  // ============================================================
  function openModal(projectIndex) {
    const project = projectsData[projectIndex];
    if (!project || !modalBody || !projectModal) return;

    modalBody.innerHTML = `
      <h2 style="font-family: var(--font-display); font-size: 2.3rem; color: var(--accent-sand-light); margin-bottom: 6px; letter-spacing: 1px;">${project.title}</h2>
      <p style="color: var(--accent-sand); font-weight: 700; font-size: 0.95rem; margin-bottom: 16px;">${project.subtitle}</p>
      
      <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 20px; font-size: 0.95rem;">
        ${project.description}
      </p>

      <h4 style="font-size: 1rem; color: var(--accent-sand-light); margin-bottom: 10px; font-weight: 700;"><i class="fas fa-check-circle" style="color: var(--accent-wine);"></i> Key Capabilities &amp; Features:</h4>
      <ul style="list-style: none; padding-left: 0; margin-bottom: 20px;">
        ${project.features.map(f => `
          <li style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-check" style="color: var(--accent-wine); font-size: 0.8rem;"></i> ${f}
          </li>
        `).join('')}
      </ul>

      <h4 style="font-size: 1rem; color: var(--accent-sand-light); margin-bottom: 10px; font-weight: 700;"><i class="fas fa-layer-group" style="color: var(--accent-sand);"></i> Tech Stack:</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px;">
        ${project.tags.map(tag => `<span class="tag" style="background: rgba(127, 1, 31, 0.25); color: var(--accent-sand-light); border: 1px solid rgba(245, 235, 208, 0.25); padding: 5px 12px; font-size: 0.8rem;">${tag}</span>`).join('')}
      </div>

      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <i class="fab fa-github"></i> View GitHub Repository
        </a>
        <a href="${project.demo}" class="btn btn-outline" onclick="closeModal()">
          <i class="fas fa-arrow-right"></i> Explore in Portfolio
        </a>
      </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.project-detail-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.getAttribute('data-project'), 10);
      openModal(idx);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
      closeModal();
    }
  });

  // ============================================================
  // 5. SPOTLIGHT LIVE SEARCH & PROJECT FILTER ENGINE
  // ============================================================
  const globalSearchInput = document.getElementById('globalSearchInput');
  const mobileSearchInput = document.getElementById('mobileSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const searchResultsDropdown = document.getElementById('searchResultsDropdown');
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');

  // Search Knowledge Index
  const portfolioIndex = [
    // Projects
    { title: "Smart Agriculture Robot with Edge AI", category: "Project", section: "projects", target: '[data-project="0"]', snippet: "Autonomous rover with IoT sensors and Edge CNN leaf disease detection. Published in IJIRT (IF 8.412).", tags: "agriculture robot edge cnn iot raspberry pi vaishali patil leaf disease autonomous" },
    { title: "Quantitative Trading Backtester & Risk Engine", category: "Project", section: "projects", target: '[data-project="1"]', snippet: "Python quantitative engine modeling Price Action, Market Structure Shifts (MSS), and 1:2+ R:R risk bounds.", tags: "quantitative trading backtest python pandas numpy nse bse forex equity risk" },
    { title: "Autonomous Object Following Robot", category: "Project", section: "projects", target: '[data-project="2"]', snippet: "Raspberry Pi 4B rover with OpenCV contour extraction and closed-loop PID velocity modulation.", tags: "object following robot raspberry pi opencv computer vision pid robotics" },
    { title: "Personal Portfolio Website — Luxury Edition", category: "Project", section: "projects", target: '[data-project="3"]', snippet: "Bespoke Wine Red & Light Sand portfolio with spotlight search, 3D physics, and AI assistant.", tags: "portfolio website html5 css3 javascript wine red light sand spotlight search 3d" },

    // Research
    { title: "Smart Agriculture Robot Research Paper", category: "Research", section: "research", target: "#research", snippet: "Published in IJIRT (ISSN: 2349-6002, Impact Factor: 8.412, Vol 13 Issue 5, Reg ID: 209192).", tags: "ijirt research paper publication agricultural robot edge ai iot vaishali patil issn impact factor" },
    { title: "Smart Innovations Book Chapter", category: "Research", section: "research", target: "#research", snippet: "Authored book chapter in 'Smart Innovations in Agriculture & Industry 4.0' (CRC Press / Taylor & Francis).", tags: "book chapter crc press taylor francis industry 4.0 smart innovations" },
    { title: "Edge CNN Crop Disease Detection", category: "Research", section: "research", target: ".research-pillars-grid", snippet: "Lightweight convolutional neural network executing on-board Raspberry Pi for immediate field diagnosis.", tags: "cnn convolutional neural network disease leaf crop edge ai vision" },
    { title: "Differential-Drive Agricultural Rover", category: "Research", section: "research", target: ".research-pillars-grid", snippet: "Sturdy multi-terrain chassis with ultrasonic obstacle avoidance and autonomous field traversal.", tags: "differential drive rover autonomous terrain obstacle avoidance" },

    // Markets & Trading
    { title: "4+ Years Market Execution Journey", category: "Trading", section: "markets", target: "#markets", snippet: "Over 4 years of active, disciplined trading across Indian Equities (NSE/BSE) and Global Forex.", tags: "market trading stock forex 4 years nse bse equity currency execution" },
    { title: "Indian Equity Swing & Breakout Trading", category: "Trading", section: "markets", target: ".markets-grid", snippet: "Trading NSE/BSE stocks with Volume Profile, support/resistance, and institutional orderflow tracking.", tags: "indian stocks nse bse swing momentum breakout volume profile" },
    { title: "Global Forex Currency Trading", category: "Trading", section: "markets", target: ".markets-grid", snippet: "Trading major pairs (EUR/USD, GBP/USD, USD/JPY) with London/New York session overlap timing.", tags: "forex currency eur usd gbp jpy london new york session" },
    { title: "Quantitative Risk & Capital Preservation", category: "Trading", section: "markets", target: ".market-stats-row", snippet: "Strict asymmetric 1:2+ Risk-to-Reward ratio with 1-2% max capital risk per position.", tags: "risk management capital preservation position sizing risk reward drawdown" },

    // Skills
    { title: "Python Programming & Data Analytics", category: "Skill", section: "skills", target: "#skills", snippet: "Core language used across Edge AI, OpenCV computer vision, and quantitative backtesting.", tags: "python data analytics pandas numpy scripting" },
    { title: "Edge AI, OpenCV & Computer Vision", category: "Skill", section: "skills", target: "#skills", snippet: "CNN deployment on edge hardware (Raspberry Pi 4B, ESP32) with real-time video processing.", tags: "edge ai opencv computer vision cnn raspberry pi esp32" },
    { title: "Full-Stack Web Technologies & NoSQL", category: "Skill", section: "skills", target: "#skills", snippet: "Modern HTML5, CSS3, JavaScript ES6+, Flask, MongoDB (NoSQL), and SQL database systems.", tags: "web html css javascript flask mongodb nosql sql" },
    { title: "Hardware Prototyping & IoT Telemetry", category: "Skill", section: "skills", target: "#skills", snippet: "Sensor interfacing (DHT22, soil moisture, ultrasonic), motor drivers, and serial protocols.", tags: "hardware iot sensors telemetry dht22 soil moisture esp32" },

    // Certificates
    { title: "IJIRT International Publication Certificate", category: "Certificate", section: "certificates", target: "#certificates", snippet: "Official credential for published research (Reg ID: 209192, Impact Factor: 8.412).", tags: "ijirt certificate publication credential research paper" },
    { title: "Generative AI & Prompt Engineering (Outskill)", category: "Certificate", section: "certificates", target: "#certificates", snippet: "Industry credential in LLM workflow architecture and advanced prompt design.", tags: "outskill generative ai prompt engineering llm certification" },
    { title: "Cloud Security Fundamentals (Simplilearn)", category: "Certificate", section: "certificates", target: "#certificates", snippet: "SkillUp certification covering cloud infrastructure, IAM security, and encryption.", tags: "simplilearn cloud security skillup certification iam" },

    // Contact
    { title: "Email Prathamesh (fatangadeprathamesh@gmail.com)", category: "Contact", section: "contact", target: "#contact", snippet: "Direct email contact for software engineering, robotics, or research inquiries.", tags: "email contact gmail fatangadeprathamesh message hire" },
    { title: "GitHub Profile (fatangadeprathamesh-svg)", category: "Contact", section: "contact", target: "#contact", snippet: "Explore open-source repositories and robotics/quant projects on GitHub.", tags: "github profile repositories code git" },

    // FAQ & Reviews (Checklist Trust Items)
    { title: "Frequently Asked Questions (FAQ)", category: "FAQ", section: "faq", target: "#faq", snippet: "Answers regarding Edge AI research, algorithmic trading, IJIRT paper verification, and hiring.", tags: "faq questions answers edge ai quant trading research collaboration hire" },
    { title: "Academic Endorsements & Peer Reviews", category: "Reviews", section: "endorsements", target: "#endorsements", snippet: "Verified academic reviews by Dr. Vaishali Patil (MIT ACSC Pune) and quantitative technical evaluators.", tags: "reviews testimonials endorsements vaishali patil evaluation recommendations" }
  ];

  function runSpotlightSearch(query) {
    if (!searchResultsDropdown) return;
    const cleanQ = query.trim().toLowerCase();

    if (!cleanQ) {
      searchResultsDropdown.style.display = 'none';
      searchResultsDropdown.innerHTML = '';
      if (clearSearchBtn) clearSearchBtn.style.display = 'none';
      return;
    }

    if (clearSearchBtn) clearSearchBtn.style.display = 'block';

    const words = cleanQ.split(/\s+/).filter(Boolean);
    const matches = portfolioIndex.filter(item => {
      const fullText = `${item.title} ${item.snippet} ${item.tags} ${item.category}`.toLowerCase();
      return words.every(w => fullText.includes(w));
    });

    if (matches.length === 0) {
      searchResultsDropdown.innerHTML = `
        <div class="search-empty">
          <i class="fas fa-search" style="font-size: 1.6rem; color: var(--accent-sand); opacity: 0.5; margin-bottom: 8px; display: block;"></i>
          No matches found for "<strong>${escapeHTML(query)}</strong>".<br>
          <span style="font-size: 0.78rem; color: var(--text-muted);">Try searching for: Python, Research, Forex, Robot, IJIRT, or Skills.</span>
        </div>
      `;
      searchResultsDropdown.style.display = 'flex';
      return;
    }

    // Group by category
    const grouped = {};
    matches.forEach(item => {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item);
    });

    let html = '';
    for (const [cat, items] of Object.entries(grouped)) {
      html += `<div class="search-result-group-title">${cat}</div>`;
      items.forEach(item => {
        let highlightedTitle = escapeHTML(item.title);
        words.forEach(w => {
          const regex = new RegExp(`(${w})`, 'gi');
          highlightedTitle = highlightedTitle.replace(regex, '<span class="search-highlight">$1</span>');
        });

        html += `
          <div class="search-result-item" data-target="${item.target}">
            <div class="search-result-info">
              <span class="search-result-title">${highlightedTitle}</span>
              <span class="search-result-snippet">${item.snippet}</span>
            </div>
            <span class="search-result-badge">${item.category}</span>
          </div>
        `;
      });
    }

    searchResultsDropdown.innerHTML = html;
    searchResultsDropdown.style.display = 'flex';

    // Click handler on results
    searchResultsDropdown.querySelectorAll('.search-result-item').forEach(el => {
      el.addEventListener('click', () => {
        const targetSel = el.getAttribute('data-target');
        searchResultsDropdown.style.display = 'none';
        if (globalSearchInput) globalSearchInput.value = '';
        if (mobileSearchInput) mobileSearchInput.value = '';
        if (clearSearchBtn) clearSearchBtn.style.display = 'none';

        if (targetSel) {
          const targetEl = document.querySelector(targetSel);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetEl.classList.remove('search-target-highlight');
            void targetEl.offsetWidth; // trigger reflow
            targetEl.classList.add('search-target-highlight');
          }
        }
      });
    });
  }

  if (globalSearchInput) {
    globalSearchInput.addEventListener('input', (e) => runSpotlightSearch(e.target.value));
    globalSearchInput.addEventListener('focus', () => {
      if (globalSearchInput.value.trim()) runSpotlightSearch(globalSearchInput.value);
    });
  }

  if (mobileSearchInput) {
    mobileSearchInput.addEventListener('input', (e) => runSpotlightSearch(e.target.value));
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (globalSearchInput) globalSearchInput.value = '';
      if (mobileSearchInput) mobileSearchInput.value = '';
      runSpotlightSearch('');
    });
  }

  // Keyboard shortcut: Press "/" to focus search anywhere on page
  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      if (globalSearchInput) {
        globalSearchInput.focus();
        globalSearchInput.select();
      }
    } else if (e.key === 'Escape' && searchResultsDropdown) {
      searchResultsDropdown.style.display = 'none';
      if (globalSearchInput) globalSearchInput.blur();
    }
  });

  // Close search on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-search-wrap')) {
      if (searchResultsDropdown) searchResultsDropdown.style.display = 'none';
    }
  });

  // Project Category Filter Handler
  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      const cards = document.querySelectorAll('.project-card');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('filter-hidden');
          card.style.opacity = '1';
        } else {
          card.classList.add('filter-hidden');
        }
      });
    });
  });

  // ============================================================
  // 6. RESUME DOWNLOAD GENERATOR
  // ============================================================
  function triggerResumeDownload() {
    const resumeHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Prathamesh Fatangade — Resume</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; color: #1a1a2e; max-width: 760px; margin: 0 auto; padding: 36px 30px; line-height: 1.55; font-size: 13px; }
    h1 { font-size: 26px; color: #0a0a14; margin-bottom: 3px; font-weight: 800; }
    .subtitle { font-size: 13.5px; color: #7F011F; font-weight: 700; margin-bottom: 10px; }
    .header-links { font-size: 12px; color: #4b5563; margin-bottom: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px; }
    h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 1.2px; color: #7F011F; border-bottom: 2px solid #F5EBD0; padding-bottom: 3px; margin: 18px 0 8px; font-weight: 700; }
    h3 { font-size: 13px; font-weight: 700; color: #111; margin-bottom: 2px; }
    .org-line { font-size: 12px; color: #6b7280; margin-bottom: 4px; font-weight: 500; }
    p, li { color: #374151; font-size: 12.5px; }
    ul { list-style: square; padding-left: 18px; margin-bottom: 6px; }
    .item-block { margin-bottom: 12px; }
    .tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 4px; }
    .tag { background: #FAF5E8; color: #7F011F; border: 1px solid #F5EBD0; padding: 2px 7px; border-radius: 4px; font-size: 11px; font-weight: 600; }
    @media print { body { padding: 15px; } }
  </style>
</head>
<body>
  <h1>Prathamesh Fatangade</h1>
  <p class="subtitle" style="color: #7F011F;">Computer Science Post-Graduate &bull; Software Developer &bull; Quantitative Market Trader</p>
  <div class="header-links">
    Maharashtra, India &bull; Email: fatangadeprathamesh@gmail.com &bull; GitHub: https://github.com/fatangadeprathamesh-svg
  </div>

  <h2 style="color: #7F011F; border-bottom-color: #F5EBD0;">Professional Summary</h2>
  <p>Driven Computer Science student (pursuing M.Sc.) and published researcher with technical project expertise in Edge AI, IoT-driven robotics, and full-stack software development. Additionally, possesses 4+ years of active, disciplined trading experience in Indian Equities (NSE/BSE) and Global Forex Markets with strong risk-management and quantitative analysis foundations.</p>

  <h2 style="color: #7F011F; border-bottom-color: #F5EBD0;">Education</h2>
  <div class="item-block">
    <h3>M.Sc. in Computer Science (Pursuing)</h3>
    <p class="org-line">MAEER’s MIT Arts, Commerce and Science College, Alandi (D), Pune, Maharashtra</p>
    <p>Coursework: Web Technologies, NoSQL Databases, Python Programming, Discrete Mathematics, Research Methodology, Cloud Security &amp; AI Systems.</p>
  </div>

  <h2 style="color: #7F011F; border-bottom-color: #F5EBD0;">Published Research &amp; Academic Contributions</h2>
  <div class="item-block">
    <h3>"Smart Agriculture Robot for Crop Monitoring Using IoT Sensing, Autonomous Navigation and Edge AI"</h3>
    <p class="org-line">Published in International Journal of Innovative Research in Technology (IJIRT) &bull; ISSN: 2349-6002 &bull; Impact Factor: 8.412</p>
    <p>Volume 13 Issue 5, October 2026 &bull; Registration ID: 209192</p>
    <p>Authored research presenting an autonomous agricultural ground robot with differential-drive mobility, multi-sensor IoT telemetry (soil moisture, temperature, humidity), on-board CNN edge computer vision for crop disease detection, and farmer decision support dashboards.</p>
  </div>

  <h2 style="color: #7F011F; border-bottom-color: #F5EBD0;">Financial Markets Experience (4+ Years)</h2>
  <div class="item-block">
    <h3>Indian Stock Market (NSE/BSE) &amp; Global Forex Trader &amp; Investor</h3>
    <p class="org-line">Active Market Execution (4+ Years Active Experience)</p>
    <p>&bull; <strong>Indian Equities:</strong> Technical swing trading, momentum breakout strategies, sector rotation, and long-term value compounding using volume spread analysis (VSA).</p>
    <p>&bull; <strong>Forex Trading:</strong> Multi-timeframe currency trading across major pairs (USD, EUR, GBP, JPY), session overlap dynamics (London/New York), and macroeconomic catalyst tracking.</p>
    <p>&bull; <strong>Risk Management &amp; Quant Edge:</strong> Strict 1-2% capital risk per trade, asymmetric risk-reward execution (&ge; 1:2 R:R), algorithmic Python screening, and systematic digital trade logging.</p>
  </div>

  <h2 style="color: #7F011F; border-bottom-color: #F5EBD0;">Certifications</h2>
  <div class="item-block">
    <p>&bull; <strong>Certificate of Publication:</strong> International Journal of Innovative Research in Technology (IJIRT, IF 8.412), Reg ID 209192 (Oct 2026)</p>
    <p>&bull; <strong>Generative AI Mastermind:</strong> Outskill &times; Moneycontrol (Founder: Vaibhav Sisinty) — LLM architectures, workflow automation &amp; prompt design</p>
    <p>&bull; <strong>Introduction to Cloud Security:</strong> Simplilearn SkillUp (CEO: Krishna Kumar) — Certificate Code: 10829756 (Oct 2026)</p>
  </div>

  <h2 style="color: #7F011F; border-bottom-color: #F5EBD0;">Key Projects</h2>
  <div class="item-block">
    <h3>1. Smart Agriculture Robot with Edge AI (IoT &bull; Robotics)</h3>
    <p>Autonomous ground rover with Raspberry Pi 4B, capacitive soil sensors, edge CNN crop disease screening, and cloud IoT dashboard. Published in IJIRT Journal.</p>
    <div class="tags"><span class="tag">Raspberry Pi 4B</span><span class="tag">Python</span><span class="tag">Edge CNN</span><span class="tag">IoT Telemetry</span><span class="tag">IJIRT IF 8.412</span></div>
  </div>
  <div class="item-block">
    <h3>2. Quantitative Trading Backtester &amp; Risk Engine</h3>
    <p>Python analytical framework testing Price Action, Market Structure Shifts (MSS), dynamic position sizing, and strict 1:2+ R:R capital protection.</p>
    <div class="tags"><span class="tag">Python</span><span class="tag">Pandas</span><span class="tag">NSE/BSE</span><span class="tag">Forex</span><span class="tag">Risk 1:2+</span></div>
  </div>
  <div class="item-block">
    <h3>3. Autonomous Object Following Robot (Raspberry Pi &bull; OpenCV)</h3>
    <p>Computer-vision robotic vehicle tracking dynamic targets via OpenCV contour extraction and closed-loop PID velocity modulation.</p>
    <div class="tags"><span class="tag">Raspberry Pi</span><span class="tag">OpenCV</span><span class="tag">PID Control</span><span class="tag">Robotics</span></div>
  </div>
  <div class="item-block">
    <h3>4. Personal Developer Portfolio — Luxury Editorial Edition</h3>
    <p>Bespoke portfolio designed in Wine Red (#7F011F) &amp; Light Sand (#F5EBD0) with spotlight search, 3D physics, and AI assistant.</p>
    <div class="tags"><span class="tag">HTML5 / CSS3</span><span class="tag">Vanilla JS</span><span class="tag">Spotlight Search</span><span class="tag">3D Physics</span></div>
  </div>

  <h2>Technical Skills</h2>
  <div class="tags" style="margin-bottom: 8px;">
    <span class="tag">Python</span>
    <span class="tag">JavaScript</span>
    <span class="tag">HTML5 / CSS3</span>
    <span class="tag">PHP</span>
    <span class="tag">MySQL &amp; NoSQL</span>
    <span class="tag">Raspberry Pi &amp; IoT</span>
    <span class="tag">Edge AI &amp; Computer Vision</span>
    <span class="tag">Indian Stock Market (NSE/BSE)</span>
    <span class="tag">Forex Currency Trading</span>
    <span class="tag">Technical Analysis &amp; Risk Management</span>
    <span class="tag">Git &amp; GitHub</span>
  </div>
</body>
</html>`;

    const blob = new Blob([resumeHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Prathamesh-Fatangade-Resume.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (resumeConfirm) {
      resumeConfirm.classList.add('show');
      setTimeout(() => {
        resumeConfirm.classList.remove('show');
      }, 3500);
    }
  }

  window.triggerResumeDownload = triggerResumeDownload;

  [navResumeBtn, heroResumeBtn, mobileResumeBtn].forEach(btn => {
    if (btn) btn.addEventListener('click', triggerResumeDownload);
  });

  // ============================================================
  // 6. CONTACT FORM VALIDATION & MAILTO
  // ============================================================
  if (contactForm) {
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function resetFormErrors() {
      [nameInput, emailInput, messageInput].forEach(inp => {
        if (inp) inp.classList.remove('invalid');
      });
      [nameError, emailError, messageError].forEach(err => {
        if (err) err.classList.remove('show');
      });
    }

    const pageLoadTimestamp = Date.now();

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      resetFormErrors();

      // 1. Honeypot Anti-Spam Verification (Checklist Item 10)
      const honeypot = document.getElementById('contactHoneypot');
      if (honeypot && honeypot.value.trim() !== '') {
        // Silent bot discard
        window.location.href = 'thank-you.html';
        return;
      }

      // 2. Rapid-fire Bot Rate Limiting
      if (Date.now() - pageLoadTimestamp < 2200) {
        alert('Verification note: Please take a moment before submitting.');
        return;
      }

      let isValid = true;
      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const subjectVal = subjectInput ? subjectInput.value.trim() : 'Portfolio Contact';
      const messageVal = messageInput ? messageInput.value.trim() : '';

      if (!nameVal) {
        if (nameInput) nameInput.classList.add('invalid');
        if (nameError) nameError.classList.add('show');
        isValid = false;
      }

      if (!emailVal || !emailRegex.test(emailVal)) {
        if (emailInput) emailInput.classList.add('invalid');
        if (emailError) emailError.classList.add('show');
        isValid = false;
      }

      if (!messageVal) {
        if (messageInput) messageInput.classList.add('invalid');
        if (messageError) messageError.classList.add('show');
        isValid = false;
      }

      if (!isValid) return;

      // Construct mailto link
      const emailSubject = encodeURIComponent(subjectVal || `Portfolio Contact from ${nameVal}`);
      const emailBody = encodeURIComponent(`Name: ${nameVal}\nEmail: ${emailVal}\n\nMessage:\n${messageVal}`);
      const mailtoUrl = `mailto:fatangadeprathamesh@gmail.com?subject=${emailSubject}&body=${emailBody}`;

      // Open mail client and redirect to Thank You page (Checklist Item 11)
      window.open(mailtoUrl, '_blank');
      contactForm.reset();

      setTimeout(() => {
        window.location.href = 'thank-you.html';
      }, 500);
    });

    // Clear validation errors on typing
    if (nameInput) nameInput.addEventListener('input', () => { nameInput.classList.remove('invalid'); if (nameError) nameError.classList.remove('show'); });
    if (emailInput) emailInput.addEventListener('input', () => { emailInput.classList.remove('invalid'); if (emailError) emailError.classList.remove('show'); });
    if (messageInput) messageInput.addEventListener('input', () => { messageInput.classList.remove('invalid'); if (messageError) messageError.classList.remove('show'); });
  }

  // ============================================================
  // 6b. FAQ ACCORDION ENGINE (Checklist Item 14)
  // ============================================================
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (!item) return;
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // Close other open FAQ items for clean single-view accordion
      document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isExpanded) {
        item.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ============================================================
  // 6c. COOKIE & ANALYTICS PRIVACY BANNER (Checklist Item 12)
  // ============================================================
  const cookieConsentBanner = document.getElementById('cookieConsentBanner');
  const acceptCookiesBtn = document.getElementById('acceptCookiesBtn');
  const declineCookiesBtn = document.getElementById('declineCookiesBtn');

  if (cookieConsentBanner) {
    const consent = localStorage.getItem('portfolioCookieConsent');
    if (!consent) {
      setTimeout(() => {
        cookieConsentBanner.style.display = 'block';
      }, 1600);
    }

    if (acceptCookiesBtn) {
      acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('portfolioCookieConsent', 'accepted');
        cookieConsentBanner.style.animation = 'cookieSlideUp 0.35s ease-in reverse forwards';
        setTimeout(() => cookieConsentBanner.style.display = 'none', 360);
      });
    }

    if (declineCookiesBtn) {
      declineCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('portfolioCookieConsent', 'declined');
        cookieConsentBanner.style.animation = 'cookieSlideUp 0.35s ease-in reverse forwards';
        setTimeout(() => cookieConsentBanner.style.display = 'none', 360);
      });
    }
  }

  // ============================================================
  // 7. BACK TO TOP FUNCTIONALITY
  // ============================================================
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  }

  if (backToTop) backToTop.addEventListener('click', scrollToTop);
  if (endingBackToTop) endingBackToTop.addEventListener('click', scrollToTop);

  // ============================================================
  // 8. SCROLL REVEAL OBSERVER
  // ============================================================
  function initScrollReveals() {
    const reveals = document.querySelectorAll('.reveal');
    if (prefersReducedMotion) {
      reveals.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    });

    reveals.forEach(el => observer.observe(el));
  }

  // ============================================================
  // 9. RESEARCH ABSTRACT MODAL HANDLER
  // ============================================================
  const openResearchAbstractBtn = document.getElementById('openResearchAbstractBtn');
  if (openResearchAbstractBtn && projectModal && modalBody) {
    openResearchAbstractBtn.addEventListener('click', () => {
      modalBody.innerHTML = `
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px;">
          <span style="background: rgba(127, 1, 31, 0.18); color: #F5EBD0; border: 1px solid rgba(127, 1, 31, 0.45); padding: 4px 12px; border-radius: 16px; font-size: 0.78rem; font-weight: 700;">
            <i class="fas fa-award"></i> IJIRT Peer-Reviewed Journal
          </span>
          <span style="background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); padding: 4px 12px; border-radius: 16px; font-size: 0.78rem; font-weight: 600;">
            Impact Factor: 8.412
          </span>
          <span style="background: rgba(255, 255, 255, 0.08); color: var(--text-secondary); padding: 4px 12px; border-radius: 16px; font-size: 0.78rem;">
            ISSN: 2349-6002 &bull; October 2026
          </span>
        </div>

        <h2 style="font-family: var(--font-display); font-size: 1.8rem; color: #fff; margin-bottom: 12px; line-height: 1.25;">
          Smart Agriculture Robot for Crop Monitoring Using IoT Sensing, Autonomous Navigation and Edge AI
        </h2>

        <p style="color: var(--accent-red); font-size: 0.9rem; font-weight: 600; margin-bottom: 4px;">
          Prathamesh Fatangade¹, Tejas Kalaskar², Yash Jagdale³, Yash Hinge⁴, Dr. Sunil Mahajan⁵* (Corresponding Author)
        </p>
        <p style="color: var(--text-muted); font-size: 0.82rem; margin-bottom: 18px;">
          MAEER’s MIT Arts, Commerce and Science College, Alandi (D), Pune, Maharashtra, India
        </p>

        <h4 style="font-size: 1rem; color: #fff; margin-bottom: 8px; font-weight: 700;">Full Abstract:</h4>
        <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 18px; font-size: 0.92rem; text-align: justify;">
          Smart agriculture integrates sensing, communication, automation, data analytics, and decision support to improve the management of crops and agricultural inputs. This paper presents the design and analysis of a ground-based smart agriculture robot for crop monitoring that moves through field rows or protected-cultivation corridors while collecting soil, crop, weather, and navigation information. The robot combines environmental and soil sensors, RGB or multispectral imaging, positioning devices, obstacle-detection sensors, edge computing, and wireless communication to perform frequent, geo-referenced crop scouting. Its key functions include soil-moisture mapping, microclimate monitoring, crop-row navigation, image acquisition, disease and pest symptom screening, weed observation, water-stress assessment, and alert generation, with observations reported to the farmer through a dashboard or mobile application.
        </p>

        <h4 style="font-size: 1rem; color: #fff; margin-bottom: 10px; font-weight: 700;">System Architecture Highlights:</h4>
        <ul style="list-style: none; padding-left: 0; margin-bottom: 24px;">
          <li style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 8px; display: flex; align-items: flex-start; gap: 8px;">
            <i class="fas fa-check" style="color: var(--accent-red); margin-top: 3px;"></i>
            <span><strong>Chassis &amp; Mobility:</strong> 4-wheel differential-drive ground robot with low center of gravity, high ground clearance, LiFePO₄ power pack, and physical emergency stop.</span>
          </li>
          <li style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 8px; display: flex; align-items: flex-start; gap: 8px;">
            <i class="fas fa-check" style="color: var(--accent-red); margin-top: 3px;"></i>
            <span><strong>Multi-Sensor Fusion:</strong> Capacitive soil moisture mapping, air temperature, relative humidity, light level, and ultrasonic/LiDAR obstacle avoidance.</span>
          </li>
          <li style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 8px; display: flex; align-items: flex-start; gap: 8px;">
            <i class="fas fa-check" style="color: var(--accent-red); margin-top: 3px;"></i>
            <span><strong>Edge AI Intelligence:</strong> On-device CNN classification (Raspberry Pi/Jetson) providing confidence-aware disease symptom screening and canopy coverage metrics.</span>
          </li>
          <li style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 8px; display: flex; align-items: flex-start; gap: 8px;">
            <i class="fas fa-check" style="color: var(--accent-red); margin-top: 3px;"></i>
            <span><strong>Farmer Decision Support:</strong> Contextual dashboard turning raw telemetry into actionable agronomic interventions (e.g. repairing blocked drip emitters).</span>
          </li>
        </ul>

        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <a href="assets/research/Smart_Agriculture_Robot_Research_Paper.docx" download class="btn btn-sm btn-primary">
            <i class="fas fa-file-word"></i> Download Paper (.docx)
          </a>
          <a href="assets/research/Smart_Agriculture_Robot_Book_Chapter.docx" download class="btn btn-sm btn-secondary">
            <i class="fas fa-file-word"></i> Download Book Chapter (.docx)
          </a>
          <a href="assets/certificates/IJIRT_Publication_Certificate.pdf" target="_blank" class="btn btn-sm btn-outline">
            <i class="fas fa-certificate"></i> View Certificate (.pdf)
          </a>
          <a href="https://ijirt.org/article?manuscript=209192" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">
            <i class="fas fa-external-link-alt"></i> IJIRT Online
          </a>
        </div>
      `;
      projectModal.classList.add('active');
      projectModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  }

  // ============================================================
  // 10. UPGRADED FLUID RAF 3D PHYSICS ENGINE ACROSS ALL SEGMENTS
  // ============================================================
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!prefersReducedMotion && !isTouchDevice) {

    // --- A. 3D INTRO SCREEN PARALLAX (Interpolated Inertia) ---
    const introScreenEl = document.querySelector('.intro-screen');
    const introCenterEl = document.querySelector('.intro-center');
    const introBackdropGlow = document.querySelector('.intro-backdrop-glow');
    const introGrid = document.querySelector('.intro-3d-grid');
    const introLetters = document.querySelectorAll('.intro-letter');

    if (introScreenEl && introCenterEl) {
      let targetIntroX = 0, targetIntroY = 0;
      let currIntroX = 0, currIntroY = 0;
      let introRafId = null;

      function updateIntroPhysics() {
        currIntroX += (targetIntroX - currIntroX) * 0.08;
        currIntroY += (targetIntroY - currIntroY) * 0.08;

        const rotateX = currIntroY * -20;
        const rotateY = currIntroX * 20;

        introCenterEl.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(35px)`;

        if (introBackdropGlow) {
          introBackdropGlow.style.transform = `translate(${(currIntroX * 90).toFixed(1)}px, ${(currIntroY * 60).toFixed(1)}px) scale(${1 + Math.abs(currIntroX) * 0.25})`;
        }

        if (introGrid) {
          introGrid.style.transform = `perspective(600px) rotateX(72deg) rotateZ(${(currIntroX * -14).toFixed(1)}deg) translateX(${(currIntroX * -60).toFixed(1)}px) translateY(${(currIntroY * 30).toFixed(1)}px)`;
        }

        // Chromatic micro-layer separation for 3D letters
        introLetters.forEach((letter, i) => {
          const depth = (i - 4) * 2;
          letter.style.transform = `translateZ(${(30 + Math.abs(depth) * 4).toFixed(1)}px) rotateY(${(rotateY * 0.2).toFixed(1)}deg)`;
        });

        if (introScreenEl.classList.contains('intro-fade-out')) {
          cancelAnimationFrame(introRafId);
          return;
        }

        introRafId = requestAnimationFrame(updateIntroPhysics);
      }

      introScreenEl.addEventListener('mousemove', (e) => {
        const rect = introScreenEl.getBoundingClientRect();
        targetIntroX = (e.clientX - rect.left) / rect.width - 0.5;
        targetIntroY = (e.clientY - rect.top) / rect.height - 0.5;

        if (!introRafId) {
          introRafId = requestAnimationFrame(updateIntroPhysics);
        }
      });

      introScreenEl.addEventListener('mouseleave', () => {
        targetIntroX = 0;
        targetIntroY = 0;
      });

      // Start initial physics loop
      introRafId = requestAnimationFrame(updateIntroPhysics);
    }

    // --- B. 3D HOME / HERO MULTI-PLANE PARALLAX WITH REAL-TIME LIGHTING ---
    const heroEl = document.querySelector('.hero');
    const heroContentEl = document.querySelector('.hero-content');
    const heroRedGlow = document.querySelector('.hero-red-glow');
    const heroTitleEl = document.querySelector('.hero-title');
    const heroAvatarEl = document.getElementById('heroAvatar');
    const heroBadges = document.querySelectorAll('.hero-badge-3d');

    if (heroEl && heroContentEl) {
      let targetHeroX = 0, targetHeroY = 0;
      let currHeroX = 0, currHeroY = 0;
      let heroRafRunning = false;

      function updateHeroPhysics() {
        currHeroX += (targetHeroX - currHeroX) * 0.09;
        currHeroY += (targetHeroY - currHeroY) * 0.09;

        const rotX = currHeroY * -10;
        const rotY = currHeroX * 10;

        // Content plane 3D tilt
        heroContentEl.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(22px)`;

        // Dynamic 3D text-shadow extrusion on PRATHAMESH FATANGADE
        if (heroTitleEl) {
          const sx = (-rotY * 1.8).toFixed(1);
          const sy = (rotX * 1.8).toFixed(1);
          heroTitleEl.style.textShadow = `${sx}px ${sy}px 0 #520012, ${(sx * 2).toFixed(1)}px ${(sy * 2).toFixed(1)}px 0 #2a0008, 0 15px 35px rgba(127, 1, 31, 0.45)}`;
        }

        // Ambient glow floats inversely for stereoscopic depth
        if (heroRedGlow) {
          heroRedGlow.style.transform = `translate(${(currHeroX * -90).toFixed(1)}px, ${(currHeroY * -90).toFixed(1)}px) scale(${1 + Math.abs(currHeroX) * 0.15})`;
        }

        // Avatar 3D tilt
        if (heroAvatarEl) {
          heroAvatarEl.style.transform = `perspective(900px) rotateX(${(rotX * 1.3).toFixed(2)}deg) rotateY(${(rotY * 1.3).toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`;
        }

        // Holographic badges multi-axis 3D depth pop
        heroBadges.forEach((badge, idx) => {
          const depthMultiplier = (idx + 1) * 12;
          const zDepth = 55 + idx * 18;
          badge.style.transform = `translateZ(${zDepth}px) translate(${(currHeroX * depthMultiplier).toFixed(1)}px, ${(currHeroY * depthMultiplier).toFixed(1)}px)`;
        });

        // Continue running until settled
        const isSettled = Math.abs(targetHeroX - currHeroX) < 0.001 && Math.abs(targetHeroY - currHeroY) < 0.001 && targetHeroX === 0 && targetHeroY === 0;

        if (!isSettled) {
          requestAnimationFrame(updateHeroPhysics);
        } else {
          heroRafRunning = false;
        }
      }

      heroEl.addEventListener('mousemove', (e) => {
        const rect = heroEl.getBoundingClientRect();
        targetHeroX = (e.clientX - rect.left) / rect.width - 0.5;
        targetHeroY = (e.clientY - rect.top) / rect.height - 0.5;

        if (!heroRafRunning) {
          heroRafRunning = true;
          requestAnimationFrame(updateHeroPhysics);
        }
      });

      heroEl.addEventListener('mouseleave', () => {
        targetHeroX = 0;
        targetHeroY = 0;
        if (!heroRafRunning) {
          heroRafRunning = true;
          requestAnimationFrame(updateHeroPhysics);
        }
      });
    }

    // --- C. UNIVERSAL SPRING-LERPED 3D CARD ENGINE ACROSS ALL SEGMENTS ---
    function initUniversal3DTilt() {
      const cardSelectors = [
        '.hero-avatar-wrapper',
        '.about-avatar-wrapper',
        '.profile-avatar',
        '.profile-card',
        '.project-card',
        '.research-featured-box',
        '.research-pillar-card',
        '.market-card',
        '.market-stat-tile',
        '.skill-category',
        '.cert-card',
        '.achievement-card',
        '.contact-info-item',
        '.contact-form',
        '.about-detail-item',
        '.endorsement-card',
        '.faq-item',
        '.card-3d'
      ];

      const elements = document.querySelectorAll(cardSelectors.join(', '));

      elements.forEach(el => {
        el.classList.add('card-3d-interactive');

        // Dynamically append specular glare overlay if not present
        if (!el.querySelector('.card-glare')) {
          const glare = document.createElement('div');
          glare.className = 'card-glare';
          el.appendChild(glare);
        }

        // Custom tilt parameters per element category
        let maxTilt = 14;
        let perspective = 950;
        let elevateZ = 14;

        if (el.classList.contains('hero-avatar-wrapper') || el.classList.contains('about-avatar-wrapper')) {
          maxTilt = 16;
          perspective = 850;
          elevateZ = 20;
        } else if (el.classList.contains('project-card')) {
          maxTilt = 16;
          perspective = 800;
          elevateZ = 16;
        } else if (el.classList.contains('market-card')) {
          maxTilt = 15;
          perspective = 850;
          elevateZ = 15;
        } else if (el.classList.contains('achievement-card') || el.classList.contains('cert-card')) {
          maxTilt = 15;
          perspective = 850;
          elevateZ = 16;
        } else if (el.classList.contains('research-featured-box')) {
          maxTilt = 8;
          perspective = 1400;
          elevateZ = 12;
        }

        let targetRotX = 0, targetRotY = 0;
        let currRotX = 0, currRotY = 0;
        let isHovered = false;
        let cardRaf = null;

        function animateCardPhysics() {
          currRotX += (targetRotX - currRotX) * 0.12;
          currRotY += (targetRotY - currRotY) * 0.12;

          const currentElevation = isHovered ? elevateZ : 0;
          const currentScale = isHovered ? 1.025 : 1.0;

          el.style.transform = `perspective(${perspective}px) rotateX(${currRotX.toFixed(2)}deg) rotateY(${currRotY.toFixed(2)}deg) translateZ(${currentElevation}px) scale3d(${currentScale}, ${currentScale}, ${currentScale})`;

          // Dynamic light-opposing 3D shadow cast
          if (isHovered) {
            const shadowX = (-currRotY * 1.6).toFixed(1);
            const shadowY = (currRotX * 1.6 + 18).toFixed(1);
            el.style.boxShadow = `${shadowX}px ${shadowY}px 40px rgba(0, 0, 0, 0.75), 0 0 25px rgba(127, 1, 31, 0.25)`;
          } else {
            el.style.boxShadow = '';
          }

          const hasMomentum = Math.abs(targetRotX - currRotX) > 0.02 || Math.abs(targetRotY - currRotY) > 0.02;

          if (isHovered || hasMomentum) {
            cardRaf = requestAnimationFrame(animateCardPhysics);
          } else {
            // Rest state
            el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)`;
            cardRaf = null;
          }
        }

        el.addEventListener('mouseenter', () => {
          isHovered = true;
          if (!cardRaf) {
            cardRaf = requestAnimationFrame(animateCardPhysics);
          }
        });

        el.addEventListener('mousemove', (e) => {
          const rect = el.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width; // 0 to 1
          const y = (e.clientY - rect.top) / rect.height; // 0 to 1

          targetRotX = (y - 0.5) * -maxTilt * 2;
          targetRotY = (x - 0.5) * maxTilt * 2;

          // Real-time specular glare coordinates
          el.style.setProperty('--glare-x', `${(x * 100).toFixed(1)}%`);
          el.style.setProperty('--glare-y', `${(y * 100).toFixed(1)}%`);

          if (!cardRaf) {
            cardRaf = requestAnimationFrame(animateCardPhysics);
          }
        });

        el.addEventListener('mouseleave', () => {
          isHovered = false;
          targetRotX = 0;
          targetRotY = 0;
          if (!cardRaf) {
            cardRaf = requestAnimationFrame(animateCardPhysics);
          }
        });
      });
    }

    initUniversal3DTilt();
  }

  // ============================================================
  // 11. NETFLIX-THEMED INTERACTIVE AI CHATBOT ENGINE
  // ============================================================
  const chatbotTrigger = document.getElementById('chatbotTrigger');
  const chatbotWindow = document.getElementById('chatbotWindow');
  const chatbotCloseBtn = document.getElementById('chatbotCloseBtn');
  const chatbotClearBtn = document.getElementById('chatbotClearBtn');
  const chatbotChips = document.querySelectorAll('.chat-chip');
  const chatbotMessages = document.getElementById('chatbotMessages');
  const chatTyping = document.getElementById('chatTyping');
  const chatbotForm = document.getElementById('chatbotForm');
  const chatbotInput = document.getElementById('chatbotInput');

  // Toggle Chatbot Modal
  function toggleChatbot(forceState) {
    if (!chatbotWindow) return;
    const shouldOpen = forceState !== undefined ? forceState : !chatbotWindow.classList.contains('active');
    if (shouldOpen) {
      chatbotWindow.classList.add('active');
      chatbotWindow.setAttribute('aria-hidden', 'false');
      if (chatbotInput) setTimeout(() => chatbotInput.focus(), 300);
    } else {
      chatbotWindow.classList.remove('active');
      chatbotWindow.setAttribute('aria-hidden', 'true');
    }
  }

  window.toggleChatbot = toggleChatbot;

  if (chatbotTrigger) {
    chatbotTrigger.addEventListener('click', () => toggleChatbot());
  }

  if (chatbotCloseBtn) {
    chatbotCloseBtn.addEventListener('click', () => toggleChatbot(false));
  }

  // Clear Chat History
  if (chatbotClearBtn && chatbotMessages) {
    chatbotClearBtn.addEventListener('click', () => {
      chatbotMessages.innerHTML = `
        <div class="chat-message bot-message">
          <div class="chat-msg-avatar"><i class="fas fa-robot"></i></div>
          <div class="chat-msg-bubble">
            <p>Chat cleared! 👋 How can I help you explore Prathamesh's work?</p>
            <p class="chat-msg-hint">Click any quick prompt above or ask a question about his research, trading, or projects.</p>
          </div>
        </div>
      `;
    });
  }

  // Append a message bubble to chat
  function appendMessage(sender, htmlContent) {
    if (!chatbotMessages) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}-message`;

    const avatarHtml = sender === 'bot' 
      ? '<div class="chat-msg-avatar"><i class="fas fa-robot"></i></div>'
      : '<div class="chat-msg-avatar"><i class="fas fa-user"></i></div>';

    msgDiv.innerHTML = `
      ${avatarHtml}
      <div class="chat-msg-bubble">${htmlContent}</div>
    `;

    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  // Show / Hide Typing Indicator
  function setTyping(isTyping) {
    if (!chatTyping || !chatbotMessages) return;
    if (isTyping) {
      chatTyping.style.display = 'flex';
      chatbotMessages.appendChild(chatTyping);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    } else {
      chatTyping.style.display = 'none';
    }
  }

  // Comprehensive Knowledge Base & Intent Matcher
  function getAIResponse(userText) {
    const q = userText.toLowerCase().trim();

    // 1. Research & Publication
    if (q.includes('research') || q.includes('paper') || q.includes('ijirt') || q.includes('publication') || q.includes('robot') || q.includes('agri') || q.includes('iot') || q.includes('edge ai') || q.includes('crop') || q.includes('vaishali')) {
      return `
        <p>🔬 <strong>Published Research Paper (IJIRT Journal):</strong></p>
        <p><em>"Smart Agriculture Robot for Crop Monitoring Using IoT Sensing, Autonomous Navigation and Edge AI"</em></p>
        <ul>
          <li><strong>Journal:</strong> International Journal of Innovative Research in Technology (IJIRT)</li>
          <li><strong>ISSN:</strong> 2349-6002 &bull; <strong>Impact Factor:</strong> 8.412</li>
          <li><strong>Volume &amp; Issue:</strong> Vol 13, Issue 5, October 2026 &bull; <strong>Reg ID:</strong> 209192</li>
          <li><strong>Authors:</strong> Prathamesh Fatangade (Primary Author), guided by Prof. Vaishali Patil</li>
          <li><strong>Core Tech:</strong> Autonomous differential drive, Edge CNN computer vision for leaf disease identification, IoT sensor telemetry (DHT22, soil moisture), and cloud dashboard.</li>
          <li><strong>Book Chapter:</strong> Also featured in <em>Smart Innovations in Agriculture &amp; Industry 4.0</em> (CRC Press).</li>
        </ul>
        <div class="chat-actions-row">
          <a href="#research" class="chat-action-btn" onclick="toggleChatbot(false)"><i class="fas fa-eye"></i> View Research Section</a>
          <a href="assets/research/Smart_Agriculture_Robot_Research_Paper.docx" download class="chat-action-btn"><i class="fas fa-file-word"></i> Download Paper DOCX</a>
        </div>
      `;
    }

    // 2. Stock Market & Forex Trading
    if (q.includes('stock') || q.includes('trade') || q.includes('trading') || q.includes('forex') || q.includes('market') || q.includes('nse') || q.includes('bse') || q.includes('risk') || q.includes('equity') || q.includes('currency') || q.includes('trader')) {
      return `
        <p>📈 <strong>4+ Years Financial Market Experience:</strong></p>
        <p>Prathamesh has been an active, disciplined quantitative &amp; discretionary market trader for over <strong>4 years</strong>:</p>
        <ul>
          <li><strong>Indian Equities:</strong> Trades NSE &amp; BSE large-caps, mid-caps, and index derivatives using multi-timeframe price action and Market Structure Shifts (MSS).</li>
          <li><strong>Global Forex:</strong> Active participant in major currency pairs (EUR/USD, GBP/USD, USD/JPY) with session timing analysis (London/NY overlap).</li>
          <li><strong>Risk Management:</strong> Strict <strong>1:2+ Risk-to-Reward ratio</strong> and maximum 1-2% account capital risk per position.</li>
          <li><strong>Quantitative Edge:</strong> Builds custom Python data analysis and backtesting scripts (Pandas, NumPy) to evaluate trading strategies.</li>
        </ul>
        <div class="chat-actions-row">
          <a href="#markets" class="chat-action-btn" onclick="toggleChatbot(false)"><i class="fas fa-chart-line"></i> View Markets Section</a>
        </div>
      `;
    }

    // 3. Education
    if (q.includes('education') || q.includes('degree') || q.includes('college') || q.includes('university') || q.includes('m.sc') || q.includes('msc') || q.includes('mit') || q.includes('alandi') || q.includes('pune') || q.includes('study')) {
      return `
        <p>🎓 <strong>Education &amp; Academic Background:</strong></p>
        <ul>
          <li><strong>Degree:</strong> Master of Science (M.Sc.) in Computer Science <em>(Currently Pursuing)</em></li>
          <li><strong>Institution:</strong> MAEER’s MIT Arts, Commerce and Science College (MIT ACSC), Alandi (D), Pune, Maharashtra</li>
          <li><strong>Specializations:</strong> Web Technologies, NoSQL Databases, Python Programming, Discrete Mathematics, Cloud Security &amp; Edge AI Systems.</li>
        </ul>
        <div class="chat-actions-row">
          <a href="#about" class="chat-action-btn" onclick="toggleChatbot(false)"><i class="fas fa-user"></i> About Prathamesh</a>
        </div>
      `;
    }

    // 4. Skills & Tech Stack
    if (q.includes('skill') || q.includes('stack') || q.includes('technology') || q.includes('technologies') || q.includes('language') || q.includes('python') || q.includes('javascript') || q.includes('database') || q.includes('tools')) {
      return `
        <p>💻 <strong>Technical Skills &amp; Stack:</strong></p>
        <ul>
          <li><strong>Languages:</strong> Python, JavaScript (ES6+), C/C++, SQL</li>
          <li><strong>Robotics &amp; AI:</strong> Edge AI, OpenCV, CNN Object/Disease Detection, Raspberry Pi 4B, ESP32, Sensor Telemetry</li>
          <li><strong>Web &amp; Databases:</strong> HTML5, CSS3, JavaScript, Flask, NoSQL (MongoDB), Relational SQL</li>
          <li><strong>Trading &amp; Analytics:</strong> Price Action, Technical Analysis, Quantitative Python Backtesting (Pandas, NumPy), Risk Modeling</li>
          <li><strong>Developer Tools:</strong> Git, GitHub, Linux / Shell, VS Code, Cloud Security Essentials</li>
        </ul>
        <div class="chat-actions-row">
          <a href="#skills" class="chat-action-btn" onclick="toggleChatbot(false)"><i class="fas fa-cogs"></i> View Skills Matrix</a>
        </div>
      `;
    }

    // 5. Projects
    if (q.includes('project') || q.includes('projects') || q.includes('work') || q.includes('robot') || q.includes('quant') || q.includes('object following') || q.includes('trading engine')) {
      return `
        <p>🚀 <strong>Featured Technical Projects:</strong></p>
        <ul>
          <li><strong>Smart Agriculture Robot with Edge AI:</strong> Published Raspberry Pi 4B rover with Edge AI leaf disease recognition &amp; IoT sensors (IJIRT IF 8.412).</li>
          <li><strong>Quantitative Trading Backtester &amp; Risk Engine:</strong> Python quantitative engine testing Price Action, Market Structure Shifts (MSS), and strict 1:2+ R:R capital protection.</li>
          <li><strong>Autonomous Object Following Robot:</strong> Computer-vision robotic rover using Raspberry Pi 4B and OpenCV with closed-loop PID velocity modulation.</li>
          <li><strong>Personal Developer Portfolio — Luxury Editorial Edition:</strong> Bespoke portfolio designed in Wine Red (#7F011F) &amp; Light Sand (#F5EBD0) with live spotlight search, 3D card physics, and this interactive AI assistant.</li>
        </ul>
        <div class="chat-actions-row">
          <a href="#projects" class="chat-action-btn" onclick="toggleChatbot(false)"><i class="fas fa-laptop-code"></i> Explore Projects</a>
        </div>
      `;
    }

    // 6. Certificates
    if (q.includes('cert') || q.includes('certificate') || q.includes('simplilearn') || q.includes('outskill') || q.includes('credential') || q.includes('achievement')) {
      return `
        <p>📜 <strong>Verified Certifications &amp; Credentials:</strong></p>
        <ul>
          <li><strong>IJIRT Research Publication:</strong> International Journal Certificate (Reg ID: 209192, Impact Factor: 8.412).</li>
          <li><strong>Generative AI &amp; Prompt Engineering:</strong> Industry certification from Outskill covering LLMs &amp; prompt design.</li>
          <li><strong>Cloud Security Fundamentals:</strong> SkillUp certification by Simplilearn covering cloud architecture and identity defense.</li>
        </ul>
        <div class="chat-actions-row">
          <a href="#certificates" class="chat-action-btn" onclick="toggleChatbot(false)"><i class="fas fa-award"></i> View Certificates</a>
        </div>
      `;
    }

    // 7. Contact Info & Hiring
    if (q.includes('contact') || q.includes('email') || q.includes('mail') || q.includes('gmail') || q.includes('github') || q.includes('hire') || q.includes('linkedin') || q.includes('reach') || q.includes('message') || q.includes('phone')) {
      return `
        <p>📬 <strong>Get in Touch with Prathamesh:</strong></p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:fatangadeprathamesh@gmail.com" style="color: var(--accent-sand, #F5EBD0); text-decoration: underline;">fatangadeprathamesh@gmail.com</a></li>
          <li><strong>GitHub:</strong> <a href="https://github.com/fatangadeprathamesh-svg" target="_blank" rel="noopener noreferrer" style="color: #60a5fa; text-decoration: underline;">github.com/fatangadeprathamesh-svg</a></li>
          <li><strong>Location:</strong> Maharashtra, India</li>
        </ul>
        <div class="chat-actions-row">
          <a href="mailto:fatangadeprathamesh@gmail.com" class="chat-action-btn"><i class="fas fa-envelope"></i> Send Email</a>
          <a href="https://github.com/fatangadeprathamesh-svg" target="_blank" rel="noopener noreferrer" class="chat-action-btn"><i class="fab fa-github"></i> Open GitHub</a>
          <a href="#contact" class="chat-action-btn" onclick="toggleChatbot(false)"><i class="fas fa-paper-plane"></i> Contact Form</a>
        </div>
      `;
    }

    // 8. Resume Download
    if (q.includes('resume') || q.includes('cv') || q.includes('download resume') || q.includes('bio') || q.includes('pdf')) {
      // Trigger resume generation automatically
      if (typeof triggerResumeDownload === 'function') {
        setTimeout(triggerResumeDownload, 500);
      }
      return `
        <p>📄 <strong>Resume Generation Triggered!</strong></p>
        <p>I've triggered Prathamesh's clean, printable resume download with his complete academic, research, and 4-year trading history.</p>
        <p>If the download didn't start automatically, click below:</p>
        <div class="chat-actions-row">
          <button type="button" class="chat-action-btn" onclick="triggerResumeDownload()"><i class="fas fa-download"></i> Download Resume</button>
        </div>
      `;
    }

    // 9. Greetings & Polite Responses
    if (q === 'hi' || q === 'hello' || q === 'hey' || q.startsWith('hi ') || q.startsWith('hello ') || q === 'sup' || q === 'good morning' || q === 'good evening') {
      return `
        <p>Hello there! 👋 Glad to have you here. I'm Prathamesh's AI assistant. Ask me anything about his published research paper, 4+ years of stock and forex trading experience, technical skills, or education at MIT ACSC Pune!</p>
      `;
    }

    if (q.includes('thank') || q.includes('awesome') || q.includes('cool') || q.includes('great')) {
      return `
        <p>You're very welcome! 😊 Feel free to ask anything else or click one of the quick prompts above to explore more.</p>
      `;
    }

    if (q.includes('who are you') || q.includes('what are you') || q.includes('what can you do')) {
      return `
        <p>I am <strong>Prathamesh AI</strong>, a custom intelligent assistant built for this portfolio website. I can guide you through:</p>
        <ul>
          <li>His <strong>IJIRT Research Paper</strong> on Smart Agriculture Robotics</li>
          <li>His <strong>4+ Years of Financial Trading</strong> in Indian Stocks &amp; Forex</li>
          <li>His <strong>M.Sc. Computer Science</strong> education at MIT ACSC Pune</li>
          <li>His technical skills, projects, and verified contact channels!</li>
        </ul>
      `;
    }

    // Fallback response with helpful suggestions
    return `
      <p>I'm not quite sure about that specific query, but I can definitely help you with:</p>
      <ul>
        <li><strong>Research Paper:</strong> Published in IJIRT (ISSN 2349-6002, IF 8.412)</li>
        <li><strong>Trading:</strong> 4+ years in Indian Equities (NSE/BSE) &amp; Forex</li>
        <li><strong>Education:</strong> M.Sc. CS at MIT ACSC Pune</li>
        <li><strong>Projects &amp; Skills:</strong> Python, AI Robotics, Web Tech</li>
        <li><strong>Contact:</strong> fatangadeprathamesh@gmail.com</li>
      </ul>
      <p class="chat-msg-hint">Try clicking one of the quick chips above or asking about his research or trading!</p>
    `;
  }

  // Handle User Message Input
  function handleUserMessage(queryText) {
    const text = queryText || (chatbotInput ? chatbotInput.value : '');
    if (!text || !text.trim()) return;

    if (chatbotInput) chatbotInput.value = '';

    // Append user message
    appendMessage('user', `<p>${escapeHTML(text)}</p>`);

    // Show typing indicator
    setTyping(true);

    // Realistic typing delay
    const delay = Math.min(800, Math.max(400, text.length * 15));
    setTimeout(() => {
      setTyping(false);
      const botResponse = getAIResponse(text);
      appendMessage('bot', botResponse);
    }, delay);
  }

  // Helper to escape HTML in user inputs
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // Form submission
  if (chatbotForm) {
    chatbotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleUserMessage();
    });
  }

  // Quick Chips Click Handler
  chatbotChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      if (query) {
        handleUserMessage(query);
      }
    });
  });

});


