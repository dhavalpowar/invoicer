import * as fs from 'fs';
import { join } from 'path';

const BASE_PATH = process.env.SRC_BASE_PATH || join(process.cwd(), '.', 'dist');

const config = {
    appName         : 'Invoicer',
    // ENVIRONMENT (production | development | testing | staging)
    environment     : process.env.NODE_ENV || 'development',

    // SERVER PORT
    port            : Number(process.env.PORT) || 4200,

    // SERVER ETAG
    etag            : process.env.NODE_ENV === 'production' ? true : false,

    // SSL CONFIG
    ssl             : {
        key             : fs.readFileSync(process.env.SSL_KEY || `./dist/server.key`),
        cert            : fs.readFileSync(process.env.SSL_CERT || `./dist/server.crt`)
    },

    // COMPILED SRC DISTRIBUTION
    dist            : {
        path            : BASE_PATH,
        browser         : {
            path            : join(BASE_PATH, 'browser'),
            entry           : process.env.SRC_ENTRY || 'index.html' || 'index.js'
        },
        server: {
            path            : join(BASE_PATH, 'browser'),
            entry           : process.env.SRC_ENTRY || 'index.html' || 'index.js'
        }
    },

    // CONSTANTS
    constants       : {
        PRODUCTION      : 'production',
        DEVELOPMENT     : 'development',
        TEST            : 'test',
        STAGING         : 'staging'
    }
};

export default config;
