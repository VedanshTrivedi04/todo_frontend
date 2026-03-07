const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER_LOG:', msg.text()));
    page.on('pageerror', error => console.error('BROWSER_ERROR:', error));

    await page.goto('http://localhost:5173');
    
    // Wait for login or dashboard
    try {
        await page.waitForSelector('input[placeholder="Enter your username"]', { timeout: 5000 });
        
        // Fill credentials
        await page.type('input[placeholder="Enter your username"]', 'testuser');
        await page.type('input[placeholder="••••••••"]', 'testpass123');
        
        // Click login
        await page.click('button[type="submit"]');
        
        // Wait a bit for potential JS errors after login click
        await new Promise(r => setTimeout(r, 3000));
        
        console.log("Finished waiting after login click.");
    } catch (e) {
        console.log("Already logged in or login form not found:", e.message);
    }
    
    await browser.close();
})();
