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
    list(): Observable<any> {
        const url = `${this.baseUrl}/subbidding-plan-list`

        return this.http.get<any>(url)
    }

    add(params): Observable<any> {
        const url = `${this.baseUrl}/save-subbidding-plan`

        return this.http.post<any>(url, params)
    }

    update(params): Observable<any> {
        const url = `${this.baseUrl}/update-subbidding-plan`

        return this.http.post<any>(url, params)
    }

    delete(params): Observable<any> {
        const url = `${this.baseUrl}/delete-subbidding-plan`

        return this.http.post<any>(url, params)
    }
}
