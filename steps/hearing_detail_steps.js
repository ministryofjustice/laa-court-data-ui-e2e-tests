import { expect } from '@playwright/test'
import { HearingDetailPage } from '../pages/hearing_detail_page';

export const ORDERED_HEARING_DATES = [
  '23/10/2019',
  '24/10/2019',
  '26/10/2019',
  '27/10/2019',
  '28/10/2019',
  '29/10/2019',
  '30/10/2019',
  '31/10/2019',
]

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
    await this.hearingDetailPage.expectTitle(ORDERED_HEARING_DATES[0])
  }

  async thenIShouldSeeTheDetailsPageForTheSecondHearing() {
    await this.hearingDetailPage.expectTitle(ORDERED_HEARING_DATES[1])
  }

  async thenIShouldSeeTheDetailsPageForTheSecondLastHearing() {
    await this.hearingDetailPage.expectTitle(ORDERED_HEARING_DATES[6])
  }
}
