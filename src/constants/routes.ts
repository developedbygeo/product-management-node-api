export const ROUTES_ROOT = {
    /* Auth */
    API: '/api',

    /* User handling */
    REGISTER: '/register',
    LOG_IN: '/log-in',
};

export const PROTECTED_ROUTES = {
    /* Products */
    ALL_PRODUCTS: '/products',
    SPECIFIC_PRODUCT: '/product/:id',

    /* Updates */
    ALL_UPDATES: '/updates',
    SPECIFIC_UPDATE: '/update/:id',

    /* Update Points */
    ALL_UPDATE_POINTS: '/update-points',
    SPECIFIC_UPDATE_POINT: '/update-point/:id',
} as const;
