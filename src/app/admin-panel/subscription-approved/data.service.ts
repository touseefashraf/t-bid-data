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

    getList(): Observable<any> {
        const url = `${this.baseUrl}/subscriptions`

        return this.http.get<any>(url)
    }

    acceptRequest(params: any): Observable<any> {
        const url = `${this.baseUrl}/activate-subscription`

        return this.http.post<any>(url, params)
    }

    rejectRequest(params: any): Observable<any> {
        const url = `${this.baseUrl}/deactivate-subscription`

        return this.http.post<any>(url, params)
    }
}
