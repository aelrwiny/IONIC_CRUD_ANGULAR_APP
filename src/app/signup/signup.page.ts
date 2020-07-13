import { Component, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { Country } from '../models/country';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage {

  title: string = 'signup.title';
  submitted = false;
  signupForm: FormGroup;
  countries : Country[] =  [
    {
      "id": 17,
      "isoCode": "BHR",
      "key": "973",
      "name": "Bahrain"
    },
    {
      "id": 63,
      "isoCode": "EGY",
      "key": "2",
      "name": "Egypt"
    },
    {
      "id": 173,
      "isoCode": "QTR",
      "key": "974",
      "name": "Qatar"
    }
  ];

  validationMessages = {
    'username': [
        { type: 'required', message: 'nameRequired' },
        { type: 'minlength', message: 'nameMinLength' },
        { type: 'maxlength', message: 'nameMaxLength' },
        { type: 'pattern', message: 'namePattern' },
        { type: 'validUsername', message: 'validUsername' }
      ],
      'email': [
        { type: 'required', message: 'emailRequired' },
        { type: 'pattern', message: 'emailPattern' },
        { type: 'emailUsedBefore', message: 'emailIsUsedBefore'}
      ],
      'mobile': [
        { type: 'required', message: 'mobileRequired' },
        { type: 'minlength', message: 'mobileMinLength' },
        { type: 'maxlength', message: 'mobileMaxLength' },
        { type: 'pattern', message: 'mobilePattern' },
        { type: 'isValidMobile', message: 'mobileNotValid'}
      ],
      'country': [
        { type: 'required', message: 'countryRequired' }
      ],
      'password': [
        { type: 'required', message: 'passwordRequired' },
        { type: 'pattern', message: 'passwordPattern' }
      ],
      'confirmPassword': [
        { type: 'required', message: 'confirmPasswordRequired' },
        { type: 'pattern', message: 'confirmPasswordPattern' },
        { type: 'equalTo', message: 'confirmPasswordEqualTo'}
      ]
    }
  constructor(public router: Router,
    public fb: FormBuilder,
    public userAPI: UserService) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.pattern('^[a-zA-Z0-9_.+-]+$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      mobile: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('^[0-9]*$')]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])],
      confirmPassword: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'), this.equalto('password')]],
      country: [null, Validators.required]
    });
  }

  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let input = control.value;
        let isValid = control.root.value[field_name] == input;
        if (!isValid)
            return {'equalTo': {isValid}};
        else
            return null;
    };
  }

  isValidMobile(): ValidatorFn {
    let regExp = /^[0-9]{11}$/;
    return (control: AbstractControl): { [key: string]: any } => {
        let input = control.value;
        let isValid = regExp.test(input);
        if (!isValid)
            return {'isValidMobile': {isValid}};
        else
            return null;
    };
  }

  get country(): any {
    console.log("this.country = " + (this.signupForm == null && this.signupForm == undefined) ? null : this.signupForm.get('country'));
    //return this.signupForm.get('country');
    return (this.signupForm == null && this.signupForm == undefined) ? null : this.signupForm.get('country');
  }

  onSignup() {
    if (!this.signupForm.valid) {
      return false;
    } else {
      console.log(this.signupForm.value);
      this.userAPI.signupUser(this.signupForm.value)
          .then((res) => {
            if (res) {
              this.submitted = true;
              this.signupForm.reset();
              window.dispatchEvent(new CustomEvent('user:signup'));
              return this.router.navigateByUrl('/app/tabs/home');
            }
          }, (err) => {
          });
        }
  }
}