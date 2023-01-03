import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { apis } from '../../../environments/environment'

@Injectable()
export class DataService {
    private baseUrl = `${apis.baseUrl}/admin`
    private data = new BehaviorSubject<Array<any>>([{ fetching: true }])
    data$ = this.data.asObservable()

    constructor(public http: HttpClient) {
    }

    preCoupon(): Observable<any> {
      const url = `${this.baseUrl}/pre-coupon`

      return this.http.get<any>(url)
  }

    getList(params): Observable<any> {
        const url = `${this.baseUrl}/coupons`

        return this.http.get<any>(url,{params})
    }

    delete(params): Observable<any> {
        const url = `${this.baseUrl}/delete-coupon`

        return this.http.post<any>(url, params)
    }

    activeCoupon(params): Observable<any> {
      const url = `${this.baseUrl}/activate-coupon`

      return this.http.post<any>(url, params)
    }

    inactiveCoupon(params): Observable<any> {
      const url = `${this.baseUrl}/deactivate-coupon`

      return this.http.post<any>(url, params)
    }
    
    update(params): Observable<any> {
        const url = `${this.baseUrl}/update-coupon`

        return this.http.post<any>(url, params)
    }

}
