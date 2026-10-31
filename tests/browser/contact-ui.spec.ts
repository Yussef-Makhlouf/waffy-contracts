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
    await expect(dock.getByRole("link", { name: /التواصل عبر واتساب/ })).toHaveAttribute("href", /^https:\/\/wa\.me\/966560760092\?text=/);
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

test("floating phone and WhatsApp links use approved international destinations", async ({ page }) => {
  const site = new SitePage(page);
  await site.visit("/contact");
  const dock = page.getByRole("complementary", { name: "تواصل مباشر" });
  await expect(dock.getByRole("button")).toHaveCount(0);
  await expect(dock.getByRole("link", { name: /اتصال مباشر/ })).toHaveAttribute("href", "tel:+966592772128");
  const whatsapp = dock.getByRole("link", { name: /التواصل عبر واتساب/ });
  const destination = new URL((await whatsapp.getAttribute("href"))!);
  expect(destination.origin).toBe("https://wa.me");
  expect(destination.pathname).toBe("/966560760092");
  expect(destination.searchParams.get("text")).toContain("السلام عليكم");
  await expect(whatsapp).toHaveAttribute("target", "_blank");
  await expect(whatsapp).toHaveAttribute("rel", /noopener/);
});

test("exactly two global contact actions and social footer exist on every page", async ({ page }) => {
  const site = new SitePage(page);
  for (const route of ["/", "/services", "/services/networks", "/services/network-it", "/contact"]) {
    await site.visit(route);
    await expect(page.getByRole("complementary", { name: "تواصل مباشر" }).locator("[data-contact-action]")).toHaveCount(2);
    await expect(page.getByRole("contentinfo").getByRole("group", { name: "منصات التواصل الاجتماعي" }).getByRole("button")).toHaveCount(4);
  }
});
