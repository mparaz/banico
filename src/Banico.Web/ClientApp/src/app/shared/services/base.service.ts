import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

export abstract class BaseService {  
    public jsonHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    public jsonRequestOptions = { headers: this.jsonHeader };
    public jsonAuthRequestOptions = { headers: this.authHeader() };

    constructor() { }

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

    private authHeader(): HttpHeaders {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      let authToken = localStorage.getItem('auth_token');
      headers = headers.set('Authorization', 'Bearer ' + authToken);
      return headers;
    }
}