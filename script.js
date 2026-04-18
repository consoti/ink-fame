// ===== INJECTED DATA (from generate_website.py) =====
const SHOP_ARTISTS = [{"abbr": "OD", "name": "Odin", "page": "odin.html"}, {"abbr": "AR", "name": "Aris", "page": "aris.html"}, {"abbr": "NO", "name": "Nova", "page": "nova.html"}, {"abbr": "EZ", "name": "Ezra", "page": "ezra.html"}, {"abbr": "KI", "name": "Kira", "page": "kira.html"}, {"abbr": "EF", "name": "Effy", "page": "effy.html"}, {"abbr": "CL", "name": "Cleo", "page": "cleo.html"}, {"abbr": "LU", "name": "Luna", "page": "luna.html"}, {"abbr": "KA", "name": "Kai", "page": "kai.html"}];
const SHOP_REVIEWS = [{"stars": 5, "text": "Very nice and clean place. The guy did 2 piercings for me. Very kind, informative, fast and professional. I highly recommend it especially if... you are a little hesitant about piercings. Of course I won't go to another tattoo shop anymore", "name": "Antonio", "initial": "A"}, {"stars": 5, "text": "Great job and a very nice person!!! I was very pleased and I will visit him again soon for a tattoo! Also, the place is very beautiful and everything is neat!!", "name": "Ζωη Λυμπεριαδου", "initial": "Ζ"}, {"stars": 5, "text": "We took our daughter for ear and eyebrow piercing... it didn't hurt at all... we will definitely go again because they are professionals, they made her feel comfortable without being afraid... the place is spotlessly clean.... Thank you very much 💯", "name": "Nemo ema", "initial": "N"}];

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ===== HERO SPAWN =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const heroContent = document.getElementById('heroContent');
    if (heroContent) heroContent.classList.add('animate');
  }, 120);
});

