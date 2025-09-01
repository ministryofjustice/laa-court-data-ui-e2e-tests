import { expect } from '@playwright/test'
import { CaseSummaryPage } from "../pages/case_summary_page";
import { URN, DEFENDANT_NAME } from '../config.js'

const MAAT_ID = '6079985'
const ORDERED_HEARING_DATES = [
  '23/10/2019',
  '24/10/2019',
  '26/10/2019',
  '27/10/2019',
  '28/10/2019',
  '29/10/2019',
  '30/10/2019',
  '31/10/2019',
]

export class CaseDetailSteps {
  constructor(page) {
    this.page = page
    this.caseSummaryPage = new CaseSummaryPage(page)
  }

  async whenIVisitTheSummaryPageOfACase() {
    await this.caseSummaryPage.goto(URN)
  }

  async whenIVisitTheSummaryPageOfAnUnlinkedCase() {
    await this.whenIVisitTheSummaryPageOfACase()
    await expect(this.page.locator('body')).toContainText('Not linked')
  }

  async whenIVisitTheSummaryPageOfAnLinkedCase() {
    await this.whenIVisitTheSummaryPageOfACase()
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
    await this.page.locator('summary:has-text("Remove link to court data")') // Expand the summary section
              .click();

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

  async andIClickOnAHearingDate() {
    await this.caseSummaryPage.clickOnHearing('23/10/2019')
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
    await expect(cellList).toContainText(ORDERED_HEARING_DATES);
  }

  async thenHearingsShouldBeSortedByDateDescending() {
    const cellList = await this.page.locator('td');
    await expect(cellList).toContainText(ORDERED_HEARING_DATES.reverse())
  }

  async thenHearingsShouldBeSortedByHearingTypeDescending() {
    const cellList = await this.page.locator('td');
    await expect(cellList).toContainText(['Trial (TRL)', 'Pre-Trial Review (PTR)', 'Plea and Trial Preparation (PTP)']);
  }

  async thenIShouldSeeTheHearingDetailsPageForThatDate() {
    await expect(this.page).toHaveTitle(/^Hearing day 23\/10\/2019/)
  }
}
