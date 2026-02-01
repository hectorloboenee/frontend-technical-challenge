import {httpApiZipCodes} from "../../../http/http-api-zip-codes.ts";
import {mapperDto} from "../common/mapper-dto.ts";

export const search = async <TResponse, TResult>(zipCode: string): Promise<TResult> => {
    const response = await httpApiZipCodes.get<TResponse>(`${zipCode}`)
    return mapperDto<TResponse, TResult>(response)
}