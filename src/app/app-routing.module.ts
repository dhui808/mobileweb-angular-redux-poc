import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/auth/login/login.component';
import { MfaComponent } from './pages/auth/mfa/mfa.component';
import { LogoutComponent } from './pages/auth/logout/logout.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { AccountDetailsComponent } from './pages/accounts/account-details/account-details.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'mfa', component: MfaComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'user-management/recover', component: UnderConstructionComponent },
  { path: 'user-management/activate', component: UnderConstructionComponent },
  { path: 'locator', component: UnderConstructionComponent },
  { path: 'contact-us', component: UnderConstructionComponent },
  { path: 'security', component: UnderConstructionComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'accounts/details/:accountKey', component: AccountDetailsComponent},
  { path: 'move-money', component: UnderConstructionComponent },
  { path: 'settings', component: UnderConstructionComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
