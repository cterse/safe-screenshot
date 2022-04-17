#!/usr/bin/env node
const puppeteer = require('puppeteer');
const fs = require('fs');

const [, , ...args] = process.argv;

(async () => {
  let page = null;
  let browser = null;

  try {
    const url = args[0];
    const filename = `${args[1]}.png`;
    browser = await puppeteer.launch({
      executablePath:'/usr/bin/chromium-browser',args: ['--no-sandbox']
    });
    page = await browser.newPage();
    await page.goto(url, {
      waitUntil: 'networkidle0'
    });
    await page.screenshot({
      path: filename,
      fullPage: true
    });

    // await page.close();
    // await browser.close();
  
  } catch (error) {
   
    console.log(error);
  
  } finally {
    await page.close();
    await browser.close();
  }
  
})();
