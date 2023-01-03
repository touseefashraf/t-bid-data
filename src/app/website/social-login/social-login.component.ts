import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.css']
})
export class SocialLoginComponent implements OnInit {
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


}
