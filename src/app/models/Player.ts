export class Player {
  id: string;
  title: string;
  email: string;
  manager: boolean;

  constructor(title: string, email: string, manager: boolean) {
    this.title = title;
    this.email = email;
    this.manager = manager;
  }
}
