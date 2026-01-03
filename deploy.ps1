# PowerShell deployment script for Windows
Write-Host "🚀 Starting deployment process...`n" -ForegroundColor Cyan

# Step 1: Build the project
Write-Host "📦 Building project..." -ForegroundColor Yellow
try {
    npm run build
    if ($LASTEXITCODE -ne 0) {
        throw "Build failed with exit code $LASTEXITCODE"
    }
    Write-Host "✅ Build completed successfully!`n" -ForegroundColor Green
} catch {
    Write-Host "❌ Build failed! $_" -ForegroundColor Red
    exit 1
}

# Step 2: Copy assets from dist/assets to assets/
Write-Host "📋 Copying assets..." -ForegroundColor Yellow
try {
    $distAssetsDir = Join-Path $PSScriptRoot "dist\assets"
    $assetsDir = Join-Path $PSScriptRoot "assets"
    
    # Read dist/index.html to get the asset filenames
    $distIndexHtml = Get-Content (Join-Path $PSScriptRoot "dist\index.html") -Raw
    
    # Extract asset filenames from the HTML
    if ($distIndexHtml -match 'src="/app-launcher/assets/([^"]+)"') {
        $jsFile = $matches[1]
        Copy-Item (Join-Path $distAssetsDir $jsFile) (Join-Path $assetsDir $jsFile) -Force
        Write-Host "  ✓ Copied $jsFile" -ForegroundColor Green
    }
    
    if ($distIndexHtml -match 'href="/app-launcher/assets/([^"]+)"') {
        $cssFile = $matches[1]
        Copy-Item (Join-Path $distAssetsDir $cssFile) (Join-Path $assetsDir $cssFile) -Force
        Write-Host "  ✓ Copied $cssFile" -ForegroundColor Green
    }
    
    Write-Host "✅ Assets copied successfully!`n" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to copy assets! $_" -ForegroundColor Red
    exit 1
}

# Step 3: Update root index.html with production paths
Write-Host "📝 Updating index.html for production..." -ForegroundColor Yellow
try {
    $distIndexHtml = Get-Content (Join-Path $PSScriptRoot "dist\index.html") -Raw
    $rootIndexHtml = Get-Content (Join-Path $PSScriptRoot "index.html") -Raw
    
    # Extract production script and link tags
    if ($distIndexHtml -match '(<script[^>]*src="/app-launcher/assets/[^"]*"[^>]*></script>)') {
        $prodScript = $matches[1]
        $rootIndexHtml = $rootIndexHtml -replace '<script[^>]*src="/src/index\.jsx"[^>]*></script>', $prodScript
    }
    
    if ($distIndexHtml -match '(<link[^>]*href="/app-launcher/assets/[^"]*"[^>]*>)') {
        $prodLink = $matches[1]
        $rootIndexHtml = $rootIndexHtml -replace '<link[^>]*href="[^"]*\.css"[^>]*>', $prodLink
    }
    
    # Write the updated HTML
    Set-Content (Join-Path $PSScriptRoot "index.html") $rootIndexHtml
    Write-Host "✅ index.html updated for production!`n" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to update index.html! $_" -ForegroundColor Red
    exit 1
}

Write-Host "✨ Deployment preparation complete!" -ForegroundColor Cyan
Write-Host "`n📌 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Review the changes: git status"
Write-Host "   2. Commit: git add . && git commit -m 'Deploy latest changes'"
Write-Host "   3. Push: git push origin main"
Write-Host "`n💡 Or run: npm run deploy:push (to auto-commit and push)" -ForegroundColor Cyan


