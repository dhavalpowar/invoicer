import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStoreState from './store/reducers';
import * as layoutActions from './store/actions/layout.actions';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private store: Store<fromStoreState.State>) {}

  isIosBrowser() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test( userAgent );
  }

  isAndroidBrowser() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /android/.test( userAgent );
  }

  isInStandaloneMode() {
    if (this.isIosBrowser()) {
      return ('standalone' in window.navigator) && (window.navigator['standalone']);
    } else if (this.isAndroidBrowser()) {
      return window.matchMedia('(display-mode: standalone)').matches;
    }
  }

  shouldDisplayInstallNotification() {
    return (this.isIosBrowser() || this.isAndroidBrowser()) && !this.isInStandaloneMode();
  }

  displayInstallNotification() {
    return this.store.dispatch(new layoutActions.ShowInstallNotification());
  }
}
