import { test, expect } from "@playwright/test";
import sharp from "sharp";
import { searchPages, searchPaths } from "../../src/content/search";

// A reserved documentation domain is used only for the isolated configured build.
const origin = process.env.TEST_EXPECT_SITE_ORIGIN || null;
const indexable = Boolean(origin) && process.env.TEST_EXPECT_INDEXABLE !== "false";

for (const route of searchPaths) {
  test(`search metadata and visible structured answers agree on ${route}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    const content = searchPages[route];
    await expect(page).toHaveTitle(content.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", content.description);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", content.title);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", content.description);
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "ar_SA");
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute("content", content.description);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", indexable ? /^index, follow$/ : /^noindex, follow$/);
    await expect(page.locator('meta[name="googlebot"]')).toHaveAttribute("content", /max-image-preview:large/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByText(content.summary, { exact: true })).toBeVisible();

    const site = await page.locator('script[data-site-schema]').evaluate(el => JSON.parse(el.textContent!));
    const organization = site["@graph"].find((node: Record<string, unknown>) => node["@type"] === "Organization");
    expect(organization.name).toBe("الوافي للمقاولات العامة");
    expect(organization.telephone).toBe("+966592772128");
    expect(organization.email).toBe("info@alwafigc.sa");
    for (const field of ["address", "aggregateRating", "review", "openingHours", "sameAs", "areaServed"]) expect(organization[field]).toBeUndefined();
    const schema = await page.locator('script[data-page-schema]').evaluate(el => JSON.parse(el.textContent!));
    const nodes = schema["@graph"];
    const faq = nodes.find((node: Record<string, unknown>) => node["@type"] === "FAQPage");
    expect(faq.mainEntity).toHaveLength(content.faqs.length);
    await expect(page.locator('[data-faq]')).toHaveCount(content.faqs.length);
    for (const [index, question] of content.faqs.entries()) {
      expect(faq.mainEntity[index].name).toBe(question.question);
      expect(faq.mainEntity[index].acceptedAnswer.text).toBe(question.answer);
      expect(faq.mainEntity[index]["@id"]).toBe(`${origin ?? ""}${route}#faq-${question.id}`);
      const detail = page.locator(`#faq-${question.id}`);
      await detail.locator("summary").click();
      await expect(detail.locator("p")).toHaveText(question.answer);
    }
    await expect(page.locator('time[datetime]')).toHaveAttribute("datetime", content.updated);
    const related = page.getByRole("navigation", { name: "صفحات مرتبطة" });
    for (const path of content.related) await expect(related.locator(`a[href="${path}"]`)).toHaveCount(1);

    const catalogue = nodes.find((node: Record<string, unknown>) => node["@type"] === "ItemList");
    if (catalogue) for (const entry of catalogue.itemListElement) {
      const anchor = entry.item["@id"].split("#")[1];
      await expect(page.locator(`[id="${anchor}"]`)).toHaveCount(1);
      await expect(page.locator(`[id="${anchor}"]`)).toContainText(entry.item.name);
    }
    if (origin) {
      // Next normalizes an origin-only metadata URL without the trailing slash.
      expect(new URL((await page.locator('link[rel="canonical"]').getAttribute("href"))!).href).toBe(`${origin}${route}`);
      expect(new URL((await page.locator('meta[property="og:url"]').getAttribute("content"))!).href).toBe(`${origin}${route}`);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", `${origin}${content.image}`);
      await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", `${origin}${content.image}`);
      await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "1200");
      await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute("content", "630");
      const breadcrumbs = nodes.find((node: Record<string, unknown>) => node["@type"] === "BreadcrumbList");
      if (route === "/") expect(breadcrumbs).toBeUndefined();
      else {
        expect(breadcrumbs.itemListElement.length).toBeGreaterThanOrEqual(2);
        expect(breadcrumbs.itemListElement.at(-1).item).toBe(`${origin}${route}`);
      }
    } else {
      await expect(page.locator('link[rel="canonical"], meta[property="og:url"], meta[property="og:image"], meta[name="twitter:image"]')).toHaveCount(0);
      expect(JSON.stringify(nodes)).not.toMatch(/localhost|127\.0\.0\.1|example\.com/);
    }
  });
}

test("robots, sitemap, and sharing images follow the configured launch state", async ({ request }) => {
  const robotsResponse = await request.get("/robots.txt");
  expect(robotsResponse.status()).toBe(200);
  const robots = await robotsResponse.text();
  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.status()).toBe(200);
  expect(sitemapResponse.headers()["content-type"]).toContain("xml");
  const sitemap = await sitemapResponse.text();
  if (indexable) {
    expect(robots).toContain("Allow: /");
    expect(robots).toContain(`Sitemap: ${origin}/sitemap.xml`);
    expect(sitemap.match(/<loc>/g)).toHaveLength(searchPaths.length);
    for (const path of searchPaths) expect(sitemap).toContain(`<loc>${origin}${path}</loc>`);
    for (const path of searchPaths) expect(sitemap).toContain(`<lastmod>${searchPages[path].updated}</lastmod>`);
  } else {
    expect(robots).toContain("Disallow: /");
    expect(robots).not.toContain("Sitemap:");
    expect(sitemap).not.toContain("<loc>");
  }
  for (const path of searchPaths) {
    const response = await request.get(searchPages[path].image);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/jpeg");
    const meta = await sharp(await response.body()).metadata();
    expect([meta.width, meta.height]).toEqual([1200, 630]);
  }
});

test("essential copy and answers are server rendered and usable without JavaScript", async ({ browser }, testInfo) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: "reduce", viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  for (const path of searchPaths) {
    await page.goto(new URL(path, testInfo.project.use.baseURL).href);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText(searchPages[path].summary, { exact: true })).toBeVisible();
    const first = page.locator('[data-faq]').first();
    await first.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(first.locator("p")).toHaveText(searchPages[path].faqs[0].answer);
    await expect(first.locator("p")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await context.close();
});

test("page titles and descriptions are distinct for each search intent", () => {
  expect(new Set(searchPaths.map(path => searchPages[path].title)).size).toBe(searchPaths.length);
  expect(new Set(searchPaths.map(path => searchPages[path].description)).size).toBe(searchPaths.length);
});

test("unknown URLs return a real 404 and remain excluded from indexing", async ({ request }) => {
  const response = await request.get("/unavailable-search-check");
  expect(response.status()).toBe(404);
  expect(await response.text()).toMatch(/name="robots" content="noindex"/);
});
