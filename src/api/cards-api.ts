import axios, { AxiosResponse } from 'axios'


export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export enum Result_Code {
    OK = 0,
    ERROR = 1,
    CAPCHA = 10,
}

