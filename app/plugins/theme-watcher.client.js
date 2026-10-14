/**
 * Port of ThemeWatcher from the Spotlight template (src/app/providers.jsx), plus the
 * `color-scheme` behaviour next-themes gives the template for free.
 *
 * 1. Whenever the resolved theme matches the OS theme, the stored preference is collapsed back to
 *    'system'. That way an explicit light/dark choice only sticks while it differs from the OS, and
 *    the site resumes following the OS once they agree again.
 *
 * 2. The resolved mode is mirrored onto <html style="color-scheme: …">. next-themes does this
 *    (enableColorScheme defaults to true) but @nuxtjs/color-mode only sets the class, so without
 *    this the UA stays in `normal` mode: in dark mode the native scrollbars and form controls keep
 *    their light appearance, and every default keyboard focus ring renders in the light-mode blue
 *    instead of the pale blue the template shows.
 */
export default defineNuxtPlugin(() => {
  const colorMode = useColorMode();
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  function syncWithSystem() {
    const systemTheme = media.matches ? 'dark' : 'light';
    if (colorMode.value === systemTheme && colorMode.preference !== 'system') {
      colorMode.preference = 'system';
    }
  }

  function syncColorScheme() {
    const resolved = colorMode.value === 'dark' ? 'dark' : 'light';
    document.documentElement.style.colorScheme = resolved;
  }

  syncWithSystem();
  syncColorScheme();
  media.addEventListener('change', syncWithSystem);

  const stop = watch(
    () => colorMode.value,
    () => {
      syncWithSystem();
      syncColorScheme();
    },
  );

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      media.removeEventListener('change', syncWithSystem);
      stop();
    });
  }
});
