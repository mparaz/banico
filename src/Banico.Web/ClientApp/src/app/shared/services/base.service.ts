import { Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { WindowRefService } from './windowref.service';

export abstract class BaseService {  
    public jsonHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    public jsonRequestOptions = { headers: this.jsonHeader };
    public jsonAuthRequestOptions = { headers: this.authHeader() };

  constructor(
    protected windowRefService: WindowRefService
    ) { }
  
  protected handleError(error: any) {
      var applicationError = error.headers.get('Application-Error');

      // either applicationError in header or model error in body
      if (applicationError) {
        return Observable.throw(applicationError);
      }

      var modelStateErrors: string = '';
      var serverError = error.error;

      return Observable.throw(serverError);
      // if (!serverError.type) {
      //   for (var key in serverError) {
      //     if (serverError[key])
      //       modelStateErrors += serverError[key] + '\n';
      //   }
      // }

      // modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
      // return Observable.throw(modelStateErrors || 'Server error');
    }

    private getCookie(name): string {
      var value = '; ' + document.cookie;
      var parts = value.split('; ');
      var result = "";
      parts.forEach(element => {
        var keyValue = element.split('=');
        if (keyValue[0].includes(name)) {
          result = keyValue[1];
        }
      });

      return result;
    }

  private authHeader(): HttpHeaders {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      let authToken = this.windowRefService.nativeWindow.localStorage.getItem('auth_token');
      headers = headers.set('Authorization', 'Bearer ' + authToken);
      headers = headers.set('X-XSRF-TOKEN', this.getCookie('XSRF-TOKEN'));
      return headers;
    }
}