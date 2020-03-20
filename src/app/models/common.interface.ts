export interface IContext {
    current: ICurrent;
    next: INext;
}

export interface INext {
    action: string;
    service: string;
}

export interface ICurrent {
    action: string;
    service: string;
    params: IParams;
}

export type IParams = IParamsLogin | IParamsMfa

export interface IParamsLogin {
    languageCode: string;
    userId: string;
    saveToken: boolean;
    password: string;
}

export interface IParamsMfa {
    answer: string;
    question: string;
}

export interface IResponse {
    activated: boolean;
    cid: string;
    termsUpdated: string;
    tempPassword: boolean;
    maskedCardNumber: string;
    userKey: string;
    bannerMessageRequired: boolean;
}
