import { expect, test } from "@playwright/test";

test("workout day page offers to start a session and requires auth", async ({ page }) => {
  await page.goto("/workout/1");
  // Unauthenticated visitors are redirected to sign in before they can start a session.
  await expect(page).toHaveURL(/\/login$/);
});

test("session page requires auth", async ({ page }) => {
  await page.goto("/session/00000000-0000-0000-0000-000000000000");
  await expect(page).toHaveURL(/\/login$/);
});

test("history list requires auth", async ({ page }) => {
  await page.goto("/history");
  await expect(page).toHaveURL(/\/login$/);
});

test("history detail requires auth", async ({ page }) => {
  await page.goto("/history/00000000-0000-0000-0000-000000000000");
  await expect(page).toHaveURL(/\/login$/);
});

test("progress page requires auth", async ({ page }) => {
  await page.goto("/progress");
  await expect(page).toHaveURL(/\/login$/);
});

test("photos page requires auth", async ({ page }) => {
  await page.goto("/photos");
  await expect(page).toHaveURL(/\/login$/);
});
