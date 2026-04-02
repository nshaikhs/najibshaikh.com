/* ═══════════════════════════════════════════
   NAJIB SHAIKH — PORTFOLIO v2
   GSAP ScrollTrigger, Lenis, custom cursor,
   text reveals, magnetic buttons
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Console Easter egg ─────────────────
  console.log(
    '%cLooking under the hood? I like that.',
    'font-size: 16px; font-weight: bold; color: #C9A84C; font-family: Georgia, serif;'
  );
  console.log(
    '%cThis site was built entirely in Claude Code. No design tool. No code editor.\nLet\'s talk → shaikhnajibs@gmail.com',
    'font-size: 12px; color: #888;'
  );

  // ── Register GSAP plugins ──────────────
  gsap.registerPlugin(ScrollTrigger);

  // ── Lenis smooth scroll ────────────────
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // ── Theme toggle ───────────────────────
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // ── Text split into words ──────────────
  function splitText(el) {
    const html = el.innerHTML.trim();
    const lines = html.split(/<br\s*\/?>/gi);

    el.innerHTML = lines.map(line => {
      const temp = document.createElement('span');
      temp.innerHTML = line.trim();
      const plainText = temp.textContent.trim();
      if (!plainText) return '';

      const words = plainText.split(/\s+/);
      return words.map(word =>
        `<span class="word"><span class="word-inner">${word}</span></span>`
      ).join(' ');
    }).join('<br>');
  }

  document.querySelectorAll('.split-lines').forEach(splitText);

  // ── GSAP: Set initial states ───────────
  // Hero elements
  gsap.set('.hero-label', { y: 20, opacity: 0 });
  gsap.set('.hero-stats', { y: 20, opacity: 0 });
  gsap.set('.hero-ctas', { y: 20, opacity: 0 });
  gsap.set('.scroll-indicator', { opacity: 0 });

  // Scroll-reveal elements
  gsap.set('.section-label', { y: 20, opacity: 0 });
  gsap.set('.work-card', { y: 50, opacity: 0 });
  gsap.set('.project-card', { y: 40, opacity: 0 });
  gsap.set('.project-case', { y: 40, opacity: 0 });
  gsap.set('.philosophy-card', { y: 40, opacity: 0 });
  gsap.set('.repo-card', { y: 30, opacity: 0 });
  gsap.set('.stack-intro', { y: 20, opacity: 0 });
  gsap.set('.about-layout', { y: 50, opacity: 0 });
  gsap.set('.contact-inner', { y: 50, opacity: 0 });

  // Section title word-inners (non-hero)
  document.querySelectorAll('.split-lines').forEach(el => {
    if (el.closest('.hero')) return;
    const words = el.querySelectorAll('.word-inner');
    gsap.set(words, { y: '100%' });
  });

  // ── GSAP: Hero timeline ────────────────
  const heroTl = gsap.timeline({ delay: 0.3 });

  heroTl
    .to('.hero-label', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
    .from('.hero-title .word-inner', {
      y: '110%', duration: 0.7, stagger: 0.04, ease: 'power3.out'
    }, '-=0.3')
    .from('.hero-sub .word-inner', {
      y: '110%', duration: 0.6, stagger: 0.02, ease: 'power3.out'
    }, '-=0.3')
    .to('.hero-stats', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.2')
    .to('.hero-ctas', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
    .to('.scroll-indicator', { opacity: 1, duration: 0.8 }, '-=0.2');

  // ── GSAP: Scroll-triggered reveals ─────

  // Section labels
  gsap.utils.toArray('.section-label').forEach(el => {
    gsap.to(el, {
      y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  // Section title word reveals
  document.querySelectorAll('.split-lines').forEach(el => {
    if (el.closest('.hero')) return;
    const words = el.querySelectorAll('.word-inner');
    if (!words.length) return;

    gsap.to(words, {
      y: '0%', duration: 0.7, stagger: 0.03, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  // Work cards
  gsap.utils.toArray('.work-card').forEach(card => {
    gsap.to(card, {
      y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 88%' }
    });
  });

  // Project cards (staggered per group)
  const projectCards = gsap.utils.toArray('.project-card');
  if (projectCards.length) {
    projectCards.forEach((card, i) => {
      gsap.to(card, {
        y: 0, opacity: 1, duration: 0.6, delay: i * 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 90%' }
      });
    });
  }

  // Project case studies
  gsap.utils.toArray('.project-case').forEach(card => {
    gsap.to(card, {
      y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 88%' }
    });
  });

  // Philosophy cards
  gsap.utils.toArray('.philosophy-card').forEach((card, i) => {
    gsap.to(card, {
      y: 0, opacity: 1, duration: 0.6, delay: i * 0.06, ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 88%' }
    });
  });

  // Stack intro
  if (document.querySelector('.stack-intro')) {
    gsap.to('.stack-intro', {
      y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: '.stack-intro', start: 'top 88%' }
    });
  }

  // Repo cards
  gsap.utils.toArray('.repo-card').forEach((card, i) => {
    gsap.to(card, {
      y: 0, opacity: 1, duration: 0.5, delay: i * 0.05, ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 90%' }
    });
  });

  // About
  const aboutContent = document.querySelector('.about-content');
  if (aboutContent) {
    gsap.set(aboutContent, { y: 50, opacity: 0 });
    gsap.to(aboutContent, {
      y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: aboutContent, start: 'top 80%' }
    });
  }

  // AI stats grid
  const aiStats = gsap.utils.toArray('.ai-stat');
  if (aiStats.length) {
    gsap.set(aiStats, { y: 20, opacity: 0 });
    aiStats.forEach((stat, i) => {
      gsap.to(stat, {
        y: 0, opacity: 1, duration: 0.4, delay: i * 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-ai-stats', start: 'top 88%' }
      });
    });
  }

  // Contact
  gsap.to('.contact-inner', {
    y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: '.contact-inner', start: 'top 80%' }
  });

  // ── Number counter animation ───────────
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => {
    counterObserver.observe(el);
  });

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1600;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(2, -10 * progress);
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ── Cursor glow ─────────────────────────
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  if (!isMobile) {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let glowX = 0, glowY = 0, currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
      glowX = e.clientX;
      glowY = e.clientY;
      glow.classList.add('visible');
    });

    function updateGlow() {
      currentX += (glowX - currentX) * 0.06;
      currentY += (glowY - currentY) * 0.06;
      glow.style.transform = `translate(${currentX - 250}px, ${currentY - 250}px)`;
      requestAnimationFrame(updateGlow);
    }
    requestAnimationFrame(updateGlow);
  }

  // ── Mobile hamburger menu ───────────────
  const burger = document.querySelector('.nav-burger');
  const navLinks = document.querySelector('.nav-links');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      navLinks.classList.toggle('mobile-open');
      document.body.style.overflow = navLinks.classList.contains('mobile-open') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        navLinks.classList.remove('mobile-open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Magnetic buttons ───────────────────
  document.querySelectorAll('.btn, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => { btn.style.transition = ''; }, 400);
    });
  });

  // ── Work card expand/collapse ──────────
  document.querySelectorAll('.work-card').forEach(card => {
    const header = card.querySelector('.work-card-header');
    const metrics = card.querySelector('.work-metrics');
    const body = card.querySelector('.work-body');

    function toggle() {
      const isOpen = card.classList.contains('open');

      // Close other cards
      document.querySelectorAll('.work-card.open').forEach(other => {
        if (other !== card) {
          other.classList.remove('open');
          gsap.to(other.querySelector('.work-body'), {
            height: 0, duration: 0.4, ease: 'power3.inOut'
          });
        }
      });

      if (isOpen) {
        card.classList.remove('open');
        gsap.to(body, { height: 0, duration: 0.4, ease: 'power3.inOut' });
      } else {
        card.classList.add('open');
        // Measure natural height
        gsap.set(body, { height: 'auto' });
        const h = body.offsetHeight;
        gsap.fromTo(body,
          { height: 0 },
          {
            height: h,
            duration: 0.6,
            ease: 'power3.inOut',
            onComplete: () => { body.style.height = 'auto'; }
          }
        );

        setTimeout(() => {
          lenis.scrollTo(card, { offset: -100, duration: 0.8 });
        }, 100);
      }
    }

    header.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') return;
      toggle();
    });

    metrics.addEventListener('click', toggle);
  });

  // Track mouse for project case glow
  document.querySelectorAll('.project-case').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
  });

  // Blog posts scroll animation
  const blogPosts = gsap.utils.toArray('.blog-post');
  if (blogPosts.length) {
    gsap.set(blogPosts, { y: 30, opacity: 0 });
    blogPosts.forEach((post, i) => {
      gsap.to(post, {
        y: 0, opacity: 1, duration: 0.5, delay: i * 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: post, start: 'top 90%' }
      });
    });
  }

  // ── Smooth scroll for nav links ────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        lenis.scrollTo(target, { offset: -80, duration: 1.2 });
      }
    });
  });

  // ── Nav hide/show on scroll ────────────
  const nav = document.querySelector('.nav');
  let prevScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Background change
    nav.style.background = scrollY > 100
      ? getComputedStyle(document.documentElement).getPropertyValue('--nav-bg-scroll').trim()
      : getComputedStyle(document.documentElement).getPropertyValue('--nav-bg').trim();

    // Hide on scroll down, show on scroll up
    if (scrollY > 400) {
      if (scrollY > prevScroll + 5) {
        nav.style.transform = 'translateY(-100%)';
      } else if (scrollY < prevScroll - 5) {
        nav.style.transform = 'translateY(0)';
      }
    } else {
      nav.style.transform = 'translateY(0)';
    }

    prevScroll = scrollY;
  }, { passive: true });

  // ── Card hover glow tracking ───────────
  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
  });

  // ── Logo ticker fade in ─────────────────
  const tickerWrap = document.querySelector('.ticker-wrap');
  if (tickerWrap) {
    gsap.set(tickerWrap, { opacity: 0 });
    gsap.to(tickerWrap, {
      opacity: 1, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: '.logos-section', start: 'top 90%' }
    });
  }

  // ── Conviction statement ───────────────
  const convictionSection = document.querySelector('.conviction-section');
  if (convictionSection) {
    gsap.set('.conviction', { opacity: 0 });
    gsap.to('.conviction', {
      opacity: 1, duration: 1, ease: 'power2.out',
      scrollTrigger: { trigger: convictionSection, start: 'top 75%' }
    });
  }

  // ── Footer CTA ────────────────────────
  const footerCta = document.querySelector('.footer-cta');
  if (footerCta) {
    gsap.set(footerCta, { opacity: 0, y: 15 });
    gsap.to(footerCta, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: footerCta, start: 'top 92%' }
    });
  }

  // ── Footer colophon ────────────────────
  const colophon = document.querySelector('.footer-colophon');
  if (colophon) {
    gsap.set(colophon, { opacity: 0, y: 15 });
    gsap.to(colophon, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: colophon, start: 'top 92%' }
    });
  }

  // ── Footer parallax ────────────────────
  const footerName = document.querySelector('.footer-name');
  if (footerName) {
    ScrollTrigger.create({
      trigger: '.footer',
      start: 'top bottom',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const y = (1 - self.progress) * -30;
        footerName.style.transform = `translateY(${y}px)`;
      }
    });
  }

  // ── Keyboard Easter egg ────────────────
  // Type "hire" anywhere to jump to contact
  let typed = '';
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    typed += e.key.toLowerCase();
    typed = typed.slice(-4);
    if (typed === 'hire') {
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        lenis.scrollTo(contactSection, { offset: -80, duration: 1.5 });
        gsap.fromTo('.contact-title',
          { scale: 1 },
          { scale: 1.05, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.inOut' }
        );
      }
      typed = '';
    }
  });

  // ── Tab title animation ────────────────
  const originalTitle = document.title;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      document.title = 'Still here \u2192 najibshaikh.com';
    } else {
      document.title = originalTitle;
    }
  });

});
