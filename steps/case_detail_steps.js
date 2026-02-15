import { expect } from '@playwright/test'
import { CaseSummaryPage } from '../src/Page-objects/case_summary.po.js'
import { CaseDetailPage } from '../src/Page-objects/case_detail.po.js'
import { GenericPage } from '../src/Page-objects/generic.po.js'
import { URN, DEFENDANT_NAME } from '../config.js'
import orderedHearingDates from '../data/ordered_hearing_dates'

const MAAT_ID = '6079985'

export class CaseDetailSteps {
  constructor(page) {
    this.page = page
    this.caseSummaryPage = new CaseSummaryPage(page)
    this.caseDetailPage = new CaseDetailPage(page)
    this.genericPage = new GenericPage(page)
  }

  async whenIVisitTheSummaryPageOfACase(urn) {
    await this.caseSummaryPage.goto(urn)
  }

  async whenIVisitTheSummaryPageOfANonexistentCase() {
    await this.caseSummaryPage.goto("NOT_A_REAL_CASE")
  }

  async whenIVisitTheSummaryPageOfAnUnlinkedCase() {
    await this.whenIVisitTheSummaryPageOfACase(URN)
    await expect(this.genericPage.body()).toContainText('Not linked')
  }

  async whenIVisitTheSummaryPageOfAnLinkedCase() {
    await this.whenIVisitTheSummaryPageOfACase(URN)
    await expect(this.genericPage.body()).toContainText(MAAT_ID)
  }

  async andIClickThroughToTheDefendantDetailsScreen() {
    await this.caseDetailPage.clickDefendant(DEFENDANT_NAME)
  }

  async andIEnterAnInvalidMAAT() {
    await this.caseDetailPage.enterMaatId('123456')
    await this.caseDetailPage.createLinkToCourtData()
  }

  async andIEnterAValidMAAT() {
    await this.caseDetailPage.enterMaatId(MAAT_ID)
    await this.caseDetailPage.createLinkToCourtData()
  }

  async andIUnlinkTheDefendant() {
    await this.caseDetailPage.selectUnlinkReason('1')
    await this.caseDetailPage.removeLinkToCourtData()
  }

  async andISortByDate() {
    await this.caseSummaryPage.sortByDate()
  }

  async andISortByHearingType() {
    await this.caseSummaryPage.sortByHearingType()
  }

  async andIClickOnTheFirstHearingDate() {
    await this.caseSummaryPage.clickOnHearing(orderedHearingDates[0])
  }

  async andIClickOnTheLastHearingDate() {
    await this.caseSummaryPage.clickOnHearing(orderedHearingDates.at(-1))
  }

  async thenICanClickThroughToTheDefendantDetailsScreen() {
    await this.andIClickThroughToTheDefendantDetailsScreen();
    await expect(this.page).toHaveTitle(/^Defendant details/)
  }

  async andIShouldSeeTheMAAT() {
      await expect(this.genericPage.body()).toContainText(MAAT_ID)
  }

  async thenHearingsShouldBeSortedByDateAscending() {
    const cellList = this.caseDetailPage.tableCells()
    await expect(cellList).toContainText(orderedHearingDates);
  }

  async thenHearingsShouldBeSortedByDateDescending() {
    const cellList = this.caseDetailPage.tableCells()
    await expect(cellList).toContainText(orderedHearingDates.reverse())
  }

  async thenHearingsShouldBeSortedByHearingTypeDescending() {
    const cellList = this.caseDetailPage.tableCells()
    await expect(cellList).toContainText(['Trial (TRL)', 'Pre-Trial Review (PTR)', 'Plea and Trial Preparation (PTP)']);
  }

  async thenIShouldSeeTheHearingDetailsPageForThatDate() {
    await expect(this.page).toHaveTitle(/^Hearing day 23\/10\/2019/)
  }

  async andIClickOnRelatedCourtApplications() {
    await this.caseDetailPage.clickRelatedCourtApplications()
    await expect(this.page).toHaveTitle(/^Case\s.+/)
  }

  async andIVisitRelatedCourtApplications(urn) {
    await this.caseSummaryPage.gotoRelatedCourtApplications(urn)
  }
}
