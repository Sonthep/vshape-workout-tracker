import { expect, test } from "@playwright/test";

test("home presents the next workout and its prescription", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /สร้างทรง V-SHAPE/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: "แผนฝึกประจำสัปดาห์" })).toBeVisible();
  await expect(page.getByRole("link", { name: /เริ่มฝึกวันนี้/i })).toBeVisible();
  await expect(page.getByText(/sets ×/i).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /เริ่มฝึกวันนี้/i })).toHaveAttribute("href", /workout\/\d/);
});
