const menuButton = document.querySelector(".menu");
const navigation = document.querySelector(".nav");

function setNavigationOpen(isOpen) {
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  navigation.classList.toggle("is-open", isOpen);
}

menuButton.addEventListener("click", () => {
  setNavigationOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setNavigationOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setNavigationOpen(false);
    menuButton.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.matchMedia("(min-width: 761px)").matches) {
    setNavigationOpen(false);
  }
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".section, .hero-content, .hero-visual").forEach((element) => {
    revealObserver.observe(element);
  });
}
