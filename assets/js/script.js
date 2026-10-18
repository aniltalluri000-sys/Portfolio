const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();

const header = document.querySelector(".site-header");
const scrollProgress = document.createElement("div");
scrollProgress.className = "scroll-progress";
scrollProgress.setAttribute("aria-hidden", "true");
header.append(scrollProgress);

let scrollFrame = 0;
const updateScrollProgress = () => {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
    scrollProgress.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    document.body.style.setProperty("--scroll-shift", `${Math.round(window.scrollY * -0.035)}px`);
    scrollFrame = 0;
  });
};

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(
  ".section-kicker, .section h2, .focus-card, .work-card, .timeline-row, .education-row, .tool-card, .cert-card, .contact-card"
);

const previewTargets = [
  {
    selector: ".focus-card",
    section: "PROFILE",
    summary: "p",
    details: ".preview-tags span",
    highlights: [
      ["Evidence acquisition and preservation", "Documented evidence handling and report writing", "Forensic methods developed through internship experience"],
      ["Review file hashes, IP addresses, and domains", "Correlate endpoint and log activity", "Use IOC context to support incident investigation"],
      ["Inspect packet-level and traffic details", "Use network context during security analysis", "Apply Wireshark and TCPDump in network review"],
      ["Practice only in authorized lab environments", "Explore vulnerability assessment workflows", "Use Kali Linux and Metasploit for hands-on learning"]
    ]
  },
  {
    selector: ".work-card",
    section: "SELECTED WORK",
    summary: ":scope > p:not(.card-kicker):not(.card-preview)",
    description: ".card-preview",
    details: ".card-tags span",
    highlights: [
      ["Designed and deployed a Wazuh SIEM/XDR detection system", "Used endpoint and centralized event visibility to support incident review", "Explored real-time detection and response workflows"],
      ["Created rules for malicious hashes, IP addresses, and domains", "Matched indicators against available log and endpoint data", "Focused on useful signals for investigation"],
      ["Brought system, network, and file-integrity events together", "Used centralized logs to review related activity", "Applied event correlation to incident analysis"],
      ["Collected, preserved, and documented evidence", "Followed chain-of-custody practices", "Prepared clear forensic findings for case review"]
    ]
  },
  {
    selector: ".tool-card",
    section: "TOOLKIT",
    summary: ":scope > p",
    details: ".tool-list span",
    highlights: [
      ["Kali Linux security lab environment", "Metasploit for controlled practical exercises", "Ethical hacking and vulnerability assessment fundamentals"],
      ["Wireshark packet inspection", "TCPDump command-line traffic capture", "Network analysis to add context to investigations"],
      ["Autopsy and FTK Imager for forensic workflows", "UFED exposure through training", "Evidence acquisition, preservation, and documentation"],
      ["Wazuh SIEM/XDR monitoring", "IOC and event correlation concepts", "Python scripting fundamentals"]
    ]
  },
  {
    selector: ".cert-card",
    section: "CERTIFICATION",
    summary: ".cert-preview",
    description: "p",
    details: ".cert-index",
    highlights: [
      ["Cybersecurity fundamentals", "Ethical hacking concepts and responsible practice", "Two-day workshop format"],
      ["Networking foundations", "Core concepts that support traffic analysis", "Cisco Networking Academy training"],
      ["Digital forensics fundamentals", "Introductory investigation workflow concepts", "Training completed through Centri"],
      ["Windows operating-system forensics", "Forensic study of Windows evidence", "Course completed through Coursera"],
      ["Android application security fundamentals", "Mobile application security in lab settings", "Mobile Hacking Labs training"]
    ]
  }
];

