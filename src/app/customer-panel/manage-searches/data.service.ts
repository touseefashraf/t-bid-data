import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { apis } from '../../../environments/environment'

@Injectable()
export class DataService {
    private baseUrl = `${apis.baseUrl}/customer`
    private data = new BehaviorSubject<Array<any>>([{ fetching: true }])
    data$ = this.data.asObservable()

    constructor(public http: HttpClient) {
    }

    savedProjectSearches(): Observable<any> {
        const url = `${this.baseUrl}/saved-searches`

        return this.http.get<any>(url)
    }

    saveSearches(params: any): Observable<any> {
        const url = `${this.baseUrl}/save-search`

        return this.http.post<any>(url, params)
    }

    updateSearches(params: any): Observable<any> {
        const url = `${this.baseUrl}/update-search`

        return this.http.post<any>(url, params)
    }

    deleteSearches(params: any): Observable<any> {
        const url = `${this.baseUrl}/delete-search`

        return this.http.post<any>(url, params)
    }
}
