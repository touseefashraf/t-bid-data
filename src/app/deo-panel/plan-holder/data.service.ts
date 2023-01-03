import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { apis } from '../../../environments/environment'

@Injectable()
export class DataService {
    private baseUrl = `${apis.baseUrl}/deo`
    private data = new BehaviorSubject<Array<any>>([{ fetching: true }])
    data$ = this.data.asObservable()

    constructor(public http: HttpClient) {
    }

    getList(page: number): Observable<any> {
        const url = `${this.baseUrl}/plan-holders-list?page=${page}`

        return this.http.get<any>(url)
    }
    getSearchList(params): Observable<any> {
        const url = `${this.baseUrl}/plan-holders-list`

        return this.http.get<any>(url, { params })
    }

    delete(params): Observable<any> {
        const url = `${this.baseUrl}/delete-plan-holder`

        return this.http.post<any>(url, params)
    }

    add(params): Observable<any> {
        const url = `${this.baseUrl}/add-plan-holder`

        return this.http.post<any>(url, params)
    }

    update(params): Observable<any> {
        const url = `${this.baseUrl}/update-plan-holder`

        return this.http.post<any>(url, params)
    }

}
