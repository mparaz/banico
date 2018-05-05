import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

export abstract class BaseService {  
    public jsonHeader = new Headers({ 'Content-Type': 'application/json' });
    public jsonRequestOptions = new RequestOptions({ headers: this.jsonHeader });

    constructor() { }

    protected handleError(error: any) {
      var applicationError = error.headers.get('Application-Error');

      // either applicationError in header or model error in body
      if (applicationError) {
        return Observable.throw(applicationError);
      }

      var modelStateErrors: string = '';
      var serverError = error.json();

      if (!serverError.type) {
        for (var key in serverError) {
          if (serverError[key])
            modelStateErrors += serverError[key] + '\n';
        }
      }

      modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
      return Observable.throw(modelStateErrors || 'Server error');
    }
}