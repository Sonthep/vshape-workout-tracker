import { execSync } from "node:child_process";

const commands = [
  ["node", "node --version"],
  ["pnpm", "pnpm --version"],
  ["git", "git --version"],
];

let failed = false;
for (const [name, command] of commands) {
  try {
    const out = execSync(command, { stdio: ["ignore", "pipe", "pipe"] }).toString().trim();
    console.log(`✓ ${name}: ${out}`);
  } catch {
    console.error(`✗ ${name}: not found`);
    failed = true;
  }
}

const envVars = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"];
for (const key of envVars) {
  console.log(`${process.env[key] ? "✓" : "○"} ${key}${process.env[key] ? "" : " (not set in current shell)"}`);
}

process.exitCode = failed ? 1 : 0;