const createPreviewDialog = () => {
  const dialog = document.createElement("dialog");
  dialog.className = "preview-dialog";
  dialog.setAttribute("aria-labelledby", "preview-dialog-title");

  const shell = document.createElement("div");
  shell.className = "preview-dialog-shell";

  const topBar = document.createElement("div");
  topBar.className = "preview-dialog-top";

  const eyebrow = document.createElement("span");
  eyebrow.textContent = "PORTFOLIO / PREVIEW";

  const topClose = document.createElement("button");
  topClose.className = "preview-close";
  topClose.type = "button";
  topClose.textContent = "Close ×";
  topClose.setAttribute("aria-label", "Close preview");
  topClose.addEventListener("click", () => dialog.close());
  topBar.append(eyebrow, topClose);

  const section = document.createElement("p");
  section.className = "preview-dialog-section";

  const title = document.createElement("h2");
  title.id = "preview-dialog-title";

  const summary = document.createElement("p");
  summary.className = "preview-dialog-summary";

  const description = document.createElement("p");
  description.className = "preview-dialog-description";

  const details = document.createElement("div");
  details.className = "preview-dialog-details";

  const highlights = document.createElement("div");
  highlights.className = "preview-dialog-highlights";
  const highlightsLabel = document.createElement("span");
  highlightsLabel.className = "preview-detail-label";
  highlightsLabel.textContent = "WHAT THIS COVERS";
  const highlightsList = document.createElement("ul");
  highlightsList.className = "preview-dialog-list";
  highlights.append(highlightsLabel, highlightsList);

  const footer = document.createElement("div");
  footer.className = "preview-dialog-footer";
  const footerNote = document.createElement("span");
  footerNote.textContent = "TALLURI ANIL BABU / CYBERSECURITY";
  const bottomClose = document.createElement("button");
  bottomClose.type = "button";
  bottomClose.className = "button button-primary";
  bottomClose.textContent = "Close preview";
  bottomClose.addEventListener("click", () => dialog.close());
  footer.append(footerNote, bottomClose);

  shell.append(topBar, section, title, summary, description, highlights, details, footer);
  dialog.append(shell);
  document.body.append(dialog);
  return { dialog, section, title, summary, description, details, highlights, highlightsList };
};

const previewDialogParts = createPreviewDialog();
let previewTrigger = null;

if (typeof previewDialogParts.dialog.showModal === "function") {
  previewTargets.forEach((target) => {
    document.querySelectorAll(target.selector).forEach((card, cardIndex) => {
      const title = card.querySelector("h3");
      if (!title) return;

      const trigger = document.createElement("button");
      trigger.type = "button";
      trigger.className = "preview-open";
      trigger.setAttribute("aria-haspopup", "dialog");
      trigger.setAttribute("aria-label", `Preview ${title.textContent.trim()}`);
      trigger.innerHTML = "<span>Open preview</span><span aria-hidden=\"true\">↗</span>";
      card.append(trigger);

      trigger.addEventListener("click", () => {
        previewTrigger = trigger;
        previewDialogParts.section.textContent = target.section;
        previewDialogParts.title.textContent = title.textContent.trim();

        const summary = card.querySelector(target.summary);
        const description = target.description ? card.querySelector(target.description) : null;
        previewDialogParts.summary.textContent = summary?.textContent.trim() ?? "";
        previewDialogParts.description.textContent = description?.textContent.trim() ?? "";
        previewDialogParts.description.hidden = !previewDialogParts.description.textContent;

        previewDialogParts.details.replaceChildren();
        previewDialogParts.highlightsList.replaceChildren();
        const highlights = target.highlights?.[cardIndex] ?? [];
        previewDialogParts.highlights.hidden = highlights.length === 0;
        highlights.forEach((item) => {
          const point = document.createElement("li");
          point.textContent = item;
          previewDialogParts.highlightsList.append(point);
        });

        const detailItems = target.details ? [...card.querySelectorAll(target.details)] : [];
        if (detailItems.length) {
          const detailLabel = document.createElement("span");
          detailLabel.className = "preview-detail-label";
          detailLabel.textContent = target.selector === ".cert-card" ? "PROVIDER & COMPLETION" : "RELATED SKILLS & TOOLS";
          previewDialogParts.details.append(detailLabel);

          const detailList = document.createElement("div");
          detailList.className = "preview-dialog-tags";
          detailItems.forEach((item) => {
            const tag = document.createElement("span");
            tag.textContent = item.textContent.trim();
            detailList.append(tag);
          });
          previewDialogParts.details.append(detailList);
        }

        previewDialogParts.dialog.showModal();
      });
    });
  });

  previewDialogParts.dialog.addEventListener("click", (event) => {
    if (event.target === previewDialogParts.dialog) previewDialogParts.dialog.close();
  });

  previewDialogParts.dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    previewDialogParts.dialog.close();
  });

  previewDialogParts.dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      previewDialogParts.dialog.close();
    }
  });

  previewDialogParts.dialog.addEventListener("close", () => {
    previewTrigger?.focus();
    previewTrigger = null;
  });
}

