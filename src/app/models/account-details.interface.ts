export interface IBalance {
    amount: string
    currency: string
    description: string
}

export interface IDetail {
    description: string
    detail: string
}

export interface IHistory {
    _date: number
    date: string
    amount: string
    description: string
}

export interface IDetails {
    detailsList: IDetail[]
    historyList: IHistory[]
}

export interface IAccountDetails {
    accountKey: string
    category: string
    description: string
    maskedAccount: string
    classification: string
    details: IDetails
    balance: IBalance[]
}

export interface IResponse {
    account: IAccountDetails
}
