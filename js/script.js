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
      title: "Personal Portfolio Website — Luxury Cyber Edition",
      subtitle: "HTML5 &bull; CSS3 &bull; Vanilla JS &bull; Wine Red &bull; Light Sand",
      tags: ["HTML5", "CSS3", "JavaScript", "Responsive UI", "3D Physics", "AI Chatbot"],
      description: "A bespoke developer portfolio designed around Wine Red (#7F011F) and Light Sand (#F5EBD0) aesthetics. Features interactive categorized domain filtering, spring-lerped 3D card tilt physics, 3D canvas cosmic particle tunnel, dynamic printable resume generator, and an integrated interactive AI portfolio assistant.",
      features: [
        "Zero external JS framework dependencies — 100% pure vanilla performance",
        "Interactive domain filtering categorizing Edge AI, systems, and quant skills",
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

  // ============================================================
  // THEME MANAGEMENT (System Preference + Auto-Update + LocalStorage)
  // ============================================================
  const THEME_STORAGE_KEY = 'portfolio_theme_preference';
  const systemDarkMedia = window.matchMedia('(prefers-color-scheme: dark)');

  function getSystemTheme() {
    return systemDarkMedia.matches ? 'dark' : 'light';
  }

  function getActiveTheme() {
    try {
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (storedTheme === 'dark' || storedTheme === 'light') {
        return storedTheme;
      }
    } catch (e) {
      console.warn('Could not read theme from localStorage:', e);
    }
    // Default to user's OS/desktop preference
    return getSystemTheme();
  }

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
      btn.setAttribute('aria-label', titleText);
      const span = btn.querySelector('span');
      if (span) {
        span.textContent = isLight ? 'Dark Mode' : 'Light Mode';
      }
    });
  }

  function applyTheme(theme, isManual = false) {
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeUI(theme);

    if (isManual) {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
      } catch (e) {
        console.warn('Could not save theme to localStorage:', e);
      }
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || getActiveTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme, true); // persist manual toggle in localStorage
  }

  // 1. Detect system theme on load (respecting stored manual preference if present)
  const initialTheme = getActiveTheme();
  applyTheme(initialTheme, false);

  // 2. Update automatically when the OS theme changes
  systemDarkMedia.addEventListener('change', (e) => {
    // If user hasn't explicitly chosen a manual override in localStorage, follow OS
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (!storedTheme) {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      applyTheme(newSystemTheme, false);
    }
  });

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

  // ============================================================
  // 1. ALL-NEW CINEMATIC ANIMATED INTRO SCREEN
  // ============================================================
  const introEnterBtn = document.getElementById('introEnterBtn');
  const loaderStatusText = document.getElementById('loaderStatusText');
  const introDynamicRole = document.getElementById('introDynamicRole');

  let introExited = false;
  function enterMainPortfolio() {
    if (introExited) return;
    introExited = true;

    if (introScreen) {
      introScreen.classList.add('zoom-exit');
      setTimeout(() => {
        introScreen.classList.add('screen-hidden');
        if (mainContent) {
          mainContent.classList.remove('screen-hidden');
          initScrollReveals();
        }
      }, 550);
    }
  }

  // Handle Reduced Motion or normal intro
  if (prefersReducedMotion) {
    if (introScreen) introScreen.classList.add('screen-hidden');
    if (mainContent) {
      mainContent.classList.remove('screen-hidden');
      initScrollReveals();
    }
  } else {
    // Dynamic Role Rotation
    const introRoles = [
      "Edge AI & Robotics Researcher",
      "Quantitative Financial Trader (NSE / BSE & FX)",
      "M.Sc. Computer Science Post-Graduate",
      "Autonomous IoT & Systems Engineer"
    ];
    let currentRoleIdx = 0;
    const roleInterval = setInterval(() => {
      if (introExited || !introDynamicRole) {
        clearInterval(roleInterval);
        return;
      }
      currentRoleIdx = (currentRoleIdx + 1) % introRoles.length;
      introDynamicRole.style.opacity = '0';
      introDynamicRole.style.transform = 'translateY(-6px)';
      setTimeout(() => {
        if (introDynamicRole) {
          introDynamicRole.textContent = introRoles[currentRoleIdx];
          introDynamicRole.style.opacity = '1';
          introDynamicRole.style.transform = 'translateY(0)';
        }
      }, 250);
    }, 2200);

    // Setup 3D Cosmic Particle System for Intro Screen
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

      const numParticles = 75;
      const particles = Array.from({ length: numParticles }, () => ({
        x: (Math.random() - 0.5) * width * 1.6,
        y: (Math.random() - 0.5) * height * 1.6,
        z: Math.random() * 850 + 40,
        radius: Math.random() * 2.2 + 0.8,
        color: Math.random() > 0.45 ? '#7F011F' : (Math.random() > 0.5 ? '#F5EBD0' : '#FFFFFF'),
        speed: Math.random() * 2.6 + 1.2
      }));

      let mouse3DX = 0;
      let mouse3DY = 0;

      window.addEventListener('mousemove', (e) => {
        if (!particlesRunning) return;
        mouse3DX = (e.clientX - width / 2) * 0.12;
        mouse3DY = (e.clientY - height / 2) * 0.12;
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

    // Dynamic Quantum Energy Loader & Status Ticker
    let progress = 0;
    const interval = setInterval(() => {
      if (introExited) {
        clearInterval(interval);
        return;
      }
      progress += 1;
      if (loaderBar) loaderBar.style.width = progress + '%';
      if (loaderPercent) loaderPercent.textContent = progress + '%';

      // Dynamic Status Text
      if (loaderStatusText) {
        if (progress < 25) {
          loaderStatusText.textContent = "Initializing Quantum Core...";
        } else if (progress < 55) {
          loaderStatusText.textContent = "Calibrating Neural Vision & Edge AI...";
        } else if (progress < 80) {
          loaderStatusText.textContent = "Synchronizing Market Telemetry & Code...";
        } else if (progress < 100) {
          loaderStatusText.textContent = "Systems Optimized & Verified...";
        } else {
          loaderStatusText.textContent = "Welcome to Portfolio!";
        }
      }

      // Trigger shockwave pulse at 50% and 98%
      if ((progress === 50 || progress === 98) && introShockwave) {
        introShockwave.classList.remove('fire');
        void introShockwave.offsetWidth; // retrigger reflow
        introShockwave.classList.add('fire');
      }

      if (progress >= 100) {
        clearInterval(interval);
        particlesRunning = false;
        setTimeout(enterMainPortfolio, 550);
      }
    }, 40);

    // Skip Intro & Enter Button Listeners
    if (skipIntro) {
      skipIntro.addEventListener('click', () => {
        clearInterval(interval);
        enterMainPortfolio();
      });
    }

    if (introEnterBtn) {
      introEnterBtn.addEventListener('click', () => {
        clearInterval(interval);
        enterMainPortfolio();
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
  // ============================================================
  // 5. PROJECT & SKILL CATEGORY FILTER ENGINES
  // ============================================================
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-showcase-card');

  // Skill Domain Filter Handler
  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      skillCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1), transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
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
  // 6. RESUME DOWNLOAD HANDLER (Official Uploaded PDF Resume)
  // ============================================================
  function triggerResumeDownload() {
    // Direct download of the uploaded official PDF resume
    const pdfPath = 'assets/Prathamesh_Balasaheb_Fatangade_Resume.pdf';
    const a = document.createElement('a');
    a.href = pdfPath;
    a.download = 'Prathamesh_Balasaheb_Fatangade_Resume.pdf';
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    if (resumeConfirm) {
      resumeConfirm.innerHTML = '<i class="fas fa-check-circle"></i> Official Resume downloaded!';
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
  // 6b. COOKIE & ANALYTICS PRIVACY BANNER (Checklist Item 12)
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
  // 10. CLEAN FLAT UI HOVER INTERACTIONS (3D Effects Removed)
  // ============================================================
  // All cards and interactive elements use native high-performance
  // 2D transitions (translateY & refined shadows) configured in CSS.


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
          <li><strong>Personal Developer Portfolio — Luxury Cyber Edition:</strong> Bespoke portfolio designed in Wine Red (#7F011F) &amp; Light Sand (#F5EBD0) with 3D card physics and this interactive AI assistant.</li>
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

  // ============================================================
  // 12. FULL WEBSITE CONTINUOUS ANIMATIONS & INTERACTIVE PHYSICS
  // ============================================================

  // --- A. PERSISTENT AMBIENT BACKGROUND CANVAS ---
  const ambientCanvas = document.getElementById('ambientCanvas');
  if (ambientCanvas && !prefersReducedMotion) {
    const actx = ambientCanvas.getContext('2d');
    let aWidth = ambientCanvas.width = window.innerWidth;
    let aHeight = ambientCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      aWidth = ambientCanvas.width = window.innerWidth;
      aHeight = ambientCanvas.height = window.innerHeight;
    });

    const ambientCount = 38;
    const ambientParticles = Array.from({ length: ambientCount }, () => ({
      x: Math.random() * aWidth,
      y: Math.random() * aHeight,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2.5 + 1.2,
      color: Math.random() > 0.4 ? 'rgba(127, 1, 31, 0.4)' : 'rgba(245, 235, 208, 0.35)',
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulsePhase: Math.random() * Math.PI * 2
    }));

    let mouseAmbX = aWidth / 2;
    let mouseAmbY = aHeight / 2;

    window.addEventListener('mousemove', (e) => {
      mouseAmbX = e.clientX;
      mouseAmbY = e.clientY;
    });

    function renderAmbientBackground() {
      actx.clearRect(0, 0, aWidth, aHeight);

      // Connect nearby particles with subtle ethereal filaments
      for (let i = 0; i < ambientParticles.length; i++) {
        const p1 = ambientParticles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;
        p1.pulsePhase += p1.pulseSpeed;

        if (p1.x < -20) p1.x = aWidth + 20;
        if (p1.x > aWidth + 20) p1.x = -20;
        if (p1.y < -20) p1.y = aHeight + 20;
        if (p1.y > aHeight + 20) p1.y = -20;

        // Draw particle node
        const currentAlpha = 0.25 + Math.sin(p1.pulsePhase) * 0.15;
        actx.beginPath();
        actx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        actx.fillStyle = p1.color;
        actx.globalAlpha = currentAlpha;
        actx.fill();

        for (let j = i + 1; j < ambientParticles.length; j++) {
          const p2 = ambientParticles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            actx.beginPath();
            actx.moveTo(p1.x, p1.y);
            actx.lineTo(p2.x, p2.y);
            actx.strokeStyle = 'rgba(245, 235, 208, 0.12)';
            actx.globalAlpha = (1 - dist / 110) * 0.2;
            actx.lineWidth = 0.7;
            actx.stroke();
          }
        }
      }

      actx.globalAlpha = 1;
      requestAnimationFrame(renderAmbientBackground);
    }
    renderAmbientBackground();
  }

  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  // --- C. MAGNETIC BUTTON PHYSICS ---
  if (!isTouch && !prefersReducedMotion) {
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-resume-btn, .theme-toggle, .chatbot-trigger');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${(x * 0.28).toFixed(1)}px, ${(y * 0.28).toFixed(1)}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  // --- D. DYNAMIC ANIMATED NUMBER COUNTERS FOR STATS ---
  const counters = document.querySelectorAll('.stat-counter');
  const floatCounters = document.querySelectorAll('.stat-counter-float');

  function animateIntegerCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;
    const duration = 1800; // ms
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * target);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  function animateFloatCounter(el) {
    const target = parseFloat(el.getAttribute('data-target'));
    const decimals = parseInt(el.getAttribute('data-decimals') || '3', 10);
    if (isNaN(target)) return;
    const duration = 2200; // ms
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = (ease * target).toFixed(decimals);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toFixed(decimals);
      }
    }
    requestAnimationFrame(step);
  }

  // IntersectionObserver to start counting when scrolled into view
  let countersAnimated = false;
  const statsSection = document.querySelector('.market-stats-row');
  if (statsSection) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          counters.forEach(c => animateIntegerCounter(c));
          counterObserver.disconnect();
        }
      });
    }, { threshold: 0.2 });
    counterObserver.observe(statsSection);
  }

  let floatCountersAnimated = false;
  const researchBox = document.querySelector('.research-featured-box');
  if (researchBox) {
    const floatObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !floatCountersAnimated) {
          floatCountersAnimated = true;
          floatCounters.forEach(c => animateFloatCounter(c));
          floatObserver.disconnect();
        }
      });
    }, { threshold: 0.2 });
    floatObserver.observe(researchBox);
  }

  // ============================================================
  // 13. INTERACTIVE VISITOR REVIEWS & LOCALSTORAGE PERSISTENCE
  // (Pure real visitor reviews — zero fake reviews)
  // ============================================================
  const STORAGE_KEY_REVIEWS = 'portfolio_visitor_reviews';

  // Known fake/seed IDs and author names to purge from localStorage
  const FAKE_REVIEW_NAMES = ['Prof. S. R. Kulkarni', 'Rohan Deshmukh', 'Dr. Arvind Mehta', 'Sneha Patil'];

  function getStoredReviews() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_REVIEWS);
      if (stored) {
        let parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Permanently purge any fake seed reviews that might have been saved previously
          const realReviews = parsed.filter(r => {
            if (!r) return false;
            if (r.id && String(r.id).startsWith('rev-seed-')) return false;
            if (r.name && FAKE_REVIEW_NAMES.includes(r.name.trim())) return false;
            return true;
          });
          // Update localStorage if fake reviews were stripped
          if (realReviews.length !== parsed.length) {
            localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(realReviews));
          }
          return realReviews;
        }
      }
    } catch (e) {
      console.warn('Could not read reviews from localStorage:', e);
    }
    return [];
  }

  function saveStoredReviews(reviews) {
    try {
      localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.error('Could not save reviews to localStorage:', e);
    }
  }

  function escapeReviewHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderStarsHtml(rating) {
    let starsHtml = '';
    const rounded = Math.round(rating * 2) / 2;
    for (let i = 1; i <= 5; i++) {
      if (i <= rounded) {
        starsHtml += '<i class="fas fa-star"></i>';
      } else if (i - 0.5 === rounded) {
        starsHtml += '<i class="fas fa-star-half-alt"></i>';
      } else {
        starsHtml += '<i class="far fa-star"></i>';
      }
    }
    return starsHtml;
  }

  function renderReviewsSection(newestId = null) {
    const reviewsGrid = document.getElementById('visitorReviewsGrid');
    const overallScoreEl = document.getElementById('overallRatingScore');
    const summaryStarsEl = document.getElementById('summaryStarsRow');
    const totalCountEl = document.getElementById('totalReviewsCount');

    if (!reviewsGrid) return;

    const reviews = getStoredReviews();
    const total = reviews.length;

    // Handle Empty State (No reviews submitted yet)
    if (total === 0) {
      if (overallScoreEl) overallScoreEl.textContent = '5.0';
      if (summaryStarsEl) {
        summaryStarsEl.innerHTML = `
          <i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>
        `;
      }
      if (totalCountEl) totalCountEl.textContent = 'No reviews yet — be the first to share your thoughts!';

      reviewsGrid.innerHTML = `
        <div class="reviews-empty-state">
          <div class="empty-state-icon" aria-hidden="true">
            <i class="fas fa-feather-alt"></i>
          </div>
          <h3 class="empty-state-title">No Reviews Yet</h3>
          <p class="empty-state-desc">
            Are you exploring my portfolio or have we collaborated on software engineering, robotics, or market trading? Your feedback means a lot!
          </p>
          <button type="button" class="btn btn-primary" id="emptyStateReviewBtn">
            <i class="fas fa-pen"></i> Be the First to Leave a Review
          </button>
        </div>
      `;

      const emptyBtn = document.getElementById('emptyStateReviewBtn');
      if (emptyBtn) emptyBtn.addEventListener('click', openReviewModal);
      return;
    }

    // Calculate real score from submitted reviews
    const sum = reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0);
    const avgScore = (sum / total).toFixed(1);

    if (overallScoreEl) overallScoreEl.textContent = avgScore;
    if (summaryStarsEl) summaryStarsEl.innerHTML = renderStarsHtml(parseFloat(avgScore));
    if (totalCountEl) totalCountEl.textContent = `Based on ${total} verified visitor review${total === 1 ? '' : 's'}`;

    // Render cards
    reviewsGrid.innerHTML = reviews.map(rev => {
      const initial = (rev.name || 'V').trim().charAt(0).toUpperCase();
      const isNew = rev.id === newestId;
      return `
        <article class="visitor-review-card ${isNew ? 'newly-added' : ''}" data-review-id="${escapeReviewHtml(rev.id)}">
          <div class="review-card-top">
            <div class="review-author-info">
              <div class="review-avatar" aria-hidden="true">${escapeReviewHtml(initial)}</div>
              <div>
                <h4 class="review-author-name">${escapeReviewHtml(rev.name)}</h4>
                <p class="review-author-role">${escapeReviewHtml(rev.role)}</p>
              </div>
            </div>
            <div class="review-stars" aria-label="${rev.rating} out of 5 stars">
              ${renderStarsHtml(rev.rating)}
            </div>
          </div>

          <div class="review-category-badge">
            <i class="fas fa-tag"></i> ${escapeReviewHtml(rev.category || 'General & Portfolio')}
          </div>

          <p class="review-body-text">
            ${escapeReviewHtml(rev.comment)}
          </p>

          <div class="review-card-footer">
            <span class="review-verified-tag">
              <i class="fas fa-check-circle"></i> Verified Visitor
            </span>
            <span class="review-date">${escapeReviewHtml(rev.date || 'Recent')}</span>
          </div>
        </article>
      `;
    }).join('');
  }

  // --- REVIEW MODAL LOGIC ---
  const reviewModal = document.getElementById('reviewModal');
  const openReviewModalBtn = document.getElementById('openReviewModalBtn');
  const reviewModalClose = document.getElementById('reviewModalClose');
  const reviewModalCancelBtn = document.getElementById('reviewModalCancelBtn');
  const reviewModalBackdrop = document.getElementById('reviewModalBackdrop');
  const visitorReviewForm = document.getElementById('visitorReviewForm');
  const reviewStarPicker = document.getElementById('reviewStarPicker');
  const selectedRatingText = document.getElementById('selectedRatingText');
  const reviewRatingInput = document.getElementById('reviewRatingInput');

  const starRatingHints = {
    1: '1.0 - Needs Improvement',
    2: '2.0 - Below Expectations',
    3: '3.0 - Good Work',
    4: '4.0 - Great Experience',
    5: '5.0 - Outstanding'
  };

  function updateStarPickerUI(val) {
    if (!reviewStarPicker) return;
    const starBtns = reviewStarPicker.querySelectorAll('.star-btn');
    starBtns.forEach(btn => {
      const btnVal = parseInt(btn.getAttribute('data-value'), 10);
      if (btnVal <= val) {
        btn.classList.add('active');
        btn.classList.remove('inactive');
      } else {
        btn.classList.remove('active');
        btn.classList.add('inactive');
      }
    });
    if (reviewRatingInput) reviewRatingInput.value = val;
    if (selectedRatingText) selectedRatingText.textContent = starRatingHints[val] || `${val}.0 Rating`;
  }

  function previewStarsUI(hoverVal) {
    if (!reviewStarPicker) return;
    const starBtns = reviewStarPicker.querySelectorAll('.star-btn');
    starBtns.forEach(btn => {
      const btnVal = parseInt(btn.getAttribute('data-value'), 10);
      if (btnVal <= hoverVal) {
        btn.classList.add('hovered');
      } else {
        btn.classList.remove('hovered');
      }
    });
  }

  function clearStarPreview() {
    if (!reviewStarPicker) return;
    const starBtns = reviewStarPicker.querySelectorAll('.star-btn');
    starBtns.forEach(btn => btn.classList.remove('hovered'));
  }

  function openReviewModal() {
    if (!reviewModal) return;
    reviewModal.classList.add('active');
    reviewModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Reset alert
    const successAlert = document.getElementById('reviewSuccessAlert');
    if (successAlert) successAlert.style.display = 'none';

    // Focus name input
    const nameInput = document.getElementById('reviewAuthorName');
    if (nameInput) setTimeout(() => nameInput.focus(), 150);
  }

  function closeReviewModal() {
    if (!reviewModal) return;
    reviewModal.classList.remove('active');
    reviewModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openReviewModalBtn) openReviewModalBtn.addEventListener('click', openReviewModal);
  if (reviewModalClose) reviewModalClose.addEventListener('click', closeReviewModal);
  if (reviewModalCancelBtn) reviewModalCancelBtn.addEventListener('click', closeReviewModal);
  if (reviewModalBackdrop) reviewModalBackdrop.addEventListener('click', closeReviewModal);

  // Close modals on Esc
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (reviewModal && reviewModal.classList.contains('active')) {
        closeReviewModal();
      }
    }
  });

  // Star Picker Events
  if (reviewStarPicker) {
    const starBtns = reviewStarPicker.querySelectorAll('.star-btn');
    starBtns.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        const val = parseInt(btn.getAttribute('data-value'), 10);
        previewStarsUI(val);
      });

      btn.addEventListener('click', () => {
        const val = parseInt(btn.getAttribute('data-value'), 10);
        updateStarPickerUI(val);
      });
    });

    reviewStarPicker.addEventListener('mouseleave', () => {
      clearStarPreview();
    });
  }

  // Review Form Submit Handler
  if (visitorReviewForm) {
    const nameInput = document.getElementById('reviewAuthorName');
    const roleInput = document.getElementById('reviewAuthorRole');
    const categorySelect = document.getElementById('reviewCategory');
    const commentInput = document.getElementById('reviewCommentText');
    const nameError = document.getElementById('reviewNameError');
    const roleError = document.getElementById('reviewRoleError');
    const commentError = document.getElementById('reviewCommentError');
    const successAlert = document.getElementById('reviewSuccessAlert');
    const submitBtn = document.getElementById('reviewSubmitBtn');

    // Clear validation on type
    if (nameInput) nameInput.addEventListener('input', () => { if (nameError) nameError.style.display = 'none'; });
    if (roleInput) roleInput.addEventListener('input', () => { if (roleError) roleError.style.display = 'none'; });
    if (commentInput) commentInput.addEventListener('input', () => { if (commentError) commentError.style.display = 'none'; });

    visitorReviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const roleVal = roleInput ? roleInput.value.trim() : '';
      const catVal = categorySelect ? categorySelect.value : 'General & Portfolio';
      const commentVal = commentInput ? commentInput.value.trim() : '';
      const ratingVal = reviewRatingInput ? parseInt(reviewRatingInput.value, 10) || 5 : 5;

      if (!nameVal) {
        if (nameError) nameError.style.display = 'block';
        if (nameInput) nameInput.focus();
        isValid = false;
      }

      if (!roleVal) {
        if (roleError) roleError.style.display = 'block';
        if (!nameVal && nameInput) { /* already focused */ }
        else if (roleInput) roleInput.focus();
        isValid = false;
      }

      if (!commentVal || commentVal.length < 8) {
        if (commentError) commentError.style.display = 'block';
        if (isValid && commentInput) commentInput.focus();
        isValid = false;
      }

      if (!isValid) return;

      // Create new review
      const newReviewId = 'rev-' + Date.now();
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const now = new Date();
      const formattedDate = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;

      const newReview = {
        id: newReviewId,
        name: nameVal,
        role: roleVal,
        rating: ratingVal,
        category: catVal,
        comment: commentVal,
        date: formattedDate,
        verified: true
      };

      const currentReviews = getStoredReviews();
      currentReviews.unshift(newReview); // Prepend to top
      saveStoredReviews(currentReviews);

      // Re-render reviews with animation highlight
      renderReviewsSection(newReviewId);

      // Show success alert
      if (successAlert) {
        successAlert.style.display = 'flex';
      }
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Published!';
      }

      // Reset form
      visitorReviewForm.reset();
      updateStarPickerUI(5);

      // Close modal smoothly after 1.5s
      setTimeout(() => {
        closeReviewModal();
        if (successAlert) successAlert.style.display = 'none';
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Publish Review';
        }

        // Scroll to the review section if not visible
        const reviewsSection = document.getElementById('reviews');
        if (reviewsSection) {
          reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 1500);
    });
  }

  // Initialize reviews section on load
  renderReviewsSection();

});



