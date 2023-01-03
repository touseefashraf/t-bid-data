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

    getPlanCategory(): Observable<any> {
        const url = `${this.baseUrl}/plan-category-list`

        return this.http.get<any>(url)
    }

    deletePlanCategory(params): Observable<any> {
        const url = `${this.baseUrl}/delete-plan-category`

        return this.http.post<any>(url, params)
    }

    addPlanCategory(params): Observable<any> {
        const url = `${this.baseUrl}/add-plan-category`

        return this.http.post<any>(url, params)
    }

    updatePlanCategory(params): Observable<any> {
        const url = `${this.baseUrl}/update-plan-category`

        return this.http.post<any>(url, params)
    }

}
