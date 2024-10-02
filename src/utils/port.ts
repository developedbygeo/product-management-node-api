import portfinder from 'portfinder';

export const findAvailablePort = async () =>
    portfinder.getPortPromise({
        startPort: 3000,
        stopPort: 3999,
    });
