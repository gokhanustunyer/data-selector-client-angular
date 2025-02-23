// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { AuthGuard } from './guards/auth.guard';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { CredentialsModule } from './components/credentials/credentials.module';
import { DatabaseModule } from './components/database/database.module';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/analytics',
        pathMatch: 'full'
      },
      {
        path: 'credentials',
        loadChildren: () => import('./components/credentials/credentials.module').then((c) => c.CredentialsModule)
      },
      {
        path: 'database',
        loadChildren: () => import('./components/database/database.module').then((c) => c.DatabaseModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./demo/ui-element/ui-basic.module').then((m) => m.UiBasicModule)
      },
      {
        path: 'chart',
        loadComponent: () => import('./demo/chart-maps/core-apex.component')
      },
      {
        path: 'forms',
        loadComponent: () => import('./demo/forms/form-elements/form-elements.component')
      },
      {
        path: 'tables',
        loadComponent: () => import('./demo/tables/tbl-bootstrap/tbl-bootstrap.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      }
    ], canActivate: [AuthGuard]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth/signup',
        loadComponent: () => import('./demo/pages/authentication/sign-up/sign-up.component')
      },
      {
        path: 'auth/signin',
        loadComponent: () => import('./demo/pages/authentication/sign-in/sign-in.component')
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("accessToken"),
        // allowedDomains: ["https://api.bespoketailor.de", "api.bespoketailor.de", "http://api.bespoketailor.de", "https://api.bespoketailor.de/", "http://api.bespoketailor.de/", "api.bespoketailor.de/"],
        allowedDomains: ["localhost:7221"],
      }
    }),
    CredentialsModule,
    DatabaseModule
  ],
  exports: [RouterModule],
  providers: [
    { provide: "baseUrl", useValue: "https://localhost:7214/api", multi: true },
    { provide: "apiDomain", useValue: "https://localhost:7214", multi: true },
  ]
})
export class AppRoutingModule {}
