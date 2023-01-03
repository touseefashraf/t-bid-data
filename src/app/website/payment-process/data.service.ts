import { Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { apis } from '../../../environments/environment'


@Injectable()

export class DataService {
    pId: any
    private baseUrl = `${apis.baseUrl}/public`
    private data = new BehaviorSubject<Array<any>>([{ fetching: true }])
    data$ = this.data.asObservable()

    constructor(public http: HttpClient) {
    }

    getSampleProject(): Observable<any> {
        const url = `${this.baseUrl}/sample-project`

        return this.http.get<any>(url)
    }

    downloadPDF(projectId, type, id): any {
        const url = `${this.baseUrl}/project-document/${projectId}/${type}/${id}`
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
    downloadDocument(downloadId) {
        const url = `${this.baseUrl}/download-file`

        return this.http.post<any>(url,downloadId, { responseType: 'blob' as 'json' })
    }
    downloadFolder(params) {
        const url = `${apis.baseUrl}/public/download-purchases`

        return this.http.post<any>(url,params)

    }


}
