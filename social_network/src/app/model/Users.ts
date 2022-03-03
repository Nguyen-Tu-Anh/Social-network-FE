export class Users {
  private _id: number;
  private _name: string;
  private _username: string;
  private _email: string;
  // @ts-ignore
  private _avatar: string;
  private _roles: any;
  constructor(id: number, name: string, username: string, email: string, avatar: string, roles: any) {
    this._id = id;
    this._name = name;
    this._username = username;
    this._email = email;
    this._roles = roles;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get avatar(): string {
    return this._avatar;
  }

  set avatar(value: string) {
    this._avatar = value;
  }

  get roles(): any {
    return this._roles;
  }

  set roles(value: any) {
    this._roles = value;
  }
}
