import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectFormDirective } from './directives/connect-form.directive';
import { WINDOW_PROVIDERS } from './services/dom.service';
import { AppService } from './services/app.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ConnectFormDirective],
  providers: [AppService, WINDOW_PROVIDERS]
})
export class CoreModule { }
