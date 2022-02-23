import { browser, by, element } from "protractor"

export class SignUpPage {
  static PAGE_TITLE = 'Sign up'

  navigateTo(){
    return browser.get(`${browser.baseUrl}#/home/signup`)
  }

  getTitle(){
    return browser.getTitle()
  }

  fillField(text: string, formcontrolname: string) {
    return element(by.css(`input[formcontrolname=${formcontrolname}]`)).sendKeys(text)
  }

  register(){
    return element(by.css('button[type=submit]')).click()
  }
}