// Sticky "Get my free demo" bar (phones only) and smooth scroll to the form.
const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initSticky() {
  const bar = document.querySelector("[data-sticky]");
  const section = document.querySelector("[data-demo-section]");
  if (!bar || !section) return;
  document.body.classList.add("has-sticky");

  const setHidden = (hidden) => {
    bar.classList.toggle("is-hidden", hidden);
    if (hidden) bar.setAttribute("inert", "");
    else bar.removeAttribute("inert");
  };
  if ("IntersectionObserver" in window) {
    // Hide while any part of the form is on screen.
    new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), { threshold: 0.05 }).observe(section);
  }
}

// Every "Get my free demo" link scrolls to the form and moves focus to its first field.
export function initScrollLinks() {
  document.querySelectorAll("[data-scroll-form]").forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.getElementById("demo");
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduce() ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", "#demo");
      const first = document.getElementById("f-biz");
      if (first) setTimeout(() => first.focus({ preventScroll: true }), reduce() ? 0 : 450);
    });
  });
}
