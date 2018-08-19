import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { AppService } from './core/services/app.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UniversalInterceptor } from './core/interceptors/universal.interceptor';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule
  ],
  providers: [
    AppService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptor,
      /* Multi is important or you will delete all the other interceptors */
      multi: true
    },
    // Add universal-only providers here
  ],
  bootstrap: [ AppComponent ]
})
export class AppServerModule {}
