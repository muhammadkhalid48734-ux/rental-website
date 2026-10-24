// Demo request form: client-side validation, JSON POST, loading / success / failure states.
// Typed text is never cleared on an error.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MESSAGES = {
  businessName: "Add your business name.",
  city: "Add your city.",
  social: "Add the link or @name of your Instagram or Facebook page.",
  email: "Add an email we can reply to, like name@example.com.",
  consent: "Tick the box so we know it is OK to contact you."
};

export function initForm() {
  const form = document.getElementById("demo-form");
  if (!form) return;
  const errors = form.querySelector("[data-errors]");
  const submit = form.querySelector("[data-submit]");
  const success = document.querySelector("[data-success]");
  const failure = document.querySelector("[data-failure]");
  const failureMsg = document.querySelector("[data-failure-msg]");
  const endpoint = form.dataset.endpoint;
  const isPlaceholder = form.dataset.placeholder === "1";
  const label = submit.textContent;

  const fieldErr = (name) => form.querySelector(`[data-err-for="${name}"]`);
  const input = (name) => form.elements[name];

  function clearErrors() {
    errors.hidden = true;
    errors.replaceChildren();
    form.querySelectorAll("[data-err-for]").forEach((p) => (p.textContent = ""));
    form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
  }

  function validate() {
    const bad = [];
    for (const name of ["businessName", "city", "social"]) {
      if (!input(name).value.trim()) bad.push(name);
    }
    const mail = input("email").value.trim();
    if (!mail || !EMAIL.test(mail)) bad.push("email");
    if (!input("consent").checked) bad.push("consent");
    return bad;
  }

  function showErrors(bad) {
    const ul = document.createElement("ul");
    for (const name of bad) {
      fieldErr(name).textContent = MESSAGES[name];
      input(name).setAttribute("aria-invalid", "true");
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `#${input(name).id}`;
      a.textContent = MESSAGES[name];
      a.addEventListener("click", (e) => { e.preventDefault(); input(name).focus(); });
      li.appendChild(a);
      ul.appendChild(li);
    }
    const h = document.createElement("p");
    h.innerHTML = "<strong>Please fix this first:</strong>";
    errors.replaceChildren(h, ul);
    errors.hidden = false;
    input(bad[0]).focus();
  }

  function payload() {
    const v = (n) => input(n).value.trim();
    return {
      businessName: v("businessName"),
      city: v("city"),
      social: v("social"),
      email: v("email"),
      message: v("message"),
      consent: "OK to contact me about this demo",
      _subject: `Demo request: ${v("businessName")}`
    };
  }

  function updateFallbackLinks(data) {
    const body = [
      "Hi, I'd like a free demo.", "",
      `Business: ${data.businessName}`, `City: ${data.city}`, `Page: ${data.social}`, `Email: ${data.email}`,
      data.message ? `Message: ${data.message}` : ""
    ].filter((l) => l !== "").join("\n");
    failure.querySelectorAll("a[href^='mailto:']").forEach((a) => {
      const base = a.getAttribute("href").split("?")[0];
      a.setAttribute("href", `${base}?subject=${encodeURIComponent("Demo request: " + data.businessName)}&body=${encodeURIComponent(body)}`);
    });
    failure.querySelectorAll("a[href^='https://wa.me/']").forEach((a) => {
      const base = a.getAttribute("href").split("?")[0];
      a.setAttribute("href", `${base}?text=${encodeURIComponent(body)}`);
    });
  }

  function showFailure(message) {
    failureMsg.textContent = message;
    failure.hidden = false;
    success.hidden = true;
    failure.focus({ preventScroll: false });
  }

  function showSuccess() {
    form.hidden = true;
    failure.hidden = true;
    success.hidden = false;
    success.focus();
  }

  function setLoading(on) {
    submit.disabled = on;
    submit.textContent = on ? "Sending…" : label;
    form.setAttribute("aria-busy", on ? "true" : "false");
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors();
    failure.hidden = true;
    const bad = validate();
    if (bad.length) return showErrors(bad);

    // Honeypot: bots fill this in. Pretend it worked, send nothing.
    if (form.elements["_gotcha"].value) return showSuccess();

    const data = payload();
    updateFallbackLinks(data);

    if (isPlaceholder) {
      return showFailure("This form is not connected to an inbox yet, so nothing was sent. Your answers are still here. Please send the same details to us directly.");
    }

    setLoading(true);
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 15000);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
        signal: ctrl.signal
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      showSuccess();
    } catch (err) {
      showFailure(
        err && err.name === "AbortError"
          ? "That took too long. Your answers are still in the form. Try again, or send the same details to us directly."
          : "Your answers are still in the form. Try again, or send the same details to us directly."
      );
    } finally {
      clearTimeout(timer);
      setLoading(false);
    }
  });

  // Clear a field's error as soon as the person fixes it.
  form.addEventListener("input", (e) => {
    const name = e.target.name;
    const p = name && fieldErr(name);
    if (p && p.textContent) { p.textContent = ""; e.target.removeAttribute("aria-invalid"); }
  });
}
