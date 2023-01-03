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

    getList(params: any): Observable<any> {
        const url = `${this.baseUrl}/subscription-list`

        return this.http.get<any>(url, {params})
    }

    acceptRequest(params: any): Observable<any> {
        const url = `${this.baseUrl}/approved-subscription`

        return this.http.post<any>(url, params)
    }

    rejectRequest(params: any): Observable<any> {
        const url = `${this.baseUrl}/rejected-subscription`

        return this.http.post<any>(url, params)
    }
}
