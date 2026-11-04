// Converts the studio's support hours to US time zones.
// Runs at build time (static fallback) and in the visitor's browser (correct for today's date,
// including daylight saving). Pure functions, no dependencies.
//
// The studio side can be an IANA time zone (build) or a fixed UTC offset in minutes (browser), so
// the studio's zone name never has to appear in the page.

export const US_ZONES = [
  { id: "America/New_York", label: "Eastern" },
  { id: "America/Chicago", label: "Central" },
  { id: "America/Denver", label: "Mountain" },
  { id: "America/Los_Angeles", label: "Pacific" }
];

const HHMM = /^([01]\d|2[0-3]):([0-5]\d)$/;

export function parseHHMM(v) {
  const m = HHMM.exec(String(v || "").trim());
  return m ? { h: +m[1], m: +m[2] } : null;
}

/** Offset (minutes) of `tz` from UTC at the given instant. */
function offsetMinutes(tz, date) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric", month: "numeric", day: "numeric",
    hour: "numeric", minute: "numeric", second: "numeric"
  });
  const p = Object.fromEntries(dtf.formatToParts(date).map((x) => [x.type, x.value]));
  const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
  return Math.round((asUtc - (date.getTime() - date.getMilliseconds())) / 60000);
}

/** The studio zone's UTC offset in minutes (build time), to hand to the browser as a plain number. */
export const studioOffset = (tz, date = new Date()) => offsetMinutes(tz, date);

/** The instant when it is HH:MM on day (y,m,d) in `tz`. */
function zonedInstant(tz, y, mo, d, h, mi) {
  const guess = Date.UTC(y, mo, d, h, mi);
  const off1 = offsetMinutes(tz, new Date(guess));
  const t = guess - off1 * 60000;
  const off2 = offsetMinutes(tz, new Date(t));
  return new Date(guess - off2 * 60000);
}

function ymdIn(tz, date) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", { timeZone: tz, year: "numeric", month: "numeric", day: "numeric" })
      .formatToParts(date).map((x) => [x.type, x.value])
  );
  return { y: +p.year, m: +p.month - 1, d: +p.day };
}

// `studio` is an IANA zone name (string) or a fixed offset in minutes (number).
function studioYmd(studio, date) {
  if (typeof studio !== "number") return ymdIn(studio, date);
  const d = new Date(date.getTime() + studio * 60000);
  return { y: d.getUTCFullYear(), m: d.getUTCMonth(), d: d.getUTCDate() };
}
function studioInstant(studio, y, mo, d, h, mi) {
  return typeof studio === "number" ? new Date(Date.UTC(y, mo, d, h, mi) - studio * 60000) : zonedInstant(studio, y, mo, d, h, mi);
}

function fmtTime(tz, date) {
  return new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit" })
    .format(date)
    .replace(" AM", " am").replace(" PM", " pm");
}

function abbr(tz, date) {
  const part = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "short" })
    .formatToParts(date).find((x) => x.type === "timeZoneName");
  return part ? part.value : "";
}

/**
 * @returns {null | Array<{label:string, tz:string, abbr:string, range:string}>}
 * null when the start/end in config are still placeholders.
 */
export function convertHours(studio, start, end, zones = US_ZONES, now = new Date()) {
  const s = parseHHMM(start), e = parseHHMM(end);
  if (!s || !e) return null;
  const { y, m, d } = studioYmd(studio, now);
  const from = studioInstant(studio, y, m, d, s.h, s.m);
  let to = studioInstant(studio, y, m, d, e.h, e.m);
  if (to <= from) to = new Date(to.getTime() + 86400000);
  // Day notes are measured against the day the hours START on the listed days, so a late shift that
  // ends after midnight there does not read as "day before" in the US.
  const sFrom = studioYmd(studio, from);
  const dayDiff = (a, b) => Math.round((Date.UTC(a.y, a.m, a.d) - Date.UTC(b.y, b.m, b.d)) / 86400000);
  const note = (n) => (n === 0 ? "" : n < 0 ? " (day before)" : " (next day)");
  return zones.map((z) => ({
    label: z.label,
    tz: z.id,
    abbr: abbr(z.id, from),
    range: `${fmtTime(z.id, from)}${note(dayDiff(ymdIn(z.id, from), sFrom))} to ${fmtTime(z.id, to)}${note(dayDiff(ymdIn(z.id, to), sFrom))}`
  }));
}
