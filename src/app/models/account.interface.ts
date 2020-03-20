export interface IBalance {
    amount: string
    currency: string
    description: string
}

export interface IDetailsParams {
    accountKey: string
}

export interface IDetails {
    action: string
    service: string
    params: IDetailsParams
}

export interface IOptionParams {
    amount: string
    to: string
    from: string
    date: string
    currency: string
}

export interface IOption {
    action: string
    service: string
    params: IOptionParams
}

export interface IActions {
    details: IDetails
    options: IOption[]
}

export interface IAccount {
    actions: IActions
    accountKey: string
    category: string
    description: string
    maskedAccount: string
    classification: string
    hideInSummary: boolean
    balance: IBalance[]
}

export interface IResponse {
    accounts: IAccount[]
}
