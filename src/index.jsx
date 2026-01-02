import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

// Handle 404.html redirects for GitHub Pages SPA routing
// Extract path from _redirect query parameter and update URL without reload
(function() {
  var searchParams = new URLSearchParams(window.location.search);
  var redirectPath = searchParams.get('_redirect');
  if (redirectPath) {
    // Decode and update URL without reloading (so React Router can handle it)
    var decodedPath = decodeURIComponent(redirectPath);
    window.history.replaceState({}, '', decodedPath);
    // Remove _redirect from URL
    searchParams.delete('_redirect');
    var newSearch = searchParams.toString();
    var cleanPath = decodedPath.split('?')[0] + (newSearch ? '?' + newSearch : '') + window.location.hash;
    window.history.replaceState({}, '', cleanPath);
  }
})();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL || "/app-launcher/"}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
