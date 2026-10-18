// Motion layer: boot intro, decrypting headlines, hero particle field, typed profile,
// tilt cards, magnetic buttons, and scroll-drawn timelines. Fully skipped for reduced motion.
(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    root.classList.remove("is-booting");
    return;
  }

  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const glyphs = "01ABCDEF#$%&*<>/\\{}[]=+";
  const randomGlyph = () => glyphs[Math.floor(Math.random() * glyphs.length)];

  // ---------- Decrypting text ----------
  const decrypt = (element, { duration = 900 } = {}) => {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) {
      if (walker.currentNode.nodeValue.trim()) nodes.push({ node: walker.currentNode, text: walker.currentNode.nodeValue });
    }
    const total = nodes.reduce((sum, item) => sum + item.text.length, 0);
    if (!total) return;
    element.setAttribute("aria-label", element.textContent.replace(/\s+/g, " ").trim());

    const start = performance.now();
    const frame = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const settled = Math.floor(progress * total);
      let offset = 0;
      nodes.forEach(({ node, text }) => {
        let output = "";
        for (let i = 0; i < text.length; i += 1) {
          const char = text[i];
          const position = offset + i;
          if (char === " " || position < settled) output += char;
          else if (position < settled + 6) output += randomGlyph();
          else output += char;
        }
        node.nodeValue = output;
        offset += text.length;
      });
      if (progress < 1) requestAnimationFrame(frame);
      else {
        nodes.forEach(({ node, text }) => { node.nodeValue = text; });
        element.removeAttribute("aria-label");
      }
    };
    requestAnimationFrame(frame);
  };

  // ---------- Typed code profile ----------
  const typeProfile = () => {
    const profile = document.querySelector(".code-profile");
    if (!profile) return;
    const walker = document.createTreeWalker(profile, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) {
      if (walker.currentNode.parentElement.closest("p")) nodes.push({ node: walker.currentNode, text: walker.currentNode.nodeValue });
    }
    nodes.forEach((item) => { item.node.nodeValue = ""; });
    profile.classList.add("is-typing");

    const caret = document.createElement("span");
    caret.className = "type-caret";
    caret.setAttribute("aria-hidden", "true");

    let nodeIndex = 0;
    let charIndex = 0;
    const step = () => {
      const current = nodes[nodeIndex];
      if (!current) {
        setTimeout(() => caret.remove(), 2400);
        profile.classList.remove("is-typing");
        return;
      }
      charIndex += 1;
      current.node.nodeValue = current.text.slice(0, charIndex);
      current.node.parentElement.closest("p").append(caret);
      if (charIndex >= current.text.length) {
        nodeIndex += 1;
        charIndex = 0;
      }
      setTimeout(step, current.text[charIndex - 1] === "," ? 120 : 16 + Math.random() * 22);
    };
    setTimeout(step, 350);
  };

  // ---------- Hero particle field ----------
  const startHeroField = () => {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const canvas = document.createElement("canvas");
    canvas.className = "hero-field";
    canvas.setAttribute("aria-hidden", "true");
    hero.prepend(canvas);
    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let particles = [];
    let running = false;
    let frameId = 0;
    const pointer = { x: -9999, y: -9999 };
    const linkDistance = 118;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = hero.clientWidth;
      height = hero.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.round(Math.min(78, (width * height) / 14000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.3 + 0.5
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 150 && distance > 0.1) {
          p.x -= (dx / distance) * 0.45;
          p.y -= (dy / distance) * 0.45;
        }
      }

      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < linkDistance) {
            context.strokeStyle = `rgba(57, 226, 192, ${(1 - distance / linkDistance) * 0.16})`;
            context.lineWidth = 0.6;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
        const pointerDistance = Math.hypot(a.x - pointer.x, a.y - pointer.y);
        if (pointerDistance < 190) {
          context.strokeStyle = `rgba(88, 186, 255, ${(1 - pointerDistance / 190) * 0.32})`;
          context.lineWidth = 0.7;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(pointer.x, pointer.y);
          context.stroke();
        }
        context.fillStyle = pointerDistance < 190 ? "rgba(164, 255, 235, 0.9)" : "rgba(57, 226, 192, 0.5)";
        context.beginPath();
        context.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        context.fill();
      }
      frameId = requestAnimationFrame(draw);
    };

    const setRunning = (shouldRun) => {
      if (shouldRun === running) return;
      running = shouldRun;
      if (running) frameId = requestAnimationFrame(draw);
      else cancelAnimationFrame(frameId);
    };

    resize();
    let resizeTimer = 0;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    });

    let heroVisible = true;
    new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      setRunning(heroVisible && !document.hidden);
    }).observe(hero);
    document.addEventListener("visibilitychange", () => setRunning(heroVisible && !document.hidden));

    const art = hero.querySelector(".hero-art");
    hero.addEventListener("pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      if (art && finePointer) {
        art.style.setProperty("--hx", ((pointer.x / rect.width) * 2 - 1).toFixed(3));
        art.style.setProperty("--hy", ((pointer.y / rect.height) * 2 - 1).toFixed(3));
      }
    });
    hero.addEventListener("pointerleave", () => {
      pointer.x = -9999;
      pointer.y = -9999;
      art?.style.setProperty("--hx", "0");
      art?.style.setProperty("--hy", "0");
    });

    setRunning(true);
    requestAnimationFrame(() => canvas.classList.add("is-live"));
  };

  // ---------- Hero entrance (runs after the boot screen) ----------
  const playHero = () => {
    const headline = document.querySelector(".hero h1");
    if (headline) decrypt(headline, { duration: 1100 });
    typeProfile();
  };

  // ---------- Boot intro (once per session) ----------
  const runBoot = (onDone) => {
    let seen = false;
    try { seen = sessionStorage.getItem("ab-booted") === "1"; } catch { /* storage unavailable */ }
    if (seen) {
      root.classList.remove("is-booting");
      onDone();
      return;
    }

    const screen = document.createElement("div");
    screen.className = "boot-screen";
    screen.setAttribute("aria-hidden", "true");
    screen.innerHTML = `
      <div class="boot-panel">
        <div class="boot-mark">AB</div>
        <ul class="boot-lines"></ul>
        <div class="boot-bar"></div>
        <div class="boot-meta"><span>SECURE SESSION</span><span class="boot-percent">0%</span></div>
      </div>`;
    document.body.append(screen);

    const lines = [
      ["Initializing secure shell", "OK"],
      ["Verifying evidence integrity", "SHA-256"],
      ["Loading IOC signatures", "1,284"],
      ["Mapping threat surface", "DONE"],
      ["Access granted", "T. ANIL BABU"]
    ];
    const list = screen.querySelector(".boot-lines");
    const percent = screen.querySelector(".boot-percent");
    let finished = false;
    const timers = [];

    const finish = () => {
      if (finished) return;
      finished = true;
      timers.forEach(clearTimeout);
      try { sessionStorage.setItem("ab-booted", "1"); } catch { /* storage unavailable */ }
      screen.style.setProperty("--boot-progress", "1");
      screen.classList.add("is-leaving");
      root.classList.remove("is-booting");
      onDone();
      setTimeout(() => screen.remove(), 1000);
    };

    lines.forEach(([label, value], index) => {
      timers.push(setTimeout(() => {
        const item = document.createElement("li");
        item.innerHTML = `<span>&gt; ${label}</span><b>${value}</b>`;
        list.append(item);
        const progress = (index + 1) / lines.length;
        screen.style.setProperty("--boot-progress", progress.toFixed(2));
        percent.textContent = `${Math.round(progress * 100)}%`;
      }, 120 + index * 230));
    });
    timers.push(setTimeout(finish, 120 + lines.length * 230 + 380));

    screen.addEventListener("click", finish);
    window.addEventListener("keydown", finish, { once: true });
  };

  // ---------- Section headings decrypt on first reveal ----------
  const headingObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      setTimeout(() => decrypt(entry.target, { duration: 750 }), 120);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll(".section h2").forEach((heading) => headingObserver.observe(heading));

  // ---------- Tag stagger index ----------
  document.querySelectorAll(".preview-tags, .card-tags, .tool-list").forEach((group) => {
    [...group.children].forEach((tag, index) => tag.style.setProperty("--tag-i", index));
  });

  // ---------- Tilt + spotlight cards ----------
  if (finePointer) {
    document.querySelectorAll(".focus-card, .work-card, .tool-card, .cert-card").forEach((card) => {
      card.classList.add("tilt-card");
      let frame = 0;
      card.addEventListener("pointermove", (event) => {
        if (frame) return;
        frame = requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width;
          const y = (event.clientY - rect.top) / rect.height;
          card.style.setProperty("--tilt-x", `${((0.5 - y) * 7).toFixed(2)}deg`);
          card.style.setProperty("--tilt-y", `${((x - 0.5) * 9).toFixed(2)}deg`);
          card.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
          card.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
          card.classList.add("is-tilting");
          frame = 0;
        });
      });
      card.addEventListener("pointerleave", () => {
        cancelAnimationFrame(frame);
        frame = 0;
        card.classList.remove("is-tilting");
      });
    });

    // ---------- Magnetic buttons ----------
    document.querySelectorAll("main .button").forEach((button) => {
      button.classList.add("is-magnetic");
      button.addEventListener("pointermove", (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        button.classList.add("is-pulled");
        button.style.setProperty("--bx", `${(x * 0.28).toFixed(1)}px`);
        button.style.setProperty("--by", `${(y * 0.4).toFixed(1)}px`);
      });
      button.addEventListener("pointerleave", () => {
        button.classList.remove("is-pulled");
        button.style.setProperty("--bx", "0px");
        button.style.setProperty("--by", "0px");
      });
    });
  }

  // ---------- Click ripple ----------
  document.addEventListener("pointerdown", (event) => {
    const button = event.target.closest(".button, .preview-open");
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.setAttribute("aria-hidden", "true");
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    button.append(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  });

  // ---------- Scroll-drawn timeline ----------
  const timelines = [...document.querySelectorAll(".timeline")];
  let drawFrame = 0;
  const drawTimelines = () => {
    if (drawFrame) return;
    drawFrame = requestAnimationFrame(() => {
      timelines.forEach((timeline) => {
        const rect = timeline.getBoundingClientRect();
        const progress = (window.innerHeight * 0.8 - rect.top) / rect.height;
        timeline.style.setProperty("--draw", Math.min(1, Math.max(0, progress)).toFixed(3));
      });
      drawFrame = 0;
    });
  };
  window.addEventListener("scroll", drawTimelines, { passive: true });
  window.addEventListener("resize", drawTimelines);
  drawTimelines();

  startHeroField();
  runBoot(playHero);
})();
