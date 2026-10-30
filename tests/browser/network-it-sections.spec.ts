import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { itServiceGroups, networkIT } from "../../src/content/network-it";
import { SitePage } from "./site-page";

for (const width of [360, 390, 768, 1280, 1440]) {
  for (const route of ["/", "/services"]) {
    test(`IT section on ${route} works at ${width}px`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 960 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      page.on("console", event => { if (event.type() === "error") errors.push(event.text()); });
      const site = new SitePage(page);
      await site.visit(route);
      const section = page.locator("section#network-it");
      await expect(section).toHaveCount(1);
      await section.scrollIntoViewIfNeeded();
      for (const image of await section.getByRole("img").all()) {
        if (await image.evaluate(node => node instanceof HTMLImageElement)) {
          await image.scrollIntoViewIfNeeded();
          await expect.poll(() => image.evaluate(node => node instanceof HTMLImageElement && node.complete && node.naturalWidth > 0)).toBe(true);
        }
      }
      await site.assertNoOverflow();
      await expect(section.getByRole("heading", { level: 2 })).toContainText(route === "/" ? "حين تتصل تفاصيله" : "إلى تكامل الأنظمة");
      await expect(section.getByRole("link", { name: "اكتشف الشبكات وتقنية المعلومات", exact: true })).toHaveAttribute("href", networkIT.route);
      const audit = await new AxeBuilder({ page }).include("#network-it").withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      expect(audit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }))).toEqual([]);
      // Isolate the section in the saved design review; these fixed controls
      // are tested above and otherwise get stitched into tall element captures.
      await page.addStyleTag({ content: ".site-header, .skip-link { visibility: hidden !important; }" });
      await section.screenshot({ path: testInfo.outputPath(`it-section-${route === "/" ? "home" : "services"}-${width}.png`) });
      expect(errors).toEqual([]);
    });
  }
}

test("home links lead to each IT specialty and its dedicated page", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const site = new SitePage(page);
  await site.visit("/");
  const section = page.locator("#network-it");
  for (const service of itServiceGroups) await expect(section.getByRole("link", { name: new RegExp(service.title) })).toHaveAttribute("href", `${networkIT.route}#${service.id}`);
  await section.getByRole("link", { name: /غرف الاتصالات/ }).click();
  await expect(page).toHaveURL(/\/services\/network-it#it-rooms$/);
  await expect(page.locator("#it-rooms")).toBeInViewport();
});

test("Services section opens one specialty at a time and supports the keyboard", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const site = new SitePage(page);
  await site.visit("/services");
  await page.getByRole("link", { name: "انتقل إلى قسم الشبكات وتقنية المعلومات", exact: true }).click();
  await expect(page).toHaveURL(/\/services#network-it$/);
  const section = page.locator("#network-it");
  await expect(section.locator("details[open]")).toHaveCount(1);
  const question = section.locator("summary").filter({ hasText: itServiceGroups[2].title });
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(section.getByText(itServiceGroups[2].description, { exact: true })).toBeVisible();
  await expect(section.getByText(itServiceGroups[0].description, { exact: true })).not.toBeVisible();
  await expect(section.locator("details[open]")).toHaveCount(1);
  await section.getByRole("link", { name: "تفاصيل هذا التخصص", exact: true }).click();
  await expect(page).toHaveURL(/\/services\/network-it#it-rooms$/);
});

test("both section CTAs are readable and navigate to the IT page", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const site = new SitePage(page);
  for (const route of ["/", "/services"]) {
    await site.visit(route);
    const button = page.locator("#network-it").getByRole("link", { name: "اكتشف الشبكات وتقنية المعلومات", exact: true });
    const colors = await button.evaluate(element => ({ text: getComputedStyle(element).color, background: getComputedStyle(element).backgroundColor }));
    expect(colors.text).not.toBe(colors.background);
    await button.click();
    await expect(page).toHaveURL(new RegExp(`${networkIT.route}$`));
  }
});
