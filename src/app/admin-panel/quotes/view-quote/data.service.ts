import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { apis } from 'src/environments/environment'

@Injectable()
export class DataService {
    private baseUrl = `${apis.baseUrl}/admin`
    private data = new BehaviorSubject<Array<any>>([{ fetching: true }])
    data$ = this.data.asObservable()

    constructor(public http: HttpClient) {
    }

    getQuoteDetails(params): Observable<any> {
        const url = `${this.baseUrl}/quote-request-detail`

        return this.http.get<any>(url, { params })
    }

    downloadPDF(quoteId, type, docId): any {
        const url = `${this.baseUrl}/download-quote-doc/${quoteId}/${type}/${docId}`
        const options: any = {
            headers: new HttpHeaders({
                'Content-Type': 'application/octet-stream',
            }),
            responseType: 'blob'
        }

        return this.http.get(url, options).pipe(map(
            (res: any) => {
                return res
                // return new Blob([res.blob()], { type: 'application/pdf' })
            })
        )
    }
}
