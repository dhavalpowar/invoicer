import * as fs from 'fs';

interface Config {
    port?: number;
    serverOptions?: { key: Buffer, cert: Buffer };
}

const config: Config = {
    port: Number(process.env.PORT) || 4300,
    serverOptions: {
        key: fs.readFileSync(process.env.SSL_KEY || `./dist/server.key`),
        cert: fs.readFileSync(process.env.SSL_CERT || `./dist/server.crt`)
    }

};

export default config;
