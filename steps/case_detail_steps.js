import { expect } from '@playwright/test'
import { CaseSummaryPage } from "../pages/case_summary_page";
import { URN, DEFENDANT_NAME } from '../config.js'
import orderedHearingDates from '../data/ordered_hearing_dates'

const MAAT_ID = '6079985'

export class CaseDetailSteps {
  constructor(page) {
    this.page = page
    this.caseSummaryPage = new CaseSummaryPage(page)
  }

  async whenIVisitTheSummaryPageOfACase(urn) {
    await this.caseSummaryPage.goto(urn)
  }

  async whenIVisitTheSummaryPageOfANonexistentCase() {
    await this.caseSummaryPage.goto("NOT_A_REAL_CASE")
  }

  async whenIVisitTheSummaryPageOfAnUnlinkedCase() {
    await this.whenIVisitTheSummaryPageOfACase(URN)
    await expect(this.page.locator('body')).toContainText('Not linked')
  }

  async whenIVisitTheSummaryPageOfAnLinkedCase() {
    await this.whenIVisitTheSummaryPageOfACase(URN)
    await expect(this.page.locator('body')).toContainText(MAAT_ID)
  }

  async andIClickThroughToTheDefendantDetailsScreen() {
    await this.page.getByRole('link', { name: DEFENDANT_NAME }).click();
  }

  async andIEnterAnInvalidMAAT() {
    await this.page.getByLabel('MAAT ID')
                    .fill('123456')

    await this.page.getByRole('button', { name: 'Create link to court data' })
              .click();
  }

  async andIEnterAValidMAAT() {
    await this.page.getByLabel('MAAT ID')
                    .fill(MAAT_ID)

    await this.page.getByRole('button', { name: 'Create link to court data' })
              .click();
  }

  async andIUnlinkTheDefendant() {
    await this.page.getByLabel('Reason for unlinking')
              .selectOption('1')

    await this.page.getByRole('button', { name: 'Remove link to court data' })
              .click();
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
     await expect(this.page.locator('body')).toContainText(MAAT_ID)
  }

  async thenHearingsShouldBeSortedByDateAscending() {
    const cellList = await this.page.locator('td');
    await expect(cellList).toContainText(orderedHearingDates);
  }

  async thenHearingsShouldBeSortedByDateDescending() {
    const cellList = await this.page.locator('td');
    await expect(cellList).toContainText(orderedHearingDates.reverse())
  }

  async thenHearingsShouldBeSortedByHearingTypeDescending() {
    const cellList = await this.page.locator('td');
    await expect(cellList).toContainText(['Trial (TRL)', 'Pre-Trial Review (PTR)', 'Plea and Trial Preparation (PTP)']);
  }

  async thenIShouldSeeTheHearingDetailsPageForThatDate() {
    await expect(this.page).toHaveTitle(/^Hearing day 23\/10\/2019/)
  }

  async andIClickOnRelatedCourtApplications() {
    await this.page.getByRole('link', { name: 'Related court applications' }).click();
    await expect(this.page).toHaveTitle(/^Case\s.+/)
  }
}
