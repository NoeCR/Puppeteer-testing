const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('Advanced Test', () => {
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

	it('Login Process - Invalid Credentials', async function () {
    await page.goto('http://zero.webappsecurity.com/index.html')
    // Wait and click Sign In button
    await page.waitForSelector('#signin_button')
    await page.click('#signin_button')
    // Wait for load form
    await page.waitForSelector('#login_form')
    // Type fields
    await page.type('#user_login', 'invalid user')
    await page.type('#user_password', 'invalid password')
    // Click in checkbox
    await page.click('#user_remember_me')
    // Click Sign In button
    await page.click('input[type="submit"]')
    // Wait for display error
    await page.waitForSelector('.alert-error')
  })

  it('Login Process - Valid Credentials', async function () {
    await page.goto('http://zero.webappsecurity.com/index.html')
    // Wait and click Sign In button
    await page.waitForSelector('#signin_button')
    await page.click('#signin_button')
    // Wait for load form
    await page.waitForSelector('#login_form')
    // Type fields
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'password')
    // Click in checkbox
    await page.click('#user_remember_me')
    // Click Sign In button
    await page.click('input[type="submit"]')
    // Wait for change page
    await page.waitForSelector('#settingsBox')
  })

  it('Display Feedback Form', async function () {
    await page.goto('http://zero.webappsecurity.com/index.html')
    // Wait and click Feedback menu
    await page.waitForSelector('#feedback')
    await page.click('#feedback')
    // Wait and fill in the form fields
    await page.waitForSelector('form')
    await page.type('#name', 'John')
    await page.type('#email', 'John@yopmail.com')
    await page.type('#subject', 'John Doe')
    await page.type('#comment', 'Just a message into the textarea')

    // Submit Feedback Form
    await page.click('input[type=submit]')

    // Display Results Page
    await page.waitForSelector('#feedback-title')
    const url = await page.url();
    expect(url).to.include('/sendFeedback.html')
  })

  it('Payment And Set Date Picker', async function () {
    await page.goto('http://zero.webappsecurity.com/index.html')
    // Wait and click Sign In button
    await page.waitForSelector('#signin_button')
    await page.click('#signin_button')
    // Wait for load form
    await page.waitForSelector('#login_form')
    // Type fields
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'password')
    // Click in checkbox
    await page.click('#user_remember_me')
    // Click Sign In button
    await page.click('input[type="submit"]')
    // Wait for change page
    await page.waitForSelector('#settingsBox')
    // Wait and click Pay Bills
    await page.waitForSelector('.nav-tabs')
    await page.click('#pay_bills_tab')
    // Check if form is loaded
    await page.waitForSelector('.board')

    // Make Payment
    await page.select('#sp_payee', 'Apple')
    await page.select('#sp_account', 'Credit Card')
    // Set amount
    await page.type('#sp_amount', '500')
    // Set date
    await page.type('#sp_date', '2020-03-18')
    await page.keyboard.press('Enter')
    // Set description
    await page.type('#sp_description', 'Payment for buy apples')
    // Submit form
    await page.click('input[type=submit]')
    // Verify for has been submitted and changed page
    await page.waitForSelector('#alert_content')
  })

  it('Currency Exchange', async function () {
    await page.goto('http://zero.webappsecurity.com/index.html')
    // Wait and click Sign In button
    await page.waitForSelector('#signin_button')
    await page.click('#signin_button')
    // Wait for load form
    await page.waitForSelector('#login_form')
    // Type fields
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'password')
    // Click in checkbox
    await page.click('#user_remember_me')
    // Click Sign In button
    await page.click('input[type="submit"]')
    // Wait for change page
    await page.waitForSelector('#settingsBox')

    // Display Currency Exchange
    // Wait and click Pay Bills
    await page.waitForSelector('.nav-tabs')
    await page.click('#pay_bills_tab')
    // Check if form is loaded
    await page.waitForSelector('#tabs > ul > li:nth-child(3) > a')
    await page.click('#tabs > ul > li:nth-child(3) > a')

    // Exchange Currency
    await page.waitForSelector('#pc_currency')
    await page.select('#pc_currency', 'GBP')
    await page.type('#pc_amount', '800')
    await page.click('#pc_inDollars_true')
    // Submit
    await page.click('#purchase_cash')
    // Wait response
    await page.waitForSelector('#alert_content')
  })
})
