import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/auth/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { NotificationBarComponent } from './components/notification-bar/notification-bar.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { SummaryComponent } from './pages/accounts/summary/summary.component';
import { DetailsComponent } from './pages/accounts/details/details.component';
import { LogoutComponent } from './pages/auth/logout/logout.component';
import { AccountDetailsComponent } from './pages/accounts/account-details/account-details.component';
import { MfaComponent } from './pages/auth/mfa/mfa.component';

import { environment } from '../environments/environment';

import { appReducers } from './store/reducers/app.reducers';
import { metaReducers } from './store/reducers/meta.reducers';
import { ResponseInterceptor } from './services/response.interceptor';
import { LoginService } from './services/login.service';
import { LoginEffects } from './store/effects/login.effects';
import { MfaService } from './services/mfa.service';
import { MfaEffects } from './store/effects/mfa.effects';
import { LogoutService } from './services/logout.service';
import { LogoutEffects } from './store/effects/logout.effects';
import { AccountService } from './services/account.service';
import { AccountEffects } from './store/effects/account.effects';
import { AccountClassService } from './services/account-class.service';
import { AccountClassEffects } from './store/effects/account-class.effects';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    TitleBarComponent,
    LoadingBarComponent,
    NotificationBarComponent,
    UnderConstructionComponent,
    AccountsComponent,
    SummaryComponent,
    DetailsComponent,
    LogoutComponent,
    AccountDetailsComponent,
    MfaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers, {metaReducers}),
    EffectsModule.forRoot([LoginEffects, MfaEffects, LogoutEffects, AccountEffects, AccountClassEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    AppRoutingModule
  ],
  providers: [LoginService,
              MfaService,
              LogoutService,
              AccountService,
              AccountClassService,
              { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
