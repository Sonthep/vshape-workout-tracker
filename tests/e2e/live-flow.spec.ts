import { unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "@playwright/test";

/**
 * This test signs up a brand-new user against the real, live Supabase
 * project (no mocking) and drives the full product flow end to end. It
 * therefore creates a permanent auth user plus workout/measurement/photo
 * rows and a stored file every time it runs. Opt in explicitly rather than
 * letting it run as part of the normal test:e2e pass or a future CI job —
 * run with: RUN_LIVE_E2E=1 pnpm exec playwright test live-flow.
 */
test.skip(
  !process.env.RUN_LIVE_E2E,
  "Set RUN_LIVE_E2E=1 to run this against the live Supabase backend (it creates a real, permanent auth user).",
);

test("a new user can sign up and complete the full workout, history, and progress flow", async ({ page }) => {
  const email = `e2e-${Date.now()}@example.com`;
  const password = "TestPass123!";

  await test.step("sign up", async () => {
    await page.goto("/login", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /create an account/i }).click();
    await page.getByLabel(/email address/i).fill(email);
    await page.getByLabel(/^password$/i).fill(password);
    await page.getByRole("button", { name: /^create account$/i }).click();
    await expect(page).toHaveURL("/");
  });

  await test.step("start today's workout and a session", async () => {
    await page.getByRole("link", { name: /start workout/i }).click();
    await expect(page).toHaveURL(/\/workout\/\d$/);
    await page.getByRole("button", { name: /start session/i }).click();
    await expect(page).toHaveURL(/\/session\/[0-9a-f-]+$/);
  });

  await test.step("log the first set and see the rest timer auto-start", async () => {
    const firstSet = page.locator(".set-row").first();
    const weightInput = firstSet.locator('input[name="weightKg"]');
    if (await weightInput.count()) {
      await weightInput.fill("20");
      await firstSet.locator('input[name="reps"]').fill("10");
    } else {
      await firstSet.locator('input[name="durationSeconds"]').fill("30");
    }
    await firstSet.getByRole("button", { name: /complete set/i }).click();

    await expect(page.getByRole("status")).toBeVisible();
    await expect(page.locator(".rest-timer-label")).toContainText("Rest");
  });

  await test.step("finish the workout and land on the summary", async () => {
    await page.getByRole("button", { name: /finish workout/i }).click();
    await expect(page).toHaveURL(/\/history\/[0-9a-f-]+$/);
    await expect(page.getByText(/sets completed/i)).toBeVisible();
  });

  await test.step("see the finished session in history", async () => {
    await page.goto("/history", { waitUntil: "networkidle" });
    await expect(page.locator(".history-row")).toHaveCount(1);
  });

  await test.step("log a body measurement", async () => {
    await page.goto("/progress", { waitUntil: "networkidle" });
    await page.locator('input[name="weightKg"]').fill("80");
    await page.getByRole("button", { name: /save measurement/i }).click();
    await expect(page.locator(".measurement-row")).toHaveCount(1);
  });

  await test.step("upload and then delete a progress photo", async () => {
    await page.goto("/photos", { waitUntil: "networkidle" });

    const fixturePath = join(tmpdir(), `e2e-photo-${Date.now()}.png`);
    const onePixelPng = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
      "base64",
    );
    writeFileSync(fixturePath, onePixelPng);

    try {
      await page.locator('input[type="file"]').setInputFiles(fixturePath);
      await page.getByRole("button", { name: /upload photo/i }).click();
      await expect(page.locator(".photo-card")).toHaveCount(1);

      await page.getByRole("button", { name: /delete/i }).click();
      await expect(page.locator(".photo-card")).toHaveCount(0);
    } finally {
      unlinkSync(fixturePath);
    }
  });
});
