import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuard } from './auth/auth.guard';
// import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { environment } from '../environments/environment.prod';

const routes: Routes = [
    // {
    //     path: 'admin',
    //     loadChildren: './app-shell/app-shell.module#AppShellModule',
    //     canLoad: [AuthGuard]
    //   },
    //   {
    //     path: 'login',
    //     loadChildren: './auth/auth.module#AuthModule',
    //     canLoad: [AuthGuard]
    //   },
    //   {
    //     path: '',
    //     redirectTo: 'admin',
    //     pathMatch: 'full'
    //   },
    //   {
    //     path: '**',
    //     component: NotFoundComponent
    //   }
];

@NgModule({
    imports: [
      RouterModule.forRoot(
        routes,
        {
          enableTracing: !environment.production,
          onSameUrlNavigation: 'reload'
        })
    ],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }
