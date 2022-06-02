//Using async await Automate hacker rank from login url to code submission
// Answer code writing and submission all should be automated
//
const Puppeteer = require("puppeteer");
const answerArr = require("./code")
// console.log(answerArr.answer[0])
const loginLink = 'https://www.hackerrank.com/auth/login';
const loginId = "veerktm@gmail.com";
const loginPw = "veerktm@123";
// const loginPw = "veerktm@1234";     //input by wrong pw

// IIFE 
(async function(){
    try {
        let browserInstance = await Puppeteer.launch({
            headless : false,       // to be visible for page
            args : ['--start-maximized'],   // for screen or tab in full size
            defaultViewport : null
        })

        let newTab = await (await browserInstance).newPage()
        await newTab.goto(loginLink)
        await newTab.type("input[id='input-1']", loginId, {delay : 50})
        await newTab.type("input[type='password']", loginPw, {delay : 50})
        await newTab.click("button[type='submit']")
        await waitAndClick('.topic-card div[data-automation="algorithms"]', newTab)
        await waitAndClick('input[value="warmup"]', newTab)
        let allChallengesPromise = await newTab.$$('a[data-analytics="ChallengeListChallengeName"]')
        console.log("Total qsns " + allChallengesPromise.length)
        questionSolver(newTab, allChallengesPromise[0], answerArr.answer[0] )

    } catch (error) {
        console.log(error)
    }
})()

async function waitAndClick(selector, cPage){
    await cPage.waitForSelector(selector)
    let selectorClicked = cPage.click(selector)
    return selectorClicked
}

async function questionSolver(page, question, answer){
    try {
        await question.click()
        await waitAndClick('.monaco-editor.no-user-select.vs', page)
        await waitAndClick('.pmR.pmL.pmB.hr-monaco-custom-input-wrapper.flex', page)
        await page.waitForSelector('textarea.custominput')
        await page.type('textarea.custominput', answer,  {delay: 10})
        await page.keyboard.down('Control')
        await page.keyboard.press('A', {delay:100})
        await page.keyboard.press('X', {delay:100})
        await page.keyboard.up('Control')
        await waitAndClick('.monaco-editor.no-user-select.vs', page)
        await page.keyboard.down('Control')
        await page.keyboard.press('A', {delay:100})
        await page.keyboard.press('V', {delay:100})
        await page.keyboard.up('Control')
        await page.click('.hr-monaco-submit')
        
    } catch (error) {
        console.log(error)
    }
}