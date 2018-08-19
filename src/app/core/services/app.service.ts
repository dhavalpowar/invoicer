import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStoreState from '../../store/reducers';
import * as layoutActions from '../../store/actions/layout.actions';
import { WINDOW } from './dom.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private store: Store<fromStoreState.State>,
    @Inject(WINDOW) private window: Window,
    private httpClient: HttpClient
  ) {}

  makeApiCall() {
    return this.httpClient.get(`/api/response`);
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
}
