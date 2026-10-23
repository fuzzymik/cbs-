// PLACEHOLDER: put your real email address here (used by the contact form)
const CONTACT_EMAIL = "cyrene016@gmail.com";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  // ---------- Current year (footer + big number behind the hero) ----------
  const year = new Date().getFullYear();
  document.getElementById("year").textContent = year;
  document.getElementById("home").setAttribute("data-ghost", String(year));

  // ---------- Mobile menu ----------
  function setMenu(open) {
    navMenu.classList.toggle("open", open);
    menuToggle.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
  }

  menuToggle.addEventListener("click", () => {
    setMenu(!navMenu.classList.contains("open"));
  });

  navLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".site-header")) setMenu(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 800) setMenu(false);
  });

  // ---------- Section tracking: nav highlight + bottom bar ----------
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.getElementById("prevSection");
  const nextBtn = document.getElementById("nextSection");
  const prevLabel = document.getElementById("prevLabel");
  const nextLabel = document.getElementById("nextLabel");
  let current = 0;

  function labelOf(i) {
    return sections[i].getAttribute("data-label") || sections[i].id;
  }

  function setCurrent(i) {
    current = i;

    navLinks.forEach((link) => {
      const on = link.getAttribute("href") === "#" + sections[i].id;
      link.classList.toggle("active", on);
      if (on) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });

    dots.forEach((dot) => {
      dot.setAttribute("aria-current", dot.getAttribute("data-target") === sections[i].id ? "true" : "false");
    });

    const hasPrev = i > 0;
    const hasNext = i < sections.length - 1;
    prevBtn.classList.toggle("is-off", !hasPrev);
    nextBtn.classList.toggle("is-off", !hasNext);
    prevBtn.tabIndex = hasPrev ? 0 : -1;
    nextBtn.tabIndex = hasNext ? 0 : -1;
    prevBtn.setAttribute("aria-label", hasPrev ? "Go to " + labelOf(i - 1) : "");
    nextBtn.setAttribute("aria-label", hasNext ? "Go to " + labelOf(i + 1) : "");
    prevLabel.textContent = hasPrev ? labelOf(i - 1) : "";
    nextLabel.textContent = hasNext ? labelOf(i + 1) : "";
  }

  function goTo(i) {
    if (i < 0 || i >= sections.length) return;
    sections[i].scrollIntoView(); // smooth scrolling comes from CSS (and is off for reduced motion)
  }

  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const target = document.getElementById(dot.getAttribute("data-target"));
      if (target) target.scrollIntoView();
    });
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrent(sections.indexOf(entry.target));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
  }

  setCurrent(0);

  // ---------- Skills tabs ----------
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

  function selectTab(tab, moveFocus) {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
    });
    panels.forEach((p) => {
      p.hidden = p.id !== tab.getAttribute("aria-controls");
    });
    if (moveFocus) tab.focus();
  }

  if (tabs.length) {
    selectTab(tabs[0], false);

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => selectTab(tab, false));
      tab.addEventListener("keydown", (e) => {
        let next = null;
        if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === "Home") next = tabs[0];
        if (e.key === "End") next = tabs[tabs.length - 1];
        if (next) {
          e.preventDefault();
          selectTab(next, true);
        }
      });
    });
  }

    // ---------- Projects carousel ----------
  const carousel = document.getElementById("carousel");
  const track = document.getElementById("carouselTrack");
  const cards = Array.from(track.querySelectorAll(".project"));
  const status = document.getElementById("carouselStatus");
  const prevArrow = document.getElementById("carouselPrev");
  const nextArrow = document.getElementById("carouselNext");
  let active = 0;

  function renderCarousel() {
    const n = cards.length;

    cards.forEach((card, i) => {
      card.classList.toggle("is-active", i === active);
      card.classList.toggle("is-prev", i === active - 1);
      card.classList.toggle("is-next", i === active + 1);

      card.inert = i !== active; // side cards are for looks only
      card.setAttribute("aria-hidden", i === active ? "false" : "true");
    });

    prevArrow.disabled = active === 0;
    nextArrow.disabled = active === n - 1;

    status.textContent = "Project " + (active + 1) + " of " + n + (n > 1 ? ". Use the arrows or swipe to browse." : ".");
  }

  function moveCarousel(step) {
    const next = Math.min(Math.max(active + step, 0), cards.length - 1);
    if (next === active) return;
    active = next;
    renderCarousel();
  }

  prevArrow.addEventListener("click", () => {
    moveCarousel(-1);
    if (prevArrow.disabled && !nextArrow.disabled) nextArrow.focus(); // keep keyboard focus on a working arrow
  });

  nextArrow.addEventListener("click", () => {
    moveCarousel(1);
    if (nextArrow.disabled && !prevArrow.disabled) prevArrow.focus();
  });

  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); moveCarousel(-1); }
    if (e.key === "ArrowRight") { e.preventDefault(); moveCarousel(1); }
  });

  // Swipe on touch screens
  let touchStartX = null;
  track.addEventListener("touchstart", (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  track.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(dx) > 40) moveCarousel(dx < 0 ? 1 : -1);
  });

  renderCarousel();

  // ---------- Contact form (opens the visitor's email app) ----------
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = "Fill in your name, email, and message.";
      formStatus.className = "form-status error";
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formStatus.textContent = "Enter a valid email address, like name@example.com.";
      formStatus.className = "form-status error";
      return;
    }

    const subject = encodeURIComponent("Portfolio message from " + name);
    const body = encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")");
    window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + subject + "&body=" + body;

    formStatus.textContent = "Opening your email app...";
    formStatus.className = "form-status ok";
    form.reset();
  });
});
