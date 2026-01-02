import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

// Handle 404.html redirects for GitHub Pages SPA routing
// If we're on index.html but the URL has a path, ensure React Router handles it
if (window.location.pathname === '/app-launcher/' || window.location.pathname === '/app-launcher/404.html') {
  // Check if we have a redirect path in the URL
  var searchParams = new URLSearchParams(window.location.search);
  var redirectPath = searchParams.get('/');
  if (redirectPath) {
    // Decode the path and navigate
    var path = redirectPath.replace(/~and~/g, '&');
    var newPath = '/app-launcher/' + path;
    if (window.location.hash) {
      newPath += window.location.hash;
    }
    // Use replace to avoid adding to history
    window.history.replaceState({}, '', newPath);
  }
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL || "/app-launcher/"}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
