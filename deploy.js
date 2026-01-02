import { copyFileSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

console.log('🚀 Starting deployment process...\n');

// Step 1: Build the project
console.log('📦 Building project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!\n');
} catch (error) {
  console.error('❌ Build failed!', error.message);
  process.exit(1);
}

// Step 2: Copy assets from dist/assets to assets/
console.log('📋 Copying assets...');
try {
  const distAssetsDir = join(process.cwd(), 'dist', 'assets');
  const assetsDir = join(process.cwd(), 'assets');
  
  // Create assets directory if it doesn't exist
  if (!existsSync(assetsDir)) {
    mkdirSync(assetsDir, { recursive: true });
  }
  
  // Read dist/index.html to get the asset filenames
  const distIndexHtml = readFileSync(join(process.cwd(), 'dist', 'index.html'), 'utf-8');
  
  // Extract asset filenames from the HTML
  const jsMatch = distIndexHtml.match(/src="\/app-launcher\/assets\/([^"]+)"/);
  const cssMatch = distIndexHtml.match(/href="\/app-launcher\/assets\/([^"]+)"/);
  
  if (jsMatch && cssMatch) {
    const jsFile = jsMatch[1];
    const cssFile = cssMatch[1];
    
    // Copy JS file
    copyFileSync(
      join(distAssetsDir, jsFile),
      join(assetsDir, jsFile)
    );
    console.log(`  ✓ Copied ${jsFile}`);
    
    // Copy CSS file
    copyFileSync(
      join(distAssetsDir, cssFile),
      join(assetsDir, cssFile)
    );
    console.log(`  ✓ Copied ${cssFile}`);
    
    console.log('✅ Assets copied successfully!\n');
  } else {
    console.error('❌ Could not find asset filenames in dist/index.html');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Failed to copy assets!', error.message);
  process.exit(1);
}

// Step 3: Backup current index.html and replace with production version
console.log('📝 Updating index.html for production...');
try {
  // Backup the dev version
  const devIndexHtml = readFileSync(join(process.cwd(), 'index.html'), 'utf-8');
  writeFileSync(join(process.cwd(), 'index.html.dev'), devIndexHtml);
  console.log('  ✓ Backed up dev index.html to index.html.dev');
  
  // Copy production index.html from dist
  const distIndexHtml = readFileSync(join(process.cwd(), 'dist', 'index.html'), 'utf-8');
  writeFileSync(join(process.cwd(), 'index.html'), distIndexHtml);
  console.log('✅ index.html updated for production!\n');
} catch (error) {
  console.error('❌ Failed to update index.html!', error.message);
  process.exit(1);
}

console.log('✨ Deployment preparation complete!');
console.log('\n📌 Next steps:');
console.log('   1. Review the changes: git status');
console.log('   2. Commit: git add . && git commit -m "Deploy latest changes"');
console.log('   3. Push: git push origin main');
console.log('   4. After pushing, run: npm run restore-dev');
console.log('\n💡 Or run: npm run deploy:push (to auto-commit and push)');
