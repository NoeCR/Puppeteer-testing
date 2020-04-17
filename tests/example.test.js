const puppeteer = require('puppeteer')
const expect = require('chai').expect;


describe('My First Puppeteer Test', () => {
	it('should launch the browser', async function () {
		const browser = await puppeteer.launch({
			headless: false,
			devtools: true,
			args: ['--no-sandbox'],
			slowMo: 10,
		})
		const page = await browser.newPage()

    await page.goto('http://example.com/')
    await page.waitFor(3000)
    await page.waitForSelector('h1')
    await page.reload()
    await page.waitFor(3000)
    await page.waitForSelector('h1')
		await browser.close()
  })

  it('should launch the browser and navigate forward and back', async function () {
		const browser = await puppeteer.launch({
			headless: false,
			devtools: true,
			args: ['--no-sandbox'],
			slowMo: 10,
		})
		const page = await browser.newPage()

    await page.goto('http://example.com/')
    await page.waitForSelector('h1')
    await page.goto('https://dev.to/')
    await page.waitForSelector('#top-bar')
    await page.goBack()
    await page.waitForSelector('h1')
    await page.goForward()
    await page.waitForSelector('#top-bar')
		await browser.close()
  })

  it('should launch and interact with inputs type text and checkbox', async function () {
    // launch browser
		const browser = await puppeteer.launch({
			headless: false,
			devtools: true,
			args: ['--no-sandbox', '--window-size=1920,1080'],
      slowMo: 10,
      defaultViewport: null
		})
		const page = await browser.newPage()
    // go to web page
    await page.goto('https://devexpress.github.io/testcafe/example/')
    // interacts with the inputs
    await page.type('#developer-name', 'John', { delay: 200 })
    await page.waitFor(2000)
    await page.click('#tried-test-cafe', { clickCount: 1 })
    await page.waitFor(2000)

    // Close browser
		await browser.close()
  })

  it('should launch and interact with inputs select and textArea, and submit form', async function () {
    // launch browser
		const browser = await puppeteer.launch({
			headless: false,
			devtools: true,
			args: ['--no-sandbox', '--window-size=1920,1080'],
      slowMo: 10,
      defaultViewport: null
		})
		const page = await browser.newPage()
    // go to web page
    await page.goto('https://devexpress.github.io/testcafe/example/')
    // interacts with the inputs
    await page.type('#developer-name', 'John', { delay: 200 })
    await page.waitFor(2000)
    await page.click('#tried-test-cafe', { clickCount: 1 })
    await page.waitFor(2000)
    await page.select('#preferred-interface', 'JavaScript API')
    await page.waitFor(2000)
    const message = 'Let fill that message with some text';
    await page.type('#comments', message)
    await page.waitFor(2000)
    await page.click('#submit-button')
    // wait result page is loaded
    await page.waitForSelector('.result-content')
    await page.waitFor(2000)
    // Close browser
		await browser.close()
  })

  it('should get title and URL of web page', async function () {
    // launch browser
		const browser = await puppeteer.launch({
			headless: false,
			devtools: true,
			args: ['--no-sandbox', '--window-size=1920,1080'],
      slowMo: 10,
      defaultViewport: null
		})
		const page = await browser.newPage()
    await page.goto('http://example.com/')
    // get information
    const title = await page.title();
    const url = await page.url();

    expect(title).to.be.a('string', 'Example Domain')
    expect(url).to.include('example.com')
    // Close browser
		await browser.close()
  })

  it('should get element text and count of <p> tags', async function () {
    // launch browser
		const browser = await puppeteer.launch({
			headless: false,
			devtools: true,
			args: ['--no-sandbox', '--window-size=1920,1080'],
      slowMo: 10,
      defaultViewport: null
		})
		const page = await browser.newPage()
    await page.goto('http://example.com/')
    // get information
    const text = await page.$eval('h1', el => el.textContent)
    const count = await page.$$eval('p', el => el.length)
    expect(text).to.be.a('string', 'Example Domain')
    expect(count).to.equal(2)
    // Close browser
		await browser.close()
  })

  it('should be establish timeout', async function () {
    // launch browser
		const browser = await puppeteer.launch({
			headless: false,
			devtools: true,
			args: ['--no-sandbox', '--window-size=1920,1080'],
      slowMo: 10,
      defaultViewport: null
		})
    const page = await browser.newPage()
    // Set the maximum time for each type of step
    // 1 sec for methods and related shortcuts
    await page.setDefaultTimeout(10000)
    // 2 sec for navigation methods
    await page.setDefaultNavigationTimeout(20000)

    await page.goto('http://example.com/')
    await page.waitForSelector('h1')
    await page.goto('https://dev.to/')
    await page.waitForSelector('#top-bar')
    await page.goBack()
    await page.waitForSelector('h1')
    await page.goForward()
    await page.waitForSelector('#top-bar')
		await browser.close()

    // Close browser
		await browser.close()
  })

  it('should be simulate keyboard press', async function () {
    // launch browser
		const browser = await puppeteer.launch({
			headless: false,
			devtools: true,
			args: ['--no-sandbox', '--window-size=1920,1080'],
      slowMo: 10,
      defaultViewport: null
		})
    const page = await browser.newPage()

    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.waitForSelector('#searchTerm')
    await page.type('#searchTerm', 'Hello world')
    await page.keyboard.press('Enter', { delay: 10 })
    await page.waitFor(5000)
    // Close browser
		await browser.close()
  })

  it('should be wait for XPath', async function () {
    // launch browser
		const browser = await puppeteer.launch({
			headless: true,
			devtools: true,
			args: ['--no-sandbox', '--window-size=1920,1080'],
      slowMo: 10,
      defaultViewport: null
		})
    const page = await browser.newPage()

    await page.goto('http://example.com/')
    await page.waitForXPath('//h1')

    // Close browser
		await browser.close()
  })

  it('element not exists', async function () {
    // launch browser
		const browser = await puppeteer.launch({
			headless: false,
			devtools: true,
			args: ['--no-sandbox', '--window-size=1920,1080'],
      slowMo: 10,
      defaultViewport: null
		})
    const page = await browser.newPage()

    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.waitForSelector('#signin_button')
    await page.click('#signin_button')
    // First way to check that the button does not exist
    await page.waitFor(() => !document.querySelector('#signin_button'))
    // Second
    await page.waitForSelector('#signin_button', { hidden: true, timeout: 3000 })
    // Close browser
		await browser.close()
	})
})
