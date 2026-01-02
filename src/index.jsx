import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

// Handle 404.html redirects for GitHub Pages SPA routing
// Extract path from query string if we came from 404.html redirect
(function() {
  var search = window.location.search;
  if (search && search.includes('?/')) {
    // Extract path from query string (format: ?/path&other=params)
    var path = search.slice(2).split('&')[0].replace(/~and~/g, '&');
    var remainingSearch = search.slice(2).split('&').slice(1);
    var newSearch = remainingSearch.length > 0 ? '?' + remainingSearch.join('&').replace(/~and~/g, '&') : '';
    var newPath = '/app-launcher/' + path + newSearch + window.location.hash;
    // Replace URL without reloading
    window.history.replaceState({}, '', newPath);
  }
})();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL || "/app-launcher/"}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
