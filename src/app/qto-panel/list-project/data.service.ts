import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { apis } from '../../../environments/environment'

@Injectable()
export class DataService {
    private baseUrl = `${apis.baseUrl}/qto`

    constructor(public http: HttpClient) {
    }


    list(page: any,title: any): Observable<any> {
        const url = `${this.baseUrl}/projects?page=${page}&title=${title}`

        return this.http.get<any>(url)
    }

    getPropertyDetails(id: any): Observable<any> {
        const url = `${this.baseUrl}/property-detail/${id}`

        return this.http.get<any>(url)
    }

}
