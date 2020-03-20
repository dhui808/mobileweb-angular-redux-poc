import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { Router } from '@angular/router'
import {catchError} from 'rxjs/internal/operators';
import { tap, map } from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs/index';
import {Store} from '@ngrx/store';
import {AddNetworkError, AddAppError, ExecuteServerAction} from '../store/actions/common.actions';
import {NavigationAction} from '../store/actions/navigation.actions';
import {IAppState} from '../store/state/app.state';
import BankingBase from '../base/BankingBase'

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<IAppState>, private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next
      .handle(request)
      .pipe(
          tap((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
                  let response = event as HttpResponse<any>
                  let result = response.body
                  console.debug("In ResponseInterceptor, result=" + result)
                  if (result['exception']) {
                      var action = new AddAppError({classNames:"error-message alert-box", text: result['exception'].message});
                      this.store.dispatch(action);
                  } else {
                      this.onSuccess(result)
                  }
              }
              return event
          }),
          catchError((error: HttpErrorResponse) => {
              var action = new AddNetworkError(error);
              this.store.dispatch(action);
              return throwError(error);
          })
      )
  }

  onSuccess = (result) => {
      // enable button
      //if (this.activeButton) {
      //    this.activeButton.disabled = false;
      //}
      if (!result || !result.context || !result.context.next || result.context.next.length === 0) {
          // let the controller decide what to do
          //this.onSubmitSuccess(result);
          //BankingBase.loadingBar.stop();
          return;
      }
      
      let next = result.context.next[0]
      let nextAction = next.action;
      let params = next.params;
      
      if(typeof params === 'undefined') {
          params = null;
      }
      
      let path = BankingBase.navigation.isNavigatable(nextAction)
      if (path) {
          if (params == null) {
              this.router.navigate([path])
          } else {
              this.router.navigate([path, params])
          }
          var navigationAction = NavigationAction.createNavigationAction(nextAction, params)
          this.store.dispatch(navigationAction)
          
          //BankingBase.navigation.navigateTo(nextAction, this.getOriginatingPage(), null, params);
          //BankingBase.loadingBar.stop();
      } else {
          var url = BankingBase.restProxy.getRequestUrl(nextAction)
          var action = new ExecuteServerAction(url, params);
          this.store.dispatch(action);
          //BankingBase.restProxy.sendRequest(nextAction, params, this.onSuccess, this.onFailure, this.onNetworkFailure);
      }
  }
}
