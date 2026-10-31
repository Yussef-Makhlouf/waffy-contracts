import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { services } from "../../src/content/services";
import { SitePage } from "./site-page";

const routes = ["/", "/services", "/services/networks", "/contact"];
for (const width of [360, 390, 768, 1280, 1440]) {
  for (const route of routes) {
    test(`${route} renders accessibly without overflow at ${width}px`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
      const site = new SitePage(page);
      await site.visit(route);
      await site.loadIllustrations();
      await expect(page.locator("html")).toHaveAttribute("lang", "ar");
      await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
      await site.assertNoOverflow();
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      expect(results.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }))).toEqual([]);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      if (route === "/contact") await expect(page.locator("form, input, textarea")).toHaveCount(0);
      const brokenImages = await page.locator("img").evaluateAll(images => images.filter((img): img is HTMLImageElement => img instanceof HTMLImageElement).filter(img => img.complete && img.naturalWidth === 0).map(img => img.src));
      expect(brokenImages).toEqual([]);
      await page.screenshot({ path: testInfo.outputPath("page.png"), fullPage: true });
      expect(errors).toEqual([]);
    });
  }
}

test("mobile menu supports focus trapping, Escape, link navigation, and focus return", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  const site = new SitePage(page);
  await site.visit("/");
  await site.openMobileNavigation();
  const dialog = page.getByRole("dialog", { name: "القائمة الرئيسية" });
  await expect(dialog.getByRole("button", { name: "إغلاق قائمة التنقل" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("link", { name: "تواصل معنا" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(dialog.getByRole("button", { name: "إغلاق قائمة التنقل" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("button", { name: "فتح قائمة التنقل" })).toBeFocused();
  await site.openMobileNavigation();
  await dialog.getByRole("link", { name: "الشبكات", exact: true }).click();
  await expect(page).toHaveURL(/\/services\/networks$/);
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("أساس مترابط");
});

test("all ten homepage services reach their matching expanded sections", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const site = new SitePage(page);
  await site.visit("/");
  const serviceArea = page.locator("#services");
  for (const service of services) await expect(serviceArea.getByRole("link", { name: new RegExp(service.title) })).toHaveAttribute("href", `/services#${service.id}`);
  await site.visit("/services");
  for (const service of services) await expect(page.locator(`#${service.id}`)).toContainText(service.description);
  const targets = await page.getByRole("link").evaluateAll(links => [...new Set(links.map(a => a.getAttribute("href")).filter((href): href is string => Boolean(href?.startsWith("#"))))]);
  for (const target of targets) expect(await page.locator(target).count()).toBe(1);
});

test("internal navigation, missing contacts, keyboard access, and metadata are valid", async ({ page, request }) => {
  const site = new SitePage(page);
  await site.visit("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "تجاوز إلى المحتوى" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  const links = await page.getByRole("link").evaluateAll(elements => [...new Set(elements.map(el => el.getAttribute("href")).filter((href): href is string => Boolean(href?.startsWith("/") && !href.startsWith("//"))))]);
  for (const href of links) expect((await request.get(href.split("#")[0])).status()).toBe(200);
  await expect(page.getByRole("complementary", { name: "تواصل مباشر" }).getByRole("button")).toHaveCount(1);
  await expect(page.locator('a[href="tel:+966592772128"]').first()).toBeVisible();
  await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0);
  for (const route of routes) {
    await site.visit(route);
    await expect(page).toHaveTitle(/الوافي/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(page.getByRole("navigation", { name: "التنقل الرئيسي" }).getByRole("link", { name: route === "/" ? "الرئيسية" : route === "/services" ? "خدماتنا" : route === "/contact" ? "تواصل معنا" : "الشبكات", exact: true })).toHaveAttribute("aria-current", "page");
  }
});

test("reduced motion leaves all sections visible and removes animated transforms", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const site = new SitePage(page);
  await site.visit("/");
  const states = await page.locator("[data-reveal], [data-hero-reveal]").evaluateAll(nodes => nodes.map(node => ({ opacity: getComputedStyle(node).opacity, transform: getComputedStyle(node).transform })));
  expect(states.length).toBeGreaterThan(5);
  for (const state of states) expect(state).toEqual({ opacity: "1", transform: "none" });
});

test("ordinary motion and client navigation produce no runtime errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const site = new SitePage(page);
  await site.visit("/");
  await page.getByRole("link", { name: "اكتشف خدماتنا", exact: true }).click();
  await expect(page).toHaveURL(/\/services$/);
  await page.getByRole("navigation", { name: "التنقل الرئيسي" }).getByRole("link", { name: "تواصل معنا" }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await page.getByRole("navigation", { name: "التنقل الرئيسي" }).getByRole("link", { name: "الرئيسية" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(errors).toEqual([]);
});

test("ordinary mobile motion preserves full contrast below the fold", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const site = new SitePage(page);
  await site.visit("/");
  await expect.poll(() => page.locator("[data-hero-reveal]").evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === "1"))).toBe(true);
  const opacities = await page.locator("[data-reveal]").evaluateAll(nodes => nodes.map(node => getComputedStyle(node).opacity));
  expect(opacities.every(opacity => opacity === "1")).toBe(true);
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  expect(results.violations.map(v => v.id)).toEqual([]);
});
