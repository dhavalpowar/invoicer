import { BrowserModule } from '@angular/platform-browser';
import { NgModule, PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { BrowserAnimationsModule }  from "@angular/platform-browser/animations";
import { HttpModule }               from '@angular/http';
import { HttpClientModule }         from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule }              from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule }      from '@ngrx/store-devtools';
import { EffectsModule }            from '@ngrx/effects';
import { AppRoutingModule }         from './app-routing.module';
import { environment }              from '../environments/environment';
import { AppEffects }               from './store/effects/app.effects';
import { reducers, metaReducers }   from './store/reducers';

import { AppComponent } from './app.component';
import { isPlatformBrowser } from '@angular/common';
import { AppService } from './app.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'invoicer' }),
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot(reducers, { metaReducers }),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule.forRoot({
      /*
        They stateKey defines the name of the state used by the router-store reducer.
        This matches the key defined in the map of reducers
      */
      stateKey: 'router',
    }),
    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrument({
      name: 'VCO NG_UI DevTools',
      logOnly: environment.production,
    }),

    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
     */
    EffectsModule.forRoot([AppEffects]),
    /**
     * https://akveo.github.io/nebular
     */
  ],
  providers: [AppService],
  // providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
      const platform = isPlatformBrowser(platformId) ? 'in the browser' : 'on the server';
      console.log(`Running ${platform} with appId=${appId}`);
    }
}
