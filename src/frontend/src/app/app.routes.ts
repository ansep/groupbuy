import { Routes } from '@angular/router';
import { LoginBrokerComponent } from './login-broker/login-broker.component';
import { BrokerHomeComponent } from './broker-home/broker-home.component';
import { authBrokerGuard } from './guards/auth-broker.guard';
import { OpenGroupsListComponent } from './open-groups-list/open-groups-list.component';
// import { LoginBuyerComponent } from './login-buyer/login-buyer.component';

export const routes: Routes = [
  { path: '', component: OpenGroupsListComponent, pathMatch: 'full' },
  { path: 'broker-login', component: LoginBrokerComponent },
  //   { path: 'buyer-login', component: LoginBuyerComponent },
  {
    path: 'broker',
    component: BrokerHomeComponent,
    canActivate: [authBrokerGuard],
    children: [{ path: 'home', component: BrokerHomeComponent }],
  },
  // { path: '', redirectTo: '/', pathMatch: 'full' }, // infinite redirect
];
