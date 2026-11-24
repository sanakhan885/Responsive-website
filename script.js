/**
 * SANA — AUTONOMOUS PRECISION HEALTH & CARE ECOSYSTEM
 * Noir Interactive UI Engine, Ambient Stipple Canvas, Micro-interactions & Auth Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  initHeaderScroll();
  initMobileDrawer();
  initStatsCounter();
  initWallOfHope();
  initAuthModalTriggers();
  initCardSpotlights();
});

/* ==========================================================================
   1. AMBIENT MONOCHROME STIPPLE / STAR-DUST CANVAS
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambientCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(width > 768 ? 50 : 25, 70);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.5 + 0.1,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: -Math.random() * 0.3 - 0.08,
      pulse: Math.random() * 0.02 + 0.01
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.y < -5) p.y = height + 5;
      if (p.x < -5) p.x = width + 5;
      if (p.x > width + 5) p.x = -5;

      p.alpha += Math.sin(Date.now() * p.pulse) * 0.003;
      const currentAlpha = Math.max(0.08, Math.min(0.65, p.alpha));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
      ctx.fill();
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. STICKY FROSTED HEADER SCROLL
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   3. MOBILE DRAWER MENU
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const closeBtn = document.getElementById('closeDrawerBtn');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link');

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   4. INSPIRATION AUTH FORM LOGIC (HERO & MODAL)
   ========================================================================== */

// Switch between Sign In and Create Account on Hero Card
function switchHeroAuthMode(mode) {
  const tabSignIn = document.getElementById('heroTabSignIn');
  const tabSignUp = document.getElementById('heroTabSignUp');
  const heading = document.getElementById('heroAuthHeading');
  const subtitle = document.getElementById('heroAuthSub');
  const submitLabel = document.getElementById('heroSubmitBtnLabel');

  if (mode === 'signup') {
    tabSignIn.classList.remove('active');
    tabSignUp.classList.add('active');
    heading.textContent = 'Create Sovereign Account';
    subtitle.textContent = 'Begin your verified genomic advocacy journey';
    submitLabel.textContent = 'Create Account';
  } else {
    tabSignIn.classList.add('active');
    tabSignUp.classList.remove('active');
    heading.textContent = 'Welcome Back';
    subtitle.textContent = 'Enter your sovereign credentials to access your portal';
    submitLabel.textContent = 'Sign in';
  }
}

// Switch between Sign In and Create Account on Global Modal
function switchModalAuthMode(mode) {
  const tabSignIn = document.getElementById('modalTabSignIn');
  const tabSignUp = document.getElementById('modalTabSignUp');
  const heading = document.getElementById('modalAuthHeading');
  const subtitle = document.getElementById('modalAuthSub');
  const submitLabel = document.getElementById('modalSubmitBtnLabel');

  if (mode === 'signup') {
    tabSignIn.classList.remove('active');
    tabSignUp.classList.add('active');
    heading.textContent = 'Create Sovereign Account';
    subtitle.textContent = 'Begin your verified genomic advocacy journey';
    submitLabel.textContent = 'Create Account';
  } else {
    tabSignIn.classList.add('active');
    tabSignUp.classList.remove('active');
    heading.textContent = 'Welcome Back';
    subtitle.textContent = 'Enter your sovereign credentials to access your portal';
    submitLabel.textContent = 'Sign in';
  }
}

// Handle Hero Form Submission with tactile simulation
function handleHeroAuthSubmit(event) {
  event.preventDefault();
  const btn = document.getElementById('heroSubmitBtn');
  const label = document.getElementById('heroSubmitBtnLabel');
  const emailInput = document.getElementById('heroEmail');
  const passInput = document.getElementById('heroPassword');

  const originalText = label.textContent;
  btn.disabled = true;
  label.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...';

  setTimeout(() => {
    btn.disabled = false;
    label.textContent = originalText;
    showToast('Vault Authenticated', `Welcome, ${emailInput.value.split('@')[0]}! Sovereign session initialized.`);
    emailInput.value = '';
    passInput.value = '';
    const first = document.getElementById('heroFirstName');
    const last = document.getElementById('heroLastName');
    if (first) first.value = '';
    if (last) last.value = '';
  }, 1200);
}

