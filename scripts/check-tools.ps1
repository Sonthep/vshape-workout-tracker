$tools = @(
  @{ Name = "Node"; Command = "node --version" },
  @{ Name = "pnpm"; Command = "pnpm --version" },
  @{ Name = "Git"; Command = "git --version" },
  @{ Name = "GitHub CLI"; Command = "gh --version" },
  @{ Name = "Supabase CLI"; Command = "supabase --version" },
  @{ Name = "Vercel CLI"; Command = "vercel --version" },
  @{ Name = "Codex CLI"; Command = "codex --version" },
  @{ Name = "Claude Code"; Command = "claude --version" }
)

foreach ($tool in $tools) {
  try {
    $result = Invoke-Expression $tool.Command 2>$null | Select-Object -First 1
    Write-Host "[OK] $($tool.Name): $result" -ForegroundColor Green
  } catch {
    Write-Host "[OPTIONAL/MISSING] $($tool.Name)" -ForegroundColor Yellow
  }
}
