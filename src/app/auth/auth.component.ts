import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { IsEmailDirective } from '../shared/is-email.directive';
import { AuthService } from './auth.service'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [
    trigger('authForm', [
      state('*',
        style({ transform: 'translate(-50%, -50%)' })
      ),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translate(-50%, 100%)'
        }),
        animate(100)
      ]),
      transition(':leave', [
        animate(100, style({
          opacity: 0,
          transform: 'translate(-50%, -100%)'
        }))
      ])
    ])
  ]
})
export class AuthComponent implements OnInit {
  
  err;
  form;

  constructor(private router: Router, private location: Location, private auth: AuthService) { }

  ngOnInit() {
    this.form = this.location.path();
  }

  navigateTo(route) {
    this.form = '';
    setTimeout(() => this.router.navigate([route]), 100);
  }

  onSignupSubmit(form) {
    let val = form.value;
    if(val.password !== val.confirmPassword)
      form.form.controls.confirmPassword.setErrors({match: true});
    if(form.valid)
      this.auth.signup(form.value)
      .then(res => console.log(res))
      .catch(err => {
        if( JSON.parse(err._body).message === 'email must be unique')
          form.form.controls.email.setErrors({unique: true});
        else
          console.log(err);
      });
  }

  onLoginSubmit(form) {
    
  }

  onResetSubmit(form) {

  }

}
