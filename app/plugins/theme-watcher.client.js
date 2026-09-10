/**
 * Port of ThemeWatcher from the Spotlight template (src/app/providers.jsx).
 *
 * Whenever the resolved theme matches the OS theme, the stored preference is collapsed back to
 * 'system'. That way an explicit light/dark choice only sticks while it differs from the OS, and
 * the site resumes following the OS once they agree again.
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

  syncWithSystem();
  media.addEventListener('change', syncWithSystem);
  const stop = watch(() => colorMode.value, syncWithSystem);

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      media.removeEventListener('change', syncWithSystem);
      stop();
    });
  }
});
