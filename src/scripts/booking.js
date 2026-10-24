// Sample booking calendar. Everything here is made up: no network calls, nothing is stored.
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const LIMIT_BY_DOW = [4, 1, 1, 1, 2, 3, 6]; // weekends fill up first

const midnight = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const isBooked = (date, seed) => ((date.getDate() * 7 + date.getMonth() * 13 + seed * 5 + 3) % 10) < LIMIT_BY_DOW[date.getDay()];
const long = (d) => `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;

export function initBooking(root) {
  if (root.dataset.ready) return;
  root.dataset.ready = "1";
  const seed = Number(root.dataset.seed || 1);
  const grid = root.querySelector("[data-grid]");
  const monthEl = root.querySelector("[data-month]");
  const prev = root.querySelector("[data-prev]");
  const next = root.querySelector("[data-next]");
  const summary = root.querySelector("[data-summary]");
  const request = root.querySelector("[data-request]");
  const status = root.querySelector("[data-status]");
  const scope = root.closest("[data-booking-scope]") || root;

  const today = midnight(new Date());
  const firstMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  let view = new Date(firstMonth);
  let picked = null;

  const item = () => root.querySelector('input[type="radio"]:checked');

  // Start on the first open Saturday at least a week away, so the sample shows something real.
  for (let i = 7; i < 120 && !picked; i++) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    if (d.getDay() === 6 && !isBooked(d, seed)) picked = d;
  }
  if (picked) view = new Date(picked.getFullYear(), picked.getMonth(), 1);

  function render() {
    monthEl.textContent = `${MONTHS[view.getMonth()]} ${view.getFullYear()}`;
    prev.disabled = view <= firstMonth;
    const limit = new Date(firstMonth.getFullYear(), firstMonth.getMonth() + 3, 1);
    next.disabled = view >= limit;
    const lead = new Date(view.getFullYear(), view.getMonth(), 1).getDay();
    const count = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 42; i++) {
      const dayNum = i - lead + 1;
      if (dayNum < 1 || dayNum > count) {
        const e = document.createElement("span");
        e.className = "cal__empty";
        frag.appendChild(e);
        continue;
      }
      const date = new Date(view.getFullYear(), view.getMonth(), dayNum);
      const past = date <= today;
      const booked = !past && isBooked(date, seed);
      const b = document.createElement("button");
      b.type = "button";
      b.className = "cal__d";
      b.textContent = String(dayNum);
      b.dataset.time = String(date.getTime());
      if (past) { b.disabled = true; b.classList.add("is-past"); b.setAttribute("aria-label", `${long(date)}, not available`); }
      else if (booked) { b.disabled = true; b.classList.add("is-booked"); b.setAttribute("aria-label", `${long(date)}, booked`); }
      else {
        b.setAttribute("aria-label", `${long(date)}, open`);
        const sel = picked && picked.getTime() === date.getTime();
        b.setAttribute("aria-pressed", sel ? "true" : "false");
        if (sel) b.classList.add("is-pick");
      }
      frag.appendChild(b);
    }
    grid.replaceChildren(frag);
    // One tab stop for the whole grid; arrow keys move between dates.
    const days = [...grid.querySelectorAll(".cal__d")];
    const stop = days.find((b) => b.getAttribute("aria-pressed") === "true") || days.find((b) => !b.disabled);
    days.forEach((b) => b.setAttribute("tabindex", b === stop ? "0" : "-1"));
  }

  function moveFocus(from, step) {
    const days = [...grid.querySelectorAll(".cal__d")];
    let i = days.indexOf(from) + step;
    while (i >= 0 && i < days.length && days[i].disabled) i += step;
    if (i < 0 || i >= days.length) return;
    days.forEach((b) => b.setAttribute("tabindex", "-1"));
    days[i].setAttribute("tabindex", "0");
    days[i].focus();
  }
  grid.addEventListener("keydown", (e) => {
    const btn = e.target.closest("button.cal__d");
    if (!btn) return;
    const steps = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (steps[e.key]) { e.preventDefault(); moveFocus(btn, steps[e.key]); }
  });

  function update() {
    const it = item();
    const name = it ? it.value : "";
    const price = it ? it.dataset.price : "";
    if (picked && it) {
      summary.textContent = `${long(picked)}: ${name}, $${price}`;
      request.disabled = false;
    } else {
      summary.textContent = "Tap an open date.";
      request.disabled = true;
    }
    scope.querySelectorAll("[data-msg-date]").forEach((el) => (el.textContent = picked ? long(picked) : "your date"));
    scope.querySelectorAll("[data-msg-day-before]").forEach((el) => {
      el.textContent = picked ? long(new Date(picked.getFullYear(), picked.getMonth(), picked.getDate() - 1)) : "the day before";
    });
    scope.querySelectorAll("[data-msg-item]").forEach((el) => (el.textContent = name || "your item"));
  }

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("button.cal__d");
    if (!btn || btn.disabled) return;
    picked = new Date(Number(btn.dataset.time));
    status.textContent = "";
    status.classList.remove("is-shown");
    render();
    update();
    grid.querySelector('.cal__d[aria-pressed="true"]')?.focus();
  });
  prev.addEventListener("click", () => { view = new Date(view.getFullYear(), view.getMonth() - 1, 1); render(); });
  next.addEventListener("click", () => { view = new Date(view.getFullYear(), view.getMonth() + 1, 1); render(); });
  root.addEventListener("change", (e) => { if (e.target.matches('input[type="radio"]')) { status.textContent = ""; status.classList.remove("is-shown"); update(); } });
  request.addEventListener("click", () => {
    status.textContent = "Sample only. Nothing was sent. On your own site, this request would arrive in your email.";
    status.classList.add("is-shown");
  });

  render();
  update();
}
