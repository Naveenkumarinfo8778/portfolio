/**
 * M. Naveen Kumar - Main Interactive Logic
 * Java Full Stack Developer Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. DYNAMIC TYPING EFFECT
  // ==========================================
  const typedRoleElement = document.getElementById('typedRole');
  const roles = [
    'Java Full Stack Developer',
    'Spring Boot & Microservices Engineer',
    'React.js Frontend Specialist',
    'AWS Cloud (S3, CloudFront) Integrator',
    'RESTful API & Database Architect'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 90;

  function typeEffect() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typedRoleElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 40;
    } else {
      typedRoleElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingDelay = 1800; // Pause at end of text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingDelay = 350; // Pause before typing new text
    }

    setTimeout(typeEffect, typingDelay);
  }
  typeEffect();

  // ==========================================
  // 2. NATIVE WEB AUDIO SYNTHESIZER (HUD SFX)
  // ==========================================
  let audioEnabled = false;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, type = 'sine', duration = 0.08, gainVal = 0.04) {
    if (!audioEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  const soundToggle = document.getElementById('soundToggle');
  soundToggle.classList.add('muted');

  soundToggle.addEventListener('click', () => {
    initAudio();
    audioEnabled = !audioEnabled;
    soundToggle.classList.toggle('muted', !audioEnabled);
    if (audioEnabled) {
      playTone(880, 'sine', 0.12, 0.08);
      showToast('🔊 HUD Sound Effects Enabled');
    } else {
      showToast('🔇 HUD Sound Effects Muted');
    }
  });

  // Attach sounds to interactive elements
  document.querySelectorAll('[data-sound="hover"]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (audioEnabled) playTone(440, 'triangle', 0.04, 0.02);
    });
  });

  document.querySelectorAll('[data-sound="click"], .cyber-btn, .hud-btn').forEach(el => {
    el.addEventListener('click', () => {
      if (audioEnabled) playTone(660, 'sine', 0.09, 0.05);
    });
  });

  // ==========================================
  // 3. KEY HIGHLIGHTS & ACHIEVEMENTS ACCORDION
  // ==========================================
  document.querySelectorAll('.achievement-card, .project-mini-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (audioEnabled) playTone(540, 'triangle', 0.04, 0.02);
    });
  });

  // ==========================================
  // 4. SKILLS FILTERING
  // ==========================================
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || filter === cat) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ==========================================
  // 5. MODALS MANAGEMENT
  // ==========================================
  // Resume Modal
  const resumeModal = document.getElementById('resumeModal');
  const printResumeBtn = document.getElementById('printResumeBtn');
  const closeResumeModal = document.getElementById('closeResumeModal');

  if (printResumeBtn && resumeModal) {
    printResumeBtn.addEventListener('click', () => {
      resumeModal.classList.add('active');
    });
  }
  if (closeResumeModal && resumeModal) {
    closeResumeModal.addEventListener('click', () => {
      resumeModal.classList.remove('active');
    });
  }

  // Project Details Modal
  const projectModal = document.getElementById('projectModal');
  const projectModalBody = document.getElementById('projectModalBody');
  const closeProjectModal = document.getElementById('closeProjectModal');

  const projectDetails = {
    '1': {
      title: 'iCleaf Framework — Enterprise Architecture & Security',
      subtitle: 'Java 17 • Spring Boot • Content Security • License System • REST APIs',
      description: 'Foundational multi-tenant enterprise framework engineered to standardize microservices patterns, enforce bulletproof content security, and govern application licensing across distributed systems.',
      challenges: [
        'Preventing unauthorized piracy, asset copying, and raw stream scraping for protected media content.',
        'Architecting a robust, tamper-resistant licensing system with cryptographic key generation and validation.',
        'Maintaining backward-compatible shared libraries across multiple internal project modules.'
      ],
      solutions: [
        'Implemented end-to-end Content Security using signed tokens, dynamic URL obfuscation, and DRM encryption.',
        'Engineered an enterprise License System featuring cryptographic key signing, device hardware binding, and renewal verification.',
        'Standardized modular Spring Boot starters with integrated auditing, metrics, and role-based access control (RBAC).'
      ]
    },
    '2': {
      title: 'iCleaf Sale — Commercial Sales & Order Management Platform',
      subtitle: 'React.js • Spring Boot • Java • MySQL • Transaction Engine',
      description: 'Commercial sales and marketplace platform driving subscription sales, customer purchase lifecycles, automated invoice generation, and real-time transaction processing.',
      challenges: [
        'Handling concurrent checkout transactions without order lockouts or database race conditions.',
        'Designing a fluid, single-page reactive shopping experience with tiered pricing and dynamic add-ons.',
        'Automated real-time license issuance immediately upon payment confirmation.'
      ],
      solutions: [
        'Configured ACID transactions in MySQL using Spring Data JPA with optimistic locking for reliable checkout processing.',
        'Built modern functional React components with responsive state management, cart orchestration, and live filtering.',
        'Integrated automated webhook listeners for payment confirmation and instant license activation.'
      ]
    },
    '3': {
      title: 'Throughout Application Notification Hub',
      subtitle: 'Spring Boot • In-App Feeds • WebSockets • Push APIs • JavaMail',
      description: 'A centralized, multi-channel notification engine delivering instant user alerts across three distinct channels: In-App notification feeds, browser/mobile Push Notifications, and automated transactional Emails.',
      challenges: [
        'Broadcasting real-time in-app alerts to thousands of active sessions with sub-50ms latency.',
        'Handling unreliable client push connections and cross-browser service worker registration.',
        'Managing high-throughput email queuing with failure retry mechanisms.'
      ],
      solutions: [
        'Engineered WebSocket event streams with fallback polling for instant In-App notification delivery.',
        'Implemented standard Web Push API protocols with background service workers for browser & mobile push alerts.',
        'Integrated asynchronous JavaMail dispatchers with templating engines and exponential backoff retry queues.'
      ]
    },
    '4': {
      title: 'Particular Course Migration Pipeline',
      subtitle: 'Java 17 • Spring Batch • MySQL • MongoDB • High-Integrity ETL',
      description: 'An automated, high-fidelity migration pipeline designed to transition specialized course structures, complex curriculum hierarchies, video assets, and user completion progress with zero downtime.',
      challenges: [
        'Migrating deeply nested relational course modules into flexible target schemas without losing foreign key relationships.',
        'Ensuring zero downtime and zero data loss for live students actively consuming courses during migration.',
        'Validating data consistency between legacy data sources and modern target repositories.'
      ],
      solutions: [
        'Constructed robust Spring Batch ETL pipelines with checkpoint-based state saves and rollback support.',
        'Performed automated dual-write verification ensuring byte-level match on all learner progress metrics.',
        'Executed seamless production migration with 100% data fidelity and uninterrupted user access.'
      ]
    }
  };

  document.querySelectorAll('.modal-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-project');
      const data = projectDetails[projId];
      if (data && projectModal && projectModalBody) {
        projectModalBody.innerHTML = `
          <div class="proj-modal-header">
            <h3>${data.title}</h3>
            <p>${data.subtitle}</p>
          </div>
          <div class="proj-modal-section">
            <h4>Overview</h4>
            <p>${data.description}</p>
          </div>
          <div class="proj-modal-section">
            <h4>Key Engineering Challenges</h4>
            <ul>
              ${data.challenges.map(c => `<li>${c}</li>`).join('')}
            </ul>
          </div>
          <div class="proj-modal-section">
            <h4>Architectural Solutions</h4>
            <ul>
              ${data.solutions.map(s => `<li>${s}</li>`).join('')}
            </ul>
          </div>
          <div style="margin-top: 1.5rem; display: flex; gap: 10px;">
            <a href="https://wa.me/918778780765?text=Hello%20Naveen,%20I'd%20like%20to%20discuss%20your%20project:%20${encodeURIComponent(data.title)}" target="_blank" class="hud-btn hud-btn-whatsapp">
              <i class="fa-brands fa-whatsapp"></i> Inquire via WhatsApp
            </a>
            <a href="mailto:mnaveenkumarm716@gmail.com?subject=${encodeURIComponent('Inquiry: ' + data.title)}" class="hud-btn hud-btn-cyan">
              <i class="fa-solid fa-envelope"></i> Email Discussion
            </a>
          </div>
        `;
        projectModal.classList.add('active');
      }
    });
  });

  if (closeProjectModal && projectModal) {
    closeProjectModal.addEventListener('click', () => {
      projectModal.classList.remove('active');
    });
  }

  // Close modals on backdrop click or ESC key
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('active');
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    }
  });

  // ==========================================
  // 7. CONTACT FORM DISPATCH LOGIC
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const sendWhatsAppSubmit = document.getElementById('sendWhatsAppSubmit');

  if (contactForm) {
    // Send via Email submit
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value;
      const email = document.getElementById('senderEmail').value;
      const phone = document.getElementById('senderPhone').value || 'Not provided';
      const subject = document.getElementById('senderSubject').value;
      const message = document.getElementById('senderMessage').value;

      const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0A%0D%0AMessage:%0D%0A${message}`;
      const mailtoUrl = `mailto:mnaveenkumarm716@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

      showToast('🚀 Opening email client to dispatch message...');
      window.location.href = mailtoUrl;
    });

    // Send via WhatsApp button
    if (sendWhatsAppSubmit) {
      sendWhatsAppSubmit.addEventListener('click', () => {
        const name = document.getElementById('senderName').value;
        const subject = document.getElementById('senderSubject').value;
        const message = document.getElementById('senderMessage').value;

        if (!name || !message) {
          showToast('⚠️ Please fill in at least Name and Message for WhatsApp');
          document.getElementById('senderName').focus();
          return;
        }

        const text = `Hi Naveen, I'm ${name}.\nSubject: ${subject || 'Portfolio Inquiry'}\n\n${message}`;
        const waUrl = `https://wa.me/918778780765?text=${encodeURIComponent(text)}`;
        showToast('💬 Redirecting to WhatsApp chat...');
        window.open(waUrl, '_blank');
      });
    }
  }

  // ==========================================
  // 8. COPY TO CLIPBOARD HELPER
  // ==========================================
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('mnaveenkumarm716@gmail.com').then(() => {
        showToast('📋 Email copied to clipboard: mnaveenkumarm716@gmail.com');
      }).catch(() => {
        showToast('Email: mnaveenkumarm716@gmail.com');
      });
    });
  }

  // ==========================================
  // 9. TOAST NOTIFICATION HELPER
  // ==========================================
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-satellite-dish highlight-cyan"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  // ==========================================
  // 10. MOBILE MENU TOGGLE
  // ==========================================
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // ==========================================
  // 11. NAVBAR SCROLL SPY & BACK TO TOP
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });

    if (backToTop) {
      if (scrollY > 500) {
        backToTop.style.display = 'flex';
      } else {
        backToTop.style.display = 'none';
      }
    }
  });

  // Current year in footer
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

});
