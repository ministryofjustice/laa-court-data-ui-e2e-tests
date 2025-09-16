import orderedHearingDates from '../data/ordered_hearing_dates'
import { HearingDetailPage } from '../pages/hearing_detail_page'

export class HearingDetailSteps {
  constructor(page) {
    this.page = page
    this.hearingDetailPage = new HearingDetailPage(page)
  }

  async andIClickNext() {
    await this.hearingDetailPage.clickNext()
  }

  async andIClickPrevious() {
    await this.hearingDetailPage.clickPrevious()
  }

  async thenIShouldSeeTheDetailsPageForTheFirstHearing() {
    await this.hearingDetailPage.expectTitle(orderedHearingDates[0])
  }

  async thenIShouldSeeTheDetailsPageForTheSecondHearing() {
    await this.hearingDetailPage.expectTitle(orderedHearingDates[1])
  }

  async thenIShouldSeeTheDetailsPageForTheSecondLastHearing() {
    await this.hearingDetailPage.expectTitle(orderedHearingDates.at(-2))
  }
}
