import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStoreState from '../../store/reducers';
import * as layoutActions from '../../store/actions/layout.actions';
import { WINDOW } from './dom.service';
import { HttpClient } from '@angular/common/http';
import { SwUpdate } from '@angular/service-worker';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, merge, fromEvent } from 'rxjs';
import { mapTo, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private updateAvailable: boolean = false;
  private online$: Observable<boolean> = of(false);

  constructor(
    private store: Store<fromStoreState.State>,
    @Inject(WINDOW) private window: Window,
    @Inject(PLATFORM_ID) private platformId: Object,
    private updates: SwUpdate
  ) {

    updates.activated.subscribe(event => {
      this.updateAvailable = false;
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
  }

  isIosBrowser() {
    const userAgent = this.window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test( userAgent );
  }

  isAndroidBrowser() {
    const userAgent = this.window.navigator.userAgent.toLowerCase();
    return /android/.test( userAgent );
  }

  isInStandaloneMode() {
    if (this.isIosBrowser()) {
      return ('standalone' in this.window.navigator) && (this.window.navigator['standalone']);
    } else if (this.isAndroidBrowser()) {
      return this.window.matchMedia('(display-mode: standalone)').matches;
    }
  }

  shouldDisplayInstallNotification() {
    return (this.isIosBrowser() || this.isAndroidBrowser()) && !this.isInStandaloneMode();
  }

  displayInstallNotification() {
    return this.store.dispatch(new layoutActions.ShowInstallNotification());
  }

  isAppUpdateAvailable() {
    return this.updates.available.pipe(
      map((event) => event.current !== event.available)
    );
  }

  isAppOnline() {
    if (isPlatformBrowser(this.platformId)) {
      this.online$ = merge(
        of(navigator.onLine),
        fromEvent(window, 'online').pipe(mapTo(true)),
        fromEvent(window, 'offline').pipe(mapTo(false))
      );
    }
    return this.online$;
  }
}
