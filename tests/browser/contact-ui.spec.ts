import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { SitePage } from "./site-page";

for (const width of [360, 390, 768, 1280, 1440]) {
  test(`social icons and floating contacts are accessible at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 960 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    const site = new SitePage(page);
    await site.visit("/contact");
    const social = page.getByRole("main").getByRole("group", { name: "منصات التواصل الاجتماعي" });
    await social.scrollIntoViewIfNeeded();
    await expect(social.getByRole("button")).toHaveCount(4);
    await expect(social.getByRole("link")).toHaveCount(0);
    const dock = page.getByRole("complementary", { name: "تواصل مباشر" });
    await expect(dock.locator("[data-contact-action]")).toHaveCount(2);
    await expect(dock.getByRole("link", { name: /اتصال مباشر/ })).toHaveAttribute("href", "tel:+966592772128");
    await expect(page.locator('a[href="mailto:info@alwafigc.sa"]').first()).toBeVisible();
    await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0);
    for (const control of await dock.locator("[data-contact-action]").all()) {
      const bounds = await control.boundingBox();
      expect(bounds).not.toBeNull();
      expect(bounds!.width).toBeGreaterThanOrEqual(44);
      expect(bounds!.height).toBeGreaterThanOrEqual(44);
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
    }
    await site.assertNoOverflow();
    const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    expect(audit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.failureSummary) }))).toEqual([]);
    await page.screenshot({ path: testInfo.outputPath(`contact-ui-${width}.png`), fullPage: true });
    expect(errors).toEqual([]);
  });
}

test("empty social profiles explain their pending state without navigating", async ({ page }) => {
  const site = new SitePage(page);
  await site.visit("/contact");
  const main = page.getByRole("main");
  await main.getByRole("button", { name: /إنستغرام/ }).click();
  await expect(main.getByRole("status")).toContainText("سيُضاف رابط إنستغرام الرسمي عند توفره");
  await expect(page).toHaveURL(/\/contact$/);
  const footer = page.getByRole("contentinfo");
  await footer.getByRole("button", { name: /لينكدإن/ }).click();
  await expect(footer.getByRole("status")).toContainText("سيُضاف رابط لينكدإن الرسمي عند توفره");
});

test("floating placeholders open notices, close with Escape, and return focus", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  const site = new SitePage(page);
  await site.visit("/contact");
  const dock = page.getByRole("complementary", { name: "تواصل مباشر" });
  const whatsapp = dock.getByRole("button", { name: /التواصل عبر واتساب/ });
  const phone = dock.getByRole("link", { name: /اتصال مباشر/ });
  await expect(phone).toHaveAttribute("href", "tel:+966592772128");
  await whatsapp.click();
  await expect(dock.getByRole("status")).toContainText("سيُضاف رقم واتساب الرسمي");
  await expect(whatsapp).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(dock.getByRole("status")).toHaveCount(0);
  await expect(whatsapp).toBeFocused();
  await whatsapp.click();
  await expect(dock.getByRole("status")).toContainText("سيُضاف رقم واتساب الرسمي");
  await site.assertNoOverflow();
  await dock.getByRole("button", { name: "إغلاق تنبيه التواصل" }).click();
  await expect(whatsapp).toBeFocused();
  await whatsapp.click();
  await page.getByRole("heading", { level: 1 }).click();
  await expect(dock.getByRole("status")).toHaveCount(0);
});

test("exactly two global contact actions and social footer exist on every page", async ({ page }) => {
  const site = new SitePage(page);
  for (const route of ["/", "/services", "/services/networks", "/services/network-it", "/contact"]) {
    await site.visit(route);
    await expect(page.getByRole("complementary", { name: "تواصل مباشر" }).locator("[data-contact-action]")).toHaveCount(2);
    await expect(page.getByRole("contentinfo").getByRole("group", { name: "منصات التواصل الاجتماعي" }).getByRole("button")).toHaveCount(4);
  }
});
