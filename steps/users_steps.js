import { UsersPage } from "../pages/users_page";

export class UsersSteps {
  constructor(page) {
    this.usersPage = new UsersPage(page)
  }

  async whenIVisitTheUsersPage() {
    await this.usersPage.goto()
  }
  async andIAddANewUser() {
    await this.usersPage.addNewCaseworker('Jane', 'Doe', 'jdoe', 'jane@example.com');
  }

  async andIChangeAUsersEmailAddress() {
    await this.usersPage.changeEmail('Jane Doe', 'jane-other@example-other.com');
  }

  async andIDeleteAUser() {
    await this.usersPage.deleteUser('Jane Doe');
  }
}
