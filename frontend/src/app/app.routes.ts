import { Routes } from '@angular/router';
import { authBrokerGuard } from './guards/auth-broker.guard';
import { DashboardUnloggedComponent } from './dashboard-unlogged/dashboard-unlogged.component';
import { DashboardBrokerComponent } from './dashboard-broker/dashboard-broker.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { DashboardBuyerComponent } from './dashboard-buyer/dashboard-buyer.component';
import { OpenGroupsListComponent } from './open-groups-list/open-groups-list.component';
import { authBuyerGuard } from './guards/auth-buyer.guard';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SingleGroupListingComponent } from './single-group-listing/single-group-listing.component';

export const routes: Routes = [
  { path: '', component: DashboardUnloggedComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch: 'full' },
  { path: 'logout', component: LogoutComponent, pathMatch: 'full' },
  { path: 'reset', component: ResetPasswordComponent, pathMatch: 'full' },
  { path: 'buyer/group/:id', component: SingleGroupListingComponent, pathMatch: 'full'},
  {
    path: 'broker',
    component: DashboardBrokerComponent,
    canActivate: [authBrokerGuard],
    children: [
      { path: 'home', component: OpenGroupsListComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  {
    path: 'buyer',
    component: DashboardBuyerComponent,
    canActivate: [authBuyerGuard],
    children: [
      { path: 'home', component: OpenGroupsListComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];
