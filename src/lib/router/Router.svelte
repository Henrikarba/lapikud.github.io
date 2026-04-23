<!-- DO NOT TOUCH THIS FILE AT ANY COST -->
<!-- unless the router is broken 👉👈 -->

<script>
  import { withBase, stripBase } from '../baseUrl.js';

  export function routeTo(path) {
    window.history.pushState({}, "", withBase(stripBase(path)));
    window.scrollTo(0, 0);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  let { routes } = $props();

  let currentPath = $state(stripBase(window.location.pathname));
  let CurrentComponent = $state(null);

  async function resolveCurrentComponent(path) {
    const routeEntry = routes[path] || routes["/"];

    if (typeof routeEntry === "function") {
      try {
        const module = await routeEntry();
        CurrentComponent = module?.default || null;
      } catch {
        CurrentComponent = null;
      }
      return;
    }

    CurrentComponent = routeEntry || null;
  }

  function navigate(path) {
    window.history.pushState({}, "", withBase(stripBase(path)));
    window.scrollTo(0, 0);
    currentPath = stripBase(path);
  }

  // Handle back/forward buttons
  $effect(() => {
    const handlePopState = () => {
      currentPath = stripBase(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  });

  // Intercept link clicks
  $effect(() => {
    const handleClick = (e) => {
      if (
        e.target.tagName === "A" &&
        e.target.getAttribute("href")?.startsWith("/")
      ) {
        e.preventDefault();
        navigate(e.target.getAttribute("href"));
      }
    };

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  });

  $effect(() => {
    resolveCurrentComponent(currentPath);
  });
</script>

{#if CurrentComponent}
  <CurrentComponent />
{/if}
