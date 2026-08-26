import { expect, test } from "@playwright/test";

test("login page presents an email/password sign-in form", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: /sign in to train/i })).toBeVisible();
  await expect(page.getByLabel(/email address/i)).toBeVisible();
  await expect(page.getByLabel(/^password$/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /^sign in$/i })).toBeVisible();
});

test("login page can switch to account creation", async ({ page }) => {
  await page.goto("/login", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /create an account/i }).click();
  await expect(page.getByRole("heading", { name: /create your account/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /^create account$/i })).toBeVisible();
});