// Handle Modal Form Submission
function handleModalAuthSubmit(event) {
  event.preventDefault();
  const btn = document.getElementById('modalSubmitBtn');
  const label = document.getElementById('modalSubmitBtnLabel');
  const emailInput = document.getElementById('modalEmail');
  const passInput = document.getElementById('modalPassword');

  const originalText = label.textContent;
  btn.disabled = true;
  label.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...';

  setTimeout(() => {
    btn.disabled = false;
    label.textContent = originalText;
    closeGlobalAuthModal();
    showToast('Vault Authenticated', `Welcome back to SANA! Access granted.`);
    emailInput.value = '';
    passInput.value = '';
    const first = document.getElementById('modalFirstName');
    const last = document.getElementById('modalLastName');
    if (first) first.value = '';
    if (last) last.value = '';
  }, 1100);
}

// Toggle password text/password visibility
function togglePasswordVisibility(inputId, btnEl) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const icon = btnEl.querySelector('i');
  if (input.type === 'password') {
    input.type = 'text';
    if (icon) {
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  } else {
    input.type = 'password';
    if (icon) {
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    }
  }
}

// SSO single-click simulation
function handleSsoSimulation(provider) {
  showToast(`${provider} Secure Auth`, `Connecting sovereign identity with ${provider}...`);
  setTimeout(() => {
    showToast('Identity Verified', `Biometric authentication handshake completed with ${provider}.`);
    closeGlobalAuthModal();
  }, 1000);
}

function handleForgotPasswordNotice() {
  showToast('Password Recovery', 'A cryptographic recovery challenge has been sent to your registered address.');
}

/* ==========================================================================
   5. GLOBAL AUTH MODAL SYSTEM
   ========================================================================== */
function initAuthModalTriggers() {
  const modal = document.getElementById('globalAuthModal');
  const closeBtn = document.getElementById('closeModalTrigger');
  const openButtons = document.querySelectorAll('.open-auth-modal');

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode') || 'signin';
      switchModalAuthMode(mode);
      openGlobalAuthModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeGlobalAuthModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeGlobalAuthModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeGlobalAuthModal();
    }
  });
}

function openGlobalAuthModal() {
  const modal = document.getElementById('globalAuthModal');
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeGlobalAuthModal() {
  const modal = document.getElementById('globalAuthModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* ==========================================================================
   6. STATS & TELEMETRY COUNTER (INTERSECTION OBSERVER)
   ========================================================================== */
function initStatsCounter() {
  const counters = document.querySelectorAll('.stat-counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target'));
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        animateCounter(el, target, decimals);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el, target, decimals = 0) {
  const duration = 1800;
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    const currentVal = ease * target;

    if (decimals > 0) {
      el.textContent = currentVal.toFixed(decimals);
    } else {
      el.textContent = Math.floor(currentVal).toLocaleString();
    }

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = decimals > 0 ? target.toFixed(decimals) : target.toLocaleString();
    }
  }

  requestAnimationFrame(step);
}

/* ==========================================================================
   7. INTERACTIVE TERMINAL PREVIEW TABS
   ========================================================================== */
function switchTerminalView(viewName, btn) {
  const allTabs = document.querySelectorAll('.terminal-tab');
  const allViews = document.querySelectorAll('.terminal-content-view');

  allTabs.forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  allViews.forEach(v => v.classList.remove('active'));

  if (viewName === 'patient') {
    const v = document.getElementById('terminalPatientView');
    if (v) v.classList.add('active');
  } else if (viewName === 'clinician') {
    const v = document.getElementById('terminalClinicianView');
    if (v) v.classList.add('active');
  } else if (viewName === 'researcher') {
    const v = document.getElementById('terminalResearcherView');
    if (v) v.classList.add('active');
  }
}

/* ==========================================================================
   8. WALL OF HOPE (DYNAMIC DEDICATION RIBBONS)
   ========================================================================== */
const defaultDedications = [
  {
    name: 'For Marcus V.',
    date: 'Today',
    tone: 'silver',
    message: 'Two years cancer-free this week. To anyone currently in chemo: keep your head high and your heart steady. You are never alone.'
  },
  {
    name: 'Elena & The St. Jude Team',
    date: 'Yesterday',
    tone: 'cyan',
    message: 'Thank you Sana for funding the clinical flight when every door seemed closed. We felt surrounded by an army of care.'
  },
  {
    name: 'In Honor of Rachel T.',
    date: 'Nov 20, 2026',
    tone: 'obsidian',
    message: 'Her fierce courage and radiant laughter continue to guide every step our foundation takes. Her legacy breathes life.'
  },
  {
    name: 'David & Sofia M.',
    date: 'Nov 18, 2026',
    tone: 'silver',
    message: 'Our pediatric caseworker was a miracle in our darkest hour. Grateful beyond words for the direct housing stipend.'
  },
  {
    name: 'Dr. Raymond & Staff',
    date: 'Nov 15, 2026',
    tone: 'cyan',
    message: 'Clinical excellence without empathy is incomplete. Here we stand with every patient walking through our doors.'
  },
  {
    name: 'Warrior Julian K.',
    date: 'Nov 12, 2026',
    tone: 'silver',
    message: 'Stage IV does not define the finish line. 8 months into targeted immunotherapy and every scan is clean. Keep fighting!'
  }
];

