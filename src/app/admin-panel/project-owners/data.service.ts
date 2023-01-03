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

    getProjectOwner(): Observable<any> {
        const url = `${this.baseUrl}/project-owners`

        return this.http.get<any>(url)
    }

    deleteProjectOwner(params): Observable<any> {
        const url = `${this.baseUrl}/delete-project-owner`

        return this.http.post<any>(url, params)
    }

    addProjectOwner(params): Observable<any> {
        const url = `${this.baseUrl}/add-project-owner`

        return this.http.post<any>(url, params)
    }

    updateProjectOwner(params): Observable<any> {
        const url = `${this.baseUrl}/update-project-owner`

        return this.http.post<any>(url, params)
    }

}
