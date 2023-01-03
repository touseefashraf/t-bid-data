import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { apis } from '../../../environments/environment'

@Injectable()
export class DataService {
    private baseUrl = `${apis.baseUrl}/admin`

    constructor(public http: HttpClient) {
    }
    get(): Observable<any> {
        const url = `${this.baseUrl}/rfq-list`

        return this.http.get<any>(url)
    }
    rejectRequest(params: any): Observable<any> {
        const url = `${this.baseUrl}/reject-rfq`

        return this.http.post<any>(url, params)
    }
    approveRequest(params: any): Observable<any> {
        const url = `${this.baseUrl}/approve-rfq`

        return this.http.post<any>(url, params)
    }

}
