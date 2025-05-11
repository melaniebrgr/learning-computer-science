import { hydrateRoot } from "react-dom/client";

const root = hydrateRoot(document, getInitialClientJSX());
let currentPathname = window.location.pathname;

async function navigate(pathname) {
    currentPathname = pathname;

    // Fetch the JSX (object tree produced by JSX, not the syntax)
    const responseJsx = await fetchClientJSX(pathname);
    console.log("responseJsx", responseJsx);
    // root.render(responseJsx);

    // Fetch HTML for the route we're navigating to.
    const responseHtml = await fetch(pathname);
    const html = await responseHtml.text(responseHtml);
    setClientHTML(html);
}

function getInitialClientJSX() {
    return null; // TODO
}

async function fetchClientJSX(pathname) {
    const response = await fetch(pathname + "?jsx");
    const clientJSXString = await response.text();
    const clientJSX = JSON.parse(clientJSXString);
    return clientJSX;
}

function setClientHTML(html) {
    // Get the title from the HTML.
    const titleStartIndex = html.indexOf("<title>") + "<title>".length;
    const titleEndIndex = html.indexOf("</title>");
    const title = html.slice(titleStartIndex, titleEndIndex);
    
    // Set the title of the page.
    document.title = title;

    // Get the part of HTML inside the <body> tag.
    const bodyStartIndex = html.indexOf("<body>") + "<body>".length;
    const bodyEndIndex = html.lastIndexOf("</body>");
    const bodyHTML = html.slice(bodyStartIndex, bodyEndIndex);

    // Replace the content on the page.
    document.body.innerHTML = bodyHTML;
}
  
window.addEventListener("click", (e) => {
    // Only listen to link clicks.
    if (e.target.tagName !== "A") {
        return;
    }
    // Ignore "open in a new tab".
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
    }
    // Ignore external URLs.
    const href = e.target.getAttribute("href");
    if (!href.startsWith("/")) {
        return;
    }
    // Prevent the browser from reloading the page but update the URL.
    e.preventDefault();
    window.history.pushState(null, null, href);
    // Call our custom logic.
    navigate(href);
    }, true);

    window.addEventListener("popstate", () => {
    // When the user presses Back/Forward, call our custom logic too.
    navigate(window.location.pathname);
});