import { SENSITIVE_REQUEST_DATA_TO_OMIT } from '../constants/data';

export const filterSensitiveData = (body: Request['body']) => {
    if (body && typeof body === 'object') {
        // Deep copy the body to avoid mutating the original object
        const filteredBody = JSON.parse(JSON.stringify(body));

        const maskSensitiveData = (obj: any) => {
            for (const key in obj) {
                if (
                    SENSITIVE_REQUEST_DATA_TO_OMIT.includes(key.toLowerCase())
                ) {
                    obj[key] = '[FILTERED]';
                } else if (typeof obj[key] === 'object') {
                    maskSensitiveData(obj[key]);
                }
            }
        };

        maskSensitiveData(filteredBody);

        return filteredBody;
    }
    return body;
};
