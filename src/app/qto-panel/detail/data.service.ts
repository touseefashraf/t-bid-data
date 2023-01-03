import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { apis } from '../../../environments/environment'

@Injectable()
export class DataService {
    private baseUrl = `${apis.baseUrl}/qto`

    constructor(public http: HttpClient) {
    }

    uploadFile(formData: FormData) {
        const url = `${this.baseUrl}/save-project-file`

        return this.http.post<any>(url, formData)
    }
    deleteFile(params: any) {
        const url = `${this.baseUrl}/delete-project-file`

        return this.http.post<any>(url, params)
    }
    detail(params: any): Observable<any> {
        const url = `${this.baseUrl}/project-detail`

        return this.http.post<any>(url, params)
    }

    downloadDocument(projectId: number, docType: any, documentId: number) {
        const url = `${this.baseUrl}/project-document/${projectId}/${docType}/${documentId}`

        return this.http.get<any>(url, { responseType: 'blob' as 'json' })
    }
    downloadFolder(projectId: number, docType: any) {
        const url = `${apis.baseUrl}/public/download-folder?project_id=${projectId}&document_type=${docType}`

        return this.http.get<any>(url, { responseType: 'blob' as 'json' })
    }

    updateVideo(params): Observable<any> {
        const url = `${this.baseUrl}/save-video-url`

        return this.http.post<any>(url, params)
    }
     getDivisions(id): Observable<any> {
        const url = `${apis.baseUrl}/public/project-csi-divisions/${id}`

        return this.http.get<any>(url)
    }
}
