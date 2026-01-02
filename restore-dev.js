import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'fs';
import { join } from 'path';

console.log('🔄 Restoring index.html for development...\n');

try {
  const backupFile = join(process.cwd(), 'index.html.dev');
  
  if (existsSync(backupFile)) {
    // Restore from backup
    const devIndexHtml = readFileSync(backupFile, 'utf-8');
    writeFileSync(join(process.cwd(), 'index.html'), devIndexHtml);
    
    // Optionally remove the backup file
    // unlinkSync(backupFile);
    
    console.log('✅ index.html restored for development from backup!\n');
  } else {
    // No backup, create dev version manually
    const rootIndexHtml = readFileSync(join(process.cwd(), 'index.html'), 'utf-8');
    
    // Replace production script tag with dev script tag
    let updatedHtml = rootIndexHtml.replace(
      /<script[^>]*src="\/app-launcher\/assets\/[^"]*"[^>]*><\/script>/,
      '    <script type="module" src="/src/index.jsx"></script>'
    );
    
    // Remove production CSS link tag (Vite will inject it during dev)
    updatedHtml = updatedHtml.replace(
      /<link[^>]*href="\/app-launcher\/assets\/[^"]*\.css"[^>]*>\s*/g,
      ''
    );
    
    // Write the updated HTML
    writeFileSync(join(process.cwd(), 'index.html'), updatedHtml);
    console.log('✅ index.html restored for development!\n');
  }
  
  console.log('💡 You can now run: npm run dev');
} catch (error) {
  console.error('❌ Failed to restore index.html!', error.message);
  process.exit(1);
}
