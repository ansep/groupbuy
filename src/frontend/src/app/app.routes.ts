import { Routes } from '@angular/router';
import { LoginBrokerComponent } from './login-broker/login-broker.component';
import { authBrokerGuard } from './guards/auth-broker.guard';
import { DashboardUnloggedComponent } from './dashboard-unlogged/dashboard-unlogged.component';
import { DashboardBrokerComponent } from './dashboard-broker/dashboard-broker.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginBuyerComponent } from './login-buyer/login-buyer.component';
import { DashboardBuyerComponent } from './dashboard-buyer/dashboard-buyer.component';
import { OpenGroupsListComponent } from './open-groups-list/open-groups-list.component';
import { authBuyerGuard } from './guards/auth-buyer.guard';
// import { LoginBuyerComponent } from './login-buyer/login-buyer.component';

export const routes: Routes = [
  { path: '', component: DashboardUnloggedComponent, pathMatch: 'full' },
  { path: 'broker-login', component: LoginBrokerComponent },
  { path: 'buyer-login', component: LoginBuyerComponent },
  { path: 'logout', component: LogoutComponent, pathMatch: 'full' },
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
