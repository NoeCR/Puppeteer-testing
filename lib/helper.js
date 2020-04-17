module.exports = {
  click: async function(page, selector) {
    try {
      await page.waitForSelector(selector)
      await page.click(selector)
    } catch (ex) {
      throw new Error(`Could not click on selector: ${selector}`)
    }
  },
  getText: async function(page, selector) {
    try {
      await page.waitForSelector(selector)
      return await page.$eval(selector, el => el.innerHTML)
    } catch (ex) {
      throw new Error(`Cannot get text from selector: ${selector}`)
    }
  },
  getCount: async function(page, selector) {
    try {
      await page.waitForSelector(selector)
      return await page.$$eval(selector, el => el.length)
    } catch (ex) {
      throw new Error(`Cannot get count of selector: ${selector}`)
    }
  },
  typeText: async function(page, selector, text) {
    try {
      await page.waitForSelector(selector)
      await page.type(selector, text)
    } catch (ex) {
      throw new Error(`Could not type '${text}', into selector: ${selector}`)
    }
  },
  waitForText: async function(page, selector, text) {
    try {
      await page.waitForSelector(selector)
      await page.waitForFunction((selector, text) => {
        document.querySelector(selector).innerText.includes(text),
        {},
        selector,
        text
      })
    } catch (ex) {
      throw new Error(`Text: ${text}, not found for selector: ${selector}`)
    }
  },
  shouldNotExist: async function(page, selector) {
    try {
      await page.waitForSelector(selector, { hidden: true })
    } catch (ex) {
      throw new Error(`Selector: ${selector} is visible, but should not be`)
    }
  }
}
