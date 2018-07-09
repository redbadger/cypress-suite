const puppeteer = require('puppeteer');


const opts = {
    executablePath: 'google-chrome-unstable',
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox'],
};

let browser;

export const launch = async () => {
    if (!browser) {
        browser = await puppeteer.launch(opts);
    }

    return browser;
};

export const debug = async () => {
    // 8 minutes is the length of a token session
    global.jasmine.DEFAULT_TIMEOUT_INTERVAL = 480000;

    browser = await puppeteer.launch({
        ...opts,
        headless: false,
        slowMo: 100,
    });

    return browser;
};

export const getBrowser = async () =>
    launch();