import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { apis } from '../../../environments/environment'

@Injectable()
export class DataService {
    private baseUrl = `${apis.baseUrl}`
    private data = new BehaviorSubject<Array<any>>([{ fetching: true }])
    data$ = this.data.asObservable()

    constructor(public http: HttpClient) {
    }

    getPlans(): Observable<any> {
        const url = `${this.baseUrl}/public/plan-category-list`

        return this.http.get<any>(url)
    }

    subscribePlan(params): Observable<any> {
        const url = `${this.baseUrl}/customer/subscription-request`

        return this.http.post<any>(url, params)
    }

    checkSubRange(): Observable<any> {
        const url = `${apis.baseUrl}/customer/check-sub-range`

        return this.http.get<any>(url)
    }
}