function initWallOfHope() {
  const saved = localStorage.getItem('sana_dedications');
  let dedications = defaultDedications;
  if (saved) {
    try {
      dedications = JSON.parse(saved);
    } catch (e) {
      dedications = defaultDedications;
    }
  }
  renderWallRibbons(dedications);
}

function renderWallRibbons(dedications) {
  const grid = document.getElementById('wallRibbonGrid');
  if (!grid) return;

  grid.innerHTML = dedications.map(item => {
    let toneClass = 'tone-silver';
    let toneName = 'Platinum Beacon';
    if (item.tone === 'cyan') {
      toneClass = 'tone-cyan';
      toneName = 'Cyan Luminescence';
    } else if (item.tone === 'obsidian') {
      toneClass = 'tone-obsidian';
      toneName = 'Obsidian Strength';
    }

    return `
      <div class="ribbon-tile">
        <div>
          <div class="ribbon-tile-header">
            <span class="ribbon-author">${escapeHtml(item.name)}</span>
            <span class="ribbon-date">${escapeHtml(item.date)}</span>
          </div>
          <p class="ribbon-msg">“${escapeHtml(item.message)}”</p>
        </div>
        <div class="ribbon-meta">
          <span class="ribbon-meta-icon ${toneClass}"></span>
          <span>${toneName}</span>
        </div>
      </div>
    `;
  }).join('');
}

function handleDedicationSubmit(event) {
  event.preventDefault();
  const nameInput = document.getElementById('dedicationName');
  const msgInput = document.getElementById('dedicationMessage');
  const toneRadios = document.getElementsByName('toneOption');

  let selectedTone = 'silver';
  for (let r of toneRadios) {
    if (r.checked) {
      selectedTone = r.value;
      break;
    }
  }

  const newDedication = {
    name: nameInput.value.trim(),
    message: msgInput.value.trim(),
    tone: selectedTone,
    date: 'Just now'
  };

  const saved = localStorage.getItem('sana_dedications');
  let dedications = defaultDedications;
  if (saved) {
    try {
      dedications = JSON.parse(saved);
    } catch (e) {
      dedications = defaultDedications;
    }
  }

  dedications.unshift(newDedication);
  localStorage.setItem('sana_dedications', JSON.stringify(dedications));
  renderWallRibbons(dedications);

  nameInput.value = '';
  msgInput.value = '';

  showToast('Beacon Dedicated', 'Your ribbon of courage has been permanently illuminated on the Wall of Hope.');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/* ==========================================================================
   9. FAQ ACCORDION
   ========================================================================== */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  if (!item) return;

  const isOpen = item.classList.contains('open');

  // Optional: close other accordions
  document.querySelectorAll('.faq-item').forEach(el => {
    if (el !== item) el.classList.remove('open');
  });

  if (isOpen) {
    item.classList.remove('open');
  } else {
    item.classList.add('open');
  }
}

/* ==========================================================================
   10. NEWSLETTER & CTA HANDLER
   ========================================================================== */
function handleNewsletterSubmit(event) {
  event.preventDefault();
  const input = document.getElementById('newsletterInput');
  if (!input) return;

  const email = input.value;
  input.value = '';
  showToast('Priority Access Granted', `Briefing updates reserved for ${email}. Check your inbox for confirmation.`);
}

/* ==========================================================================
   11. TOAST NOTIFICATION SYSTEM
   ========================================================================== */
let toastTimeout;
function showToast(title, desc, icon = 'fa-solid fa-circle-check') {
  const toast = document.getElementById('toastBox');
  const titleEl = document.getElementById('toastTitleEl');
  const descEl = document.getElementById('toastDescEl');
  const iconEl = document.getElementById('toastIconEl');

  if (!toast) return;

  clearTimeout(toastTimeout);

  if (titleEl) titleEl.textContent = title;
  if (descEl) descEl.textContent = desc;
  if (iconEl) iconEl.innerHTML = `<i class="${icon}"></i>`;

  toast.classList.add('show');

  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ==========================================================================
   12. CARD SPOTLIGHT MICRO-INTERACTION (PREMIUM NOIR LIGHT FEEL)
   ========================================================================== */
function initCardSpotlights() {
  const cards = document.querySelectorAll('.inspiration-card, .bento-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}
