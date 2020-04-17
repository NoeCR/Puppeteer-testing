const puppeteer = require('puppeteer')
const expect = require('chai').expect
const { click, getText, getCount, shouldNotExist } = require('../lib/helper')

describe('Extend Puppeteer With Custom Commands', () => {
	let browser
	let page
	before(async function () {})
	after(async function () {})
	beforeEach(async function () {
		browser = await puppeteer.launch({
			headless: false,
			devtools: false,
      args: ['--no-sandbox', '--window-size=1920,1080'],
      defaultViewport: null,
			slowMo: 10,
		})
		page = await browser.newPage()

		await page.setDefaultTimeout(20000)
		await page.setDefaultNavigationTimeout(40000)
	})
	afterEach(async function () {
		await browser.close()
	})

	it('click', async function () {
    await page.goto('http://zero.webappsecurity.com/index.html')

    await click(page, '#signin_button')
  })

  it('getText', async function () {
    await page.goto('http://example.com/')

    await getText(page, 'h1')
  })

  it('getCount', async function () {
    await page.goto('http://example.com/')

    expect(await getCount(page, 'p')).to.equal(2);
	})

	it('shouldNotExist', async function () {
    await page.goto('http://zero.webappsecurity.com/index.html')

		await click(page, '#signin_button')

    await shouldNotExist(page, '#signin_button')
  })
})
