import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { IsEmailDirective } from '../shared/is-email.directive';
import { AuthService } from './auth.service';

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
  
  @Output() screen: EventEmitter<any> = new EventEmitter();
  err;
  form;
  loader = '';

  constructor(private router: Router, private location: Location, private auth: AuthService) { }

  ngOnInit() {
    this.form = this.location.path();
  }

  test() {
    console.log('emitting....');
    this.screen.emit('half');
  }

  navigateTo(route) {
    this.form = '';
    setTimeout(() => this.router.navigate([route]), 100);
  }

  onSignupSubmit(form) {
    let val = form.value;
    if(val.password !== val.confirmPassword)
      form.form.controls.confirmPassword.setErrors({ match: true });
    if(form.valid) {
      this.loader = 'Registering you, please wait';
      this.screen.emit('full');
      this.auth.signup(form.value)
      .then(res => console.log(res))
      .catch(err => {
        this.loader = '';
        this.screen.emit('half');
        if(JSON.parse(err._body).message === 'email must be unique')
          form.form.controls.email.setErrors({ unique: true });
        else
          console.log(err);
      });
    }
  }

  onLoginSubmit(form) {
    if(form.valid) {
      this.loader = 'Loading';
      this.screen.emit('full');
      this.auth.login(form.value)
      .then(res => console.log(res))
      .catch(err => {
        this.loader = '';
        this.screen.emit('half');
        let message = JSON.parse(err._body).message;
        if(message === 'User not found')
          form.form.controls.email.setErrors({ unique: true });
        else if(message === 'Wrong Password')
          form.form.controls.password.setErrors({ wrong: true });
        else
          console.log(err);
      });
    }
  }

  onResetSubmit(form) {
    if(form.valid) {
      this.loader = 'Resetting your password, plesase wait';
      this.screen.emit('full');
      this.auth.resetPassword(form.value)
      .then(res => console.log(res))
      .catch(err => {
        this.loader = '';
        this.screen.emit('half');
        let message = JSON.parse(err._body).message;
        if(message === 'User not found')
          form.form.controls.email.setErrors({ unique: true });
        // else
          console.log(err);
      });
    }
  }

}