if (!reduceMotion && "IntersectionObserver" in window) {
  document.documentElement.classList.add("motion-ready");
  revealItems.forEach((item, index) => {
    item.classList.add("reveal-item");
    item.style.setProperty("--reveal-delay", `${(index % 4) * 65}ms`);
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

  revealItems.forEach((item) => revealObserver.observe(item));
}

const desktopNavigation = window.matchMedia("(min-width: 681px)");
const navigationLinks = [...navigation.querySelectorAll('a[href^="#"]')];
const sectionLinks = new Map(
  navigationLinks.map((link) => [document.querySelector(link.getAttribute("href")), link])
);

const setActiveLink = (activeLink) => {
  navigation.classList.toggle("has-active-tab", Boolean(activeLink));
  navigationLinks.forEach((link) => {
    if (link === activeLink) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

const moveTabIndicator = (link) => {
  if (!desktopNavigation.matches) return;
  navigation.style.setProperty("--tab-x", `${link.offsetLeft}px`);
  navigation.style.setProperty("--tab-width", `${link.offsetWidth}px`);
};

navigationLinks.forEach((link) => {
  link.addEventListener("pointerenter", () => moveTabIndicator(link));
  link.addEventListener("focus", () => moveTabIndicator(link));
  link.addEventListener("click", () => setActiveLink(link));
});

navigation.addEventListener("pointerleave", () => {
  const activeLink = navigation.querySelector('[aria-current="location"]');
  if (activeLink) moveTabIndicator(activeLink);
});

navigation.addEventListener("focusout", (event) => {
  if (!navigation.contains(event.relatedTarget)) {
    const activeLink = navigation.querySelector('[aria-current="location"]');
    if (activeLink) moveTabIndicator(activeLink);
  }
});

const initialLink = navigationLinks.find((link) => link.hash === window.location.hash);
if (initialLink) {
  setActiveLink(initialLink);
  moveTabIndicator(initialLink);
}

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const matchingLink = sectionLinks.get(entry.target);
        if (matchingLink) {
          setActiveLink(matchingLink);
          moveTabIndicator(matchingLink);
        }
      }
    });
  }, { rootMargin: "-25% 0px -65% 0px", threshold: 0 });

  sectionLinks.forEach((link, section) => {
    if (section) sectionObserver.observe(section);
  });
}

window.addEventListener("resize", () => {
  const activeLink = navigation.querySelector('[aria-current="location"]');
  if (activeLink) moveTabIndicator(activeLink);
});

if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  const cursorAura = document.createElement("div");
  cursorAura.className = "cursor-aura";
  cursorAura.setAttribute("aria-hidden", "true");
  cursorAura.innerHTML = "<span class=\"cursor-aura__ring\"></span><span class=\"cursor-aura__core\"></span>";
  document.body.append(cursorAura);

  let pointerFrame = 0;
  let pointerX = 0;
  let pointerY = 0;

  document.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (pointerFrame) return;

    pointerFrame = requestAnimationFrame(() => {
      cursorAura.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      document.body.style.setProperty("--pointer-x", `${pointerX}px`);
      document.body.style.setProperty("--pointer-y", `${pointerY}px`);
      pointerFrame = 0;
    });
  }, { passive: true });

  document.addEventListener("pointerover", (event) => {
    cursorAura.classList.toggle(
      "is-interactive",
      Boolean(event.target.closest("a, button, .work-card, .focus-card, .cert-card, .tool-list li"))
    );
  });

  document.addEventListener("pointerdown", () => cursorAura.classList.add("is-pressed"));
  document.addEventListener("pointerup", () => cursorAura.classList.remove("is-pressed"));
  document.addEventListener("pointerleave", () => cursorAura.classList.add("is-hidden"));
  document.addEventListener("pointerenter", () => cursorAura.classList.remove("is-hidden"));
}
