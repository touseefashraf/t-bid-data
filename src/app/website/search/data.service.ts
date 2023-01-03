import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { apis } from '../../../environments/environment'

@Injectable()
export class DataService {
    private baseUrl = `${apis.baseUrl}/public`
    private data = new BehaviorSubject<Array<any>>([{ fetching: true }])
    data$ = this.data.asObservable()

    constructor(public http: HttpClient) {
    }

    search(params): Observable<any> {
        const url = `${this.baseUrl}/projects`

        return this.http.get<any>(url, { params })
    }

    planHolders(): Observable<any> {
        const url = `${this.baseUrl}/plan-holders-list`

        return this.http.get<any>(url)
    }

    divisions(): Observable<any> {
        const url = `${this.baseUrl}/csi-division-list`

        return this.http.get<any>(url)
    }

    favProjects(): Observable<any> {
        const url = `${apis.baseUrl}/customer/favourite-projects`

        return this.http.get<any>(url)
    }

    removeFromFav(params: any): Observable<any> {
        const url = `${apis.baseUrl}/customer/remove-favourite-project`

        return this.http.post<any>(url, params)
    }

    addToFav(params: any): Observable<any> {
        const url = `${apis.baseUrl}/customer/add-favourite-project`

        return this.http.post<any>(url, params)
    }

    savedProjectSearches(): Observable<any> {
        const url = `${apis.baseUrl}/customer/saved-searches`

        return this.http.get<any>(url)
    }

    saveSearches(params: any): Observable<any> {
        const url = `${apis.baseUrl}/customer/save-search`

        return this.http.post<any>(url, params)
    }
}
