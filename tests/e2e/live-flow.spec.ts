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
  // Every set is a round trip to the live backend, so the flow takes well over the 30s default.
  test.setTimeout(180_000);

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
    await page.getByRole("link", { name: /เริ่มฝึกวันนี้/ }).click();
    await expect(page).toHaveURL(/\/workout\/\d$/);
    await page.getByRole("button", { name: /เริ่มเซสชัน/ }).click();
    await expect(page).toHaveURL(/\/session\/[0-9a-f-]+$/);
  });

  await test.step("log every set of every exercise and see the rest timer auto-start", async () => {
    let sawRestTimer = false;
    const nextExercise = page.getByRole("button", { name: /ท่าถัดไป/ });

    for (;;) {
      const rows = page.locator(".set-row");
      const rowCount = await rows.count();
      for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);
        const weightInput = row.locator('input[name="weightKg"]');
        if (await weightInput.count()) await weightInput.fill("20");
        const repsInput = row.locator('input[name="reps"]');
        if (await repsInput.count()) await repsInput.fill("10");
        else await row.locator('input[name="durationSeconds"]').fill("30");

        await row.getByRole("button", { name: /บันทึกเซต/ }).click();
        await expect(row).toHaveClass(/completed-set/, { timeout: 20_000 });

        if (!sawRestTimer) {
          await expect(page.getByRole("status").filter({ has: page.locator(".rest-timer-label") })).toBeVisible();
          await expect(page.locator(".rest-timer-label")).toContainText("Rest");
          sawRestTimer = true;
        }
      }
      if (!(await nextExercise.isVisible())) break;
      await nextExercise.click();
    }
  });

  await test.step("finish the workout and land on the summary", async () => {
    await page.getByRole("button", { name: /จบการฝึก/ }).click();
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

      page.once("dialog", (dialog) => dialog.accept());
      await page.getByRole("button", { name: /ลบรูป/ }).click();
      await expect(page.locator(".photo-card")).toHaveCount(0);
    } finally {
      unlinkSync(fixturePath);
    }
  });
});
