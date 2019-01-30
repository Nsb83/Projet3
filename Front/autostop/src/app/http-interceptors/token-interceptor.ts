import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs';
import { TokenStorage } from '../../providers/auth/token.storage';

const TOKEN_HEADER_KEY = 'Authorization';

/** Pass request with added Json Web Token if exists in localStorage. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenStorage: TokenStorage) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.tokenStorage.getToken();

    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
    }

    return next.handle(authReq);
  }
}
