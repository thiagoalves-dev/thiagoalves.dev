/**
 * Tracks the previously visited route, mirroring the template's AppContext.previousPathname.
 *
 * The template holds the previous pathname in React context, so it is empty on every fresh document
 * load and only fills in after an in-app navigation. The article back button keys off it.
 *
 * An earlier version of this port read `window.history.state.back` instead. That looks equivalent
 * but is not: the browser persists history state across a document reload, so reloading an article
 * you had navigated to kept the back button visible when the template would have dropped it — and
 * conversely, arriving at an article by a full page load and then pressing browser-back left Nuxt
 * with no state where the template had one.
 *
 * Distinguishing the initial navigation matters and is easy to get wrong. `afterEach` DOES fire
 * during hydration, and at that point `from` is not START_LOCATION — it is already the resolved
 * current route, so `from.matched.length` is non-zero and a naive check records the page as its own
 * predecessor (which made the button appear on every direct load). The dependable signal is that on
 * that initial resolve `from` and `to` are the same route.
 */
export default defineNuxtPlugin(() => {
  const previousPath = useState('previousPath', () => null);
  const router = useRouter();

  router.afterEach((to, from) => {
    if (from.fullPath === to.fullPath) return; // hydration resolve, not a real navigation
    previousPath.value = from.fullPath;
  });
});
