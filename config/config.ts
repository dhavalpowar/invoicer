import * as fs from 'fs';
import { join } from 'path';
const BASE_PATH = process.env.SRC_BASE_PATH || join(process.cwd(), '.', 'dist');

const config = {
    port: Number(process.env.PORT) || 4200,
    environment: process.env.NODE_ENV || 'development',
    etag: process.env.NODE_ENV === 'production' ? true : false,
    serverOptions: {
        key: fs.readFileSync(process.env.SSL_KEY || `./dist/server.key`),
        cert: fs.readFileSync(process.env.SSL_CERT || `./dist/server.crt`)
    },
    src: {
        path: BASE_PATH,
        browser: {
            path: join(BASE_PATH, 'browser'),
            entry: process.env.SRC_ENTRY || 'index.html' || 'index.js'
        },
        server: {
            path: join(BASE_PATH, 'browser'),
            entry: process.env.SRC_ENTRY || 'index.html' || 'index.js'
        }
    },
    constants: {
        env: {
            PRODUCTION: 'production',
            DEVELOPMENT: 'development',
            TEST: 'test'
        }
    }
};


export default config;
