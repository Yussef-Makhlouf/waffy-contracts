import { expect, type Page } from "@playwright/test";

export class SitePage {
  constructor(readonly page: Page) {}

  async visit(path: string) {
    const response = await this.page.goto(path);
    expect(response?.status()).toBe(200);
    await this.page.evaluate(() => document.fonts.ready);
    await expect(this.page.getByRole("heading", { level: 1 })).toBeVisible();
  }

  async assertNoOverflow() {
    const dimensions = await this.page.evaluate(() => ({ content: document.documentElement.scrollWidth, viewport: window.innerWidth }));
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
  }

  async loadIllustrations() {
    for (const image of await this.page.getByRole("img", { includeHidden: true }).all()) {
      if (await image.evaluate(node => node instanceof HTMLImageElement)) {
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate(node => node instanceof HTMLImageElement && node.complete && node.naturalWidth > 0)).toBe(true);
      }
    }
    await this.page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  }

  async openMobileNavigation() {
    await this.page.getByRole("button", { name: "فتح قائمة التنقل" }).click();
    await expect(this.page.getByRole("dialog", { name: "القائمة الرئيسية" })).toBeVisible();
  }
}
