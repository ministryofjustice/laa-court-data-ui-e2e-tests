import { expect } from '@playwright/test'
import orderedHearingDates from '../data/ordered_hearing_dates'
import { HearingDetailPage } from '../src/Page-objects/hearing_detail.po.js'

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
    await expect(this.page).toHaveTitle(new RegExp(`Hearing day ${orderedHearingDates[0]}`))
  }

  async thenIShouldSeeTheDetailsPageForTheSecondHearing() {
    await expect(this.page).toHaveTitle(new RegExp(`Hearing day ${orderedHearingDates[1]}`))
  }

  async thenIShouldSeeTheDetailsPageForTheSecondLastHearing() {
    await expect(this.page).toHaveTitle(new RegExp(`Hearing day ${orderedHearingDates.at(-2)}`))
  }
}
