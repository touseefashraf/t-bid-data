import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { apis } from '../../../environments/environment'

@Injectable()
export class DataService {
    private baseUrl = `${apis.baseUrl}/customer`
    private data = new BehaviorSubject<Array<any>>([{ fetching: true }])
    data$ = this.data.asObservable()

    constructor(public http: HttpClient) {
    }
    downloadDocument(projectId: number, docType: any, documentId: number) {
        const url = `${this.baseUrl}/project-document/${projectId}/${docType}/${documentId}`

        return this.http.get<any>(url, { responseType: 'blob' as 'json' })
    }
    getDownloadedDocuments(): Observable<any> {
        const url = `${this.baseUrl}/downloaded-docs`

        return this.http.get<any>(url)
    }

    downloadPDF(projectId, type, id): any {
        const url = `${this.baseUrl}/download-document/${projectId}/${type}/${id}`
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

    downloadFolder(projectId: number, docType: any) {
        const url = `${apis.baseUrl}/public/download-folder?project_id=${projectId}&document_type=${docType}`

        return this.http.get<any>(url, { responseType: 'blob' as 'json' })
    }
}
