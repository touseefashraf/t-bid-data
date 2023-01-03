import { ApiService } from './../../services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { apis } from '../../../environments/environment'


@Injectable()

export class DataService {
    pId: any
    projectDetails: any
    projectPlanHolders: any = []
    dataStatus = 'fetching'
    printable = false
    private baseUrl = `${apis.baseUrl}/public`
    tabs = {
        details: '',
        owner: '',
        specs: '',
        plans: '',
        qtyoff: '',
        qtyvid: '',
        planholders: '',
        addendum: '',
        others: ''
    }

    constructor(public http: HttpClient, public api: ApiService) {
    }

    getProjectDetails(params: any): Observable<any> {
        const url = `${this.baseUrl}/project-detail`

        return this.http.get<any>(url, { params })
    }

    checkSubRange(params: any): Observable<any> {
        const url = `${this.baseUrl}/check-sub-range`

        return this.http.post<any>(url, params)
    }

    downloadPDF(projectId, type, id): any {
        let url = `${this.baseUrl}/project-document/${projectId}/${type}/${id}`
        if (this.api.user.user_type == 'customer') {
            url = `${apis.baseUrl}/customer/project-document/${projectId}/${type}/${id}`
        }
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

    checkDownloadErrors(projectId, type): any {
        const url = `${this.baseUrl}/download-errors/${projectId}/${type}`

        return this.http.get(url)
    }

    downloadFolder(projectId: number, docType: any) {
        const url = `${apis.baseUrl}/public/download-folder?project_id=${projectId}&document_type=${docType}`

        return this.http.get<any>(url, { responseType: 'blob' as 'json' })
    }

    downloadDocument(projectId: number, docType: any, documentId: number) {
        const url = `${this.baseUrl}/project-document/${projectId}/${docType}/${documentId}`

        return this.http.get<any>(url, { responseType: 'blob' as 'json' })
    }
    viewPDF(projectId, type, id): any {
        const url = `${this.baseUrl}/project-document/${projectId}/${type}/${id}`

        return url
    }
    getSubbiddingSubStatus(params: any): Observable<any> {
        const url = `${apis.baseUrl}/customer/subbidding-payment-status`

        return this.http.post<any>(url, params)
    }
}
