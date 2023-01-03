import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-verify-email',
    templateUrl: './verify-email.component.html',
    styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
    code: any
    codeStatus = 'inProgress'
    constructor(
        public api: ApiService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.code = this.route.snapshot.paramMap.get('code')
    }

    ngOnInit() {
        const params = {
            code: this.code
        }
        this.api.checkVerificationCode(params).subscribe((resp: any) => {
            if (resp.success === false) {
                this.codeStatus = 'expire'

                return false
            } else {
                this.codeStatus = 'valid'
                localStorage.setItem('token', resp.data.token)
                localStorage.setItem('user', JSON.stringify(resp.data))
                this.api.user = resp.data
                this.api.userLoggedInSource.next(true)
            }
            this.api.doUserRedirects(resp, this.router)
        })
    }

    resendCode() {

        const params = {
            code: this.code
        }
        this.api.resendVerificationCode(params).subscribe((resp: any) => {
            if (resp.success === true) {
                this.codeStatus = 'resent'
                return false
            }
            this.codeStatus = 'invalidCode'
        })
    }

}
