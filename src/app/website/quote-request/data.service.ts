import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { apis } from '../../../environments/environment'

@Injectable()
export class DataService {
    private baseUrl = `${apis.baseUrl}`
    private data = new BehaviorSubject<Array<any>>([{ fetching: true }])
    public planDoc = new BehaviorSubject<number>(0)
    public specDoc = new BehaviorSubject<number>(0)
    data$ = this.data.asObservable()
    preId: any
    constructor(public http: HttpClient) {
    }

    preQuote(): Observable<any> {
        const url = `${this.baseUrl}/public/pre-quote-req`

        return this.http.get<any>(url)
    }

    qtoRequest(params): Observable<any> {
        const url = `${this.baseUrl}/public/update-quote-request`

        return this.http.post<any>(url, params)
    }
    uploadFile(params): Observable<any> {
        const url = `${this.baseUrl}/public/upload-quote-doc`

        return this.http.post<any>(url, params)
    }

    deleteFile(params): Observable<any> {
        const url = `${this.baseUrl}/public/delete-quote-doc`

        return this.http.post<any>(url, params)
    }
}
