import { browser, logging } from 'protractor'
import { PhotoDetailPage } from '../photo-detail/PhotoDetail.po'
import { HomePage } from './Home.po'

describe('Home page', () => {
  let homePage: HomePage
  let photoDetail: PhotoDetailPage


  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER)
    expect(logs).not.toContain(
      jasmine.objectContaining(
        { level: logging.Level.SEVERE } as logging.Entry)
    )
  })

  beforeEach(async () => {
    homePage = new HomePage()
    await homePage.navigateTo()
  })

  it('Should navigate to user profile', async () => {
    const title = await homePage.getWindowTitle()

    expect(title).toEqual(HomePage.PAGE_TITLE)
  })

  it('Should display a list of photos', async () => {
    const photoListSize = await homePage.getPhotoListSize()

    expect(photoListSize).toBeGreaterThan(0)
  })

  it('Should navigate to photo detail when photo navigation is triggered', async () => {
    photoDetail = new PhotoDetailPage()
    await homePage.clickOnFirstItemFrontPhotoList()
    const title = await photoDetail.getWindowTitle()

    expect(title).toBe(PhotoDetailPage.PAGE_TITLE)
  })

  it('Should list one item when filtering by word "farol"', async () => {
    await homePage.fillSearchInputWith('farol')
    const photoListSize = await homePage.getPhotoListSize()

    expect(photoListSize).toBe(1)
  })
})