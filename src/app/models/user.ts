import { Country } from './country';
export class User {
  _id: number;
  username: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  country: Country;

  constructor() {}
}
