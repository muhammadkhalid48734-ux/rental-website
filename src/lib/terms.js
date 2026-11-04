// The one set of terms, worded once and reused everywhere on the page.
import { config } from "../config.js";

export const termsFree = () =>
  `Website build is free. You pay only the monthly plan. ${config.minimumMonths}-month minimum, then cancel anytime.`;
export const termsOwn = () =>
  "Your domain, photos and text always belong to you, and if you leave we send you your site files.";
export const termsFull = () => `${termsFree()} ${termsOwn()}`;
export const noDemo = () => "If you don't like the demo you pay nothing.";
export const setupSentence = () => `Set up within ${config.setupDays} working days after you sign up.`;
