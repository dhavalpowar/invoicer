import * as fs from 'fs';

interface Config {
    port?: number;
    environment?: string,
    etag?: boolean,
    serverOptions?: { key: Buffer, cert: Buffer };
    constants?: any;
}

const config: Config = {};
config.constants = {
    dom: {
        WINDOW: 'window',

    },
    headers: {
        NO_COMPRESSION: 'x-no-compression'
    },
    env: {
        PRODUCTION: 'production',
        DEVELOPMENT: 'development',
        TEST: 'test'
    }
};

config.port = Number(process.env.PORT) || 4200;
config.environment = process.env.NODE_ENV || config.constants.env.DEVELOPMENT,
config.etag = process.env.NODE_ENV === config.constants.env.PRODUCTION ? true : false;
config.serverOptions = {
    key: fs.readFileSync(process.env.SSL_KEY || `./dist/server.key`),
    cert: fs.readFileSync(process.env.SSL_CERT || `./dist/server.crt`)
};

export default config;
