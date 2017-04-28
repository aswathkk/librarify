import { Component, OnInit } from '@angular/core';

import { IsEmailDirective } from '../shared/is-email.directive';
import { TestValDirective } from '../shared/test-val.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
  }

  onSubmit(form) {
    console.log(form);
  }

}