// ===== ETHEREAL SHADOW ANIMATION (desktop, fallback on Safari) =====
(function initEtherealShadow() {
  const hueEl = document.getElementById('etherealHue');
  if (!hueEl) return;
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if (isSafari) {
    // Safari: hide SVG filter, show static floating paths instead
    const ethereal = document.querySelector('.hero-ethereal');
    if (ethereal) ethereal.style.display = 'none';
    const hero = document.getElementById('hero');
    if (!hero) return;
    const svgNS = 'http://www.w3.org/2000/svg';
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden;';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 1440 900');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    svg.style.cssText = 'width:100%;height:100%;';
    const paths = [
      'M-100 900 C 300 880, 950 600, 1540 150',
      'M-100 900 C 300 885, 970 640, 1540 210',
      'M-100 900 C 300 875, 930 560, 1540 90',
      'M-100 900 C 300 888, 990 680, 1540 270',
      'M-100 900 C 300 870, 910 520, 1540 30',
      'M-100 900 C 300 892, 1010 720, 1540 330',
    ];
    paths.forEach((d, i) => {
      const el = document.createElementNS(svgNS, 'path');
      el.setAttribute('d', d);
      el.setAttribute('stroke', 'white');
      el.setAttribute('stroke-width', (0.6 + i * 0.1).toFixed(1));
      el.setAttribute('stroke-opacity', (0.12 + i * 0.02).toFixed(2));
      el.setAttribute('fill', 'none');
      svg.appendChild(el);
    });
    wrap.appendChild(svg);
    hero.insertBefore(wrap, hero.firstChild);
    return;
  }
  let hue = 0;
  const degreesPerMs = 360 / 5800;
  let last = null;
  function tick(ts) {
    if (last !== null) {
      hue = (hue + (ts - last) * degreesPerMs) % 360;
      hueEl.setAttribute('values', hue.toFixed(2));
    }
    last = ts;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();


// ===== MOBILE MENU =====
const hamburger = document.querySelector('.nav-hamburger');
const navMobile = document.getElementById('navMobile');

hamburger?.addEventListener('click', (e) => {
  e.stopPropagation();
  navMobile.classList.toggle('open');
});

function closeMobile() {
  navMobile?.classList.remove('open');
}

document.addEventListener('click', (e) => {
  if (navbar && !navbar.contains(e.target)) closeMobile();
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      closeMobile();
      const top = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ===== ZOOM PARALLAX =====
(function initZoomParallax() {
  const wrapper = document.getElementById('zoom-parallax-wrapper');
  if (!wrapper) return;

  // Scale is applied to .zp-layer (full-viewport wrapper), not the image box.
  // This mirrors the React component where scale is on the outer <motion.div>.
  const layers = Array.from(wrapper.querySelectorAll('.zp-layer'));
  // Matches Zoom_Parallax.txt scales array: [scale4, scale5, scale6, scale5, scale6, scale8, scale9]
  const maxScales = [4, 5, 6, 5, 6, 8, 9];

  function update() {
    const rect = wrapper.getBoundingClientRect();
    const vh = window.innerHeight;
    const scrolled = -rect.top;
    const total = wrapper.offsetHeight - vh;
    const progress = Math.max(0, Math.min(1, scrolled / total));

    layers.forEach((layer, i) => {
      const maxScale = maxScales[i] || 4;
      const scale = 1 + (maxScale - 1) * progress;
      layer.style.transform = `scale(${scale.toFixed(4)})`;
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ===== ORBITAL ARTISTS =====
(function initOrbital() {
  const container = document.getElementById('orbitalContainer');
  if (!container) return;

  const artists = SHOP_ARTISTS;

  container.innerHTML = `
    <div class="orbital-glow"></div>
    <div class="orbital-ring"></div>
    <div class="orbital-center">
      <div class="orbital-center-ring-1"></div>
      <div class="orbital-center-ring-2"></div>
      <div class="orbital-center-core"></div>
    </div>
    ${artists.map((a, i) => `
      <div class="orbital-node" data-id="${i}" data-page="${a.page}">
        <div class="orbital-node-circle">${a.abbr}</div>
        <span class="orbital-node-label">${a.name}</span>
        <div class="orbital-popup" id="op-${i}">
          <div class="orbital-popup-line"></div>
          <div class="orbital-popup-content">
            <div class="orbital-popup-abbr">${a.abbr}</div>
            <p class="orbital-popup-name">${a.name}</p>
            <p class="orbital-popup-role">Tattoo Artist</p>
            <a href="${a.page}" class="orbital-popup-btn">View Gallery →</a>
          </div>
        </div>
      </div>
    `).join('')}
  `;

  const nodes = Array.from(container.querySelectorAll('.orbital-node'));
  const containerSize = container.offsetWidth || 420;
  const radius = containerSize * 0.38;

  let rotationAngle = 0;
  let targetAngle = 0;
  let autoRotate = true;
  let activeId = null;
  let lastTs = null;

  // Shortest-path interpolation between two angles
  function shortestDelta(from, to) {
    let d = ((to - from) % 360 + 360) % 360;
    if (d > 180) d -= 360;
    return d;
  }

  function updatePositions(ts) {
    const delta = lastTs !== null ? ts - lastTs : 0;
    lastTs = ts;

    if (autoRotate) {
      // Slow continuous spin: ~0.3 degrees per 50ms = 6 deg/s
      rotationAngle = (rotationAngle + delta * 0.006) % 360;
      targetAngle = rotationAngle;
    } else {
      // Animate toward target — ease toward it
      const diff = shortestDelta(rotationAngle, targetAngle);
      if (Math.abs(diff) > 0.05) {
        rotationAngle += diff * 0.08; // smooth ease-out
      } else {
        rotationAngle = targetAngle;
      }
    }

    nodes.forEach((node, i) => {
      const angle = ((i / artists.length) * 360 + rotationAngle) % 360;
      const rad = (angle * Math.PI) / 180;
      const x = radius * Math.cos(rad);
      const y = radius * Math.sin(rad);
      const opacity = (activeId === i) ? 1 : 0.75;
      const zIndex = activeId === i ? 200 : Math.round(100 + 50 * Math.cos(rad));

      node.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      node.style.opacity = opacity.toFixed(2);
      node.style.zIndex = zIndex;
    });

    requestAnimationFrame(updatePositions);
  }

  requestAnimationFrame(updatePositions);

  nodes.forEach((node, i) => {
    node.addEventListener('click', (e) => {
      e.stopPropagation();

      if (activeId === i) {
        // Deselect — resume rotation
        document.querySelectorAll('.orbital-popup').forEach(p => p.classList.remove('open'));
        node.classList.remove('active');
        activeId = null;
        autoRotate = true;
      } else {
        // Select — stop rotation, animate node to top (270°)
        document.querySelectorAll('.orbital-popup').forEach(p => p.classList.remove('open'));
        document.querySelectorAll('.orbital-node').forEach(n => n.classList.remove('active'));

        activeId = i;
        autoRotate = false;

        // centerViewOnNode logic from React source:
        // targetAngle = 270 - (i / total) * 360
        const nodeBaseAngle = (i / artists.length) * 360;
        targetAngle = ((270 - nodeBaseAngle) % 360 + 360) % 360;

        node.classList.add('active');
        document.getElementById(`op-${i}`)?.classList.add('open');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      document.querySelectorAll('.orbital-popup').forEach(p => p.classList.remove('open'));
      document.querySelectorAll('.orbital-node').forEach(n => n.classList.remove('active'));
      activeId = null;
      autoRotate = true;
    }
  });
})();

// ===== TESTIMONIALS =====
(function initTestimonials() {
  const reviews = SHOP_REVIEWS;

  function makeCard(r) {
    return `<div class="testimonial-card">
      <div class="tc-stars">${'★'.repeat(r.stars)}</div>
      <p class="tc-text">&ldquo;${r.text}&rdquo;</p>
      <div class="tc-author">
        <div class="tc-avatar">${r.initial}</div>
        <div>
          <p class="tc-name">${r.name}</p>
          <p class="tc-source">Google Review</p>
        </div>
      </div>
    </div>`;
  }

  // Each column gets a different starting offset of the 3 reviews
  const offsets = [
    [0, 1, 2, 0, 1, 2],
    [1, 2, 0, 1, 2, 0],
    [2, 0, 1, 2, 0, 1],
  ];

  [0, 1, 2].forEach(ci => {
    const track = document.getElementById(`tcTrack${ci}`);
    if (!track) return;
    const cards = offsets[ci].map(i => makeCard(reviews[i])).join('');
    // Duplicate for seamless infinite loop
    track.innerHTML = cards + cards;
  });
})();

// ===== FOOTER SVG HOVER =====
(function initFooterHover() {
  const svg = document.getElementById('footerHoverSvg');
  if (!svg) return;

  const revealGrad = document.getElementById('ftReveal');
  if (!revealGrad) return;

  svg.addEventListener('mousemove', (e) => {
    const rect = svg.getBoundingClientRect();
    const cx = ((e.clientX - rect.left) / rect.width * 100).toFixed(1) + '%';
    const cy = ((e.clientY - rect.top) / rect.height * 100).toFixed(1) + '%';
    revealGrad.setAttribute('cx', cx);
    revealGrad.setAttribute('cy', cy);
  });
})();
