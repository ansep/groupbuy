import { Routes } from '@angular/router';
import { LoginBrokerComponent } from './login-broker/login-broker.component';
import { BrokerHomeComponent } from './broker-home/broker-home.component';
import { authBrokerGuard } from './guards/auth-broker.guard';
// import { LoginBuyerComponent } from './login-buyer/login-buyer.component';

export const routes: Routes = [
  { path: 'broker-login', component: LoginBrokerComponent },
  //   { path: 'buyer-login', component: LoginBuyerComponent },
  {
    path: 'broker',
    component: BrokerHomeComponent,
    canActivate: [authBrokerGuard],
    children: [{ path: 'home', component: BrokerHomeComponent }],
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];
