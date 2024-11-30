export const ROUTES_ROOT = {
    /* Auth */
    API: '/api',

    /* User handling */
    REGISTER: '/register',
    LOG_IN: '/log-in',
};

export const PROTECTED_ROUTES = {
    /* Products */
    ALL_PRODUCTS: '/product',
    SPECIFIC_PRODUCT: '/product/:id',

    /* Updates */
    ALL_UPDATES: '/update',
    SPECIFIC_UPDATE: '/update/:id',

    /* Update Points */
    ALL_UPDATE_POINTS: '/update-point',
    SPECIFIC_UPDATE_POINT: '/update-point/:id',
} as const;

export const PROTECTED_ROUTES_SEGMENTS = {
    ROOT: '/',
    SPECIFIC_ID: '/:id',
};
