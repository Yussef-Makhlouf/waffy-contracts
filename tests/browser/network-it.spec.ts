import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { networkIT, itServiceGroups, itFAQs } from "../../src/content/network-it";
import { SitePage } from "./site-page";

for (const width of [360, 390, 768, 1280, 1440]) {
  test(`Network & IT page is accessible and balanced at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 960 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", event => { if (event.type() === "error") errors.push(event.text()); });
    const site = new SitePage(page);
    await site.visit(networkIT.route);
    await site.loadIllustrations();
    await site.assertNoOverflow();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    const primary = page.getByRole("link", { name: "استكشف الخدمات", exact: true });
    const colors = await primary.evaluate(element => ({ foreground: getComputedStyle(element).color, background: getComputedStyle(element).backgroundColor }));
    expect(colors.foreground).not.toBe(colors.background);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("كل تفاصيل مشروعك");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    for (const service of itServiceGroups) await expect(page.locator(`#${service.id}`)).toContainText(service.description);
    for (const image of Object.values(networkIT.images)) await expect(page.getByAltText(image.alt)).toBeVisible();
    const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    expect(audit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }))).toEqual([]);
    await page.screenshot({ path: testInfo.outputPath(`network-it-${width}.png`), fullPage: true });
    expect(errors).toEqual([]);
  });
}

test("service anchors and native FAQ work with the keyboard", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const site = new SitePage(page);
  await site.visit(networkIT.route);
  const topics = page.getByRole("navigation", { name: "تخصصات الشبكات وتقنية المعلومات" });
  await topics.getByRole("link", { name: /غرف الاتصالات/ }).click();
  await expect(page).toHaveURL(/#it-rooms$/);
  await expect(page.locator("#it-rooms")).toBeInViewport();
  const faq = page.locator("summary").filter({ hasText: itFAQs[0].question });
  await faq.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText(itFAQs[0].answer, { exact: true })).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.getByText(itFAQs[0].answer, { exact: true })).not.toBeVisible();
  await site.assertNoOverflow();
});

test("new page is discoverable through mobile navigation and Services", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  const site = new SitePage(page);
  await site.visit("/");
  await site.openMobileNavigation();
  await page.getByRole("dialog").getByRole("link", { name: "تقنية المعلومات" }).click();
  await expect(page).toHaveURL(new RegExp(networkIT.route));
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await site.visit("/services");
  await page.getByRole("link", { name: "اكتشف الشبكات وتقنية المعلومات" }).click();
  await expect(page).toHaveURL(new RegExp(networkIT.route));
});

test("metadata, original civil page and internal destinations remain valid", async ({ page, request }) => {
  const site = new SitePage(page);
  await site.visit(networkIT.route);
  await expect(page).toHaveTitle(/الشبكات وتقنية المعلومات.*الوافي/);
  await expect(page.getByRole("navigation", { name: "التنقل الرئيسي" }).getByRole("link", { name: "تقنية المعلومات" })).toHaveAttribute("aria-current", "page");
  const links = await page.getByRole("link").evaluateAll(nodes => [...new Set(nodes.map(node => node.getAttribute("href")).filter((href): href is string => Boolean(href?.startsWith("/") && !href.startsWith("//"))))]);
  for (const link of links) expect((await request.get(link.split("#")[0])).status()).toBe(200);
  await site.visit("/services/networks");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("أساس مترابط");
});
