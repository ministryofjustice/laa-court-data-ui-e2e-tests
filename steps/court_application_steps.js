import { CourtApplicationPage } from '../src/Page-objects/court_application.po.js'

export class CourtApplicationSteps {
  constructor(page) {
    this.page = page
    this.courtApplicationPage = new CourtApplicationPage(page)
  }

  async andIClickOnTheFirstAppellantLink() {
    await this.courtApplicationPage.clickFirstAppellant()
  }

  async andIEnterAValidMAAT() {

    const maatId = this.getRandomMaatId();
    await this.courtApplicationPage.enterMaatId(maatId)
    await this.courtApplicationPage.createLinkToCourtData()
  }

  async andIUnlink() {
    await this.courtApplicationPage.selectUnlinkReason('1')
    await this.courtApplicationPage.removeLinkToCourtData()
  }

  // Return 7 digit timestamp to use as MAAT ID
  // Used to generate unique MAAT IDs to avoid conflicts
  getRandomMaatId() {
    return Date.now().toString().slice(-7);
  }
}
