import { Observable } from 'rxjs'
import { ApiService } from '../services/api.service'
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class CustomerGuard implements CanActivate {

    constructor(private api: ApiService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean {
        if (this.api.isCustomer()) {
            return true
        } else {
            this.router.navigateByUrl('login')

            return false
        }
    }
}
