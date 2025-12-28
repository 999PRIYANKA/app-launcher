import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { copyFileSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

export default defineConfig({
  base: '/',
  plugins: [
    react(), 
    tailwindcss(),
    {
      name: 'copy-404',
      closeBundle() {
        // Copy index.html to 404.html for GitHub Pages SPA routing
        const distPath = join(process.cwd(), 'dist');
        const indexPath = join(distPath, 'index.html');
        const notFoundPath = join(distPath, '404.html');
        
        // Read index.html
        let html = readFileSync(indexPath, 'utf-8');
        
        // Add a script before closing body tag to handle SPA routing for GitHub Pages
        // This script redirects 404.html requests to index.html with the path preserved
        const redirectScript = `
    <script>
      // GitHub Pages SPA redirect - redirects 404.html to index.html with path
      var pathSegmentsToKeep = 0;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
    <script>
      // Restore the path from the query parameter
      (function(l) {
        if (l.search[1] === '/' ) {
          var decoded = l.search.slice(1).split('&').map(function(s) { 
            return s.replace(/~and~/g, '&')
          }).join('?');
          window.history.replaceState(null, null,
              l.pathname.slice(0, 1 + pathSegmentsToKeep) + decoded + l.hash
          );
        }
      }(window.location))
    </script>`;
        
        // Insert script before closing body tag
        html = html.replace('</body>', redirectScript + '\n  </body>');
        
        // Write to 404.html
        writeFileSync(notFoundPath, html, 'utf-8');
      }
    }
  ],
});

