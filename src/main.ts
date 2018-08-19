import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Adding the NodeJS execution environment for electron apps.
if (environment.electron) {
  const script = document.createElement('script');
  script.innerHTML = 'require(\'./dist/browser/renderer.js\')';
  document.head.appendChild(script);
}


document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.log(err));
});
