(() => {
  const profileData = {
    fresh: {
      title: "Fresh Circuit",
      description: "Cocteles ligeros, citricos y de baja densidad para sesiones largas.",
      items: [
        "Spritz de pomelo con romero",
        "Gin tonic de pepino y sal marina",
        "Kombucha rum punch"
      ]
    },
    bold: {
      title: "Bold Voltage",
      description: "Perfiles de sabor intensos con cuerpo alto y final especiado.",
      items: [
        "Old fashioned de cacao y naranja",
        "Negroni blanco con salvia",
        "Espresso martini con tonka"
      ]
    },
    slow: {
      title: "Slow Sunset",
      description: "Recetas suaves para conversaciones largas y ritmo calmado.",
      items: [
        "Highball de whisky y pera",
        "Aperitivo rojo con soda botanica",
        "Vermut de canela con hielo grande"
      ]
    }
  };

  const scenarioData = {
    house: {
      title: "House Session",
      description: "Recetas de bajo esfuerzo, setup rapido y perfiles redondos para grupos pequenos.",
      items: [
        "Listas de compra instantaneas por numero de invitados",
        "Modo cocina sin coctelera con sustituciones automaticas",
        "Playbook de maridajes para picoteo rapido"
      ]
    },
    terrace: {
      title: "Terrace Pulse",
      description: "Combinaciones frescas para exterior con curva de consumo estable durante la tarde.",
      items: [
        "Perfil termico para bebidas con hielo de larga duracion",
        "Rondas ligeras cada 25 minutos para mantener ritmo",
        "Packs visuales para servicio rapido en mesa compartida"
      ]
    },
    afterwork: {
      title: "Afterwork Grid",
      description: "Formato modular para equipos mixtos con preferencias muy distintas.",
      items: [
        "Rutas paralelas low, medium y high ABV en una misma sesion",
        "Panel de votos por equipo para llegar a consenso rapido",
        "Escalado de recetas de 6 a 40 personas sin recalculo manual"
      ]
    }
  };

  let toastTimeoutId;

  function initNavToggle() {
    const navToggle = document.getElementById("nav-toggle");
    const siteNav = document.getElementById("site-nav");

    if (!navToggle || !siteNav) {
      return;
    }

    navToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function initMixProfileSelector() {
    const buttons = document.querySelectorAll(".taste-filter");
    const title = document.getElementById("profile-title");
    const description = document.getElementById("profile-description");
    const list = document.getElementById("profile-list");

    if (!buttons.length || !title || !description || !list) {
      return;
    }

    const renderProfile = (profileKey) => {
      const profile = profileData[profileKey];
      if (!profile) {
        return;
      }

      buttons.forEach((button) => {
        const isCurrent = button.dataset.profile === profileKey;
        button.classList.toggle("is-active", isCurrent);
        button.setAttribute("aria-selected", String(isCurrent));
      });

      title.textContent = profile.title;
      description.textContent = profile.description;
      list.innerHTML = profile.items.map((item) => `<li>${item}</li>`).join("");
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        renderProfile(button.dataset.profile);
      });
    });
  }

  function initScenarioTabs() {
    const buttons = document.querySelectorAll(".scenario-tab");
    const title = document.getElementById("scenario-title");
    const description = document.getElementById("scenario-description");
    const list = document.getElementById("scenario-list");

    if (!buttons.length || !title || !description || !list) {
      return;
    }

    const renderScenario = (scenarioKey) => {
      const scenario = scenarioData[scenarioKey];
      if (!scenario) {
        return;
      }

      buttons.forEach((button) => {
        const isCurrent = button.dataset.scenario === scenarioKey;
        button.classList.toggle("is-active", isCurrent);
        button.setAttribute("aria-selected", String(isCurrent));
      });

      title.textContent = scenario.title;
      description.textContent = scenario.description;
      list.innerHTML = scenario.items.map((item) => `<li>${item}</li>`).join("");
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        renderScenario(button.dataset.scenario);
      });
    });
  }

  function initTestimonialsSlider() {
    const testimonials = Array.from(document.querySelectorAll(".testimonial"));
    const dots = Array.from(document.querySelectorAll(".dot"));
    const prevButton = document.getElementById("prev-testimonial");
    const nextButton = document.getElementById("next-testimonial");

    if (!testimonials.length) {
      return;
    }

    let activeIndex = 0;

    const render = (index) => {
      activeIndex = (index + testimonials.length) % testimonials.length;

      testimonials.forEach((item, itemIndex) => {
        item.classList.toggle("is-active", itemIndex === activeIndex);
      });

      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === activeIndex);
      });
    };

    prevButton?.addEventListener("click", () => {
      render(activeIndex - 1);
    });

    nextButton?.addEventListener("click", () => {
      render(activeIndex + 1);
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        render(Number(dot.dataset.index));
      });
    });

    window.setInterval(() => {
      render(activeIndex + 1);
    }, 6500);
  }

  function animateCounters() {
    const counters = document.querySelectorAll(".stat-value[data-count]");

    if (!counters.length) {
      return;
    }

    const startCounter = (element) => {
      const target = Number(element.dataset.count || 0);
      const suffix = element.dataset.suffix || "";
      const durationMs = 1500;
      const startAt = performance.now();

      const step = (timestamp) => {
        const progress = Math.min((timestamp - startAt) / durationMs, 1);
        const current = Math.floor(target * progress);
        element.textContent = `${current}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          element.textContent = `${target}${suffix}`;
        }
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          startCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.45 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  function initRevealOnScroll() {
    const revealElements = document.querySelectorAll(".reveal");

    if (!revealElements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealElements.forEach((element) => observer.observe(element));
  }

  function showToast(message) {
    let toast = document.querySelector(".toast");

    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("is-visible");

    if (toastTimeoutId) {
      clearTimeout(toastTimeoutId);
    }

    toastTimeoutId = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2600);
  }

  function initDownloadButtons() {
    const buttons = document.querySelectorAll("[data-download='true']");

    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        showToast("La beta privada abre pronto. Te avisaremos por email.");
      });
    });
  }

  function initContactForm() {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    if (!form) {
      return;
    }

    const requiredFields = Array.from(form.querySelectorAll("input[required], textarea[required]"));

    const validateField = (field) => {
      const isValid = field.checkValidity();
      field.classList.toggle("is-invalid", !isValid);
      return isValid;
    };

    requiredFields.forEach((field) => {
      field.addEventListener("input", () => {
        validateField(field);
      });
    });

    form.addEventListener("submit", (event) => {
      const allValid = requiredFields.every((field) => validateField(field));

      if (!allValid) {
        event.preventDefault();
        if (status) {
          status.textContent = "Revisa los campos obligatorios antes de enviar.";
        }
        return;
      }

      if (status) {
        status.textContent = "Enviando solicitud...";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initNavToggle();
    initMixProfileSelector();
    initScenarioTabs();
    initTestimonialsSlider();
    animateCounters();
    initRevealOnScroll();
    initDownloadButtons();
    initContactForm();
  });
})();
