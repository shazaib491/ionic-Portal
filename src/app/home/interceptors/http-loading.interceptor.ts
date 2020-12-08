import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService, private route: Router) { }
  
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.auth.getToken()}`,
        },
      });
      return next.handle(request);
    }
  }
  