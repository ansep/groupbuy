import { Routes } from '@angular/router';
import { authBrokerGuard } from './guards/auth-broker.guard';
import { DashboardUnloggedComponent } from './dashboard-unlogged/dashboard-unlogged.component';
import { DashboardBrokerComponent } from './dashboard-broker/dashboard-broker.component';
import { LoginComponent } from './login/login.component';
import { DashboardBuyerComponent } from './dashboard-buyer/dashboard-buyer.component';
import { OpenGroupsListComponent } from './open-groups-list/open-groups-list.component';
import { authBuyerGuard } from './guards/auth-buyer.guard';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SingleGroupListingComponent } from './single-group-listing/single-group-listing.component';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { BuyerChatComponent } from './buyer-chat/buyer-chat.component';

export const routes: Routes = [
  { path: '', component: DashboardUnloggedComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch: 'full' },
  { path: 'reset', component: ResetPasswordComponent, pathMatch: 'full' },
  { path: 'buyer/messages', component: BuyerChatComponent, pathMatch: 'full'},
  {
    path: 'buyer/group/:id',
    component: SingleGroupListingComponent,
    pathMatch: 'full',
  },
  {
    path: 'broker',
    component: DashboardBrokerComponent,
    canActivate: [authBrokerGuard],
    children: [
      { path: 'home', component: OpenGroupsListComponent },
      {
        path: 'profile/:username',
        component: ProfileComponent,
        pathMatch: 'full',
      },
      { path: 'account', component: AccountComponent, pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  {
    path: 'buyer',
    component: DashboardBuyerComponent,
    canActivate: [authBuyerGuard],
    children: [
      { path: 'home', component: OpenGroupsListComponent },
      {
        path: 'profile/:username',
        component: ProfileComponent,
        pathMatch: 'full',
      },
      { path: 'account', component: AccountComponent, pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];
