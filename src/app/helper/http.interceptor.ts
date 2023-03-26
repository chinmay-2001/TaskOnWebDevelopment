import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpInterceptor } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem('jwt')
        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
        return next.handle(req)
    }
}

export const HttpInterceptorProvider = [
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true }
]
