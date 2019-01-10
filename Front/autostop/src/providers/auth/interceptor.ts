import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {TokenStorage} from '../auth/token.storage';
import 'rxjs/add/operator/do';
import { NavController, NavParams } from "ionic-angular";
import { ConnexionPage } from '../../pages/home/connexion/connexion'

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(
    private token: TokenStorage, 
    public navCtrl: NavController,
    public navParams: NavParams,) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next.handle(authReq).do(
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
           
            if (err.status === 401) {
                this.navCtrl.push(ConnexionPage);
            }
          }
        }
      );
  }

}

