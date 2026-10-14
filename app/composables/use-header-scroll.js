/**
 * Port of the imperative scroll/resize effect in the Spotlight template's
 * `Header.jsx`. It writes CSS custom properties on `document.documentElement`
 * so the header can stick and the home page avatar can shrink as you scroll.
 *
 * The maths is copied verbatim from the React source.
 *
 * @param {object} options
 * @param {import('vue').Ref<HTMLElement | null>} options.headerRef
 * @param {import('vue').Ref<HTMLElement | null>} options.avatarRef
 * @param {import('vue').Ref<boolean> | boolean} options.isHomePage
 */
export function useHeaderScroll({ headerRef, avatarRef, isHomePage }) {
  let isInitial = true;
  let downDelay = 0;
  let running = false;
  const upDelay = 64;

  function clamp(number, a, b) {
    let min = Math.min(a, b);
    let max = Math.max(a, b);
    return Math.min(Math.max(number, min), max);
  }

  function setProperty(property, value) {
    document.documentElement.style.setProperty(property, value);
  }

  function removeProperty(property) {
    document.documentElement.style.removeProperty(property);
  }

  function updateHeaderStyles() {
    if (!headerRef.value) {
      return;
    }

    let { top, height } = headerRef.value.getBoundingClientRect();
    let scrollY = clamp(window.scrollY, 0, document.body.scrollHeight - window.innerHeight);

    if (isInitial) {
      setProperty('--header-position', 'sticky');
    }

    setProperty('--content-offset', `${downDelay}px`);

    if (isInitial || scrollY < downDelay) {
      setProperty('--header-height', `${downDelay + height}px`);
      setProperty('--header-mb', `${-downDelay}px`);
    } else if (top + height < -upDelay) {
      let offset = Math.max(height, scrollY - upDelay);
      setProperty('--header-height', `${offset}px`);
      setProperty('--header-mb', `${height - offset}px`);
    } else if (top === 0) {
      setProperty('--header-height', `${scrollY + height}px`);
      setProperty('--header-mb', `${-scrollY}px`);
    }

    if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
      setProperty('--header-inner-position', 'fixed');
      removeProperty('--header-top');
      removeProperty('--avatar-top');
    } else {
      removeProperty('--header-inner-position');
      setProperty('--header-top', '0px');
      setProperty('--avatar-top', '0px');
    }
  }

  function updateAvatarStyles() {
    if (!unref(isHomePage)) {
      return;
    }

    let fromScale = 1;
    let toScale = 36 / 64;
    let fromX = 0;
    let toX = 2 / 16;

    let scrollY = downDelay - window.scrollY;

    let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale;
    scale = clamp(scale, fromScale, toScale);

    let x = (scrollY * (fromX - toX)) / downDelay + toX;
    x = clamp(x, fromX, toX);

    setProperty('--avatar-image-transform', `translate3d(${x}rem, 0, 0) scale(${scale})`);

    let borderScale = 1 / (toScale / scale);
    let borderX = (-toX + x) * borderScale;
    let borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`;

    setProperty('--avatar-border-transform', borderTransform);
    setProperty('--avatar-border-opacity', scale === toScale ? '1' : '0');
  }

  function updateStyles() {
    updateHeaderStyles();
    updateAvatarStyles();
    isInitial = false;
  }

  function start() {
    if (running) {
      return;
    }

    running = true;
    downDelay = avatarRef.value?.offsetTop ?? 0;
    updateStyles();
    window.addEventListener('scroll', updateStyles, { passive: true });
    window.addEventListener('resize', updateStyles);
  }

  function stop() {
    if (!running) {
      return;
    }

    running = false;
    window.removeEventListener('scroll', updateStyles);
    window.removeEventListener('resize', updateStyles);
  }

  // React re-ran the effect whenever `isHomePage` changed. The Nuxt header stays
  // mounted across route changes, so restart the listeners (and recompute
  // `downDelay` against the freshly rendered avatar) on every navigation.
  watch(
    () => unref(isHomePage),
    () => {
      if (!running) {
        return;
      }

      stop();
      nextTick(start);
    },
  );

  return { start, stop };
}
