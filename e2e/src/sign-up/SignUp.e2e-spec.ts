import { browser, logging } from "protractor";
import { HomePage } from "../home/Home.po";
import { SignInPage } from "../sign-in/SignIn.po";
import { SignUpPage } from "./SignUp.po";

describe('SignUp Page', () => {
  let signUpPage: SignUpPage = null
  let signInPage: SignInPage = null
  let homePage: HomePage = null

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER)
    expect(logs).not.toContain(
      jasmine.objectContaining(
        { level: logging.Level.SEVERE } as logging.Entry)
    )
  })
  beforeEach(async () => {
    signUpPage = new SignUpPage()
    signInPage = new SignInPage()
    homePage = new HomePage()

    await signUpPage.navigateTo()
  })
  it('Should be on signup page', async () => {
    const title = await signUpPage.getTitle()
    expect(title).toEqual(SignUpPage.PAGE_TITLE)
  });
  
  it('Should register a user', async () => {
    const randomPrefix = Math.round(Math.random() * 100000)
    await signUpPage.fillField(`email${randomPrefix}@email.com`, 'email')
    await signUpPage.fillField(`some name ${randomPrefix}`, 'fullName')
    
    const username = `user${randomPrefix}`
    await signUpPage.fillField(username, 'userName')

    const password = '12345678'
    await signUpPage.fillField(password, 'password')
    await signUpPage.register()
    
    let title = await signInPage.getWindowTitle()

    expect(title).toEqual(SignInPage.PAGE_TITLE)

    await signInPage.fillUserNameField(username)
    await signInPage.fillPasswordField(password)

    await signInPage.login()
    title = await homePage.getWindowTitle()

    expect(title).toEqual(HomePage.PAGE_TITLE)
  })
});
