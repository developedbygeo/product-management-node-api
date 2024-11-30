export const LOG_MESSAGES = {
    NO_BEARER: 'No Bearer token provided',
    NO_TOKEN: 'No token provided',
    INVALID_TOKEN: 'Invalid token',

    /* User */
    USER_ID_IN_REQUEST: 'User in request',
    USER_LOCATED: 'Located user with ID',
    USER_PRODUCTS_LOCATED: '# of products found',
    USER_PRODUCTS_LIST: 'List of products',

    /* Product */
    PRODUCT_ID_IN_REQUEST: 'Product id in request',
    PRODUCT_FOUND: 'Found product',
    PRODUCT_NOT_FOUND: 'Product not found',
} as const;
