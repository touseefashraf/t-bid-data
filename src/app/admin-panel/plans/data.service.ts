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

    getPlans(planCategoryId): Observable<any> {
        const url = `${this.baseUrl}/plan-category-list?plan_category_id=${planCategoryId}`

        return this.http.get<any>(url)
    }

    deletePlan(params): Observable<any> {
        const url = `${this.baseUrl}/delete-plan`

        return this.http.post<any>(url, params)
    }

    addPlan(params): Observable<any> {
        const url = `${this.baseUrl}/add-plan`

        return this.http.post<any>(url, params)
    }

    updatePlan(params): Observable<any> {
        const url = `${this.baseUrl}/update-plan`

        return this.http.post<any>(url, params)
    }

}
