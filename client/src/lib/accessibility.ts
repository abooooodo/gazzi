/**
 * Accessibility Utilities
 * Based on WCAG 2.1 AAA Standards
 */

/**
 * Check if color contrast ratio meets WCAG AAA standards
 * @param foreground - Foreground color in hex format
 * @param background - Background color in hex format
 * @returns Object with contrast ratio and compliance levels
 */
export function checkContrastRatio(foreground: string, background: string) {
  const getLuminance = (hex: string): number => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

  return {
    ratio: ratio.toFixed(2),
    AA: ratio >= 4.5,
    AAA: ratio >= 7,
    AALarge: ratio >= 3,
    AAALarge: ratio >= 4.5,
  };
}

/**
 * Announce message to screen readers
 * @param message - Message to announce
 * @param priority - Priority level (polite or assertive)
 */
export function announceToScreenReader(
  message: string,
  priority: "polite" | "assertive" = "polite"
) {
  const announcement = document.createElement("div");
  announcement.setAttribute("role", "status");
  announcement.setAttribute("aria-live", priority);
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Trap focus within a modal or dialog
 * @param element - Container element
 */
export function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener("keydown", handleTabKey);

  return () => {
    element.removeEventListener("keydown", handleTabKey);
  };
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Get accessible name for an element
 * @param element - HTML element
 */
export function getAccessibleName(element: HTMLElement): string {
  return (
    element.getAttribute("aria-label") ||
    element.getAttribute("aria-labelledby") ||
    element.textContent ||
    ""
  ).trim();
}

/**
 * Ensure minimum touch target size (44x44px for WCAG AAA)
 * @param element - HTML element
 */
export function ensureMinimumTouchTarget(element: HTMLElement): void {
  const rect = element.getBoundingClientRect();
  const minSize = 44;

  if (rect.width < minSize || rect.height < minSize) {
    console.warn(
      `Element does not meet minimum touch target size (44x44px):`,
      element
    );
  }
}
