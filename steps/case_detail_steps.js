import { expect } from '@playwright/test'
import { CaseSummaryPage } from "../pages/case_summary_page";
import { URN, DEFENDANT_NAME } from '../config.js'

const MAAT_ID = '6079985'

export class CaseDetailSteps {
  constructor(page) {
    this.page = page
    this.caseSummaryPage = new CaseSummaryPage(page)
  }

  async whenIVisitTheSummaryPageOfAnUnlinkedCase() {
    await this.caseSummaryPage.goto(URN)
    await expect(this.page.locator('body')).toContainText('Not linked')
  }

  async whenIVisitTheSummaryPageOfAnLinkedCase() {
    await this.caseSummaryPage.goto(URN)
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
    await this.page.getByRole('link', { name: DEFENDANT_NAME })
              .click();

    await this.page.locator('summary:has-text("Remove link to court data")') // Expand the summary section
              .click();

    await this.page.getByLabel('Reason for unlinking')
              .selectOption('1')

    await this.page.getByRole('button', { name: 'Remove link to court data' })
              .click();
  }

  async thenICanClickThroughToTheDefendantDetailsScreen() {
    await this.andIClickThroughToTheDefendantDetailsScreen();
    await expect(this.page).toHaveTitle(/^Defendant details/)
  }

  async andIShouldSeeTheMAAT() {
     await expect(this.page.locator('body')).toContainText(MAAT_ID)
  }
}
