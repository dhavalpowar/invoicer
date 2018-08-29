import { Component } from '@angular/core';
import { AppService } from './core/services/app.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'App';
  appOnlineSubscription: Subscription;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appConnectivityHandler();
    this.appInstallerHandler();
  }

  appConnectivityHandler() {
    this.appOnlineSubscription = this.appService.isAppOnline()
    .pipe(delay(1000)).subscribe(
      (isOnline) => {
        if (!isOnline) {
          // Show a toast notifying user is offline.
          console.log('app seems to be offline');
        }
      }
    )
  }

  appInstallerHandler() {
    if (this.appService.shouldDisplayInstallNotification()) {
      alert('Save this app to your home screen');
    }
  }



  ngOnDestroy() {
    this.appOnlineSubscription.unsubscribe();
  }
}
