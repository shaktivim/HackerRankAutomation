// Using promises Automate hacker rank from login url to code submission
// Answer code writing and submission all should be automated
//
const Puppeteer = require("puppeteer");
const answerArr = require("./answerCode")
// console.log(answerArr.answer[0])
const loginLink = 'https://www.hackerrank.com/auth/login';
const loginId = "veerktm@gmail.com";
const loginPw = "veerktm@123";

let browserOpen = Puppeteer.launch({
    headless : false,       // to be visible for page
    args : ['--start-maximized'],   // for screen or tab in full size
    defaultViewport : null
})

let page;

browserOpen.then(function(browserObj){
    let browserOpenPromise = browserObj.newPage();      // opens new tab in the chromium
    return browserOpenPromise;
}).then(function(newTab){
    page = newTab;
    let hackerRankOpenPromise = newTab.goto(loginLink);
    return hackerRankOpenPromise;
}).then(function(){
    let emailIsEntered = page.type("input[id='input-1']", loginId, {delay : 50})
    return emailIsEntered;
    // console.log("hacker rank is opened")
}).then(function(){
    let passwordIsEntered = page.type("input[type='password']", loginPw, {delay : 50})
    return passwordIsEntered;
}).then(function(){
    let loginIsPressed = page.click("button[type='submit']");
    // In above selector, you can also use "button[data-analytics='password']" for selecting login button
    return loginIsPressed;
}).then(function(){
    let clickOnAlgoPromise = waitAndClick('.topic-card div[data-automation="algorithms"]', page);
    return clickOnAlgoPromise;
}).then(function(){
    let getToWarmUP = waitAndClick('input[value="warmup"]', page);
    return getToWarmUP;
}).then(function(){
    let waitForThreeSeconds = page.waitFor(3000);       // this wait for function waits on the page for 3000 milliseconds
    return waitForThreeSeconds;
}).then(function(){
    let allChallengesPromise = page.$$('a[data-analytics="ChallengeListChallengeName"]');    //$$ stand for documents.query selector   (not jQuery)
    return allChallengesPromise;
}).then(function(questionsArr){
    console.log(questionsArr.length);
    let questionWillBeSolved = questionSolver(page, questionsArr[0], answerArr.answer[0]);
    return questionWillBeSolved;
})

function waitAndClick(selector, cPage){
    return new Promise(function(resolve, reject){
        let waitForModelPromise = cPage.waitForSelector(selector);
        waitForModelPromise.then(function(){
            let clickModal = cPage.click(selector);
            return clickModal;
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject();
        })
    })
}

// solving for only first question right now, can loop with other later too
function questionSolver(page, question, answer){
    return new Promise(function(resolve, reject){
        let questionWillbeClicked = question.click();
        questionWillbeClicked.then(function(){
            let EditorInFocusPromise  = waitAndClick('.monaco-editor.no-user-select.vs', page)
            return EditorInFocusPromise;
        }).then(function(){
            return waitAndClick('.pmR.pmL.pmB.hr-monaco-custom-input-wrapper.flex', page)
        }).then(function(){
            return page.waitForSelector('textarea.custominput ', page)
        }).then(function(){
            return page.type('textarea.custominput ', answer, {delay: 10})
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then(function(){
            let AisPressed = page.keyboard.press('A', {delay:100});
            return AisPressed;
        }).then(function(){
            let XisPressed = page.keyboard.press('X', {delay:100});
            return XisPressed;
        }).then(function(){
            let ctrlIsUnpressed = page.keyboard.up('Control');
            return ctrlIsUnpressed;
        }).then(function(){
            let mainEditorInFocusPromise  = waitAndClick('.monaco-editor.no-user-select.vs', page)
            return mainEditorInFocusPromise;
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then(function(){
            let AisPressed = page.keyboard.press('A', {delay:100});
            return AisPressed;
        }).then(function(){
            let VisPressed = page.keyboard.press('V', {delay:100});
            return VisPressed;
        }).then(function(){
            let ctrlIsUnpressed = page.keyboard.up('Control');
            return ctrlIsUnpressed;
        }).then(function(){
            let submitIsClicked = page.click('.hr-monaco-submit');
            return submitIsClicked;
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject();
        })
        
    })
}