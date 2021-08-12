import { AxiosResponse } from "axios"

export type PropsSmsLogin = {
    placeholderText: string,
    buttonConfirmText: string,
    buttonColor: string,
    textDescription: string,
    buttonSendText: string,
    condeSentTitle: string,
    secCodeLenght: number,
    routeSendNumber: string,
    routeSendSecCode: string,
    showMaskPhone: boolean,
    // returnRequestSendSms(responseRequestSendSms): PropsSmsLoginResponse;
    // returnRequestValidateCode(responseRequestValidateCode): PropsSmsVerifyCodeResponse;
}

export type SmsLoginFunctions = {
    cellphoneValidation(): void;
    cellphoneValidationForUser(): void;
    validateCode(): void;
    validateCodeForUser(): void;
    nextOrPrevInput(item, text): void;
    backSpace(item, index): void;
}

export type PropsSmsLoginUserResponse = {
    success: boolean,
    login: boolean,
    user_id: number,
    code_duration: number,
}

export type PropsSmsLoginProviderResponse = {
    success: boolean,
    login: boolean,
    provider_id: number,
    code_duration: number,
}

export type PropsSmsValidateCodeResponse = {
    success: boolean,
    message: string,
    id: number,
    first_name: string,
    last_name: string,
    phone: string,
    email: string,
    picture: string,
    bio: string,
    document: number,
    gender: string,
    address: string,
    address_city: string,
    address_number: number,
    address_neighbour: number,
    address_complements: string,
    state: string,
    country: string,
    zipcode: number,
    login_by: any,
    social_unique_id: any,
    device_token: any,
    device_type: any,
    token: string,
    timezone: string,
    is_referee: number,
    promo_count: number,
    referral_code: string,
    parent_referral_code: string,
    request_share: string,
    ledger_id: number
}