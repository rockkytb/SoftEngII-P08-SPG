import puppeteer from "puppeteer";

describe("App.js", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("contains the home page text", async () => {
    await page.goto("http://localhost:3000/home");
    await page.waitForSelector("#title");
    const text = await page.$eval("#title", (e) => e.textContent);
    expect(text).toContain("Le_Cose SPG s.p.a.");
  }, 10000);

  it("contains the clock", async () => {
    await page.goto("http://localhost:3000/home");
    await page.waitForSelector("#virtual-label");
    const text = await page.$eval("#virtual-label", (e) => e.textContent);
    expect(text).toContain("Virtual");
  }, 10000);

  afterAll(() => browser.close());
});