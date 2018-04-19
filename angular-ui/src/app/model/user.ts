export class User {

  id: number;
  username: string;
  email: string;

  constructor(json: any) {
    Object.assign(this, json);
  }

}
