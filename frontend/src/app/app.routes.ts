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
import { ChatComponent } from './chat/chat.component';
import { BrokerNewListingComponent } from './broker-new-listing/broker-new-listing.component';
import { BrokerMyGroupsComponent } from './broker-my-groups/broker-my-groups.component';
import { BuyerJoinedListingsComponent } from './buyer-joined-listings/buyer-joined-listings.component';
import { BrokerEditListingComponent } from './broker-edit-listing/broker-edit-listing.component';

export const routes: Routes = [
  { path: '', component: DashboardUnloggedComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch: 'full' },
  { path: 'reset', component: ResetPasswordComponent, pathMatch: 'full' },
  { path: 'group/:id', component: SingleGroupListingComponent },
  {
    path: 'broker',
    component: DashboardBrokerComponent,
    canActivate: [authBrokerGuard],
    children: [
      { path: 'home', component: OpenGroupsListComponent },
      { path: 'groups', component: BrokerMyGroupsComponent, pathMatch: 'full' },
      { path: 'new', component: BrokerNewListingComponent, pathMatch: 'full' },
      {
        path: 'edit/:id',
        component: BrokerEditListingComponent,
        pathMatch: 'full',
      },
      { path: 'group/:id', component: SingleGroupListingComponent },
      { path: 'messages', component: ChatComponent, pathMatch: 'full' },
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
        path: 'groups',
        component: BuyerJoinedListingsComponent,
        pathMatch: 'full',
      },
      {
        path: 'group/:id',
        component: SingleGroupListingComponent,
        pathMatch: 'full',
      },
      { path: 'messages', component: ChatComponent, pathMatch: 'full' },
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
