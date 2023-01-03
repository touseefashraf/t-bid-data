import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { apis } from '../../../environments/environment'

@Injectable()
export class DataService {
    private baseUrl = `${apis.baseUrl}`
    private data = new BehaviorSubject<Array<any>>([{ fetching: true }])
    data$ = this.data.asObservable()

    constructor(public http: HttpClient) {
    }
    getPlansList(token): Observable<any> {
        const url = `${this.baseUrl}/public/subbidding-plan-list?token=`+token

        return this.http.get<any>(url)
    }

    makeSubRequest(parmas): Observable<any> {
        const url = `${apis.baseUrl}/customer/subbidding-plan-payment`

        return this.http.post<any>(url, parmas)
    }

}
