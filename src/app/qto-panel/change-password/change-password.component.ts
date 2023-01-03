import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service'
import { UIHelpers } from 'src/app/helpers/ui-helpers';
import { Router } from '@angular/router';
import { IAlertService } from 'src/app/libs/ialert/ialerts.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  registrationError: string
  changePasswordForm: FormGroup
  newPass: any
  conPass: any
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    public ui: UIHelpers,
    private router: Router,
    private alert: IAlertService,
  ) {
    this.changePasswordForm = this.fb.group({
      old_password: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      password_confirmation: new FormControl(null, [Validators.required]),
    })
  }

  get g() {
    return this.changePasswordForm.controls
  }

  ngOnInit() {
  }

  changePassword(data: any): boolean {
    this.newPass = this.changePasswordForm.get('password').value
    this.conPass = this.changePasswordForm.get('password_confirmation').value



    if (data.status === 'INVALID') {
      this.alert.error('Please fill-in valid data in all fields & try again.')

      return false
    } else if (this.newPass !== this.conPass ) {
      this.alert.error('New and Confirm password not matches')


      return false

    }
    this.dataService.changePassword(data.value).subscribe((resp: any) => {
      if (resp.success === false) {
        this.registrationError = resp.errors.general

        return false
      } else {
        this.alert.success('Password change successfully!!')
        this.router.navigate(['/dashboard'])

      }
    })
  }

}
