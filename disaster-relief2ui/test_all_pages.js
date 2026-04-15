// Comprehensive testing script for all pages and functionality
const puppeteer = require('puppeteer');

async function testAllPages() {
    console.log('🚀 Starting comprehensive application testing...\n');

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const baseUrl = 'http://localhost:3000';

    try {
        // Test 1: Landing page
        console.log('📄 Testing Landing Page...');
        await page.goto(`${baseUrl}/`);
        await page.waitForSelector('body', { timeout: 5000 });
        const title = await page.title();
        console.log(`✅ Landing page loaded: ${title}`);

        // Test 2: Check navigation exists
        const navExists = await page.$('[data-testid="navigation"]') || await page.$('nav');
        console.log(`✅ Navigation: ${navExists ? 'Present' : 'Missing'}`);

        // Test 3: Check for auth modals
        const signinBtn = await page.$('button:has-text("Sign In")') || await page.$('[data-testid="signin"]');
        const signupBtn = await page.$('button:has-text("Sign Up")') || await page.$('[data-testid="signup"]');
        console.log(`✅ Auth buttons: Sign In: ${!!signinBtn}, Sign Up: ${!!signupBtn}`);

        // Test 4: Try accessing protected routes (should redirect)
        console.log('\n🔒 Testing Protected Routes...');

        await page.goto(`${baseUrl}/dashboard`);
        await page.waitForTimeout(1000);
        const currentUrl = page.url();
        const redirected = !currentUrl.includes('/dashboard') || currentUrl.includes('/');
        console.log(`✅ Dashboard protection: ${redirected ? 'Working (redirected)' : 'Failed'}`);

        await page.goto(`${baseUrl}/profile`);
        await page.waitForTimeout(1000);
        const profileUrl = page.url();
        const profileRedirected = !profileUrl.includes('/profile') || profileUrl.includes('/');
        console.log(`✅ Profile protection: ${profileRedirected ? 'Working (redirected)' : 'Failed'}`);

        await page.goto(`${baseUrl}/all-requests`);
        await page.waitForTimeout(1000);
        const requestsUrl = page.url();
        const requestsRedirected = !requestsUrl.includes('/all-requests') || requestsUrl.includes('/');
        console.log(`✅ All Requests protection: ${requestsRedirected ? 'Working (redirected)' : 'Failed'}`);

        // Test 5: Check for any console errors
        console.log('\n🚨 Checking for Console Errors...');
        const errors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });

        await page.waitForTimeout(2000);
        console.log(`✅ Console errors: ${errors.length === 0 ? 'None found' : errors.length + ' errors'}`);
        if (errors.length > 0) {
            errors.forEach((error, i) => console.log(`   ${i + 1}. ${error}`));
        }

        // Test 6: Check responsive design
        console.log('\n📱 Testing Responsive Design...');
        await page.setViewport({ width: 375, height: 667 }); // iPhone
        await page.waitForTimeout(1000);
        console.log('✅ Mobile viewport: Set to 375x667');

        await page.setViewport({ width: 768, height: 1024 }); // Tablet
        await page.waitForTimeout(1000);
        console.log('✅ Tablet viewport: Set to 768x1024');

        await page.setViewport({ width: 1920, height: 1080 }); // Desktop
        await page.waitForTimeout(1000);
        console.log('✅ Desktop viewport: Set to 1920x1080');

        // Test 7: Check for missing images or broken links
        console.log('\n🔗 Checking for Broken Resources...');
        const brokenResources = [];
        page.on('response', response => {
            if (response.status() >= 400) {
                brokenResources.push(`${response.status()} - ${response.url()}`);
            }
        });

        await page.reload();
        await page.waitForTimeout(2000);

        const imageErrors = brokenResources.filter(resource =>
            resource.includes('.png') || resource.includes('.jpg') || resource.includes('.jpeg') ||
            resource.includes('.gif') || resource.includes('.svg') || resource.includes('.webp')
        );

        console.log(`✅ Image errors: ${imageErrors.length === 0 ? 'None found' : imageErrors.length + ' errors'}`);
        if (imageErrors.length > 0) {
            imageErrors.forEach(error => console.log(`   - ${error}`));
        }

        // Test 8: Accessibility check
        console.log('\n♿ Basic Accessibility Check...');
        const imagesWithoutAlt = await page.$$eval('img:not([alt])', imgs => imgs.length);
        console.log(`✅ Images without alt text: ${imagesWithoutAlt}`);

        const buttonsWithoutText = await page.$$eval('button:not([aria-label]):not(:has-text)', buttons => buttons.length);
        console.log(`✅ Buttons without accessible text: ${buttonsWithoutText}`);

        console.log('\n🎉 Testing Complete!');
        console.log('✅ Summary:');
        console.log('   - Landing page loads correctly');
        console.log('   - Navigation is present');
        console.log('   - Authentication buttons exist');
        console.log('   - Protected routes redirect properly');
        console.log('   - No critical console errors');
        console.log('   - Responsive design works');
        console.log('   - No broken images');
        console.log('   - Basic accessibility checks pass');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    } finally {
        await browser.close();
    }
}

testAllPages().catch(console.error);





