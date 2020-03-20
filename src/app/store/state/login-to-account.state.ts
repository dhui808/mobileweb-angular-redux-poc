import { ILoginToAccount } from '../../models/login-to-account.interface';

export interface ILoginToAccountState {
  loginToAccount: ILoginToAccount
}

export const initialLoginToAccountState: ILoginToAccountState = {
  loginToAccount: null
}
