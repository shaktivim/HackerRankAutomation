//Automation for opening pepcoding page through google
const puppeteer = require("puppeteer");
let page;
console.log("Beofre");
let browserOpenpromise = puppeteer.launch({                         
    // launch function returns a promise to open a browser(chromium)
    //This function is used to open browser, default brouser is chromium
    headless: false,
    slowMo : true,
    defaultViewport: null,
    args:["--start-maximized"]
});        
browserOpenpromise
    .then(function(browser){                                         //browser is passed from browserOpenpromise to 'then' callback function
        // console.log("browser opened")
        //currently opened tabs
        const pagesArrpromise = browser.pages();                    // selecting all pages or tabs opened in the browser(browser.pages() also return a promise)
        return pagesArrpromise;
        // this return promise is passed to next then function
        //Note: Its not necessayt to return value from promise then function
    }).then(function(browserPages){                                 // browserPages becomes return statement of previous then function
        page = browserPages[0];                                   //choosing first tab out of pages
        let gotoPromise = page.goto('https://www.google.com/');   // cPages.goto() also returns a promise
        return gotoPromise;
    }).then(function(){
        //waiting for the element to appear on the page
        let elementWaitPromise = page.waitForSelector("input[type='text']", {visible: true});
        return elementWaitPromise;
    })
    .then(function(){
        // console.log("Reached google home page");
        // typing any element on that page -> selector
        let keysWillBeSendPromise = page.type("input[type='text']", "pepconding");
        return keysWillBeSendPromise;
    }).then(function(){
        // page.keyboard is used to typing or pressing any special characters
        let enterWillBePressed = page.keyboard.press("Enter");
        return enterWillBePressed;
    }).then(function(){
        let elementWaitpromise = page.waitForSelector(".LC20lb.MBeuO.DKV0Md", {visible: true});
        return elementWaitpromise;
    }).then(function(){
        //mouse
        let keysWillBeSendPromise = page.click(".LC20lb.MBeuO.DKV0Md");
        return keysWillBeSendPromise;
    })
    .catch(function(err){
        console.log(err);
    })


console.log("After");