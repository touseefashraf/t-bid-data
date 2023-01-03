import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { apis } from 'src/environments/environment'

@Injectable()
export class DataService {
    private baseUrl = `${apis.baseUrl}/admin`
    private data = new BehaviorSubject<Array<any>>([{ fetching: true }])
    data$ = this.data.asObservable()

    constructor(public http: HttpClient) {
    }

    getList(params): Observable<any> {
        const url = `${this.baseUrl}/quote-requests`

        return this.http.get<any>(url, { params })
    }

    delete(params): Observable<any> {
        const url = `${this.baseUrl}/delete-quote-request`

        return this.http.post<any>(url, params)
    }
}
