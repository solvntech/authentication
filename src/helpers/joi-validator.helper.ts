import Joi from 'joi';
import { BadRequest } from 'http-errors';

interface JoiResponse {
    isValid: boolean;
    result?: any;
    error?: any;
}

export class JoiValidatorHelper {
    static check(scheme: Joi.ObjectSchema, data: any): Promise<JoiResponse> {
        return scheme
            .validateAsync(data)
            .then((value) => ({ isValid: true, result: value }))
            .catch((err) => ({ isValid: false, error: new BadRequest(err.message) }));
    }
}
