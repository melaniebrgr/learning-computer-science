import { hydrateRoot } from "react-dom/client";

const root = hydrateRoot(document, getInitialClientJSX());
let currentPathname = window.location.pathname;

async function navigate(pathname) {
    currentPathname = pathname;
    const clientJSX = await fetchClientJSX(pathname);
    if (pathname === currentPathname) {
        root.render(clientJSX);
    }
}

function getInitialClientJSX() {
    const clientJSX = JSON.parse(window.__INITIAL_CLIENT_JSX_STRING__, parseJSX);
    return clientJSX;
}

async function fetchClientJSX(pathname) {
    const response = await fetch(pathname + "?jsx");
    const clientJSXString = await response.text();
    const clientJSX = JSON.parse(clientJSXString, parseJSX);
    return clientJSX;
}

function parseJSX(key, value) {
  if (value === "$RE") {
    // This is our special marker we added on the server.
    // Restore the Symbol to tell React that this is valid JSX.
    return Symbol.for("react.element");
  } else if (value === "$RTE") {
    // This is our special marker we added on the server.
    // Restore the Symbol to tell React that this is valid JSX.
    return Symbol.for("react.transitional.element");
  } else if (typeof value === "string" && value.startsWith("$$")) {
    // This is a string starting with $. Remove the extra $ added by the server.
    return value.slice(1);
  } else {
    return value;
  }
}
  
window.addEventListener("click", (e) => {
    // Ignore clicks on anything that is not a link
    if (e.target.tagName !== "A") return;
    // Ignore clicks that open a new tab
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    
    // Ignore links that are not internal
    const href = e.target.getAttribute("href");
    if (!href.startsWith("/")) return;
    // Prevent the default action of reloading the page
    e.preventDefault();
    // Still update the browser history
    window.history.pushState(null, null, href);
    // Call our custom navigation logic
    navigate(href);
}, true);

window.addEventListener("popstate", () => {
  navigate(window.location.pathname);
});