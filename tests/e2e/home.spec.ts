import { expect, test } from "@playwright/test";

test("home presents the next workout and its prescription", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Workout Tracker" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /weekly schedule/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /start workout/i })).toBeVisible();
  await expect(page.getByText(/sets ×/i).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /start workout/i })).toHaveAttribute("href", /workout\/\d/);
});
