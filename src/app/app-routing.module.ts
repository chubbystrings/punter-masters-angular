import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthRoutingModule } from './modules/auth/auth-routing.module';
import { GuessRoutingModule } from './modules/guest/guest-routing.module';
import { AuthGuard } from './services/auth.guard';
import { GuestGuard } from './services/guest.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/guest/guest.module').then((m) => m.GuestModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
  },

  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    GuessRoutingModule,
    AuthRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
