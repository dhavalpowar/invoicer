//------------- These are important and needed before anything else -------------
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';
//-------------------------------------------------------------------------------
import * as express from 'express';
import * as fs from 'fs';
import { join } from 'path';
import * as spdy from 'spdy';
import * as domino from 'domino';
import config from '../config/config';
//---------------------- DEV Environment specifics ------------------------------
if (process.env.NODE_ENV !== config.constants.env.PRODUCTION) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

//---------- Attaching server-side missing DOM objects --------------------------
// Creating template string
const template = fs.readFileSync(join(process.cwd(), '.', 'dist', 'browser', 'index.html')).toString();
// Creating a window object using that template string and domino
const win = domino.createWindow(template);
// Making window global.
global['window'] = win;
Object.defineProperty(win.document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  },
});
// Making document global
global['document'] = win.document;
// Making CSS null
global['CSS'] = null;
// global['XMLHttpRequest'] = require('xmlhttprequest').XMLHttpRequest;
global['Prism'] = null;

//------------- Faster server renders w/ Prod mode (dev mode never needed)-------
enableProdMode();
//-------------------------------------------------------------------------------

//-------------------------- Express server & Engine ----------------------------
const app = express();
const DIST_FOLDER = join(process.cwd(), 'dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../dist/server/main');

import { ngExpressEngine } from '@nguniversal/express-engine';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';

// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { APP_BASE_HREF } from '@angular/common';
// ------------------------------------------------------------------------------

// Etag support
if (config.etag) app.enable('etag');

// SSR engine
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {

  const http = req.headers['x-forwarded-proto'] === undefined ? 'https' : req.headers['x-forwarded-proto'];
  const url = req.originalUrl;

  // tslint:disable-next-line:no-console
  console.time(`GET: ${url}`);
  res.render('index', { req, res, providers: [
    {
      provide: REQUEST, useValue: (req)
    },
    {
      provide: RESPONSE, useValue: (res)
    },
    {
      provide: APP_BASE_HREF,
      useValue: `${http}://${req.headers.host}`
    }
  ]},
  (err, html) => {
    if (!!err) {
      throw err; }

    // tslint:disable-next-line:no-console
    console.timeEnd(`GET: ${url}`);
    res.send(html);
  });
});

// Start up the SPDY HTTP2 server
spdy
  .createServer(config.serverOptions, app)
  .listen(config.port, (err) => {
    if (err) throw new Error(err);
    console.log(`SPDY HTTP2 server listening on https://localhost:${config.port}`);
  })


// Start up the Node HTTP server
// app.listen(config, () => {
//   console.log(`Node server listening on https://localhost:${config.port}`);
// });
