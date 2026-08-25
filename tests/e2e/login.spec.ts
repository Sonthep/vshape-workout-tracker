import { expect, test } from "@playwright/test";

test("login page presents a passwordless sign-in form", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: /sign in to train/i })).toBeVisible();
  await expect(page.getByLabel(/email address/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /email me a sign-in link/i })).toBeVisible();
});
